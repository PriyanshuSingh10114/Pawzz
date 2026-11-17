import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { NotificationProvider } from './context/NotificationContext';
import NotificationToast from './components/common/NotificationToast';
import DemoModeBanner from './components/common/DemoModeBanner';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';

// Pages
import NexaHome from './pages/nexastudio/NexaHome';
import PawNexusHome from './pages/pawnexus/PawNexusHome';
import SkillSpringHome from './pages/skillspring/SkillSpringHome';
import SlidePilotDashboard from './pages/slidepilot/SlidePilotDashboard';
import SlidePilotCreate from './pages/slidepilot/SlidePilotCreate';
import SlidePilotProjects from './pages/slidepilot/SlidePilotProjects';
import SlidePilotTemplates from './pages/slidepilot/SlidePilotTemplates';
import SlidePilotWorkflow from './pages/slidepilot/SlidePilotWorkflow';

export default function App() {
  return (
    <NotificationProvider>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 font-sans antialiased">
          {/* Top Demo Banner */}
          <DemoModeBanner />

          {/* Unified Global Navbar with Product Switcher */}
          <Navbar />

          {/* Route Outlet */}
          <div className="flex-1">
            <Routes>
              {/* Central Launchpad */}
              <Route path="/" element={<NexaHome />} />

              {/* Product 1: PawNexus */}
              <Route path="/pawnexus" element={<PawNexusHome />} />

              {/* Product 2: SkillSpring AI */}
              <Route path="/skillspring" element={<SkillSpringHome />} />

              {/* Product 3: SlidePilot */}
              <Route path="/slidepilot" element={<SlidePilotDashboard />} />
              <Route path="/slidepilot/create" element={<SlidePilotCreate />} />
              <Route path="/slidepilot/projects" element={<SlidePilotProjects />} />
              <Route path="/slidepilot/templates" element={<SlidePilotTemplates />} />
              <Route path="/slidepilot/workflow" element={<SlidePilotWorkflow />} />

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>

          {/* Global Footer */}
          <Footer />

          {/* Floating Toast Notification Container */}
          <NotificationToast />
        </div>
      </BrowserRouter>
    </NotificationProvider>
  );
}

