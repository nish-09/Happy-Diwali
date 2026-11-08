// Realistic Festive Audio Engine for Ambient Music, Rockets & Firecrackers
// Pure Web Audio API synthesis - 100% reliable, zero network 404s, works across mobile & desktop!

class RealisticAudioEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false; // DEFAULT AS ON per user request!
  private ambientInterval: NodeJS.Timeout | null = null;
  private isAmbientPlaying: boolean = false;
  private hasInitialized: boolean = false;

  // Raag Bhupali / Bilawal joyful pentatonic scale (Sa Re Ga Pa Dha Sa) in Hz
  // C4, D4, E4, G4, A4, C5, D5, E5, G5
  private melodyNotes = [
    { f: 523.25, d: 0.35, rest: 0.4 },  // C5
    { f: 587.33, d: 0.35, rest: 0.4 },  // D5
    { f: 659.25, d: 0.45, rest: 0.5 },  // E5
    { f: 783.99, d: 0.65, rest: 0.7 },  // G5
    { f: 659.25, d: 0.35, rest: 0.4 },  // E5
    { f: 587.33, d: 0.35, rest: 0.4 },  // D5
    { f: 523.25, d: 0.65, rest: 0.7 },  // C5
    { f: 440.00, d: 0.45, rest: 0.5 },  // A4
    { f: 523.25, d: 0.35, rest: 0.4 },  // C5
    { f: 587.33, d: 0.55, rest: 0.6 },  // D5
    { f: 659.25, d: 0.35, rest: 0.4 },  // E5
    { f: 587.33, d: 0.35, rest: 0.4 },  // D5
    { f: 523.25, d: 0.95, rest: 1.1 },  // C5 hold
  ];
  private melodyIndex = 0;

  // Safely get or create AudioContext upon user gesture
  public getContext(): AudioContext | null {
    if (typeof window === "undefined") return null;
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  // Initialize and unlock audio on first user touch/click
  public initOnUserGesture() {
    if (this.hasInitialized) {
      const ctx = this.getContext();
      if (ctx && ctx.state === "suspended") {
        ctx.resume().catch(() => {});
      }
      return;
    }
    this.hasInitialized = true;
    const ctx = this.getContext();
    if (ctx && ctx.state === "suspended") {
      ctx.resume().then(() => {
        if (!this.isMuted && !this.isAmbientPlaying) {
          this.startAmbient();
        }
      }).catch(() => {});
    } else {
      if (!this.isMuted && !this.isAmbientPlaying) {
        this.startAmbient();
      }
    }
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (muted) {
      this.stopAmbient();
    } else {
      this.getContext();
      this.startAmbient();
    }
  }

  public toggleMute(): boolean {
    this.setMuted(!this.isMuted);
    return this.isMuted;
  }

  // Button click / bell chime
  public playClick() {
    this.initOnUserGesture();
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.exponentialRampToValueAtTime(1760, now + 0.25);

      gain.gain.setValueAtTime(0.09, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.25);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.25);
    } catch {
      // Safe catch
    }
  }

  // 🚀 REALISTIC ROCKET LAUNCH SOUND (Ascending Whistle + Fiery Hiss)
  public playRocketLaunch() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const duration = 0.45;

      // 1. Ascending Rocket Whistle (Triangle wave frequency sweep)
      const whistleOsc = ctx.createOscillator();
      const whistleGain = ctx.createGain();
      whistleOsc.type = "triangle";
      whistleOsc.frequency.setValueAtTime(260, now);
      whistleOsc.frequency.exponentialRampToValueAtTime(1150, now + duration);

      whistleGain.gain.setValueAtTime(0.055, now);
      whistleGain.gain.linearRampToValueAtTime(0.075, now + duration * 0.7);
      whistleGain.gain.exponentialRampToValueAtTime(0.001, now + duration);

      whistleOsc.connect(whistleGain);
      whistleGain.connect(ctx.destination);
      whistleOsc.start(now);
      whistleOsc.stop(now + duration);

      // 2. Fiery Rocket Thruster Hiss (Bandpassed noise)
      const bufferSize = Math.floor(ctx.sampleRate * duration);
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * 0.3;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = noiseBuffer;

      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(900, now);
      filter.frequency.exponentialRampToValueAtTime(2200, now + duration);
      filter.Q.value = 1.5;

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.04, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + duration);

      noise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(ctx.destination);

      noise.start(now);
      noise.stop(now + duration);
    } catch {
      // Safe catch
    }
  }

  // 🎆 REALISTIC FIREWORK EXPLOSION (Deep Sub-bass Thud + Pyrotechnic Boom)
  public playFireworkExplode() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const duration = 0.65;

      // 1. Deep Sub-Bass Acoustic Boom
      const bassOsc = ctx.createOscillator();
      const bassGain = ctx.createGain();
      bassOsc.type = "sine";
      bassOsc.frequency.setValueAtTime(135, now);
      bassOsc.frequency.exponentialRampToValueAtTime(28, now + duration);

      bassGain.gain.setValueAtTime(0.24, now);
      bassGain.gain.exponentialRampToValueAtTime(0.001, now + duration);

      bassOsc.connect(bassGain);
      bassGain.connect(ctx.destination);
      bassOsc.start(now);
      bassOsc.stop(now + duration);

      // 2. Pyrotechnic Blast & Reverberation (Lowpass filtered noise)
      const bufferSize = Math.floor(ctx.sampleRate * duration);
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.18));
      }

      const noise = ctx.createBufferSource();
      noise.buffer = noiseBuffer;

      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(950, now);
      filter.frequency.exponentialRampToValueAtTime(120, now + duration);

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.18, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + duration);

      noise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(ctx.destination);

      noise.start(now);
      noise.stop(now + duration);

      // Occasional firecracker crackle tail
      if (Math.random() > 0.35) {
        setTimeout(() => {
          this.playFirecrackerCrackle();
        }, 120 + Math.random() * 100);
      }
    } catch {
      // Safe catch
    }
  }

  // 🧨 FIRECRACKERS / PATAKHA CRACKLE (Snappy multi-pop string / Ladi crackle)
  public playFirecrackerCrackle(popCount: number = 6) {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const startTime = ctx.currentTime;
      for (let p = 0; p < popCount; p++) {
        const popDelay = p * 0.035 + Math.random() * 0.02;
        const popTime = startTime + popDelay;
        const popDuration = 0.05;

        const bufferSize = Math.floor(ctx.sampleRate * popDuration);
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = noiseBuffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = Math.random() * 2 - 1;
        }

        const noise = ctx.createBufferSource();
        noise.buffer = noiseBuffer;

        const filter = ctx.createBiquadFilter();
        filter.type = "highpass";
        filter.frequency.setValueAtTime(1200 + Math.random() * 800, popTime);

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.14, popTime);
        gain.gain.exponentialRampToValueAtTime(0.001, popTime + popDuration);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        noise.start(popTime);
        noise.stop(popTime + popDuration);
      }
    } catch {
      // Safe catch
    }
  }

  // 🌟 Celebratory Swell & Golden Fanfare (Greeting Reveal)
  public playGreetingSwell() {
    this.initOnUserGesture();
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const chords = [261.63, 329.63, 392.0, 523.25, 659.25, 783.99, 1046.5]; // C major majestic spread

      chords.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now + idx * 0.07);

        gain.gain.setValueAtTime(0.08, now + idx * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.07 + 1.4);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + idx * 0.07);
        osc.stop(now + idx * 0.07 + 1.4);
      });

      // Accompany with celebratory firecracker string!
      setTimeout(() => {
        this.playFirecrackerCrackle(10);
      }, 400);
    } catch {
      // Safe catch
    }
  }

  // 🎶 ETHEREAL INDIAN FESTIVE AMBIENT MUSIC
  // Seamless loop with Tanpura Drone, Flute/Sitar harmonics, and gentle temple bell
  public startAmbient() {
    if (this.isAmbientPlaying || this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    this.isAmbientPlaying = true;

    // Start Tanpura Drone
    this.playTanpuraDrone();

    const scheduleNextNote = () => {
      if (!this.isAmbientPlaying || this.isMuted) return;
      const currentCtx = this.getContext();
      if (!currentCtx) return;

      const note = this.melodyNotes[this.melodyIndex % this.melodyNotes.length];
      const now = currentCtx.currentTime;

      // Flute / Sitar melodic voice
      const osc = currentCtx.createOscillator();
      const osc2 = currentCtx.createOscillator(); // Soft 2nd harmonic
      const gain = currentCtx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(note.f, now);

      osc2.type = "sine";
      osc2.frequency.setValueAtTime(note.f * 2, now); // Octave overtone for acoustic warmth

      gain.gain.setValueAtTime(0.038, now);
      gain.gain.exponentialRampToValueAtTime(0.0005, now + note.d);

      osc.connect(gain);
      osc2.connect(gain);
      gain.connect(currentCtx.destination);

      osc.start(now);
      osc2.start(now);
      osc.stop(now + note.d);
      osc2.stop(now + note.d);

      // Occasional temple bell chime every 6 notes
      if (this.melodyIndex % 6 === 0) {
        this.playTempleBell(currentCtx, now + 0.1);
      }

      this.melodyIndex = (this.melodyIndex + 1) % this.melodyNotes.length;
      this.ambientInterval = setTimeout(scheduleNextNote, note.rest * 1000);
    };

    scheduleNextNote();
  }

  // Tanpura Drone (Sa: C3 130.81Hz + Pa: G3 196.00Hz)
  private playTanpuraDrone() {
    if (this.isMuted || !this.isAmbientPlaying) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const droneNotes = [130.81, 196.00];

      droneNotes.forEach((freq, idx) => {
        const drone = ctx.createOscillator();
        const gain = ctx.createGain();

        drone.type = "triangle";
        drone.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.03, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 4.5);

        drone.connect(gain);
        gain.connect(ctx.destination);

        drone.start(now + idx * 0.4);
        drone.stop(now + idx * 0.4 + 4.5);
      });

      // Repeat drone every 4 seconds while ambient music is playing
      setTimeout(() => {
        if (this.isAmbientPlaying && !this.isMuted) {
          this.playTanpuraDrone();
        }
      }, 3800);
    } catch {
      // Safe catch
    }
  }

  // Soft Temple Bell Chime
  private playTempleBell(ctx: AudioContext, time: number) {
    try {
      const bell = ctx.createOscillator();
      const gain = ctx.createGain();

      bell.type = "sine";
      bell.frequency.setValueAtTime(1567.98, time); // G6 crystal chime

      gain.gain.setValueAtTime(0.025, time);
      gain.gain.exponentialRampToValueAtTime(0.0001, time + 1.2);

      bell.connect(gain);
      gain.connect(ctx.destination);

      bell.start(time);
      bell.stop(time + 1.2);
    } catch {
      // Safe catch
    }
  }

  public stopAmbient() {
    this.isAmbientPlaying = false;
    if (this.ambientInterval) {
      clearTimeout(this.ambientInterval);
      this.ambientInterval = null;
    }
  }
}

export const realisticAudio = new RealisticAudioEngine();
