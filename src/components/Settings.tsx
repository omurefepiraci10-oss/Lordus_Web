import React from 'react';
import { useTheme } from './ThemeContext';
import { Settings as SettingsIcon, Palette, RotateCcw } from 'lucide-react';

export const Settings: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const themes: { name: 'pink' | 'blue' | 'yellow' | 'green' | 'purple', label: string, color: string }[] = [
    { name: 'pink', label: 'Lordus (Ana)', color: '#db2777' },
    { name: 'blue', label: 'Mavi', color: '#2563eb' },
    { name: 'yellow', label: 'Sarı', color: '#ca8a04' },
    { name: 'green', label: 'Yeşil', color: '#16a34a' },
    { name: 'purple', label: 'Mor', color: '#9333ea' },
  ];

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold flex items-center gap-2 mb-8">
        <SettingsIcon className="text-gray-500" />
        Ayarlar
      </h2>

      <div className="bg-white border rounded-2xl overflow-hidden shadow-sm">
        <div className="p-6 border-b">
          <div className="flex items-center gap-3 mb-6">
            <Palette className="text-[var(--theme-primary)]" />
            <span className="font-semibold text-lg">Görünüm ve Tema</span>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {themes.map((t) => (
              <button
                key={t.name}
                onClick={() => setTheme(t.name)}
                className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
                  theme === t.name 
                  ? 'border-[var(--theme-primary)] bg-[var(--theme-secondary)]/30' 
                  : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50'
                }`}
              >
                <div 
                  className="w-10 h-10 rounded-full shadow-inner" 
                  style={{ backgroundColor: t.color }}
                />
                <span className="font-medium">{t.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="p-6 bg-gray-50/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold">Sıfırla</p>
              <p className="text-sm text-gray-500">Tüm ayarları varsayılana döndür</p>
            </div>
            <button 
              onClick={() => setTheme('pink')}
              className="p-2 hover:bg-gray-200 rounded-full transition-colors"
            >
              <RotateCcw size={20} className="text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
