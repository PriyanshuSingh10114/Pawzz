import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Layers,
  Layout,
  PlusCircle,
  FileCheck2,
  FolderKanban,
  Workflow,
  FileDown,
  RotateCcw,
  Check,
  ChevronDown,
  ArrowRight,
  Loader2,
  AlertCircle,
  Share2,
  ShieldCheck,
  Eye,
  Sliders,
  Copy,
  ExternalLink,
  Code2,
} from 'lucide-react';
import SlideEditor from '../../components/slidepilot/SlideEditor';
import ExportModal from '../../components/slidepilot/ExportModal';
import WorkflowDiagram from '../../components/slidepilot/WorkflowDiagram';
import { SlidePilotService } from '../../services/api';
import { useNotification } from '../../context/NotificationContext';

export default function FramewiseStudio() {
  const { addNotification } = useNotification();

  // Tab: 'studio' | 'create' | 'projects' | 'templates' | 'workflow'
  const [activeTab, setActiveTab] = useState('studio');

  // Active Project (default to sample-carousel-001)
  const [activeProject, setActiveProject] = useState(null);
  const [allProjects, setAllProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savingStatus, setSavingStatus] = useState(false);
  const [exportModalOpen, setExportModalOpen] = useState(false);

  // AI Generator Form state
  const [genForm, setGenForm] = useState({
    topic: '10 AI Workflows That Can Save Students Hours Every Week',
    targetAudience: 'Students & Young Professionals',
    platform: 'LinkedIn',
    contentObjective: 'Educate & Actionable Guide',
    tone: 'Actionable, Inspiring & Practical',
    template: 'minimal-editorial',
    slideCount: 10,
  });
  const [generating, setGenerating] = useState(false);
  const [genError, setGenError] = useState('');

  // Automation status for workflow tab
  const [automationStatus, setAutomationStatus] = useState(null);
  const [automationLogs, setAutomationLogs] = useState([]);
  const [triggeringWebhook, setTriggeringWebhook] = useState(false);

  // Fetch initial project (sample-carousel-001) and projects list
  const loadInitialData = async () => {
    try {
      setLoading(true);
      const res = await SlidePilotService.getProjects();
      const list = res.data || [];
      setAllProjects(list);

      // Find sample-carousel-001 or fallback to first project
      const sample = list.find((p) => p.id === 'sample-carousel-001' || p._id === 'sample-carousel-001') || list[0];
      if (sample) {
        setActiveProject(sample);
      }
    } catch (err) {
      console.warn('Initial project load:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInitialData();
  }, []);

  // Load automation logs when workflow tab is clicked
  useEffect(() => {
    if (activeTab === 'workflow') {
      Promise.all([
        SlidePilotService.getAutomationStatus().catch(() => null),
        SlidePilotService.getAutomationLogs().catch(() => ({ data: [] })),
      ]).then(([status, logsRes]) => {
        setAutomationStatus(status);
        setAutomationLogs(logsRes?.data || []);
      });
    }
  }, [activeTab]);

  // Handle reload sample carousel
  const handleLoadSampleCarousel = async () => {
    try {
      setLoading(true);
      const res = await SlidePilotService.getProjectById('sample-carousel-001');
      if (res.data) {
        setActiveProject(res.data);
        setActiveTab('studio');
        addNotification('Sample carousel loaded: "10 AI Workflows That Can Save Students Hours"', 'info');
      }
    } catch (err) {
      // Fallback from list
      const sample = allProjects.find((p) => p.id === 'sample-carousel-001' || p._id === 'sample-carousel-001');
      if (sample) {
        setActiveProject(sample);
        setActiveTab('studio');
      } else {
        addNotification('Could not reload sample carousel', 'error');
      }
    } finally {
      setLoading(false);
    }
  };

  // Handle Status Update (Founder Review Workflow)
  const handleStatusChange = async (newStatus) => {
    if (!activeProject) return;
    try {
      setSavingStatus(true);
      const updated = { ...activeProject, status: newStatus };
      setActiveProject(updated);

      await SlidePilotService.updateProject(activeProject.id || activeProject._id, updated);
      addNotification(`Project status set to "${newStatus}"`, 'success');

      // Update in allProjects list
      setAllProjects((prev) =>
        prev.map((p) =>
          (p.id === activeProject.id || p._id === activeProject._id ? updated : p)
        )
      );
    } catch (err) {
      addNotification(err.message || 'Failed to update project status', 'error');
    } finally {
      setSavingStatus(false);
    }
  };

  // Handle AI Generate New Carousel
  const handleGenerateSubmit = async (e) => {
    e.preventDefault();
    if (!genForm.topic.trim()) {
      setGenError('Please provide a topic or prompt for AI generation.');
      return;
    }

    try {
      setGenerating(true);
      setGenError('');
      const res = await SlidePilotService.generateCarousel(genForm);
      if (res.success && res.data) {
        setActiveProject(res.data);
        setAllProjects((prev) => [res.data, ...prev]);
        setActiveTab('studio');
        addNotification(`Carousel generated with ${res.data.slides?.length || 10} slides!`, 'success');
      }
    } catch (err) {
      setGenError(err.message || 'AI generation failed. Please try again.');
    } finally {
      setGenerating(false);
    }
  };

  // Webhook Test Trigger
  const handleRunWebhookTest = async () => {
    try {
      setTriggeringWebhook(true);
      const res = await SlidePilotService.triggerAutomationTest({
        topic: '10 High-Leverage AI Workflows for Modern Founders',
        targetAudience: 'Early-stage Founders & Engineers',
        platform: 'LinkedIn',
      });
      addNotification('n8n Webhook simulation dispatched! Check workflow log.', 'success');
      // Refresh logs
      const logsRes = await SlidePilotService.getAutomationLogs();
      setAutomationLogs(logsRes.data || []);
    } catch (err) {
      addNotification(err.message || 'Webhook trigger failed', 'error');
    } finally {
      setTriggeringWebhook(false);
    }
  };

  const templatesList = [
    {
      id: 'minimal-editorial',
      name: 'Editorial Minimal',
      description: 'Warm cream aesthetic (#faf8f5) with elegant serif headings and subtle dividers. Perfect for thought leadership.',
      accent: 'bg-[#faf8f5] text-stone-900 border-stone-300',
    },
    {
      id: 'modern-gradient',
      name: 'Modern Tech Gradient',
      description: 'Deep navy-to-slate dark canvas (#020617) with ambient cyan & indigo glow and glassmorphic card containers.',
      accent: 'bg-slate-900 text-white border-indigo-500/50',
    },
    {
      id: 'corporate',
      name: 'Corporate Executive',
      description: 'Crisp navy (#0a192f) with high-trust borders, structured left accent bar, and executive hierarchy.',
      accent: 'bg-[#0a192f] text-blue-100 border-blue-500/40',
    },
    {
      id: 'educational-infographic',
      name: 'Educational Infographic',
      description: 'High-clarity white canvas with emerald accents, numbered badges, and key takeaways.',
      accent: 'bg-white text-slate-900 border-emerald-500',
    },
    {
      id: 'bold-typography',
      name: 'Bold Brutalist',
      description: 'High-contrast energetic yellow (#f59e0b) with bold black borders and maximum social impact.',
      accent: 'bg-amber-400 text-slate-950 border-slate-950',
    },
  ];

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 font-sans selection:bg-indigo-500 selection:text-white">
      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Studio Workspace Toolbar */}
        <div className="p-2.5 bg-[#111827] border border-slate-800 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm">
          {/* Left Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar text-xs">
            {[
              { key: 'studio', label: 'Studio Workspace', icon: Layout },
              { key: 'create', label: 'Create New (AI)', icon: Sparkles },
              { key: 'projects', label: `My Carousels (${allProjects.length})`, icon: FolderKanban },
              { key: 'templates', label: 'Templates (5)', icon: Layers },
              { key: 'workflow', label: 'AI & n8n Pipeline', icon: Workflow },
            ].map((tab) => {
              const Icon = tab.icon;
              const active = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl font-bold transition-all shrink-0 cursor-pointer ${
                    active
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Right Quick Actions */}
          <div className="flex items-center gap-2 self-end sm:self-auto text-xs">
            <button
              onClick={handleLoadSampleCarousel}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-400 font-bold border border-amber-500/20 transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Reset to 10-slide sample carousel"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Load Sample Carousel</span>
            </button>

            {activeProject && (
              <button
                onClick={() => setExportModalOpen(true)}
                className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer"
              >
                <FileDown className="w-3.5 h-3.5" />
                <span>Export (PNG / PDF)</span>
              </button>
            )}
          </div>
        </div>
        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-24 text-slate-400 gap-3">
            <Loader2 className="w-6 h-6 animate-spin text-indigo-500" />
            <span className="text-sm font-semibold">Loading Framewise Creative Studio...</span>
          </div>
        )}

        {/* TAB 1: STUDIO WORKSPACE */}
        {!loading && activeTab === 'studio' && (
          <div className="space-y-6">
            {/* Top Project Status Bar */}
            {activeProject ? (
              <div className="bg-[#111827] border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-bold border border-indigo-500/30">
                      {activeProject.platform || 'LinkedIn'} • {activeProject.slides?.length || 10} Slides
                    </span>
                    <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-bold">
                      Template: {activeProject.template || 'minimal-editorial'}
                    </span>
                  </div>
                  <h1 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                    {activeProject.title || activeProject.topic}
                  </h1>
                </div>

                {/* Founder Review Status Controller */}
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Review & Approval
                    </div>
                    <div className="text-xs text-slate-300 font-semibold">Founder Workflow State</div>
                  </div>

                  <select
                    value={activeProject.status || 'Draft'}
                    onChange={(e) => handleStatusChange(e.target.value)}
                    disabled={savingStatus}
                    className={`text-xs font-bold px-3 py-2 rounded-xl border cursor-pointer focus:outline-none transition-colors ${
                      activeProject.status === 'Approved'
                        ? 'bg-emerald-950 text-emerald-300 border-emerald-500/50'
                        : activeProject.status === 'In Review'
                        ? 'bg-amber-950 text-amber-300 border-amber-500/50'
                        : activeProject.status === 'Exported'
                        ? 'bg-blue-950 text-blue-300 border-blue-500/50'
                        : 'bg-slate-800 text-slate-300 border-slate-700'
                    }`}
                  >
                    <option value="Draft">Draft</option>
                    <option value="In Review">In Review</option>
                    <option value="Approved">Approved</option>
                    <option value="Exported">Exported</option>
                  </select>
                </div>
              </div>
            ) : (
              <div className="p-8 bg-slate-900 border border-slate-800 rounded-2xl text-center space-y-3">
                <p className="text-sm text-slate-400">No carousel currently selected.</p>
                <button
                  onClick={handleLoadSampleCarousel}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold"
                >
                  Load 10-Slide Sample Carousel
                </button>
              </div>
            )}

            {/* Embedded Slide Editor */}
            {activeProject && (
              <SlideEditor
                project={activeProject}
                setProject={setActiveProject}
                onOpenExportModal={() => setExportModalOpen(true)}
              />
            )}
          </div>
        )}

        {/* TAB 2: CREATE NEW (AI GENERATOR WIZARD) */}
        {!loading && activeTab === 'create' && (
          <div className="max-w-3xl mx-auto bg-[#111827] border border-slate-800 rounded-3xl p-8 sm:p-10 space-y-8">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-bold border border-indigo-500/20">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Autonomous AI Carousel Generator</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Generate a Social Carousel
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Transform any raw concept, product lesson, or tactical guide into structured, slide-by-slide copy with optimized hooks and visual layouts.
              </p>
            </div>

            {genError && (
              <div className="p-4 bg-rose-950/60 border border-rose-500/40 rounded-2xl text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{genError}</span>
              </div>
            )}

            <form onSubmit={handleGenerateSubmit} className="space-y-6 text-xs">
              <div>
                <label className="block font-bold text-slate-300 mb-1.5">
                  Carousel Topic / Core Idea *
                </label>
                <textarea
                  rows={3}
                  required
                  value={genForm.topic}
                  onChange={(e) => setGenForm({ ...genForm, topic: e.target.value })}
                  placeholder="e.g. 10 practical AI workflows that save students 5+ hours every week..."
                  className="w-full p-3.5 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block font-bold text-slate-300 mb-1.5">Target Audience</label>
                  <input
                    type="text"
                    value={genForm.targetAudience}
                    onChange={(e) => setGenForm({ ...genForm, targetAudience: e.target.value })}
                    placeholder="Students, Founders, Product Managers..."
                    className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1.5">Target Platform</label>
                  <select
                    value={genForm.platform}
                    onChange={(e) => setGenForm({ ...genForm, platform: e.target.value })}
                    className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="LinkedIn">LinkedIn (PDF Document / 1:1 Square)</option>
                    <option value="Instagram">Instagram (Multi-Image / 4:5 Portrait)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div>
                  <label className="block font-bold text-slate-300 mb-1.5">Editorial Tone</label>
                  <select
                    value={genForm.tone}
                    onChange={(e) => setGenForm({ ...genForm, tone: e.target.value })}
                    className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white font-semibold focus:outline-none"
                  >
                    <option value="Actionable, Inspiring & Practical">Actionable & Practical</option>
                    <option value="Authoritative & Strategic">Authoritative & Strategic</option>
                    <option value="Bold & Disruptive">Bold & Disruptive</option>
                    <option value="Educational & Step-by-Step">Educational & Step-by-Step</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1.5">Visual Template</label>
                  <select
                    value={genForm.template}
                    onChange={(e) => setGenForm({ ...genForm, template: e.target.value })}
                    className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white font-semibold focus:outline-none"
                  >
                    {templatesList.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1.5">Number of Slides</label>
                  <select
                    value={genForm.slideCount}
                    onChange={(e) => setGenForm({ ...genForm, slideCount: Number(e.target.value) })}
                    className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white font-semibold focus:outline-none"
                  >
                    <option value={8}>8 Slides (Compact)</option>
                    <option value={10}>10 Slides (Standard Founder Guide)</option>
                    <option value={12}>12 Slides (Deep Dive)</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={generating}
                className="w-full py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-sm shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {generating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Executing 4-Phase Generation Pipeline...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Generate Complete Carousel</span>
                  </>
                )}
              </button>
            </form>
          </div>
        )}

        {/* TAB 3: MY PROJECTS */}
        {!loading && activeTab === 'projects' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <h2 className="text-xl font-bold text-white">Your Carousel Projects</h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Stored persistently in MongoDB or demo local storage.
                </p>
              </div>
              <button
                onClick={() => setActiveTab('create')}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Create New Carousel</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allProjects.map((p) => (
                <div
                  key={p.id || p._id}
                  className="bg-[#111827] border border-slate-800 rounded-2xl p-6 flex flex-col justify-between hover:border-indigo-500/50 transition-all group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-bold">
                        {p.platform || 'LinkedIn'}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          p.status === 'Approved'
                            ? 'bg-emerald-950 text-emerald-400'
                            : 'bg-amber-950 text-amber-400'
                        }`}
                      >
                        {p.status || 'Draft'}
                      </span>
                    </div>

                    <h3 className="font-bold text-white text-base leading-snug group-hover:text-indigo-400 transition-colors">
                      {p.title || p.topic}
                    </h3>

                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {p.topic}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-5 mt-4 border-t border-slate-800 text-xs">
                    <span className="text-slate-500 font-mono text-[11px]">
                      {p.slides?.length || 10} Slides
                    </span>
                    <button
                      onClick={() => {
                        setActiveProject(p);
                        setActiveTab('studio');
                      }}
                      className="text-indigo-400 hover:text-indigo-300 font-bold flex items-center gap-1"
                    >
                      <span>Open in Studio</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: TEMPLATES */}
        {!loading && activeTab === 'templates' && (
          <div className="space-y-8">
            <div className="max-w-2xl">
              <h2 className="text-xl font-bold text-white">5 Curated Visual Templates</h2>
              <p className="text-xs text-slate-400 mt-1">
                Each template implements balanced typographic contrast, consistent margin tokens, and distinct aesthetic palettes.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {templatesList.map((tpl) => (
                <div
                  key={tpl.id}
                  className="bg-[#111827] border border-slate-800 rounded-3xl p-6 space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className={`p-6 rounded-2xl border ${tpl.accent} text-center space-y-2`}>
                      <div className="text-[10px] font-mono uppercase tracking-wider opacity-60">
                        PREVIEW
                      </div>
                      <div className="font-bold text-base leading-tight">{tpl.name}</div>
                      <div className="text-xs opacity-70">Slide 01 of 10</div>
                    </div>

                    <h3 className="font-bold text-white text-base">{tpl.name}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{tpl.description}</p>
                  </div>

                  <button
                    onClick={() => {
                      if (activeProject) {
                        const updated = { ...activeProject, template: tpl.id };
                        setActiveProject(updated);
                        SlidePilotService.updateProject(activeProject.id || activeProject._id, updated);
                        addNotification(`Applied template "${tpl.name}" to active project`, 'success');
                        setActiveTab('studio');
                      }
                    }}
                    className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-indigo-600 hover:text-white text-slate-300 font-bold text-xs transition-colors"
                  >
                    Apply to Active Carousel
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: AI & n8n WORKFLOW PIPELINE */}
        {!loading && activeTab === 'workflow' && (
          <div className="space-y-10">
            {/* Top Workflow Explanation */}
            <div className="bg-[#111827] border border-slate-800 rounded-3xl p-8 space-y-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-bold border border-indigo-500/20">
                  <Workflow className="w-3.5 h-3.5" />
                  <span>End-to-End Autonomous Pipeline Architecture</span>
                </div>
                <h2 className="text-2xl font-extrabold text-white">
                  How Framewise Generates & Publishes Carousels
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 max-w-3xl leading-relaxed">
                  Framewise decouples content ideation, structuring, visual rendering, and publishing into clean, deterministic stages with mandatory founder approval before distribution.
                </p>
              </div>

              {/* 4-Phase Generation Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                  <div className="font-mono text-indigo-400 font-bold">STAGE 01</div>
                  <div className="font-bold text-white">AI Research & Angle</div>
                  <p className="text-slate-400 leading-relaxed">
                    OpenAI synthesizes topic into counter-intuitive hooks, core takeaways, and audience pain points.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                  <div className="font-mono text-indigo-400 font-bold">STAGE 02</div>
                  <div className="font-bold text-white">Slide-by-Slide Copy</div>
                  <p className="text-slate-400 leading-relaxed">
                    Generates hook slide, problem statement, discrete workflows, practical tips, and closing CTA with character constraints.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                  <div className="font-mono text-amber-400 font-bold">STAGE 03</div>
                  <div className="font-bold text-white">Founder Review Gate</div>
                  <p className="text-slate-400 leading-relaxed">
                    Interactive studio allows founder to edit copy, reorder slides, swap templates, and rewrite individual slides.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                  <div className="font-mono text-emerald-400 font-bold">STAGE 04</div>
                  <div className="font-bold text-white">Export & n8n Publish</div>
                  <p className="text-slate-400 leading-relaxed">
                    Renders 1080x1350 PNG or multi-page LinkedIn PDF; optional n8n webhook triggers scheduled buffer/social distribution.
                  </p>
                </div>
              </div>
            </div>

            {/* Interactive Architecture Diagram */}
            <WorkflowDiagram />

            {/* n8n Live Webhook Simulation Box */}
            <div className="bg-[#111827] border border-slate-800 rounded-3xl p-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                  <h3 className="font-bold text-white text-base">n8n Webhook Endpoint & Simulation</h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Trigger the automated carousel creation pipeline via HTTP POST.
                  </p>
                </div>

                <button
                  onClick={handleRunWebhookTest}
                  disabled={triggeringWebhook}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors disabled:opacity-50"
                >
                  {triggeringWebhook ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Sending Webhook...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Simulate n8n Trigger</span>
                    </>
                  )}
                </button>
              </div>

              {/* Automation Logs */}
              <div className="space-y-3">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Live Automation Execution Logs ({automationLogs.length})
                </div>

                <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800 font-mono text-[11px] space-y-2 max-h-60 overflow-y-auto">
                  {automationLogs.length === 0 ? (
                    <div className="text-slate-500">No webhook executions recorded yet. Click simulate above.</div>
                  ) : (
                    automationLogs.map((log, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-slate-300">
                        <span className="text-emerald-400 font-bold">[{log.status || 'SUCCESS'}]</span>
                        <span className="text-slate-500">{new Date(log.timestamp).toLocaleTimeString()}:</span>
                        <span>{log.message || log.topic}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Export Modal */}
      {exportModalOpen && activeProject && (
        <ExportModal
          project={activeProject}
          isOpen={exportModalOpen}
          onClose={() => setExportModalOpen(false)}
          onProjectUpdated={(up) => {
            setActiveProject(up);
            setAllProjects((prev) =>
              prev.map((p) => (p.id === up.id || p._id === up.id ? up : p))
            );
          }}
        />
      )}
    </div>
  );
}
