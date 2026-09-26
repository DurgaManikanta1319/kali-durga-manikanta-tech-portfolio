import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#030712] text-white py-16 px-6 md:px-12 border-t border-white/10 select-none relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col space-y-12">
        
        {/* Top Section: Brand & Quick Links */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 pb-12 border-b border-white/10">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute -inset-1 rounded-full bg-cyan-500/20 blur-md"></div>
              <img 
                src="/logo.png" 
                alt="Kali Durga Manikanta Logo" 
                className="relative w-12 h-12 rounded-full object-cover border border-cyan-400/50 shadow-[0_0_15px_rgba(0,180,255,0.6)]" 
              />
            </div>
            <div className="space-y-0.5">
              <div className="text-xl md:text-2xl font-black text-white tracking-tight flex items-center gap-2 drop-shadow">
                KALI DURGA MANIKANTA
              </div>
              <p className="text-xs font-mono text-cyan-400 font-semibold tracking-widest uppercase">
                TECH PORTFOLIO &bull; SRM UNIVERSITY-AP
              </p>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <nav className="flex flex-wrap gap-6 md:gap-8 text-xs font-mono uppercase tracking-widest text-white/70">
            <a href="#home" className="hover:text-cyan-400 transition-colors">Home</a>
            <a href="#about" className="hover:text-cyan-400 transition-colors">About</a>
            <a href="#expertise" className="hover:text-cyan-400 transition-colors">Expertise</a>
            <a href="#skills" className="hover:text-cyan-400 transition-colors">Skills</a>
            <a href="#projects" className="hover:text-cyan-400 transition-colors">Projects</a>
            <a href="#contact" className="hover:text-cyan-400 transition-colors">Contact</a>
          </nav>
        </div>

        {/* Middle Section: Socials & External Profiles */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 text-xs font-mono text-white/60">
          <div className="flex flex-wrap items-center gap-6">
            <a 
              href="https://github.com/DurgaManikanta1319" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-cyan-400 transition-colors uppercase tracking-wider"
            >
              GitHub //
            </a>
            <a 
              href="https://www.linkedin.com/in/kali-durga-manikanta/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-cyan-400 transition-colors uppercase tracking-wider"
            >
              LinkedIn //
            </a>
            <a 
              href="https://KaliDurgaManikanta.github.io" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-cyan-400 transition-colors uppercase tracking-wider"
            >
              Website //
            </a>
            <a 
              href="mailto:kdmvisuals@gmail.com" 
              className="hover:text-cyan-400 transition-colors uppercase tracking-wider"
            >
              Email //
            </a>
          </div>

          <div className="text-white/40 tracking-widest uppercase">
            LOCATION: RAVULAPALEM, ANDHRA PRADESH, INDIA
          </div>
        </div>

        {/* Bottom Copyright & Cinematic Tagline */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-6 border-t border-white/5 text-[11px] font-mono text-white/40 uppercase tracking-widest">
          <p>&copy; {new Date().getFullYear()} Kali Durga Manikanta. All Rights Reserved.</p>
          <p className="text-cyan-400/80">STREAMING CREATIVE VISUALS & TECH WORLDWIDE &bull; BUILT WITH REACT & GSAP</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;