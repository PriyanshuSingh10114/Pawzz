import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import SlidePilotNav from '../../components/slidepilot/SlidePilotNav';
import SlideEditor from '../../components/slidepilot/SlideEditor';
import ExportModal from '../../components/slidepilot/ExportModal';
import { SlidePilotService } from '../../services/api';
import { useNotification } from '../../context/NotificationContext';
import {
  Sparkles,
  ArrowRight,
  Loader2,
  FileText,
  Sliders,
  CheckCircle2,
  Bot,
  AlertCircle,
  RotateCcw,
} from 'lucide-react';

export default function SlidePilotCreate() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { addNotification } = useNotification();
  const existingId = searchParams.get('id');

  // Step state: 'input' | 'editor'
  const [step, setStep] = useState('input');
  const [loading, setLoading] = useState(false);
  const [generationPhase, setGenerationPhase] = useState('');
  const [error, setError] = useState('');
  const [exportModalOpen, setExportModalOpen] = useState(false);

  // Form inputs (Step 1)
  const [formData, setFormData] = useState({
    topic: '',
    targetAudience: 'Startup Founders, Solo Entrepreneurs & Agency Owners',
    platform: 'LinkedIn',
    contentObjective: 'Thought Leadership & Actionable Insights',
    tone: 'Punchy, Direct & Tactical',
    template: 'minimal-editorial',
    slideCount: 6,
    referenceMaterial: '',
  });

  // Generated / loaded project (Step 2-6)
  const [project, setProject] = useState(null);

  // Load existing project if id parameter is provided
  useEffect(() => {
    if (existingId) {
      async function loadExisting() {
        try {
          setLoading(true);
          const res = await SlidePilotService.getProjectById(existingId);
          if (res.data) {
            setProject(res.data);
            setStep('editor');
          }
        } catch (err) {
          setError('Could not load requested project: ' + err.message);
        } finally {
          setLoading(false);
        }
      }
      loadExisting();
    }
  }, [existingId]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!formData.topic.trim()) {
      setError('Please provide a topic or raw idea for the carousel.');
      return;
    }

    try {
      setLoading(true);
      setError('');
      setGenerationPhase('Triggering AI Structured Inference Engine...');

      // Call AI endpoint
      const aiResponse = await SlidePilotService.generateCarousel(formData);

      setGenerationPhase('Applying Design Tokens & Structuring Slides...');

      const newProjectData = {
        title: aiResponse.data.contentTitle || formData.topic,
        topic: formData.topic,
        targetAudience: formData.targetAudience,
        platform: formData.platform,
        contentObjective: formData.contentObjective,
        tone: formData.tone,
        template: formData.template,
        slideCount: aiResponse.data.slides?.length || formData.slideCount,
        status: 'Draft',
        slides: aiResponse.data.slides || [],
        metadata: {
          engine: aiResponse.meta?.engine || 'Native Intelligent Engine',
          tokensUsed: aiResponse.meta?.tokensUsed || 1150,
        },
      };

      // Save to persistence
      const saved = await SlidePilotService.createProject(newProjectData);
      setProject(saved.data || newProjectData);
      setStep('editor');
      addNotification(
        `Generated ${newProjectData.slides.length} slides with strict JSON schema!`,
        'success'
      );
    } catch (err) {
      setError(err.message || 'Generation failed. Please try again.');
    } finally {
      setLoading(false);
      setGenerationPhase('');
    }
  };

  const handleResetToInput = () => {
    if (window.confirm('Start over with a new idea? Unsaved editor tweaks will be discarded.')) {
      setProject(null);
      setStep('input');
      navigate('/slidepilot/create');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-20">
      <SlidePilotNav />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Step Indicator Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800 mb-8">
          <div>
            <div className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider">
              CAROUSEL CREATION PIPELINE
            </div>
            <h1 className="text-2xl font-extrabold text-white mt-1">
              {step === 'input' ? 'Step 1: Ideate & Configure' : `Editing: ${project?.title || 'Carousel'}`}
            </h1>
          </div>

          <div className="flex items-center gap-2">
            {step === 'editor' && (
              <button
                onClick={handleResetToInput}
                className="px-3 py-1.5 rounded-xl border border-slate-700 hover:bg-slate-800 text-xs text-slate-300 font-semibold flex items-center gap-1.5 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>New Topic</span>
              </button>
            )}

            <div className="flex items-center gap-2 text-xs font-mono">
              <span
                className={`px-2.5 py-1 rounded-lg font-bold ${
                  step === 'input'
                    ? 'bg-amber-500 text-slate-950'
                    : 'bg-slate-800 text-slate-400'
                }`}
              >
                1. Idea Input
              </span>
              <span className="text-slate-600">→</span>
              <span
                className={`px-2.5 py-1 rounded-lg font-bold ${
                  step === 'editor'
                    ? 'bg-amber-500 text-slate-950'
                    : 'bg-slate-800 text-slate-400'
                }`}
              >
                2. Design & Edit
              </span>
            </div>
          </div>
        </div>

        {/* STEP 1: IDEA INPUT FORM */}
        {step === 'input' && (
          <div className="max-w-2xl mx-auto bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-10 shadow-2xl">
            <div className="space-y-1 mb-8">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <span>Input Raw Idea or Content Brief</span>
              </h2>
              <p className="text-xs text-slate-400">
                Our AI workflow engine will structure this into a high-engagement carousel slide deck with hooks, body lessons, and closing CTAs.
              </p>
            </div>

            {error && (
              <div className="p-3 bg-rose-950/60 border border-rose-500/40 rounded-xl mb-6 flex items-center gap-2 text-xs text-rose-300">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleGenerate} className="space-y-5 text-xs">
              {/* Topic / Raw Idea */}
              <div>
                <label className="block font-bold text-slate-200 mb-1.5">
                  Topic or Raw Idea <span className="text-amber-400">*</span>
                </label>
                <textarea
                  name="topic"
                  rows={3}
                  value={formData.topic}
                  onChange={handleInputChange}
                  placeholder="e.g. 5 system architecture lessons from scaling a SaaS from 0 to 50k users, why serverless is often a trap, or emergency pet healthcare checklist"
                  className="w-full p-3 bg-slate-950 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/40 text-xs"
                  required
                />
              </div>

              {/* Target Audience & Platform */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-200 mb-1.5">
                    Target Audience
                  </label>
                  <input
                    type="text"
                    name="targetAudience"
                    value={formData.targetAudience}
                    onChange={handleInputChange}
                    placeholder="Startup Founders, Engineers, Pet Parents..."
                    className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-200 mb-1.5">Platform</label>
                  <select
                    name="platform"
                    value={formData.platform}
                    onChange={handleInputChange}
                    className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs focus:outline-none cursor-pointer"
                  >
                    <option value="LinkedIn">LinkedIn (1:1 / 4:5 Carousel)</option>
                    <option value="Instagram">Instagram (4:5 Portrait Carousel)</option>
                  </select>
                </div>
              </div>

              {/* Tone & Number of Slides */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-200 mb-1.5">
                    Preferred Tone
                  </label>
                  <select
                    name="tone"
                    value={formData.tone}
                    onChange={handleInputChange}
                    className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs focus:outline-none cursor-pointer"
                  >
                    <option value="Punchy, Direct & Tactical">Punchy, Direct & Tactical</option>
                    <option value="Empathetic & Urgent">Empathetic & Urgent (Health/Care)</option>
                    <option value="Academic & Analytical">Academic & Analytical</option>
                    <option value="Contrarian & Thought-Provoking">Contrarian & Thought-Provoking</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-200 mb-1.5">
                    Number of Slides ({formData.slideCount})
                  </label>
                  <input
                    type="range"
                    name="slideCount"
                    min="3"
                    max="10"
                    value={formData.slideCount}
                    onChange={handleInputChange}
                    className="w-full mt-2 accent-amber-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                    <span>3 slides (Micro)</span>
                    <span>6 slides (Optimal)</span>
                    <span>10 slides (Deep Dive)</span>
                  </div>
                </div>
              </div>

              {/* Visual Template */}
              <div>
                <label className="block font-bold text-slate-200 mb-1.5">
                  Initial Design Template
                </label>
                <select
                  name="template"
                  value={formData.template}
                  onChange={handleInputChange}
                  className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs focus:outline-none cursor-pointer"
                >
                  <option value="minimal-editorial">Minimal Editorial (Clean Swiss Serif)</option>
                  <option value="modern-gradient">Modern Gradient (Tech Mesh Dark)</option>
                  <option value="corporate">Corporate Executive (Navy & Slate)</option>
                  <option value="educational-infographic">Educational Infographic (Structured Steps)</option>
                  <option value="bold-typography">Bold Brutalist Typography (High Virality)</option>
                </select>
              </div>

              {/* Optional Reference Material */}
              <div>
                <label className="block font-bold text-slate-200 mb-1.5">
                  Optional Reference Material / Specific Data Points
                </label>
                <textarea
                  name="referenceMaterial"
                  rows={2}
                  value={formData.referenceMaterial}
                  onChange={handleInputChange}
                  placeholder="Paste excerpt from article, bullet points, or metric notes..."
                  className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white placeholder-slate-500 text-xs focus:outline-none"
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-400 hover:to-rose-400 text-slate-950 font-extrabold rounded-xl text-xs transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 active:scale-95"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                      <span>{generationPhase || 'Generating AI Carousel...'}</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Generate AI Carousel Deck</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* STEP 3-6: SLIDE EDITOR & EXPORT */}
        {step === 'editor' && project && (
          <SlideEditor
            project={project}
            setProject={setProject}
            onOpenExportModal={() => setExportModalOpen(true)}
          />
        )}

        {/* Export Modal */}
        <ExportModal
          project={project}
          isOpen={exportModalOpen}
          onClose={() => setExportModalOpen(false)}
          onProjectUpdated={(upd) => setProject(upd)}
        />
      </main>
    </div>
  );
}
