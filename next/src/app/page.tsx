"use client";
import { useState, useEffect, useCallback } from 'react';

export default function Home() {
  const [data, setData] = useState<{ inspiration: string, status: string, timestamp: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [counter, setCounter] = useState(10); // Refresh countdown

  const fetchInspiration = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/inspire?t=${Date.now()}`); // Cache-busting query
      if (!res.ok) throw new Error("API Failure");
      const d = await res.json();
      setData(d);
      setError(false);
      setCounter(10);
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchInspiration();
    const timer = setInterval(() => {
      setCounter((prev) => {
        if (prev <= 1) {
          fetchInspiration();
          return 10;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [fetchInspiration]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 text-white relative overflow-hidden bg-black font-sans">
      {/* Dynamic Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-600 via-orange-800 to-red-950 opacity-40 animate-pulse transition-all duration-[3000ms]"></div>
      
      {/* Floating Animated Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-400 rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-bounce"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-orange-600 rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-pulse"></div>

      <div className="z-10 text-center space-y-12 max-w-4xl">
        <div className="space-y-4">
          <h1 className="text-9xl font-black tracking-tighter drop-shadow-[0_10px_30px_rgba(255,180,0,0.6)] bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-white to-orange-500">
            NEXT
          </h1>
          <p className="text-3xl font-light italic text-orange-200/60 uppercase tracking-[1em] ml-4">
            The Next Big Thing
          </p>
        </div>

        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent my-16 shadow-[0_0_15px_rgba(255,255,0,0.3)]"></div>

        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative bg-black/40 border border-white/10 p-16 rounded-3xl backdrop-blur-2xl shadow-2xl transition-all duration-700 hover:scale-[1.02]">
            {loading && !data ? (
              <div className="flex flex-col items-center space-y-4">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-yellow-400"></div>
                <p className="text-yellow-500 font-mono tracking-widest text-sm">SYNCHRONIZING...</p>
              </div>
            ) : error ? (
              <p className="text-red-400">System Connection Interrupted. Retrying...</p>
            ) : (
              <div className="space-y-10">
                <p className="text-4xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-br from-white via-orange-50 to-yellow-100 italic">
                   "{data?.inspiration}"
                </p>
                
                <div className="flex flex-col items-center justify-center space-y-4">
                  <div className="flex items-center space-x-4">
                    <span className="h-3 w-3 bg-yellow-400 rounded-full shadow-[0_0_10px_#facc15] animate-ping"></span>
                    <span className="text-sm font-mono uppercase tracking-[0.3em] text-yellow-500/90 font-bold">
                      {data?.status} &bull; NEXT UPDATE IN {counter}s
                    </span>
                  </div>
                  <p className="text-[10px] font-mono text-white/20 tracking-widest uppercase">
                    Pulse ID: {data?.timestamp ? btoa(data.timestamp).substring(0, 16) : '0xLOADING'}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="pt-16 flex justify-center space-x-8">
          <button 
            onClick={() => fetchInspiration()}
            className="group relative px-12 py-5 bg-white text-black rounded-full font-black text-xl overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_10px_40px_rgba(255,255,255,0.2)]"
          >
            <span className="relative z-10">EVOLVE NOW</span>
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
          
          <button className="px-12 py-5 border-2 border-white/20 rounded-full font-bold text-xl hover:bg-white/10 hover:border-white transition-all active:scale-95 backdrop-blur-sm">
            EXPLORE
          </button>
        </div>
      </div>

      <footer className="absolute bottom-10 left-0 right-0 text-center">
        <div className="text-xs text-white/20 uppercase tracking-[1em] mb-4">
          Engineered for Potential &bull; v1.0.Dynamic
        </div>
      </footer>
    </main>
  );
}