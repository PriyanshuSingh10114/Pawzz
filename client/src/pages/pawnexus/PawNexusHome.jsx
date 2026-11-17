import React, { useState, useEffect } from 'react';
import Hero from '../../components/pawnexus/Hero';
import ServiceCards from '../../components/pawnexus/ServiceCards';
import ProviderCard from '../../components/pawnexus/ProviderCard';
import ProviderDetailModal from '../../components/pawnexus/ProviderDetailModal';
import RegisterProviderModal from '../../components/pawnexus/RegisterProviderModal';
import SubmitCorrectionModal from '../../components/pawnexus/SubmitCorrectionModal';
import HowItWorks from '../../components/pawnexus/HowItWorks';
import OwnerAndProviderBenefits from '../../components/pawnexus/OwnerAndProviderBenefits';
import { ProviderService } from '../../services/api';
import { Search, Filter, ShieldCheck, Clock, RotateCcw, PlusCircle, AlertCircle, Loader2 } from 'lucide-react';

export default function PawNexusHome() {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Filter States
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCity, setSelectedCity] = useState('All');
  const [minRating, setMinRating] = useState('0');
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [emergencyOnly, setEmergencyOnly] = useState(false);

  // Modal States
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [correctionModalOpen, setCorrectionModalOpen] = useState(false);
  const [correctionTarget, setCorrectionTarget] = useState(null);

  const fetchProviders = async () => {
    try {
      setLoading(true);
      setError('');
      const params = {
        search: searchTerm,
        category: selectedCategory,
        city: selectedCity,
        minRating: minRating > 0 ? minRating : undefined,
        verifiedOnly: verifiedOnly ? 'true' : undefined,
        emergencyOnly: emergencyOnly ? 'true' : undefined,
        limit: 30,
      };

      const res = await ProviderService.getAll(params);
      setProviders(res.data || []);
    } catch (err) {
      setError(err.message || 'Failed to load providers.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProviders();
  }, [selectedCategory, selectedCity, minRating, verifiedOnly, emergencyOnly]);

  const handleSearchSubmit = () => {
    fetchProviders();
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setSelectedCity('All');
    setMinRating('0');
    setVerifiedOnly(false);
    setEmergencyOnly(false);
  };

  const handleOpenDetail = (provider) => {
    setSelectedProvider(provider);
    setDetailModalOpen(true);
  };

  const handleOpenCorrection = (provider) => {
    setCorrectionTarget(provider);
    setCorrectionModalOpen(true);
  };

  const handleProviderAdded = (newProvider) => {
    setProviders((prev) => [newProvider, ...prev]);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <Hero
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
        onSearchSubmit={handleSearchSubmit}
      />

      {/* Service Discovery Section */}
      <ServiceCards
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      {/* Provider Discovery & Live Filtering Section */}
      <section id="providers-section" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
              Directory Results
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              Verified Healthcare & Support Providers
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Real facilities with authentic addresses, emergency hotlines, and transparent reviews.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setRegisterModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors shadow-sm"
            >
              <PlusCircle className="w-4 h-4" />
              <span>List Your Facility</span>
            </button>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-sm mb-8 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            {/* Search Input */}
            <div className="flex items-center gap-2 p-2 bg-slate-50 rounded-xl border border-slate-200">
              <Search className="w-4 h-4 text-slate-400 shrink-0" />
              <input
                type="text"
                placeholder="Search by facility or service..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && fetchProviders()}
                className="bg-transparent text-xs text-slate-800 placeholder-slate-400 w-full focus:outline-none"
              />
            </div>

            {/* City Filter */}
            <div className="p-2 bg-slate-50 rounded-xl border border-slate-200">
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="bg-transparent text-xs text-slate-700 font-medium w-full focus:outline-none cursor-pointer"
              >
                <option value="All">All Cities</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Bengaluru">Bengaluru</option>
                <option value="Delhi NCR">Delhi NCR</option>
                <option value="Pune">Pune</option>
                <option value="Hyderabad">Hyderabad</option>
              </select>
            </div>

            {/* Category Filter */}
            <div className="p-2 bg-slate-50 rounded-xl border border-slate-200">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-transparent text-xs text-slate-700 font-medium w-full focus:outline-none cursor-pointer"
              >
                <option value="All">All Categories</option>
                <option value="Veterinary Clinics">Veterinary Clinics</option>
                <option value="Veterinary Hospitals">Veterinary Hospitals</option>
                <option value="Pet Boarding">Pet Boarding</option>
                <option value="Diagnostics">Diagnostics</option>
                <option value="Animal Ambulance">Animal Ambulance</option>
                <option value="Animal NGOs">Animal NGOs</option>
              </select>
            </div>

            {/* Rating Filter */}
            <div className="p-2 bg-slate-50 rounded-xl border border-slate-200">
              <select
                value={minRating}
                onChange={(e) => setMinRating(e.target.value)}
                className="bg-transparent text-xs text-slate-700 font-medium w-full focus:outline-none cursor-pointer"
              >
                <option value="0">Any Rating</option>
                <option value="4.5">★ 4.5 & Above</option>
                <option value="4.8">★ 4.8 & Above</option>
              </select>
            </div>
          </div>

          {/* Checkboxes & Reset */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100 text-xs">
            <div className="flex flex-wrap items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer text-slate-700 font-semibold select-none">
                <input
                  type="checkbox"
                  checked={emergencyOnly}
                  onChange={(e) => setEmergencyOnly(e.target.checked)}
                  className="rounded border-slate-300 text-rose-600 focus:ring-rose-500 w-4 h-4"
                />
                <span className="flex items-center gap-1 text-rose-700">
                  <Clock className="w-3.5 h-3.5" />
                  24/7 Emergency Available Only
                </span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-slate-700 font-semibold select-none">
                <input
                  type="checkbox"
                  checked={verifiedOnly}
                  onChange={(e) => setVerifiedOnly(e.target.checked)}
                  className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                />
                <span className="flex items-center gap-1 text-emerald-800">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Verified Providers Only
                </span>
              </label>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-slate-500 font-medium">
                Showing <strong className="text-slate-900">{providers.length}</strong> facilities
              </span>
              <button
                onClick={handleResetFilters}
                className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-slate-700 transition-colors"
                title="Reset all search filters"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="py-20 text-center">
            <Loader2 className="w-8 h-8 animate-spin text-emerald-600 mx-auto" />
            <p className="text-xs text-slate-500 mt-2">Loading verified providers...</p>
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="p-4 bg-rose-50 text-rose-800 rounded-2xl flex items-center gap-3 border border-rose-200">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <div className="text-xs">{error}</div>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && providers.length === 0 && (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm max-w-md mx-auto space-y-4">
            <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">No Facilities Match Your Filters</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Try broadening your search keyword, resetting city selections, or toggling off the 24/7 filter.
            </p>
            <button
              onClick={handleResetFilters}
              className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800"
            >
              Reset All Filters
            </button>
          </div>
        )}

        {/* Provider Grid */}
        {!loading && !error && providers.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {providers.map((provider) => (
              <ProviderCard
                key={provider.id || provider._id}
                provider={provider}
                onViewDetails={handleOpenDetail}
                onOpenCorrection={handleOpenCorrection}
              />
            ))}
          </div>
        )}
      </section>

      {/* How PawNexus Works Section */}
      <HowItWorks />

      {/* Benefits for Owners & Providers */}
      <OwnerAndProviderBenefits onOpenRegisterModal={() => setRegisterModalOpen(true)} />

      {/* Detail Modal */}
      <ProviderDetailModal
        provider={selectedProvider}
        isOpen={detailModalOpen}
        onClose={() => setDetailModalOpen(false)}
        onOpenCorrection={handleOpenCorrection}
      />

      {/* Register Provider Modal */}
      <RegisterProviderModal
        isOpen={registerModalOpen}
        onClose={() => setRegisterModalOpen(false)}
        onProviderAdded={handleProviderAdded}
      />

      {/* Submit Correction Modal */}
      <SubmitCorrectionModal
        provider={correctionTarget}
        isOpen={correctionModalOpen}
        onClose={() => setCorrectionModalOpen(false)}
      />
    </div>
  );
}

