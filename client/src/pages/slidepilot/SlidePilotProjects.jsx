import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SlidePilotNav from '../../components/slidepilot/SlidePilotNav';
import { SlidePilotService } from '../../services/api';
import { useNotification } from '../../context/NotificationContext';
import {
  FolderKanban,
  Search,
  Filter,
  Trash2,
  Edit3,
  PlusCircle,
  FileDown,
  Loader2,
  Calendar,
} from 'lucide-react';

export default function SlidePilotProjects() {
  const { addNotification } = useNotification();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('All');
  const [platformFilter, setPlatformFilter] = useState('All');
  const [search, setSearch] = useState('');

  const loadProjects = async () => {
    try {
      setLoading(true);
      const res = await SlidePilotService.getProjects({
        status: statusFilter,
        platform: platformFilter,
        search,
      });
      setProjects(res.data || []);
    } catch (err) {
      addNotification(err.message || 'Failed to load projects', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, [statusFilter, platformFilter]);

  const handleDelete = async (id, title) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      try {
        await SlidePilotService.deleteProject(id);
        setProjects(prev => prev.filter(p => (p.id || p._id) !== id));
        addNotification('Project deleted', 'info', 2000);
      } catch (err) {
        addNotification(err.message || 'Failed to delete project', 'error');
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-20">
      <SlidePilotNav />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider">
              PROJECT REPOSITORY
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              My Carousel Projects
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Browse, edit, and export saved LinkedIn and Instagram carousels.
            </p>
          </div>

          <Link
            to="/slidepilot/create"
            className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-400 hover:to-rose-400 text-slate-950 font-bold rounded-xl text-xs transition-all shadow-md flex items-center gap-2"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Create New Carousel</span>
          </Link>
        </div>

        {/* Filters */}
        <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-3 flex-1">
            <div className="flex items-center gap-2 p-2 bg-slate-950 rounded-xl border border-slate-800 w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-500 shrink-0" />
              <input
                type="text"
                placeholder="Search projects..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && loadProjects()}
                className="bg-transparent text-white placeholder-slate-500 text-xs w-full focus:outline-none"
              />
            </div>

            <div className="p-2 bg-slate-950 rounded-xl border border-slate-800">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-transparent text-slate-300 text-xs focus:outline-none cursor-pointer"
              >
                <option value="All">All Statuses</option>
                <option value="Draft">Draft</option>
                <option value="In Review">In Review</option>
                <option value="Approved">Approved</option>
                <option value="Exported">Exported</option>
              </select>
            </div>

            <div className="p-2 bg-slate-950 rounded-xl border border-slate-800">
              <select
                value={platformFilter}
                onChange={(e) => setPlatformFilter(e.target.value)}
                className="bg-transparent text-slate-300 text-xs focus:outline-none cursor-pointer"
              >
                <option value="All">All Platforms</option>
                <option value="LinkedIn">LinkedIn</option>
                <option value="Instagram">Instagram</option>
              </select>
            </div>
          </div>

          <div className="text-slate-400 text-xs font-medium">
            Found <strong className="text-white">{projects.length}</strong> projects
          </div>
        </div>

        {/* Projects Grid */}
        {loading ? (
          <div className="py-20 text-center">
            <Loader2 className="w-8 h-8 animate-spin text-amber-500 mx-auto" />
            <p className="text-xs text-slate-400 mt-2">Loading carousel projects...</p>
          </div>
        ) : projects.length === 0 ? (
          <div className="bg-slate-900 rounded-3xl p-12 text-center border border-slate-800 max-w-md mx-auto space-y-4">
            <div className="w-12 h-12 rounded-full bg-slate-800 text-slate-400 flex items-center justify-center mx-auto">
              <FolderKanban className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white">No Projects Match Criteria</h3>
            <p className="text-xs text-slate-400">
              Try adjusting your search terms or create your first AI-generated carousel deck.
            </p>
            <Link
              to="/slidepilot/create"
              className="inline-block px-4 py-2 bg-amber-500 text-slate-950 rounded-xl text-xs font-bold"
            >
              Start New Project
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((proj) => {
              const id = proj.id || proj._id;
              return (
                <div
                  key={id}
                  className="bg-slate-900 rounded-3xl border border-slate-800 p-6 flex flex-col justify-between hover:border-slate-700 transition-all duration-200 group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                        {proj.platform}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          proj.status === 'Approved' || proj.status === 'Exported'
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        }`}
                      >
                        {proj.status}
                      </span>
                    </div>

                    <h3 className="font-bold text-base text-white leading-snug line-clamp-2 group-hover:text-amber-400 transition-colors">
                      {proj.title}
                    </h3>

                    <p className="text-xs text-slate-400 line-clamp-2">
                      {proj.topic}
                    </p>

                    <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-800">
                      <span>{proj.slides?.length || 6} Slides</span>
                      <span className="font-mono">{proj.template}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-5 mt-5 border-t border-slate-800 text-xs">
                    <button
                      onClick={() => handleDelete(id, proj.title)}
                      className="text-slate-500 hover:text-rose-400 p-1.5 transition-colors"
                      title="Delete project"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <Link
                      to={`/slidepilot/create?id=${id}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-750 text-white font-bold rounded-xl transition-colors text-xs"
                    >
                      <Edit3 className="w-3.5 h-3.5 text-amber-400" />
                      <span>Open Editor</span>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
