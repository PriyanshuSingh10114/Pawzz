import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Search,
  MapPin,
  Filter,
  ShieldCheck,
  Star,
  Clock,
  Phone,
  AlertCircle,
  RotateCcw,
  PlusCircle,
  SlidersHorizontal,
  X,
  Stethoscope,
  Building2,
  Home,
  Activity,
  Truck,
  Heart,
  ChevronDown,
  Loader2,
  PhoneCall,
  Check,
} from 'lucide-react';
import ProviderCard from '../../components/pawnexus/ProviderCard';
import ProviderDetailModal from '../../components/pawnexus/ProviderDetailModal';
import RegisterProviderModal from '../../components/pawnexus/RegisterProviderModal';
import SubmitCorrectionModal from '../../components/pawnexus/SubmitCorrectionModal';
import { ProviderService } from '../../services/api';

export default function PawzzSearch() {
  const [searchParams, setSearchParams] = useSearchParams();

  // URL Query values
  const initialCategory = searchParams.get('category') || 'All';
  const initialCity = searchParams.get('city') || 'All';
  const initialQ = searchParams.get('q') || '';
  const initialEmergency = searchParams.get('emergency') === 'true';

  // State
  const [searchTerm, setSearchTerm] = useState(initialQ);
  const [selectedCity, setSelectedCity] = useState(initialCity);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [emergencyOnly, setEmergencyOnly] = useState(initialEmergency);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [minRating, setMinRating] = useState('0');
  const [maxFee, setMaxFee] = useState('All');
  const [sortBy, setSortBy] = useState('rating');
  const [selectedFacilityAmenities, setSelectedFacilityAmenities] = useState([]);

  // Data state
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Modals
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [correctionModalOpen, setCorrectionModalOpen] = useState(false);
  const [correctionTarget, setCorrectionTarget] = useState(null);

  const cities = ['All', 'Bengaluru', 'Mumbai', 'Delhi NCR', 'Pune', 'Hyderabad', 'Chennai'];

  const categoryOptions = [
    'All',
    'Veterinary Clinics',
    'Veterinary Hospitals',
    'Pet Boarding',
    'Diagnostics',
    'Animal Ambulance',
    'Animal NGOs',
  ];

  const facilityAmenityOptions = [
    '24/7 ICU',
    'Ultrasound / X-Ray',
    'In-House Pharmacy',
    'Surgical Unit',
    'Blood Bank',
    'Oxygen Chamber',
    'Pet Ambulance',
  ];

  const fetchProviders = async () => {
    try {
      setLoading(true);
      setError('');
      const params = {
        search: searchTerm.trim() || undefined,
        category: selectedCategory !== 'All' ? selectedCategory : undefined,
        city: selectedCity !== 'All' ? selectedCity : undefined,
        minRating: minRating > 0 ? minRating : undefined,
        verifiedOnly: verifiedOnly ? 'true' : undefined,
        emergencyOnly: emergencyOnly ? 'true' : undefined,
        limit: 50,
      };

      const res = await ProviderService.getAll(params);
      let list = res.data || [];

      // Local amenity filtering if user selected specific amenities
      if (selectedFacilityAmenities.length > 0) {
        list = list.filter((p) => {
          const facilities = (p.facilities || []).map((f) => f.toLowerCase());
          return selectedFacilityAmenities.every((amenity) => {
            const a = amenity.toLowerCase();
            return facilities.some((f) => f.includes(a) || a.includes(f));
          });
        });
      }

      // Local fee filtering
      if (maxFee !== 'All') {
        const feeLimit = Number(maxFee);
        list = list.filter((p) => (p.consultationFee || 0) <= feeLimit);
      }

      // Sorting
      if (sortBy === 'rating') {
        list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      } else if (sortBy === 'reviews') {
        list.sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0));
      } else if (sortBy === 'feeAsc') {
        list.sort((a, b) => (a.consultationFee || 0) - (b.consultationFee || 0));
      }

      setProviders(list);
    } catch (err) {
      setError(err.message || 'Failed to load search results.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProviders();
  }, [
    selectedCategory,
    selectedCity,
    emergencyOnly,
    verifiedOnly,
    minRating,
    maxFee,
    sortBy,
    selectedFacilityAmenities,
  ]);

  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    fetchProviders();
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedCity('All');
    setSelectedCategory('All');
    setEmergencyOnly(false);
    setVerifiedOnly(false);
    setMinRating('0');
    setMaxFee('All');
    setSortBy('rating');
    setSelectedFacilityAmenities([]);
    setSearchParams({});
  };

  const toggleAmenity = (amenity) => {
    if (selectedFacilityAmenities.includes(amenity)) {
      setSelectedFacilityAmenities(selectedFacilityAmenities.filter((a) => a !== amenity));
    } else {
      setSelectedFacilityAmenities([...selectedFacilityAmenities, amenity]);
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
      {/* Top Search & Filter Bar */}
      <section className="bg-white border-b border-slate-200 sticky top-16 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <form
            onSubmit={handleSearchSubmit}
            className="flex flex-col md:flex-row gap-3 items-stretch md:items-center"
          >
            {/* Search Input */}
            <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 flex-1">
              <Search className="w-4 h-4 text-slate-400 shrink-0" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search clinics, veterinarians, ambulance, ultrasound..."
                className="w-full bg-transparent text-xs sm:text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm('')}
                  className="text-slate-400 hover:text-slate-600 text-xs"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* City Dropdown */}
            <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 md:w-44">
              <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
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

            {/* Category Dropdown */}
            <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 md:w-52">
              <Stethoscope className="w-4 h-4 text-emerald-600 shrink-0" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-transparent text-xs font-semibold text-slate-800 w-full focus:outline-none cursor-pointer"
              >
                {categoryOptions.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold text-xs shadow-sm transition-colors flex items-center justify-center gap-1.5 shrink-0"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Search</span>
            </button>

            {/* Mobile Filter Button */}
            <button
              type="button"
              onClick={() => setMobileFilterOpen(true)}
              className="md:hidden px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters ({emergencyOnly ? '1' : '0'})</span>
            </button>
          </form>

          {/* Category Quick Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pt-3 pb-1 no-scrollbar text-xs">
            <span className="text-slate-400 font-bold uppercase text-[10px] shrink-0 mr-1">
              Filter by Type:
            </span>
            {categoryOptions.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 rounded-full font-semibold transition-all shrink-0 text-[11px] ${
                    active
                      ? 'bg-emerald-700 text-white shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {cat === 'All' ? 'All Services' : cat}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Body */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-6 sticky top-48">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                <SlidersHorizontal className="w-4 h-4 text-emerald-600" />
                <span>Filters & Criteria</span>
              </div>
              <button
                onClick={handleResetFilters}
                className="text-[11px] font-semibold text-emerald-700 hover:text-emerald-900 flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset All</span>
              </button>
            </div>

            {/* Quick Toggles */}
            <div className="space-y-2.5">
              <label className="flex items-center gap-2.5 text-xs font-semibold text-slate-700 cursor-pointer p-2 rounded-lg hover:bg-slate-50 transition-colors">
                <input
                  type="checkbox"
                  checked={emergencyOnly}
                  onChange={(e) => setEmergencyOnly(e.target.checked)}
                  className="rounded text-rose-600 focus:ring-rose-500 w-4 h-4"
                />
                <span className="text-rose-700 font-bold">24/7 Emergency ICU Only</span>
              </label>

              <label className="flex items-center gap-2.5 text-xs font-semibold text-slate-700 cursor-pointer p-2 rounded-lg hover:bg-slate-50 transition-colors">
                <input
                  type="checkbox"
                  checked={verifiedOnly}
                  onChange={(e) => setVerifiedOnly(e.target.checked)}
                  className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                />
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Verified Listings Only</span>
                </span>
              </label>
            </div>

            {/* Min Rating */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <div className="text-xs font-bold text-slate-900">Minimum Rating</div>
              <div className="grid grid-cols-4 gap-1.5 text-xs">
                {['0', '4.0', '4.5', '4.8'].map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setMinRating(r)}
                    className={`py-1.5 rounded-lg font-bold border transition-colors ${
                      minRating === r
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-400'
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {r === '0' ? 'Any' : `${r}★`}
                  </button>
                ))}
              </div>
            </div>

            {/* Max Consultation Fee */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <div className="text-xs font-bold text-slate-900">Consultation Fee</div>
              <select
                value={maxFee}
                onChange={(e) => setMaxFee(e.target.value)}
                className="w-full text-xs font-semibold p-2 rounded-lg border border-slate-200 bg-slate-50 focus:outline-none"
              >
                <option value="All">Any Fee Range</option>
                <option value="400">Budget (Under ₹400)</option>
                <option value="700">Standard (Under ₹700)</option>
                <option value="1000">Specialist (Under ₹1000)</option>
              </select>
            </div>

            {/* Required Amenities */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <div className="text-xs font-bold text-slate-900">Facilities & Equipment</div>
              <div className="space-y-1.5">
                {facilityAmenityOptions.map((amenity) => {
                  const selected = selectedFacilityAmenities.includes(amenity);
                  return (
                    <label
                      key={amenity}
                      className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer hover:text-emerald-700"
                    >
                      <input
                        type="checkbox"
                        checked={selected}
                        onChange={() => toggleAmenity(amenity)}
                        className="rounded text-emerald-600 focus:ring-emerald-500 w-3.5 h-3.5"
                      />
                      <span>{amenity}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* B2B Listing Prompt in Sidebar */}
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 space-y-2 text-xs">
              <div className="font-bold text-emerald-900">Own a Veterinary Practice?</div>
              <p className="text-emerald-700 text-[11px] leading-relaxed">
                Join our verified directory for free and receive direct consultation appointments.
              </p>
              <button
                onClick={() => setRegisterModalOpen(true)}
                className="w-full py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-[11px] transition-colors"
              >
                Register Your Facility
              </button>
            </div>
          </aside>

          {/* Results Area */}
          <div className="lg:col-span-9 space-y-6">
            {/* Results Count & Sort Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200">
              <div className="text-xs sm:text-sm text-slate-700">
                Showing{' '}
                <span className="font-bold text-slate-900 text-emerald-800">
                  {providers.length}
                </span>{' '}
                verified animal healthcare providers
                {selectedCity !== 'All' && <span> in <strong>{selectedCity}</strong></span>}
                {selectedCategory !== 'All' && <span> for <strong>{selectedCategory}</strong></span>}
              </div>

              {/* Sort By Dropdown */}
              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-400 font-semibold">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 font-bold text-slate-800 focus:outline-none cursor-pointer"
                >
                  <option value="rating">Highest Rated</option>
                  <option value="reviews">Most Reviewed</option>
                  <option value="feeAsc">Fee: Low to High</option>
                </select>
              </div>
            </div>

            {/* Loading & Provider Cards Grid */}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((n) => (
                  <div key={n} className="bg-white h-72 rounded-2xl border border-slate-200 animate-pulse" />
                ))}
              </div>
            ) : error ? (
              <div className="p-8 bg-rose-50 rounded-2xl border border-rose-200 text-rose-800 text-sm space-y-2">
                <div className="font-bold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  <span>Error fetching providers</span>
                </div>
                <p className="text-xs">{error}</p>
                <button
                  onClick={fetchProviders}
                  className="px-3 py-1.5 rounded-lg bg-rose-600 text-white text-xs font-bold"
                >
                  Try Again
                </button>
              </div>
            ) : providers.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto font-black text-xl">
                  🐾
                </div>
                <h3 className="text-lg font-bold text-slate-900">No matching providers found</h3>
                <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
                  We couldn't find any facilities matching all your current filters. Try relaxing the city filter, fee constraints, or unchecking 24/7 ICU.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-sm transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {providers.map((provider) => (
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
        </div>
      </main>

      {/* Mobile Filter Drawer Modal */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 max-h-[85vh] overflow-y-auto space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="font-bold text-base text-slate-900">Filter Providers</span>
              <button onClick={() => setMobileFilterOpen(false)} className="text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <label className="flex items-center gap-2 text-xs font-semibold">
                <input
                  type="checkbox"
                  checked={emergencyOnly}
                  onChange={(e) => setEmergencyOnly(e.target.checked)}
                  className="w-4 h-4 text-rose-600"
                />
                <span>24/7 Emergency ICU Only</span>
              </label>

              <label className="flex items-center gap-2 text-xs font-semibold">
                <input
                  type="checkbox"
                  checked={verifiedOnly}
                  onChange={(e) => setVerifiedOnly(e.target.checked)}
                  className="w-4 h-4 text-emerald-600"
                />
                <span>Verified Listings Only</span>
              </label>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Max Consultation Fee</label>
                <select
                  value={maxFee}
                  onChange={(e) => setMaxFee(e.target.value)}
                  className="w-full text-xs font-semibold p-2 rounded-lg border bg-slate-50"
                >
                  <option value="All">Any Fee Range</option>
                  <option value="400">Budget (Under ₹400)</option>
                  <option value="700">Standard (Under ₹700)</option>
                  <option value="1000">Specialist (Under ₹1000)</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t border-slate-100">
              <button
                onClick={handleResetFilters}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600"
              >
                Reset
              </button>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="flex-1 py-2.5 rounded-xl bg-emerald-700 text-white text-xs font-bold"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}

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
            fetchProviders();
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
