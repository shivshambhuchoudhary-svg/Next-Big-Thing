"use client";
import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Play, ArrowRight, Activity, Users, Store, ExternalLink } from 'lucide-react';

export default function Home() {
  const [storyData, setStoryData] = useState<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  useEffect(() => {
    fetch('/api/story')
      .then(res => res.json())
      .then(data => setStoryData(data));
  }, []);

  // Update active index based on scroll position
  useEffect(() => {
    if (!storyData?.sections) return;
    const unsubscribe = scrollYProgress.onChange(v => {
      const sectionCount = storyData.sections.length;
      const index = Math.min(Math.floor(v * sectionCount), sectionCount - 1);
      setActiveIndex(index);
    });
    return () => unsubscribe();
  }, [scrollYProgress, storyData]);

  if (!storyData) return (
    <div className="h-screen w-full bg-black flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#D4AF37]"></div>
    </div>
  );

  return (
    <main ref={containerRef} className="relative bg-black text-white selection:bg-[#D4AF37] selection:text-black">
      
      {/* BACKGROUND LAYER: FIXED */}
      <div className="fixed inset-0 w-full h-full z-0 pointer-events-none">
        <AnimatePresence mode="wait">
          {storyData.sections.map((section: any, idx: number) => (
            idx === activeIndex && (
              <motion.div
                key={section.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                className="absolute inset-0 w-full h-full"
              >
                {section.bgType === 'video' ? (
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover filter brightness-[0.4]"
                    src={section.bgUrl}
                  />
                ) : (
                  <img
                    src={section.bgUrl}
                    alt={section.title}
                    className="w-full h-full object-cover filter brightness-[0.4]"
                  />
                )}
                {/* Overlay Vignette */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80"></div>
              </motion.div>
            )
          ))}
        </AnimatePresence>
      </div>

      {/* CONTENT SECTIONS */}
      <div className="relative z-10">
        
        {/* Navigation Overlay */}
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

        {/* Narrative Flow */}
        {storyData.sections.map((section: any, idx: number) => (
          <section key={section.id} className="min-h-[150vh] flex flex-col items-center justify-center px-8 relative">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              viewport={{ margin: "-200px" }}
              className="text-center max-w-5xl"
            >
              <div className="mb-6 flex justify-center">
                 <div className="h-[1px] w-24 bg-[#D4AF37]/50 mt-4"></div>
                 <span className="mx-6 text-[10px] font-mono text-[#D4AF37] tracking-[1em] uppercase">0{idx + 1} // Dubai Core</span>
                 <div className="h-[1px] w-24 bg-[#D4AF37]/50 mt-4"></div>
              </div>

              <h2 className="text-7xl md:text-9xl font-black tracking-tighter mb-8 leading-none">
                {section.title.split(" ").map((word: string, i: number) => (
                  <span key={i} className={i % 2 !== 0 ? "text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#8B732A]" : ""}>
                    {word}{" "}
                  </span>
                ))}
              </h2>
              
              <p className="text-xl md:text-2xl text-white/50 font-light italic leading-relaxed tracking-wide max-w-2xl mx-auto mb-12">
                "{section.subtitle}"
              </p>

              {section.metric && (
                <div className="flex flex-col items-center mt-12 group">
                   <div className="text-8xl md:text-[10rem] font-black text-white/10 group-hover:text-[#D4AF37]/20 transition-all duration-1000 mb-[-2rem] select-none">
                      {section.metric}
                   </div>
                   <div className="text-sm font-mono uppercase tracking-[1em] text-[#D4AF37]">
                      {section.metricLabel}
                   </div>
                </div>
              )}
            </motion.div>
          </section>
        ))}

        {/* THE CLIMAX: CTA Section */}
        <section className="min-h-screen flex flex-col items-center justify-center px-8 bg-gradient-to-b from-transparent to-[#D4AF37]/5 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent"></div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="text-center max-w-4xl z-10"
          >
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 text-white">
               {storyData.cta.title}
            </h2>
            <p className="text-xl md:text-2xl text-white/40 mb-16 font-light italic">
              {storyData.cta.subtitle}
            </p>
            
            <div className="flex flex-col md:flex-row justify-center space-y-6 md:space-y-0 md:space-x-8">
              <button className="group px-12 py-6 bg-[#D4AF37] text-black font-black text-xl flex items-center justify-center hover:bg-white transition-all transform hover:scale-105 active:scale-95">
                {storyData.cta.primaryAction}
                <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </button>
              <button className="px-12 py-6 border-2 border-white/20 rounded-none text-white font-black text-xl hover:bg-white/10 transition-all flex items-center justify-center">
                {storyData.cta.secondaryAction}
                <ExternalLink className="ml-3 w-5 h-5 text-white/30" />
              </button>
            </div>
          </motion.div>

          <footer className="absolute bottom-12 left-0 right-0 text-center text-[10px] font-mono text-white/20 uppercase tracking-[1.5em]">
             Built for Dubai Core &bull; Story v3.0 &bull; Cinematic Experience
          </footer>
        </section>
      </div>

      {/* FIXED UI ELEMENTS */}
      <div className="fixed bottom-12 left-12 z-50 flex flex-col space-y-4">
        {storyData.sections.map((_: any, i: number) => (
          <div 
            key={i} 
            className={`w-1 h-8 rounded-full transition-all duration-500 ${i === activeIndex ? 'bg-[#D4AF37] h-12 shadow-[0_0_10px_#D4AF37]' : 'bg-white/20'}`}
          />
        ))}
      </div>

      <style jsx global>{`
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #D4AF37; }
        body { background: black; }
      `}</style>

    </main>
  );
}