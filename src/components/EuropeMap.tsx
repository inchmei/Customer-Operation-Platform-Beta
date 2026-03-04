import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const cities = [
  { id: 'london', name: '伦敦', x: 180, y: 140, count: 142 },
  { id: 'paris', name: '巴黎', x: 200, y: 180, count: 98 },
  { id: 'frankfurt', name: '法兰克福', x: 260, y: 160, count: 115 },
  { id: 'berlin', name: '柏林', x: 300, y: 130, count: 76 },
  { id: 'madrid', name: '马德里', x: 120, y: 280, count: 54 },
  { id: 'rome', name: '罗马', x: 280, y: 290, count: 42 },
];

export default function EuropeMap() {
  const [selectedCity, setSelectedCity] = useState<typeof cities[0] | null>(null);

  return (
    <div className="relative w-full h-[400px] bg-zinc-900/30 rounded-2xl border border-zinc-800/50 overflow-hidden flex items-center justify-center">
      <svg 
        viewBox="0 0 500 400" 
        className="w-full h-full max-w-[600px] opacity-40 filter grayscale brightness-50"
        style={{ pointerEvents: 'none' }}
      >
        {/* Simple Europe Path Representation */}
        <path
          d="M150,100 L180,80 L220,90 L250,70 L300,80 L350,100 L380,150 L360,200 L380,250 L350,300 L300,320 L250,350 L200,330 L150,350 L100,320 L80,280 L100,220 L80,180 L120,150 Z"
          fill="currentColor"
          className="text-zinc-700"
        />
      </svg>

      {/* Interactive Dots */}
      {cities.map((city) => (
        <button
          key={city.id}
          onClick={() => setSelectedCity(city)}
          className="absolute group transition-transform hover:scale-125"
          style={{ left: `${city.x}px`, top: `${city.y}px` }}
        >
          <div className="relative">
            <div className="w-3 h-3 bg-blue-500 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.8)]" />
            <div className="absolute inset-0 w-3 h-3 bg-blue-400 rounded-full animate-ping opacity-75" />
          </div>
          
          <span className="absolute top-4 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-bold text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-widest">
            {city.name}
          </span>
        </button>
      ))}

      {/* Tooltip */}
      <AnimatePresence>
        {selectedCity && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute bottom-6 right-6 bg-zinc-950/90 backdrop-blur-md border border-zinc-800 p-4 rounded-2xl shadow-2xl min-w-[160px]"
          >
            <div className="flex justify-between items-start mb-2">
              <h4 className="text-zinc-100 font-bold">{selectedCity.name} 区域</h4>
              <button 
                onClick={() => setSelectedCity(null)}
                className="text-zinc-500 hover:text-white"
              >
                ×
              </button>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-zinc-500 uppercase font-bold tracking-wider">活跃客户数</p>
              <p className="text-2xl font-mono font-bold text-blue-400">{selectedCity.count}</p>
            </div>
            <div className="mt-3 pt-3 border-t border-zinc-800 flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
              <span className="text-[10px] text-zinc-400 font-medium">态势：稳定</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute top-6 left-6">
        <h3 className="text-lg font-bold text-white">欧洲客户态势图</h3>
        <p className="text-xs text-zinc-500 mt-1 uppercase tracking-widest">实时地理分布分析</p>
      </div>
    </div>
  );
}
