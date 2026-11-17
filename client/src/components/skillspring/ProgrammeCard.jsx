import React from 'react';
import { Clock, Star, Calendar, ArrowRight, CheckCircle2, Users } from 'lucide-react';

export default function ProgrammeCard({
  programme,
  onViewCurriculum,
  onEnquireForProgramme,
}) {
  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-card-hover transition-all duration-200 flex flex-col justify-between overflow-hidden group">
      <div className="p-7">
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700">
            {programme.category}
          </span>
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 border border-amber-200">
              {programme.seatsLeft} Seats Left
            </span>
            <span className="text-[10px] font-semibold text-slate-400">
              Sample Offering
            </span>
          </div>
        </div>

        {/* Title & Tagline */}
        <h3
          onClick={() => onViewCurriculum(programme)}
          className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors cursor-pointer leading-snug"
        >
          {programme.title}
        </h3>
        <p className="text-xs text-slate-600 mt-2 leading-relaxed">
          {programme.tagline}
        </p>

        {/* Metadata */}
        <div className="grid grid-cols-2 gap-2 mt-5 p-3 bg-slate-50 rounded-2xl border border-slate-100 text-xs">
          <div className="flex items-center gap-2 text-slate-600">
            <Clock className="w-4 h-4 text-indigo-500" />
            <span className="font-semibold text-slate-800">{programme.duration}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-600">
            <Calendar className="w-4 h-4 text-indigo-500" />
            <span className="truncate">{programme.cohortStart}</span>
          </div>
        </div>

        {/* Highlights */}
        <div className="mt-5 space-y-2">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Key Highlights
          </div>
          <ul className="space-y-1.5 text-xs text-slate-700">
            {programme.highlights?.slice(0, 3).map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3">
        <div className="flex items-center gap-1 text-xs">
          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
          <span className="font-bold text-slate-900">{programme.rating || 4.9}</span>
          <span className="text-slate-400">({programme.enrolledCount}+ learners)</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onViewCurriculum(programme)}
            className="px-3 py-1.5 text-xs font-bold text-slate-700 hover:text-indigo-600 transition-colors"
          >
            Syllabus
          </button>
          <button
            onClick={() => onEnquireForProgramme(programme)}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-colors shadow-sm flex items-center gap-1"
          >
            <span>Enquire</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
}
