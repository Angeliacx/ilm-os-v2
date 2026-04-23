import { NextResponse } from "next/server";
import { authenticateUser } from "@/lib/users";

export async function POST(request) {
  const { username, password } = await request.json();

  if (!username || !password) {
    return NextResponse.json(
      { success: false, error: "Identifiant et mot de passe requis" },
      { status: 400 }
    );
  }

  const user = authenticateUser(username, password);

  if (user) {
    const response = NextResponse.json({ success: true, user });
    // Cookie = base64 encoded user info
    const cookieValue = Buffer.from(JSON.stringify({
      id: user.id,
      name: user.name,
      role: user.role,
      access: user.access,
      modelId: user.modelId || null,
      managedModels: user.managedModels || [],
    })).toString("base64");

    response.cookies.set("ilm_auth", cookieValue, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });
    return response;
  }

  return NextResponse.json(
    { success: false, error: "Identifiant ou mot de passe incorrect" },
    { status: 401 }
  );
}
