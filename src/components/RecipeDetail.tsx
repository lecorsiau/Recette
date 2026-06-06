"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Recipe } from "@/lib/types";

function fmt(amount: string, ratio: number) {
  const n = parseFloat(amount);
  if (isNaN(n)) return amount;
  const v = n * ratio;
  return v % 1 === 0 ? String(v) : parseFloat(v.toFixed(1)).toString();
}

export default function RecipeDetail({ recipe }: { recipe: Recipe }) {
  const router = useRouter();
  const [tab, setTab] = useState<"ingredients" | "etapes" | "notes">("ingredients");
  const [servings, setServings] = useState(recipe.servings);
  const ratio = servings / recipe.servings;

  const ingredients = recipe.ingredients ?? [];
  const steps = recipe.steps ?? [];
  const notes = recipe.notes ?? [];

  const tagColor = recipe.tag === "Vegan" ? { bg: "#E8F5EE", text: "#006B32", border: "#C6E8D4" } : { bg: "#EFF6FF", text: "#1D4ED8", border: "#BFDBFE" };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Hero header */}
      <div className="relative bg-tm-green-light border-b border-tm-green-mid overflow-hidden">
        {/* Back */}
        <button
          onClick={() => router.back()}
          className="absolute top-5 left-5 z-10 w-10 h-10 rounded-full bg-white shadow-sm border border-gray-200 flex items-center justify-center text-gray-600 hover:text-tm-green transition-colors"
        >
          ←
        </button>

        {/* Emoji watermark */}
        <div className="absolute right-4 top-4 text-8xl opacity-10 select-none pointer-events-none">
          {recipe.emoji}
        </div>

        <div className="px-5 pt-16 pb-6 relative">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span
              className="text-xs font-semibold px-2.5 py-1 rounded-full border"
              style={{ background: tagColor.bg, color: tagColor.text, borderColor: tagColor.border }}
            >
              {recipe.tag}
            </span>
            {recipe.device && (
              <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-white border border-tm-green-mid text-tm-green">
                ⚙️ {recipe.device}
              </span>
            )}
          </div>

          <h1 className="text-2xl font-bold text-gray-900 leading-tight mb-1">
            {recipe.title}
          </h1>
          {recipe.subtitle && (
            <p className="text-sm text-gray-500">{recipe.subtitle}</p>
          )}
        </div>
      </div>

      {/* Meta strip */}
      <div className="grid grid-cols-4 border-b border-gray-100 bg-white">
        {[
          { label: "Portions", value: servings },
          { label: "Prépa", value: recipe.prep_time ? `${recipe.prep_time}min` : "—" },
          { label: "Cuisson", value: recipe.cook_time ? `${recipe.cook_time}min` : "—" },
          { label: "Niveau", value: recipe.difficulty },
        ].map((m) => (
          <div key={m.label} className="flex flex-col items-center py-4 px-2 border-r border-gray-100 last:border-0">
            <span className="font-bold text-sm text-gray-900">{m.value}</span>
            <span className="text-xs text-gray-400 mt-0.5">{m.label}</span>
          </div>
        ))}
      </div>

      {/* Portions adjuster */}
      <div className="flex items-center justify-between px-5 py-4 bg-tm-green-light border-b border-tm-green-mid">
        <span className="text-sm font-medium text-gray-700">Ajuster les portions</span>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setServings((s) => Math.max(1, s - 1))}
            className="w-8 h-8 rounded-full bg-white border-2 border-tm-green text-tm-green font-bold flex items-center justify-center hover:bg-tm-green hover:text-white transition-colors"
          >
            −
          </button>
          <span className="w-8 text-center font-bold text-gray-900 text-lg">{servings}</span>
          <button
            onClick={() => setServings((s) => s + 1)}
            className="w-8 h-8 rounded-full bg-white border-2 border-tm-green text-tm-green font-bold flex items-center justify-center hover:bg-tm-green hover:text-white transition-colors"
          >
            +
          </button>
        </div>
      </div>

      {/* Description */}
      {recipe.description && (
        <div className="px-5 py-4 border-b border-gray-100">
          <p className="text-sm text-gray-500 leading-relaxed">{recipe.description}</p>
        </div>
      )}

      {/* Tabs */}
      <div className="flex border-b border-gray-100 bg-white sticky top-0 z-10">
        {(["ingredients", "etapes", "notes"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className="flex-1 py-4 text-sm font-semibold border-b-2 transition-all"
            style={{
              color: tab === t ? "#009245" : "#9CA3AF",
              borderColor: tab === t ? "#009245" : "transparent",
            }}
          >
            {t === "ingredients" ? "Ingrédients" : t === "etapes" ? "Étapes" : "Notes"}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="flex-1 px-5 py-5 pb-36 overflow-y-auto">
        {tab === "ingredients" && (
          <div className="divide-y divide-gray-100">
            {ingredients.map((ing, i) => (
              <div key={i} className="flex items-center gap-4 py-3.5">
                <div className="w-2 h-2 rounded-full bg-tm-green shrink-0" />
                <span className="font-bold text-sm text-tm-green w-24 shrink-0">
                  {fmt(ing.amount, ratio)}{ing.unit ? ` ${ing.unit}` : ""}
                </span>
                <span className="text-sm text-gray-700">{ing.name}</span>
              </div>
            ))}
          </div>
        )}

        {tab === "etapes" && (
          <div className="space-y-3">
            {steps.map((s, i) => (
              <div key={i} className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-tm-green text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    {i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1 gap-2">
                      <span className="font-semibold text-sm text-gray-900">{s.title}</span>
                      {s.timer_seconds && (
                        <span className="text-xs text-gray-400 shrink-0">
                          ⏱ {Math.floor(s.timer_seconds / 60)}min
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 leading-relaxed">{s.content}</p>
                    {s.tip && (
                      <p className="text-xs text-amber-700 mt-2 pl-2 border-l-2 border-amber-300">
                        💡 {s.tip}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === "notes" && (
          <div className="space-y-3">
            {notes.length === 0 && (
              <p className="text-sm text-gray-400 text-center py-8">Aucune note</p>
            )}
            {notes.map((n, i) => (
              <div key={i} className="flex gap-3 py-3 border-b border-gray-100 last:border-0">
                <div className="w-1.5 h-1.5 rounded-full bg-tm-green mt-2 shrink-0" />
                <p className="text-sm text-gray-600 leading-relaxed">{n}</p>
              </div>
            ))}
            {recipe.source_url && (
              <p className="text-xs text-gray-400 pt-2">
                Source :{" "}
                <a href={recipe.source_url} target="_blank" rel="noopener noreferrer" className="text-tm-green underline">
                  {recipe.source_url}
                </a>
              </p>
            )}
          </div>
        )}
      </div>

      {/* Fixed CTA */}
      <div className="fixed bottom-0 left-0 right-0 px-5 pb-8 pt-4 bg-white border-t border-gray-100">
        <button
          onClick={() => router.push(`/cook/${recipe.id}`)}
          className="w-full py-4 rounded-2xl bg-tm-green text-white font-bold text-base flex items-center justify-center gap-2 hover:bg-tm-green-dark transition-colors active:scale-[0.98]"
        >
          <span>👨‍🍳</span> Commencer la cuisson
        </button>
      </div>
    </div>
  );
}
