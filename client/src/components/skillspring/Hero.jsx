import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Terminal, Cpu, CheckCircle } from 'lucide-react';

export default function Hero({ onEnquireClick, onExploreClick }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-indigo-950 via-slate-900 to-slate-950 text-white pt-16 pb-24 border-b border-indigo-900/40">
      {/* Decorative gradient glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-violet-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Main Copy */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>Project-Based AI & Workflow Engineering Cohorts</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.12]">
              Build Skills for the <br />
              <span className="bg-gradient-to-r from-indigo-400 via-violet-300 to-indigo-200 bg-clip-text text-transparent">
                Intelligence Era
              </span>
              .
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed">
              Move beyond generic chatbot prompts. Master production prompt engineering, autonomous n8n workflows, multimodal LLM systems, and full-stack AI development with live mentor guidance.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onExploreClick}
                className="px-6 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg transition-all flex items-center gap-2 active:scale-95"
              >
                <span>Explore Programmes</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onEnquireClick}
                className="px-6 py-3.5 bg-slate-800 hover:bg-slate-750 border border-slate-700 text-slate-200 font-bold text-xs rounded-xl transition-all"
              >
                <span>Enquire Now</span>
              </button>
            </div>

            {/* Credibility Highlights */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-800 text-xs text-slate-300">
              <div>
                <div className="font-extrabold text-white text-lg">100%</div>
                <div className="text-slate-400 text-[11px] mt-0.5">Hands-On Code & Flows</div>
              </div>
              <div>
                <div className="font-extrabold text-white text-lg">4.92 / 5</div>
                <div className="text-slate-400 text-[11px] mt-0.5">Average Cohort Rating</div>
              </div>
              <div>
                <div className="font-extrabold text-white text-lg">Real n8n</div>
                <div className="text-slate-400 text-[11px] mt-0.5">Autonomous Agent Nodes</div>
              </div>
            </div>
          </div>

          {/* Interactive Visual: Live Prompt & Agent Terminal Preview */}
          <div className="lg:col-span-5 relative">
            <div className="bg-slate-900/90 rounded-3xl p-6 border border-slate-700/80 shadow-2xl backdrop-blur-xl">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="text-[11px] font-mono text-slate-400 ml-2">agent_workflow.py</span>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-indigo-500/20 text-indigo-300">
                  LIVE RUNTIME
                </span>
              </div>

              <div className="mt-4 font-mono text-xs space-y-3">
                <div className="text-slate-400">
                  <span className="text-indigo-400 font-bold"># Step 1:</span> Structured JSON Output Schema
                </div>
                <div className="p-3 bg-slate-950 rounded-xl text-emerald-400 text-[11px] overflow-x-auto border border-slate-800">
                  <code>{`{
  "system": "SlidePilot Autonomous Engine",
  "pipeline": "n8n Webhook Listener",
  "guardrails": ["Zero Fake Stats", "Strict JSON Schema"],
  "humanApproval": "Enforced"
}`}</code>
                </div>

                <div className="text-slate-400 pt-1">
                  <span className="text-violet-400 font-bold"># Step 2:</span> Multi-Agent Pipeline Execution
                </div>
                <div className="space-y-1.5 text-[11px]">
                  <div className="flex items-center gap-2 text-slate-300">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                    <span>OpenAI gpt-4o token inference completed (1.2s)</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Slide matrix validation passed (6 slides)</span>
                  </div>
                  <div className="flex items-center gap-2 text-amber-400">
                    <div className="w-3.5 h-3.5 rounded-full border border-amber-400 flex items-center justify-center text-[9px]">
                      !
                    </div>
                    <span>Queued for Founder Human Review</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span>Curriculum Concept</span>
                <span className="text-indigo-400 font-semibold">Cohort Admissions Open</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

