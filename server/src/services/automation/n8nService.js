import { ENV } from '../../config/env.js';
import { getLocalStore, saveLocalStore } from '../../data/localStore.js';

export async function logWorkflowExecution({
  source = 'Native AI Engine',
  trigger,
  topic,
  status = 'Completed',
  tokensUsed = 0,
  latencyMs = 0,
  outputProjectId,
  humanApprovalStatus = 'Draft',
  steps = [],
}) {
  const logEntry = {
    id: `wf-log-${Date.now()}`,
    timestamp: new Date().toISOString(),
    source,
    trigger,
    topic,
    status,
    tokensUsed,
    latencyMs,
    outputProjectId,
    humanApprovalStatus,
    steps: steps.length > 0 ? steps : [
      { step: 'Validation', status: 'Passed', durationMs: 20 },
      { step: 'Processing', status: 'Completed', durationMs: latencyMs },
      { step: 'Finalization', status: 'Passed', durationMs: 15 },
    ],
  };

  const store = getLocalStore();
  store.workflowLogs.unshift(logEntry);
  if (store.workflowLogs.length > 50) store.workflowLogs.pop();
  saveLocalStore();

  return logEntry;
}

export function getWorkflowLogs() {
  const store = getLocalStore();
  return store.workflowLogs;
}

export async function triggerN8nWebhook(payload) {
  if (!ENV.N8N_WEBHOOK_URL) {
    return {
      dispatched: false,
      reason: 'No N8N_WEBHOOK_URL specified in environment. Utilizing native backend engine.',
    };
  }

  try {
    const res = await fetch(ENV.N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await res.json().catch(() => ({ status: 'received' }));
    return {
      dispatched: true,
      status: res.status,
      response: data,
    };
  } catch (error) {
    console.warn(`[n8n Webhook Error] Failed to reach ${ENV.N8N_WEBHOOK_URL}:`, error.message);
    return {
      dispatched: false,
      error: error.message,
    };
  }
}

