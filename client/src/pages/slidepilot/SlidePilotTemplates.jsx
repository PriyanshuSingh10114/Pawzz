import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SlidePilotNav from '../../components/slidepilot/SlidePilotNav';
import SlideRenderer from '../../components/slidepilot/SlideRenderer';
import { Palette, Sparkles, ArrowRight, Check } from 'lucide-react';

const templateList = [
  {
    id: 'minimal-editorial',
    name: 'Minimal Editorial',
    desc: 'Sophisticated typography, warm stone background, and Swiss design grid. Perfect for executive thought leadership and nuanced essays.',
    idealFor: 'LinkedIn Thought Leadership, Substack Carousels',
  },
  {
    id: 'modern-gradient',
    name: 'Modern Gradient (Dark Mesh)',
    desc: 'Deep indigo mesh glow with glassmorphic cards and glowing accents. Designed to maximize dwell time on technical AI and developer feeds.',
    idealFor: 'Tech Product Launches, AI Engineering, SaaS Systems',
  },
  {
    id: 'corporate',
    name: 'Corporate Executive',
    desc: 'Structured deep-navy borders and crisp data callouts. Delivers boardroom gravitas for B2B playbooks and financial frameworks.',
    idealFor: 'B2B Enterprise, Financial Metrics, Executive Strategy',
  },
  {
    id: 'educational-infographic',
    name: 'Educational Infographic',
    desc: 'Clean medical and educational layout with numbered step badges and green highlight cards. Exceptional readability.',
    idealFor: 'Healthcare Checklists, Tutorials, Step-by-Step Guides',
  },
  {
    id: 'bold-typography',
    name: 'Bold Brutalist Typography',
    desc: 'High-contrast neo-brutalist styling with stark black borders and electric amber fills. High-virality format for punchy statements.',
    idealFor: 'Instagram Feeds, Viral Contrarian Takes, Quick Tips',
  },
];

const sampleSlide = {
  slideNumber: 1,
  headline: 'The Unspoken Architecture Rule in Production AI Systems',
  description: 'Deterministic schema enforcement always outperforms prompt engineering tweaks. Lock your inputs to strict JSON contracts before scaling token spend.',
  visualType: 'System Paradigm',
  tag: 'Core Principle #1',
  cta: 'Swipe to see the breakdown →',
};

export default function SlidePilotTemplates() {
  const [selectedTemplate, setSelectedTemplate] = useState('minimal-editorial');
  const [aspectRatio, setAspectRatio] = useState('portrait');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-20">
      <SlidePilotNav />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider">
              DESIGN SYSTEM TOKENS
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              Curated Slide Design Templates
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Engineered with strict mathematical spacing, accessible typography, and dual aspect ratio support.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setAspectRatio(aspectRatio === 'portrait' ? 'square' : 'portrait')}
              className="px-3.5 py-1.5 bg-slate-900 border border-slate-700 rounded-xl text-xs font-semibold text-slate-300 hover:text-white"
            >
              Toggle Ratio ({aspectRatio === 'portrait' ? '4:5 Portrait' : '1:1 Square'})
            </button>
          </div>
        </div>

        {/* Interactive Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Template Selector List (5 cols) */}
          <div className="lg:col-span-5 space-y-3">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Select Template to Preview
            </div>

            {templateList.map((tpl) => {
              const isSelected = selectedTemplate === tpl.id;
              return (
                <div
                  key={tpl.id}
                  onClick={() => setSelectedTemplate(tpl.id)}
                  className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-slate-900 border-amber-500 ring-2 ring-amber-500/20 shadow-lg'
                      : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-sm text-white">{tpl.name}</h3>
                    {isSelected && <Check className="w-4 h-4 text-amber-400" />}
                  </div>
                  <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">{tpl.desc}</p>
                  <div className="mt-3 pt-3 border-t border-slate-800 text-[11px] text-amber-300/80 font-mono">
                    Best for: {tpl.idealFor}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Interactive Live Preview (7 cols) */}
          <div className="lg:col-span-7 bg-slate-900/70 p-8 rounded-3xl border border-slate-800 flex flex-col items-center">
            <div className="text-xs font-bold text-slate-400 mb-6 flex items-center gap-2">
              <Palette className="w-4 h-4 text-amber-400" />
              <span>Live Visual Rendering Engine</span>
            </div>

            <div className="w-full max-w-sm">
              <SlideRenderer
                slide={sampleSlide}
                totalSlides={6}
                template={selectedTemplate}
                aspectRatio={aspectRatio}
                authorName="NexaStudio / Sample"
              />
            </div>

            <div className="mt-8 text-center">
              <Link
                to="/slidepilot/create"
                className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs transition-all shadow-md active:scale-95"
              >
                <Sparkles className="w-4 h-4" />
                <span>Use "{templateList.find(t => t.id === selectedTemplate)?.name}" Now</span>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

