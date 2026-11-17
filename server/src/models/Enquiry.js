import mongoose from 'mongoose';

const enquirySchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, required: true, trim: true },
    educationOrProfession: { type: String, required: true },
    programmeInterested: { type: String, required: true },
    learningObjective: { type: String, required: true },
    status: {
      type: String,
      enum: ['New', 'Contacted', 'Admitted', 'Closed'],
      default: 'New',
    },
  },
  { timestamps: true }
);

// Prevent accidental immediate duplicate submissions within short interval
enquirySchema.index({ email: 1, programmeInterested: 1 });

export const EnquiryModel = mongoose.models.Enquiry || mongoose.model('Enquiry', enquirySchema);
