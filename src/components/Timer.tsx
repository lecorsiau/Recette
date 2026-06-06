"use client";
import { useState, useEffect, useRef } from "react";

interface TimerProps {
  totalSeconds: number;
}

export default function Timer({ totalSeconds }: TimerProps) {
  const [seconds, setSeconds] = useState(totalSeconds);
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);
  const ref = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setSeconds(totalSeconds);
    setRunning(false);
    setDone(false);
  }, [totalSeconds]);

  useEffect(() => {
    if (running && seconds > 0) {
      ref.current = setInterval(() => {
        setSeconds((s) => {
          if (s <= 1) {
            setRunning(false);
            setDone(true);
            clearInterval(ref.current!);
            return 0;
          }
          return s - 1;
        });
      }, 1000);
    }
    return () => clearInterval(ref.current!);
  }, [running]);

  const toggle = () => { if (!done) setRunning((r) => !r); };
  const reset = () => {
    clearInterval(ref.current!);
    setSeconds(totalSeconds);
    setRunning(false);
    setDone(false);
  };

  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");
  const progress = totalSeconds > 0 ? 1 - seconds / totalSeconds : 0;

  const r = 42;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - progress);

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        className="relative w-32 h-32 cursor-pointer"
        onClick={toggle}
        title={done ? "Terminé" : running ? "Pause" : "Démarrer"}
      >
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r={r} fill="none" stroke="#E8F5EE" strokeWidth="7" />
          <circle
            cx="50" cy="50" r={r} fill="none"
            stroke={done ? "#009245" : "#009245"}
            strokeWidth="7"
            strokeDasharray={circ}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 1s linear", opacity: done ? 1 : running ? 1 : 0.5 }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-gray-800">
            {done ? "✓" : `${mm}:${ss}`}
          </span>
          <span className="text-xs text-gray-400 mt-0.5">
            {done ? "Terminé" : running ? "En cours" : "Appuyer"}
          </span>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={toggle}
          className="px-5 py-2 rounded-full text-sm font-medium transition-all"
          style={{
            background: done ? "#E8F5EE" : running ? "#fff" : "#009245",
            color: done ? "#009245" : running ? "#009245" : "#fff",
            border: "2px solid #009245",
          }}
        >
          {done ? "Fini !" : running ? "⏸ Pause" : "▶ Démarrer"}
        </button>
        <button
          onClick={reset}
          className="w-9 h-9 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors text-lg border border-gray-200"
        >
          ↺
        </button>
      </div>
    </div>
  );
}
