import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { seedRecipes } from "@/lib/seed-recipes";

export async function POST() {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll: () => cookieStore.getAll(), setAll: () => {} } }
  );

  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { count } = await supabase
    .from("recipes")
    .select("*", { count: "exact", head: true })
    .eq("user_id", session.user.id);

  if ((count ?? 0) === 0) {
    await seedRecipes(supabase as any, session.user.id);
  }

  return NextResponse.json({ ok: true });
}
