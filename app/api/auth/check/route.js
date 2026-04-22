import { NextResponse } from "next/server";

export async function GET(request) {
  const cookie = request.cookies.get("ilm_auth");
  if (cookie?.value === "authenticated") {
    return NextResponse.json({ authenticated: true });
  }
  return NextResponse.json({ authenticated: false }, { status: 401 });
}
