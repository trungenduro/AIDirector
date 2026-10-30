import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ScreenplayModal } from './components/ScreenplayModal';
import { BreakdownView } from './components/BreakdownView';
import { StoryboardView } from './components/StoryboardView';
import { CoDirectorChat } from './components/CoDirectorChat';
import { ShotDirectorStudio } from './components/ShotDirectorStudio';
import { MasterFilmSequencer } from './components/MasterFilmSequencer';
import { ProjectsDrawer } from './components/ProjectsDrawer';
import { ChatMessage, DirectorTab, Scene, ScreenplayProject, Shot } from './types/film';
import { Language, TRANSLATIONS } from './locales/i18n';
import { audioEngine } from './utils/audioEngine';

// Japanese Pre-configured Sample Project
const INITIAL_PROJECT_JA: ScreenplayProject = {
  id: 'proj-neo-tokyo-2088',
  title: 'ネオトーキョー2088・雨の記憶',
  genre: 'サイバーパンク・ネオノワール / SF',
  style: 'ブレードランナー2049調、アナモルフィック35mm、ネオン雨、ボリュメトリックフォグ',
  pacing: '重厚で静謐、張り詰めた緊張感 (Slow-burn)',
  aspectRatio: '2.39:1',
  logline: '巨大企業群の影が落ちる2088年の新宿。記憶メモリを巡る私立探偵・レンと情報屋の緊迫した接触。',
  directorVision: '酸性雨の反射と巨大ホログラムの光芒（サイアン＆マゼンタ）。アナモルフィックレンズの浅い被写界深度と緩やかなドリーインによって、巨大サイバー都市における個人の孤独と緊張感を映画的に表出させる。',
  scenes: [
    {
      sceneNumber: 1,
      heading: 'シーン1: 屋外。ネオ新宿・雨の摩天楼街 - 深夜02:45',
      summary: '私立探偵レンが屋台の軒下で電子タバコに火を点け、雨の中から現れる情報屋を待つ。',
      shots: [
        {
          id: 'shot-1-1-ja',
          shotNumber: 1,
          sceneNumber: 1,
          title: 'ネオ新宿摩天楼の超広角エスタブリッシング',
          shotType: 'EWS',
          cameraMovement: 'Crane Shot',
          lens: '24mm Anamorphic f/2.8',
          lighting: 'Neon cyan & magenta volumetric haze, rain reflections on wet asphalt',
          actionDescription: 'キャメラが上空からゆっくりと下降し、酸性雨に濡れたネオ新宿の道路と巨大ホログラム看板群を舐めるように捉える。',
          veoPrompt: 'Cinematic establishing extreme wide shot, futuristic Cyberpunk Neo-Tokyo Shinjuku 2088 at night, heavy rain, glowing neon signs in Japanese reflecting on wet asphalt, flying patrol drones, cinematic 35mm anamorphic film look, 8k resolution',
          imagePrompt: 'Cyberpunk Tokyo Shinjuku 2088 night street in rain, neon cyan and magenta signs in Japanese, cinematic composition, film still, high detail',
          audioDesign: {
            ambient: '雨音と遠くのパトロール飛行艇の低周波ジェット音',
            sfx: ['遠雷の轟き', '水滴の反響音'],
            musicMood: 'Cyberpunk Synth Pad',
          },
          duration: 5,
          status: 'storyboard_ready',
        },
        {
          id: 'shot-1-2-ja',
          shotNumber: 2,
          sceneNumber: 1,
          title: '私立探偵レン・電子タバコへの着火',
          shotType: 'MCU',
          cameraMovement: 'Dolly In',
          lens: '50mm Prime f/1.4',
          lighting: 'Warm orange lighter flame rimming cold blue background ambient',
          actionDescription: 'レンがプラズマライターを点ける。オレンジ色の炎が彼の古傷のある鋭い横顔を照らし、立ち上る紫煙が雨煙に溶け込む。',
          dialogue: {
            speaker: 'レン (REN)',
            text: '午前2時45分... 情報屋のやつ、5分遅刻だな。',
            tone: '低く冷徹な警戒の口調',
          },
          veoPrompt: 'Medium close-up shot, 42-year-old weary Japanese cyberpunk detective with facial scars lighting an electronic cigarette in rain, warm lighter flame reflection in eyes, slow camera dolly in, cinematic lighting, 35mm shallow depth of field',
          imagePrompt: 'Cinematic medium close up of weary Japanese detective lighting cigarette under rainy neon canopy, Cyberpunk neo noir portrait, anamorphic lens flare',
          audioDesign: {
            ambient: '微かな呼吸音と雨のしずく',
            sfx: ['プラズマライターの着火音', '紫煙を吐き出す吐息'],
            musicMood: 'Tension Sub-bass Drone',
          },
          duration: 4,
          status: 'storyboard_ready',
        },
        {
          id: 'shot-1-3-ja',
          shotNumber: 3,
          sceneNumber: 1,
          title: '路地から迫る黒フードの情報屋',
          shotType: 'CU',
          cameraMovement: 'Pan Left',
          lens: '85mm Telephoto f/1.8',
          lighting: 'Deep shadows, silhouettes sliced by strobe patrol lights',
          actionDescription: '雨に濡れた黒いフード姿の男が、赤く警告光を点滅させる小型合金ケースを胸に抱えて震えながら姿を現す。',
          dialogue: {
            speaker: '情報屋 (INFORMANT)',
            text: 'レン... 奴らが嗅ぎつけた。このチップには第9層の記憶データが全て入っている。',
            tone: '変声機越しの掠れた息切れ',
          },
          veoPrompt: 'Cinematic close-up tracking shot, mysterious hooded informant emerging from dark rain alley clutching glowing red briefcase, heavy steam, neo noir atmosphere, hyper realistic',
          imagePrompt: 'Dark hooded figure clutching a high-tech glowing briefcase in rain alleyway, neon rim lighting, movie still cinematography',
          audioDesign: {
            ambient: '水たまりを蹴る足音',
            sfx: ['荒い呼吸音', '金属ケースの電子ビープ音'],
            musicMood: 'Tension Sub-bass Drone',
          },
          duration: 4,
          status: 'storyboard_ready',
        },
      ],
    },
    {
      sceneNumber: 2,
      heading: 'シーン2: 屋外。裏路地の非常階段下 - 巡回ドローンの急襲',
      summary: '上空からの純白のサーチライトが路地を照らし出し、二人に逃げ場のない危機が迫る。',
      shots: [
        {
          id: 'shot-2-1-ja',
          shotNumber: 1,
          sceneNumber: 2,
          title: '頭上からの強烈なサーチライト照射',
          shotType: 'WS',
          cameraMovement: 'Tilt Up',
          lens: '24mm Wide Anamorphic',
          lighting: 'Blinding white searchlight piercing through dark rainy mist',
          actionDescription: '暗雲を切り裂き、巡回警察ドローンのサーチライトが垂直に路地へ投光され、二人の長い影が濡れたコンクリート壁に焼き付く。',
          dialogue: {
            speaker: 'レン (REN)',
            text: '伏せろ！ 巡回ドローンのスキャナーだ！',
            tone: '切迫した指示',
          },
          veoPrompt: 'Wide low-angle shot, blinding white spotlight from police drone above cutting through dark rainy cyberpunk alley, long shadows on concrete wall, cinematic camera tilt up',
          imagePrompt: 'Police searchlight beam cutting through cyberpunk alley mist and rain, low angle shot, anamorphic lens glare, cinema still',
          audioDesign: {
            ambient: '反重力タービンエンジンの轟音',
            sfx: ['サイレンの警戒警報音', '激しい水しぶき'],
            musicMood: 'Cyberpunk Synth Pad',
          },
          duration: 4,
          status: 'storyboard_ready',
        },
        {
          id: 'shot-2-2-ja',
          shotNumber: 2,
          sceneNumber: 2,
          title: '赤色警報光を反射するレンの瞳',
          shotType: 'ECU',
          cameraMovement: 'Static',
          lens: '100mm Macro f/2.8',
          lighting: 'Red warning strobe flashing across detective eyes',
          actionDescription: 'レンの瞳がサーチライトの反射光を受けて極限まで収縮する。彼はコートの内ポケットから電磁拳銃を静かに抜き放つ。',
          veoPrompt: 'Extreme close up of detective intense eyes reflecting flashing red emergency lights in rain, water droplets on eyelashes, high cinematic tension, 4k master cinematography',
          imagePrompt: 'Extreme close up eyes of cyberpunk Asian detective, flashing red light reflection, rain drops, macro cinema lens shot',
          audioDesign: {
            ambient: '心臓の激しい鼓動音',
            sfx: ['電磁ピストルのコッキング金属音'],
            musicMood: 'Tension Sub-bass Drone',
          },
          duration: 3,
          status: 'storyboard_ready',
        },
      ],
    },
  ],
};

const INITIAL_PROJECT_VI: ScreenplayProject = {
  id: 'proj-sai-gon-2088',
  title: 'Hồi Ức Sài Gòn 2088',
  genre: 'Cyberpunk Neo-Noir / Khoa Học Viễn Tưởng',
  style: 'Blade Runner 2049 aesthetic, Anamorphic 35mm, Neon rain, Volumetric smoke',
  pacing: 'Slow-burn, tense & contemplative',
  aspectRatio: '2.39:1',
  logline: 'Thám tử tư Minh lần theo dấu vết chip ký ức bị đánh cắp giữa phố đêm Chợ Lớn ngập ánh đèn hologram tím và mưa axit.',
  directorVision: 'Sử dụng ánh sáng tương phản cao (chiaroscuro) giữa đèn neon tím magenta và xanh cyan. Các cú máy chuyển động chậm rãi, đầm chắc với ống kính anamorphic để lột tả sự cô độc của con người trong lòng đại đô thị tương lai.',
  scenes: INITIAL_PROJECT_JA.scenes,
};

export default function App() {
  const [language, setLanguage] = useState<Language>('ja');
  const [project, setProject] = useState<ScreenplayProject>(() => {
    try {
      const saved = localStorage.getItem('cineai_current_project');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.scenes && parsed.scenes.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Could not read project from localStorage:', e);
    }
    return INITIAL_PROJECT_JA;
  });

  // Saved Projects Library List State
  const [savedProjects, setSavedProjects] = useState<ScreenplayProject[]>(() => {
    try {
      const savedList = localStorage.getItem('cineai_saved_projects_list');
      if (savedList) {
        const parsed = JSON.parse(savedList);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Error reading saved projects list:', e);
    }
    return [INITIAL_PROJECT_JA, INITIAL_PROJECT_VI];
  });

  const [isProjectsDrawerOpen, setIsProjectsDrawerOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState<DirectorTab>('script');
  const [isScreenplayModalOpen, setIsScreenplayModalOpen] = useState(false);
  const [isAnalyzingScreenplay, setIsAnalyzingScreenplay] = useState(false);
  const [isGeneratingAllStoryboards, setIsGeneratingAllStoryboards] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  // Active shot & scene
  const [activeShot, setActiveShot] = useState<Shot>(() => {
    return project.scenes[0]?.shots[0] || INITIAL_PROJECT_JA.scenes[0].shots[0];
  });
  const [activeScene, setActiveScene] = useState<Scene>(() => {
    return project.scenes[0] || INITIAL_PROJECT_JA.scenes[0];
  });

  // Save current project and sync into savedProjects list
  useEffect(() => {
    if (!project) return;
    try {
      localStorage.setItem('cineai_current_project', JSON.stringify(project));
      setSavedProjects((prevList) => {
        const targetId = project.id || project.title;
        const exists = prevList.some((p) => (p.id || p.title) === targetId);
        let updatedList: ScreenplayProject[];
        if (exists) {
          updatedList = prevList.map((p) =>
            (p.id || p.title) === targetId ? { ...project, updatedAt: Date.now() } : p
          );
        } else {
          updatedList = [
            { ...project, id: project.id || `proj-${Date.now()}`, updatedAt: Date.now() },
            ...prevList,
          ];
        }
        try {
          localStorage.setItem('cineai_saved_projects_list', JSON.stringify(updatedList));
        } catch (e) {
          console.warn('Could not save projects list to localStorage:', e);
        }
        return updatedList;
      });
    } catch (e) {
      console.warn('Storage error syncing project:', e);
    }
  }, [project]);

  // Project List Handlers
  const handleSelectProject = (selected: ScreenplayProject) => {
    setProject(selected);
    if (selected.scenes[0]?.shots[0]) {
      setActiveShot(selected.scenes[0].shots[0]);
      setActiveScene(selected.scenes[0]);
    }
    setCurrentTab('script');
    audioEngine.playSlateClap();
  };

  const handleDeleteProject = (projectId: string) => {
    setSavedProjects((prev) => {
      const filtered = prev.filter((p) => (p.id || p.title) !== projectId);
      try {
        localStorage.setItem('cineai_saved_projects_list', JSON.stringify(filtered));
      } catch (e) {
        console.warn(e);
      }
      if ((project.id || project.title) === projectId && filtered.length > 0) {
        setProject(filtered[0]);
        if (filtered[0].scenes[0]?.shots[0]) {
          setActiveShot(filtered[0].scenes[0].shots[0]);
          setActiveScene(filtered[0].scenes[0]);
        }
      }
      return filtered;
    });
  };

  const handleDuplicateProject = (orig: ScreenplayProject) => {
    const clone: ScreenplayProject = {
      ...JSON.parse(JSON.stringify(orig)),
      id: `proj-${Date.now()}`,
      title: `${orig.title} ${language === 'ja' ? '(複製)' : '(Bản sao)'}`,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    setSavedProjects((prev) => {
      const updated = [clone, ...prev];
      try {
        localStorage.setItem('cineai_saved_projects_list', JSON.stringify(updated));
      } catch (e) {
        console.warn(e);
      }
      return updated;
    });
    audioEngine.playSlateClap();
  };

  const handleImportProject = (imported: ScreenplayProject) => {
    const withMeta: ScreenplayProject = {
      ...imported,
      id: imported.id || `proj-${Date.now()}`,
      createdAt: imported.createdAt || Date.now(),
      updatedAt: Date.now(),
    };
    setSavedProjects((prev) => {
      const updated = [withMeta, ...prev.filter((p) => (p.id || p.title) !== withMeta.id)];
      try {
        localStorage.setItem('cineai_saved_projects_list', JSON.stringify(updated));
      } catch (e) {
        console.warn(e);
      }
      return updated;
    });
    setProject(withMeta);
    if (withMeta.scenes[0]?.shots[0]) {
      setActiveShot(withMeta.scenes[0].shots[0]);
      setActiveScene(withMeta.scenes[0]);
    }
    audioEngine.playSlateClap();
  };

  // Chat state
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-welcome-ja',
      sender: 'co-director',
      text: '監督、お疲れ様です！助監督AIです。脚本のシーン構成と詳細カット割り、Veo撮影プロンプトを準備いたしました。キャメラアングル、被写界深度、照明やセリフの調整など、何でもご指示ください。',
      timestamp: 'たった今',
    },
  ]);
  const [isChatLoading, setIsChatLoading] = useState(false);

  const t = TRANSLATIONS[language];

  // Toggle Language between Japanese and Vietnamese
  const handleToggleLanguage = () => {
    const nextLang: Language = language === 'ja' ? 'vi' : 'ja';
    setLanguage(nextLang);

    if (nextLang === 'vi') {
      setChatMessages([
        {
          id: `msg-${Date.now()}`,
          sender: 'co-director',
          text: 'Chào Đạo diễn! Tôi là AI Co-Director. Bảng phân cảnh và prompt Veo đã sẵn sàng. Bạn muốn tinh chỉnh cú máy nào hãy cho tôi biết nhé!',
          timestamp: 'Vừa xong',
        },
      ]);
    } else {
      setChatMessages([
        {
          id: `msg-${Date.now()}`,
          sender: 'co-director',
          text: '監督、お疲れ様です！助監督AIです。いつでもカット割りの修正やVeoプロンプトの調整を仰ってください。',
          timestamp: 'たった今',
        },
      ]);
    }
  };

  // Analyze raw screenplay via server endpoint
  const handleAnalyzeScreenplay = async (params: {
    title?: string;
    screenplay: string;
    genre: string;
    style: string;
    pacing: string;
    aspectRatio: '16:9' | '2.39:1' | '9:16';
  }) => {
    setIsAnalyzingScreenplay(true);

    try {
      const res = await fetch('/api/screenplay/breakdown', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...params,
          language,
        }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Lỗi phân tích kịch bản');
      }

      const parsedProject: ScreenplayProject = await res.json();
      parsedProject.id = `proj-${Date.now()}`;
      if (params.title && params.title.trim()) {
        parsedProject.title = params.title.trim();
      }
      parsedProject.createdAt = Date.now();
      parsedProject.updatedAt = Date.now();
      parsedProject.genre = params.genre;
      parsedProject.style = params.style;
      parsedProject.pacing = params.pacing;
      parsedProject.aspectRatio = params.aspectRatio;

      setProject(parsedProject);
      if (parsedProject.scenes[0]?.shots[0]) {
        setActiveShot(parsedProject.scenes[0].shots[0]);
        setActiveScene(parsedProject.scenes[0]);
      }

      setChatMessages([
        {
          id: `msg-${Date.now()}`,
          sender: 'co-director',
          text: language === 'ja'
            ? `監督！脚本『${parsedProject.title}』の分析と全${parsedProject.scenes.length}シーン・${parsedProject.scenes.reduce((a, s) => a + s.shots.length, 0)}カット割りが完了しました。絵コンテ確認やVeo撮影に入りましょう！`
            : `Đạo diễn ơi, kịch bản "${parsedProject.title}" đã được phân tích hoàn tất thành ${parsedProject.scenes.length} cảnh với ${parsedProject.scenes.reduce((a, s) => a + s.shots.length, 0)} cú máy!`,
          timestamp: language === 'ja' ? 'たった今' : 'Vừa xong',
        },
      ]);

      setIsScreenplayModalOpen(false);
      setCurrentTab('script');
      audioEngine.playSlateClap();
    } catch (err: any) {
      alert(language === 'ja' ? '脚本分析エラー: ' + err.message : 'Không thể phân tích kịch bản: ' + err.message);
    } finally {
      setIsAnalyzingScreenplay(false);
    }
  };

  // Co-Director Chat Message sender
  const handleSendChatMessage = async (
    text: string,
    currentShot: Shot | null,
    currentScene: Scene | null
  ) => {
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'director',
      text,
      timestamp: language === 'ja' ? 'たった今' : 'Vừa xong',
      shotId: currentShot?.id,
    };

    setChatMessages((prev) => [...prev, userMsg]);
    setIsChatLoading(true);

    try {
      const res = await fetch('/api/screenplay/chat-refine', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userFeedback: text,
          currentShot,
          currentScene,
          language,
        }),
      });

      const data = await res.json();
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'co-director',
        text: data.coDirectorNotes || (language === 'ja' ? '監督のご指示を承知いたしました。' : 'Tôi đã ghi nhận ý kiến chỉ đạo.'),
        timestamp: language === 'ja' ? 'たった今' : 'Vừa xong',
        shotId: currentShot?.id,
        suggestedAction: data.suggestedAction,
        updatedShotData: data.updatedShot,
      };

      setChatMessages((prev) => [...prev, botMsg]);
    } catch (err: any) {
      setChatMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          sender: 'co-director',
          text: language === 'ja' ? 'エラーが発生しました: ' + err.message : 'Lỗi kết nối: ' + err.message,
          timestamp: language === 'ja' ? 'たった今' : 'Vừa xong',
        },
      ]);
    } finally {
      setIsChatLoading(false);
    }
  };

  // Generate single storyboard image
  const handleGenerateSingleStoryboard = async (shot: Shot) => {
    handleUpdateShot(shot.id, { isGeneratingStoryboard: true });

    try {
      const res = await fetch('/api/storyboard/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: shot.imagePrompt || shot.veoPrompt,
          aspectRatio: project.aspectRatio,
        }),
      });

      const data = await res.json();
      if (data.imageUrl) {
        handleUpdateShot(shot.id, {
          storyboardUrl: data.imageUrl,
          isGeneratingStoryboard: false,
          status: 'storyboard_ready',
        });
      } else {
        handleUpdateShot(shot.id, {
          isGeneratingStoryboard: false,
        });
      }
    } catch (err) {
      handleUpdateShot(shot.id, { isGeneratingStoryboard: false });
    }
  };

  // Batch generate all storyboard images
  const handleGenerateAllStoryboards = async () => {
    setIsGeneratingAllStoryboards(true);
    const allShots = project.scenes.flatMap((s) => s.shots);

    for (const shot of allShots) {
      if (!shot.storyboardUrl) {
        await handleGenerateSingleStoryboard(shot);
        await new Promise((r) => setTimeout(r, 600));
      }
    }

    setIsGeneratingAllStoryboards(false);
  };

  // Update a shot across scenes
  const handleUpdateShot = (shotId: string, updates: Partial<Shot>) => {
    setProject((prev) => {
      const updatedScenes = prev.scenes.map((scene) => ({
        ...scene,
        shots: scene.shots.map((sh) => (sh.id === shotId ? { ...sh, ...updates } : sh)),
      }));

      if (activeShot?.id === shotId) {
        setActiveShot((cur) => ({ ...cur, ...updates }));
      }

      return { ...prev, scenes: updatedScenes };
    });
  };

  // Toggle Mute
  const handleToggleMute = () => {
    const muted = audioEngine.toggleMute();
    setIsMuted(muted);
  };

  // Select shot for production studio
  const handleSelectShotForProduction = (shot: Shot) => {
    setActiveShot(shot);
    const scene = project.scenes.find((s) => s.sceneNumber === shot.sceneNumber);
    if (scene) setActiveScene(scene);
    setCurrentTab('producer');
  };

  // Open Co-Director Chat with specific shot context
  const handleOpenCoDirectorChat = (shot?: Shot, scene?: Scene) => {
    if (shot) setActiveShot(shot);
    if (scene) setActiveScene(scene);
    setCurrentTab('refine');
  };

  return (
    <div className="min-h-screen bg-[#08090c] text-zinc-100 flex flex-col font-sans film-grain selection:bg-amber-500 selection:text-zinc-950">
      {/* Top Header with Language Switcher & Projects Drawer */}
      <Header
        currentTab={currentTab}
        onTabChange={setCurrentTab}
        project={project}
        onOpenNewProject={() => setIsScreenplayModalOpen(true)}
        onOpenProjectsDrawer={() => setIsProjectsDrawerOpen(true)}
        savedProjectsCount={savedProjects.length}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        language={language}
        onToggleLanguage={handleToggleLanguage}
      />

      {/* Main Content Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 pt-6">
        {currentTab === 'script' && (
          <BreakdownView
            project={project}
            onUpdateProject={setProject}
            onOpenCoDirectorChat={handleOpenCoDirectorChat}
            onSelectShotForProduction={handleSelectShotForProduction}
            onGenerateStoryboardForShot={handleGenerateSingleStoryboard}
          />
        )}

        {currentTab === 'storyboard' && (
          <StoryboardView
            project={project}
            onUpdateShot={handleUpdateShot}
            onSelectShotForProduction={handleSelectShotForProduction}
            onGenerateSingleStoryboard={handleGenerateSingleStoryboard}
            onGenerateAllStoryboards={handleGenerateAllStoryboards}
            isGeneratingAll={isGeneratingAllStoryboards}
          />
        )}

        {currentTab === 'refine' && (
          <CoDirectorChat
            project={project}
            activeShot={activeShot}
            activeScene={activeScene}
            onSelectShot={(shot) => {
              setActiveShot(shot);
              const sc = project.scenes.find((s) => s.sceneNumber === shot.sceneNumber);
              if (sc) setActiveScene(sc);
            }}
            onUpdateShot={handleUpdateShot}
            onNavigateToProduction={handleSelectShotForProduction}
            messages={chatMessages}
            onSendMessage={handleSendChatMessage}
            isLoading={isChatLoading}
          />
        )}

        {currentTab === 'producer' && (
          <ShotDirectorStudio
            project={project}
            activeShot={activeShot}
            onSelectShot={(shot) => {
              setActiveShot(shot);
              const sc = project.scenes.find((s) => s.sceneNumber === shot.sceneNumber);
              if (sc) setActiveScene(sc);
            }}
            onUpdateShot={handleUpdateShot}
            onNavigateToMaster={() => setCurrentTab('master')}
          />
        )}

        {currentTab === 'master' && (
          <MasterFilmSequencer
            project={project}
            onNavigateToProducer={handleSelectShotForProduction}
          />
        )}
      </main>

      {/* New Screenplay Modal */}
      <ScreenplayModal
        isOpen={isScreenplayModalOpen}
        onClose={() => setIsScreenplayModalOpen(false)}
        onAnalyzeScreenplay={handleAnalyzeScreenplay}
        isAnalyzing={isAnalyzingScreenplay}
        language={language}
      />

      {/* Saved Projects Library Drawer */}
      <ProjectsDrawer
        isOpen={isProjectsDrawerOpen}
        onClose={() => setIsProjectsDrawerOpen(false)}
        savedProjects={savedProjects}
        currentProjectId={project.id || project.title}
        onSelectProject={handleSelectProject}
        onDeleteProject={handleDeleteProject}
        onDuplicateProject={handleDuplicateProject}
        onImportProject={handleImportProject}
        onOpenNewProjectModal={() => setIsScreenplayModalOpen(true)}
        language={language}
      />
    </div>
  );
}
