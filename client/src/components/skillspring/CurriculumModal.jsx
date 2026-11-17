import React from 'react';
import { X, Clock, Calendar, CheckCircle2, BookOpen, Sparkles, ArrowRight } from 'lucide-react';

export default function CurriculumModal({
  programme,
  isOpen,
  onClose,
  onEnquire,
}) {
  if (!isOpen || !programme) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
        {/* Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-slate-100 flex items-start justify-between z-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700">
                {programme.category}
              </span>
              <span className="text-[10px] font-medium text-slate-500">
                Level: {programme.level}
              </span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 leading-snug">{programme.title}</h2>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-xl hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6 text-xs">
          {/* Tagline */}
          <p className="text-sm text-slate-700 leading-relaxed">
            {programme.tagline}
          </p>

          {/* Metadata Grid */}
          <div className="grid grid-cols-3 gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100 text-center">
            <div>
              <div className="text-[11px] text-slate-500">Duration</div>
              <div className="font-extrabold text-slate-900 text-sm mt-0.5">{programme.duration}</div>
            </div>
            <div>
              <div className="text-[11px] text-slate-500">Next Cohort</div>
              <div className="font-extrabold text-indigo-700 text-sm mt-0.5">{programme.cohortStart}</div>
            </div>
            <div>
              <div className="text-[11px] text-slate-500">Admissions</div>
              <div className="font-extrabold text-amber-700 text-sm mt-0.5">{programme.seatsLeft} Seats Open</div>
            </div>
          </div>

          {/* Learning Outcomes */}
          <div className="space-y-3">
            <h3 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span>What You Will Master</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {programme.learningOutcomes?.map((outcome, idx) => (
                <div key={idx} className="p-3 bg-indigo-50/50 rounded-xl border border-indigo-100/60 flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                  <span className="text-slate-700 font-medium leading-relaxed">{outcome}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Week by Week Modules */}
          <div className="space-y-3 pt-2">
            <h3 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-indigo-600" />
              <span>Week-by-Week Syllabus & Project Milestones</span>
            </h3>

            <div className="space-y-3">
              {programme.modules?.map((mod, idx) => (
                <div key={idx} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 text-xs">
                      <span className="text-indigo-600 mr-2">{mod.week}:</span>
                      {mod.title}
                    </span>
                  </div>

                  <ul className="space-y-1 pl-4 text-slate-600 list-disc">
                    {mod.topics?.map((topic, tIdx) => (
                      <li key={tIdx} className="leading-relaxed">
                        {topic}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white/95 backdrop-blur-md px-6 py-4 border-t border-slate-100 flex items-center justify-between">
          <div className="text-[11px] text-slate-500">
            Sample curriculum designed for the intelligence era.
          </div>
          <button
            onClick={() => {
              onClose();
              if (onEnquire) onEnquire(programme);
            }}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-colors shadow-sm flex items-center gap-2"
          >
            <span>Enquire for this Cohort</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

