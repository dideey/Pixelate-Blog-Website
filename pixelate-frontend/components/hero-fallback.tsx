// components/hero-fallback.tsx
"use client";

import React from "react";

export default function HeroFallback() {
  return (
    <div className="absolute inset-0 z-0 opacity-90 bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center">
      <div className="w-32 h-32 rounded-full bg-blue-500 animate-pulse" />
    </div>
  );
}