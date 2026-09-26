import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import pictureImg from '../assets/Portfolio/picture.png';

const Hero = () => {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);
  const glareRef = useRef(null);
  const spotlightRef = useRef(null);
  const cursorDotRef = useRef(null);
  const cursorRingRef = useRef(null);
  const contentRef = useRef(null);

  const creatorRoles = [
    'FEATURE FILM // MEDIA MANAGER HEAD',
    'ORIGINAL SERIES // GRAPHIC DESIGNER & ARTIST',
    'BLOCKBUSTER // VIDEO EDITOR & POST-PRODUCTION',
    'ACCLAIMED // DIGITAL CONTENT CREATOR'
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const card = cardRef.current;
    const content = contentRef.current;
    if (!section || !card || !content) return;

    // --- GSAP CINEMATIC ENTRANCE ANIMATION ---
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    tl.fromTo(
      section.querySelector('header'),
      { y: -60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 }
    )
    .fromTo(
      content.querySelectorAll('.hero-anim-item'),
      { y: 50, opacity: 0, filter: "blur(10px)" },
      { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.1, stagger: 0.12 },
      "-=0.7"
    )
    .fromTo(
      card,
      { scale: 0.75, opacity: 0, rotationY: 35, rotationX: -15 },
      { scale: 1, opacity: 1, rotationY: 0, rotationX: 0, duration: 1.4, ease: "back.out(1.2)" },
      "-=0.9"
    );

    // --- MOUSE PHYSICS & SPOTLIGHT TRACKING ---
    gsap.set([cursorDotRef.current, cursorRingRef.current], {
      scale: 0.5,
      opacity: 0,
      transformOrigin: "50% 50%"
    });

    const xToDot = gsap.quickTo(cursorDotRef.current, "x", { duration: 0.05, ease: "power2.out" });
    const yToDot = gsap.quickTo(cursorDotRef.current, "y", { duration: 0.05, ease: "power2.out" });
    
    const xToRing = gsap.quickTo(cursorRingRef.current, "x", { duration: 0.15, ease: "power3.out" });
    const yToRing = gsap.quickTo(cursorRingRef.current, "y", { duration: 0.15, ease: "power3.out" });

    const xTilt = gsap.quickTo(card, "rotationY", { duration: 0.4, ease: "power3.out" });
    const yTilt = gsap.quickTo(card, "rotationX", { duration: 0.4, ease: "power3.out" });
    const glareX = gsap.quickTo(glareRef.current, "x", { duration: 0.3, ease: "power2.out" });
    const glareY = gsap.quickTo(glareRef.current, "y", { duration: 0.3, ease: "power2.out" });

    const handleMouseMove = (e) => {
      const rect = section.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const dotSize = 12;
      const ringSize = 48;

      // Update Spotlight position instantly via inline style
      if (spotlightRef.current) {
        spotlightRef.current.style.transform = `translate3d(${x - 300}px, ${y - 300}px, 0)`;
      }

      // Update Custom Cursor coordinates
      xToDot(x - dotSize / 2);
      yToDot(y - dotSize / 2);
      xToRing(x - ringSize / 2);
      yToRing(y - ringSize / 2);

      // Card 3D Perspective Calculations
      const cardRect = card.getBoundingClientRect();
      const cardCenterX = cardRect.left + cardRect.width / 2 - rect.left;
      const cardCenterY = cardRect.top + cardRect.height / 2 - rect.top;

      const rotateX = -((y - cardCenterY) / (cardRect.height / 2)) * 16;
      const rotateY = ((x - cardCenterX) / (cardRect.width / 2)) * 16;

      xTilt(rotateY);
      yTilt(rotateX);

      // Holographic Glare mapping
      glareX((x - cardRect.left) - cardRect.width / 2);
      glareY((y - cardRect.top) - cardRect.height / 2);
    };

    const handleMouseEnter = () => {
      gsap.to([cursorDotRef.current, cursorRingRef.current], {
        opacity: 1,
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });
      if (spotlightRef.current) gsap.to(spotlightRef.current, { opacity: 1, duration: 0.3 });
    };

    const handleMouseLeave = () => {
      gsap.to([cursorDotRef.current, cursorRingRef.current], {
        opacity: 0,
        scale: 0.5,
        duration: 0.3,
        ease: "power2.inOut"
      });
      if (spotlightRef.current) gsap.to(spotlightRef.current, { opacity: 0, duration: 0.3 });
      xTilt(0);
      yTilt(0);
    };

    section.addEventListener("mousemove", handleMouseMove);
    section.addEventListener("mouseenter", handleMouseEnter);
    section.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      section.removeEventListener("mousemove", handleMouseMove);
      section.removeEventListener("mouseenter", handleMouseEnter);
      section.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen lg:h-screen bg-[#030712] overflow-visible lg:overflow-hidden flex flex-col justify-between select-none md:cursor-none"
    >
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marquee 35s linear infinite;
        }
      `}</style>

      {/* 1. Cinematic Background Gradient & Marquee */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#050b1a]/95 to-[#030712] z-0">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden opacity-10">
          <div className="flex whitespace-nowrap animate-marquee">
            {[...creatorRoles, ...creatorRoles].map((role, idx) => (
              <span key={idx} className="text-[14vw] font-black text-cyan-400/80 mx-8 uppercase tracking-tighter">
                {role} &bull;
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Direct Mouse Tracking Spotlight Beam (Desktop only) */}
      <div
        ref={spotlightRef}
        className="hidden md:block absolute top-0 left-0 w-[600px] h-[600px] rounded-full pointer-events-none z-10 opacity-0 blur-[90px] transition-opacity duration-300"
        style={{
          background: 'radial-gradient(circle, rgba(0,240,255,0.3) 0%, rgba(2,132,199,0.1) 40%, transparent 70%)'
        }}
      ></div>

      {/* --- NETFLIX-THEMED DEVELOPER NAVBAR --- */}
      <header className="sticky top-0 lg:absolute lg:top-0 left-0 z-50 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-3 sm:py-5 flex items-center justify-between pointer-events-auto bg-[#030712]/90 lg:bg-transparent backdrop-blur-xl lg:backdrop-blur-none border-b border-white/5 lg:border-none">
        <a href="#home" className="flex items-center gap-2.5 sm:gap-3 group">
          <div className="relative">
            <div className="absolute -inset-1 rounded-full bg-cyan-500/30 blur-md opacity-70 group-hover:opacity-100 transition-opacity"></div>
            <img 
              src="/logo.png" 
              alt="Kali Durga Manikanta Logo" 
              className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover border border-cyan-400/60 shadow-[0_0_15px_rgba(0,180,255,0.7)] group-hover:scale-105 transition-transform" 
            />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-xs sm:text-sm md:text-base font-black text-white tracking-wider flex items-center gap-1.5 drop-shadow">
              KALI DURGA MANIKANTA
            </span>
            <span className="text-[9px] sm:text-[10px] font-mono tracking-widest text-cyan-400 font-semibold uppercase">
              TECH PORTFOLIO
            </span>
          </div>
        </a>
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-xs font-mono uppercase tracking-widest text-white/80">
          <a href="#home" className="hover:text-cyan-400 transition-colors">Home</a>
          <a href="#about" className="hover:text-cyan-400 transition-colors">About</a>
          <a href="#expertise" className="hover:text-cyan-400 transition-colors">Expertise</a>
          <a href="#skills" className="hover:text-cyan-400 transition-colors">Skills</a>
          <a href="#projects" className="hover:text-cyan-400 transition-colors">Projects</a>
          <a href="#contact" className="hover:text-cyan-400 transition-colors">Contact</a>
        </nav>
        <a
          href="#contact"
          className="px-3.5 py-1.5 sm:px-5 sm:py-2 rounded bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-[11px] sm:text-xs uppercase tracking-widest transition-all duration-300 shadow-[0_0_20px_rgba(0,210,255,0.6)] hover:scale-105 active:scale-95"
        >
          Hire Me
        </a>
      </header>

      {/* 3. Main Content Layer */}
      <div ref={contentRef} className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12 h-full flex flex-col justify-between pt-6 sm:pt-10 lg:pt-28 pb-8 lg:pb-12 gap-8 lg:gap-0">
        
        {/* Top Tech Creator Badge */}
        <div className="hero-anim-item flex items-center justify-between w-full flex-wrap gap-2">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded bg-black/80 backdrop-blur-2xl border border-cyan-500/40 text-[10px] sm:text-xs font-mono uppercase tracking-widest text-white shadow-2xl">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
            <span className="text-cyan-400 font-bold tracking-wider">CREATOR & TECH INNOVATOR</span>
            <span className="text-white/40">|</span>
            <span className="text-white/80">2024 - 2028</span>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-cyan-300/70 tracking-wider">
            <span className="px-2 py-0.5 border border-cyan-500/30 rounded bg-cyan-950/40">GRAPHIC DESIGN 4K</span>
            <span className="px-2 py-0.5 border border-cyan-500/30 rounded bg-cyan-950/40">VIDEO PRODUCTION</span>
          </div>
        </div>

        {/* Main Center Cinematic Stage Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-8 lg:gap-8 my-auto">
          
          {/* Left Side: Creator Story & Description */}
          <div className="lg:col-span-5 flex flex-col items-start space-y-4 sm:space-y-5 text-left">
            
            <div className="hero-anim-item flex items-center gap-3">
              <span className="px-2.5 py-0.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-black text-xs rounded tracking-widest shadow-[0_0_20px_rgba(0,240,255,0.7)] animate-pulse">
                CREATOR
              </span>
              <span className="text-cyan-300/90 text-xs font-mono tracking-widest uppercase">Media Manager & Designer</span>
            </div>

            <h1 className="hero-anim-item text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-white leading-[0.95] drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)]">
              KALI DURGA <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-200 to-blue-500 drop-shadow-[0_0_35px_rgba(0,210,255,0.5)]">
                MANIKANTA
              </span>
            </h1>

            <div className="hero-anim-item flex flex-wrap items-center gap-2 text-xs font-mono text-cyan-300 font-bold">
              <span className="px-2 py-0.5 bg-cyan-500/10 border border-cyan-500/30 rounded text-cyan-400">CONNECT SRM AP</span>
              <span className="text-white/40">•</span>
              <span>Photoshop • Premiere Pro</span>
              <span className="text-white/40">•</span>
              <span className="text-white/70">CapCut & Canva</span>
            </div>

            <p className="hero-anim-item text-xs sm:text-sm md:text-base text-white/80 font-light leading-relaxed max-w-md drop-shadow">
              Computer Science Engineering undergraduate at SRM University-AP specializing in media management, graphic design, promotional video editing, and brand storytelling.
            </p>

            {/* Action Button Set */}
            <div className="hero-anim-item flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-2 w-full sm:w-auto">
              <a
                href="#projects"
                className="px-6 sm:px-8 py-3 sm:py-3.5 bg-gradient-to-r from-cyan-400 to-blue-600 text-slate-950 font-extrabold text-xs uppercase tracking-widest rounded hover:from-cyan-300 hover:to-blue-500 transition-all duration-300 shadow-[0_0_30px_rgba(0,210,255,0.5)] flex items-center justify-center gap-2 hover:scale-105 active:scale-95 text-center"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                View Works
              </a>
              <a
                href="#contact"
                className="px-6 sm:px-8 py-3 sm:py-3.5 bg-neutral-900/80 text-white border border-cyan-500/30 font-bold text-xs uppercase tracking-widest rounded hover:bg-cyan-950/40 hover:border-cyan-400/60 transition-all duration-300 shadow-xl backdrop-blur-md flex items-center justify-center gap-2 hover:scale-105 active:scale-95 text-center"
              >
                <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                Contact Me
              </a>
            </div>
          </div>

          {/* Center: Interactive 3D Holographic Tilt Developer Poster Frame */}
          <div className="lg:col-span-4 flex justify-center perspective-[1200px] my-4 lg:my-0">
            <div 
              ref={cardRef}
              className="relative group transform-gpu transition-transform duration-100 ease-out will-change-transform"
            >
              {/* Cinematic Cyan-Blue Neon Back Glow */}
              <div className="absolute -inset-3 bg-gradient-to-r from-cyan-500/80 via-blue-600/50 to-sky-400/30 rounded-3xl blur-3xl opacity-90 group-hover:opacity-100 animate-pulse duration-1000"></div>
              
              {/* Poster Card with Glossy Sheen */}
              <div className="relative w-[260px] sm:w-[290px] md:w-[320px] p-3 sm:p-3.5 bg-[#0a1226]/90 backdrop-blur-2xl rounded-2xl border border-cyan-400/50 shadow-[0_40px_80px_rgba(0,0,0,0.95)] overflow-hidden">
                
                {/* Dynamic Specular Glare Layer */}
                <div 
                  ref={glareRef}
                  className="absolute inset-[-50%] w-[200%] h-[200%] bg-gradient-to-tr from-transparent via-cyan-200/15 to-transparent pointer-events-none transform-gpu z-40"
                ></div>

                {/* Tech Series Tag */}
                <div className="absolute top-5 left-5 z-30 px-3 py-1 bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-mono text-[10px] font-black tracking-widest rounded shadow-xl">
                  FEATURED CREATOR
                </div>

                <img
                  src={pictureImg}
                  alt="Kali Durga Manikanta Portrait"
                  className="w-full h-[300px] sm:h-[350px] md:h-[390px] object-cover rounded-xl filter contrast-110 brightness-105 group-hover:scale-[1.02] transition-transform duration-500 border border-cyan-500/20"
                />
              </div>
            </div>
          </div>

          {/* Right Side: Technical Specs & Stack */}
          <div className="hero-anim-item lg:col-span-3 flex flex-col items-start lg:items-end space-y-4 text-left lg:text-right w-full">
            <div className="p-4 sm:p-5 bg-black/80 backdrop-blur-2xl border border-cyan-500/30 rounded-xl shadow-2xl w-full sm:max-w-xs shadow-[0_0_25px_rgba(0,180,255,0.1)]">
              <h3 className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold mb-2">Leadership & Experience</h3>
              <p className="text-xs text-white/80 leading-relaxed font-light">
                Media Manager Head at CONNECT SRM AP, Graphic Designer at Microsoft Student Community (MSC), and Freelance Video Editor.
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Cinematic Ticker */}
        <div className="hero-anim-item flex items-center justify-between text-[10px] sm:text-xs font-mono text-white/50 tracking-widest uppercase pt-4">
          <span>DESIGNED FOR HIGH ENGAGEMENT</span>
          <span className="text-cyan-400/80">[ KDM TECH PORTFOLIO &bull; 2026 ]</span>
        </div>
      </div>

      {/* 4. Ultra Pro Max Custom Precision Cursor Suite (Desktop only) */}
      <div
        ref={cursorDotRef}
        className="hidden md:block absolute top-0 left-0 z-50 pointer-events-none w-3 h-3 bg-cyan-400 rounded-full shadow-[0_0_15px_#00f0ff]"
      ></div>

      <div
        ref={cursorRingRef}
        className="hidden md:block absolute top-0 left-0 z-50 pointer-events-none w-12 h-12 border border-cyan-400/60 rounded-full flex items-center justify-center backdrop-blur-[1px] shadow-[0_0_15px_rgba(0,240,255,0.3)]"
      ></div>
    </section>
  );
};

export default Hero;