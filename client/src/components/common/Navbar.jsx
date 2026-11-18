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
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Product Switcher Dropdown */}
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-600 flex items-center justify-center text-white shadow-sm font-black text-lg">
                🐾
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-slate-900 tracking-tight text-base leading-none">
                  Paw<span className="text-emerald-600">zz</span>
                </span>
                <span className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase mt-0.5">
                  Founder Suite
                </span>
              </div>
            </Link>

            {/* Product Switcher Dropdown */}
            <div className="relative">
              <button
                onClick={() => setProductDropdownOpen(!productDropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200/80 text-slate-700 transition-colors"
              >
                <span>
                  {isPawzz
                    ? '🐾 Pawzz (Animal Health)'
                    : isUpwise
                    ? '🎓 Upwise (AI Education)'
                    : isFramewise
                    ? '🎨 Framewise (Carousel Studio)'
                    : '⚡ Select Product'}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {productDropdownOpen && (
                <div
                  className="absolute left-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 animate-fade-in text-xs"
                  onClick={() => setProductDropdownOpen(false)}
                >
                  <div className="px-4 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Switch Deliverable
                  </div>

                  <Link
                    to="/pawzz"
                    className="flex items-start gap-3 px-4 py-2.5 hover:bg-slate-50 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 font-bold">
                      🐾
                    </div>
                    <div>
                      <div className="font-bold text-slate-900">Pawzz</div>
                      <div className="text-[11px] text-slate-500">Animal healthcare discovery</div>
                    </div>
                  </Link>

                  <Link
                    to="/upwise"
                    className="flex items-start gap-3 px-4 py-2.5 hover:bg-slate-50 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 font-bold">
                      🎓
                    </div>
                    <div>
                      <div className="font-bold text-slate-900">Upwise</div>
                      <div className="text-[11px] text-slate-500">Practical AI engineering cohorts</div>
                    </div>
                  </Link>

                  <Link
                    to="/framewise"
                    className="flex items-start gap-3 px-4 py-2.5 hover:bg-slate-50 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center shrink-0 font-bold">
                      🎨
                    </div>
                    <div>
                      <div className="font-bold text-slate-900">Framewise</div>
                      <div className="text-[11px] text-slate-500">Social carousel creation studio</div>
                    </div>
                  </Link>

                  <div className="border-t border-slate-100 my-1 pt-1">
                    <Link
                      to="/"
                      className="block px-4 py-1.5 text-[11px] font-semibold text-slate-500 hover:text-slate-800"
                    >
                      ← Back to Product Switcher
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 text-xs font-semibold text-slate-600">
            <Link
              to="/pawzz"
              className={`px-3 py-2 rounded-xl transition-colors ${
                isPawzz
                  ? 'bg-emerald-50 text-emerald-800 font-bold'
                  : 'hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Pawzz (Care)
            </Link>

            <Link
              to="/pawzz/search"
              className="px-3 py-2 rounded-xl transition-colors hover:text-slate-900 hover:bg-slate-50 text-slate-500 flex items-center gap-1"
            >
              <Search className="w-3 h-3 text-slate-400" />
              <span>Search Directory</span>
            </Link>

            <Link
              to="/upwise"
              className={`px-3 py-2 rounded-xl transition-colors ${
                isUpwise
                  ? 'bg-amber-50 text-amber-800 font-bold'
                  : 'hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Upwise (Cohorts)
            </Link>

            <Link
              to="/framewise"
              className={`px-3 py-2 rounded-xl transition-colors ${
                isFramewise
                  ? 'bg-indigo-50 text-indigo-800 font-bold'
                  : 'hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Framewise (Carousel)
            </Link>
          </nav>

          {/* Right Action CTA */}
          <div className="hidden sm:flex items-center gap-3">
            {isPawzz && (
              <Link
                to="/pawzz/search?emergency=true"
                className="px-3 py-1.5 rounded-xl bg-rose-50 text-rose-700 font-bold text-xs border border-rose-200 hover:bg-rose-100 transition-colors flex items-center gap-1.5"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>24/7 ICU Care</span>
              </Link>
            )}

            {isUpwise && (
              <a
                href="#admissions-enquiry"
                className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs transition-colors shadow-xs"
              >
                Apply for Cohort
              </a>
            )}

            {isFramewise && (
              <Link
                to="/framewise"
                className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs transition-colors shadow-xs"
              >
                Open Studio
              </Link>
            )}

            {isRoot && (
              <Link
                to="/pawzz"
                className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs transition-colors shadow-xs"
              >
                Start with Pawzz
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
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-5 space-y-3 text-xs animate-fade-in">
          <div className="font-bold text-slate-400 uppercase text-[10px] tracking-wider mb-1">
            Product Switcher
          </div>
          <Link
            to="/pawzz"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50 text-emerald-800 font-bold"
          >
            <span>🐾 Pawzz (Animal Healthcare)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            to="/pawzz/search"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 text-slate-700 font-semibold pl-6"
          >
            <span>Search & Filter Directory</span>
            <Search className="w-3.5 h-3.5 text-slate-400" />
          </Link>
          <Link
            to="/upwise"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between p-2.5 rounded-xl bg-amber-50 text-amber-800 font-bold"
          >
            <span>🎓 Upwise (AI Education)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            to="/framewise"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between p-2.5 rounded-xl bg-indigo-50 text-indigo-800 font-bold"
          >
            <span>🎨 Framewise (Carousel Studio)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}
    </header>
  );
}
