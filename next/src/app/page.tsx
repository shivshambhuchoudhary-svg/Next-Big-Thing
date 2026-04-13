"use client";
import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { ArrowRight, Store, ExternalLink, ChevronDown, MousePointer2 } from 'lucide-react';
import dynamic from 'next/dynamic';
import Lenis from 'lenis';

// Dynamic import for the 3D map to prevent SSR issues
const DubaiMallMap = dynamic(() => import('./components/DubaiMallMap'), { 
  ssr: false,
  loading: () => <div className="h-full w-full bg-black/50 flex items-center justify-center font-mono text-xs tracking-widest text-[#D4AF37]">INITIALIZING 3D CORE...</div>
});

export default function Home() {
  const [storyData, setStoryData] = useState<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isError, setIsError] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // SMOOTH SCROLL INITIALIZATION (Lenis)
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.1,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Smoothed scroll progress for even more buttery transitions
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    fetch('/api/story')
      .then(res => {
        if (!res.ok) throw new Error("API Route Failed");
        return res.json();
      })
      .then(data => {
        setStoryData(data);
        setIsError(false);
      })
      .catch(err => {
        console.error("Story API Fetch Error:", err);
        setIsError(true);
      });
  }, []);

  useEffect(() => {
    if (!storyData?.sections) return;
    const unsubscribe = smoothProgress.on("change", (v: number) => {
      const sectionCount = storyData.sections.length;
      const index = Math.min(Math.floor(v * sectionCount), sectionCount - 1);
      setActiveIndex(index);
    });
    return () => unsubscribe();
  }, [smoothProgress, storyData]);

  if (isError) return (
    <div className="h-screen w-full bg-black flex flex-col items-center justify-center p-8 text-center">
       <div className="w-16 h-16 border-2 border-red-500/20 rounded-full flex items-center justify-center mb-6">
          <span className="text-red-500 font-bold">!</span>
       </div>
       <h2 className="text-[#D4AF37] font-black text-2xl uppercase tracking-widest mb-4">Connection Terminated</h2>
       <p className="text-white/40 font-mono text-xs">The Dubai Core could not be reached. Verify your connection or restart the Command Center.</p>
       <button onClick={() => window.location.reload()} className="mt-8 px-8 py-3 bg-[#D4AF37] text-black font-black text-[10px] tracking-[0.2em] uppercase">Re-Ignite</button>
    </div>
  );

  return (
    <main ref={containerRef} className="relative bg-[#050505] text-white selection:bg-[#D4AF37] selection:text-black">
      {!storyData ? (
        <div className="h-screen w-full bg-black flex items-center justify-center fixed inset-0 z-[100]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#D4AF37]"></div>
        </div>
      ) : (
        <>
          {/* BACKGROUND LAYER: FIXED */}
          <div className="fixed inset-0 w-full h-full z-0 pointer-events-none overflow-hidden">
            <AnimatePresence mode="wait">
              {storyData.sections.map((section: any, idx: number) => (
                idx === activeIndex && (
                  <motion.div
                    key={section.id}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 1.5, ease: [0.33, 1, 0.68, 1] }}
                    className="absolute inset-0 w-full h-full"
                  >
                    {section.bgType === 'video' && (
                      <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover filter brightness-[0.35]"
                        src={section.bgUrl}
                      />
                    )}
                    {section.bgType === 'image' && (
                      <img
                        src={section.bgUrl}
                        alt={section.title}
                        className="w-full h-full object-cover filter brightness-[0.35]"
                      />
                    )}
                    {section.bgType === 'none' && (
                      <div className="w-full h-full bg-[#050505] relative">
                         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#D4AF37]/10 via-transparent to-transparent"></div>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80"></div>
                  </motion.div>
                )
              ))}
            </AnimatePresence>
          </div>

          {/* CONTENT SECTIONS */}
          <div className="relative z-10">
            <nav className="fixed top-0 left-0 w-full px-8 py-8 flex justify-between items-center z-50">
              <div className="flex items-center space-x-3 group cursor-pointer">
                <div className="w-10 h-10 border-2 border-[#D4AF37] rounded-full flex items-center justify-center transition-all group-hover:bg-[#D4AF37]">
                  <Store className="w-5 h-5 group-hover:text-black transition-colors" />
                </div>
                <span className="font-black tracking-[0.4em] uppercase text-sm group-hover:tracking-[0.6em] transition-all">Dubai Mall</span>
              </div>
              <div className="hidden md:flex space-x-12 text-[10px] font-mono uppercase tracking-[0.5em] text-white/40">
                <span className="hover:text-[#D4AF37] cursor-pointer transition-colors">Infrastructure</span>
                <span className="hover:text-[#D4AF37] cursor-pointer transition-colors">Experience</span>
                <button className="px-8 py-2 bg-[#D4AF37] text-black font-black hover:bg-white transition-all text-[9px]">
                  LEASE NOW
                </button>
              </div>
            </nav>

            {storyData.sections.map((section: any, idx: number) => (
              <section key={section.id} className="min-h-[150vh] flex flex-col items-center justify-center px-8 relative">
                
                {/* SCROLL DOWN INDICATOR FOR HERO */}
                {idx === 0 && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.4 }}
                    transition={{ delay: 2, duration: 1 }}
                    className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-4"
                  >
                    <span className="text-[9px] font-mono uppercase tracking-[0.5em]">Scroll Down</span>
                    <motion.div 
                      animate={{ y: [0, 10, 0] }} 
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <ChevronDown className="w-4 h-4 text-[#D4AF37]" />
                    </motion.div>
                  </motion.div>
                )}

                <motion.div
                  initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 1.2, delay: 0.1, ease: "easeOut" }}
                  viewport={{ margin: "-200px" }}
                  className="text-center w-full max-w-7xl"
                >
                  <div className="mb-6 flex justify-center">
                    <div className="h-[1px] w-24 bg-[#D4AF37]/50 mt-4"></div>
                    <span className="mx-6 text-[10px] font-mono text-[#D4AF37] tracking-[1.2em] uppercase">Chapter 0{idx + 1}</span>
                    <div className="h-[1px] w-24 bg-[#D4AF37]/50 mt-4"></div>
                  </div>

                  <div className="flex flex-col items-center">
                    <h2 className="text-7xl md:text-[10rem] font-black tracking-tighter mb-8 leading-none">
                      {section.title.split(" ").map((word: string, i: number) => (
                        <span key={i} className={i % 2 !== 0 ? "text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#FFF3B0] to-[#8B732A]" : ""}>
                          {word}{" "}
                        </span>
                      ))}
                    </h2>
                    
                    <p className="text-xl md:text-3xl text-white/50 font-light italic leading-relaxed tracking-wide max-w-2xl mx-auto mb-12">
                      "{section.subtitle}"
                    </p>

                    {/* 3D MAP INTEGRATION */}
                    {section.isMap && (
                      <div className="w-full h-[700px] mt-12 mb-12 relative">
                         <DubaiMallMap />
                         <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[10px] font-mono text-[#D4AF37]/50 uppercase tracking-[0.3em] flex items-center space-x-3 bg-black/40 px-6 py-2 rounded-full backdrop-blur-md">
                            <MousePointer2 className="w-3 h-3 animate-pulse" />
                            <span>Interact to Configure zones</span>
                         </div>
                      </div>
                    )}

                    {section.metric && !section.isMap && (
                      <div className="flex flex-col items-center mt-12 group">
                        <motion.div 
                          initial={{ scale: 0.8, opacity: 0 }}
                          whileInView={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 1, delay: 0.5 }}
                          className="text-8xl md:text-[14rem] font-black text-white/10 group-hover:text-[#D4AF37]/20 transition-all duration-2000 mb-[-3rem] select-none"
                        >
                          {section.metric}
                        </motion.div>
                        <div className="text-sm font-mono uppercase tracking-[1em] text-[#D4AF37]">
                          {section.metricLabel}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>Section
              </section>
            ))}

            <section className="min-h-screen flex flex-col items-center justify-center px-8 bg-gradient-to-b from-transparent to-[#D4AF37]/10 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent"></div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5 }}
                className="text-center max-w-5xl z-10"
              >
                <h2 className="text-6xl md:text-[9rem] font-black tracking-tighter mb-8 text-white">
                  {storyData.cta.title}
                </h2>
                <p className="text-xl md:text-3xl text-white/40 mb-16 font-light italic">
                  {storyData.cta.subtitle}
                </p>
                
                <div className="flex flex-col md:flex-row justify-center space-y-6 md:space-y-0 md:space-x-8">
                  <button className="group px-16 py-8 bg-[#D4AF37] text-black font-black text-xl flex items-center justify-center hover:bg-white transition-all transform hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(212,175,55,0.3)]">
                    {storyData.cta.primaryAction}
                    <ArrowRight className="ml-4 w-8 h-8 group-hover:translate-x-2 transition-transform" />
                  </button>
                  <button className="px-16 py-8 border-2 border-white/20 rounded-none text-white font-black text-xl hover:bg-white/10 transition-all flex items-center justify-center">
                    {storyData.cta.secondaryAction}
                  </button>
                </div>
              </motion.div>

              <footer className="absolute bottom-12 left-0 right-0 text-center text-[10px] font-mono text-white/20 uppercase tracking-[1.5em]">
                Engineered for Dubai Core &bull; Simulation 0x99X &bull; Smooth Experience
              </footer>
            </section>
          </div>

          <div className="fixed bottom-12 left-12 z-50 flex flex-col space-y-6">
            {storyData.sections.map((_: any, i: number) => (
              <div 
                key={i} 
                className={`w-[2px] h-10 rounded-full transition-all duration-700 ${i === activeIndex ? 'bg-[#D4AF37] h-16 shadow-[0_0_15px_#D4AF37]' : 'bg-white/10'}`}
              />
            ))}
          </div>
        </>
      )}

      <style jsx global>{`
        html.lenis {
          height: auto;
        }
        .lenis.lenis-smooth {
          scroll-behavior: auto;
        }
        .lenis.lenis-smooth [data-lenis-prevent] {
          overscroll-behavior: contain;
        }
        .lenis.lenis-stopped {
          overflow: hidden;
        }
        .lenis.lenis-scrolling iframe {
          pointer-events: none;
        }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #D4AF37; }
        body { background: #050505; }
      `}</style>
    </main>
  );
}