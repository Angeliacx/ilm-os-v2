import { NextResponse } from "next/server";
import { getUserById } from "@/lib/users";

export async function GET(request) {
  const cookie = request.cookies.get("ilm_auth");
  if (!cookie?.value) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  try {
    const decoded = JSON.parse(Buffer.from(cookie.value, "base64").toString());
    const user = getUserById(decoded.id);
    if (user) {
      return NextResponse.json({ authenticated: true, user });
    }
  } catch {
    // Invalid cookie
  }

  return NextResponse.json({ authenticated: false }, { status: 401 });
}
