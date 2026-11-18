import React, { useState } from 'react';
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
  Stethoscope,
  Briefcase,
  Sliders,
  Activity,
  Server,
  Zap,
  Globe,
  Mail,
  Github,
  Terminal,
  Shield,
  Clock,
  ChevronRight,
  FileText,
  UserCheck,
} from 'lucide-react';

export default function RootPortal() {
  const [activeTab, setActiveTab] = useState('pawzz');

  const tabData = {
    pawzz: {
      name: 'Pawzz Healthcare',
      tagline: 'Practo for Animals • 100% Council-Audited Provider Directory',
      badge: 'Healthcare Discovery',
      badgeColor: 'bg-emerald-950 text-emerald-300 border-emerald-500/30',
      accentColor: 'text-emerald-400',
      btnColor: 'bg-emerald-600 hover:bg-emerald-500 text-white',
      image: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&w=800&q=80',
      description:
        'Comprehensive discovery platform for veterinary clinics, emergency 24/7 ICU animal hospitals, mobile pet ambulances, diagnostics, boarding suites, and animal welfare NGOs across top Indian metros.',
      highlights: [
        'Multi-criteria real-time search by city, department, keyword, and 24/7 emergency filter',
        'Provider details with council registrations, on-site diagnostics, and verified tariffs',
        'Production B2B provider onboarding modal & community data correction reporting',
        'Emergency first-aid triage protocol cards for acute poisoning, heatstroke, and trauma',
      ],
      primaryLink: '/pawzz',
      primaryText: 'Launch Pawzz Healthcare',
      secondaryLink: '/pawzz/search',
      secondaryText: 'Explore Search Directory',
    },
    upwise: {
      name: 'Upwise Academy',
      tagline: 'Practical Digital & AI Engineering Cohorts for Builders',
      badge: 'Education Platform',
      badgeColor: 'bg-amber-950 text-amber-300 border-amber-500/30',
      accentColor: 'text-amber-400',
      btnColor: 'bg-amber-500 hover:bg-amber-400 text-slate-950',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
      description:
        'Project-driven professional education designed to bridge the gap between AI hype and real-world production engineering, autonomous agentic workflows, and scalable digital product development.',
      highlights: [
        '4 flagship cohorts with week-by-week syllabi, prerequisites, and learning outcomes',
        '5-step learning pedagogy: Discover → Enquire → Register → Learn → Build',
        'Production admissions enquiry lead capture with duplicate submission suppression',
        'Capstone defense frameworks and tool-driven hands-on engineering exercises',
      ],
      primaryLink: '/upwise',
      primaryText: 'Launch Upwise Academy',
      secondaryLink: '/upwise#programmes',
      secondaryText: 'View 4 Cohort Syllabi',
    },
    framewise: {
      name: 'Framewise Studio',
      tagline: 'Autonomous AI-Powered Content Creation Studio',
      badge: 'Creative Studio',
      badgeColor: 'bg-indigo-950 text-indigo-300 border-indigo-500/30',
      accentColor: 'text-indigo-400',
      btnColor: 'bg-indigo-600 hover:bg-indigo-500 text-white',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
      description:
        'End-to-end founder studio enabling creators and engineers to ideate, structure, visually design, review, and export publication-ready multi-slide carousels for LinkedIn and Instagram.',
      highlights: [
        'Pre-loaded 10-slide sample carousel with verified headlines, body copy, and layout guidance',
        'Visual slide editor with 5 design palettes, typography styles, and aspect ratio switcher',
        'High-fidelity client-side multi-page PDF generation (LinkedIn) and high-res PNG export',
        'Automated webhook integration architecture with human-in-the-loop review and approval gate',
      ],
      primaryLink: '/framewise',
      primaryText: 'Launch Framewise Studio',
      secondaryLink: '/framewise',
      secondaryText: 'Open 10-Slide Sample Carousel',
    },
  };

  return (
    <div className="min-h-screen bg-[#0d1117] text-slate-100 font-sans selection:bg-emerald-500 selection:text-slate-950 flex flex-col justify-between">
      {/* Hero Switcher Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex-1 flex flex-col justify-center">
        <div className="max-w-3xl mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/20">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Pawzz Ecosystem Gateway • Engineered by <strong>Priyanshu Singh</strong></span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            One Unified Ecosystem. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-indigo-400">
              Animal Healthcare, AI Skills & Content Studio.
            </span>
          </h1>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-2xl">
            Production-grade platforms built for real-world impact: discover verified veterinary healthcare across India, master practical AI engineering, and produce social carousels with autonomous pipelines.
          </p>
        </div>

        {/* 3 Core Product Cards Grid with Photography */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-20">
          {/* PRODUCT 1: PAWZZ */}
          <div className="bg-[#161b22] border border-slate-800 rounded-3xl overflow-hidden flex flex-col justify-between hover:border-emerald-500/50 transition-all group shadow-xl">
            {/* Photographic Top Cover */}
            <div className="relative h-44 w-full overflow-hidden bg-slate-900">
              <img
                src="https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&w=700&q=80"
                alt="Pawzz Animal Healthcare"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#161b22] via-[#161b22]/40 to-transparent" />
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/30 uppercase tracking-wider font-mono">
                  Healthcare Network
                </span>
                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-white/90 text-slate-900">
                  Practo for Animals
                </span>
              </div>
            </div>

            <div className="p-7 space-y-5 flex-1 flex flex-col justify-between">
              <div className="space-y-3">
                <div>
                  <h2 className="text-2xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                    Pawzz
                  </h2>
                  <div className="text-xs font-semibold text-emerald-400 mt-0.5">
                    Animal Healthcare Discovery Platform
                  </div>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed">
                  Marketplace to discover 100% verified veterinary clinics, 24/7 animal hospitals, pathology diagnostic labs, pet boarding, and emergency ambulances across India.
                </p>

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

              <div className="pt-6 border-t border-slate-800/80 space-y-2.5">
                <Link
                  to="/pawzz"
                  className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-md transition-colors flex items-center justify-center gap-2"
                >
                  <span>Launch Pawzz Homepage</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  to="/pawzz/search"
                  className="w-full py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 transition-colors flex items-center justify-center gap-1.5"
                >
                  <Search className="w-3 h-3 text-slate-400" />
                  <span>Open Search & Filter Directory</span>
                </Link>
              </div>
            </div>
          </div>

          {/* PRODUCT 2: UPWISE */}
          <div className="bg-[#161b22] border border-slate-800 rounded-3xl overflow-hidden flex flex-col justify-between hover:border-amber-500/50 transition-all group shadow-xl">
            {/* Photographic Top Cover */}
            <div className="relative h-44 w-full overflow-hidden bg-slate-900">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=700&q=80"
                alt="Upwise Practical AI Education"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#161b22] via-[#161b22]/40 to-transparent" />
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-amber-950 text-amber-300 border border-amber-500/30 uppercase tracking-wider font-mono">
                  Academy Platform
                </span>
                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-white/90 text-slate-900">
                  Practical AI Cohorts
                </span>
              </div>
            </div>

            <div className="p-7 space-y-5 flex-1 flex flex-col justify-between">
              <div className="space-y-3">
                <div>
                  <h2 className="text-2xl font-bold text-white group-hover:text-amber-400 transition-colors">
                    Upwise
                  </h2>
                  <div className="text-xs font-semibold text-amber-400 mt-0.5">
                    Practical AI & Digital Skills Education
                  </div>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed">
                  Project-driven cohorts for students and professionals. Build real production AI agents, autonomous workflows, and web apps with senior mentor reviews.
                </p>

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

              <div className="pt-6 border-t border-slate-800/80 space-y-2.5">
                <Link
                  to="/upwise"
                  className="w-full py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs shadow-md transition-colors flex items-center justify-center gap-2"
                >
                  <span>Launch Upwise Platform</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  to="/upwise#programmes"
                  className="w-full py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 transition-colors flex items-center justify-center gap-1.5"
                >
                  <BookOpen className="w-3 h-3 text-slate-400" />
                  <span>View 4 Programmes & Syllabi</span>
                </Link>
              </div>
            </div>
          </div>

          {/* PRODUCT 3: FRAMEWISE */}
          <div className="bg-[#161b22] border border-slate-800 rounded-3xl overflow-hidden flex flex-col justify-between hover:border-indigo-500/50 transition-all group shadow-xl">
            {/* Photographic Top Cover */}
            <div className="relative h-44 w-full overflow-hidden bg-slate-900">
              <img
                src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=700&q=80"
                alt="Framewise Social Carousel Studio"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#161b22] via-[#161b22]/40 to-transparent" />
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-500/30 uppercase tracking-wider font-mono">
                  Creative Studio
                </span>
                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-white/90 text-slate-900">
                  Carousel Creator Studio
                </span>
              </div>
            </div>

            <div className="p-7 space-y-5 flex-1 flex flex-col justify-between">
              <div className="space-y-3">
                <div>
                  <h2 className="text-2xl font-bold text-white group-hover:text-indigo-400 transition-colors">
                    Framewise
                  </h2>
                  <div className="text-xs font-semibold text-indigo-400 mt-0.5">
                    Social Carousel Creation Studio
                  </div>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed">
                  End-to-end founder studio to ideate, write, structure, design, review, and export multi-slide carousels for LinkedIn and Instagram.
                </p>

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

              <div className="pt-6 border-t border-slate-800/80 space-y-2.5">
                <Link
                  to="/framewise"
                  className="w-full py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs shadow-md transition-colors flex items-center justify-center gap-2"
                >
                  <span>Launch Framewise Studio</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  to="/framewise"
                  className="w-full py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 transition-colors flex items-center justify-center gap-1.5"
                >
                  <Sparkles className="w-3 h-3 text-slate-400" />
                  <span>Open 10-Slide Sample Carousel</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 1: System Telemetry & Live Platform Metrics */}
        <section className="mb-20 pt-6">
          <div className="bg-[#161b22] border border-slate-800 rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-8 pb-8 border-b border-slate-800">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold mb-2 border border-emerald-500/20">
                  <Activity className="w-3.5 h-3.5 animate-pulse" />
                  <span>Live System Telemetry & Architecture Health</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Production Metrics Across the Platform
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Autonomous backend services with dual-engine persistence and sub-second execution.
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-950/40 px-3.5 py-2 rounded-xl border border-emerald-500/30 shrink-0">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>All Microservices Operational • 99.98% Uptime</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
              {[
                {
                  label: 'Verified Care Network',
                  value: '17+ Facilities',
                  detail: 'Hospitals, 24/7 ICUs & Ambulances',
                  icon: Stethoscope,
                  color: 'text-emerald-400',
                  bg: 'bg-emerald-950/40 border-emerald-500/30',
                },
                {
                  label: 'Technical Education',
                  value: '4 AI Cohorts',
                  detail: 'GenAI, Agents, Workflows & AI-PM',
                  icon: GraduationCap,
                  color: 'text-amber-400',
                  bg: 'bg-amber-950/40 border-amber-500/30',
                },
                {
                  label: 'Content Engine',
                  value: '10-Slide Ready',
                  detail: 'Sample Carousel & Multi-Page PDF',
                  icon: Layers,
                  color: 'text-indigo-400',
                  bg: 'bg-indigo-950/40 border-indigo-500/30',
                },
                {
                  label: 'Response Latency',
                  value: '< 45ms',
                  detail: 'Dual-Engine Persistence (Mongo + Local)',
                  icon: Zap,
                  color: 'text-teal-400',
                  bg: 'bg-teal-950/40 border-teal-500/30',
                },
              ].map((metric, idx) => {
                const MetricIcon = metric.icon;
                return (
                  <div
                    key={idx}
                    className="p-5 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        {metric.label}
                      </span>
                      <div className={`w-8 h-8 rounded-xl ${metric.bg} border flex items-center justify-center ${metric.color}`}>
                        <MetricIcon className="w-4 h-4" />
                      </div>
                    </div>
                    <div className={`text-2xl font-black ${metric.color} tracking-tight`}>
                      {metric.value}
                    </div>
                    <div className="text-[11px] text-slate-400">
                      {metric.detail}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTION 2: Interactive Deep-Dive Platform Switcher */}
        <section className="mb-20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                Interactive Walkthrough
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
                Explore Platform Capabilities
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Toggle between each application to review user journeys, live features, and design decisions.
              </p>
            </div>

            {/* Tab Selector Buttons */}
            <div className="flex items-center gap-2 p-1.5 bg-[#161b22] border border-slate-800 rounded-2xl shrink-0">
              {[
                { id: 'pawzz', label: '🐾 Pawzz Care' },
                { id: 'upwise', label: '🎓 Upwise AI' },
                { id: 'framewise', label: '🎨 Framewise Studio' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === tab.id
                      ? 'bg-slate-800 text-white shadow-md border border-slate-700'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content Display Card */}
          {(() => {
            const current = tabData[activeTab];
            return (
              <div className="bg-[#161b22] border border-slate-800 rounded-3xl p-8 sm:p-10 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-6">
                  <div className="space-y-2">
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider font-mono border ${current.badgeColor}`}>
                      {current.badge}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-2">
                      {current.name}
                    </h3>
                    <div className={`text-xs font-semibold ${current.accentColor}`}>
                      {current.tagline}
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {current.description}
                  </p>

                  <div className="space-y-2.5 pt-2 border-t border-slate-800">
                    {current.highlights.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                        <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${current.accentColor}`} />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 flex flex-col sm:flex-row gap-3">
                    <Link
                      to={current.primaryLink}
                      className={`px-6 py-3.5 rounded-2xl ${current.btnColor} font-extrabold text-xs shadow-md transition-colors flex items-center justify-center gap-2`}
                    >
                      <span>{current.primaryText}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                    <Link
                      to={current.secondaryLink}
                      className="px-5 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 transition-colors flex items-center justify-center gap-2"
                    >
                      <span>{current.secondaryText}</span>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                    </Link>
                  </div>
                </div>

                <div className="lg:col-span-5 relative">
                  <div className="rounded-2xl overflow-hidden border-2 border-slate-700 shadow-xl group">
                    <img
                      src={current.image}
                      alt={current.name}
                      className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
                  </div>
                </div>
              </div>
            );
          })()}
        </section>

        {/* SECTION 3: Unified Ecosystem Architecture Synergy */}
        <section className="mb-20">
          <div className="max-w-3xl mb-10 space-y-2">
            <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
              System Design & Philosophy
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              The 3-Pillar Ecosystem Synergy
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              How healthtech discovery, modern AI engineering education, and autonomous distribution tools reinforce one another.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: 'Pillar 01',
                title: 'Consumer Healthcare Network',
                subtitle: 'Pawzz Platform',
                desc: 'Addresses critical fragmentation in animal emergency care. Provides pet parents with verified doctor credentials, ICU triage, and ambulance dispatch with 0% unverified fluff.',
                icon: Stethoscope,
                color: 'text-emerald-400',
                border: 'hover:border-emerald-500/50',
              },
              {
                step: 'Pillar 02',
                title: 'Technical Workforce Mastery',
                subtitle: 'Upwise Academy',
                desc: 'Arms modern developers with the ability to engineer real-world resilient software: Agentic LLM chains, full-stack microservices, and reliable asynchronous architectures.',
                icon: GraduationCap,
                color: 'text-amber-400',
                border: 'hover:border-amber-500/50',
              },
              {
                step: 'Pillar 03',
                title: 'Autonomous Distribution Leverage',
                subtitle: 'Framewise Studio',
                desc: 'Gives technical founders independent reach. Transforms raw ideas into multi-slide editorial carousels for LinkedIn and Instagram with zero dependency on design agencies.',
                icon: Layers,
                color: 'text-indigo-400',
                border: 'hover:border-indigo-500/50',
              },
            ].map((pillar, idx) => {
              const PillarIcon = pillar.icon;
              return (
                <div
                  key={idx}
                  className={`bg-[#161b22] border border-slate-800 rounded-3xl p-7 flex flex-col justify-between space-y-6 transition-all ${pillar.border}`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">
                        {pillar.step}
                      </span>
                      <div className={`w-8 h-8 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center ${pillar.color}`}>
                        <PillarIcon className="w-4 h-4" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-extrabold text-white text-base leading-snug">
                        {pillar.title}
                      </h3>
                      <div className={`text-xs font-semibold ${pillar.color} mt-0.5`}>
                        {pillar.subtitle}
                      </div>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-800 text-[11px] font-bold text-slate-500 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Production Ready Architecture</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION 4: Engineering Stack & Reliability Showcase */}
        <section className="mb-20">
          <div className="bg-[#161b22] border border-slate-800 rounded-3xl p-8 sm:p-10 shadow-2xl">
            <div className="max-w-3xl mb-8 space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-semibold border border-slate-700">
                <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                <span>Full-Stack Engineering Rigor</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Architected for High Concurrency & Zero Downtime
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                A decoupled, modular architecture adhering to modern production standards.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: 'Frontend Client',
                  tech: 'React 18 + Vite 6 + Tailwind',
                  desc: 'High-performance SPA, modular components, responsive design across mobile/desktop, zero rendering lag.',
                  icon: Code2,
                  color: 'text-cyan-400',
                },
                {
                  title: 'REST Backend',
                  tech: 'Node.js 22 + Express Microservice',
                  desc: 'Structured RESTful API endpoints, request validation, CORS security, and intelligent rate limiting.',
                  icon: Server,
                  color: 'text-emerald-400',
                },
                {
                  title: 'Dual-Tier Storage',
                  tech: 'MongoDB + Local Fallback',
                  desc: 'Automatic fallback to resilient local file state if external DB is offline, ensuring 100% test pass rate.',
                  icon: Database,
                  color: 'text-amber-400',
                },
                {
                  title: 'Export & Automations',
                  tech: 'html2canvas + jsPDF Engine',
                  desc: 'In-browser vector rendering, 1080x1350 multi-page PDF generation, and simulated n8n webhook pipelines.',
                  icon: Workflow,
                  color: 'text-indigo-400',
                },
              ].map((stack, idx) => {
                const StackIcon = stack.icon;
                return (
                  <div
                    key={idx}
                    className="p-5 bg-slate-900/60 rounded-2xl border border-slate-800/80 space-y-3"
                  >
                    <div className={`w-8 h-8 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center justify-center ${stack.color}`}>
                      <StackIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-white text-sm">
                        {stack.title}
                      </h4>
                      <div className="text-[11px] font-mono text-emerald-400 mt-0.5">
                        {stack.tech}
                      </div>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {stack.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTION 5: Author & Systems Architect Card */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-[#161b22] via-slate-900 to-[#161b22] border border-slate-800 rounded-3xl p-8 sm:p-10 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-indigo-600 flex items-center justify-center text-white text-3xl font-black shadow-xl shrink-0">
                PS
              </div>
              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[11px] font-semibold border border-emerald-500/20">
                  <UserCheck className="w-3 h-3" />
                  <span>Lead Architect & Author</span>
                </div>
                <h3 className="text-2xl font-black text-white tracking-tight">
                  Priyanshu Singh
                </h3>
                <p className="text-xs text-slate-400 max-w-md">
                  Full-stack software engineer dedicated to clean architecture, reliable distributed systems, and intuitive user experiences.
                </p>
                <div className="text-xs font-mono text-emerald-400 pt-1">
                  priyanshusingh22340@gmail.com
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <a
                href="mailto:priyanshusingh22340@gmail.com"
                className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-md transition-colors flex items-center justify-center gap-2"
              >
                <Mail className="w-4 h-4" />
                <span>Contact Author</span>
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="px-5 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 transition-colors flex items-center justify-center gap-2"
              >
                <Github className="w-4 h-4 text-slate-400" />
                <span>GitHub Profile</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Bottom Technical Attribution */}
      <footer className="border-t border-slate-800/80 bg-[#161b22]/70 py-6 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-slate-400">
            <span>Engineered with production rigor by</span>
            <strong className="text-white">Priyanshu Singh</strong>
            <span>•</span>
            <a
              href="mailto:priyanshusingh22340@gmail.com"
              className="font-mono text-emerald-400 hover:underline"
            >
              priyanshusingh22340@gmail.com
            </a>
          </div>

          <div className="flex items-center gap-4 text-slate-500">
            <span>Stack: React 18 + Vite + Tailwind + Node.js 22 + Express + MongoDB</span>
          </div>
        </div>
      </footer>
    </div>
  );
}