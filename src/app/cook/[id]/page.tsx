"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";
import type { Recipe } from "@/lib/types";
import CookingMode from "@/components/CookingMode";

export default function CookPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const supabase = createClient();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { router.replace("/auth"); return; }

      const [{ data: r }, { data: steps }] = await Promise.all([
        supabase.from("recipes").select("*").eq("id", id).single(),
        supabase.from("recipe_steps").select("*").eq("recipe_id", id).order("sort_order"),
      ]);

      if (!r) { router.replace("/"); return; }
      setRecipe({ ...r, steps: steps ?? [] });
      setLoading(false);
    };
    load();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-tm-green flex items-center justify-center">
        <div className="w-10 h-10 rounded-full border-4 border-white border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!recipe) return null;
  return <CookingMode recipe={recipe} />;
}
