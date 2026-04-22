import { NextResponse } from "next/server";

export async function POST(request) {
  const { password } = await request.json();
  const validPassword = process.env.ILM_PASSWORD || "ilm2026";

  if (password === validPassword) {
    const response = NextResponse.json({ success: true });
    // Set a cookie valid for 7 days
    response.cookies.set("ilm_auth", "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });
    return response;
  }

  return NextResponse.json({ success: false, error: "Mot de passe incorrect" }, { status: 401 });
}
