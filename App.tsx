import React, { useState } from 'react';
import { AvatarStyle, GeneratedImage } from './types';
import { generateAvatars } from './services/geminiService';
import StyleSelector from './components/StyleSelector';
import ResultsGrid from './components/ResultsGrid';

const App: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [style, setStyle] = useState<AvatarStyle>(AvatarStyle.Anime);
  const [count, setCount] = useState<number>(4);
  const [loading, setLoading] = useState<boolean>(false);
  const [images, setImages] = useState<GeneratedImage[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError('请输入头像描述');
      return;
    }

    setLoading(true);
    setError(null);
    setImages([]);

    try {
      const generatedBase64s = await generateAvatars(prompt, style, count);
      
      const newImages: GeneratedImage[] = generatedBase64s.map((url) => ({
        id: Math.random().toString(36).substring(7),
        url,
        timestamp: Date.now(),
      }));

      setImages(newImages);
    } catch (err: any) {
      console.error(err);
      setError(err.message || '生成失败，请稍后重试。可能由于API限制。');
    } finally {
      setLoading(false);
    }
  };

  const handleRandomPrompt = () => {
    const randomPrompts = [
      "戴着霓虹护目镜的赛博朋克黑客少女，紫色短发，城市背景",
      "一只穿着宇航服的可爱橘猫，漂浮在太空中，背景是地球",
      "维多利亚时代的侦探，手里拿着烟斗，水彩画风格",
      "像素风格的勇者，手持发光的圣剑，8-bit",
      "未来的机器人咖啡师，正在制作拉花拿铁，金属质感",
      "森林里的精灵王子，银色长发，耳朵尖尖，被萤火虫环绕"
    ];
    setPrompt(randomPrompts[Math.floor(Math.random() * randomPrompts.length)]);
  };

  return (
    <div className="min-h-screen text-slate-100 pb-20">
      
      {/* Header */}
      <header className="fixed w-full top-0 z-50 border-b border-white/5 bg-slate-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
            </div>
            <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
              AvatarGen <span className="text-indigo-400">Pro</span>
            </span>
          </div>
          
          <div className="flex items-center gap-4">
             <div className="hidden md:flex items-center px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-medium text-indigo-300">
               Gemini 2.5 Inside
             </div>
          </div>
        </div>
      </header>

      {/* Spacer for fixed header */}
      <div className="h-24"></div>

      <main className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          
          {/* Left Column: Control Panel */}
          <div className="w-full lg:w-[400px] shrink-0">
            <div className="glass-panel p-6 rounded-3xl sticky top-24 shadow-2xl shadow-black/20">
              
              {/* Header inside panel */}
              <div className="mb-6 pb-6 border-b border-white/5">
                <h2 className="text-xl font-bold text-white mb-1">配置头像</h2>
                <p className="text-sm text-slate-400">定制您的专属 AI 形象</p>
              </div>
              
              {/* Prompt Input */}
              <div className="mb-6 relative group">
                 <div className="flex justify-between items-center mb-3">
                    <label className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-indigo-400">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                      </svg>
                      创意描述
                    </label>
                    <button 
                      onClick={handleRandomPrompt}
                      className="text-xs px-2 py-1 rounded bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20 transition-colors flex items-center gap-1"
                    >
                      <span>🎲 随机灵感</span>
                    </button>
                 </div>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="描述您想要的头像细节..."
                  className="w-full h-32 px-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 text-slate-100 placeholder-slate-600 resize-none transition-all outline-none"
                />
              </div>

              {/* Style Selector */}
              <StyleSelector selectedStyle={style} onStyleChange={setStyle} />

              {/* Count Selector */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <label className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-indigo-400">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 8.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v8.25A2.25 2.25 0 006 16.5h2.25m8.25-8.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-7.5A2.25 2.25 0 018.25 18v-1.5m8.25-8.25h-6a2.25 2.25 0 00-2.25 2.25v6" />
                    </svg>
                    生成数量
                  </label>
                  <span className="text-xs font-mono bg-slate-800 px-2 py-1 rounded text-indigo-300">{count} 张</span>
                </div>
                <div className="px-1">
                  <input 
                    type="range" 
                    min="1" 
                    max="4" 
                    step="1"
                    value={count} 
                    onChange={(e) => setCount(Number(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 mt-2 font-medium uppercase tracking-wider">
                    <span>Single</span>
                    <span>Multi</span>
                  </div>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-200 text-sm rounded-xl flex items-start gap-3 animate-[shake_0.5s_ease-in-out]">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 shrink-0 text-red-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008h-.008v-.008z" />
                  </svg>
                  <span className="leading-snug">{error}</span>
                </div>
              )}

              {/* Generate Button */}
              <button
                onClick={handleGenerate}
                disabled={loading || !prompt.trim()}
                className={`
                  w-full py-4 rounded-xl font-bold text-lg shadow-lg shadow-indigo-500/20 transition-all duration-300 transform active:scale-[0.98]
                  flex items-center justify-center gap-3 relative overflow-hidden group
                  ${loading || !prompt.trim()
                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700' 
                    : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white hover:shadow-indigo-500/40'
                  }
                `}
              >
                {/* Button shine effect */}
                {!loading && prompt.trim() && (
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg] translate-x-[-200%] group-hover:animate-[shine_1s_infinite]"></div>
                )}

                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>AI 思考中...</span>
                  </>
                ) : (
                  <>
                    <span>立即生成</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right Column: Gallery */}
          <div className="w-full flex-1">
             <div className="mb-6 flex items-end justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white">结果展示</h2>
                  <p className="text-slate-400 text-sm mt-1">
                    {images.length > 0 ? `已生成 ${images.length} 张备选头像` : '等待生成指令...'}
                  </p>
                </div>
                {images.length > 0 && (
                   <button 
                    onClick={() => setImages([])} 
                    className="text-xs text-slate-500 hover:text-white transition-colors"
                   >
                     清空结果
                   </button>
                )}
             </div>
             
             <ResultsGrid images={images} loading={loading} count={count} />
          </div>

        </div>
      </main>
    </div>
  );
};

export default App;