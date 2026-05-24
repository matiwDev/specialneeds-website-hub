import { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX, Sparkles, AlertCircle, Play, Square, Music } from "lucide-react";

const SOUNDS = [
  { id: 0, note: "C4", frequency: 261.63, color: "bg-red-100 hover:bg-red-200 border-red-200" },
  { id: 1, note: "D4", frequency: 293.66, color: "bg-orange-100 hover:bg-orange-200 border-orange-200" },
  { id: 2, note: "E4", frequency: 329.63, color: "bg-yellow-100 hover:bg-yellow-200 border-yellow-200" },
  { id: 3, note: "F4", frequency: 349.23, color: "bg-emerald-100 hover:bg-emerald-200 border-emerald-200" },
  { id: 4, note: "G4", frequency: 392.00, color: "bg-teal-100 hover:bg-teal-200 border-teal-200" },
  { id: 5, note: "A4", frequency: 440.00, color: "bg-blue-100 hover:bg-blue-200 border-blue-200" },
  { id: 6, note: "B4", frequency: 493.88, color: "bg-indigo-100 hover:bg-indigo-200 border-indigo-200" },
  { id: 7, note: "C5", frequency: 523.25, color: "bg-purple-100 hover:bg-purple-200 border-purple-200" },
];

export default function InteractiveSoundscape() {
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [activeNote, setActiveNote] = useState<number | null>(null);
  const [synthType, setSynthType] = useState<OscillatorType>("sine"); // Calm sine waves by default
  const [currentAmbient, setCurrentAmbient] = useState<string | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const ambientOscillatorRef = useRef<any>(null);
  const ambientGainRef = useRef<any>(null);

  // Initialize Web Audio API
  const initAudio = () => {
    if (!audioContextRef.current) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        audioContextRef.current = new AudioCtx();
        setAudioEnabled(true);
      }
    } else if (audioContextRef.current.state === "suspended") {
      audioContextRef.current.resume();
      setAudioEnabled(true);
    }
  };

  // Play a soft, beautiful bell-like sound
  const playSound = (frequency: number) => {
    if (!audioContextRef.current) {
      initAudio();
      return;
    }
    if (audioContextRef.current.state === "suspended") {
      audioContextRef.current.resume();
    }

    const ctx = audioContextRef.current;
    
    // Create oscillator & gain
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    const lpFilter = ctx.createBiquadFilter();

    osc.type = synthType;
    osc.frequency.setValueAtTime(frequency, ctx.currentTime);

    // Filter out high, sharp frequencies for special needs safety (calming tone)
    lpFilter.type = "lowpass";
    lpFilter.frequency.setValueAtTime(450, ctx.currentTime); // Low ceiling for warm round acoustics

    // Envelope logic
    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.18, ctx.currentTime + 0.08); // Soft attack
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2.5); // Warm, slow release decay

    osc.connect(lpFilter);
    lpFilter.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 2.6);
  };

  // Trigger ambient background noise generator
  const toggleAmbientDrone = (type: string) => {
    if (!audioContextRef.current) {
      initAudio();
      return;
    }

    const ctx = audioContextRef.current;

    // If already playing selected ambient, stop it
    if (currentAmbient === type) {
      stopAmbient();
      return;
    }

    // Stop current anyway first
    stopAmbient();

    // Create custom deep soft drone
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    // Warm, deep frequency mapping
    let freq = 120; // Deep sleep drone hertz
    if (type === "waves") freq = 90;
    if (type === "woods") freq = 140;

    osc.type = "triangle"; // Round and warm
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(150, ctx.currentTime);

    // Multi-frequency low-frequency swell simulation
    osc.frequency.linearRampToValueAtTime(freq + 5, ctx.currentTime + 5);

    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 2); // Soft warm swell in

    osc.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.start();

    ambientOscillatorRef.current = osc;
    ambientGainRef.current = gainNode;
    setCurrentAmbient(type);
  };

  const stopAmbient = () => {
    if (ambientOscillatorRef.current && audioContextRef.current) {
      try {
        const ctx = audioContextRef.current;
        const currentGain = ambientGainRef.current;
        // Fade out
        currentGain?.gain.setValueAtTime(currentGain.gain.value, ctx.currentTime);
        currentGain?.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);
        
        const osc = ambientOscillatorRef.current;
        setTimeout(() => {
          try { osc.stop(); } catch (e) {}
        }, 1300);
      } catch (err) {}
      
      ambientOscillatorRef.current = null;
      ambientGainRef.current = null;
    }
    setCurrentAmbient(null);
  };

  const handleTileAction = (sound: typeof SOUNDS[0]) => {
    setActiveNote(sound.id);
    playSound(sound.frequency);
    setTimeout(() => {
      setActiveNote(null);
    }, 400);
  };

  // Clean ambient audio on unmount
  useEffect(() => {
    return () => {
      if (ambientOscillatorRef.current) {
        try { ambientOscillatorRef.current.stop(); } catch (e) {}
      }
    };
  }, []);

  return (
    <div className="rounded-2xl border border-stone-200 bg-[#f9fafc] p-6 shadow-xs max-w-4xl mx-auto my-4">
      {/* Header and explanation */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-stone-200 pb-4 mb-6 gap-3">
        <div>
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded bg-emerald-50 border border-emerald-100">
            Sensory Play Room Component
          </span>
          <h2 className="text-xl font-bold text-stone-800 mt-2">Interactive Sensory Soundscape Panel</h2>
          <p className="text-xs text-stone-550 max-w-lg mt-1">
            Ideal for sensory decompression corners. Click or tap any tile below to trigger gentle, low-pass filtered harmonic intervals that support motor coordination and concentration.
          </p>
        </div>

        {/* Audio Activate button */}
        {!audioEnabled ? (
          <button
            onClick={initAudio}
            className="flex items-center space-x-1.5 rounded-lg bg-emerald-600 px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-emerald-700 active:scale-95 transition-all self-end"
            id="audio-activate-btn"
          >
            <Volume2 className="h-4 w-4" />
            <span>Enable Sound Synthesis</span>
          </button>
        ) : (
          <div className="inline-flex items-center space-x-1 text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-lg px-2.5 py-1 text-xs font-bold">
            <Volume2 className="h-4 w-4 text-emerald-500" />
            <span>Sound Engaged</span>
          </div>
        )}
      </div>

      {!audioEnabled && (
        <div className="mb-6 flex items-start space-x-2.5 rounded-xl border border-amber-100 bg-amber-50/50 p-3 text-amber-950">
          <AlertCircle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
          <p className="text-xs leading-relaxed">
            <strong>Browser Audio Guard is Active.</strong> Click the <strong>Enable Sound Synthesis</strong> button above to authorize local sound playback during evaluation.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Right - Musical Tiles Matrix (8 Tiles) */}
        <div className="md:col-span-8">
          <span className="block text-xs font-mono font-bold uppercase text-stone-500 mb-2">
            Harmonic Acoustic Panels (Tap/Hover):
          </span>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white border border-stone-200 p-4 rounded-xl shadow-inner min-h-[220px]">
            {SOUNDS.map((sound) => {
              const isActive = activeNote === sound.id;
              return (
                <button
                  key={sound.id}
                  id={`sound-tile-${sound.id}`}
                  onClick={() => handleTileAction(sound)}
                  onMouseEnter={() => {
                    if (audioEnabled) playSound(sound.frequency);
                  }}
                  className={`flex flex-col justify-between rounded-xl border p-4 text-left transition-all h-28 transform ${sound.color} ${
                    isActive
                      ? "ring-4 ring-emerald-300 scale-102 bg-white font-extrabold rotate-1 shadow-md"
                      : "hover:scale-102 hover:-translate-y-0.5"
                  }`}
                  aria-label={`Sound tile ${sound.note}`}
                >
                  <div className="flex justify-between items-start w-full">
                    <span className="text-xs font-mono font-bold text-stone-500">{sound.note}</span>
                    <Sparkles className={`h-3.5 w-3.5 text-stone-400 ${isActive ? "text-emerald-500 animate-pulse" : ""}`} />
                  </div>
                  
                  <div className="mt-8">
                    <span className="block text-[10px] font-mono text-stone-400 leading-none">Frequency</span>
                    <span className="text-xs font-mono font-bold text-stone-700">{sound.frequency} Hz</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Ambient Synthesizers controls */}
        <div className="md:col-span-4 flex flex-col justify-between space-y-4">
          <div className="bg-white border border-stone-200 p-4 rounded-xl shadow-xs space-y-3 flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-1.5 border-b border-stone-200 pb-2 mb-2">
                <Music className="h-4 w-4 text-emerald-600" />
                <h3 className="text-xs font-bold text-stone-800">Calm Ambient Drones</h3>
              </div>
              <p className="text-[11px] text-stone-500 leading-relaxed mb-3">
                Toggle a low-amplitude deep audio swell to wash over classroom white noise.
              </p>
              
              <div className="space-y-2">
                {[
                  { id: "waves", label: "Ocean Shore swell", emoji: "🌊" },
                  { id: "woods", label: "Deep Forest whisper", emoji: "🌲" },
                ].map((bgNode) => {
                  const isPlaying = currentAmbient === bgNode.id;
                  return (
                    <button
                      key={bgNode.id}
                      id={`ambient-btn-${bgNode.id}`}
                      onClick={() => toggleAmbientDrone(bgNode.id)}
                      className={`flex w-full items-center justify-between rounded-lg border p-2 text-xs transition-all ${
                        isPlaying
                          ? "bg-emerald-50 border-emerald-400 text-emerald-950 font-semibold"
                          : "bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100"
                      }`}
                    >
                      <span className="flex items-center space-x-2">
                        <span>{bgNode.emoji}</span>
                        <span>{bgNode.label}</span>
                      </span>
                      {isPlaying ? (
                        <Square className="h-3 w-3 text-red-500 fill-red-200" />
                      ) : (
                        <Play className="h-3 w-3 text-emerald-600 fill-emerald-100" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Synthesizer Shape Customizer */}
            <div className="pt-2 border-t border-stone-100">
              <span className="block text-[10px] font-mono font-bold uppercase text-stone-400 mb-1.5">
                Wave Shape:
              </span>
              <div className="grid grid-cols-2 gap-1.5">
                {(["sine", "triangle"] as OscillatorType[]).map((wave) => (
                  <button
                    key={wave}
                    id={`wave-sel-${wave}`}
                    onClick={() => setSynthType(wave)}
                    className={`rounded px-2.5 py-1 text-[10px] font-mono uppercase font-bold text-center transition-all ${
                      synthType === wave
                        ? "bg-stone-800 text-white"
                        : "bg-stone-100 text-stone-500 hover:text-stone-800"
                    }`}
                  >
                    {wave}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
