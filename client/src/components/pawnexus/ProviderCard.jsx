import React from 'react';
import {
  MapPin,
  Star,
  ShieldCheck,
  Clock,
  Phone,
  AlertTriangle,
  ChevronRight,
  Sparkles,
  Stethoscope,
  Heart,
  CheckCircle2,
} from 'lucide-react';

// Curated high-resolution photography for real clinical presence
const CATEGORY_IMAGES = {
  'Veterinary Clinics': [
    'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&w=700&q=80',
    'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=700&q=80',
    'https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?auto=format&fit=crop&w=700&q=80',
  ],
  'Veterinary Hospitals': [
    'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&w=700&q=80',
    'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=700&q=80',
  ],
  'Pet Boarding': [
    'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=700&q=80',
    'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=700&q=80',
  ],
  'Diagnostics': [
    'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=700&q=80',
  ],
  'Animal Ambulance': [
    'https://images.unsplash.com/photo-1587764379873-97837921fd44?auto=format&fit=crop&w=700&q=80',
  ],
  'Animal NGOs': [
    'https://images.unsplash.com/photo-1535930891776-0c2dfb7fda1a?auto=format&fit=crop&w=700&q=80',
  ],
};

function getProviderImage(provider) {
  if (provider.imageUrl) return provider.imageUrl;
  const list = CATEGORY_IMAGES[provider.category] || CATEGORY_IMAGES['Veterinary Clinics'];
  // Deterministic pick based on string char code
  const code = (provider.name || '').charCodeAt(0) || 0;
  return list[code % list.length];
}

export default function ProviderCard({
  provider,
  onViewDetails,
  onOpenCorrection,
}) {
  const imageUrl = getProviderImage(provider);

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] hover:border-emerald-300 transition-all duration-300 flex flex-col justify-between overflow-hidden group">
      {/* Top Photographic Header */}
      <div className="relative h-44 w-full overflow-hidden bg-slate-100">
        <img
          src={imageUrl}
          alt={provider.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Top Floating Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 z-10">
          <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-white/95 text-slate-900 backdrop-blur-md shadow-xs">
            {provider.category}
          </span>

          <div className="flex items-center gap-1.5">
            {provider.is24x7 && (
              <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-rose-600 text-white shadow-xs animate-pulse">
                24/7 ICU
              </span>
            )}
            {provider.isVerified ? (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-600 text-white shadow-xs">
                <ShieldCheck className="w-3 h-3" />
                Verified
              </span>
            ) : (
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-black/60 text-amber-300 backdrop-blur-md border border-white/20">
                Community Listing
              </span>
            )}
          </div>
        </div>

        {/* Bottom Image Overlay: Rating & Location Pill */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs z-10">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/50 backdrop-blur-md font-bold">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{provider.rating || 4.8}</span>
            <span className="text-slate-300 font-normal text-[11px]">
              ({provider.reviewCount || 120})
            </span>
          </div>

          <div className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-black/50 backdrop-blur-md text-emerald-300">
            {provider.city} • ~{provider.distanceKm || 2.4} km away
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Title */}
          <h3
            onClick={() => onViewDetails(provider)}
            className="text-lg font-extrabold text-slate-900 group-hover:text-emerald-700 transition-colors cursor-pointer leading-snug line-clamp-1"
          >
            {provider.name}
          </h3>

          {/* Address */}
          <div className="flex items-start gap-1.5 text-xs text-slate-500 mt-1.5">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
            <span className="line-clamp-1">{provider.address}</span>
          </div>

          {/* Pricing & Hours Info Strip */}
          <div className="flex items-center justify-between mt-3.5 pt-3 border-t border-slate-100 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Consultation</span>
              <span className="font-extrabold text-slate-900 text-sm">
                ₹{provider.consultationFee || 500}
              </span>
            </div>

            <div className="flex items-center gap-1 text-slate-500 text-[11px]">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
              <span className="truncate max-w-[130px] font-medium">{provider.openingHours}</span>
            </div>
          </div>

          {/* Services Offered Tags */}
          <div className="flex flex-wrap gap-1.5 mt-3.5">
            {provider.services?.slice(0, 3).map((service, idx) => (
              <span
                key={idx}
                className="text-[10px] font-semibold px-2.5 py-0.5 rounded-md bg-emerald-50/70 text-emerald-800 border border-emerald-100"
              >
                {service}
              </span>
            ))}
            {provider.services?.length > 3 && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                +{provider.services.length - 3} more
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="p-4 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <a
            href={`tel:${provider.emergencyPhone || provider.phone}`}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-all shadow-xs hover:shadow-sm"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Call Facility</span>
          </a>

          <button
            onClick={() => onOpenCorrection(provider)}
            className="text-slate-400 hover:text-slate-700 p-2 rounded-lg hover:bg-slate-200/50 transition-colors"
            title="Report inaccurate contact or address details"
          >
            <AlertTriangle className="w-3.5 h-3.5" />
          </button>
        </div>

        <button
          onClick={() => onViewDetails(provider)}
          className="inline-flex items-center gap-1 text-xs font-bold text-slate-700 hover:text-emerald-800 transition-colors px-3 py-2 rounded-xl hover:bg-white"
        >
          <span>View Profile</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
