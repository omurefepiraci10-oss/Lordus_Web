import React, { useState } from 'react';
import { Languages, ArrowRight, Copy, Check } from 'lucide-react';
import { translateText } from '../services/gemini';

export const Translate: React.FC = () => {
  const [text, setText] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [targetLang, setTargetLang] = useState('İngilizce');

  const handleTranslate = async () => {
    if (!text) return;
    setLoading(true);
    const translated = await translateText(text, targetLang);
    setResult(translated || '');
    setLoading(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex items-center gap-2 mb-8 text-2xl font-bold">
        <Languages className="text-[var(--theme-primary)]" />
        Translate
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border rounded-2xl p-4 shadow-sm">
          <div className="mb-4 text-sm font-medium text-gray-500 border-b pb-2">Türkçe</div>
          <textarea
            className="w-full h-48 outline-none text-xl resize-none"
            placeholder="Bir metin girin..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>

        <div className="bg-white border rounded-2xl p-4 shadow-sm relative">
          <div className="mb-4 flex justify-between items-center border-b pb-2">
            <select 
              className="text-sm font-medium text-gray-500 outline-none bg-transparent cursor-pointer"
              value={targetLang}
              onChange={(e) => setTargetLang(e.target.value)}
            >
              <option>İngilizce</option>
              <option>Almanca</option>
              <option>Fransızca</option>
              <option>İspanyolca</option>
              <option>Japonca</option>
            </select>
            {result && (
              <button 
                onClick={copyToClipboard}
                className="hover:bg-gray-100 p-1 rounded-md transition-colors"
                title="Kopyala"
              >
                {copied ? <Check size={18} className="text-green-500" /> : <Copy size={18} className="text-gray-400" />}
              </button>
            )}
          </div>
          <div className={`w-full h-48 text-xl ${loading ? 'animate-pulse text-gray-300' : ''}`}>
            {loading ? 'Çevriliyor...' : result || <span className="text-gray-300">Çeviri burada görünecek</span>}
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-center">
        <button
          onClick={handleTranslate}
          disabled={loading || !text}
          className="px-12 py-3 bg-[var(--theme-primary)] text-white rounded-full font-semibold hover:opacity-90 disabled:opacity-50 transition-all flex items-center gap-3 shadow-lg hover:shadow-[var(--theme-primary)]/20"
        >
          {loading ? 'Lütfen Bekleyin...' : 'Çevir'}
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
};
