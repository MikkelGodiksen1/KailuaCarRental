import { kv } from "@vercel/kv";

const SCENE_NAMES = ["HEJ", "HJEMMESIDER", "AUTOMATISERING", "MARKEDSFØRING", "KONTAKT"];

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function formatDate(isoDate: string) {
  const [year, month, day] = isoDate.split("-");
  const months = ["januar","februar","marts","april","maj","juni","juli","august","september","oktober","november","december"];
  return `${parseInt(day)}. ${months[parseInt(month) - 1]} ${year}`;
}

export async function GET(req: Request) {
  // Beskyt cron-endpoint med Vercel's automatiske CRON_SECRET header
  const authHeader = req.headers.get("authorization");
  if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return Response.json({ ok: false }, { status: 401 });
  }

  const token = process.env.telegram;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    return Response.json({ ok: false, error: "Telegram ikke konfigureret" }, { status: 500 });
  }

  const day = todayKey();

  const [visits, da, en, leads, ...sceneCounts] = await Promise.all([
    kv.get<number>(`track:visits:${day}`),
    kv.get<number>(`track:lang:da:${day}`),
    kv.get<number>(`track:lang:en:${day}`),
    kv.get<number>(`track:leads:${day}`),
    ...SCENE_NAMES.map((_, i) => kv.get<number>(`track:scene:${i}:${day}`)),
  ]);

  // Find mest sete scene
  let topScene = "–";
  let topCount = 0;
  sceneCounts.forEach((count: number | null, i: number) => {
    if ((count ?? 0) > topCount) {
      topCount = count ?? 0;
      topScene = SCENE_NAMES[i];
    }
  });

  const text =
    `📊 GODIK.AI — DAGLIG RAPPORT\n` +
    `📅 Dato: ${formatDate(day)}\n\n` +
    `👀 Besøg i dag: ${visits ?? 0}\n` +
    `🌍 Sprog: ${da ?? 0} DA / ${en ?? 0} EN\n` +
    `📬 Nye leads: ${leads ?? 0}\n` +
    `🔥 Mest set scene: ${topScene}`;

  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text }),
  });

  if (!res.ok) {
    return Response.json({ ok: false, error: "Telegram fejl" }, { status: 502 });
  }

  return Response.json({ ok: true });
}
