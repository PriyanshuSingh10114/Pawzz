import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { NotificationProvider } from './context/NotificationContext';
import NotificationToast from './components/common/NotificationToast';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';

// Pages
import RootPortal from './pages/RootPortal';
import PawzzHome from './pages/pawzz/PawzzHome';
import PawzzSearch from './pages/pawzz/PawzzSearch';
import UpwiseHome from './pages/upwise/UpwiseHome';
import FramewiseStudio from './pages/framewise/FramewiseStudio';

export default function App() {
  return (
    <NotificationProvider>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 font-sans antialiased selection:bg-emerald-600 selection:text-white">
          {/* Unified Global Navbar with Product Switcher */}
          <Navbar />

          {/* Route Outlet */}
          <div className="flex-1">
            <Routes>
              {/* Central Launchpad / Product Switcher */}
              <Route path="/" element={<RootPortal />} />

              {/* Product 1: Pawzz (Animal Healthcare Discovery) */}
              <Route path="/pawzz" element={<PawzzHome />} />
              <Route path="/pawzz/search" element={<PawzzSearch />} />

              {/* Product 2: Upwise (Practical AI Education) */}
              <Route path="/upwise" element={<UpwiseHome />} />

              {/* Product 3: Framewise (Social Carousel Studio) */}
              <Route path="/framewise" element={<FramewiseStudio />} />

              {/* Backward compatibility aliases */}
              <Route path="/pawnexus" element={<Navigate to="/pawzz" replace />} />
              <Route path="/skillspring" element={<Navigate to="/upwise" replace />} />
              <Route path="/slidepilot/*" element={<Navigate to="/framewise" replace />} />

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
