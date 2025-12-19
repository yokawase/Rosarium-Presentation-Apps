import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Camera, BarChart3, Database, ShieldCheck, Leaf, 
  MapPin, Sun, Wind, ChevronRight, Activity, User, 
  LayoutDashboard, Zap
} from 'lucide-react';

// --- Types ---

interface HeaderProps {
  setView: (view: string) => void;
}

interface ViewProps {
  setView: (view: string) => void;
  key?: React.Key;
}

interface ScanViewProps extends ViewProps {
  isScanning: boolean;
  setIsScanning: (isScanning: boolean) => void;
  scanProgress: number;
}

// --- Components ---

function Header({ setView }: HeaderProps) {
  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-rose-100 px-6 py-4 flex justify-between items-center sticky top-0 z-50">
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView('landing')}>
        <div className="bg-rose-700 p-1.5 rounded-lg shadow-inner">
          <Leaf className="text-white" size={18} />
        </div>
        <h1 className="text-xl font-serif font-bold text-rose-900 tracking-tight">Rosarium</h1>
      </div>
      <div className="flex items-center gap-2">
        <div className="hidden xs:block bg-green-50 text-green-700 text-[10px] font-bold px-2 py-1 rounded border border-green-200">
          石狩DC SYNCED
        </div>
        <div className="w-8 h-8 rounded-full bg-rose-100 border border-rose-200 flex items-center justify-center">
          <User size={16} className="text-rose-700" />
        </div>
      </div>
    </nav>
  );
}

function LandingView({ setView }: ViewProps) {
  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="flex flex-col min-h-screen bg-[#FFFDE7] p-8 justify-center items-center text-center"
    >
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-10 relative"
      >
        <div className="absolute -inset-6 bg-rose-300 rounded-full blur-3xl opacity-30 animate-pulse"></div>
        <img 
          src="https://images.unsplash.com/photo-1555541676-4c4784a0d849?auto=format&fit=crop&q=80&w=400" 
          alt="Rosa Orientis" 
          className="w-56 h-56 rounded-full object-cover border-8 border-white shadow-2xl relative z-10"
        />
      </motion.div>
      
      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }}>
        <h2 className="text-4xl font-serif font-bold text-rose-900 mb-6 leading-tight">
          日本のバラを、<br/><span className="text-rose-600 underline decoration-rose-200">デジタル</span>で継承する。
        </h2>
        <p className="text-gray-600 mb-12 max-w-xs mx-auto leading-relaxed">
          育種家の感性と市民のデータを結合。<br/>
          世界に誇る「ロサ・オリエンティス」の<br/>解析プラットフォーム。
        </p>
      </motion.div>
      
      <motion.button 
        whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
        onClick={() => setView('scan')}
        className="w-full max-w-sm bg-rose-800 text-white text-xl font-bold py-5 rounded-2xl shadow-xl flex items-center justify-center gap-3"
      >
        <Camera size={24} />
        解析をスタート
      </motion.button>
      
      <p className="mt-12 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
        Powered by Sakura Internet AI Core
      </p>
    </motion.div>
  );
}

function ScanView({ setView, isScanning, setIsScanning, scanProgress }: ScanViewProps) {
  return (
    <div className="flex flex-col h-screen bg-black relative overflow-hidden">
      <div className="absolute inset-0 z-10 flex flex-col justify-between p-8">
        <header className="flex justify-between items-start">
          <button onClick={() => setView('landing')} className="bg-black/40 backdrop-blur-md p-3 rounded-full text-white">
            <ChevronRight size={28} className="rotate-180" />
          </button>
          <div className="bg-rose-600/90 backdrop-blur-md px-4 py-2 rounded-full text-white text-xs font-bold flex items-center gap-2">
            <Zap size={14} className="fill-current" />
            AI Edge Node: Active
          </div>
        </header>

        <div className="flex flex-col items-center">
          <div className="w-80 h-80 border-2 border-white/30 rounded-[40px] relative overflow-hidden backdrop-blur-[2px]">
            {/* Target Reticles */}
            <div className="absolute top-4 left-4 w-8 h-8 border-t-4 border-l-4 border-rose-500 rounded-tl-lg"></div>
            <div className="absolute top-4 right-4 w-8 h-8 border-t-4 border-r-4 border-rose-500 rounded-tr-lg"></div>
            <div className="absolute bottom-4 left-4 w-8 h-8 border-b-4 border-l-4 border-rose-500 rounded-bl-lg"></div>
            <div className="absolute bottom-4 right-4 w-8 h-8 border-b-4 border-r-4 border-rose-500 rounded-br-lg"></div>

            {isScanning && (
              <>
                <motion.div 
                  initial={{ top: 0 }} animate={{ top: '100%' }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-x-0 h-1 bg-rose-400 shadow-[0_0_20px_rgba(244,63,94,1)] z-20"
                />
                <div className="absolute inset-0 bg-rose-500/10 animate-pulse"></div>
              </>
            )}

            {/* Simulated Recognition Boxes */}
            {isScanning && scanProgress > 30 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute top-20 left-10 border border-green-400 bg-green-400/20 px-2 py-1 text-[10px] text-green-400 font-mono uppercase">
                Flower_Head [98%]
              </motion.div>
            )}
          </div>
          
          <div className="mt-8 w-full max-w-[280px]">
            <div className="flex justify-between text-white text-[10px] font-bold mb-2 uppercase tracking-tighter">
              <span>System Scanning...</span>
              <span>{scanProgress}%</span>
            </div>
            <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
              <motion.div className="h-full bg-rose-500" style={{ width: `${scanProgress}%` }} />
            </div>
          </div>
        </div>

        <div className="flex justify-center pb-8">
          <button 
            onClick={() => setIsScanning(true)}
            disabled={isScanning}
            className={`group relative w-20 h-20 rounded-full border-4 ${isScanning ? 'border-gray-600' : 'border-white'} flex items-center justify-center transition-all`}
          >
            <div className={`w-14 h-14 rounded-full ${isScanning ? 'bg-gray-600' : 'bg-rose-600 group-active:scale-90 transition-transform'}`} />
          </button>
        </div>
      </div>

      <img 
        src="https://images.unsplash.com/photo-1496857239036-1fb137683000?auto=format&fit=crop&q=80&w=800" 
        className="w-full h-full object-cover opacity-80" 
        alt="Preview" 
      />
    </div>
  );
}

function AnalysisView({ setView }: ViewProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="pb-24">
      <Header setView={setView} />
      <div className="p-6 space-y-6">
        <div className="bg-white p-4 rounded-3xl shadow-sm border border-rose-100 flex gap-4">
          <img src="https://images.unsplash.com/photo-1496857239036-1fb137683000?auto=format&fit=crop&q=80&w=200" className="w-24 h-24 rounded-2xl object-cover" alt="Result" />
          <div className="flex-1">
            <span className="text-[10px] font-black bg-rose-100 text-rose-700 px-2 py-0.5 rounded uppercase">Identification Match</span>
            <h3 className="text-2xl font-bold text-rose-950">シェエラザード</h3>
            <p className="text-gray-500 text-xs flex items-center gap-1 mt-1">
              <MapPin size={12} /> Tokyo, Bunkyo-ku (Balcony)
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm">
            <ShieldCheck className="text-green-600 mb-2" size={24} />
            <div className="text-3xl font-black text-gray-900">A+</div>
            <div className="text-[10px] font-bold text-gray-400 uppercase">Disease Resistance</div>
          </div>
          <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm">
            <Sun className="text-orange-500 mb-2" size={24} />
            <div className="text-3xl font-black text-gray-900">High</div>
            <div className="text-[10px] font-bold text-gray-400 uppercase">Heat Tolerance</div>
          </div>
        </div>

        <div className="bg-rose-900 rounded-[32px] p-6 text-white relative overflow-hidden shadow-xl">
          <div className="relative z-10">
            <h4 className="flex items-center gap-2 font-bold mb-4">
              <Database size={18} className="text-rose-300" />
              育種家への貢献
            </h4>
            <p className="text-rose-100 text-sm leading-relaxed opacity-90">
              「あなたのベランダの環境（日照2.5h）での開花データは、次世代品種 **『耐陰性P-04』** の選抜において重要なエビデンスとして木村氏へ共有されました。」
            </p>
            <div className="mt-6 pt-6 border-t border-rose-800 flex justify-between items-center">
              <div className="flex -space-x-2">
                {[1,2,3,4].map(i => <div key={i} className="w-7 h-7 rounded-full border-2 border-rose-900 bg-rose-400" />)}
              </div>
              <span className="text-[10px] font-bold text-rose-300">他 2,410 名とデータ連携中</span>
            </div>
          </div>
          <div className="absolute -right-4 -bottom-4 opacity-10">
            <Activity size={120} />
          </div>
        </div>

        <button 
          onClick={() => setView('dashboard')}
          className="w-full bg-slate-900 text-white font-bold py-5 rounded-2xl flex items-center justify-center gap-3"
        >
          <BarChart3 size={20} />
          グローバル解析データを見る
        </button>
      </div>
    </motion.div>
  );
}

function DashboardView({ setView }: ViewProps) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pb-24">
      <Header setView={setView} />
      <div className="p-6 space-y-6">
        <header>
          <h2 className="text-2xl font-bold text-gray-900">Breeding Insight</h2>
          <p className="text-sm text-gray-500">品種別・全国生育パフォーマンス解析</p>
        </header>

        <div className="bg-white p-6 rounded-[32px] border border-gray-200 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-gray-800 text-sm flex items-center gap-2">
              <Zap size={16} className="text-rose-600" />
              都市部「日陰」開花率 (2025)
            </h3>
            <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-2 py-1 rounded">LIVE</span>
          </div>

          <div className="h-40 flex items-end gap-3 px-2">
            {[40, 70, 35, 95, 60, 45].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <motion.div 
                  initial={{ height: 0 }} animate={{ height: `${h}%` }}
                  className={`w-full rounded-t-lg ${i === 3 ? 'bg-rose-600' : 'bg-rose-200'}`}
                />
                <span className="text-[9px] font-bold text-gray-400">P-0{i+1}</span>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-rose-50 rounded-2xl border border-rose-100 italic text-xs text-rose-900 leading-relaxed">
            "試作品種 **P-04** は、低照度環境下で他品種より35%高いパフォーマンスを記録。都市型ガーデニングの主力候補と推測されます。"
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'Avg Sunlight', value: '3.1h', icon: <Sun size={16} className="text-orange-500" /> },
            { label: 'Avg Wind', value: '2.4m', icon: <Wind size={16} className="text-blue-400" /> },
            { label: 'Eco Score', value: '98%', icon: <Leaf size={16} className="text-green-500" /> },
          ].map(item => (
            <div key={item.label} className="bg-white p-4 rounded-2xl border border-gray-100 text-center">
              <div className="flex justify-center mb-2">{item.icon}</div>
              <div className="text-lg font-black text-gray-900">{item.value}</div>
              <div className="text-[8px] font-black text-gray-400 uppercase tracking-tighter">{item.label}</div>
            </div>
          ))}
        </div>

        <div className="p-6 bg-gradient-to-br from-rose-900 to-rose-800 rounded-[32px] text-white shadow-lg">
          <h4 className="font-serif text-lg font-bold mb-2">木村卓功氏への提言</h4>
          <p className="text-xs text-rose-100 leading-relaxed opacity-90">
            Rosariumは、全国数万人の「庭」を試験圃場に変えます。従来10年かかっていた選抜プロセスを、リアルタイムな環境適応データにより3年に短縮。エビデンスに基づく新しい育種文化を創造します。
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function App() {
  const [view, setView] = useState<string>('landing');
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scanProgress, setScanProgress] = useState<number>(0);

  // Animation for scanning progress
  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (isScanning) {
      timer = setInterval(() => {
        setScanProgress(prev => {
          if (prev >= 100) {
            clearInterval(timer);
            setTimeout(() => {
              setIsScanning(false);
              setView('analysis');
            }, 800);
            return 100;
          }
          return prev + 2;
        });
      }, 30);
    } else {
      setScanProgress(0);
    }
    return () => clearInterval(timer);
  }, [isScanning]);

  return (
    <div className="max-w-md mx-auto min-h-screen bg-[#FFFDE7] shadow-2xl relative overflow-x-hidden font-sans antialiased">
      <AnimatePresence mode="wait">
        {view === 'landing' && <LandingView key="l" setView={setView} />}
        {view === 'scan' && (
          <ScanView 
            key="s" 
            setView={setView} 
            isScanning={isScanning} 
            setIsScanning={setIsScanning} 
            scanProgress={scanProgress} 
          />
        )}
        {view === 'analysis' && <AnalysisView key="a" setView={setView} />}
        {view === 'dashboard' && <DashboardView key="d" setView={setView} />}
      </AnimatePresence>

      {/* Navigation */}
      <nav className="fixed bottom-0 max-w-md w-full bg-white/90 backdrop-blur-xl border-t border-rose-100 flex justify-around items-center py-4 z-40">
        <button onClick={() => setView('landing')} className={`p-2 transition-colors ${view === 'landing' ? 'text-rose-700' : 'text-gray-300'}`}>
          <LayoutDashboard size={24} />
        </button>
        <button 
          onClick={() => setView('scan')} 
          className="relative -mt-12 bg-rose-700 text-white p-5 rounded-full shadow-2xl border-4 border-[#FFFDE7] active:scale-90 transition-transform"
        >
          <Camera size={28} />
        </button>
        <button onClick={() => setView('dashboard')} className={`p-2 transition-colors ${view === 'dashboard' ? 'text-rose-700' : 'text-gray-300'}`}>
          <BarChart3 size={24} />
        </button>
      </nav>
    </div>
  );
}