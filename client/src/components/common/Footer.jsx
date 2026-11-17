import React from 'react';
import { Link } from 'react-router-dom';
import { HeartHandshake, GraduationCap, Layers, ShieldCheck, Github, ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-900 pt-16 pb-12 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-600 flex items-center justify-center text-white font-extrabold text-base">
                🐾
              </div>
              <span className="font-extrabold text-white text-lg tracking-tight">
                Paw<span className="text-emerald-500">zz</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Animal healthcare discovery, practical AI engineering cohorts, and autonomous carousel studio built by <strong>Priyanshu Singh</strong>.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium">
              <ShieldCheck className="w-4 h-4" />
              <span>Engineered by Priyanshu Singh</span>
            </div>
          </div>

          {/* PawNexus Links */}
          <div className="space-y-3">
            <div className="flex items-center gap-1.5 text-xs font-bold text-white uppercase tracking-wider">
              <HeartHandshake className="w-4 h-4 text-emerald-400" />
              <span>PawNexus</span>
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/pawnexus" className="hover:text-white transition-colors">
                  Find Veterinary Care
                </Link>
              </li>
              <li>
                <a href="#services-section" className="hover:text-white transition-colors">
                  24/7 Animal Ambulances
                </a>
              </li>
              <li>
                <a href="#services-section" className="hover:text-white transition-colors">
                  Pet Boarding & Daycare
                </a>
              </li>
              <li>
                <a href="#services-section" className="hover:text-white transition-colors">
                  Diagnostic Pathology Labs
                </a>
              </li>
              <li>
                <a href="#for-providers" className="hover:text-white transition-colors">
                  Register Your Clinic / NGO
                </a>
              </li>
            </ul>
          </div>

          {/* SkillSpring AI Links */}
          <div className="space-y-3">
            <div className="flex items-center gap-1.5 text-xs font-bold text-white uppercase tracking-wider">
              <GraduationCap className="w-4 h-4 text-indigo-400" />
              <span>SkillSpring AI</span>
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/skillspring" className="hover:text-white transition-colors">
                  Generative AI Fundamentals
                </Link>
              </li>
              <li>
                <a href="#programmes-section" className="hover:text-white transition-colors">
                  AI Automation with n8n
                </a>
              </li>
              <li>
                <a href="#programmes-section" className="hover:text-white transition-colors">
                  AI for Product Managers
                </a>
              </li>
              <li>
                <a href="#programmes-section" className="hover:text-white transition-colors">
                  Full-Stack AI Engineering
                </a>
              </li>
              <li>
                <a href="#enquire-section" className="hover:text-white transition-colors">
                  Admissions Enquiry
                </a>
              </li>
            </ul>
          </div>

          {/* SlidePilot Links */}
          <div className="space-y-3">
            <div className="flex items-center gap-1.5 text-xs font-bold text-white uppercase tracking-wider">
              <Layers className="w-4 h-4 text-amber-400" />
              <span>SlidePilot AI</span>
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/slidepilot" className="hover:text-white transition-colors">
                  Creator Dashboard
                </Link>
              </li>
              <li>
                <Link to="/slidepilot/create" className="hover:text-white transition-colors">
                  Generate Carousel
                </Link>
              </li>
              <li>
                <Link to="/slidepilot/templates" className="hover:text-white transition-colors">
                  Design Templates
                </Link>
              </li>
              <li>
                <Link to="/slidepilot/workflow" className="hover:text-white transition-colors">
                  n8n Automation Pipeline
                </Link>
              </li>
              <li>
                <Link to="/slidepilot/projects" className="hover:text-white transition-colors">
                  Export PDF & PNG
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            Built by <strong className="text-white">Priyanshu Singh</strong> (<a href="mailto:priyanshusingh22340@gmail.com" className="text-emerald-400 hover:underline">priyanshusingh22340@gmail.com</a>) • React 18, Vite, Tailwind CSS, Node.js & OpenAI.
          </div>
          <div className="flex items-center gap-4">
            <Link to="/" className="hover:text-slate-300">
              Pawzz Platform Home
            </Link>
            <span>•</span>
            <span className="text-emerald-400 font-semibold">Founder Ready</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

