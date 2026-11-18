import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, HeartHandshake, GraduationCap, Layers, Search, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0b0f19] text-slate-400 border-t border-slate-900 pt-16 pb-12 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800/80">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white font-extrabold text-base">
                🐾
              </div>
              <span className="font-extrabold text-white text-lg tracking-tight">
                Paw<span className="text-emerald-400">zz</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Standalone digital product suite engineered by <strong>Priyanshu Singh</strong> for founder assessment.
            </p>
            <div className="flex items-center gap-2 text-emerald-400 font-medium text-xs">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>priyanshusingh22340@gmail.com</span>
            </div>
          </div>

          {/* Pawzz Links */}
          <div className="space-y-3">
            <div className="font-bold text-white uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <span>🐾 Pawzz Care Network</span>
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/pawzz" className="hover:text-white transition-colors">
                  Pawzz Homepage
                </Link>
              </li>
              <li>
                <Link to="/pawzz/search" className="hover:text-white transition-colors">
                  Find Verified Clinics & Vets
                </Link>
              </li>
              <li>
                <Link to="/pawzz/search?emergency=true" className="hover:text-rose-400 transition-colors">
                  24/7 Emergency Care Directory
                </Link>
              </li>
              <li>
                <Link to="/pawzz/search?category=Pet%20Boarding" className="hover:text-white transition-colors">
                  Pet Boarding & Daycare
                </Link>
              </li>
            </ul>
          </div>

          {/* Upwise Links */}
          <div className="space-y-3">
            <div className="font-bold text-white uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <span>🎓 Upwise Education</span>
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/upwise" className="hover:text-white transition-colors">
                  Upwise Homepage
                </Link>
              </li>
              <li>
                <a href="/upwise#programmes" className="hover:text-white transition-colors">
                  4 AI Engineering Cohorts
                </a>
              </li>
              <li>
                <a href="/upwise#pedagogy" className="hover:text-white transition-colors">
                  5-Step Learning Roadmap
                </a>
              </li>
              <li>
                <a href="/upwise#admissions-enquiry" className="hover:text-white transition-colors">
                  Admissions Enquiry
                </a>
              </li>
            </ul>
          </div>

          {/* Framewise Links */}
          <div className="space-y-3">
            <div className="font-bold text-white uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <span>🎨 Framewise Studio</span>
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/framewise" className="hover:text-white transition-colors">
                  Creative Studio
                </Link>
              </li>
              <li>
                <Link to="/framewise" className="hover:text-white transition-colors">
                  10-Slide Sample Carousel
                </Link>
              </li>
              <li>
                <Link to="/framewise" className="hover:text-white transition-colors">
                  5 Visual Design Templates
                </Link>
              </li>
              <li>
                <Link to="/framewise" className="hover:text-white transition-colors">
                  n8n Automation Pipeline
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <div>
            © 2026 Pawzz Platform Suite • Designed & Developed by <strong>Priyanshu Singh</strong>
          </div>
          <div className="flex items-center gap-6">
            <span>React + Vite</span>
            <span>Tailwind CSS</span>
            <span>Node.js + Express</span>
            <span>MongoDB</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
