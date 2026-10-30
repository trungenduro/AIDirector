import React from 'react';
import { Clapperboard, Film, Sparkles, MessageSquare, PlaySquare, Video, Volume2, VolumeX, PlusCircle, Globe, FolderOpen } from 'lucide-react';
import { DirectorTab, ScreenplayProject } from '../types/film';
import { Language, TRANSLATIONS } from '../locales/i18n';

interface HeaderProps {
  currentTab: DirectorTab;
  onTabChange: (tab: DirectorTab) => void;
  project: ScreenplayProject | null;
  onOpenNewProject: () => void;
  onOpenProjectsDrawer: () => void;
  savedProjectsCount: number;
  isMuted: boolean;
  onToggleMute: () => void;
  language: Language;
  onToggleLanguage: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onTabChange,
  project,
  onOpenNewProject,
  onOpenProjectsDrawer,
  savedProjectsCount,
  isMuted,
  onToggleMute,
  language,
  onToggleLanguage,
}) => {
  const t = TRANSLATIONS[language];
  const totalShots = project?.scenes.reduce((acc, s) => acc + s.shots.length, 0) || 0;
  const totalDuration = project?.scenes.reduce(
    (acc, s) => acc + s.shots.reduce((a, sh) => a + (sh.duration || 0), 0),
    0
  ) || 0;

  const tabs: { id: DirectorTab; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'script', label: t.tabScript, icon: Clapperboard },
    { id: 'storyboard', label: t.tabStoryboard, icon: Sparkles },
    { id: 'refine', label: t.tabRefine, icon: MessageSquare },
    { id: 'producer', label: t.tabProducer, icon: Video },
    { id: 'master', label: t.tabMaster, icon: Film },
  ];

  return (
    <header className="border-b border-zinc-800 bg-zinc-950/90 backdrop-blur sticky top-0 z-50">
      {/* Top Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-amber-600 via-red-600 to-indigo-600 p-[1px] flex items-center justify-center shadow-lg shadow-amber-950/40">
            <div className="w-full h-full bg-zinc-950 rounded-lg flex items-center justify-center">
              <Clapperboard className="w-5 h-5 text-amber-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-cinematic font-bold tracking-wider text-lg text-white">
                CINE<span className="text-amber-400">AI</span> STUDIO
              </span>
              <span className="text-[10px] font-mono-code uppercase px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>{language === 'ja' ? 'AI接続済 (Gemini & Veo)' : 'Đã kết nối AI (Gemini & Veo)'}</span>
              </span>
            </div>
            <p className="text-xs text-zinc-400 hidden sm:block">
              {project ? project.title : t.appSubtitle}
            </p>
          </div>
        </div>

        {/* Project Meta & Quick Actions */}
        <div className="flex items-center gap-3">
          {project && (
            <div className="hidden md:flex items-center gap-3 bg-zinc-900/80 border border-zinc-800 rounded-full px-3 py-1.5 text-xs text-zinc-300">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="font-mono-code font-semibold">{project.scenes.length}</span> {language === 'ja' ? 'シーン' : 'Cảnh'}
              </span>
              <span className="text-zinc-600">•</span>
              <span>
                <span className="font-mono-code font-semibold">{totalShots}</span> {language === 'ja' ? 'カット' : 'Cú máy'}
              </span>
              <span className="text-zinc-600">•</span>
              <span className="font-mono-code text-amber-400">{totalDuration}s</span>
              <span className="text-zinc-600">•</span>
              <span className="px-1.5 py-0.5 rounded bg-zinc-800 text-[10px] font-mono-code text-zinc-400">
                {project.aspectRatio}
              </span>
            </div>
          )}

          {/* Language Switcher */}
          <button
            onClick={onToggleLanguage}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/80 text-xs font-semibold text-zinc-200 transition-colors"
            title="Ngôn ngữ / 言語切替"
          >
            <Globe className="w-3.5 h-3.5 text-amber-400" />
            <span>{language === 'ja' ? '🇯🇵 日本語' : '🇻🇳 Tiếng Việt'}</span>
          </button>

          {/* Saved Projects Library Button */}
          <button
            onClick={onOpenProjectsDrawer}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/80 text-xs font-semibold text-zinc-200 transition-colors shadow-sm"
            title={t.projectsListBtn}
          >
            <FolderOpen className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">{t.projectsListBtn}</span>
            {savedProjectsCount > 0 && (
              <span className="ml-0.5 px-1.5 py-0.2 rounded-full bg-amber-500/20 text-amber-300 font-mono-code text-[10px] font-bold border border-amber-500/30">
                {savedProjectsCount}
              </span>
            )}
          </button>

          {/* Sound Mute Toggle */}
          <button
            onClick={onToggleMute}
            className={`p-2 rounded-lg border transition-colors ${
              isMuted
                ? 'bg-zinc-900 border-zinc-800 text-zinc-500 hover:text-zinc-300'
                : 'bg-amber-500/10 border-amber-500/30 text-amber-400'
            }`}
            title={isMuted ? 'Bật âm thanh điện ảnh' : 'Tắt âm thanh'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* New Project / Screenplay */}
          <button
            onClick={onOpenNewProject}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-zinc-950 font-bold text-xs transition-all shadow-md shadow-amber-500/20"
          >
            <PlusCircle className="w-4 h-4" />
            <span>{t.newScriptBtn}</span>
          </button>
        </div>
      </div>

      {/* Navigation Workflow Tabs */}
      <div className="border-t border-zinc-900 bg-zinc-950/60 overflow-x-auto scrollbar-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center gap-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = currentTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 text-xs font-medium whitespace-nowrap transition-all border-b-2 ${
                  isActive
                    ? 'border-amber-400 text-amber-400 bg-amber-500/5'
                    : 'border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/50'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-zinc-500'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
