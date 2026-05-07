import { NextResponse } from "next/server";

function enabled(value) {
  return Boolean(value && String(value).trim());
}

export async function GET() {
  return NextResponse.json({
    generatedAt: new Date().toISOString(),
    auth: {
      Jordan: enabled(process.env.ILM_PASSWORD),
      Sophie: enabled(process.env.ILM_PASSWORD_SOPHIE),
      Louis: enabled(process.env.ILM_PASSWORD_LOUIS),
      Vanessa: enabled(process.env.ILM_PASSWORD_VANESSA),
      Juliette: enabled(process.env.ILM_PASSWORD_JULIETTE),
      Ned: enabled(process.env.ILM_PASSWORD_NED),
      Marvin: enabled(process.env.ILM_PASSWORD_MARVIN),
      Team: enabled(process.env.ILM_PASSWORD_TEAM)
    },
    integrations: {
      notion: enabled(process.env.NOTION_TOKEN) || enabled(process.env.NOTION_API_KEY),
      meta: enabled(process.env.META_ACCESS_TOKEN),
      tiktok: enabled(process.env.TIKTOK_ACCESS_TOKEN),
      telegram: enabled(process.env.TELEGRAM_BOT_TOKEN),
      x: enabled(process.env.X_BEARER_TOKEN),
      analytics: enabled(process.env.VERCEL_ANALYTICS_ID),
      vercelApi: enabled(process.env.VERCEL_API_TOKEN),
      madameVanessaProject: enabled(process.env.VERCEL_PROJECT_ID_MADAME_VANESSA)
    }
  });
}
