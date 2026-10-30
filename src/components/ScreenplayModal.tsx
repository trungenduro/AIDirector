import React, { useState, useEffect } from 'react';
import { X, Sparkles, Wand2, BookOpen, Film, Sliders, ChevronRight } from 'lucide-react';
import { getSampleScreenplays, SampleScreenplay } from '../data/sampleScreenplays';
import { ScreenplayProject } from '../types/film';
import { Language, TRANSLATIONS } from '../locales/i18n';

interface ScreenplayModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAnalyzeScreenplay: (params: {
    screenplay: string;
    genre: string;
    style: string;
    pacing: string;
    aspectRatio: '16:9' | '2.39:1' | '9:16';
  }) => Promise<void>;
  isAnalyzing: boolean;
  language: Language;
}

const DIRECTOR_QUOTES = [
  { quote: '映画とは、毎秒24コマの真実である。', author: 'ジャン＝リュック・ゴダール' },
  { quote: '映画は地震で始まり、そこから緊張が高まっていくべきだ。', author: 'アルフレッド・ヒッチコック' },
  { quote: '光と影の設計こそが、映像の魂を宿す。', author: 'ロジャー・ディーキンス (ASC, BSC)' },
  { quote: '映画は国境を越え、人間の深層心理を繋ぐ共通言語である。', author: '黒澤明' },
];

export const ScreenplayModal: React.FC<ScreenplayModalProps> = ({
  isOpen,
  onClose,
  onAnalyzeScreenplay,
  isAnalyzing,
  language,
}) => {
  const t = TRANSLATIONS[language];
  const samples = getSampleScreenplays(language);
  const [selectedSample, setSelectedSample] = useState<SampleScreenplay>(samples[0]);
  const [screenplayText, setScreenplayText] = useState<string>(samples[0].content);
  const [genre, setGenre] = useState<string>(samples[0].genre);
  const [style, setStyle] = useState<string>(samples[0].style);
  const [pacing, setPacing] = useState<string>(samples[0].pacing);
  const [aspectRatio, setAspectRatio] = useState<'16:9' | '2.39:1' | '9:16'>(samples[0].aspectRatio);
  const [quoteIdx, setQuoteIdx] = useState(0);

  useEffect(() => {
    const newSamples = getSampleScreenplays(language);
    if (newSamples.length > 0) {
      setSelectedSample(newSamples[0]);
      setScreenplayText(newSamples[0].content);
      setGenre(newSamples[0].genre);
      setStyle(newSamples[0].style);
      setPacing(newSamples[0].pacing);
      setAspectRatio(newSamples[0].aspectRatio);
    }
  }, [language]);

  if (!isOpen) return null;

  const handleSelectSample = (sample: SampleScreenplay) => {
    setSelectedSample(sample);
    setScreenplayText(sample.content);
    setGenre(sample.genre);
    setStyle(sample.style);
    setPacing(sample.pacing);
    setAspectRatio(sample.aspectRatio);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!screenplayText.trim()) return;
    setQuoteIdx(Math.floor(Math.random() * DIRECTOR_QUOTES.length));
    await onAnalyzeScreenplay({
      screenplay: screenplayText,
      genre,
      style,
      pacing,
      aspectRatio,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="bg-zinc-950 border border-zinc-800 rounded-2xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-zinc-800/80 flex items-center justify-between bg-zinc-900/60">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <Film className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-cinematic font-bold text-lg text-white">
                {t.modalTitle}
              </h2>
              <p className="text-xs text-zinc-400">
                {t.modalSubtitle}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Preset Sample Cards */}
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400 block mb-2 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-amber-400" />
              {t.sampleScriptsLabel}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5">
              {samples.map((s) => {
                const isSelected = selectedSample.id === s.id;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => handleSelectSample(s)}
                    className={`text-left p-3 rounded-xl border transition-all text-xs flex flex-col justify-between ${
                      isSelected
                        ? 'bg-amber-500/10 border-amber-500/60 text-white shadow-sm ring-1 ring-amber-500/40'
                        : 'bg-zinc-900/60 border-zinc-800/80 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                    }`}
                  >
                    <div>
                      <span className="font-semibold block text-zinc-200 truncate">{s.title}</span>
                      <span className="text-[10px] text-amber-400/90 block mt-0.5 truncate">{s.genre}</span>
                      <p className="text-[11px] text-zinc-500 mt-1 line-clamp-2 leading-relaxed">
                        {s.description}
                      </p>
                    </div>
                    <div className="mt-2.5 pt-2 border-t border-zinc-800/50 flex items-center justify-between text-[10px] text-zinc-400 font-mono-code">
                      <span>{s.aspectRatio}</span>
                      <span className="text-amber-400">{t.sampleSelect}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Screenplay Text Area */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                <Wand2 className="w-3.5 h-3.5 text-amber-400" />
                {t.screenplayLabel}
              </label>
              <span className="text-[11px] font-mono-code text-zinc-500">
                {screenplayText.length} {language === 'ja' ? '文字' : 'ký tự'}
              </span>
            </div>
            <textarea
              value={screenplayText}
              onChange={(e) => setScreenplayText(e.target.value)}
              placeholder={t.screenplayPlaceholder}
              rows={8}
              className="w-full bg-zinc-900/90 border border-zinc-800 rounded-xl p-3.5 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/30 transition-all font-mono-code leading-relaxed"
            />
          </div>

          {/* Director Configuration: Style, Lighting, Pacing, Aspect Ratio */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/60">
            {/* Genre */}
            <div>
              <label className="text-[11px] font-medium text-zinc-400 block mb-1">
                {t.genreLabel}
              </label>
              <input
                type="text"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                placeholder="Cyberpunk, Drama, Thriller..."
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-xs text-zinc-200 focus:outline-none focus:border-amber-500/50"
              />
            </div>

            {/* Visual Style */}
            <div>
              <label className="text-[11px] font-medium text-zinc-400 block mb-1">
                {t.styleLabel}
              </label>
              <input
                type="text"
                value={style}
                onChange={(e) => setStyle(e.target.value)}
                placeholder="Anamorphic 35mm, Chiaroscuro..."
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-xs text-zinc-200 focus:outline-none focus:border-amber-500/50"
              />
            </div>

            {/* Pacing */}
            <div>
              <label className="text-[11px] font-medium text-zinc-400 block mb-1">
                {t.pacingLabel}
              </label>
              <select
                value={pacing}
                onChange={(e) => setPacing(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-xs text-zinc-200 focus:outline-none focus:border-amber-500/50"
              >
                <option value="Slow-burn, tense & contemplative">{language === 'ja' ? '重厚・静謐 (Slow-burn)' : 'Chậm rãi, sâu lắng'}</option>
                <option value="Dramatic & Intense">{language === 'ja' ? '劇的・緊迫 (Dramatic)' : 'Kịch tính, căng thẳng'}</option>
                <option value="Fast-paced, pulse-pounding action">{language === 'ja' ? '疾走感・ハイスピード (Fast-paced)' : 'Dồn dập, nghẹt thở'}</option>
                <option value="Poetic, lyrical & tender">{language === 'ja' ? '詩的・抒情派 (Poetic)' : 'Thơ mộng, hoài niệm'}</option>
              </select>
            </div>

            {/* Aspect Ratio */}
            <div>
              <label className="text-[11px] font-medium text-zinc-400 block mb-1">
                {t.ratioLabel}
              </label>
              <select
                value={aspectRatio}
                onChange={(e) => setAspectRatio(e.target.value as any)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-2.5 py-1.5 text-xs text-zinc-200 focus:outline-none focus:border-amber-500/50 font-mono-code"
              >
                <option value="2.39:1">2.39:1 (Anamorphic Widescreen)</option>
                <option value="16:9">16:9 (Standard Cinematic HD/4K)</option>
                <option value="9:16">9:16 (Vertical Cinematic Mobile)</option>
              </select>
            </div>
          </div>

          {/* Inspirational Director Quote */}
          <div className="p-3.5 rounded-xl bg-gradient-to-r from-amber-500/5 via-zinc-900 to-indigo-500/5 border border-zinc-800/50 text-center">
            <p className="text-xs italic text-zinc-300">
              "{DIRECTOR_QUOTES[quoteIdx].quote}"
            </p>
            <p className="text-[10px] text-amber-400/80 font-mono-code mt-1">
              — {DIRECTOR_QUOTES[quoteIdx].author}
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-zinc-800/80 flex items-center justify-between bg-zinc-900/40">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-xs font-medium text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            {t.cancelBtn}
          </button>

          <button
            type="button"
            disabled={isAnalyzing || !screenplayText.trim()}
            onClick={handleSubmit}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-semibold transition-all shadow-lg ${
              isAnalyzing
                ? 'bg-amber-600/50 text-white cursor-wait'
                : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-zinc-950 shadow-amber-500/20 hover:shadow-amber-500/30'
            }`}
          >
            {isAnalyzing ? (
              <>
                <div className="w-4 h-4 border-2 border-zinc-950 border-t-transparent rounded-full animate-spin" />
                <span>{t.analyzingBtn}</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>{t.analyzeBtn}</span>
                <ChevronRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
