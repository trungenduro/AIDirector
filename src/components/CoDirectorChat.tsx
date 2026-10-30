import React, { useState } from 'react';
import { 
  MessageSquare, Send, Sparkles, Check, ArrowRight, User, Bot, 
  HelpCircle, Camera, Volume2, Clock, Clapperboard, Video
} from 'lucide-react';
import { ChatMessage, Scene, ScreenplayProject, Shot } from '../types/film';
import { Language, TRANSLATIONS } from '../locales/i18n';

interface CoDirectorChatProps {
  project: ScreenplayProject;
  activeShot: Shot | null;
  activeScene: Scene | null;
  onSelectShot: (shot: Shot) => void;
  onUpdateShot: (shotId: string, updates: Partial<Shot>) => void;
  onNavigateToProduction: (shot: Shot) => void;
  messages: ChatMessage[];
  onSendMessage: (text: string, currentShot: Shot | null, currentScene: Scene | null) => Promise<void>;
  isLoading: boolean;
  language?: Language;
}

export const CoDirectorChat: React.FC<CoDirectorChatProps> = ({
  project,
  activeShot,
  activeScene,
  onSelectShot,
  onUpdateShot,
  onNavigateToProduction,
  messages,
  onSendMessage,
  isLoading,
  language = 'ja',
}) => {
  const t = TRANSLATIONS[language];
  const [inputText, setInputText] = useState('');
  const allShots = project.scenes.flatMap(s => s.shots);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim() || isLoading) return;
    const text = inputText;
    setInputText('');
    await onSendMessage(text, activeShot, activeScene);
  };

  const handleApplyUpdatedShot = (msg: ChatMessage) => {
    if (msg.shotId && msg.updatedShotData) {
      onUpdateShot(msg.shotId, msg.updatedShotData);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-16">
      {/* Left Column: Active Shot Context Card & Shot Selector */}
      <div className="lg:col-span-4 space-y-4">
        {/* Shot Selector Dropdown */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-4 shadow-lg space-y-3">
          <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400 block flex items-center gap-1.5">
            <Camera className="w-4 h-4 text-amber-400" />
            {t.selectShotLabel}
          </label>
          <select
            value={activeShot ? activeShot.id : ''}
            onChange={(e) => {
              const found = allShots.find(s => s.id === e.target.value);
              if (found) onSelectShot(found);
            }}
            className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500 font-mono-code"
          >
            {allShots.map((s) => (
              <option key={s.id} value={s.id}>
                {language === 'ja' ? `シーン ${s.sceneNumber} • カット #${s.shotNumber}: ${s.title} (${s.shotType})` : `Cảnh ${s.sceneNumber} • Shot #${s.shotNumber}: ${s.title} (${s.shotType})`}
              </option>
            ))}
          </select>
        </div>

        {/* Selected Shot Detail Card */}
        {activeShot && (
          <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-5 shadow-lg space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono-code font-bold text-xs flex items-center justify-center">
                  #{activeShot.shotNumber}
                </span>
                <div>
                  <h4 className="font-semibold text-sm text-white">{activeShot.title}</h4>
                  <span className="text-[10px] text-zinc-400 font-mono-code">
                    {language === 'ja' ? `シーン ${activeShot.sceneNumber}` : `Cảnh ${activeShot.sceneNumber}`}
                  </span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 text-xs font-mono-code">
                {activeShot.shotType}
              </span>
            </div>

            {/* Frame Thumbnail if available */}
            {activeShot.storyboardUrl && (
              <div className="rounded-xl overflow-hidden border border-zinc-800 aspect-video bg-black">
                <img
                  src={activeShot.storyboardUrl}
                  alt={activeShot.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="space-y-2 text-xs">
              <div>
                <span className="text-zinc-500 font-mono-code">{t.cameraMovementLabel} </span>
                <span className="text-zinc-300 font-medium">{activeShot.cameraMovement}</span>
              </div>
              <div>
                <span className="text-zinc-500 font-mono-code">{t.lensLabel} </span>
                <span className="text-amber-400 font-mono-code">{activeShot.lens}</span>
              </div>
              <div>
                <span className="text-zinc-500 font-mono-code">{t.actionLabel} </span>
                <p className="text-zinc-300 mt-0.5 leading-relaxed">{activeShot.actionDescription}</p>
              </div>
              {activeShot.dialogue && activeShot.dialogue.text && (
                <div className="p-2.5 rounded-lg bg-amber-500/5 border border-amber-500/20 text-zinc-300">
                  <span className="text-amber-400 font-semibold">{activeShot.dialogue.speaker}: </span>
                  "{activeShot.dialogue.text}"
                </div>
              )}
            </div>

            {/* OK - Proceed to Veo Production */}
            <div className="pt-2 border-t border-zinc-800">
              <button
                onClick={() => onNavigateToProduction(activeShot)}
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-zinc-950 font-semibold text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all"
              >
                <Video className="w-4 h-4 fill-current" />
                <span>{t.proceedToVeoBtn}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Right Column: Interactive Chat with Co-Director */}
      <div className="lg:col-span-8 bg-zinc-950 border border-zinc-800 rounded-2xl flex flex-col h-[750px] shadow-xl overflow-hidden">
        {/* Chat Header */}
        <div className="px-6 py-4 border-b border-zinc-800 bg-zinc-900/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-indigo-600 p-[1px] flex items-center justify-center shadow">
              <div className="w-full h-full bg-zinc-950 rounded-xl flex items-center justify-center">
                <Bot className="w-5 h-5 text-amber-400" />
              </div>
            </div>
            <div>
              <h3 className="font-cinematic font-bold text-sm text-white">
                {t.coDirectorTitle}
              </h3>
              <p className="text-[11px] text-zinc-400">
                {t.coDirectorSubtitle}
              </p>
            </div>
          </div>

          <span className="text-[10px] font-mono-code px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> {language === 'ja' ? 'オンライン' : 'Sẵn sàng'}
          </span>
        </div>

        {/* Messages Stream */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((msg) => {
            const isUser = msg.sender === 'director';

            return (
              <div
                key={msg.id}
                className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-xl rounded-2xl p-4 text-xs space-y-2 leading-relaxed ${
                    isUser
                      ? 'bg-amber-500 text-zinc-950 font-medium rounded-tr-none shadow-md'
                      : 'bg-zinc-900/90 border border-zinc-800 text-zinc-200 rounded-tl-none shadow-md'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.text}</p>

                  {/* If Co-Director provided updated shot details */}
                  {msg.updatedShotData && (
                    <div className="mt-3 p-3 rounded-xl bg-zinc-950/80 border border-amber-500/30 text-zinc-300 space-y-2">
                      <div className="flex items-center justify-between text-[11px] text-amber-400 font-mono-code font-semibold">
                        <span>{language === 'ja' ? 'カット修正提案:' : 'ĐỀ XUẤT ĐIỀU CHỈNH CÚ MÁY:'}</span>
                        <span>{msg.updatedShotData.shotType}</span>
                      </div>
                      <p className="text-[11px] text-zinc-300">
                        {msg.updatedShotData.actionDescription}
                      </p>
                      <div className="flex items-center gap-2 pt-1 border-t border-zinc-800/80">
                        <button
                          onClick={() => handleApplyUpdatedShot(msg)}
                          className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-[11px] flex items-center gap-1.5 transition-colors shadow"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>{t.applyRevisionBtn}</span>
                        </button>
                      </div>
                    </div>
                  )}

                  <span
                    className={`block text-[9px] font-mono-code ${
                      isUser ? 'text-zinc-800' : 'text-zinc-500'
                    }`}
                  >
                    {msg.timestamp}
                  </span>
                </div>

                {isUser && (
                  <div className="w-8 h-8 rounded-lg bg-zinc-800 text-white flex items-center justify-center shrink-0 mt-0.5">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}

          {isLoading && (
            <div className="flex gap-3 justify-start items-center">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center">
                <Bot className="w-4 h-4" />
              </div>
              <div className="p-3.5 rounded-2xl rounded-tl-none bg-zinc-900 border border-zinc-800 text-zinc-400 text-xs flex items-center gap-2">
                <div className="w-3 h-3 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
                <span>{t.chatThinkingMsg}</span>
              </div>
            </div>
          )}
        </div>

        {/* Quick Suggestion Prompts */}
        <div className="px-6 py-2.5 border-t border-zinc-900 bg-zinc-950 overflow-x-auto scrollbar-none flex items-center gap-2">
          {t.quickPrompts.map((p, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setInputText(p)}
              className="px-3 py-1 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-[11px] text-zinc-300 hover:text-white whitespace-nowrap transition-colors"
            >
              {p}
            </button>
          ))}
        </div>

        {/* Chat Input */}
        <form
          onSubmit={handleSend}
          className="p-4 border-t border-zinc-800 bg-zinc-900/60 flex items-center gap-3"
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={
              activeShot
                ? (language === 'ja' ? `カット #${activeShot.shotNumber} の演出調整を助監督に指示（構図、光、感情、SE...）...` : `Yêu cầu Co-Director sửa cú máy #${activeShot.shotNumber} (góc máy, cảm xúc, ánh sáng, âm thanh...)...`)
                : t.chatPlaceholder
            }
            className="flex-1 bg-zinc-950 border border-zinc-700/80 rounded-xl px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/30"
          />
          <button
            type="submit"
            disabled={!inputText.trim() || isLoading}
            className="p-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-zinc-950 transition-all font-semibold shadow-md"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
