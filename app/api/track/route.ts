import { kv } from "@vercel/kv";

function todayKey() {
  return new Date().toISOString().slice(0, 10); // "YYYY-MM-DD"
}

export async function POST(req: Request) {
  try {
    const { event, lang, scene } = await req.json();
    const day = todayKey();

    if (event === "visit") {
      await kv.incr(`track:visits:${day}`);
      if (lang === "da" || lang === "en") {
        await kv.incr(`track:lang:${lang}:${day}`);
      }
    } else if (event === "scene" && typeof scene === "number") {
      await kv.incr(`track:scene:${scene}:${day}`);
    } else if (event === "lead") {
      await kv.incr(`track:leads:${day}`);
    }

    return Response.json({ ok: true });
  } catch {
    return Response.json({ ok: false }, { status: 500 });
  }
}
