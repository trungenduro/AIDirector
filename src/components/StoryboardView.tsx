import React, { useState, useRef } from 'react';
import { 
  Sparkles, Camera, Upload, RefreshCw, ZoomIn, Play, X, Download, 
  Layers, CheckCircle, Clock, Volume2, Clapperboard
} from 'lucide-react';
import { ScreenplayProject, Shot } from '../types/film';
import { Language, TRANSLATIONS } from '../locales/i18n';

interface StoryboardViewProps {
  project: ScreenplayProject;
  onUpdateShot: (shotId: string, updates: Partial<Shot>) => void;
  onSelectShotForProduction: (shot: Shot) => void;
  onGenerateSingleStoryboard: (shot: Shot) => Promise<void>;
  onGenerateAllStoryboards: () => Promise<void>;
  isGeneratingAll: boolean;
  language?: Language;
}

export const StoryboardView: React.FC<StoryboardViewProps> = ({
  project,
  onUpdateShot,
  onSelectShotForProduction,
  onGenerateSingleStoryboard,
  onGenerateAllStoryboards,
  isGeneratingAll,
  language = 'ja',
}) => {
  const t = TRANSLATIONS[language];
  const [inspectingShot, setInspectingShot] = useState<Shot | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadTargetShotId, setUploadTargetShotId] = useState<string | null>(null);

  // Flatten all shots
  const allShots: Shot[] = project.scenes.flatMap(s => s.shots);
  const completedCount = allShots.filter(s => !!s.storyboardUrl).length;

  const handleUploadClick = (shotId: string) => {
    setUploadTargetShotId(shotId);
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && uploadTargetShotId) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          onUpdateShot(uploadTargetShotId, {
            storyboardUrl: result,
            status: 'storyboard_ready',
          });
        }
      };
      reader.readAsDataURL(file);
    }
    // reset input
    e.target.value = '';
    setUploadTargetShotId(null);
  };

  const getAspectRatioClass = (ratio: string) => {
    if (ratio === '2.39:1') return 'aspect-[2.39/1]';
    if (ratio === '9:16') return 'aspect-[9/16]';
    return 'aspect-video';
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Hidden File Input for Custom Sketch Upload */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Top Controls Bar */}
      <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-cinematic font-bold text-xl text-white">
              {t.storyboardTitle}
            </h2>
            <span className="px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono-code font-semibold">
              {completedCount} / {allShots.length} {language === 'ja' ? 'コマ' : 'Khung Hình'}
            </span>
          </div>
          <p className="text-xs text-zinc-400 mt-1">
            {t.storyboardSubtitle}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onGenerateAllStoryboards}
            disabled={isGeneratingAll || allShots.length === 0}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold shadow-lg transition-all ${
              isGeneratingAll
                ? 'bg-amber-600/50 text-white cursor-wait'
                : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-zinc-950 shadow-amber-500/20'
            }`}
          >
            {isGeneratingAll ? (
              <>
                <div className="w-4 h-4 border-2 border-zinc-950 border-t-transparent rounded-full animate-spin" />
                <span>{t.batchGeneratingBtn}</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>{t.batchGenerateBtn}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Storyboard Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allShots.map((shot) => {
          const hasImage = !!shot.storyboardUrl;
          const isGenerating = !!shot.isGeneratingStoryboard;

          return (
            <div
              key={shot.id}
              className="bg-zinc-900/70 border border-zinc-800 rounded-2xl overflow-hidden shadow-lg hover:border-zinc-700/80 transition-all flex flex-col group"
            >
              {/* Visual Frame Container */}
              <div
                className={`relative w-full ${getAspectRatioClass(
                  project.aspectRatio
                )} bg-zinc-950 overflow-hidden flex items-center justify-center border-b border-zinc-800`}
              >
                {hasImage ? (
                  <img
                    src={shot.storyboardUrl}
                    alt={shot.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : isGenerating ? (
                  <div className="flex flex-col items-center justify-center gap-3 text-center p-4">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-full border-2 border-amber-500/20 border-t-amber-500 animate-spin" />
                      <Sparkles className="w-5 h-5 text-amber-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                    </div>
                    <span className="text-xs font-mono-code text-amber-300">
                      {t.aiDrawingMsg}
                    </span>
                  </div>
                ) : (
                  /* Placeholder canvas drawing with camera wireframe */
                  <div className="w-full h-full flex flex-col items-center justify-center gap-2 p-6 director-grid text-zinc-600 group-hover:text-zinc-500 transition-colors">
                    <Camera className="w-8 h-8 text-zinc-700" />
                    <span className="text-[11px] font-mono-code text-zinc-500">
                      {t.noImagePlaceholder}
                    </span>
                    <button
                      onClick={() => onGenerateSingleStoryboard(shot)}
                      className="mt-1 px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-medium flex items-center gap-1.5 transition-colors"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{t.generateSingleStoryboardBtn}</span>
                    </button>
                  </div>
                )}

                {/* Overlays on frame: Shot badges */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5 pointer-events-none">
                  <span className="px-2 py-0.5 rounded bg-black/70 backdrop-blur text-amber-400 font-mono-code font-bold text-xs border border-white/10">
                    S{shot.sceneNumber} • #{shot.shotNumber}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-black/70 backdrop-blur text-blue-400 font-mono-code text-xs border border-white/10">
                    {shot.shotType}
                  </span>
                </div>

                <div className="absolute top-3 right-3 flex items-center gap-1.5 pointer-events-none">
                  <span className="px-2 py-0.5 rounded bg-black/70 backdrop-blur text-emerald-400 font-mono-code text-xs border border-white/10">
                    {shot.cameraMovement}
                  </span>
                </div>

                {/* Hover overlay action buttons */}
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2.5 p-4">
                  {hasImage && (
                    <button
                      onClick={() => setInspectingShot(shot)}
                      className="p-2.5 rounded-xl bg-zinc-900/90 text-white hover:bg-zinc-800 border border-zinc-700 transition-all"
                      title={t.inspectBtn}
                    >
                      <ZoomIn className="w-4 h-4 text-amber-400" />
                    </button>
                  )}

                  <button
                    onClick={() => onGenerateSingleStoryboard(shot)}
                    disabled={isGenerating}
                    className="p-2.5 rounded-xl bg-zinc-900/90 text-white hover:bg-zinc-800 border border-zinc-700 transition-all"
                    title={t.regenerateBtn}
                  >
                    <RefreshCw className={`w-4 h-4 text-emerald-400 ${isGenerating ? 'animate-spin' : ''}`} />
                  </button>

                  <button
                    onClick={() => handleUploadClick(shot.id)}
                    className="p-2.5 rounded-xl bg-zinc-900/90 text-white hover:bg-zinc-800 border border-zinc-700 transition-all"
                    title={t.uploadCustomBtn}
                  >
                    <Upload className="w-4 h-4 text-blue-400" />
                  </button>

                  <button
                    onClick={() => onSelectShotForProduction(shot)}
                    className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-semibold text-xs flex items-center gap-1.5 transition-all shadow-md"
                    title={t.produceVeoBtn}
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>{t.produceVeoBtn}</span>
                  </button>
                </div>
              </div>

              {/* Shot Details Below Frame */}
              <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-zinc-400">
                    <span className="font-mono-code font-semibold text-amber-400/90 truncate">
                      {shot.title}
                    </span>
                    <span className="font-mono-code flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {shot.duration}s
                    </span>
                  </div>

                  <p className="text-xs text-zinc-300 mt-1.5 line-clamp-2 leading-relaxed">
                    {shot.actionDescription}
                  </p>

                  {shot.dialogue && shot.dialogue.text && (
                    <div className="mt-2 text-[11px] p-2 rounded bg-zinc-950/60 border border-zinc-800/80 text-zinc-300 italic">
                      <span className="text-amber-400 not-italic font-semibold">{shot.dialogue.speaker}: </span>
                      "{shot.dialogue.text}"
                    </div>
                  )}
                </div>

                <div className="pt-2 border-t border-zinc-800/60 flex items-center justify-between text-[11px] text-zinc-500 font-mono-code">
                  <span>{shot.lens}</span>
                  <span className="truncate max-w-[140px] text-zinc-400">
                    {shot.lighting.slice(0, 24)}...
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Frame Inspection Modal */}
      {inspectingShot && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <div className="bg-zinc-950 border border-zinc-800 rounded-2xl max-w-4xl w-full overflow-hidden flex flex-col shadow-2xl">
            <div className="px-6 py-3.5 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/60">
              <div className="flex items-center gap-2">
                <span className="text-amber-400 font-mono-code font-bold text-xs">
                  CẢNH {inspectingShot.sceneNumber} • SHOT #{inspectingShot.shotNumber}
                </span>
                <span className="text-white font-semibold text-sm">
                  {inspectingShot.title}
                </span>
              </div>
              <button
                onClick={() => setInspectingShot(null)}
                className="p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 flex flex-col items-center justify-center bg-black">
              {inspectingShot.storyboardUrl ? (
                <img
                  src={inspectingShot.storyboardUrl}
                  alt={inspectingShot.title}
                  className="max-h-[65vh] w-auto rounded-lg object-contain shadow-2xl border border-zinc-800"
                />
              ) : (
                <div className="p-12 text-zinc-500 text-center">Không có hình ảnh</div>
              )}
            </div>

            <div className="p-4 bg-zinc-900/80 border-t border-zinc-800 flex items-center justify-between text-xs">
              <div className="text-zinc-300 max-w-xl">
                <strong className="text-amber-400 font-mono-code">MÔ TẢ CẢNH: </strong>
                {inspectingShot.actionDescription}
              </div>
              <button
                onClick={() => {
                  const s = inspectingShot;
                  setInspectingShot(null);
                  onSelectShotForProduction(s);
                }}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-semibold flex items-center gap-1.5 shadow"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Dựng Video Veo</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
