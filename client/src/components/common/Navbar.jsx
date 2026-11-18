import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  HeartHandshake,
  GraduationCap,
  Layers,
  ChevronDown,
  Menu,
  X,
  PhoneCall,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Search,
  ExternalLink,
} from 'lucide-react';

export default function Navbar() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productDropdownOpen, setProductDropdownOpen] = useState(false);

  const currentPath = location.pathname;

  const isPawzz = currentPath.startsWith('/pawzz') || currentPath.startsWith('/pawnexus');
  const isUpwise = currentPath.startsWith('/upwise') || currentPath.startsWith('/skillspring');
  const isFramewise = currentPath.startsWith('/framewise') || currentPath.startsWith('/slidepilot');
  const isRoot = !isPawzz && !isUpwise && !isFramewise;

  return (
    <header className="sticky top-0 z-50 bg-white/85 backdrop-blur-xl border-b border-slate-200/70 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Product Switcher Dropdown */}
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-emerald-600 via-emerald-500 to-teal-500 flex items-center justify-center text-white shadow-sm font-black text-lg group-hover:scale-105 transition-transform">
                🐾
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-slate-900 tracking-tight text-base leading-none">
                  Paw<span className="text-emerald-600">zz</span>
                </span>
                <span className="text-[10px] text-slate-400 font-bold tracking-wider uppercase mt-0.5">
                  Ecosystem
                </span>
              </div>
            </Link>

            {/* Product Switcher Dropdown */}
            <div className="relative">
              <button
                onClick={() => setProductDropdownOpen(!productDropdownOpen)}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-slate-100/80 hover:bg-slate-200/80 text-slate-700 transition-colors border border-slate-200/50 cursor-pointer"
              >
                <span>
                  {isPawzz
                    ? '🐾 Pawzz Healthcare'
                    : isUpwise
                    ? '🎓 Upwise Academy'
                    : isFramewise
                    ? '🎨 Framewise Studio'
                    : '✨ Products & Apps'}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {productDropdownOpen && (
                <div
                  className="absolute left-0 mt-2 w-72 bg-white rounded-3xl shadow-2xl border border-slate-200 p-2 z-50 animate-fade-in text-xs"
                  onClick={() => setProductDropdownOpen(false)}
                >
                  <div className="px-4 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Explore Ecosystem
                  </div>

                  <Link
                    to="/pawzz"
                    className="flex items-start gap-3 p-3 rounded-2xl hover:bg-emerald-50/60 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 font-bold text-sm">
                      🐾
                    </div>
                    <div>
                      <div className="font-bold text-slate-900">Pawzz Healthcare</div>
                      <div className="text-[11px] text-slate-500 leading-tight">Verified animal hospitals & clinic directory</div>
                    </div>
                  </Link>

                  <Link
                    to="/upwise"
                    className="flex items-start gap-3 p-3 rounded-2xl hover:bg-amber-50/60 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 font-bold text-sm">
                      🎓
                    </div>
                    <div>
                      <div className="font-bold text-slate-900">Upwise Academy</div>
                      <div className="text-[11px] text-slate-500 leading-tight">Project-driven AI engineering cohorts</div>
                    </div>
                  </Link>

                  <Link
                    to="/framewise"
                    className="flex items-start gap-3 p-3 rounded-2xl hover:bg-indigo-50/60 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-800 flex items-center justify-center shrink-0 font-bold text-sm">
                      🎨
                    </div>
                    <div>
                      <div className="font-bold text-slate-900">Framewise Studio</div>
                      <div className="text-[11px] text-slate-500 leading-tight">Social carousel design & publishing</div>
                    </div>
                  </Link>

                  <div className="border-t border-slate-100 my-1 pt-1">
                    <Link
                      to="/"
                      className="block px-4 py-2 text-[11px] font-semibold text-slate-500 hover:text-slate-800 rounded-xl"
                    >
                      ← Back to Ecosystem Home
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1.5 text-xs font-bold text-slate-600 bg-slate-100/70 p-1 rounded-full border border-slate-200/40">
            <Link
              to="/pawzz"
              className={`px-3.5 py-1.5 rounded-full transition-all ${
                isPawzz
                  ? 'bg-white text-emerald-800 shadow-xs font-extrabold'
                  : 'hover:text-slate-900 text-slate-600'
              }`}
            >
              Pawzz Care
            </Link>

            <Link
              to="/pawzz/search"
              className="px-3.5 py-1.5 rounded-full transition-all hover:text-slate-900 text-slate-500 flex items-center gap-1"
            >
              <Search className="w-3 h-3 text-slate-400" />
              <span>Find a Vet</span>
            </Link>

            <Link
              to="/upwise"
              className={`px-3.5 py-1.5 rounded-full transition-all ${
                isUpwise
                  ? 'bg-white text-amber-800 shadow-xs font-extrabold'
                  : 'hover:text-slate-900 text-slate-600'
              }`}
            >
              Upwise Cohorts
            </Link>

            <Link
              to="/framewise"
              className={`px-3.5 py-1.5 rounded-full transition-all ${
                isFramewise
                  ? 'bg-white text-indigo-800 shadow-xs font-extrabold'
                  : 'hover:text-slate-900 text-slate-600'
              }`}
            >
              Framewise Studio
            </Link>
          </nav>

          {/* Right Action CTA */}
          <div className="hidden sm:flex items-center gap-3">
            {isPawzz && (
              <Link
                to="/pawzz/search?emergency=true"
                className="px-3.5 py-1.5 rounded-full bg-rose-50 text-rose-700 font-extrabold text-xs border border-rose-200/80 hover:bg-rose-100 transition-colors flex items-center gap-1.5 shadow-2xs"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>24/7 ICU Care</span>
              </Link>
            )}

            {isUpwise && (
              <a
                href="#admissions-enquiry"
                className="px-4 py-2 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs transition-colors shadow-xs"
              >
                Apply for Cohort
              </a>
            )}

            {isFramewise && (
              <Link
                to="/framewise"
                className="px-4 py-2 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs transition-colors shadow-xs"
              >
                Open Studio
              </Link>
            )}

            {isRoot && (
              <Link
                to="/pawzz"
                className="px-4 py-2 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-xs transition-colors shadow-xs"
              >
                Explore Care Network
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-5 space-y-3 text-xs animate-fade-in shadow-xl">
          <div className="font-bold text-slate-400 uppercase text-[10px] tracking-wider mb-1">
            Product Switcher
          </div>
          <Link
            to="/pawzz"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between p-3 rounded-2xl bg-emerald-50 text-emerald-800 font-bold"
          >
            <span>🐾 Pawzz (Animal Healthcare)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            to="/pawzz/search"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50 text-slate-700 font-semibold pl-6"
          >
            <span>Search & Filter Directory</span>
            <Search className="w-3.5 h-3.5 text-slate-400" />
          </Link>
          <Link
            to="/upwise"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between p-3 rounded-2xl bg-amber-50 text-amber-800 font-bold"
          >
            <span>🎓 Upwise (AI Education)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            to="/framewise"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between p-3 rounded-2xl bg-indigo-50 text-indigo-800 font-bold"
          >
            <span>🎨 Framewise (Carousel Studio)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}
    </header>
  );
}
