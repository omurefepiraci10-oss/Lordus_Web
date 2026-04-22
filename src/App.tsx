import React, { useState, useEffect } from 'react';
import { ThemeProvider, useTheme } from './components/ThemeContext';
import { SearchBox } from './components/SearchBox';
import { Translate } from './components/Translate';
import { History } from './components/History';
import { Settings } from './components/Settings';
import { searchGemini } from './services/gemini';
import { LayoutGrid, ArrowLeft, Search, Mic, Camera, X, Globe, Settings as SettingsIcon, MoreVertical, Languages, History as HistoryIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type View = 'home' | 'results' | 'translate' | 'history' | 'settings' | 'news' | 'maps';

const AppContent: React.FC = () => {
  const [view, setView] = useState<View>('home');
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const handleSearch = async (q: string) => {
    if (!q.trim()) return;
    setQuery(q);
    setLoading(true);
    setView('results');
    setMenuOpen(false);
    
    // Save to history
    const history = JSON.parse(localStorage.getItem('search_history') || '[]');
    localStorage.setItem('search_history', JSON.stringify([q, ...history.slice(0, 49)]));

    const response = await searchGemini(q);
    setResult(response);
    setLoading(false);
  };

  const goHome = () => {
    setView('home');
    setQuery('');
    setResult(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Navigation Bar */}
      <header className="fixed top-0 w-full h-16 flex items-center justify-between px-6 bg-[var(--theme-secondary)]/80 backdrop-blur-md z-50">
        <div className="flex items-center gap-6 text-sm font-semibold text-[var(--theme-primary)]">
          {view !== 'home' && (
            <button 
              onClick={goHome}
              className="p-2 hover:bg-[var(--theme-button)] rounded-full transition-colors text-[var(--theme-accent)]"
            >
              <ArrowLeft size={20} />
            </button>
          )}
          <button className="hover:underline hidden sm:block">Hakkında</button>
          <button onClick={() => setView('history')} className="hover:underline hidden sm:block">Geçmiş</button>
          <div 
            onClick={goHome}
            className={`google-logo ${view === 'home' ? 'hidden' : 'flex'} text-xl cursor-pointer select-none tracking-tight gap-0.5`}
          >
            <span className="text-[var(--theme-primary)]">L</span>
            <span className="text-[var(--theme-primary)] opacity-90">o</span>
            <span className="text-[var(--theme-primary)] opacity-80">r</span>
            <span className="text-[var(--theme-primary)] opacity-70">d</span>
            <span className="text-[var(--theme-primary)] opacity-60">u</span>
            <span className="text-[var(--theme-primary)] opacity-50">s</span>
          </div>
        </div>

        <div className="flex items-center gap-5 relative">
          <button onClick={() => setView('translate')} className="hover:underline text-sm font-semibold text-[var(--theme-primary)] hidden sm:block">Translate</button>
          
          <div className="relative">
            <button 
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 hover:bg-[var(--theme-button)] rounded-full cursor-pointer text-[var(--theme-accent)] transition-colors"
            >
              <MoreVertical size={24} />
            </button>
            
            <AnimatePresence>
              {menuOpen && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 10 }}
                  className="absolute right-0 mt-2 w-56 bg-white border border-[var(--theme-border)] rounded-2xl shadow-xl z-[100] overflow-hidden"
                >
                  <div className="p-2 space-y-1">
                    <button 
                      onClick={() => { setView('translate'); setMenuOpen(false); }}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[var(--theme-secondary)] rounded-xl text-sm font-medium transition-colors text-[var(--theme-accent)]"
                    >
                      <Languages size={18} className="text-[var(--theme-primary)]" />
                      Translate
                    </button>
                    <button 
                      onClick={() => { setView('history'); setMenuOpen(false); }}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[var(--theme-secondary)] rounded-xl text-sm font-medium transition-colors text-[var(--theme-accent)]"
                    >
                      <HistoryIcon size={18} className="text-[var(--theme-primary)]" />
                      Arama Geçmişi
                    </button>
                    <button 
                      onClick={() => { setView('settings'); setMenuOpen(false); }}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[var(--theme-secondary)] rounded-xl text-sm font-medium transition-colors text-[var(--theme-accent)]"
                    >
                      <SettingsIcon size={18} className="text-[var(--theme-primary)]" />
                      Ayarlar
                    </button>
                    <div className="h-px bg-gray-100 my-1 mx-4" />
                    <button 
                      onClick={() => { setView('maps'); setMenuOpen(false); }}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[var(--theme-secondary)] rounded-xl text-sm font-medium transition-colors text-[var(--theme-accent)]"
                    >
                      <Globe size={18} className="text-[var(--theme-primary)]" />
                      Haritalar
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>

      <main className="flex-1 pt-24 pb-12">
        <AnimatePresence mode="wait">
          {view === 'home' && (
            <motion.div 
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center justify-center min-h-[60vh]"
            >
              <div className="google-logo text-8xl font-black mb-8 tracking-tighter flex select-none">
                <span className="text-[var(--theme-primary)]">L</span>
                <span className="text-[var(--theme-primary)] opacity-90">o</span>
                <span className="text-[var(--theme-primary)] opacity-80">r</span>
                <span className="text-[var(--theme-primary)] opacity-70">d</span>
                <span className="text-[var(--theme-primary)] opacity-60">u</span>
                <span className="text-[var(--theme-primary)] opacity-50">s</span>
              </div>
              <SearchBox onSearch={handleSearch} />
            </motion.div>
          )}

          {view === 'results' && (
            <motion.div 
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-4xl mx-auto px-6"
            >
              <div className="flex items-center bg-white border border-gray-200 rounded-full py-2 px-6 shadow-sm mb-12 max-w-2xl">
                <Search size={18} className="text-[var(--theme-primary)] mr-3" />
                <input 
                  type="text" 
                  className="flex-1 outline-none text-gray-800" 
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch(query)}
                />
                <X size={18} className="text-gray-400 cursor-pointer mx-2" onClick={() => setQuery('')} />
                <Mic size={18} className="text-[var(--theme-primary)] mx-2" />
                <Camera size={18} className="text-[var(--theme-primary)] mx-2" />
              </div>

              {loading ? (
                <div className="space-y-6">
                  <div className="h-4 bg-gray-100 rounded w-3/4 animate-pulse" />
                  <div className="h-4 bg-gray-100 rounded w-full animate-pulse" />
                  <div className="h-4 bg-gray-100 rounded w-2/3 animate-pulse" />
                </div>
              ) : (
                <div className="prose prose-pink max-w-none">
                  <p className="text-sm text-gray-500 mb-2 italic">Yaklaşık 1.250.000 sonuç bulundu (0,45 saniye)</p>
                  <div className="bg-[var(--theme-secondary)]/10 border border-[var(--theme-secondary)] p-6 rounded-2xl shadow-sm">
                    <h2 className="text-sm font-semibold text-[var(--theme-primary)] mb-4 flex items-center gap-2">
                       AI Tarafından Oluşturulan Yanıt
                    </h2>
                    <div className="text-lg text-gray-800 leading-relaxed whitespace-pre-wrap">
                      {result}
                    </div>
                  </div>
                  
                  <div className="mt-12 space-y-8">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="group">
                        <div className="text-sm text-gray-600 mb-1">https://lordus.com › explore › item-{i}</div>
                        <h3 className="text-xl text-[var(--theme-accent)] group-hover:underline cursor-pointer font-medium mb-1">
                          {query} hakkında bilinmesi gereken {i === 1 ? 'en iyi' : i === 2 ? 'ilginç' : 'detaylı'} bilgiler
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          Bu içerik, kullanıcıların aradıkları {query} konusu hakkında derinlemesine bir bakış sunar. Lordus'un modern altyapısı sayesinde aradığınız her şeye hızlıca ulaşabilirsiniz...
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {view === 'translate' && <motion.div key="translate" initial={{ opacity: 0 }} animate={{ opacity: 1 }}><Translate /></motion.div>}
          {view === 'history' && <motion.div key="history" initial={{ opacity: 0 }} animate={{ opacity: 1 }}><History /></motion.div>}
          {view === 'settings' && <motion.div key="settings" initial={{ opacity: 0 }} animate={{ opacity: 1 }}><Settings /></motion.div>}
          
          {(view === 'news' || view === 'maps') && (
            <div className="flex flex-col items-center justify-center py-20 text-gray-400">
              <Globe className="w-16 h-16 mb-6 opacity-20" />
              <p className="text-xl">{view.toUpperCase()} modülü yakında eklenecek.</p>
              <button onClick={() => setView('home')} className="mt-6 text-[var(--theme-primary)] hover:underline">Geri Dön</button>
            </div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="py-4 bg-[var(--theme-button)] border-t border-[var(--theme-border)] flex flex-col sm:flex-row items-center justify-between px-8 gap-4">
        <div className="flex gap-6 text-sm text-[var(--theme-accent)] font-medium">
          <button className="hover:underline">Reklam</button>
          <button className="hover:underline">İşletme</button>
          <button className="hover:underline">Arama nasıl çalışır?</button>
        </div>

        <div className="flex items-center gap-3 bg-white/30 px-4 py-1.5 rounded-full border border-[var(--theme-border)]">
          <span className="text-[10px] font-bold text-[var(--theme-primary)] mr-1 uppercase tracking-wider">Temalar</span>
          {[
            { id: 'pink', color: 'bg-pink-500' },
            { id: 'blue', color: 'bg-blue-500' },
            { id: 'yellow', color: 'bg-yellow-400' },
            { id: 'green', color: 'bg-green-500' },
            { id: 'purple', color: 'bg-purple-500' }
          ].map(t => (
            <div 
              key={t.id}
              onClick={() => setTheme(t.id as any)}
              className={`w-4 h-4 rounded-full ${t.color} border-2 border-white cursor-pointer hover:scale-125 transition-transform ${theme === t.id ? 'ring-2 ring-[var(--theme-primary)]' : ''}`}
            />
          ))}
        </div>

        <div className="flex flex-col items-end gap-1">
          <div className="flex gap-6 text-sm text-[var(--theme-accent)] font-medium">
            <button className="hover:underline">Gizlilik</button>
            <button className="hover:underline">Şartlar</button>
            <button onClick={() => setView('settings')} className="hover:underline">Ayarlar</button>
          </div>
          <p className="text-[10px] font-black tracking-widest text-[var(--theme-primary)] uppercase opacity-60">development by Omrvibess</p>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
