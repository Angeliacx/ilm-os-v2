"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ILMOS from "../components/ilm-os";

export default function Home() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/auth/check")
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated && data.user) {
          setUser(data.user);
        } else {
          router.push("/login");
        }
      })
      .catch(() => router.push("/login"))
      .finally(() => setLoading(false));
  }, [router]);

  if (loading || !user) {
    return (
      <div style={{
        minHeight: "100vh",
        background: "#06060E",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'DM Sans', sans-serif",
        color: "#6B7280",
        fontSize: 14,
      }}>
        <div style={{ textAlign: "center" }}>
          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 24,
            color: "#E2C97E",
            letterSpacing: "0.12em",
            marginBottom: 16,
          }}>
            ILM OS
          </div>
          <div>Chargement...</div>
        </div>
      </div>
    );
  }

  return <ILMOS currentUser={user} />;
}
