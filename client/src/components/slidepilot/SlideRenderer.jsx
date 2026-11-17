import React from 'react';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Lightbulb,
  CheckCircle,
  Bookmark,
  Share2,
} from 'lucide-react';

export default function SlideRenderer({
  slide,
  totalSlides,
  template = 'minimal-editorial',
  aspectRatio = 'portrait', // 'portrait' (4:5) or 'square' (1:1)
  authorName = 'NexaStudio / Founder',
  slideRef,
}) {
  const isPortrait = aspectRatio === 'portrait';
  const isFirst = slide.slideNumber === 1;
  const isLast = slide.slideNumber === totalSlides;

  // Aspect ratio class:
  // portrait: aspect-[4/5]
  // square: aspect-square
  const aspectClass = isPortrait ? 'aspect-[4/5]' : 'aspect-square';

  // 1. Template: Minimal Editorial
  if (template === 'minimal-editorial') {
    return (
      <div
        ref={slideRef}
        className={`${aspectClass} w-full max-w-md mx-auto bg-[#faf8f5] text-stone-900 p-8 rounded-2xl shadow-premium border border-stone-200 flex flex-col justify-between select-none relative overflow-hidden`}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between border-b border-stone-200 pb-4 text-[11px] font-mono tracking-wider uppercase text-stone-500">
          <span>{authorName}</span>
          <span className="font-bold text-stone-800">
            {slide.slideNumber} / {totalSlides}
          </span>
        </div>

        {/* Center Content */}
        <div className="space-y-4 my-auto">
          {slide.tag && (
            <div className="inline-block px-2.5 py-0.5 rounded-full bg-stone-200/80 text-[10px] font-mono uppercase tracking-wider text-stone-700">
              {slide.tag}
            </div>
          )}

          <h2
            className={`font-serif tracking-tight font-bold text-stone-900 leading-tight ${
              isFirst ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'
            }`}
          >
            {slide.headline}
          </h2>

          <div className="w-12 h-0.5 bg-stone-400" />

          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-sans">
            {slide.description}
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-stone-200 text-[11px] text-stone-500 font-sans">
          <span className="font-medium">{slide.visualType || 'Insight'}</span>
          <div className="flex items-center gap-1 font-semibold text-stone-800">
            <span>{slide.cta || (isLast ? 'Save for later' : 'Swipe next')}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    );
  }

  // 2. Template: Modern Gradient (Tech Mesh Dark)
  if (template === 'modern-gradient') {
    return (
      <div
        ref={slideRef}
        className={`${aspectClass} w-full max-w-md mx-auto bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 text-white p-8 rounded-2xl shadow-premium border border-indigo-500/30 flex flex-col justify-between select-none relative overflow-hidden`}
      >
        {/* Ambient gradient glow inside slide */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/20 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-rose-500/15 rounded-full blur-2xl pointer-events-none" />

        {/* Top Header */}
        <div className="flex items-center justify-between z-10 text-[11px] font-mono text-indigo-300 pb-4 border-b border-indigo-500/20">
          <div className="flex items-center gap-1.5 font-bold">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>{authorName}</span>
          </div>
          <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-white font-mono font-bold">
            {slide.slideNumber} / {totalSlides}
          </span>
        </div>

        {/* Content */}
        <div className="space-y-4 my-auto z-10">
          {slide.tag && (
            <span className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-indigo-500/30 to-violet-500/30 border border-indigo-400/40 text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-200">
              {slide.tag}
            </span>
          )}

          <h2
            className={`font-extrabold tracking-tight text-white leading-tight ${
              isFirst
                ? 'text-2xl sm:text-3xl bg-gradient-to-r from-white via-indigo-100 to-indigo-300 bg-clip-text text-transparent'
                : 'text-xl sm:text-2xl'
            }`}
          >
            {slide.headline}
          </h2>

          <div className="p-4 rounded-xl bg-slate-900/80 border border-indigo-500/20 backdrop-blur-md">
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
              {slide.description}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-indigo-500/20 z-10 text-[11px] text-slate-400">
          <span>{slide.visualType || 'Strategic Flow'}</span>
          <div className="flex items-center gap-1 font-bold text-amber-400">
            <span>{slide.cta || (isLast ? 'Bookmark & Share' : 'Swipe next')}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    );
  }

  // 3. Template: Corporate Executive (Navy & Slate)
  if (template === 'corporate') {
    return (
      <div
        ref={slideRef}
        className={`${aspectClass} w-full max-w-md mx-auto bg-[#0a192f] text-slate-100 p-8 rounded-2xl shadow-premium border-2 border-[#1e3a5f] flex flex-col justify-between select-none relative overflow-hidden`}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#1e3a5f] text-xs">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-400" />
            <span className="font-bold tracking-wider uppercase text-blue-200 text-[10px]">
              {authorName}
            </span>
          </div>
          <span className="font-mono text-blue-300 font-bold">
            SLIDE {slide.slideNumber} OF {totalSlides}
          </span>
        </div>

        {/* Content */}
        <div className="space-y-4 my-auto">
          {slide.tag && (
            <div className="inline-block px-2.5 py-1 rounded bg-[#172a45] text-blue-300 text-[10px] font-bold tracking-wider uppercase border border-blue-500/30">
              {slide.tag}
            </div>
          )}

          <h2
            className={`font-display font-bold text-white tracking-tight leading-snug ${
              isFirst ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'
            }`}
          >
            {slide.headline}
          </h2>

          <div className="pl-3 border-l-2 border-blue-500">
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
              {slide.description}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-[#1e3a5f] text-[11px] text-slate-400">
          <span className="text-slate-400">{slide.visualType || 'Executive Summary'}</span>
          <div className="flex items-center gap-1 font-bold text-blue-400">
            <span>{slide.cta || 'Next Slide'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    );
  }

  // 4. Template: Educational Infographic (Structured Breakdown)
  if (template === 'educational-infographic') {
    return (
      <div
        ref={slideRef}
        className={`${aspectClass} w-full max-w-md mx-auto bg-white text-slate-900 p-8 rounded-2xl shadow-premium border-2 border-emerald-500 flex flex-col justify-between select-none relative overflow-hidden`}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 text-xs">
          <span className="font-bold text-emerald-800 text-[11px]">{authorName}</span>
          <div className="w-7 h-7 rounded-full bg-emerald-600 text-white font-extrabold flex items-center justify-center text-xs">
            {slide.slideNumber}
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4 my-auto">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase">
              {slide.tag || `Key Principle #${slide.slideNumber}`}
            </span>
          </div>

          <h2
            className={`font-extrabold text-slate-900 tracking-tight leading-snug ${
              isFirst ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'
            }`}
          >
            {slide.headline}
          </h2>

          <div className="p-4 bg-emerald-50/70 rounded-xl border border-emerald-200">
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
              {slide.description}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-[11px]">
          <span className="text-slate-500 font-medium">{slide.visualType || 'Infographic'}</span>
          <div className="flex items-center gap-1 font-bold text-emerald-700">
            <span>{slide.cta || 'Swipe to continue'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    );
  }

  // 5. Template: Bold Typography (Brutalist High-Impact)
  return (
    <div
      ref={slideRef}
      className={`${aspectClass} w-full max-w-md mx-auto bg-amber-400 text-slate-950 p-8 rounded-2xl shadow-premium border-4 border-slate-950 flex flex-col justify-between select-none relative overflow-hidden`}
    >
      {/* Top Header */}
      <div className="flex items-center justify-between pb-3 border-b-2 border-slate-950 text-xs font-black uppercase">
        <span>{authorName}</span>
        <span className="bg-slate-950 text-white px-2 py-0.5 rounded">
          {slide.slideNumber} / {totalSlides}
        </span>
      </div>

      {/* Content */}
      <div className="space-y-3 my-auto">
        {slide.tag && (
          <div className="inline-block bg-slate-950 text-amber-400 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider">
            {slide.tag}
          </div>
        )}

        <h2
          className={`font-black uppercase tracking-tight text-slate-950 leading-none ${
            isFirst ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'
          }`}
        >
          {slide.headline}
        </h2>

        <div className="p-3 bg-white border-2 border-slate-950 rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
          <p className="text-xs sm:text-sm text-slate-900 font-semibold leading-snug">
            {slide.description}
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t-2 border-slate-950 text-xs font-black">
        <span className="uppercase">{slide.visualType || 'ACTION'}</span>
        <div className="flex items-center gap-1">
          <span>{slide.cta || 'SWIPE'}</span>
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
}

