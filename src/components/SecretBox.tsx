import React from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles, Flame, Smile, Gift, LockOpen } from 'lucide-react';
import { BoxCategory } from '../types';
import { BOX_METADATA } from '../data/romanticContent';
import { romanticAudio } from '../utils/romanticAudio';
import confetti from 'canvas-confetti';

interface SecretBoxProps {
  category: BoxCategory;
  onClick: (cat: BoxCategory) => void;
  index: number;
}

export const SecretBox: React.FC<SecretBoxProps> = ({ category, onClick, index }) => {
  const meta = BOX_METADATA[category];

  const getIcon = () => {
    switch (meta.icon) {
      case 'Heart':
        return <Heart className="w-7 h-7 text-rose-200 fill-rose-300/40" />;
      case 'Sparkles':
        return <Sparkles className="w-7 h-7 text-amber-200 fill-amber-300/30" />;
      case 'Flame':
        return <Flame className="w-7 h-7 text-amber-300 fill-red-500/50" />;
      case 'Smile':
        return <Smile className="w-7 h-7 text-pink-200 fill-pink-300/40" />;
      default:
        return <Gift className="w-7 h-7 text-rose-200" />;
    }
  };

  const handleOpen = () => {
    romanticAudio.playBoxOpenChime();

    // Trigger sweet petal burst celebration
    try {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.65 },
        colors: ['#f43f5e', '#fb7185', '#ffe4e6', '#facc15', '#f472b6'],
        shapes: ['circle'],
        scalar: 1.2
      });
    } catch {
      // Ignored
    }

    onClick(category);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 35, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: index * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      onClick={handleOpen}
      className="group relative cursor-pointer select-none touch-manipulation"
      style={{ WebkitTapHighlightColor: 'transparent' }}
    >
      {/* Outer ambient glow */}
      <div
        className={`absolute -inset-1 rounded-3xl bg-gradient-to-r ${meta.boxColor} opacity-40 blur-xl group-hover:opacity-80 transition duration-500`}
      />

      {/* Main Luxury Gift Box */}
      <div className="relative rounded-3xl overflow-hidden border border-rose-300/30 bg-gradient-to-b from-stone-900/90 via-[#260815]/95 to-stone-950/95 backdrop-blur-xl p-5 sm:p-6 shadow-2xl transition-all duration-300 flex flex-col justify-between min-h-[260px] sm:min-h-[290px]">
        {/* Subtle patterned shimmer */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-rose-500/15 via-transparent to-transparent pointer-events-none" />

        {/* Golden Silk Ribbon Overlay (Horizontal and Vertical) */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-6 bg-gradient-to-r from-amber-400/20 via-amber-200/40 to-amber-400/20 pointer-events-none border-y border-amber-300/30" />
        <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-6 bg-gradient-to-b from-amber-400/20 via-amber-200/40 to-amber-400/20 pointer-events-none border-x border-amber-300/30" />

        {/* 3D Bow Knot at intersection */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-gradient-to-tr from-amber-400 via-amber-200 to-amber-500 shadow-lg border border-amber-100 flex items-center justify-center pointer-events-none z-10 group-hover:scale-115 transition-transform duration-300">
          <div className="w-4 h-4 rounded-full bg-amber-600/40 shadow-inner" />
        </div>

        {/* Box Top Header */}
        <div className="relative z-10 flex items-start justify-between">
          <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-rose-500/30 to-purple-900/40 border border-rose-300/40 flex items-center justify-center shadow-inner group-hover:border-amber-300/80 transition-colors">
            {getIcon()}
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-950/80 text-rose-200 border border-rose-400/30 tracking-wider uppercase font-body">
            <span>Box #{index + 1}</span>
          </span>
        </div>

        {/* Box Content Titles */}
        <div className="relative z-10 mt-6 text-center">
          <h3 className="text-xl sm:text-2xl font-serif-luxury font-bold text-white tracking-wide group-hover:text-amber-200 transition-colors">
            {meta.title}
          </h3>
          <p className="text-sm font-script text-rose-300 tracking-wider mt-1 text-lg">
            {meta.arabicTitle}
          </p>
          <p className="text-xs text-rose-100/70 mt-2 font-body line-clamp-2 leading-relaxed">
            {meta.tagline}
          </p>
        </div>

        {/* Bottom Action Footer */}
        <div className="relative z-10 mt-5 pt-3 border-t border-rose-500/20 flex items-center justify-between">
          <div className="flex items-center gap-1 text-[11px] text-rose-300/80 font-body">
            <span className="w-2 h-2 rounded-full bg-rose-400 animate-ping inline-block mr-1" />
            <span>Roses for Bayyan</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 text-white text-xs font-medium font-body shadow-md shadow-rose-900/40 group-hover:from-amber-500 group-hover:to-rose-600 transition-all duration-300">
            <LockOpen className="w-3.5 h-3.5" />
            <span>Open Box</span>
          </div>
        </div>

        {/* Decorative corner accents */}
        <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-amber-300/40 pointer-events-none" />
        <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-amber-300/40 pointer-events-none" />
        <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-amber-300/40 pointer-events-none" />
        <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-amber-300/40 pointer-events-none" />
      </div>
    </motion.div>
  );
};
