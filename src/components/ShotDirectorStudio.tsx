import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, Pause, RotateCcw, Sparkles, Video, Volume2, Mic, Camera, 
  ChevronLeft, ChevronRight, Sliders, Layers, Eye, Grid, CheckCircle2,
  AlertCircle, VolumeX, Maximize2, RefreshCw, Radio
} from 'lucide-react';
import { ScreenplayProject, Shot } from '../types/film';
import { Language, TRANSLATIONS } from '../locales/i18n';
import { renderCinematicFrame } from '../utils/canvasRenderer';
import { audioEngine } from '../utils/audioEngine';

interface ShotDirectorStudioProps {
  project: ScreenplayProject;
  activeShot: Shot;
  onSelectShot: (shot: Shot) => void;
  onUpdateShot: (shotId: string, updates: Partial<Shot>) => void;
  onNavigateToMaster: () => void;
  language?: Language;
}

export const ShotDirectorStudio: React.FC<ShotDirectorStudioProps> = ({
  project,
  activeShot,
  onSelectShot,
  onUpdateShot,
  onNavigateToMaster,
  language = 'ja',
}) => {
  const t = TRANSLATIONS[language];
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [showGrid, setShowGrid] = useState(false);
  const [showHud, setShowHud] = useState(true);
  const [isGeneratingVeo, setIsGeneratingVeo] = useState(false);
  const [isGeneratingTts, setIsGeneratingTts] = useState(false);
  const [veoNotice, setVeoNotice] = useState<string | null>(null);
  const [loadedImage, setLoadedImage] = useState<HTMLImageElement | null>(null);

  const duration = activeShot.duration || 4;
  const allShots = project.scenes.flatMap(s => s.shots);
  const currentShotIndex = allShots.findIndex(s => s.id === activeShot.id);

  // Load storyboard image when active shot changes
  useEffect(() => {
    setIsPlaying(false);
    setCurrentTime(0);
    setVeoNotice(null);

    if (activeShot.storyboardUrl) {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = activeShot.storyboardUrl;
      img.onload = () => setLoadedImage(img);
      img.onerror = () => setLoadedImage(null);
    } else {
      setLoadedImage(null);
    }
  }, [activeShot.id, activeShot.storyboardUrl]);

  // Animation Loop for Director Canvas
  useEffect(() => {
    let animId: number;
    let lastTimestamp: number | null = null;

    const render = (timestamp: number) => {
      if (lastTimestamp === null) lastTimestamp = timestamp;
      const delta = (timestamp - lastTimestamp) / 1000;
      lastTimestamp = timestamp;

      if (isPlaying) {
        setCurrentTime((prev) => {
          const next = prev + delta;
          if (next >= duration) {
            setIsPlaying(false);
            return 0;
          }
          return next;
        });
      }

      if (canvasRef.current) {
        const progress = Math.min(1.0, Math.max(0.0, currentTime / duration));
        const hours = Math.floor(currentTime / 3600);
        const mins = Math.floor((currentTime % 3600) / 60);
        const secs = Math.floor(currentTime % 60);
        const frames = Math.floor((currentTime % 1) * 24);
        const timecode = `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}:${String(frames).padStart(2, '0')}`;

        renderCinematicFrame({
          canvas: canvasRef.current,
          shot: activeShot,
          progress,
          aspectRatio: project.aspectRatio,
          showOverlays: showHud,
          showGrid,
          timecodeStr: timecode,
          loadedImage,
        });
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [isPlaying, currentTime, duration, activeShot, project.aspectRatio, showHud, showGrid, loadedImage]);

  const handleTogglePlay = () => {
    const nextState = !isPlaying;
    setIsPlaying(nextState);

    if (nextState) {
      // Trigger cinematic audio atmosphere
      audioEngine.playAtmosphere(activeShot.audioDesign.musicMood, duration);

      // Trigger dialogue audio if present
      if (activeShot.dialogue && activeShot.dialogue.text) {
        audioEngine.playDialogue(
          activeShot.audioUrl,
          activeShot.dialogue.text,
          activeShot.dialogue.speaker
        );
      }
    } else {
      audioEngine.stopAll();
    }
  };

  const handleRetakeShot = () => {
    audioEngine.playSlateClap();
    setIsPlaying(false);
    setCurrentTime(0);
    // Trigger reset or prompt tweak notice
    setVeoNotice('Đã clapperboard retake! Bạn có thể tùy chỉnh lại prompt hoặc bấm máy sinh lại.');
  };

  // Call Veo Video Generation API
  const handleGenerateVeo = async () => {
    setIsGeneratingVeo(true);
    setVeoNotice(null);
    audioEngine.playSlateClap();

    try {
      const res = await fetch('/api/video/generate-veo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: activeShot.veoPrompt,
          duration: `${Math.min(10, Math.max(5, Math.round(duration)))}s`,
          aspectRatio: project.aspectRatio === '9:16' ? '9:16' : '16:9',
          imageReference: activeShot.storyboardUrl || null,
        }),
      });

      const data = await res.json();
      if (data.videoUrl) {
        onUpdateShot(activeShot.id, {
          videoUrl: data.videoUrl,
          status: 'rendered',
        });
        setVeoNotice('Chúc mừng! Video từ AI Veo đã được dựng thành công và nạp vào máy phát.');
      } else {
        setVeoNotice(
          data.notice ||
          'Chế độ Cine-Motion Engine đang chạy mượt mà để bạn preview cú máy chuyển động chuẩn xác.'
        );
      }
    } catch (err: any) {
      setVeoNotice('Lỗi kết nối Veo: ' + err.message);
    } finally {
      setIsGeneratingVeo(false);
    }
  };

  // Call Gemini TTS for Dialogue
  const handleGenerateTts = async () => {
    if (!activeShot.dialogue || !activeShot.dialogue.text) return;
    setIsGeneratingTts(true);

    try {
      const res = await fetch('/api/audio/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: activeShot.dialogue.text,
          speaker: activeShot.dialogue.speaker,
          tone: activeShot.dialogue.tone,
        }),
      });

      const data = await res.json();
      if (data.audioUrl) {
        onUpdateShot(activeShot.id, {
          audioUrl: data.audioUrl,
        });
        audioEngine.playDialogue(data.audioUrl);
      } else {
        // Play local web speech preview
        audioEngine.playDialogue(undefined, activeShot.dialogue.text, activeShot.dialogue.speaker);
      }
    } catch (err) {
      audioEngine.playDialogue(undefined, activeShot.dialogue.text, activeShot.dialogue.speaker);
    } finally {
      setIsGeneratingTts(false);
    }
  };

  const handlePrevShot = () => {
    if (currentShotIndex > 0) {
      onSelectShot(allShots[currentShotIndex - 1]);
    }
  };

  const handleNextShot = () => {
    if (currentShotIndex < allShots.length - 1) {
      onSelectShot(allShots[currentShotIndex + 1]);
    }
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Studio Header & Navigation */}
      <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <button
              onClick={handlePrevShot}
              disabled={currentShotIndex === 0}
              className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white disabled:opacity-30 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNextShot}
              disabled={currentShotIndex === allShots.length - 1}
              className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white disabled:opacity-30 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono-code font-bold text-amber-400 text-xs px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
                {language === 'ja' ? `シーン ${activeShot.sceneNumber} • カット #${activeShot.shotNumber}` : `CẢNH ${activeShot.sceneNumber} • CÚ MÁY #${activeShot.shotNumber}`}
              </span>
              <span className="text-zinc-500">•</span>
              <span className="text-xs text-zinc-400 font-mono-code">
                {currentShotIndex + 1}/{allShots.length}
              </span>
            </div>
            <h2 className="font-cinematic font-bold text-base sm:text-lg text-white mt-0.5">
              {activeShot.title}
            </h2>
          </div>
        </div>

        {/* Right Action: Next to Master Film */}
        <button
          onClick={onNavigateToMaster}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-xs font-semibold text-white transition-all shadow"
        >
          <span>{t.proceedToMasterBtn}</span>
          <ChevronRight className="w-4 h-4 text-amber-400" />
        </button>
      </div>

      {/* Main Studio Viewport Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Director's Monitor Screen */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-black border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl relative flex flex-col items-center justify-center">
            {/* Monitor Canvas Display */}
            <div className="relative w-full aspect-video flex items-center justify-center bg-black">
              {/* If real video exists and user prefers video */}
              {activeShot.videoUrl ? (
                <video
                  src={activeShot.videoUrl}
                  controls
                  className="w-full h-full object-contain"
                />
              ) : (
                <canvas
                  ref={canvasRef}
                  width={1280}
                  height={720}
                  className="w-full h-full object-contain cursor-pointer"
                  onClick={handleTogglePlay}
                />
              )}
            </div>

            {/* Monitor Control Bar */}
            <div className="w-full p-4 bg-zinc-950/90 border-t border-zinc-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
              {/* Play / Pause / Retake */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleTogglePlay}
                  className="p-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold transition-all shadow-md shadow-amber-500/20"
                  title={isPlaying ? t.pauseBtn : t.playBtn}
                >
                  {isPlaying ? (
                    <Pause className="w-4 h-4 fill-current" />
                  ) : (
                    <Play className="w-4 h-4 fill-current ml-0.5" />
                  )}
                </button>

                <button
                  onClick={handleRetakeShot}
                  className="p-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 hover:text-white transition-colors"
                  title={t.retakeBtn}
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                {/* Timecode display */}
                <div className="font-mono-code text-zinc-300 font-semibold px-3 py-1.5 rounded-lg bg-zinc-900/90 border border-zinc-800 text-xs">
                  {currentTime.toFixed(1)}s / {duration}s
                </div>
              </div>

              {/* Scrub Slider */}
              <div className="flex-1 min-w-[140px] px-2">
                <input
                  type="range"
                  min={0}
                  max={duration}
                  step={0.05}
                  value={currentTime}
                  onChange={(e) => {
                    setCurrentTime(Number(e.target.value));
                  }}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>

              {/* Overlays & Grid Toggles */}
              <div className="flex items-center gap-1.5 text-zinc-400">
                <button
                  onClick={() => setShowGrid(!showGrid)}
                  className={`p-2 rounded-lg border transition-colors ${
                    showGrid
                      ? 'bg-amber-500/10 border-amber-500/40 text-amber-400'
                      : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
                  }`}
                  title={t.toggleGridBtn}
                >
                  <Grid className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setShowHud(!showHud)}
                  className={`p-2 rounded-lg border transition-colors ${
                    showHud
                      ? 'bg-blue-500/10 border-blue-500/40 text-blue-400'
                      : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
                  }`}
                  title={t.toggleHudBtn}
                >
                  <Eye className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Veo / Studio Notice Banner */}
          {veoNotice && (
            <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-start gap-2.5 leading-relaxed">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-amber-400" />
              <div>{veoNotice}</div>
            </div>
          )}

          {/* Action Description & Mise-en-scène Notes */}
          <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-5 space-y-3">
            <h3 className="font-cinematic font-bold text-sm text-white flex items-center gap-2">
              <Camera className="w-4 h-4 text-amber-400" />
              {language === 'ja' ? '演技指導・カメラワーク演出' : 'Chỉ Đạo Diễn Xuất & Chuyển Động Camera'}
            </h3>
            <p className="text-xs text-zinc-300 leading-relaxed">
              {activeShot.actionDescription}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-[11px] font-mono-code text-zinc-400">
              <div className="p-2 rounded bg-zinc-900/60 border border-zinc-800">
                <span className="block text-zinc-500 text-[10px]">{language === 'ja' ? 'ショットサイズ' : 'CỠ CẢNH'}</span>
                <span className="text-white font-semibold">{activeShot.shotType}</span>
              </div>
              <div className="p-2 rounded bg-zinc-900/60 border border-zinc-800">
                <span className="block text-zinc-500 text-[10px]">{language === 'ja' ? 'カメラワーク' : 'CÚ MÁY'}</span>
                <span className="text-emerald-400 font-semibold">{activeShot.cameraMovement}</span>
              </div>
              <div className="p-2 rounded bg-zinc-900/60 border border-zinc-800">
                <span className="block text-zinc-500 text-[10px]">{language === 'ja' ? 'レンズ' : 'ỐNG KÍNH'}</span>
                <span className="text-amber-400 font-semibold">{activeShot.lens}</span>
              </div>
              <div className="p-2 rounded bg-zinc-900/60 border border-zinc-800">
                <span className="block text-zinc-500 text-[10px]">{language === 'ja' ? '照明' : 'ÁNH SÁNG'}</span>
                <span className="text-zinc-200 truncate block">{activeShot.lighting}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: AI Veo & Audio Production Console */}
        <div className="lg:col-span-4 space-y-5">
          {/* Veo Producer Box */}
          <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-5 shadow-lg space-y-4">
            <div className="flex items-center gap-2.5 pb-3 border-b border-zinc-800">
              <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center">
                <Video className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-cinematic font-bold text-sm text-white">
                  {t.callVeoTitle}
                </h3>
                <span className="text-[10px] text-zinc-400 font-mono-code">
                  Google Veo (gemini-omni-1.1-flash)
                </span>
              </div>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-zinc-400 block mb-1">
                {t.veoPromptLabel}
              </label>
              <textarea
                rows={3}
                value={activeShot.veoPrompt}
                onChange={(e) => onUpdateShot(activeShot.id, { veoPrompt: e.target.value })}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-2.5 text-[11px] text-zinc-200 font-mono-code focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="flex items-center justify-between text-xs text-zinc-400">
              <span>{language === 'ja' ? `生成秒数: ${activeShot.duration}秒` : `Thời lượng dựng: ${activeShot.duration}s`}</span>
              <span>{language === 'ja' ? '解像度: 720p / 24FPS' : 'Độ phân giải: 720p / 24FPS'}</span>
            </div>

            <button
              onClick={handleGenerateVeo}
              disabled={isGeneratingVeo}
              className={`w-full py-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 shadow-lg transition-all ${
                isGeneratingVeo
                  ? 'bg-red-700/50 text-white cursor-wait'
                  : 'bg-gradient-to-r from-red-600 via-amber-600 to-amber-500 hover:from-red-500 hover:to-amber-400 text-white shadow-red-600/20'
              }`}
            >
              {isGeneratingVeo ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>{t.generatingVeoBtn}</span>
                </>
              ) : (
                <>
                  <Video className="w-4 h-4" />
                  <span>{t.generateVeoBtn}</span>
                </>
              )}
            </button>
          </div>

          {/* Sound & Dialogue Production Console */}
          <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-5 shadow-lg space-y-4">
            <div className="flex items-center gap-2.5 pb-3 border-b border-zinc-800">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center">
                <Volume2 className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-cinematic font-bold text-sm text-white">
                  {t.soundStudioTitle}
                </h3>
                <span className="text-[10px] text-zinc-400 font-mono-code">
                  Cinematic Sound Design & Voiceover
                </span>
              </div>
            </div>

            {/* Character Dialogue TTS */}
            {activeShot.dialogue && activeShot.dialogue.text ? (
              <div className="space-y-2 p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-amber-400">
                    {activeShot.dialogue.speaker}
                  </span>
                  <span className="text-[10px] text-zinc-500 font-mono-code">
                    {activeShot.dialogue.tone}
                  </span>
                </div>
                <p className="italic text-zinc-300">"{activeShot.dialogue.text}"</p>
                <button
                  onClick={handleGenerateTts}
                  disabled={isGeneratingTts}
                  className="w-full mt-2 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs flex items-center justify-center gap-2 transition-colors"
                >
                  <Mic className="w-3.5 h-3.5" />
                  <span>{isGeneratingTts ? t.ttsRecordingMsg : t.ttsVoiceBtn}</span>
                </button>
              </div>
            ) : (
              <div className="p-3 rounded-xl bg-zinc-900/30 border border-zinc-800 text-xs text-zinc-500 text-center">
                {language === 'ja' ? 'このカットにセリフはありません（無言・サイレント演出）' : 'Cú máy này không có thoại (Cảnh tĩnh / Hành động thuần túy)'}
              </div>
            )}

            {/* Ambient Atmosphere Synthesizer */}
            <div className="space-y-2">
              <label className="text-[11px] font-semibold text-zinc-400 block">
                {t.atmosphereLabel}
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {[
                  { id: 'Tension Sub-bass Drone', label: language === 'ja' ? '緊迫のサブベース (Drone)' : 'Tension Drone' },
                  { id: 'Cyberpunk Synth Pad', label: language === 'ja' ? 'サイバーパンクシンセ' : 'Cyberpunk Synth' },
                  { id: 'Rain Ambience & Foley', label: language === 'ja' ? '雨音＆足音 (Rain)' : 'Mưa & Tiếng Nước' },
                  { id: 'Melancholic Warm Strings', label: language === 'ja' ? '哀愁のストリングス' : 'Dàn Dây Hoài Niệm' },
                ].map((mood) => (
                  <button
                    key={mood.id}
                    onClick={() => {
                      audioEngine.playAtmosphere(mood.id, 5);
                      onUpdateShot(activeShot.id, {
                        audioDesign: {
                          ...activeShot.audioDesign,
                          musicMood: mood.id,
                        },
                      });
                    }}
                    className={`p-2 rounded-lg border text-left transition-all ${
                      activeShot.audioDesign.musicMood === mood.id
                        ? 'bg-amber-500/10 border-amber-500/50 text-amber-300 font-semibold'
                        : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
                    }`}
                  >
                    {mood.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Foley SFX Soundboard */}
            <div className="space-y-2">
              <label className="text-[11px] font-semibold text-zinc-400 block">
                {t.foleyLabel}
              </label>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => audioEngine.playCinematicHit()}
                  className="px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 text-xs font-mono-code transition-colors flex items-center gap-1"
                >
                  <Radio className="w-3 h-3 text-red-400" />
                  <span>Cinematic Boom</span>
                </button>
                <button
                  onClick={() => audioEngine.playSlateClap()}
                  className="px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 text-xs font-mono-code transition-colors flex items-center gap-1"
                >
                  <Radio className="w-3 h-3 text-amber-400" />
                  <span>Slate Clapper</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Filmstrip of all Shots */}
      <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-4 shadow-xl space-y-2">
        <div className="flex items-center justify-between text-xs text-zinc-400">
          <span className="font-semibold uppercase tracking-wider flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-amber-400" />
            {t.filmstripLabel}
          </span>
          <span className="font-mono-code">
            {t.filmstripHint}
          </span>
        </div>

        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
          {allShots.map((shot, idx) => {
            const isCurrent = shot.id === activeShot.id;
            return (
              <button
                key={shot.id}
                onClick={() => onSelectShot(shot)}
                className={`flex-shrink-0 w-36 text-left rounded-xl overflow-hidden border transition-all ${
                  isCurrent
                    ? 'border-amber-400 ring-2 ring-amber-500/30 scale-105 shadow-lg'
                    : 'border-zinc-800 opacity-60 hover:opacity-100'
                }`}
              >
                <div className="aspect-video bg-zinc-900 relative">
                  {shot.storyboardUrl ? (
                    <img
                      src={shot.storyboardUrl}
                      alt={shot.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[10px] text-zinc-600 font-mono-code">
                      S{shot.sceneNumber} • #{shot.shotNumber}
                    </div>
                  )}
                  <span className="absolute top-1 left-1 px-1.5 py-0.5 rounded bg-black/80 text-[9px] font-mono-code text-white">
                    #{idx + 1}
                  </span>
                  <span className="absolute bottom-1 right-1 px-1 py-0.5 rounded bg-black/80 text-[8px] font-mono-code text-amber-400">
                    {shot.duration}s
                  </span>
                </div>
                <div className="p-1.5 bg-zinc-950 text-[10px] text-zinc-300 truncate">
                  {shot.title}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
