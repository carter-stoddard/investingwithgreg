import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

interface SubmitPayload {
  name: string;
  tiktokHandle: string;
  phone?: string;
  tier: string;
  goals: string;
  website?: string; // honeypot — humans leave this empty
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Strip a leading @ if the user typed one
function normalizeHandle(h: string): string {
  return h.replace(/^@+/, "").trim();
}

const tierLabel: Record<string, string> = {
  "30": "$30 Portfolio Drop",
  "60": "$60 Insider Access",
  "120": "$120 1:1 Deep Dive",
};

export async function POST(req: Request) {
  let body: SubmitPayload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  // Honeypot — if filled, it's a bot. Return a fake success so the bot doesn't retry.
  if ((body.website || "").trim().length > 0) {
    return NextResponse.json({ ok: true, mode: "logged" });
  }

  const name = (body.name || "").trim().slice(0, 200);
  const tiktokHandle = normalizeHandle((body.tiktokHandle || "").slice(0, 100));
  const phone = (body.phone || "").trim().slice(0, 60);
  const tier = (body.tier || "").trim();
  const goals = (body.goals || "").trim().slice(0, 4000);

  if (!name || !tiktokHandle || !tier || !goals) {
    return NextResponse.json({ error: "Please fill out all required fields." }, { status: 400 });
  }
  if (!tierLabel[tier]) {
    return NextResponse.json({ error: "Invalid tier selected." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL;
  const toEmail = process.env.RESEND_TO_EMAIL;

  if (!apiKey || apiKey.includes("placeholder") || !fromEmail || !toEmail) {
    // eslint-disable-next-line no-console
    console.log("[lead] (Resend not configured — logging only)", { name, tiktokHandle, phone, tier, goals });
    return NextResponse.json({ ok: true, mode: "logged" });
  }

  try {
    const resend = new Resend(apiKey);
    const tiktokUrl = `https://www.tiktok.com/@${encodeURIComponent(tiktokHandle)}`;
    const html = `
<!doctype html>
<html><body style="font-family: -apple-system, Segoe UI, Roboto, sans-serif; color: #111; padding: 24px; max-width: 560px; margin: 0 auto;">
  <h2 style="margin: 0 0 16px; font-size: 20px;">New lead for ${escapeHtml(tierLabel[tier])}</h2>
  <table style="border-collapse: collapse; width: 100%; font-size: 14px;">
    <tr><td style="padding: 8px 0; color: #666; width: 140px;">Name</td><td style="padding: 8px 0;">${escapeHtml(name)}</td></tr>
    <tr><td style="padding: 8px 0; color: #666;">TikTok</td><td style="padding: 8px 0;"><a href="${tiktokUrl}">@${escapeHtml(tiktokHandle)}</a></td></tr>
    ${phone ? `<tr><td style="padding: 8px 0; color: #666;">Phone</td><td style="padding: 8px 0;">${escapeHtml(phone)}</td></tr>` : ""}
    <tr><td style="padding: 8px 0; color: #666;">Tier</td><td style="padding: 8px 0;">${escapeHtml(tierLabel[tier])}</td></tr>
  </table>
  <h3 style="margin: 24px 0 8px; font-size: 15px;">Goals</h3>
  <p style="background: #f5f5f5; padding: 12px 14px; border-radius: 8px; white-space: pre-wrap; font-size: 14px; line-height: 1.5;">${escapeHtml(goals)}</p>
</body></html>
    `.trim();

    const { error } = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      subject: `New lead from ${name} (${tierLabel[tier]})`,
      html,
    });

    if (error) {
      // eslint-disable-next-line no-console
      console.error("[resend error]", error);
      return NextResponse.json({ error: "Failed to send. Please try again." }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("[submit error]", err);
    return NextResponse.json({ error: "Failed to send. Please try again." }, { status: 500 });
  }
}
