import React, { useState, useEffect, useRef } from 'react';
import { 
  Film, Play, Pause, RotateCcw, Download, Sparkles, Check, 
  FileText, Clock, Volume2, Video, ChevronRight, Layers, Sliders,
  VolumeX, Maximize2, SkipForward, SkipBack, MonitorPlay, Clapperboard
} from 'lucide-react';
import { ScreenplayProject, Shot } from '../types/film';
import { Language, TRANSLATIONS } from '../locales/i18n';
import { renderCinematicFrame, renderMasterFilmVideo } from '../utils/canvasRenderer';
import { audioEngine } from '../utils/audioEngine';

interface MasterFilmSequencerProps {
  project: ScreenplayProject;
  onNavigateToProducer: (shot: Shot) => void;
  language?: Language;
}

export const MasterFilmSequencer: React.FC<MasterFilmSequencerProps> = ({
  project,
  onNavigateToProducer,
  language = 'ja',
}) => {
  const t = TRANSLATIONS[language];
  const allShots = project.scenes.flatMap(s => s.shots);
  const totalDuration = allShots.reduce((acc, s) => acc + (s.duration || 4), 0);

  // Monitor Display Mode: 'master_video' (Compiled Video) vs 'timeline_player' (Multi-shot sequential playback)
  const [monitorMode, setMonitorMode] = useState<'master_video' | 'timeline_player'>('timeline_player');

  // Master Render Export State
  const [isRenderingVideo, setIsRenderingVideo] = useState(false);
  const [renderProgress, setRenderProgress] = useState(0);
  const [renderedVideoUrl, setRenderedVideoUrl] = useState<string | null>(null);

  // Timeline Sequential Playback State
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const masterVideoRef = useRef<HTMLVideoElement>(null);
  const shotVideoRef = useRef<HTMLVideoElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentFilmTime, setCurrentFilmTime] = useState(0);
  const [activeShotIndex, setActiveShotIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  // Cached images
  const loadedImagesRef = useRef<{ [shotId: string]: HTMLImageElement }>({});

  // Preload storyboard images
  useEffect(() => {
    allShots.forEach(shot => {
      if (shot.storyboardUrl && !loadedImagesRef.current[shot.id]) {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.src = shot.storyboardUrl;
        img.onload = () => {
          loadedImagesRef.current[shot.id] = img;
        };
      }
    });
  }, [allShots]);

  // Main playback animation loop for Timeline Player mode
  useEffect(() => {
    let animId: number;
    let lastTimestamp: number | null = null;

    const render = (timestamp: number) => {
      if (lastTimestamp === null) lastTimestamp = timestamp;
      const delta = (timestamp - lastTimestamp) / 1000;
      lastTimestamp = timestamp;

      if (isPlaying && monitorMode === 'timeline_player') {
        setCurrentFilmTime((prev) => {
          const next = prev + delta;
          if (next >= totalDuration) {
            setIsPlaying(false);
            return 0;
          }
          return next;
        });
      }

      // Calculate which shot corresponds to currentFilmTime
      let accumulated = 0;
      let targetShotIdx = 0;
      let shotLocalTime = 0;

      for (let i = 0; i < allShots.length; i++) {
        const d = allShots[i].duration || 4;
        if (currentFilmTime >= accumulated && currentFilmTime < accumulated + d) {
          targetShotIdx = i;
          shotLocalTime = currentFilmTime - accumulated;
          break;
        }
        accumulated += d;
      }

      if (targetShotIdx !== activeShotIndex) {
        setActiveShotIndex(targetShotIdx);
        // Play shot audio atmosphere when switching
        if (isPlaying && allShots[targetShotIdx] && !isMuted) {
          audioEngine.playAtmosphere(allShots[targetShotIdx].audioDesign.musicMood, allShots[targetShotIdx].duration);
        }
      }

      // Render to canvas if in timeline_player mode and canvas is active
      if (canvasRef.current && allShots[targetShotIdx]) {
        const shot = allShots[targetShotIdx];
        const shotDuration = shot.duration || 4;
        const shotProgress = Math.min(1.0, Math.max(0.0, shotLocalTime / shotDuration));

        const hours = Math.floor(currentFilmTime / 3600);
        const mins = Math.floor((currentFilmTime % 3600) / 60);
        const secs = Math.floor(currentFilmTime % 60);
        const frames = Math.floor((currentFilmTime % 1) * 24);
        const timecode = `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}:${String(frames).padStart(2, '0')}`;

        renderCinematicFrame({
          canvas: canvasRef.current,
          shot,
          progress: shotProgress,
          aspectRatio: project.aspectRatio,
          showOverlays: true,
          showGrid: false,
          timecodeStr: timecode,
          loadedImage: loadedImagesRef.current[shot.id] || null,
        });
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [isPlaying, monitorMode, currentFilmTime, totalDuration, allShots, activeShotIndex, project.aspectRatio, isMuted]);

  // Handle Play/Pause
  const handleTogglePlay = () => {
    if (monitorMode === 'master_video') {
      if (masterVideoRef.current) {
        if (masterVideoRef.current.paused) {
          masterVideoRef.current.play();
          setIsPlaying(true);
        } else {
          masterVideoRef.current.pause();
          setIsPlaying(false);
        }
      }
      return;
    }

    const nextState = !isPlaying;
    setIsPlaying(nextState);

    if (nextState) {
      if (allShots[activeShotIndex] && !isMuted) {
        audioEngine.playAtmosphere(allShots[activeShotIndex].audioDesign.musicMood, allShots[activeShotIndex].duration);
      }
    } else {
      audioEngine.stopAll();
    }
  };

  const handleSeek = (time: number) => {
    setCurrentFilmTime(time);
    if (monitorMode === 'master_video' && masterVideoRef.current) {
      masterVideoRef.current.currentTime = time;
    }
  };

  const handleNextShot = () => {
    let accumulated = 0;
    for (let i = 0; i <= activeShotIndex; i++) {
      accumulated += allShots[i].duration || 4;
    }
    if (accumulated < totalDuration) {
      handleSeek(accumulated);
    }
  };

  const handlePrevShot = () => {
    let accumulated = 0;
    for (let i = 0; i < Math.max(0, activeShotIndex - 1); i++) {
      accumulated += allShots[i].duration || 4;
    }
    handleSeek(accumulated);
  };

  // Render Master Film to MP4/WebM Video
  const handleRenderMasterFilm = async () => {
    if (allShots.length === 0) return;
    setIsRenderingVideo(true);
    setRenderProgress(0);
    audioEngine.playSlateClap();

    try {
      const blob = await renderMasterFilmVideo(
        allShots,
        project.aspectRatio,
        (percent) => {
          setRenderProgress(percent);
        }
      );

      const url = URL.createObjectURL(blob);
      setRenderedVideoUrl(url);
      setMonitorMode('master_video');
      setIsPlaying(true);

      // Play the newly rendered video automatically
      setTimeout(() => {
        if (masterVideoRef.current) {
          masterVideoRef.current.play().catch(() => {});
        }
      }, 300);
    } catch (err: any) {
      alert(language === 'ja' ? 'マスター動画書き出しエラー: ' + err.message : 'Lỗi ghép video tổng hợp: ' + err.message);
    } finally {
      setIsRenderingVideo(false);
    }
  };

  // Download Production Shooting Script
  const handleDownloadScript = () => {
    let scriptDoc = `# KỊCH BẢN ĐẠO DIỄN CHI TIẾT (DIRECTOR'S SHOOTING SCRIPT)\n`;
    scriptDoc += `DỰ ÁN: ${project.title.toUpperCase()}\n`;
    scriptDoc += `THỂ LOẠI: ${project.genre} | TỈ LỆ: ${project.aspectRatio} | NHỊP ĐIỆU: ${project.pacing}\n`;
    scriptDoc += `LOGLINE: ${project.logline}\n`;
    scriptDoc += `TẦM NHÌN ĐẠO DIỄN: ${project.directorVision}\n\n`;
    scriptDoc += `================================================================================\n\n`;

    project.scenes.forEach(sc => {
      scriptDoc += `[CẢNH ${sc.sceneNumber}]: ${sc.heading}\n`;
      scriptDoc += `TÓM TẮT: ${sc.summary}\n\n`;

      sc.shots.forEach(sh => {
        scriptDoc += `  • CÚ MÁY #${sh.shotNumber} [${sh.shotType}] - ${sh.title} (${sh.duration}s)\n`;
        scriptDoc += `    - CHUYỂN ĐỘNG: ${sh.cameraMovement} | ỐNG KÍNH: ${sh.lens}\n`;
        scriptDoc += `    - ÁNH SÁNG: ${sh.lighting}\n`;
        scriptDoc += `    - DIỄN XUẤT: ${sh.actionDescription}\n`;
        if (sh.dialogue && sh.dialogue.text) {
          scriptDoc += `    - THOẠI (${sh.dialogue.speaker} - ${sh.dialogue.tone}): "${sh.dialogue.text}"\n`;
        }
        scriptDoc += `    - ÂM THANH: Môi trường: ${sh.audioDesign.ambient} | Nhạc: ${sh.audioDesign.musicMood}\n`;
        scriptDoc += `    - AI VEO PROMPT: ${sh.veoPrompt}\n\n`;
      });
      scriptDoc += `--------------------------------------------------------------------------------\n\n`;
    });

    const blob = new Blob([scriptDoc], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${project.title.replace(/\s+/g, '_')}_Shooting_Script.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const activeShot = allShots[activeShotIndex];

  return (
    <div className="space-y-6 pb-20">
      {/* Master Film Screen Header */}
      <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-5 sm:p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-lg bg-red-600/10 border border-red-500/20 text-red-500 flex items-center justify-center">
              <Film className="w-4 h-4" />
            </span>
            <h2 className="font-cinematic font-bold text-xl text-white">
              {t.masterTitle}
            </h2>
          </div>
          <p className="text-xs text-zinc-400 mt-1 max-w-2xl">
            {t.masterSubtitle}
          </p>
        </div>

        {/* Master Action Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleDownloadScript}
            className="px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-xs font-semibold text-white flex items-center gap-2 transition-all shadow"
          >
            <FileText className="w-4 h-4 text-amber-400" />
            <span>{t.downloadScriptBtn}</span>
          </button>

          <button
            onClick={handleRenderMasterFilm}
            disabled={isRenderingVideo || allShots.length === 0}
            className={`px-5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 shadow-lg transition-all ${
              isRenderingVideo
                ? 'bg-amber-600/50 text-white cursor-wait'
                : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-zinc-950 shadow-amber-500/20'
            }`}
          >
            {isRenderingVideo ? (
              <>
                <div className="w-4 h-4 border-2 border-zinc-950 border-t-transparent rounded-full animate-spin" />
                <span>{t.renderingMasterMsg} ({renderProgress}%)...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>{renderedVideoUrl ? (language === 'ja' ? 'マスター動画を再生成' : 'Ghép lại Master Video') : t.renderMasterBtn}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Monitor Display Container with Mode Switcher */}
      <div className="bg-black border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
        {/* Top Monitor Mode Switch Bar */}
        <div className="px-4 py-3 bg-zinc-950 border-b border-zinc-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setMonitorMode('master_video');
                setIsPlaying(false);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all ${
                monitorMode === 'master_video'
                  ? 'bg-amber-500 text-zinc-950 shadow-sm shadow-amber-500/30'
                  : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
              }`}
            >
              <MonitorPlay className="w-3.5 h-3.5" />
              <span>{language === 'ja' ? '🎬 完成マスター動画 (Master Video)' : '🎬 Video Phim Hoàn Chỉnh (Master Video)'}</span>
              {renderedVideoUrl && (
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              )}
            </button>

            <button
              onClick={() => {
                setMonitorMode('timeline_player');
                setIsPlaying(false);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all ${
                monitorMode === 'timeline_player'
                  ? 'bg-amber-500 text-zinc-950 shadow-sm shadow-amber-500/30'
                  : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
              }`}
            >
              <Clapperboard className="w-3.5 h-3.5" />
              <span>{language === 'ja' ? '🎞️ シーケンサー連続再生 (Direct Multi-Shot)' : '🎞️ Trình Chiếu Chuỗi Cú Máy (Multi-Shot)'}</span>
            </button>
          </div>

          <div className="flex items-center gap-3 text-xs text-zinc-400 font-mono-code">
            <span>{project.aspectRatio}</span>
            <span>•</span>
            <span>{totalDuration}s ({allShots.length} {t.shotLabel})</span>
          </div>
        </div>

        {/* Viewport Screen: Real Video or Canvas */}
        <div className="relative w-full aspect-video flex items-center justify-center bg-black overflow-hidden">
          {monitorMode === 'master_video' ? (
            renderedVideoUrl ? (
              /* Actual Master Video Player */
              <video
                ref={masterVideoRef}
                src={renderedVideoUrl}
                controls
                autoPlay
                playsInline
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                className="w-full h-full object-contain"
              />
            ) : (
              /* Empty Master State with 1-Click Stitch Trigger */
              <div className="text-center p-8 max-w-md space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto">
                  <Film className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-lg font-cinematic font-bold text-white">
                    {language === 'ja' ? 'マスター動画はまだ書き出されていません' : 'Chưa xuất video tổng hợp'}
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                    {language === 'ja'
                      ? '全カットの絵コンテ・Veo動画・音響を1本の完成映画ファイルに自動レンダリング・結合して即座に再生できます。'
                      : 'Nhấn nút bên dưới để tự động ghép tất cả các cú máy, video Veo và âm thanh thành 1 video duy nhất để xem liền mạch.'}
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                  <button
                    onClick={handleRenderMasterFilm}
                    disabled={isRenderingVideo}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>{language === 'ja' ? '今すぐマスター動画を結合・出力' : 'Ghép & Xuất Video Ngay'}</span>
                  </button>
                  <button
                    onClick={() => {
                      setMonitorMode('timeline_player');
                      handleTogglePlay();
                    }}
                    className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 text-xs font-semibold flex items-center justify-center gap-2 transition-all"
                  >
                    <Play className="w-3.5 h-3.5 text-amber-400 fill-current" />
                    <span>{language === 'ja' ? 'プレビュー連続再生' : 'Phát chuỗi cú máy'}</span>
                  </button>
                </div>
              </div>
            )
          ) : (
            /* Timeline Canvas Mode */
            <div className="relative w-full h-full flex items-center justify-center">
              {activeShot?.videoUrl ? (
                <video
                  ref={shotVideoRef}
                  src={activeShot.videoUrl}
                  autoPlay={isPlaying}
                  controls={false}
                  playsInline
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

              {/* Subtitle Overlay if activeShot has dialogue */}
              {activeShot?.dialogue?.text && (
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 max-w-[85%] text-center px-4 py-2 rounded-xl bg-black/80 backdrop-blur-sm border border-zinc-800 text-yellow-200 text-xs sm:text-sm font-semibold shadow-lg">
                  <span className="text-zinc-400 text-xs mr-2 uppercase">[{activeShot.dialogue.speaker}]:</span>
                  "{activeShot.dialogue.text}"
                </div>
              )}
            </div>
          )}
        </div>

        {/* Playback Control Bar for Timeline Player */}
        <div className="w-full p-4 bg-zinc-950/95 border-t border-zinc-800 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={handlePrevShot}
              className="p-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-white transition-colors"
              title={language === 'ja' ? '前カット' : 'Cú máy trước'}
            >
              <SkipBack className="w-4 h-4" />
            </button>

            <button
              onClick={handleTogglePlay}
              className="p-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold transition-all shadow-md shadow-amber-500/20"
            >
              {isPlaying ? (
                <Pause className="w-4 h-4 fill-current" />
              ) : (
                <Play className="w-4 h-4 fill-current ml-0.5" />
              )}
            </button>

            <button
              onClick={handleNextShot}
              className="p-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-white transition-colors"
              title={language === 'ja' ? '次カット' : 'Cú máy tiếp'}
            >
              <SkipForward className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                setIsPlaying(false);
                setCurrentFilmTime(0);
                if (masterVideoRef.current) masterVideoRef.current.currentTime = 0;
              }}
              className="p-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-white transition-colors"
              title={language === 'ja' ? '最初に戻る' : 'Về đầu phim'}
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {/* Mute Toggle */}
            <button
              onClick={() => {
                const nextMuted = !isMuted;
                setIsMuted(nextMuted);
                if (nextMuted) audioEngine.stopAll();
              }}
              className={`p-2.5 rounded-xl border transition-colors ${
                isMuted
                  ? 'bg-red-500/10 border-red-500/30 text-red-400'
                  : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
              }`}
              title={isMuted ? 'Bật âm thanh' : 'Tắt âm'}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            {/* Runtime Counter */}
            <div className="font-mono-code text-zinc-200 font-semibold text-xs px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800">
              {currentFilmTime.toFixed(1)}s / {totalDuration}s
            </div>
          </div>

          {/* Master Timeline Scrubber */}
          <div className="flex-1 min-w-[200px] px-2">
            <input
              type="range"
              min={0}
              max={totalDuration}
              step={0.1}
              value={currentFilmTime}
              onChange={(e) => handleSeek(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
          </div>

          {/* Active Shot Badge */}
          {activeShot && (
            <div className="flex items-center gap-2">
              <span className="font-mono-code text-amber-400 text-xs px-2.5 py-1 rounded bg-amber-500/10 border border-amber-500/20 font-semibold">
                {t.nowPlayingLabel} {t.sceneLabel} {activeShot.sceneNumber} • {t.shotLabel} #{activeShot.shotNumber}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Rendered Video Card & Direct Download Link */}
      {renderedVideoUrl && (
        <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950/60 via-zinc-950 to-emerald-950/40 border border-emerald-500/40 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center">
              <Check className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-cinematic font-bold text-white text-base">
                {t.filmCompletedTitle}
              </h4>
              <p className="text-xs text-zinc-400 mt-0.5">
                {t.filmCompletedSubtitle}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => {
                setMonitorMode('master_video');
                if (masterVideoRef.current) masterVideoRef.current.play();
              }}
              className="px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 text-xs font-semibold flex items-center gap-2 transition-all shadow"
            >
              <MonitorPlay className="w-4 h-4 text-emerald-400" />
              <span>{language === 'ja' ? '今すぐ動画を再生' : 'Xem ngay trên player'}</span>
            </button>

            <a
              href={renderedVideoUrl}
              download={`${project.title.replace(/\s+/g, '_')}_Master_Film.webm`}
              className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition-all"
            >
              <Download className="w-4 h-4" />
              <span>{t.downloadVideoBtn}</span>
            </a>
          </div>
        </div>
      )}

      {/* Master Sequential Timeline Track */}
      <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-400">
            <Layers className="w-4 h-4 text-amber-400" />
            <span>{t.timelineLabel}</span>
          </div>
          <span className="text-xs text-zinc-400 font-mono-code">
            {t.totalDurationLabel}: <strong className="text-amber-400">{totalDuration}s</strong> ({allShots.length} {t.shotLabel})
          </span>
        </div>

        {/* Timeline Track Bars */}
        <div className="flex items-center gap-1.5 p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/80 overflow-x-auto scrollbar-none">
          {allShots.map((shot, idx) => {
            const isCurrent = idx === activeShotIndex;
            const widthPercent = Math.max(8, (shot.duration / totalDuration) * 100);

            return (
              <div
                key={shot.id}
                onClick={() => {
                  let acc = 0;
                  for (let i = 0; i < idx; i++) acc += allShots[i].duration || 4;
                  handleSeek(acc);
                }}
                style={{ minWidth: `${Math.max(100, widthPercent * 8)}px` }}
                className={`p-2.5 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                  isCurrent
                    ? 'bg-amber-500/15 border-amber-500 text-white ring-1 ring-amber-500/30'
                    : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-mono-code">
                  <span className={isCurrent ? 'text-amber-400 font-bold' : 'text-zinc-500'}>
                    #{idx + 1} S{shot.sceneNumber}
                  </span>
                  <span className="text-zinc-500">{shot.duration}s</span>
                </div>

                <div className="mt-1 font-semibold text-xs truncate text-zinc-200">
                  {shot.title}
                </div>

                <div className="mt-2 flex items-center justify-between text-[9px] font-mono-code text-zinc-500 pt-1 border-t border-zinc-800/40">
                  <span>{shot.shotType}</span>
                  <span className="text-emerald-400">{shot.cameraMovement}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Edit Selected Shot Button */}
        {activeShot && (
          <div className="flex items-center justify-between pt-2 text-xs">
            <span className="text-zinc-400">
              {language === 'ja' ? 'このカットを調整・再撮影しますか？' : 'Muốn quay lại chỉnh sửa cú máy này?'}
            </span>
            <button
              onClick={() => onNavigateToProducer(activeShot)}
              className="flex items-center gap-1 text-amber-400 hover:text-amber-300 font-medium transition-colors"
            >
              <span>{t.backToStudioBtn}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
