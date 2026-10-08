// Vercel serverless function: saytdagi aloqa formasini Telegram botga yuboradi.
// Kerakli env o'zgaruvchilar: TELEGRAM_API_KEY (bot token), TELEGRAM_CHAT_ID (xabar boradigan chat).

const SERVICE_LABEL = { website: "Website", mobile: "Mobil ilova", bot: "Telegram bot", other: "Boshqa" };

function escapeHtml(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function clean(v, max) {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  const token = process.env.TELEGRAM_API_KEY;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    return res.status(500).json({ ok: false, error: "Server sozlanmagan" });
  }

  const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};

  // Botlar uchun yashirin maydon: to'ldirilgan bo'lsa jim qabul qilamiz.
  if (body.website_url) return res.status(200).json({ ok: true });

  const name = clean(body.name, 100);
  const contact = clean(body.contact, 100);
  const message = clean(body.message, 2000);
  const service = SERVICE_LABEL[body.service] || "Boshqa";
  if (!name || !contact || !message) {
    return res.status(400).json({ ok: false, error: "Barcha maydonlarni to'ldiring" });
  }

  const text =
    "🆕 <b>Yangi buyurtma — vocora-team.uz</b>\n\n" +
    "👤 <b>Ism:</b> " + escapeHtml(name) + "\n" +
    "📞 <b>Aloqa:</b> " + escapeHtml(contact) + "\n" +
    "🛠 <b>Xizmat:</b> " + escapeHtml(service) + "\n\n" +
    "💬 " + escapeHtml(message);

  try {
    const tg = await fetch("https://api.telegram.org/bot" + token + "/sendMessage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML", disable_web_page_preview: true }),
    });
    const data = await tg.json();
    if (!data.ok) throw new Error(data.description);
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Telegram error:", err);
    return res.status(502).json({ ok: false, error: "Xabar yuborilmadi" });
  }
}
