import React from 'react';
import { Palette, Check, Sparkles } from 'lucide-react';
import { WALLPAPER_THEMES } from '../data/romanticContent';
import { WallpaperTheme } from '../types';

interface WallpaperSelectorProps {
  currentTheme: WallpaperTheme;
  onSelectTheme: (theme: WallpaperTheme) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export const WallpaperSelector: React.FC<WallpaperSelectorProps> = ({
  currentTheme,
  onSelectTheme,
  isOpen,
  onToggle,
}) => {
  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className="px-3 py-1.5 rounded-full bg-rose-950/70 border border-rose-400/40 text-rose-200 hover:text-white hover:border-amber-300/60 transition-all flex items-center gap-1.5 text-xs font-body shadow-lg backdrop-blur-md"
        title="Change Wallpaper Ambience"
      >
        <Palette className="w-3.5 h-3.5 text-rose-300" />
        <span className="hidden sm:inline">Wallpaper</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-64 max-w-[calc(100vw-2rem)] p-3 rounded-2xl bg-stone-950/95 border border-rose-400/40 shadow-2xl backdrop-blur-xl z-30 space-y-2">
          <div className="flex items-center justify-between pb-2 border-b border-rose-500/20 px-1">
            <span className="text-xs font-semibold text-rose-200 font-body flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-300" />
              Romantic Wallpapers
            </span>
          </div>

          <div className="space-y-1.5">
            {WALLPAPER_THEMES.map((theme) => {
              const isSelected = theme.id === currentTheme.id;
              return (
                <button
                  key={theme.id}
                  onClick={() => {
                    onSelectTheme(theme);
                    onToggle();
                  }}
                  className={`w-full flex items-center justify-between p-2 rounded-xl transition-all text-xs font-body ${
                    isSelected
                      ? 'bg-rose-900/60 border border-rose-400/50 text-white'
                      : 'hover:bg-rose-950/40 text-rose-200/80 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-5 h-5 rounded-full border border-white/20 shadow-inner"
                      style={{ backgroundColor: theme.previewColor }}
                    />
                    <span>{theme.name}</span>
                  </div>
                  {isSelected && <Check className="w-3.5 h-3.5 text-amber-300" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
