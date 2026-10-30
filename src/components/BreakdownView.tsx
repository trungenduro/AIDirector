import React, { useState } from 'react';
import { 
  Clapperboard, Camera, Eye, Disc, Volume2, MessageSquare, Video, 
  Sparkles, Clock, Edit3, Trash2, Plus, Check, Copy, ChevronDown, ChevronUp, Layers
} from 'lucide-react';
import { Scene, ScreenplayProject, Shot } from '../types/film';
import { Language, TRANSLATIONS } from '../locales/i18n';

interface BreakdownViewProps {
  project: ScreenplayProject;
  onUpdateProject: (updated: ScreenplayProject) => void;
  onOpenCoDirectorChat: (shot?: Shot, scene?: Scene) => void;
  onSelectShotForProduction: (shot: Shot) => void;
  onGenerateStoryboardForShot: (shot: Shot) => void;
  language?: Language;
}

export const BreakdownView: React.FC<BreakdownViewProps> = ({
  project,
  onUpdateProject,
  onOpenCoDirectorChat,
  onSelectShotForProduction,
  onGenerateStoryboardForShot,
  language = 'ja',
}) => {
  const t = TRANSLATIONS[language];
  const [editingShotId, setEditingShotId] = useState<string | null>(null);
  const [copiedPromptId, setCopiedPromptId] = useState<string | null>(null);
  const [collapsedScenes, setCollapsedScenes] = useState<{ [sceneNum: number]: boolean }>({});

  const toggleScene = (sceneNum: number) => {
    setCollapsedScenes(prev => ({ ...prev, [sceneNum]: !prev[sceneNum] }));
  };

  const handleCopyPrompt = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedPromptId(id);
    setTimeout(() => setCopiedPromptId(null), 2000);
  };

  const handleDeleteShot = (sceneNumber: number, shotId: string) => {
    const updatedScenes = project.scenes.map(sc => {
      if (sc.sceneNumber === sceneNumber) {
        return {
          ...sc,
          shots: sc.shots.filter(s => s.id !== shotId),
        };
      }
      return sc;
    });
    onUpdateProject({ ...project, scenes: updatedScenes });
  };

  const handleAddShot = (sceneNumber: number) => {
    const scene = project.scenes.find(s => s.sceneNumber === sceneNumber);
    if (!scene) return;

    const newShotNum = scene.shots.length + 1;
    const newShot: Shot = {
      id: `shot-${sceneNumber}-${newShotNum}-${Date.now().toString().slice(-4)}`,
      shotNumber: newShotNum,
      sceneNumber: sceneNumber,
      title: `Cú máy tiếp diễn #${newShotNum}`,
      shotType: 'CU',
      cameraMovement: 'Dolly In',
      lens: '50mm Prime f/1.4',
      lighting: 'Chiaroscuro soft rim lighting',
      actionDescription: 'Nhân vật quay đầu nhìn lại, biểu cảm biến đổi trong tĩnh lặng.',
      veoPrompt: `Cinematic close-up, dramatic lighting, 35mm film grain, 4k hyper-detailed camera dolly in slowly on character expression`,
      imagePrompt: `Cinematic movie still, dramatic close up, atmospheric lighting, high resolution`,
      audioDesign: {
        ambient: 'Gió đêm rít nhẹ qua khe cửa',
        sfx: ['Tiếng thở gấp'],
        musicMood: 'Tension sub-bass drone',
      },
      duration: 4,
    };

    const updatedScenes = project.scenes.map(sc => {
      if (sc.sceneNumber === sceneNumber) {
        return {
          ...sc,
          shots: [...sc.shots, newShot],
        };
      }
      return sc;
    });
    onUpdateProject({ ...project, scenes: updatedScenes });
    setEditingShotId(newShot.id);
  };

  const handleUpdateShotField = (shotId: string, field: keyof Shot, value: any) => {
    const updatedScenes = project.scenes.map(sc => ({
      ...sc,
      shots: sc.shots.map(sh => (sh.id === shotId ? { ...sh, [field]: value } : sh)),
    }));
    onUpdateProject({ ...project, scenes: updatedScenes });
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Film Header Banner & Vision */}
      <div className="bg-gradient-to-br from-zinc-900/90 via-zinc-950 to-zinc-900 border border-zinc-800 rounded-2xl p-6 relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono-code uppercase font-semibold">
                {project.genre}
              </span>
              <span className="text-zinc-500">•</span>
              <span className="text-xs text-zinc-400 font-mono-code">{project.aspectRatio}</span>
              <span className="text-zinc-500">•</span>
              <span className="text-xs text-zinc-400 font-mono-code">{project.pacing}</span>
            </div>
            <h1 className="font-cinematic font-bold text-2xl sm:text-3xl text-white tracking-wide">
              {project.title}
            </h1>
            <p className="text-sm text-zinc-300 font-medium italic border-l-2 border-amber-500 pl-3">
              "{project.logline}"
            </p>
            {project.directorVision && (
              <p className="text-xs text-zinc-400 pt-2 leading-relaxed">
                <strong className="text-amber-400 font-semibold font-mono-code">{t.directorVisionLabel}</strong>
                {project.directorVision}
              </p>
            )}
          </div>

          <button
            onClick={() => onOpenCoDirectorChat()}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-800/80 hover:bg-zinc-700/80 border border-zinc-700 text-xs font-semibold text-white shadow-sm transition-all whitespace-nowrap self-start"
          >
            <MessageSquare className="w-4 h-4 text-amber-400" />
            <span>{t.openCoDirectorBtn}</span>
          </button>
        </div>
      </div>

      {/* Scenes & Shots Listing */}
      <div className="space-y-8">
        {project.scenes.map((scene) => {
          const isCollapsed = collapsedScenes[scene.sceneNumber];
          const sceneTotalDuration = scene.shots.reduce((a, b) => a + (b.duration || 0), 0);

          return (
            <div
              key={scene.sceneNumber}
              className="bg-zinc-950 border border-zinc-800/90 rounded-2xl overflow-hidden shadow-lg transition-all"
            >
              {/* Scene Heading */}
              <div
                onClick={() => toggleScene(scene.sceneNumber)}
                className="px-6 py-4 bg-zinc-900/70 border-b border-zinc-800 flex items-center justify-between cursor-pointer hover:bg-zinc-900 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center font-cinematic font-bold text-sm">
                    {scene.sceneNumber}
                  </div>
                  <div>
                    <h3 className="font-cinematic font-bold text-sm sm:text-base text-white tracking-wider">
                      {scene.heading}
                    </h3>
                    <p className="text-xs text-zinc-400 mt-0.5 line-clamp-1">{scene.summary}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right text-xs text-zinc-400 font-mono-code hidden sm:block">
                    <span>{scene.shots.length} cú máy</span> • <span className="text-amber-400">{sceneTotalDuration}s</span>
                  </div>
                  <div className="text-zinc-400">
                    {isCollapsed ? <ChevronDown className="w-5 h-5" /> : <ChevronUp className="w-5 h-5" />}
                  </div>
                </div>
              </div>

              {/* Scene Shots Grid/Table */}
              {!isCollapsed && (
                <div className="p-4 sm:p-6 space-y-4">
                  {scene.shots.map((shot) => {
                    const isEditing = editingShotId === shot.id;

                    return (
                      <div
                        key={shot.id}
                        className="bg-zinc-900/60 border border-zinc-800/80 rounded-xl p-4 sm:p-5 hover:border-zinc-700/80 transition-all space-y-4"
                      >
                        {/* Shot Meta Header */}
                        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-zinc-800/60">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="w-7 h-7 rounded-md bg-zinc-800 text-amber-400 font-mono-code font-bold text-xs flex items-center justify-center">
                              #{shot.shotNumber}
                            </span>
                            <span className="font-semibold text-sm text-white">{shot.title}</span>

                            {/* Badge Shot Type */}
                            <span className="px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono-code font-semibold">
                              {shot.shotType}
                            </span>

                            {/* Badge Movement */}
                            <span className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono-code">
                              {shot.cameraMovement}
                            </span>

                            {/* Badge Lens */}
                            <span className="px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono-code hidden sm:inline-block">
                              {shot.lens}
                            </span>

                            {/* Badge Duration */}
                            <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 text-xs font-mono-code flex items-center gap-1">
                              <Clock className="w-3 h-3 text-zinc-500" />
                              {shot.duration}s
                            </span>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => onGenerateStoryboardForShot(shot)}
                              className="px-2.5 py-1 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-medium flex items-center gap-1.5 transition-colors"
                              title={t.storyboardBtn}
                            >
                              <Sparkles className="w-3.5 h-3.5" />
                              <span className="hidden sm:inline">{t.storyboardBtn}</span>
                            </button>

                            <button
                              onClick={() => onSelectShotForProduction(shot)}
                              className="px-2.5 py-1 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 text-xs font-medium flex items-center gap-1.5 transition-colors"
                              title={t.produceBtn}
                            >
                              <Video className="w-3.5 h-3.5" />
                              <span className="hidden sm:inline">{t.produceBtn}</span>
                            </button>

                            <button
                              onClick={() => onOpenCoDirectorChat(shot, scene)}
                              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                              title="Trao đổi cùng AI Co-Director để chỉnh sửa cú máy này"
                            >
                              <MessageSquare className="w-3.5 h-3.5" />
                            </button>

                            <button
                              onClick={() => setEditingShotId(isEditing ? null : shot.id)}
                              className={`p-1.5 rounded-lg transition-colors ${
                                isEditing ? 'text-amber-400 bg-amber-500/10' : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                              }`}
                              title="Chỉnh sửa thông số thủ công"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>

                            <button
                              onClick={() => handleDeleteShot(scene.sceneNumber, shot.id)}
                              className="p-1.5 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-zinc-800 transition-colors"
                              title="Xóa cú máy"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        {/* Inline Edit Form or View Details */}
                        {isEditing ? (
                          <div className="space-y-3 p-3 bg-zinc-950/70 border border-zinc-800 rounded-lg text-xs">
                            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                              <div>
                                <label className="text-zinc-400 block mb-1">Cỡ cảnh (Shot Type)</label>
                                <input
                                  type="text"
                                  value={shot.shotType}
                                  onChange={(e) => handleUpdateShotField(shot.id, 'shotType', e.target.value)}
                                  className="w-full bg-zinc-900 border border-zinc-700 rounded px-2 py-1 text-white"
                                />
                              </div>
                              <div>
                                <label className="text-zinc-400 block mb-1">Chuyển động (Movement)</label>
                                <input
                                  type="text"
                                  value={shot.cameraMovement}
                                  onChange={(e) => handleUpdateShotField(shot.id, 'cameraMovement', e.target.value)}
                                  className="w-full bg-zinc-900 border border-zinc-700 rounded px-2 py-1 text-white"
                                />
                              </div>
                              <div>
                                <label className="text-zinc-400 block mb-1">Ống kính (Lens)</label>
                                <input
                                  type="text"
                                  value={shot.lens}
                                  onChange={(e) => handleUpdateShotField(shot.id, 'lens', e.target.value)}
                                  className="w-full bg-zinc-900 border border-zinc-700 rounded px-2 py-1 text-white"
                                />
                              </div>
                              <div>
                                <label className="text-zinc-400 block mb-1">Thời lượng (Giây)</label>
                                <input
                                  type="number"
                                  min={1}
                                  max={20}
                                  value={shot.duration}
                                  onChange={(e) => handleUpdateShotField(shot.id, 'duration', Number(e.target.value))}
                                  className="w-full bg-zinc-900 border border-zinc-700 rounded px-2 py-1 text-white"
                                />
                              </div>
                            </div>

                            <div>
                              <label className="text-zinc-400 block mb-1">Miêu tả hành động (Mise-en-scène)</label>
                              <textarea
                                rows={2}
                                value={shot.actionDescription}
                                onChange={(e) => handleUpdateShotField(shot.id, 'actionDescription', e.target.value)}
                                className="w-full bg-zinc-900 border border-zinc-700 rounded px-2 py-1 text-white"
                              />
                            </div>

                            <div>
                              <label className="text-zinc-400 block mb-1">Prompt Veo (Video Generation)</label>
                              <textarea
                                rows={2}
                                value={shot.veoPrompt}
                                onChange={(e) => handleUpdateShotField(shot.id, 'veoPrompt', e.target.value)}
                                className="w-full bg-zinc-900 border border-zinc-700 rounded px-2 py-1 text-white font-mono-code text-[11px]"
                              />
                            </div>

                            <button
                              onClick={() => setEditingShotId(null)}
                              className="px-3 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-medium flex items-center gap-1"
                            >
                              <Check className="w-3.5 h-3.5" />
                              <span>Hoàn tất sửa</span>
                            </button>
                          </div>
                        ) : (
                          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 text-xs">
                            {/* Action Description */}
                            <div className="lg:col-span-6 space-y-2">
                              <p className="text-zinc-200 leading-relaxed">
                                <span className="text-zinc-400 font-semibold font-mono-code">HÀNH ĐỘNG: </span>
                                {shot.actionDescription}
                              </p>

                              {/* Dialogue block if exists */}
                              {shot.dialogue && shot.dialogue.text && (
                                <div className="p-2.5 rounded-lg bg-amber-500/5 border border-amber-500/20 text-zinc-200">
                                  <div className="flex items-center gap-1.5 text-amber-400 font-semibold font-cinematic">
                                    <Clapperboard className="w-3.5 h-3.5" />
                                    <span>{shot.dialogue.speaker}</span>
                                    {shot.dialogue.tone && (
                                      <span className="text-[10px] font-mono-code text-zinc-400 font-normal">
                                        ({shot.dialogue.tone})
                                      </span>
                                    )}
                                  </div>
                                  <p className="mt-1 italic text-amber-100/90 pl-2 border-l border-amber-500/40">
                                    "{shot.dialogue.text}"
                                  </p>
                                </div>
                              )}
                            </div>

                            {/* Lighting & Sound Design */}
                            <div className="lg:col-span-6 space-y-2 border-t lg:border-t-0 lg:border-l border-zinc-800/80 pt-2 lg:pt-0 lg:pl-4">
                              <div>
                                <span className="text-zinc-400 font-semibold font-mono-code">ÁNH SÁNG: </span>
                                <span className="text-zinc-300">{shot.lighting}</span>
                              </div>

                              <div className="space-y-1">
                                <div className="flex items-center gap-1.5 text-zinc-400 font-semibold font-mono-code">
                                  <Volume2 className="w-3.5 h-3.5 text-indigo-400" />
                                  <span>ÂM THANH ĐIỆN ẢNH:</span>
                                </div>
                                <div className="flex flex-wrap gap-1.5 pl-5">
                                  <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 text-[11px]">
                                    Môi trường: {shot.audioDesign.ambient}
                                  </span>
                                  {shot.audioDesign.sfx?.map((sfx, sfxIdx) => (
                                    <span
                                      key={sfxIdx}
                                      className="px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-[10px] font-mono-code"
                                    >
                                      SFX: {sfx}
                                    </span>
                                  ))}
                                  <span className="px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-amber-300 text-[10px]">
                                    Nhạc: {shot.audioDesign.musicMood}
                                  </span>
                                </div>
                              </div>

                              {/* Veo Prompt Toggle / Copy */}
                              <div className="pt-1 flex items-center justify-between text-[11px] text-zinc-500">
                                <span className="font-mono-code">AI Veo Prompt: Ready</span>
                                <button
                                  onClick={() => handleCopyPrompt(shot.id, shot.veoPrompt)}
                                  className="flex items-center gap-1 text-zinc-400 hover:text-amber-400 font-mono-code transition-colors"
                                >
                                  {copiedPromptId === shot.id ? (
                                    <>
                                      <Check className="w-3 h-3 text-emerald-400" />
                                      <span className="text-emerald-400">{t.copiedPrompt}</span>
                                    </>
                                  ) : (
                                    <>
                                      <Copy className="w-3 h-3" />
                                      <span>{t.copyPromptBtn}</span>
                                    </>
                                  )}
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}

                  {/* Add Shot Button */}
                  <button
                    onClick={() => handleAddShot(scene.sceneNumber)}
                    className="w-full py-2.5 rounded-xl border border-dashed border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white text-xs font-medium flex items-center justify-center gap-2 bg-zinc-900/30 hover:bg-zinc-900/60 transition-all"
                  >
                    <Plus className="w-4 h-4 text-amber-400" />
                    <span>{t.addShotBtn}</span>
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
