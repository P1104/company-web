"use client";
import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText as GSAPSplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';
import Image from 'next/image';
import { CheckCircle, Plus } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger, GSAPSplitText);

export interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  ease?: string | ((t: number) => number);
  splitType?: 'chars' | 'words' | 'lines' | 'words, chars';
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  threshold?: number;
  rootMargin?: string;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  textAlign?: React.CSSProperties['textAlign'];
  onLetterAnimationComplete?: () => void;
}

const SplitText: React.FC<SplitTextProps> = ({
  text,
  className = 'mb-10',
  delay = 100,
  duration = 5,
  ease = 'power3.out',
  splitType = 'chars',
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = '-100px',
  tag = 'p',
  onLetterAnimationComplete
}) => {
  const ref = useRef<HTMLElement>(null);
  const animationCompletedRef = useRef(false);
  const [fontsLoaded, setFontsLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (document.fonts.status === 'loaded') {
      setFontsLoaded(true);
    } else {
      document.fonts.ready.then(() => {
        setFontsLoaded(true);
      });
    }
  }, []);

  useGSAP(
    () => {
      if (!ref.current || !text || !fontsLoaded) return;
      const el = ref.current as HTMLElement & {
        _rbsplitInstance?: GSAPSplitText;
      };

      if (el._rbsplitInstance) {
        try {
          el._rbsplitInstance.revert();
        } catch {
          // Error caught and handled
        }
        el._rbsplitInstance = undefined;
      }

      const startPct = (1 - threshold) * 100;
      const marginMatch = /^(-?\d+(?:\.\d+)?)(px|em|rem|%)?$/.exec(rootMargin);
      const marginValue = marginMatch ? parseFloat(marginMatch[1]) : 0;
      const marginUnit = marginMatch ? marginMatch[2] || 'px' : 'px';
      const sign =
        marginValue === 0
          ? ''
          : marginValue < 0
            ? `-=${Math.abs(marginValue)}${marginUnit}`
            : `+=${marginValue}${marginUnit}`;
      const start = `top ${startPct}%${sign}`;
      
      let targets: Element[] = [];
      const assignTargets = (self: GSAPSplitText) => {
        if (splitType.includes('chars') && (self as GSAPSplitText).chars?.length)
          targets = (self as GSAPSplitText).chars;
        if (!targets.length && splitType.includes('words') && self.words.length) targets = self.words;
        if (!targets.length && splitType.includes('lines') && self.lines.length) targets = self.lines;
        if (!targets.length) targets = self.chars || self.words || self.lines;
      };

      const splitInstance = new GSAPSplitText(el, {
        type: splitType,
        smartWrap: true,
        autoSplit: splitType === 'lines',
        linesClass: 'split-line',
        wordsClass: 'split-word',
        charsClass: 'split-char',
        reduceWhiteSpace: false,
        onSplit: (self: GSAPSplitText) => {
          assignTargets(self);
          return gsap.fromTo(
            targets,
            { ...from },
            {
              ...to,
              duration,
              ease,
              stagger: delay / 1000,
              scrollTrigger: {
                trigger: el,
                start,
                once: true,
                fastScrollEnd: true,
                anticipatePin: 0.4
              },
              onComplete: () => {
                animationCompletedRef.current = true;
                onLetterAnimationComplete?.();
              },
              willChange: 'transform, opacity',
              force3D: true
            }
          );
        }
      });
      
      el._rbsplitInstance = splitInstance;
      
      return () => {
        ScrollTrigger.getAll().forEach(st => {
          if (st.trigger === el) st.kill();
        });
        try {
          splitInstance.revert();
        } catch {
          // Error caught and handled
        }
        el._rbsplitInstance = undefined;
      };
    },
    {
      dependencies: [
        text,
        delay,
        duration,
        ease,
        splitType,
        JSON.stringify(from),
        JSON.stringify(to),
        threshold,
        rootMargin,
        fontsLoaded,
        onLetterAnimationComplete
      ],
      scope: ref
    }
  );

  const renderTag = () => {
    const baseClasses = `split-parent overflow-visible whitespace-normal ${className}`;
    
    switch (tag) {
      case 'h1':
        return <h1 ref={ref as React.Ref<HTMLHeadingElement>} className={baseClasses}>{text}</h1>;
      case 'h2':
        return <h2 ref={ref as React.Ref<HTMLHeadingElement>} className={baseClasses}>{text}</h2>;
      case 'h3':
        return <h3 ref={ref as React.Ref<HTMLHeadingElement>} className={baseClasses}>{text}</h3>;
      case 'h4':
        return <h4 ref={ref as React.Ref<HTMLHeadingElement>} className={baseClasses}>{text}</h4>;
      case 'h5':
        return <h5 ref={ref as React.Ref<HTMLHeadingElement>} className={baseClasses}>{text}</h5>;
      case 'h6':
        return <h6 ref={ref as React.Ref<HTMLHeadingElement>} className={baseClasses}>{text}</h6>;
      default:
        return <p ref={ref as React.Ref<HTMLParagraphElement>} className={baseClasses}>{text}</p>;
    }
  };

  return renderTag();
};

export default function HomeSectiontwo() {
  return (
    // Added 'relative' here so the absolute lines stay inside this container
    <div className="w-full bg-[#FFFAF7] p-4 md:p-8 lg:p-16 overflow-hidden font-sans text-gray-900 relative">
      
      {/* --- DECORATIVE LINES (Restored & Visible) --- */}
      <div className="absolute inset-0 pointer-events-none">
        
<div className="absolute inset-0 pointer-events-none opacity-10 z-0">
  <div className="absolute top-4 sm:top-10 left-0 w-full h-px sm:h-1 bg-gray-400"></div>
  <div className="absolute bottom-4 sm:bottom-10 left-0 w-full h-px sm:h-1 bg-gray-400"></div>
  <div className="absolute top-0 left-4 sm:left-10 h-full w-px sm:w-1 bg-gray-400"></div>
  <div className="absolute top-0 right-4 sm:right-10 h-full w-px sm:w-1 bg-gray-400"></div>
</div>

      </div>

      <div className="max-w-7xl mx-auto flex flex-col gap-12 md:gap-20 relative z-10">
        
        {/* --- HEADER SECTION --- */}
        <div>


          {/* Right Headline */}
          <div className="lg:col-span-9">
            <SplitText
              text="Our Impact Story"
              className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-center"
              delay={100}
              duration={1.5}
              splitType="words"
              tag="h2"
            />
          </div>
        </div>

        {/* --- MAIN CONTENT GRID --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
          
          {/* LEFT COLUMN: Large Image */}
          <div className="relative w-full min-h-[500px] lg:h-full rounded-3xl overflow-hidden shadow-sm">
             <Image
                width={800}
                height={1000}
                src="/anish_explain.jpg"
                alt="Team meeting and presentation"
                className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-700"
             />

          </div>

          {/* RIGHT COLUMN: Text + 2x2 Grid */}
          <div className="flex flex-col gap-8">
            
            {/* Description Text */}
            <div className="flex flex-col gap-6">
               <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center text-white shadow-inner flex-shrink-0">
                      <Image
                        width={30}
                        height={30}
                        src="/karnataka.png"
                        alt="Karnataka Government Logo"
                        className="object-contain"
                      />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">Karnataka Government</h3>
               </div>

              <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                We developed a comprehensive web application for Karnataka&apos;s state-wide 
                socio-economic survey, creating an integrated ecosystem of digital tools that 
                revolutionized data collection and enumerator training processes for millions 
                of citizens.
              </p>
            </div>

            {/* 2x2 GRID LAYOUT */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-grow">
              
              {/* Card 1 */}
              <div className="bg-white p-8 rounded-3xl shadow-sm flex flex-col justify-between h-[200px] md:h-[240px] group hover:shadow-md transition-all">
                 <div className="flex justify-between items-start">
                    <span className="text-4xl md:text-5xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                      150K+
                    </span>
                   
                 </div>
                 <div>
                    <p className="font-bold text-gray-900">Citizens Served</p>
                    <p className="text-sm text-gray-500">Across all districts</p>
                 </div>
              </div>

              {/* Card 2 */}
              <div className="bg-white p-8 rounded-3xl shadow-sm flex flex-col justify-between h-[200px] md:h-[240px] group hover:shadow-md transition-all">
                 <div className="flex justify-between items-start">
                    <span className="text-4xl md:text-5xl font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">
                      95%
                    </span>
            
                 </div>
                 <div>
                    <p className="font-bold text-gray-900">Training Completion</p>
                    <p className="text-sm text-gray-500">95,000+ Enumerators</p>
                 </div>
              </div>

              {/* Card 3 */}
              <div className="bg-white p-6 rounded-3xl shadow-sm flex flex-col justify-between h-[220px] hover:bg-blue-50 transition-colors group">
                 <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                    <CheckCircle className="w-5 h-5 text-blue-600" />
                 </div>
                 <div>
                    <h4 className="font-bold text-gray-900 mb-2">Survey Web App</h4>
                    <p className="text-sm text-gray-500 leading-snug">
                       Comprehensive platform for data collection and management across the state.
                    </p>
                 </div>
              </div>

              {/* Card 4 */}
              <div className="bg-white p-6 rounded-3xl shadow-sm flex flex-col justify-between h-[220px] hover:bg-emerald-50 transition-colors group">
                 <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-emerald-200 transition-colors">
                    <CheckCircle className="w-5 h-5 text-emerald-600" />
                 </div>
                 <div>
                    <h4 className="font-bold text-gray-900 mb-2">AI Training Bot</h4>
                    <p className="text-sm text-gray-500 leading-snug">
                       Intelligent chatbot system that trained thousands with interactive modules.
                    </p>
                 </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
