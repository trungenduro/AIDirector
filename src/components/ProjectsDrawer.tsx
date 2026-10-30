import React, { useRef } from 'react';
import { 
  FolderOpen, Plus, Trash2, Copy, Download, Upload, X, Film, 
  Clock, Layers, CheckCircle, Sparkles, Video, Calendar
} from 'lucide-react';
import { ScreenplayProject } from '../types/film';
import { Language, TRANSLATIONS } from '../locales/i18n';

interface ProjectsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedProjects: ScreenplayProject[];
  currentProjectId?: string;
  onSelectProject: (project: ScreenplayProject) => void;
  onDeleteProject: (projectId: string) => void;
  onDuplicateProject: (project: ScreenplayProject) => void;
  onImportProject: (project: ScreenplayProject) => void;
  onOpenNewProjectModal: () => void;
  language: Language;
}

export const ProjectsDrawer: React.FC<ProjectsDrawerProps> = ({
  isOpen,
  onClose,
  savedProjects,
  currentProjectId,
  onSelectProject,
  onDeleteProject,
  onDuplicateProject,
  onImportProject,
  onOpenNewProjectModal,
  language,
}) => {
  const t = TRANSLATIONS[language];
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  // Handle Import JSON
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        if (json && json.title && Array.isArray(json.scenes)) {
          onImportProject(json);
        } else {
          alert(language === 'ja' ? '無効なプロジェクトファイルです' : 'Tệp dự án không hợp lệ');
        }
      } catch (err: any) {
        alert(language === 'ja' ? '読み込みエラー: ' + err.message : 'Lỗi đọc tệp: ' + err.message);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  // Handle Export JSON
  const handleExportJson = (project: ScreenplayProject) => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(project, null, 2));
    const dlAnchor = document.createElement('a');
    dlAnchor.setAttribute('href', dataStr);
    dlAnchor.setAttribute('download', `${project.title.replace(/\s+/g, '_')}_CineAI_Project.json`);
    dlAnchor.click();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="bg-zinc-950 border border-zinc-800 rounded-3xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center shadow-md">
              <FolderOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-cinematic font-bold text-lg text-white">
                {t.projectsDrawerTitle}
              </h2>
              <p className="text-xs text-zinc-400 mt-0.5">
                {t.projectsDrawerSubtitle}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Import Project Button */}
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              accept=".json" 
              className="hidden" 
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-xs font-medium text-zinc-300 hover:text-white flex items-center gap-1.5 transition-colors"
              title={t.importJsonBtn}
            >
              <Upload className="w-3.5 h-3.5 text-indigo-400" />
              <span className="hidden sm:inline">{t.importJsonBtn}</span>
            </button>

            {/* Create New Script Project */}
            <button
              onClick={() => {
                onClose();
                onOpenNewProjectModal();
              }}
              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-zinc-950 font-bold text-xs flex items-center gap-1.5 shadow-md shadow-amber-500/20 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>{t.newScriptBtn}</span>
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-900 border border-zinc-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Projects List Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {savedProjects.length === 0 ? (
            <div className="text-center py-16 px-4 bg-zinc-900/30 border border-dashed border-zinc-800 rounded-2xl">
              <Film className="w-12 h-12 text-zinc-600 mx-auto mb-3" />
              <p className="text-sm text-zinc-400 max-w-md mx-auto">
                {t.noSavedProjects}
              </p>
              <button
                onClick={() => {
                  onClose();
                  onOpenNewProjectModal();
                }}
                className="mt-4 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs inline-flex items-center gap-2 shadow-lg shadow-amber-500/20"
              >
                <Plus className="w-4 h-4" />
                <span>{t.newScriptBtn}</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {savedProjects.map((proj) => {
                const isCurrent = proj.id === currentProjectId || (!proj.id && proj.title === currentProjectId);
                const allShots = proj.scenes.flatMap(s => s.shots);
                const totalDuration = allShots.reduce((acc, s) => acc + (s.duration || 4), 0);
                const firstCover = allShots.find(s => s.storyboardUrl)?.storyboardUrl;

                return (
                  <div
                    key={proj.id || proj.title}
                    className={`rounded-2xl border transition-all flex flex-col justify-between overflow-hidden group ${
                      isCurrent
                        ? 'bg-amber-500/10 border-amber-500/60 ring-1 ring-amber-500/30 shadow-xl'
                        : 'bg-zinc-900/40 hover:bg-zinc-900/70 border-zinc-800/80 hover:border-zinc-700'
                    }`}
                  >
                    {/* Top Thumbnail Preview */}
                    <div className="relative aspect-[21/9] bg-zinc-900 overflow-hidden flex items-center justify-center border-b border-zinc-800/50">
                      {firstCover ? (
                        <img 
                          src={firstCover} 
                          alt={proj.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-zinc-900 via-zinc-950 to-zinc-900 flex items-center justify-center">
                          <Film className="w-8 h-8 text-zinc-700" />
                        </div>
                      )}

                      {/* Active Status Badge */}
                      {isCurrent && (
                        <span className="absolute top-2 left-2 px-2.5 py-1 rounded-lg bg-amber-500 text-zinc-950 font-bold text-[10px] font-mono-code flex items-center gap-1 shadow-md">
                          <CheckCircle className="w-3 h-3" />
                          <span>{t.activeBadge}</span>
                        </span>
                      )}

                      {/* Aspect Ratio Badge */}
                      <span className="absolute top-2 right-2 px-2 py-0.5 rounded bg-black/80 backdrop-blur text-[10px] font-mono-code text-zinc-300 border border-zinc-700">
                        {proj.aspectRatio || '16:9'}
                      </span>

                      {/* Duration Badge */}
                      <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/80 backdrop-blur text-[10px] font-mono-code text-amber-400 border border-amber-500/30">
                        {totalDuration}s
                      </span>
                    </div>

                    {/* Project Info */}
                    <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                      <div>
                        <div className="flex items-center gap-2 text-[11px] font-mono-code text-zinc-400">
                          <span className="text-amber-400 font-semibold">{proj.genre}</span>
                          <span>•</span>
                          <span>{proj.scenes.length} {language === 'ja' ? 'シーン' : 'cảnh'}</span>
                          <span>•</span>
                          <span>{allShots.length} {language === 'ja' ? 'カット' : 'cú máy'}</span>
                        </div>
                        <h3 className="font-cinematic font-bold text-base text-white mt-1 group-hover:text-amber-300 transition-colors line-clamp-1">
                          {proj.title}
                        </h3>
                        {proj.logline && (
                          <p className="text-xs text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
                            {proj.logline}
                          </p>
                        )}
                      </div>

                      {/* Actions Toolbar */}
                      <div className="pt-3 border-t border-zinc-800/60 flex items-center justify-between gap-2">
                        {/* Open & Edit Button */}
                        <button
                          onClick={() => {
                            onSelectProject(proj);
                            onClose();
                          }}
                          className={`flex-1 py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm ${
                            isCurrent
                              ? 'bg-amber-500 hover:bg-amber-400 text-zinc-950 shadow-amber-500/20'
                              : 'bg-zinc-800 hover:bg-zinc-700 text-white'
                          }`}
                        >
                          <FolderOpen className="w-3.5 h-3.5" />
                          <span>{t.loadProjectBtn}</span>
                        </button>

                        {/* Export JSON */}
                        <button
                          onClick={() => handleExportJson(proj)}
                          className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-400 hover:text-white transition-colors"
                          title={t.exportJsonBtn}
                        >
                          <Download className="w-3.5 h-3.5" />
                        </button>

                        {/* Duplicate Project */}
                        <button
                          onClick={() => onDuplicateProject(proj)}
                          className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-400 hover:text-white transition-colors"
                          title={t.duplicateProjectBtn}
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>

                        {/* Delete Project */}
                        <button
                          onClick={() => {
                            if (window.confirm(t.confirmDelete)) {
                              onDeleteProject(proj.id || proj.title);
                            }
                          }}
                          className="p-2 rounded-xl bg-zinc-900 hover:bg-red-950/40 border border-zinc-700 hover:border-red-500/40 text-zinc-400 hover:text-red-400 transition-colors"
                          title={t.deleteProjectBtn}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-zinc-800 bg-zinc-900/30 flex items-center justify-between text-xs text-zinc-400">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>
              {language === 'ja'
                ? `現在 ${savedProjects.length} 件の制作プロジェクトを保管中`
                : `Đang lưu trữ ${savedProjects.length} dự án phim điện ảnh`}
            </span>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-xs font-medium text-white transition-colors"
          >
            {t.closeBtn}
          </button>
        </div>
      </div>
    </div>
  );
};
