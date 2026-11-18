import React from 'react';
import { Link } from 'react-router-dom';
import {
  HeartHandshake,
  GraduationCap,
  Layers,
  ArrowRight,
  ShieldCheck,
  Search,
  BookOpen,
  Sparkles,
  ExternalLink,
  Code2,
  Cpu,
  Database,
  Workflow,
  CheckCircle2,
} from 'lucide-react';

export default function RootPortal() {
  return (
    <div className="min-h-screen bg-[#0d1117] text-slate-100 font-sans selection:bg-emerald-500 selection:text-slate-950 flex flex-col justify-between">
      {/* Top Header */}
      <header className="border-b border-slate-800/80 bg-[#161b22]/70 backdrop-blur-md py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white font-extrabold text-lg shadow-sm">
              🐾
            </div>
            <div>
              <div className="font-extrabold text-white text-base tracking-tight leading-none">
                Paw<span className="text-emerald-400">zz</span>
              </div>
              <div className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase mt-0.5">
                Founder Product Assessment
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/80 border border-slate-700 text-slate-300">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Developed by <strong>Priyanshu Singh</strong></span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Switcher Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex-1 flex flex-col justify-center">
        <div className="max-w-3xl mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/20">
            <span>Direct Product Launchpad</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Three Working Products. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-indigo-400">
              Ready for Founder Demonstration.
            </span>
          </h1>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-2xl">
            Select a product below to enter its dedicated, standalone user experience. Each product has its own information architecture, design tokens, and functional backend integration.
          </p>
        </div>

        {/* 3 Core Product Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {/* PRODUCT 1: PAWZZ */}
          <div className="bg-[#161b22] border border-slate-800 rounded-3xl p-8 flex flex-col justify-between hover:border-emerald-500/50 transition-all group relative overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20 font-bold">
                  🐾
                </div>
                <span className="text-[11px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 font-bold border border-emerald-500/30">
                  Deliverable 1
                </span>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                  Pawzz
                </h2>
                <div className="text-xs font-semibold text-emerald-400 mt-0.5">
                  Animal Healthcare Discovery (Practo for Animals)
                </div>
                <p className="text-xs text-slate-400 mt-3 leading-relaxed">
                  Marketplace to discover 100% verified veterinary clinics, 24/7 animal hospitals, pathology diagnostic labs, pet boarding, and emergency ambulances across India.
                </p>
              </div>

              {/* Feature Chips */}
              <div className="space-y-2 pt-2 border-t border-slate-800/80 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Interactive search with city & category filters</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>24/7 ICU & emergency ambulance locator</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Real provider registration & community corrections</span>
                </div>
              </div>
            </div>

            <div className="pt-8 mt-6 border-t border-slate-800 space-y-2.5">
              <Link
                to="/pawzz"
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-colors flex items-center justify-center gap-2"
              >
                <span>Launch Pawzz Homepage</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                to="/pawzz/search"
                className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 transition-colors flex items-center justify-center gap-1.5"
              >
                <Search className="w-3 h-3 text-slate-400" />
                <span>Open Search & Filter Directory</span>
              </Link>
            </div>
          </div>

          {/* PRODUCT 2: UPWISE */}
          <div className="bg-[#161b22] border border-slate-800 rounded-3xl p-8 flex flex-col justify-between hover:border-amber-500/50 transition-all group relative overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/20 font-bold">
                  🎓
                </div>
                <span className="text-[11px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-amber-950 text-amber-300 font-bold border border-amber-500/30">
                  Deliverable 2
                </span>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white group-hover:text-amber-400 transition-colors">
                  Upwise
                </h2>
                <div className="text-xs font-semibold text-amber-400 mt-0.5">
                  Practical AI & Digital Skills Education
                </div>
                <p className="text-xs text-slate-400 mt-3 leading-relaxed">
                  Project-driven cohorts for students and professionals. Build real production AI agents, autonomous workflows, and web apps with senior mentor reviews.
                </p>
              </div>

              {/* Feature Chips */}
              <div className="space-y-2 pt-2 border-t border-slate-800/80 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>4 flagship cohorts with week-by-week syllabi</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>5-step learning pedagogy & capstone defenses</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Admissions enquiry form with duplicate prevention</span>
                </div>
              </div>
            </div>

            <div className="pt-8 mt-6 border-t border-slate-800 space-y-2.5">
              <Link
                to="/upwise"
                className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition-colors flex items-center justify-center gap-2"
              >
                <span>Launch Upwise Platform</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                to="/upwise#programmes"
                className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 transition-colors flex items-center justify-center gap-1.5"
              >
                <BookOpen className="w-3 h-3 text-slate-400" />
                <span>View 4 Programmes & Syllabi</span>
              </Link>
            </div>
          </div>

          {/* PRODUCT 3: FRAMEWISE */}
          <div className="bg-[#161b22] border border-slate-800 rounded-3xl p-8 flex flex-col justify-between hover:border-indigo-500/50 transition-all group relative overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center border border-indigo-500/20 font-bold">
                  🎨
                </div>
                <span className="text-[11px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-indigo-950 text-indigo-300 font-bold border border-indigo-500/30">
                  Deliverable 3
                </span>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white group-hover:text-indigo-400 transition-colors">
                  Framewise
                </h2>
                <div className="text-xs font-semibold text-indigo-400 mt-0.5">
                  Social Carousel Creation Studio
                </div>
                <p className="text-xs text-slate-400 mt-3 leading-relaxed">
                  End-to-end founder studio to ideate, write, structure, design, review, and export multi-slide carousels for LinkedIn and Instagram.
                </p>
              </div>

              {/* Feature Chips */}
              <div className="space-y-2 pt-2 border-t border-slate-800/80 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                  <span>Pre-loaded 10-slide sample carousel ready</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                  <span>Visual editor with 5 templates & aspect ratio switch</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                  <span>High-res PNG & multi-page LinkedIn PDF export</span>
                </div>
              </div>
            </div>

            <div className="pt-8 mt-6 border-t border-slate-800 space-y-2.5">
              <Link
                to="/framewise"
                className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md transition-colors flex items-center justify-center gap-2"
              >
                <span>Launch Framewise Studio</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                to="/framewise"
                className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 transition-colors flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-3 h-3 text-slate-400" />
                <span>Open 10-Slide Sample Carousel</span>
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Technical Attribution */}
      <footer className="border-t border-slate-800/80 bg-[#161b22]/70 py-6 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-slate-400">
            <span>Engineering Assessment by</span>
            <strong className="text-white">Priyanshu Singh</strong>
            <span>•</span>
            <span className="font-mono text-emerald-400">priyanshusingh22340@gmail.com</span>
          </div>

          <div className="flex items-center gap-4 text-slate-500">
            <span>Stack: React + Tailwind + Node.js + Express + MongoDB</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
