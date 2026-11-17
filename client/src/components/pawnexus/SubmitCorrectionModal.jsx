import React, { useState } from 'react';
import { X, AlertTriangle, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import { ProviderService } from '../../services/api';
import { useNotification } from '../../context/NotificationContext';

export default function SubmitCorrectionModal({ provider, isOpen, onClose }) {
  const { addNotification } = useNotification();
  const [formData, setFormData] = useState({
    submitterName: '',
    submitterEmail: '',
    submitterPhone: '',
    relationshipToBusiness: 'Customer/Visitor',
    correctionType: 'Incorrect Phone/Contact',
    details: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  if (!isOpen || !provider) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.submitterName.trim() || !formData.submitterEmail.trim() || !formData.details.trim()) {
      setError('Please provide your name, email and the specific details to correct.');
      return;
    }

    try {
      setLoading(true);
      setError('');
      await ProviderService.submitCorrection(provider.id || provider._id, formData);
      setSuccess(true);
      addNotification('Correction logged! Our audit team will review the update.', 'success');
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 1800);
    } catch (err) {
      setError(err.message || 'Failed to submit correction report. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
        <div className="sticky top-0 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-slate-100 flex items-center justify-between z-10">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-amber-50 text-amber-600 rounded-xl">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Submit a Data Correction</h2>
              <p className="text-xs text-slate-500 truncate max-w-xs">{provider.name}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {success ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Thank You for Keeping Data Fresh!</h3>
            <p className="text-xs text-slate-600 max-w-sm mx-auto">
              Our animal care verification desk has received your note. Accurate directory data helps pet owners in critical emergencies.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
            {error && (
              <div className="p-3 bg-rose-50 text-rose-800 rounded-xl flex items-center gap-2 border border-rose-200">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-slate-600">
              Reporting accurate information ensures pet parents reach active clinics without delay.
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Correction Type <span className="text-rose-500">*</span>
              </label>
              <select
                name="correctionType"
                value={formData.correctionType}
                onChange={handleChange}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 text-slate-800"
              >
                <option value="Incorrect Phone/Contact">Incorrect Phone or Emergency Number</option>
                <option value="Wrong Operating Hours">Wrong Operating Hours / Not 24 Hours</option>
                <option value="Wrong Address/Location">Wrong Address or Map Location</option>
                <option value="Outdated Services">Outdated or Missing Services</option>
                <option value="Permanently Closed">Facility Permanently Closed or Relocated</option>
                <option value="Other">Other Discrepancy</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Your Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  name="submitterName"
                  value={formData.submitterName}
                  onChange={handleChange}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 text-slate-800"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Your Email Address <span className="text-rose-500">*</span>
                </label>
                <input
                  type="email"
                  name="submitterEmail"
                  value={formData.submitterEmail}
                  onChange={handleChange}
                  placeholder="rahul@example.com"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 text-slate-800"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Phone (Optional)</label>
                <input
                  type="tel"
                  name="submitterPhone"
                  value={formData.submitterPhone}
                  onChange={handleChange}
                  placeholder="+91 98200 00000"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 text-slate-800"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Your Relationship</label>
                <select
                  name="relationshipToBusiness"
                  value={formData.relationshipToBusiness}
                  onChange={handleChange}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 text-slate-800"
                >
                  <option value="Customer/Visitor">Pet Parent / Customer</option>
                  <option value="Owner/Manager">Clinic Owner / Medical Director</option>
                  <option value="Staff Member">Veterinary Staff Member</option>
                  <option value="Community Advocate">Animal Welfare Rescuer</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Correction Details & Verified Information <span className="text-rose-500">*</span>
              </label>
              <textarea
                name="details"
                rows={3}
                value={formData.details}
                onChange={handleChange}
                placeholder="Please state what needs updating (e.g. 'The correct emergency line is +91 98201 12345, and the hospital is now open 24 hours')."
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 text-slate-800"
                required
              />
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-slate-200 text-slate-600 rounded-xl font-semibold hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl shadow-sm transition-colors flex items-center gap-2 disabled:opacity-50"
              >
                {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                <span>{loading ? 'Submitting...' : 'Submit Correction'}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
