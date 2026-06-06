/**
 * Seed the two existing recipes into Supabase.
 * Run once after auth: import and call seedRecipes(supabaseClient, userId)
 */
import type { SupabaseClient } from "@supabase/supabase-js";

export async function seedRecipes(supabase: SupabaseClient, userId: string) {
  const recipes = [
    {
      user_id: userId,
      title: "Gnocchis poêlés",
      subtitle: "Carottes & navets fondants · Sauce crème parmesan",
      description: "Des gnocchis dorés croustillants accompagnés de légumes racines fondants dans une sauce crème veloutée au parmesan. Un plat réconfortant prêt en 30 minutes.",
      tag: "Végétarien",
      device: "TM5",
      servings: 4,
      prep_time: 10,
      cook_time: 25,
      difficulty: "Facile",
      emoji: "🍝",
      accent_color: "#D97706",
      notes: [
        "La poêle est indispensable pour dorer les gnocchis — le TM5 ne peut pas les faire sauter.",
        "Variante : remplacer le parmesan par de la feta pour une version plus légère.",
        "Conservation : à consommer aussitôt, les gnocchis ramollissent rapidement.",
      ],
      ingredients: [
        { sort_order: 0, amount: "380", unit: "g", name: "Gnocchis frais ou sous vide" },
        { sort_order: 1, amount: "300", unit: "g", name: "Carottes" },
        { sort_order: 2, amount: "250", unit: "g", name: "Navets" },
        { sort_order: 3, amount: "200", unit: "ml", name: "Crème fraîche épaisse" },
        { sort_order: 4, amount: "60", unit: "g", name: "Parmesan râpé" },
        { sort_order: 5, amount: "2", unit: "", name: "Gousses d'ail" },
        { sort_order: 6, amount: "30", unit: "g", name: "Beurre" },
        { sort_order: 7, amount: "1", unit: "c.s.", name: "Huile d'olive" },
        { sort_order: 8, amount: "1", unit: "c.c.", name: "Thym séché" },
        { sort_order: 9, amount: "500", unit: "ml", name: "Eau (pour la vapeur)" },
      ],
      steps: [
        { sort_order: 0, title: "Tailler les légumes", content: "Éplucher et couper carottes et navets en dés réguliers de 1,5 cm. Éplucher les gousses d'ail.", timer_seconds: null, tip: "Préparez tous vos légumes avant de commencer — le travail ira bien plus vite.", device_instruction: null },
        { sort_order: 1, title: "Cuisson vapeur", content: "Verser 500 ml d'eau dans le bol. Disposer les dés de carottes et navets dans le panier vapeur. Cuire 18 min / Varoma / Vit. 1.", timer_seconds: 18 * 60, tip: "Le Varoma monte à 120°C — la vapeur préserve toutes les saveurs.", device_instruction: "18 min · Varoma · Vit. 1 · Panier vapeur" },
        { sort_order: 2, title: "Sauce crème au parmesan", content: "Vider l'eau. Mettre l'ail, mixer 5 sec / Vit. 5. Ajouter beurre + huile, 3 min / 100°C / Vit. 1. Incorporer crème, parmesan, thym, sel, poivre. Cuire 4 min / 90°C / Vit. 2.", timer_seconds: 7 * 60, tip: "90°C évite l'ébullition qui ferait trancher la sauce.", device_instruction: "5s · Vit. 5 · puis 3min/100°C · puis 4min/90°C · Vit. 2" },
        { sort_order: 3, title: "Gnocchis dorés à la poêle", content: "Chauffer une poêle à feu vif avec un filet d'huile. Disposer les gnocchis en une seule couche. Ne pas toucher pendant 2-3 min puis retourner. 5-6 min au total.", timer_seconds: 6 * 60, tip: "Résistez à la tentation de remuer — le contact prolongé crée la croûte dorée.", device_instruction: null },
        { sort_order: 4, title: "Assemblage final", content: "Dans la poêle avec les gnocchis, verser les légumes vapeur réservés. Napper de sauce crème. Mélanger délicatement 1 minute à feu doux. Servir immédiatement.", timer_seconds: 60, tip: "Servir dans des assiettes chaudes pour garder la sauce veloutée.", device_instruction: null },
      ],
    },
    {
      user_id: userId,
      title: "Steak de betterave",
      subtitle: "Burger vegan · Croustillant & savoureux",
      description: "Des steaks végans à la betterave et légumineuses, croustillants à l'extérieur, moelleux à l'intérieur. Une alternative gourmande qui surprend même les carnivores.",
      tag: "Vegan",
      device: null,
      servings: 6,
      prep_time: 15,
      cook_time: 15,
      difficulty: "Moyen",
      emoji: "🍔",
      accent_color: "#9D174D",
      source_url: "https://vegan-pratique.fr/recettes/burger-steak-de-betterave/",
      notes: [
        "Si ça s'effrite : +1-2 c.s. de farine. Si trop compact : une lichette d'eau.",
        "Congélation parfaite, crus ou cuits. Réchauffer à la poêle pour retrouver le croustillant.",
        "Source : vegan-pratique.fr",
      ],
      ingredients: [
        { sort_order: 0, amount: "500", unit: "g", name: "Betterave cuite" },
        { sort_order: 1, amount: "240", unit: "g", name: "Pois chiches égouttés" },
        { sort_order: 2, amount: "1", unit: "", name: "Oignon" },
        { sort_order: 3, amount: "2", unit: "", name: "Gousses d'ail" },
        { sort_order: 4, amount: "80", unit: "g", name: "Chapelure" },
        { sort_order: 5, amount: "90", unit: "g", name: "Farine blanche" },
        { sort_order: 6, amount: "20", unit: "g", name: "Levure alimentaire" },
        { sort_order: 7, amount: "2", unit: "c.s.", name: "Moutarde de Dijon" },
        { sort_order: 8, amount: "1", unit: "c.s.", name: "Sauce soja" },
        { sort_order: 9, amount: "1", unit: "c.c.", name: "Paprika fumé" },
        { sort_order: 10, amount: "½", unit: "c.c.", name: "Cumin en poudre" },
      ],
      steps: [
        { sort_order: 0, title: "Écraser grossièrement", content: "Dans un grand saladier, écraser à la fourchette betterave et pois chiches. Conserver des morceaux — pas de purée lisse.", timer_seconds: null, tip: "Des morceaux = de la texture en bouche.", device_instruction: null },
        { sort_order: 1, title: "Faire revenir oignon & ail", content: "Émincer l'oignon, hacher l'ail. Faire revenir dans l'huile 5-6 min à feu moyen jusqu'à légère coloration. Réserver.", timer_seconds: 6 * 60, tip: "Ne pas brûler l'ail — feu moyen, patience.", device_instruction: null },
        { sort_order: 2, title: "Assembler l'appareil", content: "Ajouter chapelure, moutarde, sauce soja, paprika, cumin, sel, levure. Mélanger. Incorporer l'oignon et l'ail. Ajouter la farine petit à petit jusqu'à masse compacte.", timer_seconds: null, tip: "Test : prenez une boule et serrez. Si elle tient sans s'effriter, c'est prêt.", device_instruction: null },
        { sort_order: 3, title: "Façonner les steaks", content: "Humidifier les mains. Former 6 galettes épaisses de 1,5 cm avec environ 130-140g de mélange chacune.", timer_seconds: null, tip: "Des steaks épais gardent leur moelleux à cœur.", device_instruction: null },
        { sort_order: 4, title: "Cuisson à la poêle", content: "Chauffer poêle anti-adhésive à feu moyen avec huile généreuse. Cuire 4-5 min par face sans toucher, jusqu'à croûte sombre et croustillante.", timer_seconds: 10 * 60, tip: "Ne jamais appuyer avec la spatule — ça détruit la croûte.", device_instruction: null },
        { sort_order: 5, title: "Repos & dressage", content: "Laisser reposer 2 min. Glisser dans un pain burger avec salade, tomate, cornichons. Napper de sauce tahini ou mayo végane.", timer_seconds: 2 * 60, tip: "Le repos laisse les saveurs se redistribuer.", device_instruction: null },
      ],
    },
  ];

  for (const recipe of recipes) {
    const { ingredients, steps, ...recipeData } = recipe;

    const { data: inserted, error } = await supabase
      .from("recipes")
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .insert(recipeData as any)
      .select("id")
      .single();

    if (error || !inserted) continue;
    const recipeId = inserted.id;

    await supabase.from("recipe_ingredients").insert(
      ingredients.map((ing) => ({ ...ing, recipe_id: recipeId }))
    );
    await supabase.from("recipe_steps").insert(
      steps.map((step) => ({ ...step, recipe_id: recipeId }))
    );
  }
}
