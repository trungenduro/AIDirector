import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '50mb' }));

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || '',
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// AI Connection Health Check Endpoint
app.get('/api/ai/health', async (_req: Request, res: Response) => {
  const hasKey = Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.trim().length > 0);
  res.json({
    connected: true,
    hasApiKey: hasKey,
    provider: 'Google AI Studio & Gemini API',
    models: {
      screenplayAndChat: 'gemini-3.8-flash',
      storyboardImage: 'gemini-3.1-flash-lite-image',
      videoVeo: 'gemini-omni-1.1-flash',
      audioTts: 'gemini-3.8-flash-lite-tts',
    },
    message: hasKey 
      ? 'Đã kết nối trực tiếp với Google Gemini AI SDK' 
      : 'Chế độ Demo Director Simulation (chưa có GEMINI_API_KEY)',
  });
});

// 1. Screenplay Breakdown & Shot Planning Endpoint
app.post('/api/screenplay/breakdown', async (req: Request, res: Response): Promise<void> => {
  try {
    const { screenplay, genre, style, pacing, aspectRatio, language = 'ja' } = req.body;

    if (!screenplay || typeof screenplay !== 'string' || screenplay.trim() === '') {
      res.status(400).json({ error: language === 'ja' ? '脚本テキストを入力してください' : 'Kịch bản không được để trống' });
      return;
    }

    const isJa = language === 'ja';
    let prompt = '';
    if (isJa) {
      prompt = 'あなたは世界的な映画監督および撮影監督（Director of Photography）です。\n' +
        '以下の映画脚本・シナリオを分析し、プロフェッショナルな「絵コンテ・詳細カット割り撮影台帳（Detailed Shooting Script / Shot List）」を作成してください。\n\n' +
        '入力シナリオ:\n"""\n' + screenplay + '\n"""\n\n' +
        '演出設定:\n' +
        '- ジャンル / Genre: ' + (genre || 'Cinematic Drama') + '\n' +
        '- 映像スタイル / Visual Style: ' + (style || 'Cinematic 35mm Anamorphic, Chiaroscuro Lighting') + '\n' +
        '- テンポ / Pacing: ' + (pacing || 'Dramatic & Intense') + '\n' +
        '- アスペクト比 / Aspect Ratio: ' + (aspectRatio || '16:9') + '\n\n' +
        '分析要件:\n' +
        '1. 映画の日本語タイトル、惹句（Logline）、監督ビジョン（Director Vision: 色彩設計、照明、キャメラワーク哲学）を出力すること。\n' +
        '2. 1つ以上のシーン（Scene）に分割し、柱（Scene Heading）をつけること。\n' +
        '3. 各シーンを3〜6カット（Shots）に分割し、映画文法（三分割構図、180度ルール、サイズ変化 EWS/WS -> MS -> CU/ECU）に従って構成すること。\n' +
        '4. 各カットには以下を含めること:\n' +
        '   - shotType: EWS, WS, MS, MCU, CU, ECU, OTS, または POV\n' +
        '   - cameraMovement: Static, Dolly In, Dolly Out, Pan Left, Pan Right, Tilt Up, Tilt Down, Tracking Shot, Orbit 360, Handheld Gritty, Crane Shot\n' +
        '   - lens: レンズ焦点距離（例: 24mm Anamorphic f/2.0, 50mm Prime f/1.4, 85mm Portrait f/1.8）\n' +
        '   - lighting: 照明・ライティング設計（例: ネオンサイアンとマゼンタのエッジライト、雨の反射）\n' +
        '   - actionDescription: ト書き・演技指導・美術描写（日本語で詳細に）\n' +
        '   - dialogue: セリフがあれば speaker, text, tone を記載\n' +
        '   - veoPrompt: AI Veo動画生成モデル用の英語プロンプト（camera movement, lighting, subject motion, 35mm film grain, 8k resolution 等）\n' +
        '   - imagePrompt: 絵コンテフレーム生成用の英語プロンプト\n' +
        '   - audioDesign: ambient（環境音）, sfx（効果音の配列）, musicMood（劇伴BGM雰囲気）\n' +
        '   - duration: カットの想定秒数（3〜8秒）\n' +
        'JSONフォーマットで返してください。';
    } else {
      prompt = 'Bạn là một Đạo diễn Điện ảnh Hàng đầu (Director of Photography & Film Director).\n' +
        'Hãy phân tích kịch bản dưới đây thành một Kịch Bản Phân Cảnh Chi Tiết (Shooting Script / Shot List) chuyên nghiệp.\n\n' +
        'Kịch bản đầu vào:\n"""\n' + screenplay + '\n"""\n\n' +
        'Cấu hình đạo diễn:\n' +
        '- Thể loại / Genre: ' + (genre || 'Cinematic Drama') + '\n' +
        '- Phong cách hình ảnh / Visual Style: ' + (style || 'Cinematic 35mm Anamorphic, Chiaroscuro Lighting') + '\n' +
        '- Nhịp điệu / Pacing: ' + (pacing || 'Dramatic & Intense') + '\n' +
        '- Tỉ lệ khung hình / Aspect Ratio: ' + (aspectRatio || '16:9') + '\n\n' +
        'Yêu cầu phân tích:\n' +
        '1. Đặt tên phim ngắn gọn, cuốn hút, cùng Logline và Tầm nhìn Đạo diễn (Director Vision).\n' +
        '2. Chia thành 1 hoặc nhiều Cảnh (Scene) với tiêu đề chuẩn điện ảnh.\n' +
        '3. Với mỗi Cảnh, chia thành từ 3 đến 6 cú máy (Shots) liên kết chặt chẽ theo ngữ pháp điện ảnh.\n' +
        '4. Mỗi Shot có shotType, cameraMovement, lens, lighting, actionDescription, dialogue, veoPrompt, imagePrompt, audioDesign, duration.\n' +
        'Trả về định dạng JSON.';
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            logline: { type: Type.STRING },
            synopsis: { type: Type.STRING },
            directorVision: { type: Type.STRING },
            scenes: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  sceneNumber: { type: Type.INTEGER },
                  heading: { type: Type.STRING },
                  summary: { type: Type.STRING },
                  shots: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        shotNumber: { type: Type.INTEGER },
                        title: { type: Type.STRING },
                        shotType: { type: Type.STRING },
                        cameraMovement: { type: Type.STRING },
                        lens: { type: Type.STRING },
                        lighting: { type: Type.STRING },
                        actionDescription: { type: Type.STRING },
                        dialogue: {
                          type: Type.OBJECT,
                          properties: {
                            speaker: { type: Type.STRING },
                            text: { type: Type.STRING },
                            tone: { type: Type.STRING },
                          },
                        },
                        veoPrompt: { type: Type.STRING },
                        imagePrompt: { type: Type.STRING },
                        audioDesign: {
                          type: Type.OBJECT,
                          properties: {
                            ambient: { type: Type.STRING },
                            sfx: {
                              type: Type.ARRAY,
                              items: { type: Type.STRING },
                            },
                            musicMood: { type: Type.STRING },
                          },
                          required: ['ambient', 'sfx', 'musicMood'],
                        },
                        duration: { type: Type.NUMBER },
                      },
                      required: [
                        'shotNumber',
                        'title',
                        'shotType',
                        'cameraMovement',
                        'lens',
                        'lighting',
                        'actionDescription',
                        'veoPrompt',
                        'imagePrompt',
                        'audioDesign',
                        'duration',
                      ],
                    },
                  },
                },
                required: ['sceneNumber', 'heading', 'summary', 'shots'],
              },
            },
          },
          required: ['title', 'logline', 'directorVision', 'scenes'],
        },
      },
    });

    const text = response.text || '{}';
    const parsedData = JSON.parse(text);

    if (parsedData.scenes && Array.isArray(parsedData.scenes)) {
      parsedData.scenes.forEach((scene: any, sIdx: number) => {
        if (scene.shots && Array.isArray(scene.shots)) {
          scene.shots.forEach((shot: any, shIdx: number) => {
            shot.id = `shot-${scene.sceneNumber || sIdx + 1}-${shot.shotNumber || shIdx + 1}-${Date.now().toString().slice(-4)}`;
            shot.sceneNumber = scene.sceneNumber || sIdx + 1;
          });
        }
      });
    }

    res.json(parsedData);
  } catch (error: any) {
    console.error('Lỗi phân tích kịch bản:', error);
    res.status(500).json({
      error: 'Không thể phân tích kịch bản: ' + (error?.message || 'Lỗi không xác định'),
    });
  }
});

// 2. AI Co-Director Interactive Chat Refinement
app.post('/api/screenplay/chat-refine', async (req: Request, res: Response): Promise<void> => {
  try {
    const { userFeedback, currentScene, currentShot, allShots, language = 'ja' } = req.body;

    const isJa = language === 'ja';
    let prompt = '';
    if (isJa) {
      prompt = 'あなたは映画撮影の助監督・共同監督（AI Co-Director）です。\n' +
        '現在、メイン監督（ユーザー）がカットまたは全体の演出調整を行っています。\n\n' +
        '監督からの修正指示:\n"' + userFeedback + '"\n\n' +
        '現在選択中のカット情報:\n' + (currentShot ? JSON.stringify(currentShot, null, 2) : '特定のカット指定なし') + '\n\n' +
        'シーンの文脈:\n' + (currentScene ? JSON.stringify(currentScene, null, 2) : '') + '\n\n' +
        'あなたの役割:\n' +
        '1. プロの助監督として映画美学・演出論（キャメラアングル、照明、被写界深度、モンタージュ効果）を踏まえた丁寧で建設的な意見を日本語で述べること。\n' +
        '2. 監督の意図に合わせ、このカットの各パラメータ（shotType, cameraMovement, lens, lighting, actionDescription, dialogue, veoPrompt, imagePrompt, audioDesign, duration）を具体的にアップデートすること。\n' +
        '3. JSON形式で coDirectorNotes, updatedShot, suggestedAction を返してください。';
    } else {
      prompt = 'Bạn là Đạo Diễn Điện Ảnh Đồng Hành (AI Co-Director Assistant).\n' +
        'Người dùng là Đạo diễn chính đang chỉ đạo điều chỉnh một phân đoạn hoặc toàn bộ kịch bản.\n\n' +
        'Yêu cầu điều chỉnh của người dùng:\n"' + userFeedback + '"\n\n' +
        'Thông tin phân cảnh hiện tại được chọn:\n' + (currentShot ? JSON.stringify(currentShot, null, 2) : 'Không có shot cụ thể, điều chỉnh tổng quát.') + '\n\n' +
        'Bối cảnh scene:\n' + (currentScene ? JSON.stringify(currentScene, null, 2) : '') + '\n\n' +
        'Nhiệm vụ của bạn:\n' +
        '1. Đóng vai Co-Director chuyên nghiệp, trả lời lịch thiệp, sâu sắc về mặt ngôn ngữ điện ảnh.\n' +
        '2. Cập nhật lại thông số cho Shot này.\n' +
        '3. Trả về JSON chứa coDirectorNotes, updatedShot, suggestedAction.';
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            coDirectorNotes: { type: Type.STRING },
            suggestedAction: { type: Type.STRING },
            updatedShot: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                shotNumber: { type: Type.INTEGER },
                sceneNumber: { type: Type.INTEGER },
                title: { type: Type.STRING },
                shotType: { type: Type.STRING },
                cameraMovement: { type: Type.STRING },
                lens: { type: Type.STRING },
                lighting: { type: Type.STRING },
                actionDescription: { type: Type.STRING },
                dialogue: {
                  type: Type.OBJECT,
                  properties: {
                    speaker: { type: Type.STRING },
                    text: { type: Type.STRING },
                    tone: { type: Type.STRING },
                  },
                },
                veoPrompt: { type: Type.STRING },
                imagePrompt: { type: Type.STRING },
                audioDesign: {
                  type: Type.OBJECT,
                  properties: {
                    ambient: { type: Type.STRING },
                    sfx: {
                      type: Type.ARRAY,
                      items: { type: Type.STRING },
                    },
                    musicMood: { type: Type.STRING },
                  },
                },
                duration: { type: Type.NUMBER },
              },
            },
          },
          required: ['coDirectorNotes', 'suggestedAction'],
        },
      },
    });

    const text = response.text || '{}';
    const parsed = JSON.parse(text);
    res.json(parsed);
  } catch (error: any) {
    console.error('Lỗi chat Co-Director:', error);
    res.status(500).json({
      error: 'Không thể xử lý góp ý đạo diễn: ' + (error?.message || 'Lỗi không xác định'),
    });
  }
});

// 3. Storyboard Frame Generation (Using gemini-3.1-flash-lite-image)
app.post('/api/storyboard/generate', async (req: Request, res: Response): Promise<void> => {
  try {
    const { prompt, aspectRatio } = req.body;

    if (!prompt) {
      res.status(400).json({ error: 'Prompt không được để trống' });
      return;
    }

    const ratio = aspectRatio === '9:16' ? '9:16' : aspectRatio === '4:3' ? '4:3' : '16:9';

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.1-flash-lite-image',
        contents: {
          parts: [
            {
              text: `Cinematic storyboard frame, professional movie still photography, 35mm film stock, depth of field, masterful composition, directorial shot: ${prompt}`,
            },
          ],
        },
        config: {
          imageConfig: {
            aspectRatio: ratio as any,
          },
        },
      });

      for (const part of response.candidates?.[0]?.content?.parts ?? []) {
        if (part.inlineData?.data) {
          const base64Data = part.inlineData.data;
          const mimeType = part.inlineData.mimeType || 'image/png';
          res.json({
            imageUrl: `data:${mimeType};base64,${base64Data}`,
            isAiGenerated: true,
          });
          return;
        }
      }

      res.json({
        imageUrl: null,
        message: 'Mô hình chưa trả về ảnh, sử dụng chế độ Director Canvas Simulation',
        isAiGenerated: false,
      });
    } catch (genError: any) {
      console.warn('AI Image Generation notice:', genError?.message);
      res.json({
        imageUrl: null,
        isAiGenerated: false,
        fallbackNotice: 'Cần API Key có quyền Image Generation để sinh ảnh thực tế từ Imagen/Flash-Image.',
      });
    }
  } catch (error: any) {
    console.error('Lỗi sinh Storyboard:', error);
    res.status(500).json({ error: error?.message || 'Lỗi sinh ảnh' });
  }
});

// 4. AI Veo Video Generation (gemini-omni-1.1-flash via Interactions API)
app.post('/api/video/generate-veo', async (req: Request, res: Response): Promise<void> => {
  try {
    const { prompt, duration = '5s', aspectRatio = '16:9', imageReference } = req.body;

    if (!prompt) {
      res.status(400).json({ error: 'Prompt không được để trống' });
      return;
    }

    try {
      const inputParts: any[] = [];
      if (imageReference && imageReference.startsWith('data:')) {
        const matches = imageReference.match(/^data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+);base64,(.+)$/);
        if (matches) {
          inputParts.push({
            type: 'image',
            mime_type: matches[1],
            data: matches[2],
          });
        }
      }
      inputParts.push({
        type: 'text',
        text: prompt,
      });

      const interaction = await ai.interactions.create(
        {
          model: 'gemini-omni-1.1-flash',
          input: inputParts.length === 1 ? inputParts[0].text : inputParts,
          background: false,
          store: false,
          stream: false,
          response_format: {
            type: 'video',
            aspect_ratio: aspectRatio === '9:16' ? '9:16' : '16:9',
            duration: duration === '10s' ? '10s' : '5s',
            resolution: '720p',
          },
        },
        { timeout: 300000 }
      );

      const videoPart = interaction.output_video;
      if (videoPart && videoPart.data) {
        const mime = videoPart.mime_type || 'video/mp4';
        res.json({
          videoUrl: `data:${mime};base64,${videoPart.data}`,
          isRealVeo: true,
        });
        return;
      }

      res.json({
        videoUrl: null,
        isRealVeo: false,
        message: 'Mô hình Veo chưa trả về video, kích hoạt Director Cine-Motion Simulator.',
      });
    } catch (veoError: any) {
      console.warn('Veo API call notice:', veoError?.message);
      res.json({
        videoUrl: null,
        isRealVeo: false,
        notice:
          'Để gọi mô hình AI Veo trực tiếp từ Google, tài khoản cần API Key hỗ trợ Veo (gemini-omni-1.1-flash). Ứng dụng đã tự động kích hoạt Director Motion Engine để bạn preview cú máy chân thực với chuyển động camera và âm thanh điện ảnh.',
      });
    }
  } catch (error: any) {
    console.error('Lỗi generate Veo:', error);
    res.status(500).json({ error: error?.message || 'Lỗi dựng phim Veo' });
  }
});

// 5. Text to Speech for Screenplay Dialogue (gemini-3.8-flash-lite-tts)
app.post('/api/audio/tts', async (req: Request, res: Response): Promise<void> => {
  try {
    const { text, speaker = 'Character', tone = 'Natural cinematic', language = 'ja' } = req.body;
    if (!text) {
      res.status(400).json({ error: 'Text không được để trống' });
      return;
    }

    try {
      const interaction = await ai.interactions.create({
        model: 'gemini-3.8-flash-lite-tts',
        input: [
          {
            type: 'text',
            text: text,
            annotations: [
              {
                type: 'speech_metadata',
                style: `Cinematic dialogue, ${tone}, speaker ${speaker}`,
              },
            ],
          },
        ],
        response_format: { type: 'audio' },
        generation_config: {
          speech_config: [
            {
              language: language === 'ja' ? 'ja-JP' : 'vi-VN',
              voice: 'Kore',
            },
          ],
        },
      });

      const audio = interaction.output_audio;
      if (audio?.data) {
        res.json({
          audioUrl: `data:audio/wav;base64,${audio.data}`,
          isAiAudio: true,
        });
        return;
      }
      res.json({ audioUrl: null, isAiAudio: false });
    } catch (ttsErr: any) {
      console.warn('TTS call notice:', ttsErr?.message);
      res.json({ audioUrl: null, isAiAudio: false });
    }
  } catch (error: any) {
    console.error('Lỗi sinh giọng nói thoại:', error);
    res.status(500).json({ error: error?.message || 'Lỗi TTS' });
  }
});

// Serve frontend in dev or prod
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`CineAI Film Director Server running on port ${PORT}`);
  });
}

startServer();
