import React from 'react';
import {
  Lightbulb,
  Zap,
  Cpu,
  FileSpreadsheet,
  Layout,
  Edit3,
  UserCheck,
  ShieldCheck,
  Share2,
  ArrowRight,
} from 'lucide-react';

export default function WorkflowDiagram() {
  const nodes = [
    { name: 'Founder Idea', sub: 'Raw thought / Topic', icon: Lightbulb, color: 'text-amber-500 bg-amber-500/10' },
    { name: 'Workflow Trigger', sub: 'UI Wizard or n8n', icon: Zap, color: 'text-rose-500 bg-rose-500/10' },
    { name: 'AI Research', sub: 'Structuring & Strategy', icon: Cpu, color: 'text-indigo-500 bg-indigo-500/10' },
    { name: 'Content Generation', sub: 'Strict JSON Schema', icon: FileSpreadsheet, color: 'text-violet-500 bg-violet-500/10' },
    { name: 'Slide Layouts', sub: 'Design Token Matrix', icon: Layout, color: 'text-blue-500 bg-blue-500/10' },
    { name: 'Editable Carousel', sub: 'Slide-by-Slide Editor', icon: Edit3, color: 'text-emerald-500 bg-emerald-500/10' },
    { name: 'Founder Review', sub: 'Review Gate (Draft)', icon: UserCheck, color: 'text-amber-500 bg-amber-500/10' },
    { name: 'Approval Gate', sub: 'Explicit Sign-Off', icon: ShieldCheck, color: 'text-teal-500 bg-teal-500/10' },
    { name: 'Export & Publish', sub: 'PDF / High-Res PNG', icon: Share2, color: 'text-emerald-500 bg-emerald-500/10' },
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 text-white space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div>
          <div className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider">
            SYSTEM ARCHITECTURE
          </div>
          <h3 className="text-xl font-extrabold text-white mt-0.5">
            SlidePilot End-to-End AI Workflow Pipeline
          </h3>
        </div>
        <div className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold rounded-full w-fit">
          Human-in-the-Loop Enforced
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-9 gap-3">
        {nodes.map((node, idx) => {
          const Icon = node.icon;
          return (
            <div key={idx} className="relative flex flex-col items-center text-center group">
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-3 border border-slate-700/60 transition-transform group-hover:scale-105 ${node.color}`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <div className="text-xs font-bold text-slate-200">{node.name}</div>
              <div className="text-[10px] text-slate-400 mt-0.5">{node.sub}</div>

              {idx < nodes.length - 1 && (
                <div className="hidden lg:block absolute -right-2.5 top-6 -translate-y-1/2 text-slate-600">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

