import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Heart,
  Music,
  Music2,
  Sparkles,
  Eye,
  EyeOff,
  Palette,
  Bookmark,
  Share2,
  RefreshCw,
  Gift,
  Flame,
  Smile,
  Volume2,
  VolumeX,
  Compass
} from 'lucide-react';
import { BoxCategory, LoveMessage, WallpaperTheme } from './types';
import { WALLPAPER_THEMES, ROMANTIC_MESSAGES, BOX_METADATA } from './data/romanticContent';
import { FallingRosesCanvas } from './components/FallingRosesCanvas';
import { SecretBox } from './components/SecretBox';
import { OpenedBoxModal } from './components/OpenedBoxModal';
import { KeepsakeModal } from './components/KeepsakeModal';
import { WallpaperSelector } from './components/WallpaperSelector';
import { romanticAudio } from './utils/romanticAudio';
import confetti from 'canvas-confetti';
import roseBlossomUrl from './assets/images/real_pink_rose_blossom_1794132750309.jpg';

export default function App() {
  const [currentTheme, setCurrentTheme] = useState<WallpaperTheme>(WALLPAPER_THEMES[0]);
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);
  const [activeBoxCategory, setActiveBoxCategory] = useState<BoxCategory | null>(null);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [isWallpaperOnly, setIsWallpaperOnly] = useState(false);
  const [petalDensity, setPetalDensity] = useState<'gentle' | 'romantic' | 'blizzard'>('romantic');
  const [isKeepsakeOpen, setIsKeepsakeOpen] = useState(false);

  // Saved favorites in localStorage
  const [favoriteIds, setFavoriteIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('bayyan_favorites');
      return stored ? JSON.parse(stored) : ['love-1', 'romance-1'];
    } catch {
      return ['love-1', 'romance-1'];
    }
  });

  const toggleFavorite = (msg: LoveMessage) => {
    setFavoriteIds((prev) => {
      const exists = prev.includes(msg.id);
      const next = exists ? prev.filter((id) => id !== msg.id) : [...prev, msg.id];
      try {
        localStorage.setItem('bayyan_favorites', JSON.stringify(next));
      } catch {
        // Ignored
      }
      return next;
    });
  };

  const handleToggleMusic = () => {
    const newState = romanticAudio.toggleAmbientMusic((playing) => {
      setIsMusicPlaying(playing);
    });
    setIsMusicPlaying(newState);
  };

  const triggerRoseBurst = (e: React.MouseEvent) => {
    // Only if clicking on background
    if ((e.target as HTMLElement).closest('button, .group, input, .modal')) return;

    romanticAudio.playHeartTap();
    try {
      confetti({
        particleCount: 18,
        spread: 60,
        origin: { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight },
        colors: ['#f43f5e', '#fb7185', '#ffe4e6', '#fda4af', '#facc15'],
        scalar: 0.9,
      });
    } catch {
      // Ignored
    }
  };

  const categories: BoxCategory[] = [
    'love_messages',
    'deep_romance',
    'hot_feelings',
    'romance_jokes',
  ];

  const favoriteMessages = ROMANTIC_MESSAGES.filter((m) => favoriteIds.includes(m.id));

  return (
    <div
      onClick={triggerRoseBurst}
      className={`relative min-h-screen w-full bg-gradient-to-b ${currentTheme.gradientClass} text-white selection:bg-rose-500 selection:text-white transition-colors duration-1000 overflow-x-hidden flex flex-col justify-between`}
    >
      {/* Dynamic Falling Pink Roses & Petals Canvas Engine */}
      <FallingRosesCanvas
        petalColors={currentTheme.petalColors}
        density={petalDensity}
        interactive={true}
      />

      {/* Atmospheric Ambient Light Overlays */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: `radial-gradient(circle at 50% 20%, ${currentTheme.ambientTone} 0%, transparent 70%)`,
        }}
      />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-rose-950/20 via-transparent to-transparent pointer-events-none z-0" />

      {/* TOP HEADER CONTROLS */}
      <header className="relative z-30 w-full max-w-6xl mx-auto px-4 py-4 sm:py-6 flex items-center justify-between">
        {/* App Title / Brand */}
        <div className="flex items-center gap-2.5">
          <motion.div
            animate={{ scale: [1, 1.1, 1], rotate: [0, 4, -4, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
            className="w-11 h-11 rounded-full p-0.5 bg-gradient-to-tr from-amber-300 via-rose-500 to-amber-200 shadow-[0_0_15px_rgba(244,63,94,0.6)] flex items-center justify-center cursor-pointer overflow-hidden"
            onClick={() => {
              romanticAudio.playHeartTap();
              confetti({ particleCount: 30, spread: 60, colors: ['#f43f5e', '#fb7185'] });
            }}
          >
            <img
              src={roseBlossomUrl}
              alt="Real Pink Rose for Bayyan"
              className="w-full h-full object-cover rounded-full"
            />
          </motion.div>
          <div>
            <h1 className="text-lg sm:text-xl font-display font-bold tracking-wider text-rose-100 flex items-center gap-1.5">
              <span>BAYYAN</span>
              <span className="text-rose-400 font-script text-base sm:text-lg">حبيبتي</span>
            </h1>
            <p className="text-[10px] text-rose-300/70 font-body uppercase tracking-widest hidden sm:block">
              Forever Romantic Sanctuary
            </p>
          </div>
        </div>

        {/* Action Controls Toolbar */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Ambient Music Toggle */}
          <button
            onClick={handleToggleMusic}
            className={`px-3 py-1.5 rounded-full border transition-all flex items-center gap-1.5 text-xs font-body shadow-lg backdrop-blur-md ${
              isMusicPlaying
                ? 'bg-rose-600 border-rose-300 text-white shadow-rose-600/40'
                : 'bg-rose-950/70 border-rose-400/30 text-rose-200 hover:text-white'
            }`}
            title={isMusicPlaying ? 'Pause Romantic Music' : 'Play Romantic Music'}
          >
            {isMusicPlaying ? (
              <Music className="w-3.5 h-3.5 animate-bounce" />
            ) : (
              <Music2 className="w-3.5 h-3.5 text-rose-300" />
            )}
            <span className="hidden md:inline">{isMusicPlaying ? 'Music Playing' : 'Play Melody'}</span>
          </button>

          {/* Petal Density Toggle */}
          <button
            onClick={() => {
              const modes: ('gentle' | 'romantic' | 'blizzard')[] = ['gentle', 'romantic', 'blizzard'];
              const next = modes[(modes.indexOf(petalDensity) + 1) % modes.length];
              setPetalDensity(next);
            }}
            className="px-3 py-1.5 rounded-full bg-rose-950/70 border border-rose-400/30 text-rose-200 hover:text-white transition-all text-xs font-body shadow-lg backdrop-blur-md hidden sm:flex items-center gap-1.5"
            title="Adjust Falling Rose Petal Rain"
          >
            <span>🌹</span>
            <span className="capitalize">{petalDensity}</span>
          </button>

          {/* Wallpaper Theme Picker */}
          <WallpaperSelector
            currentTheme={currentTheme}
            onSelectTheme={setCurrentTheme}
            isOpen={isThemeMenuOpen}
            onToggle={() => setIsThemeMenuOpen(!isThemeMenuOpen)}
          />

          {/* Bayyan's Keepsake Heart */}
          <button
            onClick={() => setIsKeepsakeOpen(true)}
            className="relative px-3 py-1.5 rounded-full bg-rose-950/70 border border-rose-400/30 text-rose-200 hover:text-white transition-all flex items-center gap-1.5 text-xs font-body shadow-lg backdrop-blur-md"
            title="Bayyan's Saved Whispers"
          >
            <Bookmark className="w-3.5 h-3.5 text-rose-300" />
            <span className="hidden sm:inline">Saved</span>
            {favoriteIds.length > 0 && (
              <span className="w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] flex items-center justify-center font-bold">
                {favoriteIds.length}
              </span>
            )}
          </button>

          {/* Wallpaper Only Mode (Hides UI for pure romantic viewing) */}
          <button
            onClick={() => setIsWallpaperOnly(!isWallpaperOnly)}
            className={`p-2 rounded-full border transition-all text-xs shadow-lg backdrop-blur-md ${
              isWallpaperOnly
                ? 'bg-amber-400 text-stone-950 border-amber-300 font-bold'
                : 'bg-rose-950/70 border-rose-400/30 text-rose-200 hover:text-white'
            }`}
            title={isWallpaperOnly ? 'Show Romantic Boxes' : 'Wallpaper Mode (Hide Boxes)'}
          >
            {isWallpaperOnly ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* MAIN ROMANTIC CONTENT */}
      <main className="relative z-20 flex-1 flex flex-col items-center justify-center w-full max-w-6xl mx-auto px-4 py-4 sm:py-8">
        <AnimatePresence>
          {!isWallpaperOnly ? (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="w-full flex flex-col items-center"
            >
              {/* HERO CALLIGRAPHIC BANNER DEDICATED TO BAYYAN */}
              <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-950/70 border border-rose-400/40 text-rose-300 text-xs font-body tracking-widest uppercase mb-4 shadow-[0_0_20px_rgba(244,63,94,0.3)] backdrop-blur-md"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" style={{ animationDuration: '8s' }} />
                  <span>To The Queen Of My Heart</span>
                  <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" style={{ animationDuration: '8s' }} />
                </motion.div>

                {/* Grand Name Display: BAYYAN */}
                <h2 className="text-4xl sm:text-6xl md:text-7xl font-display font-black tracking-wider text-rose-100 drop-shadow-[0_5px_15px_rgba(0,0,0,0.8)]">
                  For My Love{' '}
                  <span className="text-gold-shimmer font-serif-luxury italic">
                    Bayyan
                  </span>
                </h2>

                <p className="text-2xl sm:text-3xl font-script text-rose-300 tracking-wide mt-2">
                  بيان.. يا أجمل ما رأت عيني وأنبل ما نبض به قلبي
                </p>

                <p className="text-xs sm:text-sm text-rose-100/80 font-serif-luxury mt-3 max-w-lg mx-auto leading-relaxed">
                  Four secret velvet boxes await your gentle touch. Each holds different love messages,
                  passionate thoughts, romantic giggles, and pink roses blooming with your name.
                </p>

                {/* Interactive hint */}
                <div className="flex items-center justify-center gap-2 mt-4 text-[11px] text-rose-300/70 font-body">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-ping" />
                  <span>Choose any box below to uncover a surprise for Bayyan</span>
                </div>
              </div>

              {/* THE FOUR INTERACTIVE SECRET BOXES GRID */}
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
                {categories.map((cat, idx) => (
                  <SecretBox
                    key={cat}
                    category={cat}
                    index={idx}
                    onClick={(c) => setActiveBoxCategory(c)}
                  />
                ))}
              </div>
            </motion.div>
          ) : (
            /* WALLPAPER FULLSCREEN MODE */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center text-center p-8 select-none"
            >
              <motion.div
                animate={{ scale: [1, 1.05, 1], y: [0, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="p-8 sm:p-12 rounded-3xl bg-stone-950/60 border border-rose-400/30 backdrop-blur-md shadow-2xl max-w-xl flex flex-col items-center"
              >
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full p-1 bg-gradient-to-tr from-amber-300 via-rose-500 to-amber-200 shadow-[0_0_25px_rgba(244,63,94,0.7)] overflow-hidden">
                  <img
                    src={roseBlossomUrl}
                    alt="Real Pink Rose for Bayyan"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <h2 className="text-4xl sm:text-6xl font-display font-bold text-gold-shimmer mt-5 tracking-widest">
                  BAYYAN
                </h2>
                <p className="text-2xl sm:text-3xl font-script text-rose-200 mt-2">
                  معشوقتي وحبيبتي الأبدية
                </p>
                <p className="text-xs sm:text-sm text-rose-200/80 font-serif-luxury mt-4 leading-relaxed">
                  "In every fluttering petal and every gentle breeze, my heart repeats your name."
                </p>

                <button
                  onClick={() => setIsWallpaperOnly(false)}
                  className="mt-6 px-6 py-2.5 rounded-full bg-gradient-to-r from-rose-600 to-pink-600 text-white text-xs font-body font-semibold tracking-wider uppercase hover:shadow-lg hover:shadow-rose-600/40 transition-all active:scale-95"
                >
                  Return to Secret Boxes ✨
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* FOOTER */}
      <footer className="relative z-20 w-full max-w-6xl mx-auto px-4 py-4 text-center border-t border-rose-500/15">
        <p className="text-xs text-rose-300/70 font-body flex items-center justify-center gap-1.5 flex-wrap">
          <span>Created with eternal love & pink roses for</span>
          <strong className="text-rose-200 font-serif-luxury font-bold">Bayyan</strong>
          <span className="text-rose-400">🌹</span>
        </p>
      </footer>

      {/* OPENED BOX MODAL */}
      <OpenedBoxModal
        category={activeBoxCategory}
        onClose={() => setActiveBoxCategory(null)}
        onToggleFavorite={toggleFavorite}
        favorites={favoriteIds}
      />

      {/* KEEPSAKE MODAL */}
      <KeepsakeModal
        isOpen={isKeepsakeOpen}
        onClose={() => setIsKeepsakeOpen(false)}
        favoriteMessages={favoriteMessages}
        onRemoveFavorite={(id) => {
          setFavoriteIds((prev) => prev.filter((item) => item !== id));
        }}
      />
    </div>
  );
}
