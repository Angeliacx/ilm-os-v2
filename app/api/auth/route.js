import { cookies } from "next/headers";
import { NextResponse } from "next/server";

async function sessionToken(password) {
  const input = new TextEncoder().encode(`${password}::ilm-os`);
  const hash = await crypto.subtle.digest("SHA-256", input);
  return Array.from(new Uint8Array(hash), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

function credentials() {
  return [
    ["Jordan", process.env.ILM_PASSWORD],
    ["Sophie", process.env.ILM_PASSWORD_SOPHIE],
    ["Louis", process.env.ILM_PASSWORD_LOUIS],
    ["Vanessa", process.env.ILM_PASSWORD_VANESSA],
    ["Juliette", process.env.ILM_PASSWORD_JULIETTE],
    ["Ned", process.env.ILM_PASSWORD_NED],
    ["Marvin", process.env.ILM_PASSWORD_MARVIN],
    ["Team", process.env.ILM_PASSWORD_TEAM]
  ].filter(([, password]) => Boolean(password));
}

export async function POST(request) {
  const { password } = await request.json();
  const match = credentials().find(([, expectedPassword]) => password === expectedPassword);

  if (!credentials().length) {
    return NextResponse.json({ success: false, error: "Auth not configured" }, { status: 500 });
  }

  if (!match) {
    return NextResponse.json({ success: false }, { status: 401 });
  }

  const [role, expectedPassword] = match;
  const cookieStore = await cookies();
  cookieStore.set("ilm_session", await sessionToken(expectedPassword), {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production"
  });
  cookieStore.set("ilm_role", role, {
    httpOnly: false,
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production"
  });

  return NextResponse.json({ success: true, role });
}
