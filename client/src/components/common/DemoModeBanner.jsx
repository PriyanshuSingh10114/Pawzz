import React, { useState } from 'react';
import { Sparkles, Info, X, Database, Bot, Workflow } from 'lucide-react';

export default function DemoModeBanner() {
  const [isDismissed, setIsDismissed] = useState(false);
  const [showModal, setShowModal] = useState(false);

  if (isDismissed) return null;

  return (
    <>
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2 font-medium">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-semibold text-emerald-400">NexaStudio Ready:</span>
            <span className="text-slate-300 hidden sm:inline">
              Running with zero-config seed data & intelligent fallback engine.
            </span>
            <span className="text-slate-300 sm:hidden">
              Interactive Live Demo
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowModal(true)}
              className="inline-flex items-center gap-1 text-slate-300 hover:text-white underline underline-offset-2 transition-colors"
            >
              <Info className="w-3.5 h-3.5" />
              <span>Audit System Status</span>
            </button>
            <button
              onClick={() => setIsDismissed(true)}
              className="text-slate-400 hover:text-white p-1 ml-2 rounded"
              title="Dismiss banner"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-brand-50 text-brand-600 rounded-lg">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">NexaStudio System Architecture Status</h3>
                  <p className="text-xs text-slate-500">Self-auditing environment configuration</p>
                </div>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-4 space-y-3 text-sm text-slate-600">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-3">
                <Database className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-slate-900">Database Layer</div>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Dual-mode Mongoose adapter. Connects automatically to persistent MongoDB Atlas if <code>MONGODB_URI</code> is present; otherwise gracefully runs in-memory with preloaded verified veterinary clinics, courses, and projects.
                  </p>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-3">
                <Bot className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-slate-900">AI Generation Pipeline</div>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Connects directly to OpenAI <code>gpt-4o-mini</code> when <code>OPENAI_API_KEY</code> is set. When omitted, SlidePilot triggers its built-in rule-based intelligent content synthesizer ensuring zero broken flows.
                  </p>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-3">
                <Workflow className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-slate-900">Automation & Webhooks</div>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Dedicated webhook endpoint <code>/api/automation/slidepilot/webhook</code> receives payloads from n8n or external triggers, with strict Founder Review approval gates.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-slate-900 text-white font-medium rounded-xl text-sm hover:bg-slate-800 transition-colors"
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
