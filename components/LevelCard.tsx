
import React from 'react';
import { CourseLevel } from '../types';
import { Code2, Zap, Cpu, Rocket } from 'lucide-react';

interface LevelCardProps {
  level: CourseLevel;
  index: number;
}

const IconMap: Record<string, React.ReactNode> = {
  Code2: <Code2 className="w-7 h-7" />,
  Zap: <Zap className="w-7 h-7" />,
  Cpu: <Cpu className="w-7 h-7" />,
  Rocket: <Rocket className="w-7 h-7" />,
};

export const LevelCard: React.FC<LevelCardProps> = ({ level, index }) => {
  return (
    <div className={`level-card-${index} opacity-10 scale-90 translate-x-${index % 2 === 0 ? '-40' : '40'} transition-all duration-1000 ease-out bg-black/60 backdrop-blur-2xl border border-white/10 p-10 rounded-[2rem] relative overflow-hidden group hover:border-white/20 shadow-2xl`}>
      
      {/* Visual Accents */}
      <div 
        className="absolute top-0 right-0 w-32 h-32 opacity-20 blur-[80px] pointer-events-none transition-opacity duration-700 group-hover:opacity-60"
        style={{ backgroundColor: level.color }}
      ></div>
      
      <div className="absolute top-0 left-0 w-full h-1" style={{ backgroundColor: level.color }}></div>

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-8">
           <div 
            className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 shadow-lg"
            style={{ 
              backgroundColor: `${level.color}15`, 
              color: level.color, 
              border: `1px solid ${level.color}30`,
              boxShadow: `0 0 20px ${level.color}20` 
            }}
          >
            {IconMap[level.icon]}
          </div>
          <span className="font-mono text-[10px] text-gray-500 tracking-[0.4em] uppercase">Phase_0{index + 1}</span>
        </div>

        <h3 className="font-heading text-2xl font-black mb-2 tracking-tight text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-500 transition-all duration-300">
          {level.title}
        </h3>
        
        <p className="text-xs font-mono font-medium mb-6 uppercase tracking-[0.2em]" style={{ color: level.color }}>
          {level.subtitle}
        </p>
        
        <p className="text-gray-400 text-sm leading-relaxed mb-10 font-light">
          {level.description}
        </p>

        <div className="flex flex-wrap gap-3">
          {level.tags.map(tag => (
            <div key={tag} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/5 transition-colors hover:border-white/20">
              <div className="w-1 h-1 rounded-full" style={{ backgroundColor: level.color }}></div>
              <span className="text-[9px] font-mono font-bold text-gray-500 uppercase tracking-tighter">
                {tag}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative Index */}
      <span className="absolute -bottom-10 -right-4 font-heading text-[12rem] font-black text-white/[0.02] select-none pointer-events-none italic group-hover:text-white/[0.04] transition-colors duration-700">
        {index + 1}
      </span>
    </div>
  );
};
