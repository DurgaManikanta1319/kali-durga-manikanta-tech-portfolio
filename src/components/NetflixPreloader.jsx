import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const MinimalPreloader = ({ onComplete }) => {
  const preloaderRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        if (onComplete) onComplete();
      }
    });

    tl.set(preloaderRef.current, { autoAlpha: 1 })
      .fromTo(
        contentRef.current,
        { scale: 0.95, opacity: 0, filter: "blur(8px)" },
        { scale: 1, opacity: 1, filter: "blur(0px)", duration: 0.8, ease: "power3.out" }
      )
      .to(contentRef.current, {
        scale: 1.05,
        opacity: 0,
        filter: "blur(10px)",
        duration: 0.4,
        ease: "power2.in",
        delay: 0.6
      })
      .to(preloaderRef.current, {
        opacity: 0,
        duration: 0.5,
        ease: "power2.inOut"
      });
  }, [onComplete]);

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 z-[9999] bg-[#030712] flex items-center justify-center select-none overflow-hidden"
    >
      {/* Ambient background glow */}
      <div className="absolute w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div ref={contentRef} className="flex flex-col items-center gap-4 relative z-10">
        {/* Glowing Logo Icon */}
        <div className="relative mb-2">
          <div className="absolute -inset-3 rounded-full bg-cyan-500/25 blur-xl animate-pulse"></div>
          <img 
            src="/logo.png" 
            alt="Kali Durga Manikanta Logo" 
            className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover border border-cyan-400/50 shadow-[0_0_30px_rgba(0,180,255,0.6)]" 
          />
        </div>

        {/* Minimal Red/Cyan Indicator Dot */}
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></div>
          <span className="text-[10px] font-mono tracking-[0.4em] text-cyan-400 uppercase">INITIALIZING EXPERIENCE</span>
        </div>

        {/* Brand Typography */}
        <h1 
          className="text-2xl md:text-4xl font-black uppercase tracking-[0.25em] text-white text-center drop-shadow-[0_0_20px_rgba(0,180,255,0.5)]"
          style={{ fontFamily: "'Bebas Neue', 'Impact', sans-serif" }}
        >
          KALI DURGA MANIKANTA
        </h1>
        <p className="text-xs md:text-sm font-mono tracking-[0.3em] text-white/60 uppercase">
          TECH PORTFOLIO
        </p>
      </div>
    </div>
  );
};

export default MinimalPreloader;