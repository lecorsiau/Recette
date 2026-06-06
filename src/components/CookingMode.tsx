"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Recipe } from "@/lib/types";
import Timer from "./Timer";

export default function CookingMode({ recipe }: { recipe: Recipe }) {
  const router = useRouter();
  const steps = recipe.steps ?? [];
  const [step, setStep] = useState(0);
  const [completed, setCompleted] = useState<Set<number>>(new Set());

  const current = steps[step];
  if (!current) return null;

  const isLast = step === steps.length - 1;
  const isDone = completed.has(step);

  const markDone = () => {
    setCompleted((prev) => new Set([...prev, step]));
    if (!isLast) setTimeout(() => setStep((s) => s + 1), 300);
  };

  const isTM5Step =
    recipe.device === "TM5" &&
    (current.content.includes("TM5") ||
      current.content.includes("Varoma") ||
      current.content.includes("Vit.") ||
      current.device_instruction);

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-white">
      {/* TM5-style top bar — green */}
      <div className="flex items-center justify-between px-5 py-4 bg-tm-green text-white shrink-0">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1.5 text-white/80 hover:text-white text-sm font-medium"
        >
          <span className="text-lg">←</span>
          <span>Quitter</span>
        </button>

        {/* Progress dots */}
        <div className="flex items-center gap-1.5">
          {steps.map((_, i) => (
            <div
              key={i}
              className="rounded-full transition-all duration-500"
              style={{
                width: i === step ? "20px" : "6px",
                height: "6px",
                background: completed.has(i)
                  ? "rgba(255,255,255,0.9)"
                  : i === step
                  ? "#fff"
                  : "rgba(255,255,255,0.3)",
              }}
            />
          ))}
        </div>

        <span className="text-white/80 text-sm font-medium">
          {step + 1}/{steps.length}
        </span>
      </div>

      {/* Main cooking area */}
      <div className="flex-1 overflow-y-auto px-5 py-6">
        {/* Step badge + title */}
        <div className="mb-6 slide-in" key={step}>
          <div className="inline-flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-full bg-tm-green text-white flex items-center justify-center text-sm font-bold shrink-0">
              {step + 1}
            </div>
            {recipe.device === "TM5" && isTM5Step && (
              <span className="text-xs font-semibold text-tm-green bg-tm-green-light px-2.5 py-1 rounded-full border border-tm-green-mid">
                ⚙️ TM5
              </span>
            )}
          </div>
          <h2 className="text-2xl font-bold text-gray-900 leading-tight">
            {current.title}
          </h2>
        </div>

        {/* Timer */}
        {current.timer_seconds && (
          <div className="mb-6 flex justify-center p-6 rounded-2xl bg-tm-green-light border border-tm-green-mid">
            <Timer totalSeconds={current.timer_seconds} />
          </div>
        )}

        {/* Instruction */}
        <div className="rounded-2xl bg-gray-50 border border-gray-100 p-5 mb-4">
          <p className="text-gray-700 leading-relaxed text-base">{current.content}</p>
        </div>

        {/* TM5 device instruction highlight */}
        {current.device_instruction && (
          <div className="rounded-2xl bg-tm-green text-white p-4 mb-4 flex gap-3 items-start">
            <span className="text-2xl shrink-0">⚙️</span>
            <p className="text-sm leading-relaxed font-medium">{current.device_instruction}</p>
          </div>
        )}

        {/* Tip */}
        {current.tip && (
          <div className="rounded-2xl bg-amber-50 border border-amber-200 p-4 flex gap-3 items-start">
            <span className="text-lg shrink-0">💡</span>
            <p className="text-sm text-amber-800 leading-relaxed">{current.tip}</p>
          </div>
        )}
      </div>

      {/* Bottom navigation */}
      <div className="shrink-0 px-5 pb-8 pt-4 flex gap-3 border-t border-gray-100 bg-white">
        {step > 0 && (
          <button
            onClick={() => setStep((s) => s - 1)}
            className="px-5 py-4 rounded-2xl border-2 border-gray-200 text-gray-600 hover:border-tm-green hover:text-tm-green transition-all text-sm font-semibold"
          >
            ← Préc.
          </button>
        )}
        <button
          onClick={markDone}
          className="flex-1 py-4 rounded-2xl font-bold text-base transition-all active:scale-[0.98]"
          style={{
            background: isDone && isLast ? "#006B32" : "#009245",
            color: "#fff",
          }}
        >
          {isDone && isLast
            ? "🎉 Recette terminée !"
            : isLast
            ? "Terminer la recette"
            : "Étape suivante →"}
        </button>
      </div>
    </div>
  );
}
