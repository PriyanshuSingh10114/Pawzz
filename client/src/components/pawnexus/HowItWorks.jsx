import React from 'react';
import { Search, ShieldCheck, PhoneCall, Award, Users, HeartHandshake } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      num: '01',
      title: 'Locate Nearby Care',
      desc: 'Filter by city, 24/7 emergency readiness, diagnostics labs, boarding retreats, or surgical ICU specialties.',
      icon: Search,
    },
    {
      num: '02',
      title: 'Inspect Verified Facilities',
      desc: 'Review transparent facility photos, verified staff accreditations, emergency telephone numbers, and pet parent reviews.',
      icon: ShieldCheck,
    },
    {
      num: '03',
      title: 'Connect & Dispatch Directly',
      desc: 'One tap to call ambulance dispatch, veterinary emergency lines, or launch GPS turn-by-turn navigation without registration barriers.',
      icon: PhoneCall,
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
            Clear, Stress-Free Process
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 mt-1">
            How PawNexus Works in an Emergency
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            When minutes matter, you shouldn't have to navigate outdated forum posts or unanswered numbers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-subtle relative overflow-hidden group hover:border-emerald-300 transition-colors"
              >
                <div className="text-5xl font-black text-slate-100 group-hover:text-emerald-50 transition-colors absolute top-4 right-6 select-none">
                  {s.num}
                </div>

                <div className="w-12 h-12 rounded-2xl bg-emerald-100/70 text-emerald-700 flex items-center justify-center mb-6">
                  <Icon className="w-6 h-6" />
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-2">{s.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{s.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
