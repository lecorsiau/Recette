"use client";
import { useState } from "react";
import { createClient } from "@/lib/supabase";

export default function AuthForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/` },
    });
    if (error) setError(error.message);
    else setSent(true);
    setLoading(false);
  };

  if (sent) {
    return (
      <div className="text-center py-8">
        <div className="text-5xl mb-4">📬</div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Vérifiez votre email</h2>
        <p className="text-sm text-gray-500">
          Un lien de connexion a été envoyé à <strong>{email}</strong>
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
          Adresse email
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="vous@exemple.com"
          required
          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-tm-green outline-none text-sm transition-colors"
        />
      </div>

      {error && (
        <p className="text-sm text-red-600 bg-red-50 rounded-xl px-4 py-3">{error}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3.5 rounded-xl bg-tm-green text-white font-bold text-sm hover:bg-tm-green-dark transition-colors disabled:opacity-60"
      >
        {loading ? "Envoi en cours…" : "Recevoir le lien de connexion"}
      </button>

      <p className="text-xs text-center text-gray-400">
        Connexion sans mot de passe par lien magique ✨
      </p>
    </form>
  );
}
