import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2, Sparkles, ShieldCheck } from 'lucide-react';
import { SkillSpringService } from '../../services/api';
import { useNotification } from '../../context/NotificationContext';

export default function EnquiryForm({ preselectedProgramme }) {
  const { addNotification } = useNotification();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    educationOrProfession: 'Working Professional',
    programmeInterested: preselectedProgramme?.title || 'Generative AI Fundamentals & Practical Prompting',
    learningObjective: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Update programme if prop changes
  React.useEffect(() => {
    if (preselectedProgramme) {
      setFormData(prev => ({
        ...prev,
        programmeInterested: preselectedProgramme.title,
      }));
    }
  }, [preselectedProgramme]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError('');
    if (successMessage) setSuccessMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side validations
    if (!formData.fullName.trim() || !formData.email.trim() || !formData.phone.trim() || !formData.learningObjective.trim()) {
      setError('Please complete all required fields.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setError('Please enter a valid email address.');
      return;
    }

    if (formData.phone.trim().length < 8) {
      setError('Please provide a valid contact telephone number.');
      return;
    }

    try {
      setLoading(true);
      setError('');
      setSuccessMessage('');
      const res = await SkillSpringService.submitEnquiry(formData);
      setSuccessMessage(res.message || 'Enquiry submitted successfully! Our admissions director will reach out within 24 hours.');
      addNotification('Enquiry received! Check your inbox for cohort syllabus details.', 'success');
      // Reset form fields
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        educationOrProfession: 'Working Professional',
        programmeInterested: formData.programmeInterested,
        learningObjective: '',
      });
    } catch (err) {
      setError(err.message || 'Failed to submit enquiry. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="enquire-section" className="py-20 bg-slate-900 text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-slate-950/80 border border-slate-800 rounded-3xl p-8 sm:p-12 shadow-2xl backdrop-blur-xl">
          <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-semibold border border-indigo-500/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Admissions & Cohort Counseling</span>
            </div>
            <h2 className="text-3xl font-extrabold text-white">
              Enquire About Upcoming Cohorts
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Fill out this application form to receive detailed module syllabi, project breakdowns, and scholarship eligibility.
            </p>
          </div>

          {successMessage && (
            <div className="p-6 bg-emerald-950/60 border border-emerald-500/40 rounded-2xl mb-8 flex items-start gap-4 animate-fade-in">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <div className="font-bold text-white text-sm">Enquiry Registered Successfully</div>
                <div className="text-xs text-emerald-300 leading-relaxed">{successMessage}</div>
              </div>
            </div>
          )}

          {error && (
            <div className="p-4 bg-rose-950/60 border border-rose-500/40 rounded-2xl mb-8 flex items-center gap-3 animate-fade-in">
              <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
              <div className="text-xs text-rose-300 font-medium">{error}</div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block font-bold text-slate-300 mb-1.5">
                  Full Name <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="e.g. Aditi Rao"
                  className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1.5">
                  Email Address <span className="text-rose-400">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="aditi@example.com"
                  className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block font-bold text-slate-300 mb-1.5">
                  Phone Number <span className="text-rose-400">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 98200 12345"
                  className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1.5">
                  Current Education or Profession
                </label>
                <select
                  name="educationOrProfession"
                  value={formData.educationOrProfession}
                  onChange={handleChange}
                  className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/40 cursor-pointer"
                >
                  <option value="Working Professional">Working Professional (Tech / Product)</option>
                  <option value="Business Leader / Founder">Business Leader / Founder</option>
                  <option value="Final Year Student">College / University Student</option>
                  <option value="Career Switcher">Career Transitioner to AI</option>
                  <option value="Agency / Freelance Creator">Agency / Freelance Specialist</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-300 mb-1.5">
                Interested Programme <span className="text-rose-400">*</span>
              </label>
              <select
                name="programmeInterested"
                value={formData.programmeInterested}
                onChange={handleChange}
                className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/40 cursor-pointer"
              >
                <option value="Generative AI Fundamentals & Practical Prompting">
                  Generative AI Fundamentals & Practical Prompting (6 Weeks)
                </option>
                <option value="AI Automation & Workflow Engineering (n8n & Autonomous Agents)">
                  AI Automation & Workflow Engineering with n8n (8 Weeks)
                </option>
                <option value="AI for Product Managers & Business Leaders">
                  AI for Product Managers & Business Leaders (6 Weeks)
                </option>
                <option value="Full-Stack AI Application Development">
                  Full-Stack AI Application Development (10 Weeks)
                </option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-300 mb-1.5">
                Your Primary Learning Objective <span className="text-rose-400">*</span>
              </label>
              <textarea
                name="learningObjective"
                rows={3}
                value={formData.learningObjective}
                onChange={handleChange}
                placeholder="What specific AI workflow, product feature, or career goal are you aiming to achieve?"
                className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                required
              />
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-slate-400 text-[11px]">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Zero spam guarantee. Handled directly by admissions advisors.</span>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto px-8 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 active:scale-95 text-xs"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Transmitting...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Programme Enquiry</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

