import { NextResponse } from "next/server";

async function sessionToken(password) {
  const input = new TextEncoder().encode(`${password}::ilm-os`);
  const hash = await crypto.subtle.digest("SHA-256", input);
  return Array.from(new Uint8Array(hash), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

function passwords() {
  return [
    process.env.ILM_PASSWORD,
    process.env.ILM_PASSWORD_LOUIS,
    process.env.ILM_PASSWORD_VANESSA,
    process.env.ILM_PASSWORD_JULIETTE,
    process.env.ILM_PASSWORD_MARVIN,
    process.env.ILM_PASSWORD_TEAM
  ].filter(Boolean);
}

export async function middleware(request) {
  const configuredPasswords = passwords();

  if (!configuredPasswords.length) {
    return NextResponse.next();
  }

  const validTokens = await Promise.all(configuredPasswords.map((password) => sessionToken(password)));
  const currentToken = request.cookies.get("ilm_session")?.value;

  if (validTokens.includes(currentToken)) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/login", request.url));
}

export const config = {
  matcher: ["/", "/dashboard", "/dashboard.html", "/app.js", "/data.js", "/styles.css", "/api/status"]
};
