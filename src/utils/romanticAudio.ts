// Web Audio API based romantic soundscapes and chimes
// Pure synthesis: zero external dependencies, 100% reliable, zero network latency

class RomanticAudioEngine {
  private ctx: AudioContext | null = null;
  private isMusicPlaying = false;
  private musicTimer: number | null = null;
  private masterGain: GainNode | null = null;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.35, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  unlock() {
    try {
      this.initContext();
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => {});
      }
    } catch {
      // Ignored
    }
  }

  // Play magical celestial chime when Bayyan opens a secret box
  playBoxOpenChime() {
    try {
      this.initContext();
      if (!this.ctx || !this.masterGain) return;

      const notes = [523.25, 659.25, 783.99, 1046.5, 1318.51, 1567.98]; // C5, E5, G5, C6, E6, G6
      const now = this.ctx.currentTime;

      notes.forEach((freq, idx) => {
        if (!this.ctx || !this.masterGain) return;
        const osc = this.ctx.createOscillator();
        const noteGain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);

        // Gentle bell chime envelope
        const startTime = now + idx * 0.08;
        noteGain.gain.setValueAtTime(0, startTime);
        noteGain.gain.linearRampToValueAtTime(0.2, startTime + 0.02);
        noteGain.gain.exponentialRampToValueAtTime(0.001, startTime + 1.2);

        osc.connect(noteGain);
        noteGain.connect(this.masterGain);

        osc.start(startTime);
        osc.stop(startTime + 1.25);
      });
    } catch {
      // Audio context might be restricted before interaction
    }
  }

  // Play sweet soft heart pulse click sound
  playHeartTap() {
    try {
      this.initContext();
      if (!this.ctx || !this.masterGain) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(110, now + 0.15);

      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.2);
    } catch {
      // Ignored
    }
  }

  // Ambient romantic music generator (dreamy music box arpeggios)
  toggleAmbientMusic(onStateChange?: (playing: boolean) => void) {
    this.initContext();
    if (this.isMusicPlaying) {
      this.stopAmbientMusic();
      if (onStateChange) onStateChange(false);
      return false;
    } else {
      this.startAmbientMusic();
      if (onStateChange) onStateChange(true);
      return true;
    }
  }

  startAmbientMusic() {
    this.initContext();
    this.isMusicPlaying = true;

    // Romantic chords in F Major / D Minor: F, Am, Dm, Bb, C
    const chordProgressions = [
      [349.23, 440.0, 523.25, 698.46], // F maj
      [440.0, 523.25, 659.25, 880.0],  // A min
      [293.66, 349.23, 440.0, 587.33], // D min
      [233.08, 349.23, 466.16, 698.46], // Bb maj
      [261.63, 329.63, 392.0, 523.25]  // C maj
    ];

    let chordIdx = 0;
    let step = 0;

    const playChordStep = () => {
      if (!this.isMusicPlaying || !this.ctx || !this.masterGain) return;

      const currentChord = chordProgressions[chordIdx];
      const freq = currentChord[step % currentChord.length];
      const now = this.ctx.currentTime;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.07, now + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 1.9);

      step++;
      if (step % 4 === 0) {
        chordIdx = (chordIdx + 1) % chordProgressions.length;
      }

      this.musicTimer = window.setTimeout(playChordStep, 450);
    };

    playChordStep();
  }

  stopAmbientMusic() {
    this.isMusicPlaying = false;
    if (this.musicTimer !== null) {
      clearTimeout(this.musicTimer);
      this.musicTimer = null;
    }
  }

  getPlaying() {
    return this.isMusicPlaying;
  }
}

export const romanticAudio = new RomanticAudioEngine();
