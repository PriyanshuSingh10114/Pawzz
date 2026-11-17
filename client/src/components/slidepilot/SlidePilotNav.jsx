import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Sparkles,
  FolderKanban,
  Palette,
  Workflow,
  PlusCircle,
} from 'lucide-react';

export default function SlidePilotNav() {
  const location = useLocation();
  const path = location.pathname;

  const links = [
    { to: '/slidepilot', label: 'Overview', icon: LayoutDashboard },
    { to: '/slidepilot/create', label: 'Create Carousel', icon: Sparkles },
    { to: '/slidepilot/projects', label: 'My Projects', icon: FolderKanban },
    { to: '/slidepilot/templates', label: 'Design Templates', icon: Palette },
    { to: '/slidepilot/workflow', label: 'Workflow & n8n', icon: Workflow },
  ];

  return (
    <div className="bg-slate-900 border-b border-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 overflow-x-auto">
          <div className="flex items-center gap-1 sm:gap-2">
            {links.map((link) => {
              const Icon = link.icon;
              const isActive = path === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                    isActive
                      ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </div>

          <div className="hidden sm:flex items-center gap-3">
            <Link
              to="/slidepilot/create"
              className="px-3.5 py-1.5 bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-400 hover:to-rose-400 text-slate-950 font-bold rounded-xl text-xs transition-all shadow-sm flex items-center gap-1.5"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>New Carousel</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
