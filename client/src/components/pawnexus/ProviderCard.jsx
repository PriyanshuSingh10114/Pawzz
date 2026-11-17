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
} from 'lucide-react';

export default function ProviderCard({
  provider,
  onViewDetails,
  onOpenCorrection,
}) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-card-hover transition-all duration-200 flex flex-col justify-between overflow-hidden group">
      <div className="p-6">
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700">
            {provider.category}
          </span>

          <div className="flex items-center gap-1.5">
            {provider.is24x7 && (
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-rose-100 text-rose-700">
                24/7 ICU
              </span>
            )}
            {provider.isVerified ? (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800">
                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                Verified
              </span>
            ) : (
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 border border-amber-200">
                Demo Listing
              </span>
            )}
          </div>
        </div>

        {/* Title & City */}
        <h3
          onClick={() => onViewDetails(provider)}
          className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors cursor-pointer leading-snug"
        >
          {provider.name}
        </h3>

        {/* Location & Distance */}
        <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-2">
          <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="truncate">{provider.address}</span>
        </div>
        <div className="text-[11px] font-medium text-emerald-700 mt-0.5 pl-5">
          {provider.city} • Approx {provider.distanceKm || 2.5} km away
        </div>

        {/* Ratings & Opening Hours */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100 text-xs">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span className="font-bold text-slate-900">{provider.rating || 4.8}</span>
            <span className="text-slate-400">({provider.reviewCount || 120})</span>
          </div>

          <div className="flex items-center gap-1 text-slate-500 text-[11px]">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span className="truncate max-w-[140px]">{provider.openingHours}</span>
          </div>
        </div>

        {/* Services tags */}
        <div className="flex flex-wrap gap-1.5 mt-4">
          {provider.services?.slice(0, 3).map((service, idx) => (
            <span
              key={idx}
              className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-50 text-slate-600 border border-slate-200/60"
            >
              {service}
            </span>
          ))}
          {provider.services?.length > 3 && (
            <span className="text-[10px] font-medium px-1.5 py-0.5 text-slate-400">
              +{provider.services.length - 3} more
            </span>
          )}
        </div>
      </div>

      {/* Action Footer */}
      <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <a
            href={`tel:${provider.emergencyPhone || provider.phone}`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-colors"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Call</span>
          </a>

          <button
            onClick={() => onOpenCorrection(provider)}
            className="text-[11px] text-slate-400 hover:text-slate-600 transition-colors p-1.5"
            title="Submit a correction for outdated details"
          >
            <AlertTriangle className="w-3.5 h-3.5" />
          </button>
        </div>

        <button
          onClick={() => onViewDetails(provider)}
          className="inline-flex items-center gap-1 text-xs font-bold text-slate-700 hover:text-emerald-700 transition-colors"
        >
          <span>View Details</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

