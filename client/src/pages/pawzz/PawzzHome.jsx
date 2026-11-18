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
  Users,
  Compass,
  Phone,
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
      image: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&w=600&q=80',
      description: 'Routine consultations, vaccinations, parasite control, and preventive diagnostics.',
      badge: 'Clinics',
      count: '350+ Listings',
    },
    {
      name: 'Animal Hospitals',
      slug: 'Veterinary Hospitals',
      icon: Building2,
      image: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&w=600&q=80',
      description: 'Multi-specialty surgical centers with 24/7 emergency ICUs and oxygen chambers.',
      badge: '24/7 Emergency',
      count: '120+ Hospitals',
    },
    {
      name: 'Pet Boarding & Daycare',
      slug: 'Pet Boarding',
      icon: Home,
      image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=600&q=80',
      description: 'Cage-free climate-controlled boarding suites and medical convalescence.',
      badge: 'Care & Stay',
      count: '180+ Spaces',
    },
    {
      name: 'Diagnostic Centres',
      slug: 'Diagnostics',
      icon: Activity,
      image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=600&q=80',
      description: 'Pathology lab bloodwork, ultrasound scans, digital X-rays, and allergy panels.',
      badge: 'Labs & Imaging',
      count: '95+ Labs',
    },
    {
      name: 'Animal Ambulances',
      slug: 'Animal Ambulance',
      icon: Truck,
      image: 'https://images.unsplash.com/photo-1587764379873-97837921fd44?auto=format&fit=crop&w=600&q=80',
      description: 'Rapid rescue and transit ambulances equipped with emergency medical staff.',
      badge: 'Rapid Response',
      count: '45+ Ambulances',
    },
    {
      name: 'Animal Welfare NGOs',
      slug: 'Animal NGOs',
      icon: Heart,
      image: 'https://images.unsplash.com/photo-1535930891776-0c2dfb7fda1a?auto=format&fit=crop&w=600&q=80',
      description: 'Community shelters, rescue squads, adoption drives, and subsidized ABC surgeries.',
      badge: 'Rescue & Care',
      count: '110+ Shelters',
    },
  ];

  useEffect(() => {
    async function fetchFeatured() {
      try {
        setLoading(true);
        const res = await ProviderService.getAll({ limit: 6 });
        const list = res.data || [];
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

  return (
    <div className="min-h-screen bg-[#fcfbfa] text-slate-900 font-sans selection:bg-emerald-600 selection:text-white">
      {/* Hero Section: Two-Column Top Tier Startup Layout */}
      <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50/70 via-white to-[#fcfbfa] pt-12 pb-20 border-b border-emerald-100/60">
        <div className="absolute top-0 right-0 -mt-24 -mr-24 w-[600px] h-[600px] bg-emerald-200/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-[500px] h-[500px] bg-teal-200/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/90 text-emerald-900 text-xs font-bold shadow-xs">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span>Practo for Animals • 100% Verified Care Network</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
                Exceptional Healthcare for <span className="text-emerald-700">Every Paw</span>.
              </h1>

              <p className="text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed">
                Connect with audited veterinary clinics, 24/7 round-the-clock intensive care hospitals, diagnostic pathology labs, and emergency pet ambulances in seconds.
              </p>

              {/* Elevated Floating Search Box */}
              <form
                onSubmit={handleSearchSubmit}
                className="bg-white p-3.5 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-200 flex flex-col md:flex-row gap-2.5 text-left"
              >
                {/* Location Select */}
                <div className="flex items-center gap-2.5 px-3.5 py-2.5 bg-slate-50/80 rounded-2xl md:w-44 border border-slate-100">
                  <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                  <div className="flex-1">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">City</div>
                    <select
                      value={selectedCity}
                      onChange={(e) => setSelectedCity(e.target.value)}
                      className="bg-transparent text-xs font-bold text-slate-800 w-full focus:outline-none cursor-pointer"
                    >
                      {cities.map((city) => (
                        <option key={city} value={city}>
                          {city === 'All' ? 'All Cities' : city}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Service Category Select */}
                <div className="flex items-center gap-2.5 px-3.5 py-2.5 bg-slate-50/80 rounded-2xl md:w-52 border border-slate-100">
                  <Stethoscope className="w-4 h-4 text-emerald-600 shrink-0" />
                  <div className="flex-1">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Department</div>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="bg-transparent text-xs font-bold text-slate-800 w-full focus:outline-none cursor-pointer"
                    >
                      <option value="All">All Departments</option>
                      {categories.map((c) => (
                        <option key={c.name} value={c.slug}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Keyword Search Input */}
                <div className="flex items-center gap-2.5 px-3.5 py-2.5 bg-slate-50/80 rounded-2xl flex-1 border border-slate-100">
                  <Search className="w-4 h-4 text-slate-400 shrink-0" />
                  <div className="flex-1">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Keywords</div>
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Doctor, surgery, ambulance, ultrasound..."
                      className="w-full bg-transparent text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Search Button */}
                <button
                  type="submit"
                  className="px-6 py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-2xl font-extrabold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer"
                >
                  <Search className="w-4 h-4" />
                  <span>Find Care</span>
                </button>
              </form>

              {/* Quick Tags */}
              <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                <span className="text-slate-400 font-bold uppercase text-[10px] tracking-wider">Quick Triage:</span>
                {[
                  '24/7 Emergency',
                  'Dog Vaccination',
                  'Cat Specialist',
                  'Veterinary Ambulance',
                  'Pet Boarding',
                ].map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => handleQuickTagClick(tag)}
                    className="px-3 py-1 rounded-full bg-white hover:bg-emerald-50 border border-slate-200 text-slate-700 hover:text-emerald-800 font-semibold transition-colors text-[11px] shadow-2xs"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Right Photographic Visual Column */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.12)] border-4 border-white">
                <img
                  src="https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&w=1000&q=80"
                  alt="Veterinarian examining dog"
                  className="w-full h-[460px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />

                {/* Floating Stat Card 1 (Top Left) */}
                <div className="absolute top-4 left-4 p-3 bg-white/95 backdrop-blur-md rounded-2xl shadow-lg border border-white/50 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-600 animate-pulse" />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Emergency Care</div>
                    <div className="font-extrabold text-slate-900 text-xs">24/7 ICU Facilities Active</div>
                  </div>
                </div>

                {/* Floating Stat Card 2 (Bottom) */}
                <div className="absolute bottom-4 left-4 right-4 p-4 bg-white/95 backdrop-blur-md rounded-2xl shadow-lg border border-white/50 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-extrabold">
                      <ShieldCheck className="w-5 h-5 text-emerald-700" />
                    </div>
                    <div>
                      <div className="font-extrabold text-slate-900 text-xs">100% Council Verified</div>
                      <div className="text-[11px] text-slate-500">Every practitioner audited</div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="flex items-center gap-1 text-amber-500 font-extrabold text-xs">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span>4.9 / 5.0</span>
                    </div>
                    <div className="text-[10px] text-slate-400">12,000+ Reviews</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6 Category Services Grid with Photography */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <div className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Comprehensive Animal Care</div>
            <h2 className="text-3xl font-extrabold text-slate-900 mt-1">
              Explore Healthcare Departments
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Select a clinical department to view verified providers, facility amenities, and consultation fees.
            </p>
          </div>
          <Link
            to="/pawzz/search"
            className="text-xs font-bold text-emerald-700 hover:text-emerald-900 inline-flex items-center gap-1.5 hover:underline"
          >
            <span>View All Provider Listings</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat) => (
            <div
              key={cat.name}
              onClick={() => handleCategoryClick(cat.slug)}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] hover:border-emerald-300 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <span className="absolute top-3 right-3 text-[10px] font-extrabold px-3 py-1 rounded-full bg-white/95 text-slate-900 shadow-xs">
                  {cat.badge}
                </span>
                <div className="absolute bottom-3 left-4 text-white">
                  <h3 className="text-lg font-extrabold leading-snug drop-shadow-xs">
                    {cat.name}
                  </h3>
                </div>
              </div>

              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <p className="text-xs text-slate-600 leading-relaxed">
                  {cat.description}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-xs">
                  <span className="font-bold text-slate-400">{cat.count}</span>
                  <div className="flex items-center gap-1 font-bold text-emerald-700 group-hover:translate-x-1 transition-transform">
                    <span>Find Facilities</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Emergency Care Callout Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="bg-gradient-to-r from-rose-950 via-rose-900 to-slate-950 rounded-3xl p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/30 text-rose-200 text-xs font-bold border border-rose-400/30">
                <AlertCircle className="w-4 h-4 text-rose-300" />
                <span>Critical Response Network</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Animal Medical Emergency? Every Minute Matters.
              </h2>
              <p className="text-sm text-rose-100/90 max-w-2xl leading-relaxed">
                Connect immediately with 24/7 round-the-clock emergency ICUs, veterinary surgeons on call, and rapid-dispatch animal ambulances across your city.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end">
              <Link
                to="/pawzz/search?emergency=true"
                className="px-6 py-4 rounded-2xl bg-white hover:bg-rose-50 text-rose-900 font-extrabold text-sm shadow-md transition-colors text-center flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-4 h-4 text-rose-700" />
                <span>Find 24/7 ICU Hospitals</span>
              </Link>
              <a
                href="tel:+919876543210"
                className="px-6 py-4 rounded-2xl bg-rose-700 hover:bg-rose-600 text-white font-extrabold text-sm border border-rose-500 transition-colors text-center flex items-center justify-center gap-2"
              >
                <span>Call Dispatch: +91 98765 43210</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Featured / Top Rated Providers */}
      <section className="bg-white border-y border-slate-200/80 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <div className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Top Rated Care</div>
              <h2 className="text-3xl font-extrabold text-slate-900 mt-1">
                Featured Healthcare Providers
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                Audited facilities with verified medical credentials, clear consultation charges, and top patient satisfaction scores.
              </p>
            </div>

            <Link
              to="/pawzz/search"
              className="text-xs font-bold text-emerald-700 hover:text-emerald-900 inline-flex items-center gap-1.5 hover:underline"
            >
              <span>Explore All in Search Directory</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((n) => (
                <div key={n} className="bg-slate-50 h-80 rounded-3xl animate-pulse border border-slate-200" />
              ))}
            </div>
          ) : error ? (
            <div className="p-6 bg-rose-50 rounded-2xl border border-rose-200 text-rose-800 text-xs">
              {error}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProviders.map((provider) => (
                <ProviderCard
                  key={provider._id || provider.id}
                  provider={provider}
                  onViewDetails={(p) => {
                    setSelectedProvider(p);
                    setDetailModalOpen(true);
                  }}
                  onOpenCorrection={(p) => {
                    setCorrectionTarget(p);
                    setCorrectionModalOpen(true);
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Pawzz (Pet Parents Section) */}
      <section id="pet-parents" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
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
              <div key={idx} className="bg-white p-7 rounded-3xl border border-slate-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100/70 text-emerald-800 flex items-center justify-center font-bold">
                  <Icon className="w-6 h-6 text-emerald-700" />
                </div>
                <h3 className="font-bold text-slate-900 text-base">{item.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* For Veterinary Professionals (B2B Section) */}
      <section id="veterinary-professionals" className="bg-emerald-950 text-white py-18">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-900 text-emerald-300 text-xs font-semibold border border-emerald-800">
                <Building2 className="w-3.5 h-3.5" />
                <span>For Veterinary Clinics, Hospitals, Boarders & NGOs</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                List Your Practice on India's Dedicated Animal Care Network
              </h2>
              <p className="text-sm text-emerald-200 max-w-2xl leading-relaxed">
                Connect directly with pet parents seeking your medical expertise, diagnostic equipment, or boarding amenities. Benefit from verified badges and direct inquiries.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 text-xs">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Free verified directory profile</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Direct emergency calls</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Real-time profile updates</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-3">
              <button
                onClick={() => setRegisterModalOpen(true)}
                className="w-full px-6 py-4 rounded-2xl bg-white hover:bg-emerald-50 text-emerald-950 font-extrabold text-sm shadow-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <PlusCircle className="w-4 h-4 text-emerald-700" />
                <span>List Your Business Now</span>
              </button>
              <p className="text-[11px] text-emerald-400 text-center">
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
            setCorrectionTarget(p);
            setCorrectionModalOpen(true);
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
