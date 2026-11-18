import React from 'react';
import {
  X,
  MapPin,
  Star,
  ShieldCheck,
  Clock,
  Phone,
  Globe,
  Mail,
  AlertTriangle,
  Building,
  CheckCircle,
  Navigation,
} from 'lucide-react';

export default function ProviderDetailModal({
  provider,
  isOpen,
  onClose,
  onOpenCorrection,
}) {
  if (!isOpen || !provider) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
        {/* Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-slate-100 flex items-start justify-between z-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                {provider.category}
              </span>
              {provider.isVerified ? (
                <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  Verified Provider
                </span>
              ) : (
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                  Community Listing
                </span>
              )}
              {provider.is24x7 && (
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-rose-100 text-rose-700">
                  24/7 Trauma Care
                </span>
              )}
            </div>
            <h2 className="text-xl font-bold text-slate-900 leading-snug">{provider.name}</h2>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-xl hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6">
          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-3 gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100 text-center">
            <div>
              <div className="text-[11px] text-slate-500 font-medium">Rating</div>
              <div className="flex items-center justify-center gap-1 mt-0.5">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="font-extrabold text-slate-900 text-base">{provider.rating || 4.8}</span>
              </div>
            </div>
            <div>
              <div className="text-[11px] text-slate-500 font-medium">Distance</div>
              <div className="font-extrabold text-slate-900 text-base mt-0.5">
                {provider.distanceKm || 2.5} km
              </div>
            </div>
            <div>
              <div className="text-[11px] text-slate-500 font-medium">Emergency</div>
              <div className="font-extrabold text-emerald-700 text-base mt-0.5">
                {provider.is24x7 ? '24 Hours' : 'Day OPD'}
              </div>
            </div>
          </div>

          {/* Description */}
          {provider.description && (
            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                About the Facility
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed bg-white">
                {provider.description}
              </p>
            </div>
          )}

          {/* Location & Opening Hours */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 space-y-1.5">
              <div className="font-bold text-slate-900 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-emerald-600" />
                <span>Address</span>
              </div>
              <p className="text-slate-600 leading-relaxed">{provider.address}</p>
              <div className="pt-1">
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(provider.name + ' ' + provider.address)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-emerald-700 font-bold hover:underline"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Get Directions</span>
                </a>
              </div>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 space-y-1.5">
              <div className="font-bold text-slate-900 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-emerald-600" />
                <span>Operating Hours</span>
              </div>
              <p className="text-slate-600 leading-relaxed">{provider.openingHours}</p>
              <div className="text-slate-400 pt-1">
                City Hub: <span className="font-semibold text-slate-700">{provider.city}</span>
              </div>
            </div>
          </div>

          {/* Contact Details */}
          <div className="p-4 bg-emerald-50/60 rounded-2xl border border-emerald-100 space-y-2">
            <div className="font-bold text-emerald-950 text-xs">Direct Emergency Contacts</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <a
                href={`tel:${provider.phone}`}
                className="flex items-center gap-2 p-2 bg-white rounded-xl border border-emerald-200/80 text-emerald-900 font-semibold hover:bg-emerald-100/50 transition-colors"
              >
                <Phone className="w-4 h-4 text-emerald-600" />
                <span>OPD: {provider.phone}</span>
              </a>
              {provider.emergencyPhone && (
                <a
                  href={`tel:${provider.emergencyPhone}`}
                  className="flex items-center gap-2 p-2 bg-white rounded-xl border border-rose-200 text-rose-800 font-semibold hover:bg-rose-50 transition-colors"
                >
                  <Phone className="w-4 h-4 text-rose-600" />
                  <span>Emergency: {provider.emergencyPhone}</span>
                </a>
              )}
            </div>
            {provider.email && (
              <div className="flex items-center gap-2 text-xs text-slate-600 pt-1">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <span>{provider.email}</span>
              </div>
            )}
            {provider.website && (
              <div className="flex items-center gap-2 text-xs text-slate-600">
                <Globe className="w-3.5 h-3.5 text-slate-400" />
                <a
                  href={provider.website}
                  target="_blank"
                  rel="noreferrer"
                  className="text-emerald-700 hover:underline"
                >
                  {provider.website}
                </a>
              </div>
            )}
          </div>

          {/* Services & Facilities */}
          <div className="space-y-3">
            <div className="font-bold text-slate-900 text-xs uppercase tracking-wider">
              Medical Services & Specialties
            </div>
            <div className="flex flex-wrap gap-2">
              {provider.services?.map((svc, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs font-medium"
                >
                  <CheckCircle className="w-3 h-3 text-emerald-600" />
                  <span>{svc}</span>
                </span>
              ))}
            </div>

            {provider.facilities && provider.facilities.length > 0 && (
              <>
                <div className="font-bold text-slate-900 text-xs uppercase tracking-wider pt-2">
                  Infrastructure & Facilities
                </div>
                <div className="flex flex-wrap gap-2">
                  {provider.facilities.map((fac, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-800 rounded-lg text-xs font-medium border border-emerald-100"
                    >
                      <Building className="w-3 h-3 text-emerald-600" />
                      <span>{fac}</span>
                    </span>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Genuine Reviews Section */}
          <div className="space-y-3 pt-4 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                Pet Parent Reviews ({provider.reviews?.length || 0})
              </h3>
              <div className="text-xs text-slate-400">Authentic experiences</div>
            </div>

            <div className="space-y-2.5">
              {provider.reviews?.length > 0 ? (
                provider.reviews.map((rev, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900">{rev.author}</span>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span className="font-semibold text-slate-800">{rev.rating}</span>
                        <span className="text-[10px] text-slate-400 ml-1">{rev.date}</span>
                      </div>
                    </div>
                    <p className="text-slate-600 mt-1.5 leading-relaxed">{rev.comment}</p>
                  </div>
                ))
              ) : (
                <div className="p-4 bg-slate-50 rounded-xl text-center text-xs text-slate-500">
                  No public reviews recorded yet for this facility.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="sticky bottom-0 bg-white/95 backdrop-blur-md px-6 py-4 border-t border-slate-100 flex items-center justify-between">
          <button
            onClick={() => {
              onClose();
              if (onOpenCorrection) onOpenCorrection(provider);
            }}
            className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 transition-colors"
          >
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            <span>Submit a correction</span>
          </button>

          <div className="flex items-center gap-2">
            <a
              href={`tel:${provider.emergencyPhone || provider.phone}`}
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors shadow-sm flex items-center gap-1.5"
            >
              <Phone className="w-4 h-4" />
              <span>Call Facility</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

