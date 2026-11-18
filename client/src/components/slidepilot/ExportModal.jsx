import React, { useState, useRef } from 'react';
import {
  X,
  FileDown,
  Image,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Loader2,
  Share2,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import SlideRenderer from './SlideRenderer';
import { downloadSlidePng, exportCarouselToPdf } from '../../services/exportService';
import { SlidePilotService } from '../../services/api';
import { useNotification } from '../../context/NotificationContext';

export default function ExportModal({
  project,
  isOpen,
  onClose,
  onProjectUpdated,
}) {
  const { addNotification } = useNotification();
  const [currentPreviewIndex, setCurrentPreviewIndex] = useState(0);
  const [aspectRatio, setAspectRatio] = useState('portrait');
  const [exporting, setExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(null);
  const [status, setStatus] = useState(project?.status || 'Draft');

  const slideRef = useRef(null);
  const hiddenContainerRef = useRef(null);

  if (!isOpen || !project) return null;

  const slides = project.slides || [];
  const currentSlide = slides[currentPreviewIndex] || slides[0] || {};

  const handleStatusChange = async (newStatus) => {
    try {
      setStatus(newStatus);
      await SlidePilotService.updateProject(project.id || project._id, {
        ...project,
        status: newStatus,
      });
      addNotification(`Workflow status updated to "${newStatus}"`, 'info', 2000);
      if (onProjectUpdated) {
        onProjectUpdated({ ...project, status: newStatus });
      }
    } catch (err) {
      addNotification(err.message || 'Failed to update status', 'error');
    }
  };

  const handleDownloadSinglePng = async () => {
    if (!slideRef.current) return;
    try {
      setExporting(true);
      await downloadSlidePng(
        slideRef.current,
        `${project.title.slice(0, 25)}_Slide_${currentSlide.slideNumber}.png`
      );
      addNotification(`Slide ${currentSlide.slideNumber} exported as PNG!`, 'success');
    } catch (err) {
      addNotification(err.message || 'Failed to export PNG', 'error');
    } finally {
      setExporting(false);
    }
  };

  const handleExportFullPdf = async () => {
    try {
      setExporting(true);
      setExportProgress('Rendering slides for LinkedIn Carousel PDF...');

      const container = hiddenContainerRef.current;
      if (!container) throw new Error('Render canvas not available');

      const elements = container.querySelectorAll('.exportable-slide-node');
      if (elements.length === 0) throw new Error('No slide elements ready for PDF export');

      await exportCarouselToPdf({
        slideElements: Array.from(elements),
        title: project.title,
        aspectRatio,
        onProgress: (current, total) => {
          setExportProgress(`Generating PDF: processing slide ${current} of ${total}...`);
        },
      });

      // Update status to Exported
      await handleStatusChange('Exported');
      addNotification('LinkedIn Carousel PDF successfully exported and saved!', 'success');
    } catch (err) {
      addNotification(err.message || 'Failed to generate PDF', 'error');
    } finally {
      setExporting(false);
      setExportProgress(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[95vh] overflow-y-auto shadow-2xl border border-slate-200">
        {/* Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-slate-100 flex items-center justify-between z-10">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                {project.platform} Carousel
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                Template: {project.template}
              </span>
            </div>
            <h2 className="text-lg font-bold text-slate-900 truncate max-w-md mt-0.5">
              {project.title}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Left Canvas Preview (7 cols) */}
          <div className="md:col-span-7 flex flex-col items-center">
            <div className="w-full flex items-center justify-between mb-3 text-xs">
              <span className="font-bold text-slate-500">
                Slide {currentPreviewIndex + 1} of {slides.length}
              </span>
              <div className="flex items-center gap-1">
                <button
                  disabled={currentPreviewIndex === 0}
                  onClick={() => setCurrentPreviewIndex(currentPreviewIndex - 1)}
                  className="p-1 rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-40"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  disabled={currentPreviewIndex === slides.length - 1}
                  onClick={() => setCurrentPreviewIndex(currentPreviewIndex + 1)}
                  className="p-1 rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-40"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Slide Component */}
            <div className="w-full max-w-sm">
              <SlideRenderer
                slideRef={slideRef}
                slide={currentSlide}
                totalSlides={slides.length}
                template={project.template}
                aspectRatio={aspectRatio}
                authorName="Pawzz Studio"
              />
            </div>

            {/* Quick Slide Navigation dots */}
            <div className="flex items-center gap-1.5 mt-4">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentPreviewIndex(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    currentPreviewIndex === idx ? 'bg-slate-900 w-5' : 'bg-slate-200 hover:bg-slate-300'
                  }`}
                  title={`Jump to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Right Workflow & Actions (5 cols) */}
          <div className="md:col-span-5 space-y-6 text-xs">
            {/* Editorial Approval Gate */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <h3 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                  Editorial Approval Workflow
                </h3>
              </div>
              <p className="text-slate-600 leading-relaxed">
                Framewise enforces human-in-the-loop governance. Content is reviewed and approved before production distribution.
              </p>

              <div className="grid grid-cols-2 gap-2 pt-1">
                {['Draft', 'In Review', 'Approved', 'Exported'].map((s) => {
                  const isCurrent = status === s;
                  return (
                    <button
                      key={s}
                      onClick={() => handleStatusChange(s)}
                      className={`p-2 rounded-xl font-bold border transition-all text-center ${
                        isCurrent
                          ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>

              {status !== 'Approved' && status !== 'Exported' && (
                <div className="flex items-center gap-1.5 text-amber-700 text-[11px] pt-1">
                  <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                  <span>Mark as "Approved" before public distribution.</span>
                </div>
              )}
            </div>

            {/* Aspect Ratio Toggle for Export */}
            <div>
              <label className="block font-bold text-slate-700 mb-1">Export Aspect Ratio</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setAspectRatio('portrait')}
                  className={`p-2 rounded-xl font-semibold border text-center ${
                    aspectRatio === 'portrait'
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-slate-50 text-slate-700 border-slate-200'
                  }`}
                >
                  4:5 Portrait (IG)
                </button>
                <button
                  onClick={() => setAspectRatio('square')}
                  className={`p-2 rounded-xl font-semibold border text-center ${
                    aspectRatio === 'square'
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-slate-50 text-slate-700 border-slate-200'
                  }`}
                >
                  1:1 Square (LinkedIn)
                </button>
              </div>
            </div>

            {/* Export Actions */}
            <div className="space-y-2 pt-2">
              <button
                onClick={handleExportFullPdf}
                disabled={exporting}
                className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold transition-all shadow-sm flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {exporting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <FileDown className="w-4 h-4" />
                )}
                <span>Download LinkedIn Carousel (PDF)</span>
              </button>

              <button
                onClick={handleDownloadSinglePng}
                disabled={exporting}
                className="w-full py-2.5 px-4 bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 rounded-xl font-bold transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Image className="w-4 h-4 text-slate-500" />
                <span>Download Slide #{currentSlide.slideNumber} (PNG)</span>
              </button>
            </div>

            {exportProgress && (
              <div className="p-3 bg-indigo-50 text-indigo-900 rounded-xl text-center font-medium animate-pulse border border-indigo-100">
                {exportProgress}
              </div>
            )}
          </div>
        </div>

        {/* Hidden Container for off-screen full PDF rendering */}
        <div
          ref={hiddenContainerRef}
          style={{ position: 'fixed', left: '-9999px', top: '-9999px', width: '1080px' }}
        >
          {slides.map((s) => (
            <div key={s.slideNumber} className="exportable-slide-node mb-10 w-[1080px]">
              <SlideRenderer
                slide={s}
                totalSlides={slides.length}
                template={project.template}
                aspectRatio={aspectRatio}
                authorName="Pawzz Studio"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

