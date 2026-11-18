import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Users,
  Star,
  Clock,
  Calendar,
  Layers,
  Code2,
  Workflow,
  Compass,
  Briefcase,
  HelpCircle,
  ShieldCheck,
  Send,
  AlertCircle,
  Loader2,
  X,
  FileText,
  Award,
} from 'lucide-react';
import { SkillSpringService } from '../../services/api';
import { useNotification } from '../../context/NotificationContext';

export default function UpwiseHome() {
  const { addNotification } = useNotification();
  const [programmes, setProgrammes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Selected programme for curriculum modal
  const [selectedProgramme, setSelectedProgramme] = useState(null);
  const [curriculumModalOpen, setCurriculumModalOpen] = useState(false);

  // Enquiry form state
  const [enquiryForm, setEnquiryForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    educationOrProfession: 'Working Professional',
    programmeInterested: '',
    learningObjective: '',
  });
  const [enquiryLoading, setEnquiryLoading] = useState(false);
  const [enquirySuccess, setEnquirySuccess] = useState('');
  const [enquiryError, setEnquiryError] = useState('');

  useEffect(() => {
    async function fetchProgrammes() {
      try {
        setLoading(true);
        const res = await SkillSpringService.getProgrammes();
        const list = res.data || [];
        setProgrammes(list);
        if (list.length > 0 && !enquiryForm.programmeInterested) {
          setEnquiryForm((prev) => ({ ...prev, programmeInterested: list[0].title }));
        }
      } catch (err) {
        setError(err.message || 'Failed to load Upwise programmes.');
      } finally {
        setLoading(false);
      }
    }
    fetchProgrammes();
  }, []);

  const handleOpenCurriculum = (programme) => {
    setSelectedProgramme(programme);
    setCurriculumModalOpen(true);
  };

  const handleSelectForEnquiry = (programme) => {
    setEnquiryForm((prev) => ({
      ...prev,
      programmeInterested: programme.title,
    }));
    const el = document.getElementById('admissions-enquiry');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleEnquirySubmit = async (e) => {
    e.preventDefault();
    if (!enquiryForm.fullName.trim() || !enquiryForm.email.trim() || !enquiryForm.phone.trim()) {
      setEnquiryError('Please fill in your name, email address, and phone number.');
      return;
    }

    try {
      setEnquiryLoading(true);
      setEnquiryError('');
      setEnquirySuccess('');

      const res = await SkillSpringService.submitEnquiry(enquiryForm);
      setEnquirySuccess(
        res.message || 'Enquiry submitted successfully! An admissions advisor will contact you within 24 hours.'
      );
      addNotification('Enquiry received! Check your inbox for cohort syllabus details.', 'success');
      setEnquiryForm({
        fullName: '',
        email: '',
        phone: '',
        educationOrProfession: 'Working Professional',
        programmeInterested: programmes[0]?.title || '',
        learningObjective: '',
      });
    } catch (err) {
      setEnquiryError(err.message || 'Failed to submit enquiry.');
    } finally {
      setEnquiryLoading(false);
    }
  };

  const roadmapSteps = [
    {
      step: '01',
      title: 'Core Foundations & Mental Models',
      desc: 'Understand foundational AI architecture, LLM prompt engineering primitives, and deterministic execution parameters without academic jargon.',
      duration: 'Week 1',
    },
    {
      step: '02',
      title: 'Guided Production Builds',
      desc: 'Pair with experienced practitioners on live codebases, building real AI workflows with OpenAI API, structured output schemas, and n8n webhooks.',
      duration: 'Weeks 2–3',
    },
    {
      step: '03',
      title: 'Independent Capstone Engineering',
      desc: 'Design, architect, and ship an original production-grade digital product from a founder or enterprise problem brief.',
      duration: 'Weeks 4–5',
    },
    {
      step: '04',
      title: '1-on-1 Senior Mentor Review',
      desc: 'Code audits, architecture teardowns, security vetting, and cost-per-token optimization with senior industry engineering leaders.',
      duration: 'Week 6',
    },
    {
      step: '05',
      title: 'Portfolio Defense & Referral',
      desc: 'Live capstone demo presentation to our hiring partner network, with verified GitHub repository and verifiable credential issue.',
      duration: 'Post-Cohort',
    },
  ];

  const faqs = [
    {
      q: 'How are Upwise programmes different from video tutorials?',
      a: 'Upwise is project-driven and cohort-based. You build real production systems, receive direct code reviews from senior engineers, and complete verified capstone projects rather than watching pre-recorded videos.',
    },
    {
      q: 'Do I need a computer science degree to enroll?',
      a: 'No. While foundational comfort with computers is required, our programmes are tailored for working professionals, aspiring product builders, and students ready to invest 8 to 10 hours per week in practical building.',
    },
    {
      q: 'What is the refund and satisfaction policy?',
      a: 'We offer a 100% money-back guarantee within the first 7 calendar days of the cohort start if you feel the programme does not meet your expectations.',
    },
    {
      q: 'Will I receive a verifiable certificate?',
      a: 'Yes. Upon passing your Capstone Defense, you earn an on-chain verifiable Upwise Certified Practitioner credential detailing the exact architecture, tools, and code repositories built during your cohort.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#faf8f5] text-slate-900 font-sans selection:bg-amber-500 selection:text-slate-950">
      {/* Top Banner Navigation Header */}
      <div className="bg-[#111927] text-slate-200 border-b border-slate-800 sticky top-16 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between text-xs">
          <div className="flex items-center gap-6">
            <span className="font-bold text-amber-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              Upwise Cohort Admissions Open
            </span>
            <div className="hidden md:flex items-center gap-4 text-slate-400">
              <a href="#programmes" className="hover:text-white transition-colors">
                Flagship Programmes
              </a>
              <a href="#pedagogy" className="hover:text-white transition-colors">
                5-Step Learning Roadmap
              </a>
              <a href="#admissions-enquiry" className="hover:text-white transition-colors">
                Admissions & Fees
              </a>
              <a href="#faqs" className="hover:text-white transition-colors">
                FAQ
              </a>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="#admissions-enquiry"
              className="text-amber-400 hover:text-amber-300 font-bold hover:underline"
            >
              Talk to an Advisor
            </a>
            <span className="text-slate-600">|</span>
            <span className="text-[11px] text-slate-400">Next Cohort: Nov 25, 2026</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#111927] via-[#1a2333] to-[#111927] text-white pt-16 pb-24 border-b border-slate-800">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 text-amber-300 text-xs font-bold border border-amber-500/25">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Practical AI & Digital Skills for the Intelligence Era</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.12]">
              Learn Skills That Move Your <span className="text-amber-400 underline decoration-amber-500 decoration-wavy decoration-2">Career Forward</span>.
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Hands-on, project-driven engineering cohorts for students and young professionals. Build real production AI agents, autonomous workflows, and modern web applications with direct mentor feedback.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <a
                href="#programmes"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-sm shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2"
              >
                <span>Explore Programmes</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#admissions-enquiry"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-white font-bold text-sm border border-slate-700 transition-colors flex items-center justify-center gap-2"
              >
                <span>Talk to an Admissions Advisor</span>
              </a>
            </div>

            {/* Credibility Strip */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 border-t border-slate-800/80 max-w-4xl mx-auto text-left">
              <div>
                <div className="flex items-center gap-1 text-amber-400 text-lg font-extrabold">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span>4.9 / 5.0</span>
                </div>
                <div className="text-xs text-slate-400 mt-0.5">Learner Satisfaction Rating</div>
              </div>

              <div>
                <div className="text-lg font-extrabold text-white">2,400+</div>
                <div className="text-xs text-slate-400 mt-0.5">Engineers & Builders Trained</div>
              </div>

              <div>
                <div className="text-lg font-extrabold text-white">100% Practical</div>
                <div className="text-xs text-slate-400 mt-0.5">Capstone Projects, No Slides</div>
              </div>

              <div>
                <div className="text-lg font-extrabold text-white">1:1 Mentorship</div>
                <div className="text-xs text-slate-400 mt-0.5">Weekly Senior Code Reviews</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Flagship Programmes Section */}
      <section id="programmes" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-bold text-amber-600 uppercase tracking-wider">Curated Cohorts</div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-1">
            4 Flagship AI & Engineering Programmes
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
            Every programme is structured around authentic industry engineering challenges, production tools, and verified GitHub deliverables.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="bg-white h-96 rounded-3xl border border-slate-200 animate-pulse" />
            ))}
          </div>
        ) : error ? (
          <div className="p-8 bg-rose-50 rounded-2xl border border-rose-200 text-rose-800 text-sm">
            {error}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {programmes.map((p) => (
              <div
                key={p._id || p.id || p.slug}
                className="bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between overflow-hidden"
              >
                <div className="p-8 space-y-5">
                  {/* Top Badges */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-800">
                      {p.category}
                    </span>
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200">
                      {p.seatsLeft || 8} Seats Left
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
                      {p.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                      {p.tagline}
                    </p>
                  </div>

                  {/* Metadata Chips */}
                  <div className="grid grid-cols-3 gap-2 p-3 bg-[#fbf9f5] rounded-2xl border border-stone-200 text-xs">
                    <div>
                      <div className="text-[10px] text-slate-400 font-bold uppercase">Duration</div>
                      <div className="font-extrabold text-slate-900 mt-0.5">{p.duration}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400 font-bold uppercase">Tuition</div>
                      <div className="font-extrabold text-amber-700 mt-0.5">{p.fee || '₹19,999'}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400 font-bold uppercase">Next Cohort</div>
                      <div className="font-extrabold text-slate-900 mt-0.5">{p.cohortStart}</div>
                    </div>
                  </div>

                  {/* Tools Taught Chips */}
                  <div className="space-y-1.5">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Tools & Frameworks
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {(p.toolsTaught || ['OpenAI API', 'n8n', 'Python', 'Cursor', 'Docker']).map((tool) => (
                        <span
                          key={tool}
                          className="px-2.5 py-0.5 bg-slate-100 text-slate-700 rounded-md text-[11px] font-mono font-medium"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Capstone Project Highlight */}
                  <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-1.5">
                    <div className="text-[10px] font-bold text-amber-800 uppercase tracking-wider flex items-center gap-1">
                      <Briefcase className="w-3.5 h-3.5 text-amber-700" />
                      <span>Verified Capstone Project</span>
                    </div>
                    <div className="text-xs font-bold text-slate-900">
                      {p.capstoneProject?.title || 'Autonomous Production System'}
                    </div>
                    <div className="text-[11px] text-slate-600 leading-relaxed">
                      {p.capstoneProject?.description || 'Build and deploy a complete AI workflow from scratch.'}
                    </div>
                  </div>
                </div>

                {/* Footer CTAs */}
                <div className="p-5 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3">
                  <button
                    onClick={() => handleOpenCurriculum(p)}
                    className="px-4 py-2 text-xs font-bold text-slate-700 hover:text-slate-900 hover:bg-slate-200/70 rounded-xl transition-colors flex items-center gap-1.5"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-slate-500" />
                    <span>View Syllabus</span>
                  </button>

                  <button
                    onClick={() => handleSelectForEnquiry(p)}
                    className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl text-xs font-extrabold transition-colors shadow-sm flex items-center gap-1.5"
                  >
                    <span>Enquire for Cohort</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 5-Step Learning Roadmap / Pedagogy */}
      <section id="pedagogy" className="bg-[#111927] text-white py-20 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
            <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">How You Learn</div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              The 5-Step Engineering Pedagogy
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              We eliminated passive lecture videos. Every hour you spend is dedicated to practical problem solving, building code, and refining production workflows.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {roadmapSteps.map((s, idx) => (
              <div
                key={idx}
                className="bg-slate-900/90 border border-slate-800 p-6 rounded-2xl space-y-3 relative flex flex-col justify-between"
              >
                <div>
                  <div className="text-2xl font-black text-amber-400 font-mono">{s.step}</div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1">
                    {s.duration}
                  </div>
                  <h3 className="text-base font-bold text-white mt-2 leading-snug">{s.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed mt-2">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Admissions Enquiry Form */}
      <section id="admissions-enquiry" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl p-8 sm:p-12">
          <div className="max-w-2xl mx-auto text-center space-y-3 mb-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold border border-amber-200">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Cohort Admissions Desk</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Apply or Request Cohort Syllabus
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Submit your enquiry to receive complete week-by-week module breakdowns, schedule details, and scholarship evaluation.
            </p>
          </div>

          {enquirySuccess && (
            <div className="p-6 bg-emerald-50 border border-emerald-300 rounded-2xl mb-8 flex items-start gap-4">
              <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <div className="font-bold text-emerald-900 text-sm">Application Received</div>
                <div className="text-xs text-emerald-700 leading-relaxed">{enquirySuccess}</div>
              </div>
            </div>
          )}

          {enquiryError && (
            <div className="p-5 bg-rose-50 border border-rose-300 rounded-2xl mb-8 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <div className="font-bold text-rose-900 text-xs">Submission Notice</div>
                <div className="text-xs text-rose-700 leading-relaxed">{enquiryError}</div>
              </div>
            </div>
          )}

          <form onSubmit={handleEnquirySubmit} className="space-y-5 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Priyanshu Singh"
                  value={enquiryForm.fullName}
                  onChange={(e) => setEnquiryForm({ ...enquiryForm, fullName: e.target.value })}
                  className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium text-slate-800"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="you@domain.com"
                  value={enquiryForm.email}
                  onChange={(e) => setEnquiryForm({ ...enquiryForm, email: e.target.value })}
                  className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium text-slate-800"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Phone / WhatsApp Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={enquiryForm.phone}
                  onChange={(e) => setEnquiryForm({ ...enquiryForm, phone: e.target.value })}
                  className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium text-slate-800"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Current Background</label>
                <select
                  value={enquiryForm.educationOrProfession}
                  onChange={(e) => setEnquiryForm({ ...enquiryForm, educationOrProfession: e.target.value })}
                  className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 font-semibold text-slate-800"
                >
                  <option value="College Student">College Student (Final / Pre-final Year)</option>
                  <option value="Working Professional">Software Engineer / Developer</option>
                  <option value="Product Manager">Product Manager / Founder</option>
                  <option value="Designer / Marketer">Designer / Marketer</option>
                  <option value="Other">Other Background</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Programme of Interest *</label>
              <select
                value={enquiryForm.programmeInterested}
                onChange={(e) => setEnquiryForm({ ...enquiryForm, programmeInterested: e.target.value })}
                className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 font-semibold text-slate-800"
              >
                {programmes.map((p) => (
                  <option key={p.title} value={p.title}>
                    {p.title} ({p.duration})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Your Primary Learning Goal or Questions
              </label>
              <textarea
                rows={3}
                placeholder="What project are you hoping to build or which role are you targeting?"
                value={enquiryForm.learningObjective}
                onChange={(e) => setEnquiryForm({ ...enquiryForm, learningObjective: e.target.value })}
                className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium text-slate-800"
              />
            </div>

            <button
              type="submit"
              disabled={enquiryLoading}
              className="w-full py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {enquiryLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Submitting Application...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Submit Application & Download Syllabus</span>
                </>
              )}
            </button>
          </form>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section id="faqs" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="text-center space-y-2 mb-12">
          <div className="text-xs font-bold text-amber-600 uppercase tracking-wider">Got Questions?</div>
          <h2 className="text-3xl font-extrabold text-slate-900">Frequently Asked Questions</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {faqs.map((f, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 space-y-2">
              <h3 className="font-bold text-slate-900 text-sm flex items-start gap-2">
                <HelpCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>{f.q}</span>
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed pl-6">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Curriculum Modal */}
      {curriculumModalOpen && selectedProgramme && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fade-in overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-slate-100 flex items-start justify-between z-10">
              <div>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 uppercase">
                  {selectedProgramme.category}
                </span>
                <h2 className="text-xl font-bold text-slate-900 leading-snug mt-1">
                  {selectedProgramme.title}
                </h2>
              </div>
              <button
                onClick={() => setCurriculumModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1.5 rounded-xl hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6 text-xs">
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {selectedProgramme.tagline}
              </p>

              {/* Metadata */}
              <div className="grid grid-cols-3 gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100 text-center">
                <div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase">Duration</div>
                  <div className="font-extrabold text-slate-900 text-sm mt-0.5">{selectedProgramme.duration}</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase">Tuition</div>
                  <div className="font-extrabold text-amber-700 text-sm mt-0.5">{selectedProgramme.fee || '₹19,999'}</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase">Next Cohort</div>
                  <div className="font-extrabold text-slate-900 text-sm mt-0.5">{selectedProgramme.cohortStart}</div>
                </div>
              </div>

              {/* Capstone Project Details */}
              <div className="p-4 bg-amber-50/80 rounded-2xl border border-amber-200 space-y-2">
                <div className="font-bold text-amber-900 text-xs flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-amber-700" />
                  <span>Capstone Project: {selectedProgramme.capstoneProject?.title}</span>
                </div>
                <p className="text-[11px] text-slate-700 leading-relaxed">
                  {selectedProgramme.capstoneProject?.description}
                </p>
                {selectedProgramme.capstoneProject?.deliverables && (
                  <ul className="space-y-1 pt-1 list-disc pl-4 text-[11px] text-slate-600">
                    {selectedProgramme.capstoneProject.deliverables.map((d, dIdx) => (
                      <li key={dIdx}>{d}</li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Week-by-Week Modules */}
              <div className="space-y-3">
                <div className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-amber-600" />
                  <span>Week-by-Week Module Breakdown</span>
                </div>

                <div className="space-y-3">
                  {(selectedProgramme.modules || []).map((mod, idx) => (
                    <div key={idx} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
                      <div className="font-bold text-slate-900 text-xs flex items-center justify-between">
                        <span>
                          <span className="text-amber-700 mr-2">{mod.week}:</span>
                          {mod.title}
                        </span>
                      </div>
                      <ul className="space-y-1 pl-4 text-slate-600 list-disc text-[11px]">
                        {(mod.topics || []).map((topic, tIdx) => (
                          <li key={tIdx}>{topic}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-white/95 backdrop-blur-md px-6 py-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-500">Live mentor feedback & verified credential.</span>
              <button
                onClick={() => {
                  setCurriculumModalOpen(false);
                  handleSelectForEnquiry(selectedProgramme);
                }}
                className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl text-xs font-extrabold transition-colors shadow-sm flex items-center gap-1.5"
              >
                <span>Apply for this Cohort</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
