import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  author: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  date: { type: String, default: () => new Date().toISOString().split('T')[0] },
  comment: { type: String, required: true },
});

const providerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    category: {
      type: String,
      required: true,
      enum: [
        'Veterinary Clinics',
        'Veterinary Hospitals',
        'Pet Boarding',
        'Diagnostics',
        'Animal Ambulance',
        'Animal NGOs',
      ],
    },
    address: { type: String, required: true },
    city: { type: String, required: true },
    distanceKm: { type: Number, default: 2.5 },
    rating: { type: Number, default: 4.5, min: 1, max: 5 },
    reviewCount: { type: Number, default: 0 },
    isVerified: { type: Boolean, default: false },
    is24x7: { type: Boolean, default: false },
    phone: { type: String, required: true },
    emergencyPhone: { type: String },
    email: { type: String },
    website: { type: String },
    openingHours: { type: String, default: 'Mon-Sat: 9:00 AM - 8:00 PM' },
    services: [{ type: String }],
    facilities: [{ type: String }],
    description: { type: String },
    reviews: [reviewSchema],
  },
  { timestamps: true }
);

providerSchema.index({ name: 'text', address: 'text', city: 'text' });

export const ProviderModel = mongoose.models.Provider || mongoose.model('Provider', providerSchema);
