import React from 'react';
import { AvatarStyle } from '../types';

interface StyleSelectorProps {
  selectedStyle: AvatarStyle;
  onStyleChange: (style: AvatarStyle) => void;
}

const StyleSelector: React.FC<StyleSelectorProps> = ({ selectedStyle, onStyleChange }) => {
  
  // Define visual accents for each style
  const getStyleAccent = (style: string) => {
    switch (style) {
      case AvatarStyle.Anime: return 'from-pink-500/20 to-purple-500/20 border-pink-500/50 hover:shadow-pink-500/20';
      case AvatarStyle.Cyberpunk: return 'from-cyan-500/20 to-fuchsia-500/20 border-cyan-500/50 hover:shadow-cyan-500/20';
      case AvatarStyle.Realistic: return 'from-emerald-500/20 to-teal-500/20 border-emerald-500/50 hover:shadow-emerald-500/20';
      case AvatarStyle.Watercolor: return 'from-blue-400/20 to-indigo-400/20 border-blue-400/50 hover:shadow-blue-400/20';
      case AvatarStyle.PixelArt: return 'from-orange-500/20 to-yellow-500/20 border-orange-500/50 hover:shadow-orange-500/20';
      case AvatarStyle.ThreeDRender: return 'from-violet-500/20 to-indigo-500/20 border-violet-500/50 hover:shadow-violet-500/20';
      case AvatarStyle.Clay: return 'from-amber-600/20 to-orange-700/20 border-amber-600/50 hover:shadow-amber-600/20';
      default: return 'from-slate-700/50 to-slate-600/50 border-slate-500/50';
    }
  };

  return (
    <div className="mb-8">
      <label className="block text-sm font-semibold text-slate-300 mb-4 flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-indigo-400">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.077-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.85 6.361a15.995 15.995 0 00-4.647 4.763m0 0c-.026.096-.053.191-.078.288m0 0a20.724 20.724 0 01-1.04 2.896m-1.04 2.896a6.751 6.751 0 01-4.83 1.299" />
        </svg>
        选择艺术风格
      </label>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {Object.values(AvatarStyle).map((style) => {
          const isSelected = selectedStyle === style;
          const accentClass = getStyleAccent(style);
          
          return (
            <button
              key={style}
              type="button"
              onClick={() => onStyleChange(style)}
              className={`
                relative group overflow-hidden px-3 py-3 rounded-xl text-sm font-medium transition-all duration-300 border
                ${isSelected 
                  ? `bg-gradient-to-br ${accentClass} text-white shadow-lg scale-[1.02]` 
                  : 'bg-slate-800/40 border-slate-700/50 text-slate-400 hover:bg-slate-700/60 hover:text-slate-200 hover:border-slate-500'
                }
              `}
            >
              <div className="flex flex-col items-center gap-1 z-10 relative">
                <span>{style}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default StyleSelector;