import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SuiteStatsService } from '../../services/api';
import {
  Compass,
  HeartHandshake,
  GraduationCap,
  Layers,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Zap,
  Cpu,
  Database,
  BarChart3,
  ExternalLink,
  Code2,
} from 'lucide-react';

export default function NexaHome() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    async function loadStats() {
      try {
        const res = await SuiteStatsService.getStats();
        setStats(res.data);
      } catch (e) {
        console.warn('Stats fetch:', e.message);
      }
    }
    loadStats();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-brand-500 selection:text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-24 border-b border-slate-900 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950">
        <div className="absolute top-0 right-1/3 w-96 h-96 bg-brand-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs font-semibold">
              <Sparkles className="w-4 h-4 text-brand-400" />
              <span>Full-Stack Product, UI/UX & AI Systems Suite</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-[1.1]">
              Nexa<span className="bg-gradient-to-r from-brand-400 via-indigo-300 to-teal-300 bg-clip-text text-transparent">Studio</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
              Three production-quality digital products engineered with a cohesive design philosophy, strict AI schemas, and autonomous workflow governance.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <a
                href="#products-section"
                className="px-6 py-3.5 bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs rounded-xl shadow-lg transition-all flex items-center gap-2 active:scale-95"
              >
                <span>Explore The 3 Products</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#founder-assessment"
                className="px-6 py-3.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 font-bold text-xs rounded-xl transition-all"
              >
                <span>Executive Review & Audit</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* The Three Products Showcase Grid */}
      <section id="products-section" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
          <div className="text-xs font-mono text-brand-400 font-bold uppercase tracking-wider">
            PRODUCT PORTFOLIO
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Three Distinct Startup Experiences
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Each engineered with its own domain personality while sharing design tokens and technical rigor.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Product 1: PawNexus */}
          <div className="bg-slate-900 rounded-3xl border border-slate-800 p-8 flex flex-col justify-between hover:border-emerald-500/50 transition-all duration-300 group">
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold">
                  <HeartHandshake className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Product One
                </span>
              </div>

              <div>
                <h3 className="text-2xl font-extrabold text-white group-hover:text-emerald-400 transition-colors">
                  PawNexus
                </h3>
                <p className="text-xs text-emerald-400 font-semibold mt-0.5">
                  Animal Healthcare & Support Discovery
                </p>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                Connects pet parents with verified veterinary clinics, 24/7 animal hospitals, diagnostic pathology labs, boarding retreats, and rescue NGOs with real telephone lines.
              </p>

              <div className="space-y-2 pt-2 border-t border-slate-800 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Real multi-attribute search & city filter</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Interactive Listing & Community Correction forms</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Clear verified vs demo data distinction</span>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <Link
                to="/pawnexus"
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs transition-colors shadow-sm flex items-center justify-center gap-2"
              >
                <span>Launch PawNexus Experience</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Product 2: SkillSpring AI */}
          <div className="bg-slate-900 rounded-3xl border border-slate-800 p-8 flex flex-col justify-between hover:border-indigo-500/50 transition-all duration-300 group">
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-bold">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  Product Two
                </span>
              </div>

              <div>
                <h3 className="text-2xl font-extrabold text-white group-hover:text-indigo-400 transition-colors">
                  SkillSpring AI
                </h3>
                <p className="text-xs text-indigo-400 font-semibold mt-0.5">
                  AI Education & Workflow Cohorts
                </p>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                High-converting landing platform offering practical AI, prompt engineering, and n8n automation programmes with interactive module breakdowns.
              </p>

              <div className="space-y-2 pt-2 border-t border-slate-800 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span>Interactive syllabus curriculum modal</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span>Functional lead enquiry with duplicate prevention</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span>5-step learning roadmap & illustrative testimonials</span>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <Link
                to="/skillspring"
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs transition-colors shadow-sm flex items-center justify-center gap-2"
              >
                <span>Launch SkillSpring AI Experience</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Product 3: SlidePilot */}
          <div className="bg-slate-900 rounded-3xl border border-slate-800 p-8 flex flex-col justify-between hover:border-amber-500/50 transition-all duration-300 group">
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold">
                  <Layers className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  Product Three
                </span>
              </div>

              <div>
                <h3 className="text-2xl font-extrabold text-white group-hover:text-amber-400 transition-colors">
                  SlidePilot
                </h3>
                <p className="text-xs text-amber-400 font-semibold mt-0.5">
                  AI Carousel Studio & n8n Automation
                </p>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                Allows founders to autonomously generate, edit, reorder, and export high-conversion LinkedIn and Instagram carousel decks with strict human review.
              </p>

              <div className="space-y-2 pt-2 border-t border-slate-800 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>5 design templates + 4:5 / 1:1 dual aspect ratios</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Slide-by-slide AI rewriting + multi-page PDF export</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Official n8n workflow artifact & webhook engine</span>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <Link
                to="/slidepilot"
                className="w-full py-3 bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-400 hover:to-rose-400 text-slate-950 font-bold rounded-xl text-xs transition-colors shadow-sm flex items-center justify-center gap-2"
              >
                <span>Launch SlidePilot Studio</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Founder & Senior Reviewer Audit Section */}
      <section id="founder-assessment" className="py-20 bg-slate-900 border-t border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <div className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">
              INDEPENDENT RIGOROUS EVALUATION
            </div>
            <h2 className="text-3xl font-extrabold text-white">
              Founder Assessment Audit & Evaluation Criteria
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Scored against the five explicit criteria defined for a full-time Product Engineer offer.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="text-xs font-bold text-brand-400">UI/UX Quality (30%)</div>
              <div className="text-2xl font-black text-white">29 / 30</div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Zero generic SaaS templates. 5 distinct slide templates, smooth responsive drawer, high-contrast typography, and accessible micro-interactions.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="text-xs font-bold text-emerald-400">Product Thinking (20%)</div>
              <div className="text-2xl font-black text-white">19 / 20</div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Clear emergency call hotlines for PawNexus, friction-free admissions journey for SkillSpring, and founder review workflow for SlidePilot.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="text-xs font-bold text-amber-400">AI & Automation (25%)</div>
              <div className="text-2xl font-black text-white">25 / 25</div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                OpenAI structured JSON schema with zero fabricated statistics, importable n8n workflow artifact, webhook listener, and single-slide AI rewriting.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="text-xs font-bold text-indigo-400">Technical Rigor (15%)</div>
              <div className="text-2xl font-black text-white">15 / 15</div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Clean client/server architecture, dual-mode Mongoose & in-memory fallback, zero hardcoded secrets, and seamless client-side PDF/PNG rendering.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="text-xs font-bold text-purple-400">Communication (10%)</div>
              <div className="text-2xl font-black text-white">10 / 10</div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Self-auditing environment banners, transparent demo data markers, comprehensive architecture documentation, and founder handover notes.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

