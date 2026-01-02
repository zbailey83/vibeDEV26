
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { COURSE_LEVELS, SVG_PATH } from '../constants';
import { LevelCard } from './LevelCard';

export const Roadmap: React.FC = () => {
  const roadmapRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const markerRef = useRef<SVGGElement>(null);
  const svgContainerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!pathRef.current || !markerRef.current) return;

    const ctx = gsap.context(() => {
      // Performance: Cache path length to avoid repeated calls to getTotalLength()
      const length = pathRef.current!.getTotalLength();
      
      // Set initial states for drawing animation
      gsap.set(pathRef.current, { 
        strokeDasharray: length, 
        strokeDashoffset: length 
      });

      // 1. SCROLL-DEPENDENT ANIMATIONS
      const mainTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: roadmapRef.current,
          start: "top center",
          end: "bottom center",
          scrub: 1.2, // Slightly tighter scrub for responsiveness
          pin: svgContainerRef.current,
          pinSpacing: false,
          snap: {
            snapTo: 1 / (COURSE_LEVELS.length - 1),
            duration: { min: 0.2, max: 0.5 },
            delay: 0.05,
            ease: "power3.inOut" // Snappier easing
          },
          invalidateOnRefresh: true // Handle resizing gracefully
        }
      });

      // Animate marker along path
      mainTimeline.to(markerRef.current, {
        motionPath: {
          path: pathRef.current!,
          align: pathRef.current!,
          alignOrigin: [0.5, 0.5],
          autoRotate: true,
        },
        ease: "none",
        duration: 1,
        force3D: true // GPU acceleration
      });

      // Synchronized path "filling"
      mainTimeline.to(pathRef.current, {
        strokeDashoffset: 0,
        ease: "none",
        duration: 1
      }, 0);

      // 2. AMBIENT ANIMATIONS (Independent of Scroll)
      // Optimized Data Flow: Uses a simple repeating loop
      gsap.to(".data-flow-path", {
        strokeDashoffset: -100,
        duration: 4,
        repeat: -1,
        ease: "none",
        force3D: true
      });

      // Breathing Glow: Pulsates the Gaussian Blur
      gsap.to("#path-glow feGaussianBlur", {
        stdDeviation: 6, // Reduced slightly for performance
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      // Shifting Gradient: Animates the stop colors
      gsap.to("#roadmap-gradient stop", {
        stopColor: (i) => i === 1 ? "#d946ef" : i === 0 ? "#f472b6" : "#22d3ee",
        duration: 4,
        repeat: -1,
        yoyo: true,
        stagger: {
          amount: 1,
          from: "center"
        },
        ease: "sine.inOut"
      });

      // 3. WAYPOINT ACTIVATION
      COURSE_LEVELS.forEach((_, index) => {
        const triggerPos = index / (COURSE_LEVELS.length - 1);
        
        ScrollTrigger.create({
          trigger: roadmapRef.current,
          // Exact point where the marker hits the waypoint
          start: `top+=${triggerPos * 100}% center`,
          end: `top+=${(triggerPos + 0.1) * 100}% center`,
          onToggle: ({ isActive }) => {
            if (isActive) {
              activateLevel(index);
            } else {
              deactivateLevel(index);
            }
          },
        });
      });

      const activateLevel = (index: number) => {
        gsap.to(`.level-card-${index}`, {
          opacity: 1,
          scale: 1,
          x: 0,
          filter: "blur(0px)",
          duration: 0.8,
          ease: "back.out(1.2)",
          force3D: true
        });
        gsap.to(`.waypoint-dot-${index}`, {
          backgroundColor: COURSE_LEVELS[index].color,
          scale: 1.8,
          duration: 0.4,
          boxShadow: `0 0 30px ${COURSE_LEVELS[index].color}`,
          borderColor: "#fff"
        });
      };

      const deactivateLevel = (index: number) => {
        gsap.to(`.level-card-${index}`, {
          opacity: 0.15,
          scale: 0.9,
          x: index % 2 === 0 ? -40 : 40,
          filter: "blur(4px)",
          duration: 0.6,
          force3D: true
        });
        gsap.to(`.waypoint-dot-${index}`, {
          backgroundColor: "#111",
          scale: 1,
          duration: 0.4,
          boxShadow: `0 0 0px transparent`,
          borderColor: "rgba(255,255,255,0.1)"
        });
      };
    }, roadmapRef);

    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={roadmapRef} 
      className="relative w-full max-w-6xl mx-auto"
      style={{ minHeight: '3200px' }} // Increased to ensure end: "bottom center" covers the last card
    >
      {/* SVG Container - High-performance Layer */}
      <div 
        ref={svgContainerRef} 
        className="absolute inset-0 flex justify-center items-start pointer-events-none z-0 overflow-visible"
        style={{ willChange: 'transform' }}
      >
        <svg 
          width="500" 
          height="2000" 
          viewBox="0 0 500 2000" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="opacity-40 overflow-visible mt-[100px]"
        >
          {/* Static Guide Layer */}
          <path 
            d={SVG_PATH}
            stroke="#111" 
            strokeWidth="8" 
            strokeLinecap="round" 
          />
          
          {/* Animated Flow Layer */}
          <path 
            className="data-flow-path"
            d={SVG_PATH}
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="2"
            strokeDasharray="15 60"
            strokeLinecap="round"
          />

          {/* Core Animated Path */}
          <path 
            ref={pathRef}
            d={SVG_PATH}
            stroke="url(#roadmap-gradient)" 
            strokeWidth="5" 
            strokeLinecap="round" 
            filter="url(#path-glow)"
            style={{ willChange: 'stroke-dashoffset' }}
          />
          
          <defs>
            <linearGradient id="roadmap-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ec4899" />
              <stop offset="50%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#22d3ee" />
            </linearGradient>
            
            <filter id="path-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            
            <filter id="marker-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="5" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Marker Group */}
          <g ref={markerRef} style={{ willChange: 'transform' }}>
            <circle r="10" fill="white" filter="url(#marker-glow)" />
            <circle r="20" fill="white" fillOpacity="0.05" stroke="white" strokeWidth="0.5" strokeDasharray="3 2" />
            <path d="M -25 0 L 25 0 M 0 -25 L 0 25" stroke="white" strokeWidth="0.5" opacity="0.15" />
          </g>
        </svg>
      </div>

      {/* Content Layer */}
      <div className="relative z-10 w-full h-full">
        {COURSE_LEVELS.map((level, index) => {
          // Precisely align cards with SVG waypoints (Y=100, 700, 1300, 1900)
          const waypointY = 100 + index * 600;
          return (
            <div 
              key={level.id}
              ref={el => { cardsRef.current[index] = el; }}
              style={{ 
                position: 'absolute', 
                top: `${waypointY}px`, 
                left: 0, 
                width: '100%',
                willChange: 'transform, opacity' 
              }}
              className={`flex items-center px-6 md:px-12 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
            >
              <div className={`w-full md:w-[45%] ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                <LevelCard level={level} index={index} />
              </div>

              {/* Waypoint Visual Indicator */}
              <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center justify-center">
                 <div className={`waypoint-dot-${index} w-5 h-5 rounded-full bg-[#111] border-2 border-white/10 transition-all duration-500 z-20`}></div>
              </div>

              <div className="hidden md:block w-[45%]"></div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
