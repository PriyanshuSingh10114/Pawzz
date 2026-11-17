import React from 'react';
import { Heart, Building2, CheckCircle2, Shield, PlusCircle } from 'lucide-react';

export default function OwnerAndProviderBenefits({ onOpenRegisterModal }) {
  return (
    <section id="for-providers" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Pet Parents Card */}
          <div className="p-8 sm:p-10 rounded-3xl bg-emerald-50/50 border border-emerald-100 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900">
                Built with Love for Pet Parents
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Finding dependable care during late nights, sudden illness, or routine travel boarding shouldn't be stressful.
              </p>

              <ul className="space-y-2.5 pt-2 text-xs text-slate-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Real 24-hour verification — no arriving at locked gates</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Direct emergency ambulance telephone lines and trauma ICUs</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Transparent reviews from pet parents in your neighborhood</span>
                </li>
              </ul>
            </div>

            <div className="pt-8">
              <a
                href="#providers-section"
                className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition-colors shadow-sm"
              >
                <span>Find Care Near You</span>
              </a>
            </div>
          </div>

          {/* Providers & NGOs Card */}
          <div className="p-8 sm:p-10 rounded-3xl bg-slate-900 text-white flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-slate-950 flex items-center justify-center">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-extrabold text-white">
                Empowering Animal Clinics & Rescue NGOs
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Connect your medical team with local pet owners who need specialized surgery, diagnostic imaging, and rescue support.
              </p>

              <ul className="space-y-2.5 pt-2 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>100% Free directory inclusion for verified animal care facilities</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Highlight your medical equipment (CT, ultrasound, ICU, oxygen cages)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>NGO emergency helpline discovery for stray rescues and adoptions</span>
                </li>
              </ul>
            </div>

            <div className="pt-8">
              <button
                onClick={onOpenRegisterModal}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-slate-100 text-slate-900 font-bold rounded-xl text-xs transition-colors shadow-sm"
              >
                <PlusCircle className="w-4 h-4 text-emerald-600" />
                <span>List Your Business or NGO</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
