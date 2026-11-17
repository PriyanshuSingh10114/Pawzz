import mongoose from 'mongoose';

const slideSchema = new mongoose.Schema({
  slideNumber: { type: Number, required: true },
  headline: { type: String, required: true },
  description: { type: String, required: true },
  visualType: { type: String, default: 'Concept' },
  tag: { type: String, default: 'Key Takeaway' },
  cta: { type: String, default: 'Learn more' },
});

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    topic: { type: String, required: true },
    targetAudience: { type: String, required: true },
    platform: { type: String, enum: ['LinkedIn', 'Instagram'], default: 'LinkedIn' },
    contentObjective: { type: String, default: 'Thought Leadership' },
    tone: { type: String, default: 'Professional & Punchy' },
    template: {
      type: String,
      enum: ['minimal-editorial', 'modern-gradient', 'corporate', 'educational-infographic', 'bold-typography'],
      default: 'minimal-editorial',
    },
    slideCount: { type: Number, default: 6 },
    status: {
      type: String,
      enum: ['Draft', 'In Review', 'Approved', 'Exported'],
      default: 'Draft',
    },
    slides: [slideSchema],
    metadata: {
      source: { type: String, default: 'Native Web' },
      tokensUsed: { type: Number, default: 0 },
      generationLatencyMs: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
);

export const ProjectModel = mongoose.models.Project || mongoose.model('Project', projectSchema);
