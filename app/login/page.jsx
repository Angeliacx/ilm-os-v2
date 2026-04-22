"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const font = "'Cormorant Garamond', Georgia, serif";
const fontSans = "'DM Sans', 'Segoe UI', sans-serif";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();
      if (data.success) {
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
    <div
      style={{
        minHeight: "100vh",
        background: "#06060E",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: fontSans,
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=DM+Sans:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />

      <div
        style={{
          background: "#0C0C18",
          border: "1px solid #1C1C3A",
          borderRadius: 20,
          padding: "48px 44px",
          width: 400,
          maxWidth: "90vw",
          textAlign: "center",
        }}
      >
        {/* Logo */}
        <div style={{ marginBottom: 8 }}>
          <div
            style={{
              fontFamily: font,
              fontSize: 32,
              fontWeight: 700,
              color: "#E2C97E",
              letterSpacing: "0.14em",
              lineHeight: 1.1,
            }}
          >
            I LOVE
          </div>
          <div
            style={{
              fontFamily: font,
              fontSize: 32,
              fontWeight: 700,
              color: "#E2C97E",
              letterSpacing: "0.14em",
              lineHeight: 1.1,
            }}
          >
            MODELS
          </div>
        </div>

        <div
          style={{
            fontSize: 10,
            color: "#6B7280",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            marginBottom: 36,
          }}
        >
          Agency OS
        </div>

        {/* Divider */}
        <div
          style={{
            height: 1,
            background: "linear-gradient(90deg, transparent, #1C1C3A, transparent)",
            marginBottom: 32,
          }}
        />

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 20 }}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mot de passe"
              autoFocus
              style={{
                width: "100%",
                padding: "14px 18px",
                background: "#111122",
                border: `1px solid ${error ? "#EF4444" : "#1C1C3A"}`,
                borderRadius: 10,
                color: "#F1EEFF",
                fontSize: 14,
                fontFamily: fontSans,
                outline: "none",
                transition: "border-color 0.2s",
                textAlign: "center",
                letterSpacing: "0.1em",
              }}
              onFocus={(e) => {
                if (!error) e.target.style.borderColor = "rgba(201,168,76,0.4)";
              }}
              onBlur={(e) => {
                if (!error) e.target.style.borderColor = "#1C1C3A";
              }}
            />
          </div>

          {error && (
            <div
              style={{
                color: "#EF4444",
                fontSize: 12,
                marginBottom: 16,
                padding: "8px 12px",
                background: "rgba(239,68,68,0.12)",
                borderRadius: 8,
              }}
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !password}
            style={{
              width: "100%",
              padding: "14px 0",
              background: loading
                ? "rgba(201,168,76,0.3)"
                : "linear-gradient(135deg, #C9A84C, #7C5CFC)",
              border: "none",
              borderRadius: 10,
              color: "#06060E",
              fontSize: 13,
              fontWeight: 700,
              fontFamily: fontSans,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              cursor: loading || !password ? "not-allowed" : "pointer",
              opacity: loading || !password ? 0.6 : 1,
              transition: "opacity 0.2s, transform 0.1s",
            }}
          >
            {loading ? "Connexion..." : "Accéder"}
          </button>
        </form>

        <div
          style={{
            marginTop: 28,
            fontSize: 10,
            color: "#6B7280",
          }}
        >
          Document Confidentiel — ILM OS v2
        </div>
      </div>
    </div>
  );
}
