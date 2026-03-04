export async function POST(req: Request) {
  try {
    const { name, phone, company } = await req.json();

    if (!name || !phone || !company) {
      return Response.json({ ok: false, error: "Manglende felter" }, { status: 400 });
    }

    const token = process.env.telegram;          // Vercel env var: "telegram"
    const chatId = process.env.TELEGRAM_CHAT_ID; // Vercel env var: "TELEGRAM_CHAT_ID"

    if (!token || !chatId) {
      return Response.json({ ok: false, error: "Telegram ikke konfigureret" }, { status: 500 });
    }

    const text =
      `🔔 Ny henvendelse – Godik.ai\n\n` +
      `👤 Navn: ${name}\n` +
      `📞 Telefon: ${phone}\n` +
      `🏢 Virksomhed: ${company}`;

    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text }),
    });

    if (!res.ok) {
      return Response.json({ ok: false, error: "Telegram fejl" }, { status: 502 });
    }

    return Response.json({ ok: true });
  } catch {
    return Response.json({ ok: false, error: "Serverfejl" }, { status: 500 });
  }
}
