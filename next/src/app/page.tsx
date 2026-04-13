"use client";
import { useState, useEffect, useCallback } from 'react';

export default function Home() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [counter, setCounter] = useState(15); 

  const fetchInsight = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/inspire?t=${Date.now()}`); 
      if (!res.ok) throw new Error("API Failure");
      const d = await res.json();
      setData(d);
      setError(false);
      setCounter(15);
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchInsight();
    const timer = setInterval(() => {
      setCounter((prev) => {
        if (prev <= 1) {
          fetchInsight();
          return 15;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [fetchInsight]);

  return (
    <main className="min-h-screen flex flex-col items-center bg-[#080808] text-[#D4AF37] font-sans selection:bg-[#D4AF37] selection:text-black overflow-x-hidden">
      {/* Cinematic Dino Shadows */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.02]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 20l30 10l-10 40l50-20z' fill='%23D4AF37'/%3E%3C/svg%3E")` }}></div>
      
      {/* Museum Lighting Effects */}
      <div className="fixed top-[-20%] left-[20%] w-[60%] h-[60%] bg-[#D4AF37] rounded-full filter blur-[200px] opacity-[0.03]"></div>
      <div className="fixed bottom-[-10%] right-[10%] w-[40%] h-[40%] bg-[#8B732A] rounded-full filter blur-[200px] opacity-[0.03]"></div>

      {/* Luxury Navigation */}
      <header className="w-full max-w-7xl px-8 py-8 flex justify-between items-center z-50">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 border-2 border-[#D4AF37] rounded-full flex items-center justify-center font-black italic">D</div>
          <span className="font-bold tracking-[0.4em] text-white">DUBAI.DINO</span>
        </div>
        <nav className="hidden md:flex space-x-12 text-[10px] font-mono uppercase tracking-[0.5em] text-white/40">
          <a href="#" className="hover:text-[#D4AF37] transition-colors">Exhibit</a>
          <a href="#" className="hover:text-[#D4AF37] transition-colors">Legacy</a>
          <a href="#" className="hover:text-[#D4AF37] transition-colors">Capture</a>
          <button className="px-8 py-2 bg-white text-black font-black hover:bg-[#D4AF37] transition-all">
            VIP ACCESS
          </button>
        </nav>
      </header>

      {/* Main Focus Section */}
      <section className="w-full max-w-7xl px-8 pt-32 pb-12 flex flex-col items-center text-center z-10">
        <div className="px-6 py-2 border-l-4 border-[#D4AF37] bg-white/5 text-[#D4AF37] text-[10px] font-mono tracking-widest uppercase mb-10">
          Cinematic Angle Activated &bull; Diplodocus longus
        </div>
        
        <h1 className="text-8xl md:text-[12rem] font-black tracking-tighter text-white mb-4 leading-none select-none">
          DINO <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#D4AF37] to-[#1a1a1a]">DUBAI</span>
        </h1>
        
        <p className="max-w-3xl text-xl text-white/40 font-light italic leading-relaxed mb-20 tracking-wide">
          "Witness the 155-million-year-old skeleton from the perfect cinematic angle in the Grand Atrium. Pure ancient majesty without the distractions."
        </p>

        {/* The Dino "Photo" Frame (Representing the Best Angle) */}
        <div className="w-full aspect-video md:aspect-[21/9] bg-gradient-to-tr from-black via-[#111] to-[#0a0a0a] border border-white/10 rounded-sm relative overflow-hidden group shadow-2xl">
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#D4AF37]/5 via-transparent to-transparent opacity-50"></div>
           
           {/* Visual Representation of the Best Angle (Abstracted as Cinematic Elements) */}
           <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-full flex items-end justify-center pb-20 overflow-hidden">
                  <div className="w-[80%] h-full border-t-2 border-r-2 border-[#D4AF37]/20 rounded-tr-[100px] transform -skew-x-12 translate-y-20 opacity-30"></div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-[#D4AF37]/40 rounded-full animate-ping"></div>
              </div>
           </div>

           <div className="absolute top-8 left-8 text-[10px] font-mono text-[#D4AF37]/50 uppercase tracking-[0.5em]">Frame: 01_CINEMATIC_LOW</div>
           <div className="absolute bottom-8 right-8 text-[10px] font-mono text-[#D4AF37]/50 uppercase tracking-[0.5em]">ISO: 100 // SHUTTER: 1/60</div>
        </div>
      </section>

      {/* Exhibit Metrics */}
      <section className="w-full max-w-7xl px-8 grid grid-cols-1 md:grid-cols-4 gap-1 z-10 pt-20 pb-40">
        <div className="bg-white/5 p-12 border border-white/5 hover:bg-[#D4AF37]/5 transition-all">
          <h4 className="text-[#D4AF37] text-xs font-mono mb-4 uppercase tracking-widest">Age</h4>
          <p className="text-5xl font-black text-white">{data?.metrics?.age ? '155M' : '---'}</p>
          <p className="text-[10px] text-white/20 mt-4">JURASSIC_PERIOD</p>
        </div>
        
        <div className="bg-white/5 p-12 border border-white/5 hover:bg-[#D4AF37]/5 transition-all">
          <h4 className="text-[#D4AF37] text-xs font-mono mb-4 uppercase tracking-widest">Length</h4>
          <p className="text-5xl font-black text-white">24.4m</p>
          <p className="text-[10px] text-white/20 mt-4">DIPLODOCUS_L</p>
        </div>

        <div className="bg-white/5 p-12 border border-white/5 hover:bg-[#D4AF37]/5 transition-all md:col-span-2 flex flex-col justify-between">
          <div className="flex justify-between items-start">
             <div>
                <h4 className="text-[#D4AF37] text-xs font-mono mb-4 uppercase tracking-widest">Live Feed</h4>
                <p className="text-2xl font-bold text-white italic">"{data?.insight?.detail}"</p>
             </div>
             <div className="text-right">
                <p className="text-[#D4AF37] font-mono text-xs">{counter}s</p>
             </div>
          </div>
          <div className="w-full h-1 bg-white/5 mt-8">
             <div className="h-full bg-[#D4AF37] animate-pulse" style={{ width: `${(counter/15)*100}%` }}></div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-16 border-t border-white/5 flex flex-col items-center">
        <p className="text-[10px] font-mono text-white/10 uppercase tracking-[1.5em] mb-4">MUSEUM ARCHIVE &bull; NO BATMAN &bull; JUST DINO</p>
      </footer>
    </main>
  );
}