import React from 'react';
import { Code2, FolderGit2, Wrench, Briefcase, TrendingUp } from 'lucide-react';

export default function WhyUs() {
  const pillars = [
    {
      title: 'Hands-On Learning',
      desc: 'No passive video lectures. Every session requires writing live prompt matrices, configuring nodes, and debugging API payloads.',
      icon: Code2,
      badge: 'Active Labs',
    },
    {
      title: 'Project-Based Experience',
      desc: 'Build four portfolio capstones: autonomous content engines, multimodal RAG search, lead qualification bots, and PRD synthesizers.',
      icon: FolderGit2,
      badge: '4 Real Capstones',
    },
    {
      title: 'Practical Modern Tools',
      desc: 'Work directly with n8n, OpenAI gpt-4o, Claude 3.5 Sonnet, LangChain, Pinecone vector stores, and Whisper audio pipelines.',
      icon: Wrench,
      badge: 'Modern AI Stack',
    },
    {
      title: 'Industry-Oriented Curriculum',
      desc: 'Curriculum designed alongside senior product engineers and automation architects to reflect real startup engineering challenges.',
      icon: Briefcase,
      badge: 'Founder Vetted',
    },
    {
      title: 'Career-Focused Outcomes',
      desc: 'Position yourself for high-demand AI Engineer, AI Product Specialist, and Automation Architect opportunities with a verified GitHub portfolio.',
      icon: TrendingUp,
      badge: 'Career Leverage',
    },
  ];

  return (
    <section id="why-us" className="py-20 bg-slate-900 text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
          <div className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
            Educational Philosophy
          </div>
          <h2 className="text-3xl font-extrabold text-white">
            Why Choose SkillSpring AI?
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            We prioritize real engineering competence over speculative hype.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-slate-950 p-6 rounded-3xl border border-slate-800/80 hover:border-indigo-500/40 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono text-indigo-300 uppercase tracking-wider">
                    {item.badge}
                  </span>
                  <h3 className="font-bold text-sm text-white mt-2 mb-2">{item.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

