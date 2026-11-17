import mongoose from 'mongoose';

const moduleSchema = new mongoose.Schema({
  week: { type: String, required: true },
  title: { type: String, required: true },
  topics: [{ type: String }],
});

const programmeSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    tagline: { type: String, required: true },
    category: { type: String, required: true },
    duration: { type: String, required: true },
    level: { type: String, required: true },
    cohortStart: { type: String, required: true },
    seatsLeft: { type: Number, default: 10 },
    rating: { type: Number, default: 4.9 },
    enrolledCount: { type: Number, default: 0 },
    highlights: [{ type: String }],
    learningOutcomes: [{ type: String }],
    modules: [moduleSchema],
  },
  { timestamps: true }
);

export const ProgrammeModel = mongoose.models.Programme || mongoose.model('Programme', programmeSchema);
