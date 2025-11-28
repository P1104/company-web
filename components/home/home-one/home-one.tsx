"use client"; // Required for onClick events and hooks

import React from 'react';
import Navbar from '@/components/navbar/navbar';
import { useRouter } from 'next/navigation'; // Import the router hook

export default function HomeSectionOne() {
  const router = useRouter(); // Initialize the router

  return (
    <>
      {/* Note: In the App Router (app/ directory), <Head> is usually replaced by metadata export in layout.tsx or page.tsx. 
          However, if you are using the Pages router or need it here, you can keep next/head. */}
      
      {/* Main Container - Full Screen */}
      <main className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center font-sans">
        
        {/* Background Video */}
        <div className="absolute top-0 left-0 w-full h-full z-0">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/aivideo.mp4" type="video/mp4" />
          </video>

          {/* Dark Overlay */}
          <div className="absolute top-0 left-0 w-full h-full bg-black/40 mix-blend-multiply" />
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/30 via-transparent to-black/60" />
        </div>

        {/* Navbar - Positioned Absolutely at Top */}
        <div className="absolute top-6 left-0 right-0 z-50 flex justify-center">
          <Navbar />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 max-w-5xl mx-auto">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-[#FFCDB2] mb-6 uppercase drop-shadow-lg">
            Equilibrate.AI
          </h1>

          <p className="text-white text-base md:text-xl lg:text-2xl font-medium tracking-wide mb-16 max-w-3xl drop-shadow-md">
            Democratizing technology by breaking all tech barriers with AI.
          </p>

          <button 
            onClick={() => router.push('/products')} // Navigates to app/products
            className="
              group
              px-8 py-3 
              md:px-10 md:py-4
              rounded-full 
              border-2 border-white 
              text-white 
              bg-transparent 
              hover:bg-white hover:text-black 
              transition-all duration-300 ease-in-out
              font-semibold text-lg tracking-wide
              cursor-pointer
            "
          >
            Explore Products
          </button>
        </div>

      </main>
    </>
  );
}
