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
  const makeWebhookUrl = process.env.MAKE_WEBHOOK_URL;

  if (makeWebhookUrl) {
    fetch(makeWebhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        tiktok: tiktokHandle,
        phone,
        tier: tierLabel[tier],
        goals,
      }),
    }).catch((err) => {
      // eslint-disable-next-line no-console
      console.error("[make webhook error]", err);
    });
  }

  if (!apiKey || apiKey.includes("placeholder") || !fromEmail || !toEmail) {
    // eslint-disable-next-line no-console
    console.log("[lead] (Resend not configured — logging only)", { name, tiktokHandle, phone, tier, goals });
    return NextResponse.json({ ok: true, mode: "logged" });
  }

  try {
    const resend = new Resend(apiKey);
    const tiktokUrl = `https://www.tiktok.com/@${encodeURIComponent(tiktokHandle)}`;
    const submittedAt = new Date().toLocaleString("en-US", {
      timeZone: "America/Los_Angeles",
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZoneName: "short",
    });
    const html = `
<!doctype html>
<html>
<body style="margin:0;padding:0;background:#f5f7f6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;color:#0a1f0f;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f5f7f6;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;background:#ffffff;border-radius:16px;box-shadow:0 1px 2px rgba(10,31,15,0.04),0 8px 24px rgba(10,31,15,0.06);overflow:hidden;">
          <tr>
            <td style="height:4px;background:#00C805;line-height:4px;font-size:0;">&nbsp;</td>
          </tr>
          <tr>
            <td style="padding:32px 32px 8px 32px;">
              <div style="font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#00C805;margin-bottom:8px;">New Lead</div>
              <div style="font-size:24px;font-weight:800;letter-spacing:-0.02em;line-height:1.2;color:#0a1f0f;">${escapeHtml(name)}</div>
              <div style="font-size:14px;font-weight:500;color:#5a6b60;margin-top:6px;">${escapeHtml(tierLabel[tier])}</div>
            </td>
          </tr>
          <tr>
            <td style="padding:24px 32px 8px 32px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-top:1px solid #e8ece9;">
                <tr>
                  <td style="padding:16px 0;border-bottom:1px solid #e8ece9;width:120px;font-size:12px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:#7a8a80;">TikTok</td>
                  <td style="padding:16px 0;border-bottom:1px solid #e8ece9;font-size:15px;font-weight:600;text-align:right;">
                    <a href="${tiktokUrl}" style="color:#00C805;text-decoration:none;font-weight:700;">@${escapeHtml(tiktokHandle)} &rarr;</a>
                  </td>
                </tr>
                ${phone ? `
                <tr>
                  <td style="padding:16px 0;border-bottom:1px solid #e8ece9;width:120px;font-size:12px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:#7a8a80;">Phone</td>
                  <td style="padding:16px 0;border-bottom:1px solid #e8ece9;font-size:15px;font-weight:600;text-align:right;color:#0a1f0f;">
                    <a href="tel:${escapeHtml(phone)}" style="color:#0a1f0f;text-decoration:none;font-weight:600;">${escapeHtml(phone)}</a>
                  </td>
                </tr>` : ""}
                <tr>
                  <td style="padding:16px 0;width:120px;font-size:12px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:#7a8a80;">Tier</td>
                  <td style="padding:16px 0;font-size:15px;font-weight:600;text-align:right;color:#0a1f0f;">${escapeHtml(tierLabel[tier])}</td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:16px 32px 32px 32px;">
              <div style="font-size:12px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:#7a8a80;margin-bottom:10px;">Goals</div>
              <div style="background:#f5f7f6;border-left:3px solid #00C805;padding:16px 18px;border-radius:8px;font-size:15px;line-height:1.6;color:#0a1f0f;white-space:pre-wrap;">${escapeHtml(goals)}</div>
            </td>
          </tr>
          <tr>
            <td style="padding:0 32px 24px 32px;border-top:1px solid #e8ece9;">
              <div style="font-size:11px;color:#9aa8a0;padding-top:16px;line-height:1.6;">
                Sent from investingwithgreg.com<br>
                ${escapeHtml(submittedAt)}
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
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
