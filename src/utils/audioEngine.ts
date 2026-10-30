/**
 * Cinematic Audio Engine
 * Uses Web Audio API to synthesize cinematic atmospheres, tension drones,
 * Foley sound effects, and handle voiceover/TTS playback.
 */

class CinematicAudioEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private activeNodes: { stop: () => void }[] = [];
  private isMuted: boolean = false;
  private currentPlayingAudio: HTMLAudioElement | null = null;

  private initContext() {
    if (!this.ctx) {
      const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioCtxClass();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = 0.8;
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public getAudioContext(): AudioContext {
    this.initContext();
    return this.ctx!;
  }

  public getMasterDestination(): AudioNode {
    this.initContext();
    return this.masterGain!;
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.8, this.ctx.currentTime);
    }
    return this.isMuted;
  }

  public stopAll() {
    this.activeNodes.forEach(node => {
      try {
        node.stop();
      } catch (e) {
        // ignore already stopped
      }
    });
    this.activeNodes = [];

    if (this.currentPlayingAudio) {
      try {
        this.currentPlayingAudio.pause();
        this.currentPlayingAudio.currentTime = 0;
      } catch (e) {
        // ignore
      }
      this.currentPlayingAudio = null;
    }
  }

  /**
   * Play cinematic background atmosphere according to shot music mood
   */
  public playAtmosphere(mood: string, durationSec: number = 5) {
    this.initContext();
    if (!this.ctx || !this.masterGain || this.isMuted) return;

    const lower = (mood || '').toLowerCase();
    const now = this.ctx.currentTime;

    // Create mood sound synthesis
    if (lower.includes('rain') || lower.includes('mưa') || lower.includes('water')) {
      this.playRainAmbience(durationSec);
    } else if (lower.includes('cyber') || lower.includes('synth') || lower.includes('neon')) {
      this.playCyberpunkPad(durationSec);
    } else if (lower.includes('tense') || lower.includes('thrill') || lower.includes('hồi hộp') || lower.includes('drone')) {
      this.playTensionSubDrone(durationSec);
    } else if (lower.includes('nostalgic') || lower.includes('warm') || lower.includes('hoài niệm') || lower.includes('lãng mạn')) {
      this.playMelancholicChords(durationSec);
    } else {
      this.playCinematicBed(durationSec);
    }
  }

  /**
   * Deep Tension Sub-bass Drone
   */
  private playTensionSubDrone(duration: number) {
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;

    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();

    osc1.type = 'sawtooth';
    osc1.frequency.setValueAtTime(55, now); // A1 note
    osc1.frequency.exponentialRampToValueAtTime(52, now + duration);

    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(54.5, now); // slight detune for throb

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(120, now);
    filter.frequency.linearRampToValueAtTime(320, now + duration * 0.8);

    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.35, now + 0.5);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + duration);
    osc2.stop(now + duration);

    this.activeNodes.push(osc1, osc2);
  }

  /**
   * Cyberpunk / Sci-fi Synth Ambient
   */
  private playCyberpunkPad(duration: number) {
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;

    const freqs = [110, 130.81, 164.81]; // Am chord
    freqs.forEach(f => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      const filter = this.ctx!.createBiquadFilter();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(f, now);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(450, now);
      filter.Q.value = 4;

      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.12, now + 0.8);
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain!);

      osc.start(now);
      osc.stop(now + duration);
      this.activeNodes.push(osc);
    });
  }

  /**
   * Rain & Atmospheric noise
   */
  private playRainAmbience(duration: number) {
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;
    const bufferSize = this.ctx.sampleRate * 2;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1000, now);
    filter.Q.value = 1.5;

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.15, now + 0.5);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    noise.start(now);
    noise.stop(now + duration);
    this.activeNodes.push(noise);
  }

  /**
   * Melancholic / Poetic Warm Strings
   */
  private playMelancholicChords(duration: number) {
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;
    const freqs = [174.61, 220.0, 261.63]; // F Major chord

    freqs.forEach(f => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, now);

      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.1, now + 1.2);
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

      osc.connect(gain);
      gain.connect(this.masterGain!);

      osc.start(now);
      osc.stop(now + duration);
      this.activeNodes.push(osc);
    });
  }

  /**
   * Standard Cinematic Bed (Orchestral deep hum)
   */
  private playCinematicBed(duration: number) {
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(65.41, now); // C2

    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.2, now + 0.6);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + duration);
    this.activeNodes.push(osc);
  }

  /**
   * Play Dramatic Cinematic Impact / Hit (Boom)
   */
  public playCinematicHit() {
    this.initContext();
    if (!this.ctx || !this.masterGain || this.isMuted) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(140, now);
    osc.frequency.exponentialRampToValueAtTime(25, now + 0.8);

    gain.gain.setValueAtTime(0.7, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 1.2);
  }

  /**
   * Play Camera Shutter / Slate Clapper SFX
   */
  public playSlateClap() {
    this.initContext();
    if (!this.ctx || !this.masterGain || this.isMuted) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'square';
    osc.frequency.setValueAtTime(800, now);
    osc.frequency.exponentialRampToValueAtTime(120, now + 0.08);

    gain.gain.setValueAtTime(0.4, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.1);
  }

  /**
   * Play Audio from Data URL or Web Speech fallback
   */
  public playDialogue(audioUrl?: string, text?: string, speaker?: string): Promise<void> {
    return new Promise((resolve) => {
      if (this.isMuted) {
        resolve();
        return;
      }

      if (audioUrl) {
        const audio = new Audio(audioUrl);
        this.currentPlayingAudio = audio;
        audio.onended = () => {
          this.currentPlayingAudio = null;
          resolve();
        };
        audio.onerror = () => {
          this.currentPlayingAudio = null;
          resolve();
        };
        audio.play().catch(() => resolve());
      } else if (text && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'vi-VN';
        utterance.rate = 0.95; // cinematic, not rushed
        utterance.pitch = 0.9;
        utterance.onend = () => resolve();
        utterance.onerror = () => resolve();
        window.speechSynthesis.speak(utterance);
      } else {
        resolve();
      }
    });
  }
}

export const audioEngine = new CinematicAudioEngine();
