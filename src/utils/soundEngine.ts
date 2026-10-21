// Web Audio API Synthesizer & Sound Design Engine for Orikawa Portfolio
// 100% procedurally synthesized - no external audio files required!

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private isInitialized: boolean = false;

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    this.isInitialized = true;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public getIsInitialized(): boolean {
    return this.isInitialized;
  }

  public toggleMute(): boolean {
    this.initContext();
    this.isMuted = !this.isMuted;
    if (!this.isMuted) {
      this.playTapeClick(880, 0.04);
    }
    return this.isMuted;
  }

  public setMute(muted: boolean) {
    this.isMuted = muted;
  }

  // Tactile button click / tape relay
  public playTapeClick(freq = 600, duration = 0.03) {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      filter.type = 'highpass';
      filter.frequency.setValueAtTime(800, this.ctx.currentTime);

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(120, this.ctx.currentTime + duration);

      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch {
      // AudioContext policy fallback
    }
  }

  // Soft analog knob tick
  public playKnobTick(pitch = 1.0) {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const bufferSize = this.ctx.sampleRate * 0.015;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3));
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;
      noise.playbackRate.value = pitch;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 1800 * pitch;
      filter.Q.value = 4.0;

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 0.02);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start();
    } catch {
      // ignore
    }
  }

  // Sound Lab Harmonic Chord / Stinger
  public playMusicalStinger(noteIndex = 0) {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      // Pentatonic scale (warm, meditative analog synth)
      const notes = [220, 261.63, 293.66, 329.63, 392.0, 440, 523.25, 587.33];
      const baseFreq = notes[noteIndex % notes.length];

      const now = this.ctx.currentTime;
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc1.type = 'sine';
      osc2.type = 'triangle';
      osc1.frequency.setValueAtTime(baseFreq, now);
      osc2.frequency.setValueAtTime(baseFreq * 1.5, now); // Fifth

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1400, now);
      filter.frequency.exponentialRampToValueAtTime(300, now + 0.6);

      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.7);

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 0.7);
      osc2.stop(now + 0.7);
    } catch {
      // ignore
    }
  }

  // Water physics ripple droplet sound
  public playWaterDrop(pitch = 1.0) {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      const startFreq = 400 * pitch;
      const endFreq = 950 * pitch;

      osc.frequency.setValueAtTime(startFreq, now);
      osc.frequency.exponentialRampToValueAtTime(endFreq, now + 0.08);

      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.13);
    } catch {
      // ignore
    }
  }
}

export const soundEngine = new SoundEngine();
