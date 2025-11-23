import React from 'react';
import { GeneratedImage } from '../types';

interface ResultsGridProps {
  images: GeneratedImage[];
  loading: boolean;
  count: number;
}

const ResultsGrid: React.FC<ResultsGridProps> = ({ images, loading, count }) => {
  const handleDownload = (url: string, id: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = `avatar-${id}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const gridCols = count === 1 ? 'grid-cols-1 max-w-md mx-auto' : 'grid-cols-1 md:grid-cols-2';

  if (loading) {
    return (
      <div className={`grid ${gridCols} gap-6 w-full`}>
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="relative aspect-square rounded-3xl bg-slate-800/30 border border-slate-700/50 overflow-hidden backdrop-blur-sm">
             <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-600/10 to-transparent animate-[shimmer_1.5s_infinite] translate-x-[-100%]" 
                  style={{ content: '""', transform: 'skewX(-20deg)' }}></div>
             <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-500 gap-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-indigo-500 blur-xl opacity-20 animate-pulse"></div>
                  <svg className="relative animate-spin h-10 w-10 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </div>
                <span className="text-xs font-semibold tracking-widest text-indigo-300/70 animate-pulse">CREATING MAGIC...</span>
             </div>
          </div>
        ))}
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[500px] text-slate-500 glass-panel rounded-3xl border border-slate-700/30 border-dashed p-8 text-center transition-all hover:border-slate-600/50">
        <div className="w-24 h-24 rounded-full bg-slate-800/50 flex items-center justify-center mb-6 ring-1 ring-slate-700/50 shadow-2xl shadow-black/20">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={0.8} stroke="currentColor" className="w-12 h-12 text-indigo-400/80">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">准备就绪</h3>
        <p className="max-w-xs mx-auto text-slate-400">选择风格，输入灵感，AI 将为您呈现独一无二的艺术头像。</p>
      </div>
    );
  }

  return (
    <div className={`grid ${gridCols} gap-6 w-full animate-[fadeIn_0.5s_ease-out]`}>
      {images.map((img) => (
        <div key={img.id} className="group relative rounded-3xl overflow-hidden border border-slate-700/50 bg-slate-900/50 shadow-2xl transition-all duration-500 hover:scale-[1.02] hover:shadow-indigo-500/20 hover:border-indigo-500/30">
          <img 
            src={img.url} 
            alt="Generated Avatar" 
            className="w-full h-full object-cover aspect-square transition-transform duration-700 group-hover:scale-110"
          />
          
          {/* Subtle sheen effect on hover */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

          {/* Action Overlay */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center gap-4">
             <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 flex flex-col items-center gap-2">
               <button 
                 onClick={() => handleDownload(img.url, img.id)}
                 className="bg-white text-slate-950 px-6 py-3 rounded-full font-bold text-sm hover:bg-indigo-50 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:scale-105 transition-all flex items-center gap-2"
               >
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                   <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                 </svg>
                 保存原图
               </button>
               <span className="text-xs text-white/70 font-mono tracking-wider">1024 x 1024 PNG</span>
             </div>
          </div>
          
          {/* Badge */}
          <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-[-10px] group-hover:translate-y-0">
            AI ART
          </div>
        </div>
      ))}
    </div>
  );
};

export default ResultsGrid;