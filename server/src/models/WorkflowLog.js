import mongoose from 'mongoose';

const workflowStepSchema = new mongoose.Schema({
  step: { type: String, required: true },
  status: { type: String, required: true },
  durationMs: { type: Number, default: 0 },
});

const workflowLogSchema = new mongoose.Schema(
  {
    source: { type: String, default: 'Native AI Engine' },
    trigger: { type: String, required: true },
    topic: { type: String, required: true },
    status: { type: String, default: 'Completed' },
    tokensUsed: { type: Number, default: 0 },
    latencyMs: { type: Number, default: 0 },
    outputProjectId: { type: String },
    humanApprovalStatus: { type: String, default: 'Draft' },
    steps: [workflowStepSchema],
  },
  { timestamps: true }
);

export const WorkflowLogModel = mongoose.models.WorkflowLog || mongoose.model('WorkflowLog', workflowLogSchema);
