import React from 'react';
import { Compass, FileText, Send, CheckCircle, Rocket } from 'lucide-react';

export default function LearningJourney() {
  const steps = [
    {
      step: '01',
      title: 'Discover a Programme',
      desc: 'Browse our industry-curated curriculum paths across AI automation, foundation models, product strategy, and engineering.',
      icon: Compass,
    },
    {
      step: '02',
      title: 'Submit an Enquiry',
      desc: 'Tell us your background and primary learning objective so our mentors can evaluate cohort fit and prerequisites.',
      icon: Send,
    },
    {
      step: '03',
      title: 'Receive Programme Pack',
      desc: 'Get immediate access to week-by-week module syllabi, sample capstone projects, and schedule timings in your inbox.',
      icon: FileText,
    },
    {
      step: '04',
      title: 'Complete Registration',
      desc: 'Confirm your seat with our admissions advisor and unlock pre-work materials, prompt repositories, and student Discord.',
      icon: CheckCircle,
    },
    {
      step: '05',
      title: 'Start Building',
      desc: 'Join live cohort labs, build real-world autonomous workflows, deploy live capstones, and receive mentor feedback.',
      icon: Rocket,
    },
  ];

  return (
    <section id="curriculum-approach" className="py-20 bg-slate-950 text-white border-b border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
          <div className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
            Structured Onboarding
          </div>
          <h2 className="text-3xl font-extrabold text-white">
            Your 5-Step Learning Journey
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            From initial enquiry to deploying autonomous production AI systems.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800 relative flex flex-col justify-between hover:border-indigo-500/50 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded">
                      Step {item.step}
                    </span>
                    <Icon className="w-4 h-4 text-slate-400" />
                  </div>
                  <h3 className="font-bold text-sm text-white mb-2">{item.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                </div>

                {idx < steps.length - 1 && (
                  <div className="hidden md:block absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-0.5 bg-slate-700 z-10" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
