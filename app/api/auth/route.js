import { createHash } from "node:crypto";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

function sessionToken(password) {
  return createHash("sha256").update(`${password}::ilm-os`).digest("hex");
}

function credentials() {
  const localJordanPassword = process.env.VERCEL ? undefined : "ilm2026";

  return [
    ["Jordan", process.env.ILM_PASSWORD || localJordanPassword],
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
  const secureCookie = request.nextUrl.protocol === "https:" || request.headers.get("x-forwarded-proto") === "https";
  cookieStore.set("ilm_session", sessionToken(expectedPassword), {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
    sameSite: "lax",
    secure: secureCookie
  });
  cookieStore.set("ilm_role", role, {
    httpOnly: false,
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
    sameSite: "lax",
    secure: secureCookie
  });

  return NextResponse.json({ success: true, role });
}
