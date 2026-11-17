import React, { useState, useEffect } from 'react';
import Hero from '../../components/skillspring/Hero';
import ProgrammeCard from '../../components/skillspring/ProgrammeCard';
import CurriculumModal from '../../components/skillspring/CurriculumModal';
import EnquiryForm from '../../components/skillspring/EnquiryForm';
import LearningJourney from '../../components/skillspring/LearningJourney';
import WhyUs from '../../components/skillspring/WhyUs';
import TestimonialsAndFaq from '../../components/skillspring/TestimonialsAndFaq';
import { SkillSpringService } from '../../services/api';
import { Loader2, AlertCircle } from 'lucide-react';

export default function SkillSpringHome() {
  const [programmes, setProgrammes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedProgramme, setSelectedProgramme] = useState(null);
  const [curriculumModalOpen, setCurriculumModalOpen] = useState(false);
  const [enquiryProgramme, setEnquiryProgramme] = useState(null);

  useEffect(() => {
    async function loadProgrammes() {
      try {
        setLoading(true);
        const res = await SkillSpringService.getProgrammes();
        setProgrammes(res.data || []);
      } catch (err) {
        setError(err.message || 'Failed to load courses.');
      } finally {
        setLoading(false);
      }
    }
    loadProgrammes();
  }, []);

  const handleEnquireClick = (programme) => {
    if (programme) {
      setEnquiryProgramme(programme);
    }
    const el = document.getElementById('enquire-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleExploreClick = () => {
    const el = document.getElementById('programmes-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleViewCurriculum = (programme) => {
    setSelectedProgramme(programme);
    setCurriculumModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-indigo-500 selection:text-white">
      {/* Hero Section */}
      <Hero
        onEnquireClick={() => handleEnquireClick(null)}
        onExploreClick={handleExploreClick}
      />

      {/* Programme Discovery Section */}
      <section id="programmes-section" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
          <div className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
            Hands-On Cohorts
          </div>
          <h2 className="text-3xl font-extrabold text-white">
            Practical AI & Digital Skills Programmes
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Carefully structured sample programme offerings. Built for builders, product leaders, and ambitious professionals.
          </p>
        </div>

        {loading && (
          <div className="py-20 text-center">
            <Loader2 className="w-8 h-8 animate-spin text-indigo-400 mx-auto" />
            <p className="text-xs text-slate-400 mt-2">Loading AI curriculum paths...</p>
          </div>
        )}

        {error && (
          <div className="p-4 bg-rose-950/60 border border-rose-500/40 rounded-2xl flex items-center gap-3 max-w-md mx-auto">
            <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
            <div className="text-xs text-rose-300">{error}</div>
          </div>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {programmes.map((prog) => (
              <ProgrammeCard
                key={prog.id || prog.slug}
                programme={prog}
                onViewCurriculum={handleViewCurriculum}
                onEnquireForProgramme={handleEnquireClick}
              />
            ))}
          </div>
        )}
      </section>

      {/* Why Choose SkillSpring AI */}
      <WhyUs />

      {/* Learning Journey (5 Steps) */}
      <LearningJourney />

      {/* Functional Lead Enquiry Form */}
      <EnquiryForm preselectedProgramme={enquiryProgramme} />

      {/* Testimonials & FAQs */}
      <TestimonialsAndFaq onEnquireClick={() => handleEnquireClick(null)} />

      {/* Curriculum Modal */}
      <CurriculumModal
        programme={selectedProgramme}
        isOpen={curriculumModalOpen}
        onClose={() => setCurriculumModalOpen(false)}
        onEnquire={handleEnquireClick}
      />
    </div>
  );
}

