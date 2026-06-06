export interface Ingredient {
  id?: string;
  sort_order: number;
  amount: string;
  unit: string;
  name: string;
}

export interface Step {
  id?: string;
  sort_order: number;
  title: string;
  content: string;
  timer_seconds: number | null;
  tip: string | null;
  device_instruction: string | null;
}

export interface Recipe {
  id: string;
  user_id: string;
  title: string;
  subtitle: string | null;
  description: string | null;
  tag: "Végétarien" | "Vegan";
  device: string | null;
  servings: number;
  prep_time: number | null;
  cook_time: number | null;
  difficulty: string;
  emoji: string;
  accent_color: string;
  source_url: string | null;
  notes: string[] | null;
  created_at: string;
  updated_at: string;
  ingredients?: Ingredient[];
  steps?: Step[];
}
