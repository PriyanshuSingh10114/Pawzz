import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Search,
  MapPin,
  Stethoscope,
  Building2,
  Home,
  Activity,
  Truck,
  Heart,
  ShieldCheck,
  Clock,
  Star,
  PhoneCall,
  PlusCircle,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  Sparkles,
  HelpCircle,
  Users,
} from 'lucide-react';
import ProviderCard from '../../components/pawnexus/ProviderCard';
import ProviderDetailModal from '../../components/pawnexus/ProviderDetailModal';
import RegisterProviderModal from '../../components/pawnexus/RegisterProviderModal';
import SubmitCorrectionModal from '../../components/pawnexus/SubmitCorrectionModal';
import { ProviderService } from '../../services/api';

export default function PawzzHome() {
  const navigate = useNavigate();

  // Search state
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Provider data state
  const [featuredProviders, setFeaturedProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Modals
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [correctionModalOpen, setCorrectionModalOpen] = useState(false);
  const [correctionTarget, setCorrectionTarget] = useState(null);

  const cities = ['All', 'Bengaluru', 'Mumbai', 'Delhi NCR', 'Pune', 'Hyderabad', 'Chennai'];

  const categories = [
    {
      name: 'Veterinary Clinics',
      slug: 'Veterinary Clinics',
      icon: Stethoscope,
      description: 'Routine checkups, vaccinations, parasite control, and general outpatient treatment.',
      badge: 'Clinics',
      count: '350+ Listings',
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    },
    {
      name: 'Animal Hospitals',
      slug: 'Veterinary Hospitals',
      icon: Building2,
      description: 'Full-service multi-specialty hospitals with 24/7 emergency ICUs and surgical wards.',
      badge: '24/7 Emergency',
      count: '120+ Hospitals',
      color: 'bg-teal-50 text-teal-700 border-teal-200',
    },
    {
      name: 'Pet Boarding',
      slug: 'Pet Boarding',
      icon: Home,
      description: 'Safe, hygienic cage-free boarding, day-care, and medical convalescence for pets.',
      badge: 'Care & Stay',
      count: '180+ Spaces',
      color: 'bg-amber-50 text-amber-700 border-amber-200',
    },
    {
      name: 'Diagnostic Centres',
      slug: 'Diagnostics',
      icon: Activity,
      description: 'Veterinary pathology, bloodwork, ultrasound, digital X-rays, and specialized imaging.',
      badge: 'Labs & Imaging',
      count: '95+ Labs',
      color: 'bg-blue-50 text-blue-700 border-blue-200',
    },
    {
      name: 'Animal Ambulances',
      slug: 'Animal Ambulance',
      icon: Truck,
      description: 'Oxygen-equipped rapid rescue and transit ambulances for critical pet emergencies.',
      badge: 'Rapid Response',
      count: '45+ Ambulances',
      color: 'bg-rose-50 text-rose-700 border-rose-200',
    },
    {
      name: 'Animal Welfare NGOs',
      slug: 'Animal NGOs',
      icon: Heart,
      description: 'Community shelters, stray rescue teams, subsidized ABC surgeries, and adoption drives.',
      badge: 'Rescue & Care',
      count: '110+ Shelters',
      color: 'bg-purple-50 text-purple-700 border-purple-200',
    },
  ];

  useEffect(() => {
    async function fetchFeatured() {
      try {
        setLoading(true);
        const res = await ProviderService.getAll({ limit: 6 });
        const list = res.data || [];
        // Sort by highest rating first
        list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        setFeaturedProviders(list.slice(0, 3));
      } catch (err) {
        setError(err.message || 'Failed to load featured providers.');
      } finally {
        setLoading(false);
      }
    }
    fetchFeatured();
  }, []);

  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    const params = new URLSearchParams();
    if (searchTerm.trim()) params.append('q', searchTerm.trim());
    if (selectedCity && selectedCity !== 'All') params.append('city', selectedCity);
    if (selectedCategory && selectedCategory !== 'All') params.append('category', selectedCategory);
    navigate(`/pawzz/search?${params.toString()}`);
  };

  const handleCategoryClick = (categorySlug) => {
    navigate(`/pawzz/search?category=${encodeURIComponent(categorySlug)}`);
  };

  const handleQuickTagClick = (tag) => {
    if (tag === '24/7 Emergency') {
      navigate('/pawzz/search?emergency=true');
    } else {
      navigate(`/pawzz/search?q=${encodeURIComponent(tag)}`);
    }
  };

  const handleOpenDetail = (provider) => {
    setSelectedProvider(provider);
    setDetailModalOpen(true);
  };

  const handleOpenCorrection = (provider) => {
    setCorrectionTarget(provider);
    setCorrectionModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#fafaf8] text-slate-900 font-sans selection:bg-emerald-600 selection:text-white">
      {/* Top Banner Navigation Header */}
      <div className="bg-white border-b border-slate-200 sticky top-16 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between text-xs">
          <div className="flex items-center gap-6">
            <span className="font-bold text-emerald-800 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Verified Animal Healthcare Network
            </span>
            <div className="hidden md:flex items-center gap-4 text-slate-600">
              <Link to="/pawzz/search" className="hover:text-emerald-700 transition-colors">
                All Verified Providers
              </Link>
              <Link to="/pawzz/search?emergency=true" className="hover:text-rose-600 transition-colors font-medium">
                24/7 Emergency Directory
              </Link>
              <a href="#pet-parents" className="hover:text-emerald-700 transition-colors">
                Why Pawzz
              </a>
              <a href="#veterinary-professionals" className="hover:text-emerald-700 transition-colors">
                For Clinics & NGOs
              </a>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setRegisterModalOpen(true)}
              className="text-emerald-700 hover:text-emerald-900 font-bold hover:underline"
            >
              List Your Facility
            </button>
            <span className="text-slate-300">|</span>
            <Link
              to="/pawzz/search?emergency=true"
              className="px-2.5 py-1 rounded-md bg-rose-50 text-rose-700 border border-rose-200 font-bold hover:bg-rose-100 transition-colors flex items-center gap-1"
            >
              <PhoneCall className="w-3 h-3" />
              Emergency Helpline
            </Link>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50/80 via-white to-[#fafaf8] pt-14 pb-20 border-b border-emerald-100/60">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-[500px] h-[500px] bg-emerald-200/25 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-96 h-96 bg-teal-200/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/90 text-emerald-800 text-xs font-bold shadow-xs">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Practo for Animals • 100% Verified Care Network</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
              Trusted Care for <span className="text-emerald-700 underline decoration-emerald-300 decoration-wavy decoration-2">Every Paw</span>.
            </h1>

            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Find verified veterinary clinics, 24/7 animal hospitals, diagnostic pathology centres, pet boarding, and emergency ambulances near you.
            </p>

            {/* Direct Healthcare Search Box */}
            <form
              onSubmit={handleSearchSubmit}
              className="bg-white p-3 sm:p-4 rounded-2xl shadow-xl border border-slate-200 flex flex-col md:flex-row gap-3 text-left mt-8"
            >
              {/* Location Select */}
              <div className="flex items-center gap-2 px-3.5 py-2.5 bg-slate-50 rounded-xl md:w-48 border border-slate-100">
                <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                <div className="flex-1">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">City</div>
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="bg-transparent text-xs font-semibold text-slate-800 w-full focus:outline-none cursor-pointer"
                  >
                    {cities.map((city) => (
                      <option key={city} value={city}>
                        {city === 'All' ? 'All Cities' : city}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Category Select */}
              <div className="flex items-center gap-2 px-3.5 py-2.5 bg-slate-50 rounded-xl md:w-56 border border-slate-100">
                <Stethoscope className="w-4 h-4 text-emerald-600 shrink-0" />
                <div className="flex-1">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Service Type</div>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="bg-transparent text-xs font-semibold text-slate-800 w-full focus:outline-none cursor-pointer"
                  >
                    <option value="All">All Services</option>
                    {categories.map((c) => (
                      <option key={c.name} value={c.slug}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Keyword Query */}
              <div className="flex items-center gap-2 px-3.5 py-2.5 bg-slate-50 rounded-xl flex-1 border border-slate-100">
                <Search className="w-4 h-4 text-slate-400 shrink-0" />
                <div className="flex-1">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Search Keywords</div>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Clinic name, doctor, ultrasound, emergency..."
                    className="w-full bg-transparent text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none"
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="px-6 py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 shrink-0"
              >
                <Search className="w-4 h-4" />
                <span>Search Providers</span>
              </button>
            </form>

            {/* Quick Search Tags */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-xs">
              <span className="text-slate-400 font-semibold">Popular Searches:</span>
              {[
                '24/7 Emergency',
                'Dog Vaccination',
                'Cat Specialist',
                'Veterinary Ambulance',
                'Pet Boarding',
                'Ultrasound',
              ].map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => handleQuickTagClick(tag)}
                  className="px-3 py-1 rounded-full bg-white hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 text-slate-700 hover:text-emerald-800 font-medium transition-colors text-[11px]"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6 Category Services Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Comprehensive Animal Care</div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              Explore Healthcare Services
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Select a specialized category to find verified providers and facilities nearest to you.
            </p>
          </div>
          <Link
            to="/pawzz/search"
            className="text-xs font-bold text-emerald-700 hover:text-emerald-900 inline-flex items-center gap-1 self-start sm:self-auto hover:underline"
          >
            <span>View All Provider Listings</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.name}
                onClick={() => handleCategoryClick(cat.slug)}
                className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${cat.color} group-hover:scale-105 transition-transform`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-md bg-slate-100 text-slate-600">
                      {cat.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mt-2">
                    {cat.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-5 mt-4 border-t border-slate-100 text-xs">
                  <span className="font-semibold text-slate-400">{cat.count}</span>
                  <div className="flex items-center gap-1 font-bold text-emerald-700 group-hover:translate-x-1 transition-transform">
                    <span>Find Providers</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Emergency Care Callout Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-gradient-to-r from-rose-900 via-rose-800 to-slate-900 rounded-3xl p-8 sm:p-10 text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/30 text-rose-200 text-xs font-bold border border-rose-400/30">
                <AlertCircle className="w-4 h-4 text-rose-300" />
                <span>Critical Response Network</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Animal Medical Emergency? Every Minute Matters.
              </h2>
              <p className="text-sm text-rose-100/90 max-w-2xl leading-relaxed">
                Connect immediately with 24/7 round-the-clock emergency ICUs, veterinary surgeons on call, and rapid-dispatch animal ambulances across your city.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end">
              <Link
                to="/pawzz/search?emergency=true"
                className="px-6 py-3.5 rounded-xl bg-white hover:bg-rose-50 text-rose-900 font-extrabold text-xs sm:text-sm shadow-md transition-colors text-center flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-4 h-4 text-rose-700" />
                <span>Find 24/7 ICU Hospitals</span>
              </Link>
              <a
                href="tel:+919876543210"
                className="px-6 py-3.5 rounded-xl bg-rose-700 hover:bg-rose-600 text-white font-extrabold text-xs sm:text-sm border border-rose-500 transition-colors text-center flex items-center justify-center gap-2"
              >
                <span>Call Dispatch: +91 98765 43210</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Featured / Top Rated Providers */}
      <section className="bg-white border-y border-slate-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <div className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Top Rated Care</div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                Featured Healthcare Providers
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                Audited facilities with verified medical credentials and top patient satisfaction scores.
              </p>
            </div>

            <Link
              to="/pawzz/search"
              className="text-xs font-bold text-emerald-700 hover:text-emerald-900 inline-flex items-center gap-1 self-start sm:self-auto hover:underline"
            >
              <span>Explore All in Search Directory</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((n) => (
                <div key={n} className="bg-slate-50 h-72 rounded-2xl animate-pulse border border-slate-200" />
              ))}
            </div>
          ) : error ? (
            <div className="p-6 bg-rose-50 rounded-2xl border border-rose-200 text-rose-800 text-xs">
              {error}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProviders.map((provider) => (
                <ProviderCard
                  key={provider._id || provider.id}
                  provider={provider}
                  onViewDetails={handleOpenDetail}
                  onOpenCorrection={handleOpenCorrection}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Pawzz (Pet Parents Section) */}
      <section id="pet-parents" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
          <div className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Healthcare You Can Trust</div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Built for Pet Parents Who Demand Better Care
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Finding reliable veterinary healthcare shouldn't rely on outdated search listings, guesswork, or unverified phone numbers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: ShieldCheck,
              title: '100% Practitioner Audits',
              desc: 'Every listed clinic, hospital, and surgeon is cross-referenced with state veterinary council registrations.',
            },
            {
              icon: Clock,
              title: 'Real-time 24/7 ICU Availability',
              desc: 'Clearly distinguish between daytime routine clinics and genuine round-the-clock emergency trauma facilities.',
            },
            {
              icon: Star,
              title: 'Transparent Pricing & Fees',
              desc: 'Review consultation charges, emergency night tariffs, and diagnostic costs before scheduling your visit.',
            },
            {
              icon: Users,
              title: 'Community Corrections',
              desc: 'Active pet parents and rescuers update phone numbers, timings, and facility status in real time.',
            },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                  <Icon className="w-5 h-5 text-emerald-700" />
                </div>
                <h3 className="font-bold text-slate-900 text-base">{item.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* For Veterinary Professionals & Facility Owners (B2B Section) */}
      <section id="veterinary-professionals" className="bg-emerald-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/80 text-emerald-200 text-xs font-semibold border border-emerald-700">
                <Building2 className="w-3.5 h-3.5" />
                <span>For Veterinary Clinics, Hospitals, Boarders & NGOs</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                List Your Practice on India's Dedicated Animal Care Network
              </h2>
              <p className="text-sm text-emerald-100 max-w-2xl leading-relaxed">
                Connect directly with pet parents seeking your medical expertise, diagnostic equipment, or boarding amenities. Benefit from verified badges and direct inquiries.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 text-xs">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
                  <span>Free verified directory profile</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
                  <span>Direct emergency calls</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
                  <span>Real-time profile updates</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-3">
              <button
                onClick={() => setRegisterModalOpen(true)}
                className="w-full px-6 py-4 rounded-xl bg-white hover:bg-emerald-50 text-emerald-900 font-extrabold text-sm shadow-lg transition-colors flex items-center justify-center gap-2"
              >
                <PlusCircle className="w-4 h-4 text-emerald-700" />
                <span>List Your Business Now</span>
              </button>
              <p className="text-[11px] text-emerald-300 text-center">
                Audited & published within 24 hours of verification.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Modals */}
      {detailModalOpen && (
        <ProviderDetailModal
          provider={selectedProvider}
          onClose={() => setDetailModalOpen(false)}
          onOpenCorrection={(p) => {
            setDetailModalOpen(false);
            handleOpenCorrection(p);
          }}
        />
      )}

      {registerModalOpen && (
        <RegisterProviderModal
          onClose={() => setRegisterModalOpen(false)}
          onSuccess={() => {
            setRegisterModalOpen(false);
          }}
        />
      )}

      {correctionModalOpen && (
        <SubmitCorrectionModal
          provider={correctionTarget}
          onClose={() => setCorrectionModalOpen(false)}
        />
      )}
    </div>
  );
}
