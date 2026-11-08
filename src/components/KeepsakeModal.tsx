import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Heart, Trash2, Copy, Sparkles, BookHeart } from 'lucide-react';
import { LoveMessage } from '../types';

interface KeepsakeModalProps {
  isOpen: boolean;
  onClose: () => void;
  favoriteMessages: LoveMessage[];
  onRemoveFavorite: (id: string) => void;
}

export const KeepsakeModal: React.FC<KeepsakeModalProps> = ({
  isOpen,
  onClose,
  favoriteMessages,
  onRemoveFavorite,
}) => {
  React.useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-stone-950/85 backdrop-blur-md"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-xl max-h-[90vh] max-h-[90dvh] flex flex-col rounded-3xl border border-rose-400/40 bg-gradient-to-b from-[#220713]/95 via-[#2b0819]/95 to-[#15030d]/95 text-white shadow-2xl z-10 overflow-hidden"
        >
          {/* Header */}
          <div className="p-5 sm:p-6 border-b border-rose-500/20 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-rose-500/20 border border-rose-400/30 flex items-center justify-center text-rose-300">
                <BookHeart className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-serif-luxury font-bold text-rose-100">
                  Bayyan’s Keepsake Heart
                </h3>
                <p className="text-xs text-rose-300/80 font-body">
                  {favoriteMessages.length} saved love notes & whispers
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-rose-950/70 border border-rose-400/30 text-rose-300 hover:text-white flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="p-5 sm:p-6 overflow-y-auto space-y-4 flex-1">
            {favoriteMessages.length === 0 ? (
              <div className="py-12 text-center text-rose-300/60 font-body">
                <Heart className="w-12 h-12 mx-auto mb-3 text-rose-400/40" />
                <p className="text-sm font-medium">No saved love messages yet.</p>
                <p className="text-xs mt-1">Tap the bookmark icon in any secret box to save words for Bayyan.</p>
              </div>
            ) : (
              favoriteMessages.map((msg) => (
                <div
                  key={msg.id}
                  className="p-4 rounded-2xl bg-rose-950/30 border border-rose-400/20 hover:border-rose-400/40 transition-colors flex flex-col justify-between"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-rose-900/40 text-rose-300 border border-rose-500/30 font-body">
                      {msg.moodTag}
                    </span>
                    <button
                      onClick={() => onRemoveFavorite(msg.id)}
                      className="text-rose-400/60 hover:text-rose-300 p-1"
                      title="Remove from favorites"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <h4 className="text-base font-serif-luxury font-bold text-rose-100 mt-2">
                    {msg.title}
                  </h4>

                  {msg.arabicSnippet && (
                    <p className="text-sm font-script text-rose-300 mt-1">
                      {msg.arabicSnippet}
                    </p>
                  )}

                  <p className="text-xs text-rose-200/90 font-serif-luxury mt-2 leading-relaxed">
                    {msg.body}
                  </p>
                </div>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
