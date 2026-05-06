"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const serif = "'Cormorant Garamond', Georgia, serif";
const sans = "'DM Sans', 'Segoe UI', sans-serif";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function submit(event) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password })
      });
      const result = await response.json();

      if (result.success) {
        router.push("/");
        router.refresh();
      } else {
        setError("Mot de passe incorrect");
        setPassword("");
      }
    } catch {
      setError("Erreur de connexion");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="login-page">
      <section className="login-card">
        <div className="login-logo">
          <div style={{ fontFamily: serif }}>I LOVE</div>
          <div style={{ fontFamily: serif }}>MODELS</div>
        </div>
        <div className="login-subtitle">Agency OS · Acces equipe</div>
        <div className="login-rule" />
        <form onSubmit={submit}>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Mot de passe"
            autoFocus
            className={error ? "has-error" : ""}
            style={{ fontFamily: sans }}
          />
          {error ? <div className="login-error">{error}</div> : null}
          <button type="submit" disabled={loading || !password}>
            {loading ? "Connexion..." : "Acceder"}
          </button>
        </form>
        <p>Document Confidentiel - ILM OS v3</p>
      </section>
    </main>
  );
}
