import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SlidePilotNav from '../../components/slidepilot/SlidePilotNav';
import WorkflowDiagram from '../../components/slidepilot/WorkflowDiagram';
import { SlidePilotService } from '../../services/api';
import {
  FolderKanban,
  FileCheck2,
  FileClock,
  Sparkles,
  PlusCircle,
  ArrowRight,
  Zap,
  TrendingUp,
  Clock,
  CheckCircle,
  Loader2,
} from 'lucide-react';

export default function SlidePilotDashboard() {
  const [projects, setProjects] = useState([]);
  const [automationStatus, setAutomationStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const [projRes, autoRes] = await Promise.all([
          SlidePilotService.getProjects(),
          SlidePilotService.getAutomationStatus(),
        ]);
        setProjects(projRes.data || []);
        setAutomationStatus(autoRes);
      } catch (err) {
        console.warn('Dashboard fetch:', err.message);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const totalProjects = projects.length;
  const draftCount = projects.filter((p) => p.status === 'Draft' || p.status === 'In Review').length;
  const approvedCount = projects.filter((p) => p.status === 'Approved' || p.status === 'Exported').length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <SlidePilotNav />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider">
              AI CONTENT CREATION SUITE
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              SlidePilot Creator Dashboard
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Autonomous, human-governed Instagram & LinkedIn carousel creation system.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/slidepilot/create"
              className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-400 hover:to-rose-400 text-slate-950 font-bold rounded-xl text-xs transition-all shadow-md flex items-center gap-2 active:scale-95"
            >
              <Sparkles className="w-4 h-4" />
              <span>Create New Carousel</span>
            </Link>
          </div>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-slate-900/80 p-6 rounded-3xl border border-slate-800/80">
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span>Total Carousels</span>
              <FolderKanban className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-3xl font-black text-white mt-3">
              {loading ? '...' : totalProjects}
            </div>
            <div className="text-[11px] text-slate-500 mt-1">Across Instagram & LinkedIn</div>
          </div>

          <div className="bg-slate-900/80 p-6 rounded-3xl border border-slate-800/80">
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span>In Progress / Drafts</span>
              <FileClock className="w-4 h-4 text-indigo-400" />
            </div>
            <div className="text-3xl font-black text-indigo-400 mt-3">
              {loading ? '...' : draftCount}
            </div>
            <div className="text-[11px] text-slate-500 mt-1">Awaiting founder refinement</div>
          </div>

          <div className="bg-slate-900/80 p-6 rounded-3xl border border-slate-800/80">
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span>Approved & Exported</span>
              <FileCheck2 className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-3xl font-black text-emerald-400 mt-3">
              {loading ? '...' : approvedCount}
            </div>
            <div className="text-[11px] text-slate-500 mt-1">Ready for public broadcast</div>
          </div>

          <div className="bg-slate-900/80 p-6 rounded-3xl border border-slate-800/80">
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span>Automation Engine</span>
              <Zap className="w-4 h-4 text-rose-400" />
            </div>
            <div className="flex items-center gap-2 mt-3">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-base font-bold text-white">Active (Hybrid)</span>
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              {automationStatus?.n8nConfigured ? 'n8n Connected' : 'Native Webhook Engine'}
            </div>
          </div>
        </div>

        {/* Visual Architecture Diagram */}
        <WorkflowDiagram />

        {/* Recent Projects Table */}
        <div className="bg-slate-900/70 rounded-3xl border border-slate-800 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base text-white">Recent Carousel Projects</h3>
            <Link
              to="/slidepilot/projects"
              className="text-xs font-bold text-amber-400 hover:underline flex items-center gap-1"
            >
              <span>View All Projects</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {loading ? (
            <div className="py-12 text-center text-xs text-slate-400">
              <Loader2 className="w-6 h-6 animate-spin text-amber-500 mx-auto mb-2" />
              Loading projects...
            </div>
          ) : projects.length === 0 ? (
            <div className="py-12 text-center text-xs text-slate-500">
              No carousel projects found. Click "Create New Carousel" to start!
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="pb-3 font-semibold">Title</th>
                    <th className="pb-3 font-semibold">Platform</th>
                    <th className="pb-3 font-semibold">Template</th>
                    <th className="pb-3 font-semibold">Slides</th>
                    <th className="pb-3 font-semibold">Approval Status</th>
                    <th className="pb-3 font-semibold text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {projects.slice(0, 5).map((p) => (
                    <tr key={p.id || p._id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="py-3.5 font-bold text-white max-w-xs truncate pr-4">
                        {p.title}
                      </td>
                      <td className="py-3.5 text-slate-300">{p.platform}</td>
                      <td className="py-3.5 text-slate-400 font-mono text-[11px]">{p.template}</td>
                      <td className="py-3.5 text-slate-400">{p.slides?.length || 6}</td>
                      <td className="py-3.5">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            p.status === 'Approved' || p.status === 'Exported'
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                              : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                          }`}
                        >
                          {p.status}
                        </span>
                      </td>
                      <td className="py-3.5 text-right">
                        <Link
                          to={`/slidepilot/create?id=${p.id || p._id}`}
                          className="font-bold text-amber-400 hover:underline"
                        >
                          Open Editor →
                        </Link>
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
