// src/App.jsx
import React from 'react';
import LovableBadge from './components/LovableBadge.jsx';
import DMIHeroSection from './components/Hero1.jsx';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <DMIHeroSection />
      <LovableBadge />
      {/* If you plan more sections later, add here */}
    </div>
  );
}

export default App;
