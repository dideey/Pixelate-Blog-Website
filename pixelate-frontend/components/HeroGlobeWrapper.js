"use client";

import dynamic from 'next/dynamic';

// Import HeroGlobe with no SSR to avoid server-side rendering issues
const HeroGlobe = dynamic(() => import('./hero-globe'), { 
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-blue-900 to-indigo-900">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 border-4 border-blue-400 rounded-full border-t-transparent animate-spin mb-4"></div>
        <p className="text-blue-200">Loading 3D Earth...</p>
      </div>
    </div>
  )
});

export default function HeroGlobeWrapper() {
  return <HeroGlobe />;
}