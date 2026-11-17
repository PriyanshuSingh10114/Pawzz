import React, { useState } from 'react';
import { Star, ChevronDown, ChevronUp, Quote, Sparkles, ArrowRight } from 'lucide-react';

const testimonials = [
  {
    name: 'Kavita Nair',
    role: 'Product Manager at FinTech Scaleup',
    programme: 'AI for Product Managers',
    rating: 5,
    quote: 'Before this cohort, I was intimidated by AI technical trade-offs. Now I can calculate token latency budgets, review PRDs with engineering leads, and design error fallback UX with total confidence.',
    illustrative: true,
  },
  {
    name: 'Sameer Kulkarni',
    role: 'Growth Marketing Lead',
    programme: 'AI Automation with n8n',
    rating: 5,
    quote: 'We replaced 15 hours of manual weekly content formatting and lead scraping with a single self-hosted n8n webhook pipeline connected to OpenAI gpt-4o-mini.',
    illustrative: true,
  },
  {
    name: 'Tanvi Agarwal',
    role: 'Frontend Engineer',
    programme: 'Full-Stack AI Application Development',
    rating: 5,
    quote: 'The modules on streaming AI responses with Vercel AI SDK and vector chunking helped me build our startup’s internal enterprise search tool in 3 weeks.',
    illustrative: true,
  },
];

const faqs = [
  {
    q: 'Do I need a computer science degree or coding experience to join?',
    a: 'For our Generative AI Fundamentals and AI for Product Managers programmes, zero prior coding is required. For Full-Stack AI Engineering, basic familiarity with JavaScript or React is recommended.',
  },
  {
    q: 'Are the live sessions recorded if I miss a workshop?',
    a: 'Yes, every cohort lecture, code walkthrough, and prompt critique is recorded in 4K and uploaded to the private student portal within 2 hours of completion.',
  },
  {
    q: 'How does the human-in-the-loop AI philosophy apply to the curriculum?',
    a: 'We teach you never to build brittle, unsupervised autonomous loops. You will learn to engineer strict JSON output validation, exception handlers, and founder approval gates like the ones built into SlidePilot.',
  },
  {
    q: 'What certificate or credentials do I receive?',
    a: 'Graduates receive a verified SkillSpring AI Certificate of Completion along with a publicly shareable GitHub repository containing verified capstone deployments.',
  },
];

export default function TestimonialsAndFaq({ onEnquireClick }) {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <>
      {/* Testimonials */}
      <section className="py-20 bg-slate-950 text-white border-b border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
            <div className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
              Student Perspectives
            </div>
            <h2 className="text-3xl font-extrabold text-white">
              Learner Experiences & Outcomes
            </h2>
            <p className="text-xs text-slate-400">
              *Illustrative learner profiles representing typical cohort outcomes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="bg-slate-900 p-7 rounded-3xl border border-slate-800 flex flex-col justify-between relative"
              >
                <div>
                  <div className="flex items-center gap-1 mb-4 text-amber-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>

                  <Quote className="w-8 h-8 text-indigo-500/20 mb-2" />
                  <p className="text-xs text-slate-300 leading-relaxed italic">
                    "{t.quote}"
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-800 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-white">{t.name}</div>
                    <div className="text-[11px] text-slate-400">{t.role}</div>
                  </div>
                  <span className="text-[10px] font-mono text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded">
                    {t.programme}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section id="faq" className="py-20 bg-slate-900 text-white border-b border-slate-800">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 space-y-2">
            <div className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
              Common Questions
            </div>
            <h2 className="text-3xl font-extrabold text-white">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-slate-900/50 transition-colors"
                  >
                    <span className="font-bold text-sm text-white">{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-indigo-400 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs text-slate-300 leading-relaxed border-t border-slate-900 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Final Registration CTA */}
          <div className="mt-16 p-8 bg-gradient-to-r from-indigo-900/60 to-violet-950/60 border border-indigo-500/30 rounded-3xl text-center space-y-4">
            <h3 className="text-xl sm:text-2xl font-extrabold text-white">
              Ready to Upgrade Your AI Engineering Capabilities?
            </h3>
            <p className="text-xs text-slate-300 max-w-md mx-auto">
              Cohorts are strictly limited to 20 learners to guarantee live code review and 1-on-1 mentor guidance.
            </p>
            <button
              onClick={onEnquireClick}
              className="px-8 py-3.5 bg-white hover:bg-slate-100 text-slate-950 font-bold text-xs rounded-xl transition-all shadow-md inline-flex items-center gap-2"
            >
              <span>Apply for Upcoming Cohort</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
