import React, { useState, useEffect } from 'react';
import SlidePilotNav from '../../components/slidepilot/SlidePilotNav';
import WorkflowDiagram from '../../components/slidepilot/WorkflowDiagram';
import { SlidePilotService } from '../../services/api';
import { useNotification } from '../../context/NotificationContext';
import {
  Workflow,
  CheckCircle2,
  Clock,
  Terminal,
  Copy,
  ExternalLink,
  Zap,
  Play,
  FileCode,
  Loader2,
  ShieldCheck,
} from 'lucide-react';

export default function SlidePilotWorkflow() {
  const { addNotification } = useNotification();
  const [statusData, setStatusData] = useState(null);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [testingTrigger, setTestingTrigger] = useState(false);
  const [testTopic, setTestTopic] = useState('5 Lessons from Building AI Autonomous Pipelines');

  const loadData = async () => {
    try {
      setLoading(true);
      const [statusRes, logsRes] = await Promise.all([
        SlidePilotService.getAutomationStatus(),
        SlidePilotService.getAutomationLogs(),
      ]);
      setStatusData(statusRes);
      setLogs(logsRes.data || []);
    } catch (err) {
      console.warn('Automation fetch error:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCopyCurl = () => {
    const curlCommand = `curl -X POST http://localhost:5000/api/automation/slidepilot/webhook \\
  -H "Content-Type: application/json" \\
  -d '{
    "topic": "5 Lessons from Building AI Autonomous Pipelines",
    "targetAudience": "Founders & Engineers",
    "platform": "LinkedIn"
  }'`;
    navigator.clipboard.writeText(curlCommand);
    addNotification('Curl command copied to clipboard!', 'success');
  };

  const handleRunTestWebhook = async () => {
    try {
      setTestingTrigger(true);
      const res = await fetch('/api/automation/slidepilot/webhook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: testTopic,
          targetAudience: 'Software Engineers & Tech Leads',
          platform: 'LinkedIn',
          triggerSource: 'Manual UI Test Trigger',
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Webhook failed');

      addNotification('Webhook processed successfully! New project queued for Human Review.', 'success');
      loadData();
    } catch (err) {
      addNotification(err.message || 'Failed to trigger test webhook', 'error');
    } finally {
      setTestingTrigger(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-20">
      <SlidePilotNav />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider">
              AUTOMATION & WEBHOOK ENGINE
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              n8n Integration & Execution Logs
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Autonomous idea ingestion with strict founder approval gates before publication.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border flex items-center gap-2 ${
                statusData?.n8nConfigured
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                  : 'bg-slate-900 border-slate-700 text-slate-300'
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  statusData?.n8nConfigured ? 'bg-emerald-400 animate-ping' : 'bg-amber-400'
                }`}
              />
              <span>
                {statusData?.n8nConfigured
                  ? 'n8n Live Webhook Linked'
                  : 'Native Autonomous Engine Active'}
              </span>
            </span>
          </div>
        </div>

        {/* Visual Architecture */}
        <WorkflowDiagram />

        {/* Interactive Webhook Simulator & Instructions Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Test Trigger Box (6 cols) */}
          <div className="lg:col-span-6 bg-slate-900 p-7 rounded-3xl border border-slate-800 space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400" />
                <span>Simulate External Webhook Intake</span>
              </h3>
              <span className="text-[10px] font-mono bg-slate-800 px-2 py-0.5 rounded text-slate-400">
                POST /api/automation/slidepilot/webhook
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Test the end-to-end webhook receiver by simulating an external event from n8n, Slack, or an RSS monitor.
            </p>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Topic Payload (Simulated)
                </label>
                <input
                  type="text"
                  value={testTopic}
                  onChange={(e) => setTestTopic(e.target.value)}
                  className="w-full p-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none"
                />
              </div>

              <button
                onClick={handleRunTestWebhook}
                disabled={testingTrigger}
                className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {testingTrigger ? (
                  <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                ) : (
                  <Play className="w-4 h-4 fill-slate-950" />
                )}
                <span>{testingTrigger ? 'Processing Ingestion...' : 'Dispatch Webhook Event'}</span>
              </button>
            </div>

            <div className="pt-4 border-t border-slate-800">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                <span className="font-mono font-bold text-[11px]">cURL Ingestion Snippet:</span>
                <button
                  onClick={handleCopyCurl}
                  className="text-amber-400 hover:underline flex items-center gap-1 font-semibold"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy cURL</span>
                </button>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-[11px] font-mono text-emerald-400 overflow-x-auto">
                <code>{`curl -X POST http://localhost:5000/api/automation/slidepilot/webhook \\
  -H "Content-Type: application/json" \\
  -d '{"topic": "5 Lessons from Building AI Pipelines", "platform": "LinkedIn"}'`}</code>
              </div>
            </div>
          </div>

          {/* Right: n8n Workflow JSON & Setup (6 cols) */}
          <div className="lg:col-span-6 bg-slate-900 p-7 rounded-3xl border border-slate-800 space-y-4 text-xs">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <FileCode className="w-4 h-4 text-indigo-400" />
                <span>n8n Workflow Export Artifact</span>
              </h3>
              <span className="text-[10px] font-mono text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded">
                automation/n8n/slidepilot-workflow.json
              </span>
            </div>

            <p className="text-slate-400 leading-relaxed">
              We have pre-bundled an official n8n workflow export ready for 1-click import into your local or cloud n8n instance.
            </p>

            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2.5">
              <div className="font-bold text-slate-200">Import Checklist:</div>
              <ol className="space-y-1.5 list-decimal pl-4 text-slate-400">
                <li>
                  Open n8n UI at <code>http://localhost:5678</code>
                </li>
                <li>
                  Click <strong>Import from File</strong> and pick{' '}
                  <code className="text-amber-400">automation/n8n/slidepilot-workflow.json</code>
                </li>
                <li>
                  Connect your OpenAI credential in the <code>gpt-4o-mini</code> node
                </li>
                <li>
                  Toggle workflow to <strong>Active</strong>
                </li>
              </ol>
            </div>

            <div className="p-3.5 bg-emerald-950/40 border border-emerald-500/30 rounded-2xl flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-white text-xs">Zero-Config Native Fallback</div>
                <p className="text-[11px] text-emerald-300 mt-0.5 leading-relaxed">
                  Even if n8n is not currently running locally, SlidePilot runs its native internal engine seamlessly so all workflows complete without failure.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Execution Logs Audit Trail */}
        <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base text-white">
              Workflow Execution Audit Log ({logs.length})
            </h3>
            <button
              onClick={loadData}
              className="text-xs text-amber-400 hover:underline font-semibold"
            >
              Refresh Logs
            </button>
          </div>

          {loading ? (
            <div className="py-12 text-center text-xs text-slate-400">
              <Loader2 className="w-6 h-6 animate-spin text-amber-500 mx-auto mb-2" />
              Loading audit logs...
            </div>
          ) : logs.length === 0 ? (
            <div className="py-8 text-center text-xs text-slate-500">
              No executions logged yet. Trigger a webhook or create a carousel to see logs.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="pb-3 font-semibold">Timestamp</th>
                    <th className="pb-3 font-semibold">Source</th>
                    <th className="pb-3 font-semibold">Topic</th>
                    <th className="pb-3 font-semibold">Tokens</th>
                    <th className="pb-3 font-semibold">Latency</th>
                    <th className="pb-3 font-semibold">Approval Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {logs.map((log) => (
                    <tr key={log.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="py-3 text-slate-400 font-mono text-[11px]">
                        {new Date(log.timestamp).toLocaleTimeString()}
                      </td>
                      <td className="py-3 text-slate-300 font-medium">{log.source}</td>
                      <td className="py-3 font-bold text-white max-w-xs truncate pr-4">
                        {log.topic}
                      </td>
                      <td className="py-3 text-slate-400 font-mono">{log.tokensUsed}</td>
                      <td className="py-3 text-slate-400 font-mono">{log.latencyMs}ms</td>
                      <td className="py-3">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            log.humanApprovalStatus === 'Approved'
                              ? 'bg-emerald-500/20 text-emerald-400'
                              : 'bg-amber-500/20 text-amber-400'
                          }`}
                        >
                          {log.humanApprovalStatus}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
