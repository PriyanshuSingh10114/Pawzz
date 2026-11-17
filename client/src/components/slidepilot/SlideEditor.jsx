import React, { useState } from 'react';
import {
  ArrowUp,
  ArrowDown,
  Trash2,
  Plus,
  RefreshCw,
  Sparkles,
  Layout,
  Maximize2,
  FileDown,
  Check,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from 'lucide-react';
import SlideRenderer from './SlideRenderer';
import { SlidePilotService } from '../../services/api';
import { useNotification } from '../../context/NotificationContext';

export default function SlideEditor({
  project,
  setProject,
  onOpenExportModal,
}) {
  const { addNotification } = useNotification();
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [aspectRatio, setAspectRatio] = useState('portrait'); // 'portrait' or 'square'
  const [regenerating, setRegenerating] = useState(false);
  const [customRegenPrompt, setCustomRegenPrompt] = useState('');
  const [showRegenInput, setShowRegenInput] = useState(false);

  const slides = project.slides || [];
  const currentSlide = slides[activeSlideIndex] || slides[0] || {};

  const handleUpdateSlideField = (field, value) => {
    const updated = [...slides];
    updated[activeSlideIndex] = {
      ...updated[activeSlideIndex],
      [field]: value,
    };
    setProject({ ...project, slides: updated });
  };

  const handleMoveSlide = (direction) => {
    const newIndex = direction === 'up' ? activeSlideIndex - 1 : activeSlideIndex + 1;
    if (newIndex < 0 || newIndex >= slides.length) return;

    const updated = [...slides];
    const temp = updated[activeSlideIndex];
    updated[activeSlideIndex] = updated[newIndex];
    updated[newIndex] = temp;

    // Re-index slideNumber
    updated.forEach((s, idx) => {
      s.slideNumber = idx + 1;
    });

    setProject({ ...project, slides: updated });
    setActiveSlideIndex(newIndex);
    addNotification('Slide reordered', 'info', 1500);
  };

  const handleAddSlide = () => {
    const newSlideNumber = slides.length + 1;
    const newSlide = {
      slideNumber: newSlideNumber,
      headline: `Key Point #${newSlideNumber}: Focus on High Leverage`,
      description: `Explain the tactical takeaway here in 2 to 3 concise sentences.`,
      visualType: 'Concept Framework',
      tag: `Step #${newSlideNumber}`,
      cta: 'Swipe to next slide →',
    };

    const updated = [...slides, newSlide];
    setProject({ ...project, slides: updated });
    setActiveSlideIndex(updated.length - 1);
    addNotification('New slide added', 'success', 2000);
  };

  const handleDeleteSlide = () => {
    if (slides.length <= 2) {
      addNotification('Carousel must retain at least 2 slides', 'error', 3000);
      return;
    }

    const updated = slides.filter((_, idx) => idx !== activeSlideIndex);
    updated.forEach((s, idx) => {
      s.slideNumber = idx + 1;
    });

    const nextIndex = Math.max(0, activeSlideIndex - 1);
    setProject({ ...project, slides: updated });
    setActiveSlideIndex(nextIndex);
    addNotification('Slide deleted', 'info', 2000);
  };

  const handleRegenerateSlide = async () => {
    try {
      setRegenerating(true);
      const res = await SlidePilotService.regenerateSlide({
        topic: project.topic,
        slideNumber: currentSlide.slideNumber,
        totalSlides: slides.length,
        currentHeadline: currentSlide.headline,
        currentDescription: currentSlide.description,
        tone: project.tone,
        customInstruction: customRegenPrompt,
      });

      if (res.data) {
        const updated = [...slides];
        updated[activeSlideIndex] = {
          ...updated[activeSlideIndex],
          headline: res.data.headline,
          description: res.data.description,
          visualType: res.data.visualType,
          tag: res.data.tag,
          cta: res.data.cta,
        };
        setProject({ ...project, slides: updated });
        addNotification(`Slide ${currentSlide.slideNumber} reimagined by AI!`, 'success');
        setShowRegenInput(false);
        setCustomRegenPrompt('');
      }
    } catch (err) {
      addNotification(err.message || 'Failed to regenerate slide', 'error');
    } finally {
      setRegenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Toolbar: Aspect Ratio, Template Selector, Slide Count */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
        {/* Template Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Template:
          </span>
          <select
            value={project.template || 'minimal-editorial'}
            onChange={(e) => setProject({ ...project, template: e.target.value })}
            className="p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none cursor-pointer"
          >
            <option value="minimal-editorial">Minimal Editorial</option>
            <option value="modern-gradient">Modern Gradient (Dark)</option>
            <option value="corporate">Corporate Executive</option>
            <option value="educational-infographic">Educational Infographic</option>
            <option value="bold-typography">Bold Brutalist Typography</option>
          </select>
        </div>

        {/* Aspect Ratio Selector (Portrait 4:5 vs Square 1:1) */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl">
          <button
            onClick={() => setAspectRatio('portrait')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              aspectRatio === 'portrait'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            4:5 (Instagram / 1080x1350)
          </button>
          <button
            onClick={() => setAspectRatio('square')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              aspectRatio === 'square'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            1:1 (LinkedIn / 1080x1080)
          </button>
        </div>

        {/* Export / Founder Review Action */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenExportModal}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-2"
          >
            <FileDown className="w-4 h-4 text-amber-400" />
            <span>Review & Export</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Left Thumbnails + Center Slide Visual + Right Form Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Thumbnails Strip (2 Cols) */}
        <div className="lg:col-span-2 space-y-2 order-2 lg:order-1">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-1">
            <span>SLIDES ({slides.length})</span>
            <button
              onClick={handleAddSlide}
              className="text-amber-600 hover:text-amber-700 flex items-center gap-1 font-bold"
              title="Add slide"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add</span>
            </button>
          </div>

          <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-y-auto max-h-[550px] pb-2">
            {slides.map((s, idx) => (
              <div
                key={idx}
                onClick={() => setActiveSlideIndex(idx)}
                className={`p-3 rounded-xl border text-left cursor-pointer transition-all shrink-0 w-36 lg:w-full ${
                  activeSlideIndex === idx
                    ? 'bg-amber-50/70 border-amber-500 shadow-sm ring-2 ring-amber-500/20'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-bold text-slate-400">
                  <span>Slide {s.slideNumber}</span>
                  {idx === 0 && <span className="text-amber-600">Cover</span>}
                  {idx === slides.length - 1 && <span className="text-indigo-600">CTA</span>}
                </div>
                <div className="font-bold text-xs text-slate-800 truncate mt-1">
                  {s.headline}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Center: Live Rendered Slide Canvas (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col items-center order-1 lg:order-2">
          <div className="w-full flex items-center justify-between mb-3 px-2 text-xs">
            <span className="font-bold text-slate-500">
              Editing Slide {activeSlideIndex + 1} of {slides.length}
            </span>
            <div className="flex items-center gap-1">
              <button
                disabled={activeSlideIndex === 0}
                onClick={() => setActiveSlideIndex(activeSlideIndex - 1)}
                className="p-1 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 disabled:opacity-40"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                disabled={activeSlideIndex === slides.length - 1}
                onClick={() => setActiveSlideIndex(activeSlideIndex + 1)}
                className="p-1 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 disabled:opacity-40"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Render Slide */}
          <div className="w-full flex justify-center">
            <SlideRenderer
              slide={currentSlide}
              totalSlides={slides.length}
              template={project.template}
              aspectRatio={aspectRatio}
              authorName={project.targetAudience ? `For: ${project.targetAudience.slice(0, 22)}` : 'NexaStudio'}
            />
          </div>
        </div>

        {/* Right: Slide Inspector & Reorder Controls (5 Cols) */}
        <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4 text-xs order-3">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-bold text-slate-900 text-sm">
              Slide Inspector (#{currentSlide.slideNumber})
            </h3>

            {/* Reorder and Delete Actions */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => handleMoveSlide('up')}
                disabled={activeSlideIndex === 0}
                className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-30"
                title="Move slide earlier"
              >
                <ArrowUp className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleMoveSlide('down')}
                disabled={activeSlideIndex === slides.length - 1}
                className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-30"
                title="Move slide later"
              >
                <ArrowDown className="w-4 h-4" />
              </button>
              <button
                onClick={handleDeleteSlide}
                className="p-1.5 rounded-lg border border-rose-200 text-rose-600 hover:bg-rose-50"
                title="Delete this slide"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Headline Input */}
          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Slide Headline / Hook
            </label>
            <input
              type="text"
              value={currentSlide.headline || ''}
              onChange={(e) => handleUpdateSlideField('headline', e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-bold focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20"
            />
          </div>

          {/* Description Input */}
          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Slide Body Content & Supporting Insight
            </label>
            <textarea
              rows={3}
              value={currentSlide.description || ''}
              onChange={(e) => handleUpdateSlideField('description', e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20"
            />
          </div>

          {/* Tag & Visual Type */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Tag / Pill</label>
              <input
                type="text"
                value={currentSlide.tag || ''}
                onChange={(e) => handleUpdateSlideField('tag', e.target.value)}
                placeholder="e.g. Rule #1"
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:bg-white"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Visual Type</label>
              <input
                type="text"
                value={currentSlide.visualType || ''}
                onChange={(e) => handleUpdateSlideField('visualType', e.target.value)}
                placeholder="Framework / Metric"
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:bg-white"
              />
            </div>
          </div>

          {/* Micro CTA */}
          <div>
            <label className="block font-bold text-slate-700 mb-1">Bottom Cue / Micro CTA</label>
            <input
              type="text"
              value={currentSlide.cta || ''}
              onChange={(e) => handleUpdateSlideField('cta', e.target.value)}
              placeholder="e.g. Swipe next →"
              className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:bg-white"
            />
          </div>

          {/* AI Slide Regeneration Tool */}
          <div className="pt-3 border-t border-slate-100 space-y-2">
            {!showRegenInput ? (
              <button
                type="button"
                onClick={() => setShowRegenInput(true)}
                className="w-full py-2 px-3 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>Reimagine This Slide with AI</span>
              </button>
            ) : (
              <div className="p-3 bg-amber-50/60 rounded-xl border border-amber-200 space-y-2 animate-fade-in">
                <div className="text-[11px] font-bold text-amber-900">
                  Custom AI Refinement Instruction (Optional):
                </div>
                <input
                  type="text"
                  value={customRegenPrompt}
                  onChange={(e) => setCustomRegenPrompt(e.target.value)}
                  placeholder="e.g. Make it more contrarian, add metric emphasis..."
                  className="w-full p-2 bg-white border border-amber-300 rounded-lg text-xs text-slate-800 focus:outline-none"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowRegenInput(false)}
                    className="w-1/3 py-1.5 border border-slate-200 rounded-lg text-slate-600 font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleRegenerateSlide}
                    disabled={regenerating}
                    className="w-2/3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg flex items-center justify-center gap-1.5 disabled:opacity-50"
                  >
                    {regenerating ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Sparkles className="w-3.5 h-3.5" />
                    )}
                    <span>{regenerating ? 'Regenerating...' : 'Apply AI Rewrite'}</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
