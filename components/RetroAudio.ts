// Retro 8-bit / 16-bit Web Audio Synthesizer
// Pure synthetic audio - no external mp3 files required! Zero network latency.

class RetroAudioEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = true;
  private musicTimer: NodeJS.Timeout | null = null;
  private isMusicPlaying: boolean = false;
  private melodyIndex: number = 0;

  // Initialize or resume AudioContext upon user gesture
  private getContext(): AudioContext | null {
    if (typeof window === "undefined") return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (muted) {
      this.stopMusic();
    } else {
      this.getContext();
      this.startMusic();
    }
  }

  public toggleMute(): boolean {
    this.setMuted(!this.isMuted);
    return this.isMuted;
  }

  // 8-Bit Button Click Sound
  public playClick() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "square";
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.exponentialRampToValueAtTime(1200, now + 0.08);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.08);
    } catch {
      // Audio safety catch
    }
  }

  // Retro Start / Level Clear Fanfare (when user starts celebration)
  public playStartCelebration() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const notes = [
        { f: 523.25, d: 0.1 },  // C5
        { f: 659.25, d: 0.1 },  // E5
        { f: 783.99, d: 0.1 },  // G5
        { f: 1046.5, d: 0.25 }, // C6
        { f: 880.0,  d: 0.1 },  // A5
        { f: 1046.5, d: 0.35 }  // C6 hold
      ];

      let t = now;
      notes.forEach((note) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "square";
        osc.frequency.setValueAtTime(note.f, t);

        gain.gain.setValueAtTime(0.18, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + note.d);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(t);
        osc.stop(t + note.d);
        t += note.d * 0.9;
      });
    } catch {
      // safe
    }
  }

  // Firework launch whistle
  public playFireworkLaunch() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(250, now);
      osc.frequency.exponentialRampToValueAtTime(900, now + 0.25);

      gain.gain.setValueAtTime(0.05, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.25);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.25);
    } catch {
      // safe
    }
  }

  // Pixel Firework Explosion (Noise + Square thump)
  public playFireworkExplode() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const duration = 0.35;

      // Low thump
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(160, now);
      osc.frequency.exponentialRampToValueAtTime(40, now + duration);

      oscGain.gain.setValueAtTime(0.15, now);
      oscGain.gain.exponentialRampToValueAtTime(0.001, now + duration);

      osc.connect(oscGain);
      oscGain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + duration);

      // Noise buffer for crackle/explosion
      const bufferSize = ctx.sampleRate * duration;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;

      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(1100, now);
      filter.frequency.exponentialRampToValueAtTime(300, now + duration);
      filter.Q.value = 1.2;

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.12, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + duration);

      whiteNoise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(ctx.destination);

      whiteNoise.start(now);
      whiteNoise.stop(now + duration);
    } catch {
      // safe
    }
  }

  // Sparkler / Diya touch sparkle sound
  public playSparkle() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const freqs = [1046.5, 1318.5, 1567.98, 2093.0]; // C6, E6, G6, C7
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now + idx * 0.04);

        gain.gain.setValueAtTime(0.08, now + idx * 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.04 + 0.12);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + idx * 0.04);
        osc.stop(now + idx * 0.04 + 0.12);
      });
    } catch {
      // safe
    }
  }

  // Easter Egg Moon sound
  public playMoonChime() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const freqs = [784, 987.7, 1174.6, 1568, 1975.5];
      freqs.forEach((f, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(f, now + i * 0.06);

        gain.gain.setValueAtTime(0.1, now + i * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.06 + 0.35);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + i * 0.06);
        osc.stop(now + i * 0.06 + 0.35);
      });
    } catch {
      // safe
    }
  }

  // Achievement Jingle
  public playAchievement() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const notes = [
        { f: 587.33, d: 0.08 }, // D5
        { f: 739.99, d: 0.08 }, // F#5
        { f: 880.0,  d: 0.08 }, // A5
        { f: 1174.66, d: 0.28 } // D6
      ];

      let t = now;
      notes.forEach((n) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "square";
        osc.frequency.setValueAtTime(n.f, t);

        gain.gain.setValueAtTime(0.12, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + n.d);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(t);
        osc.stop(t + n.d);
        t += n.d * 0.9;
      });
    } catch {
      // safe
    }
  }

  // Background 8-bit Festive Chiptune Melody (Indian Festive Raga inspired: Sa, Re, Ga, Pa, Dha joyful pentatonic)
  public startMusic() {
    if (this.isMusicPlaying) return;
    this.isMusicPlaying = true;

    // Pentatonic joyful melody notes (frequencies in Hz)
    // C4=261.63, D4=293.66, E4=329.63, G4=392.00, A4=440.00, C5=523.25, D5=587.33, E5=659.25, G5=783.99
    const melody = [
      { f: 523.25, dur: 0.2 }, // C5
      { f: 587.33, dur: 0.2 }, // D5
      { f: 659.25, dur: 0.2 }, // E5
      { f: 783.99, dur: 0.4 }, // G5
      { f: 659.25, dur: 0.2 }, // E5
      { f: 587.33, dur: 0.2 }, // D5
      { f: 523.25, dur: 0.4 }, // C5
      { f: 440.00, dur: 0.2 }, // A4
      { f: 523.25, dur: 0.2 }, // C5
      { f: 587.33, dur: 0.4 }, // D5
      { f: 659.25, dur: 0.2 }, // E5
      { f: 587.33, dur: 0.2 }, // D5
      { f: 523.25, dur: 0.6 }, // C5
      // Second phrase
      { f: 783.99, dur: 0.2 }, // G5
      { f: 880.00, dur: 0.2 }, // A5
      { f: 783.99, dur: 0.2 }, // G5
      { f: 659.25, dur: 0.4 }, // E5
      { f: 587.33, dur: 0.2 }, // D5
      { f: 659.25, dur: 0.2 }, // E5
      { f: 783.99, dur: 0.4 }, // G5
      { f: 659.25, dur: 0.2 }, // E5
      { f: 587.33, dur: 0.2 }, // D5
      { f: 523.25, dur: 0.4 }, // C5
      { f: 440.00, dur: 0.2 }, // A4
      { f: 523.25, dur: 0.6 }, // C5
    ];

    const bassNotes = [130.81, 146.83, 164.81, 196.00]; // C3, D3, E3, G3

    const playNextNote = () => {
      if (!this.isMusicPlaying || this.isMuted) return;
      const ctx = this.getContext();
      if (!ctx) return;

      const note = melody[this.melodyIndex % melody.length];
      const now = ctx.currentTime;

      // Lead Melody (Square wave with vintage duty feel)
      const leadOsc = ctx.createOscillator();
      const leadGain = ctx.createGain();
      leadOsc.type = "square";
      leadOsc.frequency.setValueAtTime(note.f, now);

      leadGain.gain.setValueAtTime(0.045, now);
      leadGain.gain.exponentialRampToValueAtTime(0.005, now + note.dur * 0.9);

      leadOsc.connect(leadGain);
      leadGain.connect(ctx.destination);
      leadOsc.start(now);
      leadOsc.stop(now + note.dur * 0.95);

      // Bass note accompaniment (Triangle wave)
      if (this.melodyIndex % 2 === 0) {
        const bassOsc = ctx.createOscillator();
        const bassGain = ctx.createGain();
        const bassFreq = bassNotes[(Math.floor(this.melodyIndex / 2)) % bassNotes.length];
        bassOsc.type = "triangle";
        bassOsc.frequency.setValueAtTime(bassFreq, now);

        bassGain.gain.setValueAtTime(0.06, now);
        bassGain.gain.exponentialRampToValueAtTime(0.001, now + note.dur * 1.5);

        bassOsc.connect(bassGain);
        bassGain.connect(ctx.destination);
        bassOsc.start(now);
        bassOsc.stop(now + note.dur * 1.5);
      }

      this.melodyIndex = (this.melodyIndex + 1) % melody.length;
      this.musicTimer = setTimeout(playNextNote, note.dur * 1000);
    };

    playNextNote();
  }

  public stopMusic() {
    this.isMusicPlaying = false;
    if (this.musicTimer) {
      clearTimeout(this.musicTimer);
      this.musicTimer = null;
    }
  }
}

// Singleton export
export const retroAudio = new RetroAudioEngine();

