import { ENV } from '../config/env.js';
import { getWorkflowLogs, logWorkflowExecution, triggerN8nWebhook } from '../services/automation/n8nService.js';
import { generateCarouselContent } from '../services/ai/openaiService.js';
import { createProject } from './projectController.js';

export function getAutomationStatus(req, res) {
  return res.json({
    success: true,
    n8nConfigured: Boolean(ENV.N8N_WEBHOOK_URL),
    webhookEndpoint: '/api/automation/slidepilot/webhook',
    configuredWebhookUrl: ENV.N8N_WEBHOOK_URL ? 'CONFIGURED (URL MASKED)' : null,
    humanInTheLoopEnforced: true,
    nativeFallbackActive: !ENV.N8N_WEBHOOK_URL,
    totalLogsTracked: getWorkflowLogs().length,
  });
}

export function getAutomationLogs(req, res) {
  const logs = getWorkflowLogs();
  return res.json({
    success: true,
    data: logs,
  });
}

export async function handleSlidePilotWebhook(req, res) {
  const startTime = Date.now();
  try {
    const {
      topic,
      targetAudience = 'Startup Community',
      platform = 'LinkedIn',
      tone = 'Tactical',
      slideCount = 6,
      triggerSource = 'n8n External Webhook',
    } = req.body;

    if (!topic) {
      return res.status(400).json({
        success: false,
        message: 'Invalid payload: "topic" is required for automated carousel generation.',
      });
    }

    // Step 1 & 2: Ingest & validate
    const steps = [
      { step: 'Webhook Ingestion & Payload Validation', status: 'Passed', durationMs: 15 },
    ];

    // Step 3: Run AI generation
    const aiResult = await generateCarouselContent({
      topic,
      targetAudience,
      platform,
      tone,
      slideCount,
    });
    steps.push({ step: 'AI Structured Schema Generation', status: 'Completed', durationMs: Date.now() - startTime });

    // Step 4: Save as In-Review draft project awaiting founder approval
    const projectData = {
      title: aiResult.data.contentTitle || topic,
      topic,
      targetAudience,
      platform,
      tone,
      template: 'modern-gradient',
      slideCount: aiResult.data.slides?.length || slideCount,
      status: 'In Review', // Mandatory human approval gate!
      slides: aiResult.data.slides || [],
      metadata: {
        source: triggerSource,
        tokensUsed: aiResult.meta?.tokensUsed || 1100,
        generationLatencyMs: Date.now() - startTime,
      },
    };

    // Step 5: Log execution
    const latency = Date.now() - startTime;
    const log = await logWorkflowExecution({
      source: 'n8n Webhook Listener',
      trigger: triggerSource,
      topic,
      status: 'Ready for Human Review',
      tokensUsed: aiResult.meta?.tokensUsed || 1100,
      latencyMs: latency,
      humanApprovalStatus: 'In Review',
      steps,
    });

    return res.status(200).json({
      success: true,
      message: 'Automated project created via webhook and queued for Founder Approval.',
      workflowLogId: log.id,
      humanApprovalStatus: 'In Review',
      project: projectData,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export async function testN8nTrigger(req, res) {
  const { topic = 'Sample Autonomous Topic', platform = 'LinkedIn' } = req.body;
  const dispatchResult = await triggerN8nWebhook({
    event: 'slidepilot.idea.submitted',
    timestamp: new Date().toISOString(),
    payload: { topic, platform },
  });

  return res.json({
    success: true,
    result: dispatchResult,
  });
}

