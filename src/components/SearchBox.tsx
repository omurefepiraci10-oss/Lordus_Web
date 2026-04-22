import React, { useState } from 'react';
import { Search, Mic, Camera, X } from 'lucide-react';
import { motion } from 'motion/react';

interface SearchBoxProps {
  onSearch: (query: string) => void;
}

export const SearchBox: React.FC<SearchBoxProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <div className="w-full max-w-2xl px-4">
      <form onSubmit={handleSubmit} className="relative group">
        <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-[var(--theme-primary)] group-hover:text-[var(--theme-accent)] transition-colors opacity-50" />
        </div>
        <input
          type="text"
          className="block w-full pl-14 pr-28 py-4 bg-white border border-[var(--theme-border)] rounded-full text-lg shadow-sm hover:shadow-md focus:shadow-md focus:outline-none transition-all duration-300 placeholder-[var(--theme-primary)]/40"
          placeholder="Lordus'ta ara veya bir URL yaz"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-6 space-x-3">
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="p-1 hover:bg-[var(--theme-secondary)] rounded-full transition-colors"
            >
              <X className="h-5 w-5 text-[var(--theme-primary)]" />
            </button>
          )}
          <Mic className="h-5 w-5 text-[var(--theme-primary)] cursor-pointer hover:scale-110 transition-transform opacity-70" />
          <Camera className="h-5 w-5 text-[var(--theme-primary)] cursor-pointer hover:scale-110 transition-transform opacity-70" />
        </div>
      </form>
      
      <div className="flex flex-wrap justify-center mt-8 gap-3">
        <button 
          onClick={() => onSearch(query)}
          className="px-5 py-2.5 bg-[var(--theme-button)] text-[var(--theme-accent)] hover:bg-[var(--theme-border)] rounded transition-colors text-sm font-medium shadow-sm active:scale-95"
        >
          Lordus'ta Ara
        </button>
        <button 
          className="px-5 py-2.5 bg-[var(--theme-button)] text-[var(--theme-accent)] hover:bg-[var(--theme-border)] rounded transition-colors text-sm font-medium shadow-sm active:scale-95"
        >
          Kendimi Şanslı Hissediyorum
        </button>
      </div>
    </div>
  );
};
