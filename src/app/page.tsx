"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";
import type { Recipe } from "@/lib/types";

function TagBadge({ tag }: { tag: string }) {
  const isVegan = tag === "Vegan";
  return (
    <span
      className="text-xs font-semibold px-2.5 py-1 rounded-full border"
      style={
        isVegan
          ? { background: "#E8F5EE", color: "#006B32", borderColor: "#C6E8D4" }
          : { background: "#EFF6FF", color: "#1D4ED8", borderColor: "#BFDBFE" }
      }
    >
      {tag}
    </span>
  );
}

function RecipeCard({ recipe, onClick }: { recipe: Recipe; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md hover:border-tm-green-mid transition-all active:scale-[0.99] flex"
    >
      {/* Color accent bar */}
      <div className="w-1.5 shrink-0 rounded-l-2xl" style={{ background: recipe.accent_color }} />

      <div className="flex-1 px-4 py-4">
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="flex flex-wrap gap-2">
            <TagBadge tag={recipe.tag} />
            {recipe.device && (
              <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-tm-green-light border border-tm-green-mid text-tm-green">
                ⚙️ {recipe.device}
              </span>
            )}
          </div>
          <span className="text-3xl shrink-0">{recipe.emoji}</span>
        </div>

        <h3 className="font-bold text-gray-900 text-base leading-tight mb-0.5">
          {recipe.title}
        </h3>
        {recipe.subtitle && (
          <p className="text-xs text-gray-400 line-clamp-1 mb-3">{recipe.subtitle}</p>
        )}

        <div className="flex items-center gap-4 text-xs text-gray-400">
          {recipe.prep_time && recipe.cook_time && (
            <span>⏱ {recipe.prep_time + recipe.cook_time} min</span>
          )}
          <span>👤 {recipe.servings} pers.</span>
          <span>{recipe.difficulty}</span>
        </div>
      </div>
    </button>
  );
}

export default function HomePage() {
  const router = useRouter();
  const supabase = createClient();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [user, setUser] = useState<{ email?: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { router.replace("/auth"); return; }
      setUser(session.user);

      const { data } = await supabase
        .from("recipes")
        .select("*")
        .order("created_at", { ascending: false });

      // Seed les recettes de base si le carnet est vide
      if ((data ?? []).length === 0) {
        await fetch("/api/seed", { method: "POST" });
        const { data: seeded } = await supabase
          .from("recipes")
          .select("*")
          .order("created_at", { ascending: false });
        setRecipes(seeded ?? []);
      } else {
        setRecipes(data ?? []);
      }
      setLoading(false);
    };
    init();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace("/auth");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-tm-green-light flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-full border-4 border-tm-green border-t-transparent animate-spin" />
          <p className="text-sm text-gray-500">Chargement…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header TM5 style */}
      <div className="bg-tm-green px-5 pt-12 pb-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🌿</span>
            <span className="text-sm font-medium text-white/80">Mon Carnet Végé</span>
          </div>
          <button
            onClick={handleLogout}
            className="text-xs text-white/60 hover:text-white/90 transition-colors"
          >
            Déconnexion
          </button>
        </div>
        <h1 className="text-3xl font-bold leading-tight">
          Recettes<br />
          <span className="text-white/70 font-normal italic text-2xl">Végé & Vegan</span>
        </h1>
        <p className="text-white/60 text-xs mt-2">⚙️ Compatible Thermomix TM5</p>
      </div>

      {/* Content */}
      <div className="px-4 py-5">
        {recipes.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">📖</div>
            <h2 className="font-bold text-gray-700 mb-2">Votre carnet est vide</h2>
            <p className="text-sm text-gray-400 max-w-xs mx-auto">
              Demandez-moi une recette végé ou vegan, elle sera ajoutée ici automatiquement !
            </p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-gray-700 text-sm uppercase tracking-wide">
                {recipes.length} recette{recipes.length > 1 ? "s" : ""}
              </h2>
            </div>
            <div className="space-y-3 fade-up">
              {recipes.map((r) => (
                <RecipeCard
                  key={r.id}
                  recipe={r}
                  onClick={() => router.push(`/recipe/${r.id}`)}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
