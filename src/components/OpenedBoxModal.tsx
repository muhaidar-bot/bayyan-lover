import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Heart,
  Sparkles,
  Shuffle,
  Volume2,
  VolumeX,
  Copy,
  Check,
  Flame,
  Smile,
  Bookmark,
  BookmarkCheck,
  Wand2,
  Loader2
} from 'lucide-react';
import { BoxCategory, LoveMessage } from '../types';
import { BOX_METADATA, ROMANTIC_MESSAGES } from '../data/romanticContent';
import { romanticAudio } from '../utils/romanticAudio';
import { generateGeminiLoveWhisper } from '../services/geminiLove';
import confetti from 'canvas-confetti';
import roseTopUrl from '../assets/images/real_pink_rose_top_1794132783397.jpg';

interface OpenedBoxModalProps {
  category: BoxCategory | null;
  onClose: () => void;
  onToggleFavorite: (msg: LoveMessage) => void;
  favorites: string[];
}

export const OpenedBoxModal: React.FC<OpenedBoxModalProps> = ({
  category,
  onClose,
  onToggleFavorite,
  favorites
}) => {
  if (!category) return null;

  const meta = BOX_METADATA[category];
  const categoryMessages = ROMANTIC_MESSAGES.filter((m) => m.category === category);

  // Pick random initial message from category
  const [currentIndex, setCurrentIndex] = useState(() =>
    Math.floor(Math.random() * categoryMessages.length)
  );
  const [currentMessage, setCurrentMessage] = useState<LoveMessage>(
    categoryMessages[currentIndex] || categoryMessages[0]
  );
  const [copied, setCopied] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [roseBloomState, setRoseBloomState] = useState<'blooming' | 'full'>('full');

  useEffect(() => {
    // When category changes, reset
    const msgs = ROMANTIC_MESSAGES.filter((m) => m.category === category);
    const rand = Math.floor(Math.random() * msgs.length);
    setCurrentIndex(rand);
    setCurrentMessage(msgs[rand] || msgs[0]);
    setRoseBloomState('blooming');
    const t = setTimeout(() => setRoseBloomState('full'), 700);
    return () => clearTimeout(t);
  }, [category]);

  const handleNextMessage = () => {
    romanticAudio.playHeartTap();
    // Confetti burst of rose petals
    try {
      confetti({
        particleCount: 25,
        spread: 50,
        origin: { y: 0.5 },
        colors: ['#fb7185', '#f43f5e', '#fecdd3', '#fda4af', '#facc15'],
        scalar: 0.9
      });
    } catch {
      // Ignored
    }

    const nextIdx = (currentIndex + 1) % categoryMessages.length;
    setCurrentIndex(nextIdx);
    setCurrentMessage(categoryMessages[nextIdx]);
  };

  const handleRandomMessage = () => {
    romanticAudio.playHeartTap();
    let rand = Math.floor(Math.random() * categoryMessages.length);
    if (rand === currentIndex && categoryMessages.length > 1) {
      rand = (rand + 1) % categoryMessages.length;
    }
    setCurrentIndex(rand);
    setCurrentMessage(categoryMessages[rand]);
  };

  const handleCopy = () => {
    const text = `🌹 For My Beloved Bayyan:\n"${currentMessage.title}"\n\n${currentMessage.body}\n${currentMessage.arabicSnippet ? `\n"${currentMessage.arabicSnippet}"` : ''}\n\n— Forever in love with Bayyan`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleSpeak = () => {
    if (!('speechSynthesis' in window)) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel();
    const textToRead = `${currentMessage.title}. ${currentMessage.body}`;
    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.rate = 0.88;
    utterance.pitch = 1.05;

    // Pick a soft expressive voice if available
    const voices = window.speechSynthesis.getVoices();
    const softVoice = voices.find(
      (v) =>
        v.lang.startsWith('en') &&
        (v.name.includes('Natural') || v.name.includes('Samantha') || v.name.includes('Serena'))
    );
    if (softVoice) utterance.voice = softVoice;

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const handleGenerateAIMessage = async () => {
    setIsGeneratingAI(true);
    try {
      const generated = await generateGeminiLoveWhisper(category);
      const newMsg: LoveMessage = {
        id: `ai-${Date.now()}`,
        category,
        title: generated.title,
        body: generated.body,
        arabicSnippet: generated.arabicSnippet,
        moodTag: generated.moodTag || 'Infinite Love',
        senderNote: 'Whispered straight from the heart with love for Bayyan.'
      };
      setCurrentMessage(newMsg);
      try {
        confetti({
          particleCount: 35,
          spread: 70,
          origin: { y: 0.45 },
          colors: ['#f43f5e', '#fb7185', '#ffd700', '#fff'],
          scalar: 1.1
        });
      } catch {
        // Ignored
      }
    } finally {
      setIsGeneratingAI(false);
    }
  };

  // Escape key handler for laptop keyboards
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const isFavorited = favorites.includes(currentMessage.id);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 md:p-6 overflow-y-auto">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-stone-950/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 25 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-2xl max-h-[92vh] max-h-[92dvh] overflow-y-auto overscroll-contain rounded-3xl border border-rose-400/40 bg-gradient-to-b from-[#1f0612]/95 via-[#2b0819]/95 to-[#12020a]/95 text-white shadow-2xl my-auto z-10 p-4 sm:p-6 md:p-8"
        >
          {/* Ambient luminous glow top header */}
          <div
            className={`absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-gradient-to-b ${meta.boxColor} opacity-30 blur-3xl pointer-events-none`}
          />

          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-rose-950/60 border border-rose-400/30 text-rose-300 hover:text-white hover:bg-rose-900/80 transition-colors flex items-center justify-center z-20"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header Badge */}
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-950/90 text-rose-300 border border-rose-400/40 font-body">
              <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" style={{ animationDuration: '6s' }} />
              <span>{meta.title}</span>
            </span>
            <span className="text-xs text-rose-300/80 font-body">• {currentMessage.moodTag}</span>
          </div>

          {/* THE REAL PINK ROSES WITH "BAYYAN" INSIDE */}
          <div className="relative my-3 p-4 rounded-2xl bg-gradient-to-r from-rose-950/50 via-pink-950/40 to-rose-950/50 border border-rose-400/30 flex flex-col items-center justify-center overflow-hidden">
            {/* Background radiant aura */}
            <div className="absolute inset-0 bg-radial from-rose-500/25 via-transparent to-transparent animate-pulse-glow" />

            {/* Real Blooming Pink Rose with Dewdrops */}
            <div className="relative z-10 flex flex-col items-center justify-center">
              <motion.div
                animate={{
                  scale: roseBloomState === 'blooming' ? [0.8, 1.08, 1] : 1,
                  rotate: roseBloomState === 'blooming' ? [-6, 2, 0] : 0,
                }}
                transition={{ duration: 0.75, ease: 'easeOut' }}
                className="relative w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 rounded-full p-1 sm:p-1.5 bg-gradient-to-tr from-amber-300 via-rose-500 to-amber-200 shadow-[0_0_30px_rgba(244,63,94,0.7)] flex items-center justify-center shrink-0"
              >
                <img
                  src={roseTopUrl}
                  alt="Real Pink Rose for Bayyan"
                  className="w-full h-full object-cover rounded-full filter contrast-105 saturate-110"
                />

                {/* THE WORD "BAYYAN" GLISTENING IN GOLD OVER THE REAL PINK ROSE */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="px-4 py-1.5 rounded-full bg-stone-950/80 border border-amber-300/90 shadow-[0_0_25px_rgba(251,191,36,0.8)] backdrop-blur-md flex items-center gap-2"
                  >
                    <span className="text-rose-400 text-sm">🌹</span>
                    <span className="font-display font-bold text-base sm:text-lg tracking-widest text-gold-shimmer">
                      BAYYAN
                    </span>
                    <span className="text-rose-400 text-sm">🌹</span>
                  </motion.div>
                </div>
              </motion.div>
            </div>

            <p className="text-xs sm:text-sm text-rose-200 font-script text-lg sm:text-xl mt-2 tracking-wide">
              وردة حقيقية تليق بجمال قلبك يا بيان
            </p>
          </div>

          {/* THE LOVE MESSAGE CARD */}
          <div className="relative mt-4 p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-rose-950/30 via-stone-900/60 to-purple-950/30 border border-rose-300/20 shadow-inner">
            <h4 className="text-xl sm:text-2xl font-serif-luxury font-bold text-rose-100 tracking-wide text-center">
              {currentMessage.title}
            </h4>

            {currentMessage.arabicSnippet && (
              <p className="text-rose-200 font-script text-lg sm:text-xl text-center mt-2 font-medium tracking-wide leading-relaxed">
                {currentMessage.arabicSnippet}
              </p>
            )}

            <p className="text-rose-100/95 font-serif-luxury text-sm sm:text-base leading-relaxed text-center mt-4 px-2">
              {currentMessage.body}
            </p>

            {currentMessage.romanticDareOrAction && (
              <div className="mt-5 p-3 rounded-xl bg-rose-500/10 border border-rose-400/30 flex items-center gap-3">
                <span className="text-xl">✨</span>
                <p className="text-xs text-rose-200 font-body italic">
                  <strong className="text-amber-200 font-semibold not-italic">Romantic Whisper: </strong>
                  {currentMessage.romanticDareOrAction}
                </p>
              </div>
            )}

            {currentMessage.senderNote && (
              <div className="text-right mt-3">
                <span className="text-xs font-script text-rose-300/80 text-base">
                  — {currentMessage.senderNote}
                </span>
              </div>
            )}
          </div>

          {/* INTERACTIVE ACTION BUTTONS */}
          <div className="mt-5 flex flex-wrap items-center justify-between gap-2.5 pt-3 border-t border-rose-500/20">
            {/* Left buttons: Voice & Copy & Favorite */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleSpeak}
                title="Listen to gentle whisper"
                className={`p-2.5 rounded-xl border transition-all flex items-center gap-1.5 text-xs font-body ${
                  isSpeaking
                    ? 'bg-rose-600 border-rose-400 text-white'
                    : 'bg-rose-950/60 border-rose-400/30 text-rose-200 hover:bg-rose-900/50'
                }`}
              >
                {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                <span className="hidden sm:inline">{isSpeaking ? 'Mute' : 'Whisper'}</span>
              </button>

              <button
                onClick={handleCopy}
                title="Copy love message"
                className="p-2.5 rounded-xl bg-rose-950/60 border border-rose-400/30 text-rose-200 hover:bg-rose-900/50 transition-colors flex items-center gap-1.5 text-xs font-body"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span className="hidden sm:inline">{copied ? 'Copied' : 'Copy'}</span>
              </button>

              <button
                onClick={() => onToggleFavorite(currentMessage)}
                title="Save to Bayyan's Keepsake Heart"
                className={`p-2.5 rounded-xl border transition-all flex items-center gap-1.5 text-xs font-body ${
                  isFavorited
                    ? 'bg-pink-600/30 border-pink-400 text-pink-200'
                    : 'bg-rose-950/60 border-rose-400/30 text-rose-200 hover:bg-rose-900/50'
                }`}
              >
                {isFavorited ? (
                  <BookmarkCheck className="w-4 h-4 text-rose-400" />
                ) : (
                  <Bookmark className="w-4 h-4" />
                )}
                <span className="hidden sm:inline">{isFavorited ? 'Saved' : 'Save'}</span>
              </button>
            </div>

            {/* Right buttons: AI Whisper & Next Surprise */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleGenerateAIMessage}
                disabled={isGeneratingAI}
                className="px-3 py-2 rounded-xl bg-purple-950/70 border border-purple-400/40 text-purple-200 hover:bg-purple-900/60 transition-all flex items-center gap-1.5 text-xs font-body disabled:opacity-50"
                title="Ask AI to compose a brand new message for Bayyan"
              >
                {isGeneratingAI ? (
                  <Loader2 className="w-4 h-4 animate-spin text-purple-300" />
                ) : (
                  <Wand2 className="w-4 h-4 text-amber-300" />
                )}
                <span>New AI Whisper</span>
              </button>

              <button
                onClick={handleNextMessage}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-medium text-xs font-body shadow-lg shadow-rose-900/50 transition-all flex items-center gap-1.5 active:scale-95"
              >
                <Shuffle className="w-4 h-4" />
                <span>Next Surprise ✨</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
