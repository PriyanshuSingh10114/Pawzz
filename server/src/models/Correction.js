import mongoose from 'mongoose';

const correctionSchema = new mongoose.Schema(
  {
    providerId: { type: String, required: true },
    providerName: { type: String, required: true },
    submitterName: { type: String, required: true },
    submitterEmail: { type: String, required: true },
    submitterPhone: { type: String },
    relationshipToBusiness: {
      type: String,
      enum: ['Owner/Manager', 'Staff Member', 'Customer/Visitor', 'Community Advocate'],
      default: 'Customer/Visitor',
    },
    correctionType: {
      type: String,
      enum: ['Incorrect Phone/Contact', 'Wrong Operating Hours', 'Wrong Address/Location', 'Outdated Services', 'Permanently Closed', 'Other'],
      required: true,
    },
    details: { type: String, required: true },
    status: {
      type: String,
      enum: ['Pending', 'Reviewed', 'Applied', 'Rejected'],
      default: 'Pending',
    },
  },
  { timestamps: true }
);

export const CorrectionModel = mongoose.models.Correction || mongoose.model('Correction', correctionSchema);

