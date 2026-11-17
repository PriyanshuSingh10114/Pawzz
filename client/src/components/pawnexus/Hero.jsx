import React from 'react';
import { Search, MapPin, Stethoscope, ShieldCheck, Heart, Clock } from 'lucide-react';

export default function Hero({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  selectedCity,
  setSelectedCity,
  onSearchSubmit,
}) {
  const cities = ['All', 'Mumbai', 'Bengaluru', 'Delhi NCR', 'Pune', 'Hyderabad'];
  const categories = [
    'All',
    'Veterinary Clinics',
    'Veterinary Hospitals',
    'Pet Boarding',
    'Diagnostics',
    'Animal Ambulance',
    'Animal NGOs',
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearchSubmit) onSearchSubmit();
    const el = document.getElementById('providers-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50/70 via-white to-slate-50 pt-12 pb-20 border-b border-emerald-100/60">
      {/* Subtle background glow */}
      <div className="absolute top-0 right-0 -mt-16 -mr-16 w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-80 h-80 bg-teal-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Headline & Search */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100/80 text-emerald-800 text-xs font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>India's Dedicated Animal Healthcare Network</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              Better Care for <span className="text-emerald-600 underline decoration-emerald-300 decoration-wavy decoration-2">Every Paw</span>.
            </h1>

            <p className="text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed">
              Find trusted veterinary clinics, 24/7 animal hospitals, diagnostics, and pet care facilities near you with verified reviews and direct emergency dispatch.
            </p>

            {/* Interactive Search Bar Form */}
            <form
              onSubmit={handleSubmit}
              className="bg-white p-3 rounded-2xl shadow-premium border border-slate-200/80 flex flex-col sm:flex-row gap-2 max-w-2xl"
            >
              {/* Location Select */}
              <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-xl sm:w-44 border border-slate-100">
                <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="bg-transparent text-xs font-semibold text-slate-700 w-full focus:outline-none cursor-pointer"
                >
                  {cities.map((city) => (
                    <option key={city} value={city}>
                      {city === 'All' ? 'All Cities' : city}
                    </option>
                  ))}
                </select>
              </div>

              {/* Service Select */}
              <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-xl sm:w-48 border border-slate-100">
                <Stethoscope className="w-4 h-4 text-emerald-600 shrink-0" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="bg-transparent text-xs font-semibold text-slate-700 w-full focus:outline-none cursor-pointer"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat === 'All' ? 'All Services' : cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Keyword Search Input */}
              <div className="flex-1 flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-xl border border-slate-100">
                <Search className="w-4 h-4 text-slate-400 shrink-0" />
                <input
                  type="text"
                  placeholder="Clinic name, ICU, ortho..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-transparent text-xs text-slate-800 placeholder-slate-400 w-full focus:outline-none font-medium"
                />
              </div>

              {/* Search Button */}
              <button
                type="submit"
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 shrink-0 active:scale-95"
              >
                <Search className="w-4 h-4" />
                <span>Search</span>
              </button>
            </form>

            {/* Quick Stats Badges */}
            <div className="flex flex-wrap items-center gap-6 pt-2 text-xs font-semibold text-slate-600">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span>12+ Verified Providers</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-teal-500" />
                <span>5 Major Metro Hubs</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
                <span className="text-rose-700">24/7 Emergency Dispatch</span>
              </div>
            </div>
          </div>

          {/* Supporting Visual / Emergency Card */}
          <div className="lg:col-span-5 relative">
            <div className="bg-white rounded-3xl p-6 shadow-2xl border border-slate-200/90 relative overflow-hidden">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                    <Heart className="w-6 h-6 fill-emerald-600" />
                  </div>
                  <div>
                    <h2 className="font-bold text-slate-900 text-sm">Emergency Animal Triage</h2>
                    <p className="text-xs text-slate-500">Need immediate veterinary help?</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 bg-rose-100 text-rose-700 rounded-full text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  24/7 Live
                </span>
              </div>

              <div className="mt-4 space-y-3">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="text-xs font-bold text-slate-800">Critical Pet Emergency Numbers</div>
                  <div className="mt-1 flex items-center justify-between text-xs text-slate-600">
                    <span>RapidPaw 24/7 Ambulance:</span>
                    <a href="tel:+919820044332" className="font-bold text-emerald-700 hover:underline">
                      +91 98200 44332
                    </a>
                  </div>
                  <div className="mt-1 flex items-center justify-between text-xs text-slate-600">
                    <span>Crown Vet Worli Trauma:</span>
                    <a href="tel:+919167122334" className="font-bold text-emerald-700 hover:underline">
                      +91 91671 22334
                    </a>
                  </div>
                </div>

                <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-100">
                  <div className="text-xs font-bold text-emerald-900">Why PawNexus?</div>
                  <p className="text-xs text-emerald-800 mt-1 leading-relaxed">
                    Zero paid ranking bias. Every listed facility displays transparent operating hours, real user reviews, surgical equipment, and verified licensing status.
                  </p>
                </div>
              </div>

              <div className="mt-5 flex gap-2">
                <a
                  href="#providers-section"
                  onClick={() => {
                    setSelectedCategory('Animal Ambulance');
                    const el = document.getElementById('providers-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full text-center py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors"
                >
                  Locate Nearest Ambulance
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
