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
    <main className="min-h-screen flex flex-col items-center bg-[#050505] text-[#D4AF37] font-sans selection:bg-[#D4AF37] selection:text-black overflow-x-hidden">
      {/* Architectural Background Pattern */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l30 30-30 30L0 30z' fill='%23D4AF37' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")` }}></div>
      
      {/* Luxury Gradient Glows */}
      <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#D4AF37] rounded-full filter blur-[180px] opacity-[0.05]"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#8B732A] rounded-full filter blur-[180px] opacity-[0.05]"></div>

      {/* Header Navigation */}
      <header className="w-full max-w-7xl px-8 py-8 flex justify-between items-center z-50">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-[#D4AF37] to-[#8B732A] rounded-sm transform rotate-45 flex items-center justify-center">
            <span className="text-black font-black text-xs -rotate-45">N</span>
          </div>
          <span className="font-bold tracking-[0.2em] text-white">NEXT.DUBAI</span>
        </div>
        <nav className="hidden md:flex space-x-12 text-xs font-mono uppercase tracking-widest text-white/40">
          <a href="#" className="hover:text-[#D4AF37] transition-colors">Infrastructure</a>
          <a href="#" className="hover:text-[#D4AF37] transition-colors">Retail Core</a>
          <a href="#" className="hover:text-[#D4AF37] transition-colors">Vision</a>
          <button className="px-6 py-2 border border-[#D4AF37]/30 rounded-full text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all">
            GET STARTED
          </button>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="w-full max-w-7xl px-8 pt-20 pb-12 flex flex-col items-center text-center z-10">
        <div className="inline-block px-4 py-1 border border-[#D4AF37]/20 rounded-full bg-[#D4AF37]/5 text-[#D4AF37] text-[10px] font-mono tracking-widest uppercase mb-6 animate-fade-in">
          Dubai Mall Core v2.0 &bull; Deployment 0x777
        </div>
        <h1 className="text-7xl md:text-9xl font-black tracking-tighter text-white mb-8">
          The Next Big <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#FFF3B0] to-[#8B732A]">Thing</span>
        </h1>
        <p className="max-w-2xl text-lg md:text-xl text-white/50 font-light leading-relaxed mb-12">
          Experience the pinnacle of luxury retail through our high-performance edge infrastructure. 
          The Dubai Mall Command Center is now online.
        </p>
      </section>

      {/* Bento Grid Command Center */}
      <section className="w-full max-w-7xl px-8 grid grid-cols-1 md:grid-cols-4 gap-4 z-10 pb-32">
        
        {/* Main Terminal Card */}
        <div className="md:col-span-3 bg-white/[0.02] border border-white/[0.05] rounded-2xl p-8 backdrop-blur-xl relative overflow-hidden group hover:border-[#D4AF37]/20 transition-all duration-500">
          <div className="flex justify-between items-center mb-8">
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
            </div>
            <div className="text-[10px] font-mono text-white/20 uppercase tracking-[0.3em]">Command_Center_Dubai</div>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <span className="text-[#D4AF37] font-mono text-xl opacity-50">$</span>
              <div className="flex-1 font-mono text-sm leading-relaxed">
                <span className="text-white/40">initialize --luxury-protocol dubai_mall</span><br/>
                <span className="text-green-400">✓ Luxury core loaded successfully</span><br/>
                <span className="text-white/40 mt-4 block">fetching_live_insight...</span>
                <div className="mt-8 p-6 bg-white/[0.02] border-l-2 border-[#D4AF37] rounded-r-lg animate-in fade-in slide-in-from-left duration-700">
                   {loading ? (
                     <div className="animate-pulse flex flex-col space-y-2">
                        <div className="h-4 bg-white/5 w-3/4 rounded"></div>
                        <div className="h-4 bg-white/5 w-1/2 rounded"></div>
                     </div>
                   ) : (
                     <div className="space-y-2">
                        <h3 className="text-[#D4AF37] font-bold text-lg uppercase tracking-widest">{data?.insight?.title}</h3>
                        <p className="text-white/70 italic text-base leading-relaxed">"{data?.insight?.detail}"</p>
                        <div className="text-[10px] text-white/30 uppercase pt-4 flex items-center">
                           <span className="inline-block w-2 h-2 bg-[#D4AF37] rounded-full mr-2 animate-ping"></span>
                           SYNCING... {counter}s REMAINING
                        </div>
                     </div>
                   )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Small Metric Cards */}
        <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-6 flex flex-col justify-between hover:border-[#D4AF37]/20 transition-all">
          <div className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-widest">Latency</div>
          <div className="text-5xl font-black text-white mt-4">{data?.insight?.metric?.includes('ms') ? data.insight.metric : '11ms'}</div>
          <div className="text-[10px] text-white/30 font-mono mt-4">EDGE_RESPONSE_OK</div>
        </div>

        <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-6 flex flex-col justify-between hover:border-[#D4AF37]/20 transition-all">
          <div className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-widest">Uptime</div>
          <div className="text-5xl font-black text-white mt-4">{data?.metrics?.uptime || '99.9%'}</div>
          <div className="text-[10px] text-white/30 font-mono mt-4">GLOBAL_STABILITY_CORE</div>
        </div>

        <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-6 flex flex-col justify-between hover:border-[#D4AF37]/20 transition-all">
          <div className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-widest">Visitors</div>
          <div className="text-5xl font-black text-white mt-4">{data?.metrics?.visitors || '80M+'}</div>
          <div className="text-[10px] text-white/30 font-mono mt-4">ANNUAL_RETAIL_FLOW</div>
        </div>

        <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-6 flex flex-col justify-between hover:border-[#D4AF37]/20 transition-all">
          <div className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-widest">Stores</div>
          <div className="text-5xl font-black text-white mt-4">{data?.metrics?.stores || '1,200+'}</div>
          <div className="text-[10px] text-white/30 font-mono mt-4">RETAIL_DENSITY_HUB</div>
        </div>

        <div className="md:col-span-4 bg-gradient-to-r from-[#D4AF37]/10 to-transparent border border-[#D4AF37]/20 rounded-2xl p-8 flex flex-col md:flex-row justify-between items-center group overflow-hidden relative">
           <div className="z-10 text-center md:text-left">
              <h2 className="text-2xl font-bold text-white mb-2 tracking-tight">The Future of Retail is Here.</h2>
              <p className="text-white/40 text-sm">Join the 1,200+ luxury brands scaling on our Dubai Mall infrastructure.</p>
           </div>
           <button className="z-10 mt-6 md:mt-0 px-10 py-4 bg-[#D4AF37] text-black font-black uppercase tracking-widest text-xs hover:bg-[#FFF3B0] transition-all transform hover:scale-105 active:scale-95">
              DEPLOY LUXURY EXPERIENCE
           </button>
           <div className="absolute right-[-10%] bottom-[-50%] w-64 h-64 bg-[#D4AF37]/10 rounded-full blur-3xl group-hover:bg-[#D4AF37]/20 transition-all"></div>
        </div>

      </section>

      {/* Footer */}
      <footer className="w-full py-12 border-t border-white/5 flex flex-col items-center bg-black/50 backdrop-blur-md">
        <div className="text-[10px] font-mono text-white/20 uppercase tracking-[1em] mb-4">
          &copy; 2026 DUBAI MALL CORE &bull; ALL RIGHTS RESERVED
        </div>
        <div className="flex space-x-6 text-[10px] font-mono text-[#D4AF37]/50">
           <span className="hover:text-[#D4AF37] cursor-pointer">PRIVACY</span>
           <span className="hover:text-[#D4AF37] cursor-pointer">COMPLIANCE</span>
           <span className="hover:text-[#D4AF37] cursor-pointer">INFRASTRUCTURE</span>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 1s ease-out forwards; }
      `}</style>
    </main>
  );
}