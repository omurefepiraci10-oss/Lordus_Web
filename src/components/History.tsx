import React, { useState, useEffect } from 'react';
import { History as HistoryIcon, Trash2, Clock } from 'lucide-react';

export const History: React.FC = () => {
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('search_history');
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  const clearHistory = () => {
    localStorage.removeItem('search_history');
    setHistory([]);
  };

  if (history.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-400">
        <Clock className="w-12 h-12 mb-4 opacity-20" />
        <p>Henüz geçmişiniz temiz.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <HistoryIcon className="text-[var(--theme-primary)]" />
          Arama Geçmişi
        </h2>
        <button 
          onClick={clearHistory}
          className="text-red-500 hover:bg-red-50 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <Trash2 size={18} /> Temizle
        </button>
      </div>
      <div className="space-y-2">
        {history.map((item, index) => (
          <div key={index} className="flex items-center gap-4 p-4 bg-white border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors">
            <Clock size={16} className="text-gray-400" />
            <span className="flex-1">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
