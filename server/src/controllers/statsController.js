import { isDbConnected } from '../config/db.js';
import { initialProviders, initialProgrammes, initialProjects } from '../data/seedData.js';
import { getWorkflowLogs } from '../services/automation/n8nService.js';
import { ENV } from '../config/env.js';

export async function getSuiteStats(req, res) {
  try {
    const logs = getWorkflowLogs();

    return res.json({
      success: true,
      data: {
        pawnexus: {
          totalProviders: initialProviders.length,
          verifiedProviders: initialProviders.filter(p => p.isVerified).length,
          emergencyCenters24x7: initialProviders.filter(p => p.is24x7).length,
          citiesCovered: 5,
        },
        skillspring: {
          totalProgrammes: initialProgrammes.length,
          activeCohorts: 4,
          totalEnrolledLearners: 3910,
          averageRating: 4.92,
        },
        slidepilot: {
          totalProjects: initialProjects.length,
          approvedProjects: initialProjects.filter(p => p.status === 'Approved').length,
          draftProjects: initialProjects.filter(p => p.status === 'Draft').length,
          totalWorkflowRuns: logs.length,
        },
        system: {
          database: isDbConnected() ? 'MongoDB Connected' : 'Demo Mode (In-Memory)',
          aiEngine: ENV.OPENAI_API_KEY ? 'OpenAI GPT-4o' : 'Native Intelligent Demo Generator',
          automation: ENV.N8N_WEBHOOK_URL ? 'n8n Webhook Active' : 'Native Engine Fallback',
        },
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

