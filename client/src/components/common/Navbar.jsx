import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Compass,
  HeartHandshake,
  GraduationCap,
  Layers,
  ChevronDown,
  Menu,
  X,
  PhoneCall,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

export default function Navbar() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productDropdownOpen, setProductDropdownOpen] = useState(false);

  const currentPath = location.pathname;

  const isPawNexus = currentPath.startsWith('/pawnexus');
  const isSkillSpring = currentPath.startsWith('/skillspring');
  const isSlidePilot = currentPath.startsWith('/slidepilot');
  const isNexaStudio = !isPawNexus && !isSkillSpring && !isSlidePilot;

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Product Switcher */}
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-600 flex items-center justify-center text-white shadow-sm font-black text-lg">
                N
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-slate-900 tracking-tight text-base leading-none">
                  Nexa<span className="text-brand-600">Studio</span>
                </span>
                <span className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase mt-0.5">
                  Product Suite
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
                  {isPawNexus
                    ? '🐾 PawNexus'
                    : isSkillSpring
                    ? '🎓 SkillSpring AI'
                    : isSlidePilot
                    ? '🎨 SlidePilot'
                    : '⚡ Suite Hub'}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
              </button>

              {productDropdownOpen && (
                <div
                  className="absolute left-0 mt-2 w-64 bg-white rounded-2xl shadow-premium border border-slate-200 p-2 z-50 animate-fade-in"
                  onClick={() => setProductDropdownOpen(false)}
                >
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 py-1.5">
                    NexaStudio Products
                  </div>
                  <Link
                    to="/"
                    className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700 group-hover:bg-brand-50 group-hover:text-brand-600">
                      <Compass className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">NexaStudio Central</div>
                      <div className="text-[11px] text-slate-500">Executive hub & metrics</div>
                    </div>
                  </Link>
                  <Link
                    to="/pawnexus"
                    className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-emerald-50/50 transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-emerald-100/60 flex items-center justify-center text-emerald-700">
                      <HeartHandshake className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">PawNexus</div>
                      <div className="text-[11px] text-slate-500">Animal healthcare discovery</div>
                    </div>
                  </Link>
                  <Link
                    to="/skillspring"
                    className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-indigo-50/50 transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-indigo-100/60 flex items-center justify-center text-indigo-700">
                      <GraduationCap className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">SkillSpring AI</div>
                      <div className="text-[11px] text-slate-500">Practical AI education</div>
                    </div>
                  </Link>
                  <Link
                    to="/slidepilot"
                    className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-amber-50/50 transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-amber-100/60 flex items-center justify-center text-amber-700">
                      <Layers className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">SlidePilot</div>
                      <div className="text-[11px] text-slate-500">AI carousel creation & n8n</div>
                    </div>
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Contextual Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            {isPawNexus && (
              <>
                <Link to="/pawnexus" className="hover:text-emerald-600 transition-colors">
                  Home
                </Link>
                <a href="#services-section" className="hover:text-emerald-600 transition-colors">
                  Explore Services
                </a>
                <a href="#providers-section" className="hover:text-emerald-600 transition-colors">
                  Verified Providers
                </a>
                <a href="#how-it-works" className="hover:text-emerald-600 transition-colors">
                  How It Works
                </a>
                <a href="#for-providers" className="hover:text-emerald-600 transition-colors">
                  For Providers
                </a>
              </>
            )}

            {isSkillSpring && (
              <>
                <Link to="/skillspring" className="hover:text-indigo-600 transition-colors">
                  Home
                </Link>
                <a href="#programmes-section" className="hover:text-indigo-600 transition-colors">
                  Programmes
                </a>
                <a href="#why-us" className="hover:text-indigo-600 transition-colors">
                  Why Learn With Us
                </a>
                <a href="#curriculum-approach" className="hover:text-indigo-600 transition-colors">
                  Learning Approach
                </a>
                <a href="#faq" className="hover:text-indigo-600 transition-colors">
                  FAQs
                </a>
              </>
            )}

            {isSlidePilot && (
              <>
                <Link to="/slidepilot" className="hover:text-slate-900 transition-colors">
                  Overview
                </Link>
                <Link to="/slidepilot/create" className="hover:text-slate-900 transition-colors">
                  Create Carousel
                </Link>
                <Link to="/slidepilot/projects" className="hover:text-slate-900 transition-colors">
                  My Projects
                </Link>
                <Link to="/slidepilot/templates" className="hover:text-slate-900 transition-colors">
                  Design Templates
                </Link>
                <Link to="/slidepilot/workflow" className="hover:text-slate-900 transition-colors">
                  Automation & n8n
                </Link>
              </>
            )}

            {isNexaStudio && (
              <>
                <a href="#products-section" className="hover:text-brand-600 transition-colors">
                  The Three Products
                </a>
                <a href="#architecture-section" className="hover:text-brand-600 transition-colors">
                  Architecture & Stack
                </a>
                <a href="#founder-assessment" className="hover:text-brand-600 transition-colors">
                  Founder Assessment
                </a>
              </>
            )}
          </nav>

          {/* Action CTAs */}
          <div className="hidden md:flex items-center gap-3">
            {isPawNexus && (
              <>
                <a
                  href="#providers-section"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl text-xs transition-colors shadow-sm flex items-center gap-1.5"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Find a Vet</span>
                </a>
              </>
            )}

            {isSkillSpring && (
              <>
                <a
                  href="#enquire-section"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-xs transition-colors shadow-sm flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Enquire Now</span>
                </a>
              </>
            )}

            {isSlidePilot && (
              <>
                <Link
                  to="/slidepilot/create"
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl text-xs transition-colors shadow-sm flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>New Carousel</span>
                </Link>
              </>
            )}

            {isNexaStudio && (
              <>
                <Link
                  to="/pawnexus"
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl text-xs transition-colors shadow-sm flex items-center gap-1.5"
                >
                  <span>Explore Suite</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </>
            )}
          </div>

          {/* Mobile hamburger button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
            Navigate
          </div>
          {isPawNexus && (
            <div className="flex flex-col gap-2 text-sm font-medium text-slate-700">
              <Link to="/pawnexus" onClick={() => setMobileMenuOpen(false)}>
                Home
              </Link>
              <a href="#services-section" onClick={() => setMobileMenuOpen(false)}>
                Explore Services
              </a>
              <a href="#providers-section" onClick={() => setMobileMenuOpen(false)}>
                Verified Providers
              </a>
              <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)}>
                How It Works
              </a>
              <a
                href="#providers-section"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-2 text-center py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold"
              >
                Find a Vet
              </a>
            </div>
          )}

          {isSkillSpring && (
            <div className="flex flex-col gap-2 text-sm font-medium text-slate-700">
              <Link to="/skillspring" onClick={() => setMobileMenuOpen(false)}>
                Home
              </Link>
              <a href="#programmes-section" onClick={() => setMobileMenuOpen(false)}>
                Programmes
              </a>
              <a href="#why-us" onClick={() => setMobileMenuOpen(false)}>
                Why Learn With Us
              </a>
              <a href="#faq" onClick={() => setMobileMenuOpen(false)}>
                FAQs
              </a>
              <a
                href="#enquire-section"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-2 text-center py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold"
              >
                Enquire Now
              </a>
            </div>
          )}

          {isSlidePilot && (
            <div className="flex flex-col gap-2 text-sm font-medium text-slate-700">
              <Link to="/slidepilot" onClick={() => setMobileMenuOpen(false)}>
                Overview
              </Link>
              <Link to="/slidepilot/create" onClick={() => setMobileMenuOpen(false)}>
                Create Carousel
              </Link>
              <Link to="/slidepilot/projects" onClick={() => setMobileMenuOpen(false)}>
                My Projects
              </Link>
              <Link to="/slidepilot/templates" onClick={() => setMobileMenuOpen(false)}>
                Design Templates
              </Link>
              <Link to="/slidepilot/workflow" onClick={() => setMobileMenuOpen(false)}>
                Automation & n8n
              </Link>
            </div>
          )}

          {isNexaStudio && (
            <div className="flex flex-col gap-2 text-sm font-medium text-slate-700">
              <Link to="/pawnexus" onClick={() => setMobileMenuOpen(false)}>
                🐾 PawNexus Discovery
              </Link>
              <Link to="/skillspring" onClick={() => setMobileMenuOpen(false)}>
                🎓 SkillSpring AI Academy
              </Link>
              <Link to="/slidepilot" onClick={() => setMobileMenuOpen(false)}>
                🎨 SlidePilot Automation
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}

