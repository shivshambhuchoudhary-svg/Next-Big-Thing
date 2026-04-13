"use client";
import { useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, Text, PerspectiveCamera, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { Settings, Info, Box, Layout, Camera, ChevronRight } from 'lucide-react';

function MallZone({ position, size, color, label, isActive, onClick }: any) {
  return (
    <Float speed={isActive ? 5 : 2} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh position={position} onClick={onClick} castShadow>
        <boxGeometry args={size} />
        <meshStandardMaterial 
          color={isActive ? "#FFFFFF" : color} 
          metalness={0.9} 
          roughness={0.05} 
          emissive={isActive ? "#D4AF37" : "black"}
          emissiveIntensity={isActive ? 0.8 : 0}
          transparent
          opacity={0.9}
        />
        {isActive && (
          <Text
            position={[0, size[1] / 2 + 0.8, 0]}
            fontSize={0.5}
            color="white"
            anchorX="center"
            anchorY="middle"
            font="https://fonts.gstatic.com/s/spectral/v13/yNoZcmlZfXvcpU7N_A.woff"
          >
            {label}
          </Text>
        )}
      </mesh>
    </Float>
  );
}

export default function DubaiMallMap() {
  const [activeZone, setActiveZone] = useState<any>(null);
  const [theme, setTheme] = useState("#D4AF37"); // Default Gold

  const zones = [
    { id: 1, pos: [-4, 0.5, -2], size: [6, 1.5, 4], color: theme, label: "Fashion Avenue", type: "Luxury Retail", area: "440,000 sq ft" },
    { id: 2, pos: [4, 1, 0], size: [5, 2.5, 5], color: "#8B732A", label: "Grand Atrium", type: "Event Space", area: "120,000 sq ft" },
    { id: 3, pos: [-2, 0.2, 4], size: [4, 1, 3], color: theme, label: "Dino Atrium", type: "Activation Hub", area: "85,000 sq ft" },
    { id: 4, pos: [5, 0.5, 6], size: [3, 1.5, 4], color: "#1a1a1a", label: "The Fountains", type: "Digital Media", area: "Waterfront" },
    { id: 5, pos: [0, 0.1, -6], size: [8, 0.8, 3], color: theme, label: "Gold Souk", type: "Traditional Heritage", area: "150,000 sq ft" },
  ];

  return (
    <div className="w-full h-full min-h-[700px] relative bg-[#0a0a0a] rounded-none overflow-hidden border border-white/10 font-sans">
      
      {/* 3D CANVAS */}
      <div className="absolute inset-0 z-0">
        <Canvas shadows dpr={[1, 2]} camera={{ position: [18, 15, 18], fov: 35 }}>
          <OrbitControls 
            enableZoom={true} 
            enablePan={false} 
            autoRotate={!activeZone} 
            autoRotateSpeed={0.3}
            maxPolarAngle={Math.PI / 2.1}
          />
          
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} intensity={1.5} color={theme} />
          <spotLight position={[-10, 20, -10]} angle={0.15} penumbra={1} intensity={2} color="white" castShadow />

          {zones.map(zone => (
            <MallZone 
              key={zone.id} 
              position={zone.pos} 
              size={zone.size} 
              color={zone.color} 
              label={zone.label} 
              isActive={activeZone?.id === zone.id}
              onClick={() => setActiveZone(zone)}
            />
          ))}

          <ContactShadows position={[0, -0.5, 0]} opacity={0.4} scale={20} blur={2} far={4.5} />
          <gridHelper args={[30, 30, theme, "#111"]} position={[0, -0.49, 0]} />
        </Canvas>
      </div>

      {/* NEXA-INSPIRED UI OVERLAY */}
      
      {/* TOP HEADER */}
      <div className="absolute top-0 left-0 w-full p-8 flex justify-between items-start z-10 pointer-events-none">
        <div className="pointer-events-auto">
          <h2 className="text-white text-3xl font-black tracking-tighter uppercase leading-none">Configurator</h2>
          <p className="text-[#D4AF37] text-[10px] font-mono tracking-[0.4em] uppercase mt-2">Dubai Mall // Site Planning v4.0</p>
        </div>
        <div className="flex space-x-4 pointer-events-auto">
           <button className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/20 transition-all">
              <Camera className="w-4 h-4 text-white" />
           </button>
           <button className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/20 transition-all">
              <Info className="w-4 h-4 text-white" />
           </button>
        </div>
      </div>

      {/* RIGHT SIDEBAR: ZONE DETAILS */}
      <div className="absolute right-0 top-0 h-full w-80 bg-black/40 backdrop-blur-3xl border-l border-white/10 p-8 flex flex-col z-20 transform transition-transform duration-700">
        <div className="flex-1 overflow-y-auto space-y-10 custom-scrollbar pr-2">
          
          {/* Theme Selector */}
          <div>
            <h4 className="text-white/40 text-[9px] font-mono uppercase tracking-[0.3em] mb-4">Select Mall Aesthetic</h4>
            <div className="flex space-x-3">
              {[ {c: "#D4AF37", l: "Gold"}, {c: "#E5E4E2", l: "Platinum"}, {c: "#1a1a1a", l: "Noir"} ].map(t => (
                <button 
                  key={t.l}
                  onClick={() => setTheme(t.c)}
                  className={`w-8 h-8 rounded-full border-2 transition-all ${theme === t.c ? 'border-white scale-110 shadow-[0_0_10px_white]' : 'border-transparent'}`}
                  style={{ backgroundColor: t.c }}
                />
              ))}
            </div>
          </div>

          {/* Active Zone Details */}
          {activeZone ? (
            <div className="animate-in fade-in slide-in-from-right duration-500">
              <h3 className="text-[#D4AF37] text-2xl font-black uppercase tracking-tight mb-2">{activeZone.label}</h3>
              <p className="text-white/60 text-xs leading-relaxed mb-8">Premium activation space located in the heart of the mall's {activeZone.type.toLowerCase()} sector.</p>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-white/5">
                  <span className="text-white/30 text-[10px] uppercase font-mono tracking-widest">Sector</span>
                  <span className="text-white text-[10px] uppercase font-bold">{activeZone.type}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-white/5">
                  <span className="text-white/30 text-[10px] uppercase font-mono tracking-widest">Footprint</span>
                  <span className="text-white text-[10px] uppercase font-bold">{activeZone.area}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-white/5">
                  <span className="text-white/30 text-[10px] uppercase font-mono tracking-widest">Status</span>
                  <span className="text-green-500 text-[10px] uppercase font-bold">Available</span>
                </div>
              </div>

              <div className="mt-10">
                <h4 className="text-white/40 text-[9px] font-mono uppercase tracking-[0.3em] mb-4">Activation Options</h4>
                <div className="grid grid-cols-2 gap-2">
                  <button className="p-3 bg-white/5 border border-white/10 text-[9px] font-bold uppercase hover:bg-[#D4AF37] hover:text-black transition-all">Pop-up</button>
                  <button className="p-3 bg-white/5 border border-white/10 text-[9px] font-bold uppercase hover:bg-[#D4AF37] hover:text-black transition-all">Digital</button>
                  <button className="p-3 bg-white/5 border border-white/10 text-[9px] font-bold uppercase hover:bg-[#D4AF37] hover:text-black transition-all">Exhibit</button>
                  <button className="p-3 bg-white/5 border border-white/10 text-[9px] font-bold uppercase hover:bg-[#D4AF37] hover:text-black transition-all">Private</button>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center opacity-30">
               <Layout className="w-12 h-12 mb-4 text-[#D4AF37]" />
               <p className="text-[10px] font-mono uppercase tracking-widest">Select a zone on the map to configure</p>
            </div>
          )}
        </div>

        {/* BOTTOM CTA IN SIDEBAR */}
        <div className="mt-auto pt-8 border-t border-white/10">
           <button className="w-full py-4 bg-white text-black font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center hover:bg-[#D4AF37] transition-all group">
              Confirm Configuration
              <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
           </button>
        </div>
      </div>

      {/* BOTTOM CONTROL BAR */}
      <div className="absolute bottom-0 left-0 w-full p-8 pointer-events-none z-10">
        <div className="flex justify-between items-end">
           <div className="flex space-x-1 pointer-events-auto">
              {zones.map(z => (
                <button 
                  key={z.id}
                  onClick={() => setActiveZone(z)}
                  className={`px-4 py-2 text-[8px] font-mono uppercase tracking-widest border transition-all ${activeZone?.id === z.id ? 'bg-white text-black border-white' : 'bg-black/50 text-white/40 border-white/10 hover:border-[#D4AF37]'}`}
                >
                  {z.label.split(' ')[0]}
                </button>
              ))}
           </div>
           
           <div className="bg-black/80 backdrop-blur-md border border-white/10 px-8 py-4 flex items-center space-x-12 pointer-events-auto">
              <div className="flex flex-col">
                 <span className="text-white/30 text-[8px] uppercase font-mono tracking-widest">Estimated Reach</span>
                 <span className="text-white text-xl font-black">2.4M / Week</span>
              </div>
              <div className="h-8 w-[1px] bg-white/10"></div>
              <button className="px-10 py-3 bg-[#D4AF37] text-black font-black text-[10px] uppercase tracking-[0.2em] hover:bg-white transition-all">
                 Request Proposal
              </button>
           </div>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { width: 2px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(212, 175, 55, 0.3); }
      `}</style>

    </div>
  );
}