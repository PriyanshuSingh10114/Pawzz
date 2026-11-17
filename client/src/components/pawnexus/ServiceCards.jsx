import React from 'react';
import {
  Stethoscope,
  Building2,
  Home,
  Activity,
  Ambulance,
  HeartHandshake,
  ArrowRight,
} from 'lucide-react';

const services = [
  {
    category: 'Veterinary Clinics',
    icon: Stethoscope,
    title: 'Veterinary Clinics',
    desc: 'Primary wellness exams, vaccinations, minor surgery, and routine health checks.',
    color: 'emerald',
    badge: '180+ Listed',
  },
  {
    category: 'Veterinary Hospitals',
    icon: Building2,
    title: 'Veterinary Hospitals',
    desc: '24/7 emergency ICUs, multi-specialty surgical suites, and in-patient hospitalization.',
    color: 'teal',
    badge: '24/7 Available',
  },
  {
    category: 'Pet Boarding',
    icon: Home,
    title: 'Pet Boarding & Daycare',
    desc: 'Cage-free luxury resorts, climate-controlled suites, CCTV streaming, and exercise meadows.',
    color: 'amber',
    badge: 'Verified Kennels',
  },
  {
    category: 'Diagnostics',
    icon: Activity,
    title: 'Diagnostic Centres',
    desc: 'Same-day hematology (CBC), biochemistry, digital X-Rays, ultrasound, and home blood collection.',
    color: 'indigo',
    badge: 'NABL Standards',
  },
  {
    category: 'Animal Ambulance',
    icon: Ambulance,
    title: 'Animal Ambulance',
    desc: 'Oxygen-equipped rapid emergency transit, heavy dog stretchers, and paramedic stabilization.',
    color: 'rose',
    badge: 'Emergency Hotline',
  },
  {
    category: 'Animal NGOs',
    icon: HeartHandshake,
    title: 'Animal Welfare NGOs',
    desc: 'Stray trauma rescues, community sterilization (ABC), indie adoptions, and rabies drives.',
    color: 'purple',
    badge: 'Non-Profit Care',
  },
];

export default function ServiceCards({ selectedCategory, setSelectedCategory }) {
  const handleSelect = (category) => {
    setSelectedCategory(category);
    const el = document.getElementById('providers-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="services-section" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
              Comprehensive Care Directory
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              Explore Animal Care Services
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Select a specialized category to filter verified facilities across major cities.
            </p>
          </div>
          {selectedCategory !== 'All' && (
            <button
              onClick={() => setSelectedCategory('All')}
              className="text-xs font-bold text-emerald-600 hover:text-emerald-700 underline underline-offset-4"
            >
              Reset Category Filter
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((item) => {
            const Icon = item.icon;
            const isSelected = selectedCategory === item.category;

            return (
              <div
                key={item.category}
                onClick={() => handleSelect(item.category)}
                className={`group relative p-6 rounded-2xl border transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-50/70 border-emerald-500 shadow-premium ring-2 ring-emerald-500/20'
                    : 'bg-slate-50/70 hover:bg-white border-slate-200 hover:border-slate-300 hover:shadow-card-hover'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                      isSelected
                        ? 'bg-emerald-600 text-white'
                        : 'bg-white text-emerald-700 shadow-sm border border-slate-200 group-hover:bg-emerald-600 group-hover:text-white'
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-slate-200/80 text-slate-700">
                    {item.badge}
                  </span>
                </div>

                <h3 className="font-bold text-slate-900 text-base mt-4 group-hover:text-emerald-700 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  {item.desc}
                </p>

                <div className="mt-4 pt-4 border-t border-slate-200/60 flex items-center justify-between text-xs font-semibold text-emerald-700">
                  <span>Browse facilities</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

