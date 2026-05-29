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
    const nameParts = name.split(/\s+/).filter(Boolean);
    const firstName = nameParts[0] || name;
    const lastName = nameParts.slice(1).join(" ");
    const labelStyle = "font-size:13px;font-weight:700;color:#5a6b60;display:block;margin-bottom:4px;";
    const valueStyle = "font-size:16px;font-weight:600;color:#0a1f0f;display:block;";
    const rowStyle = "padding:14px 0;border-bottom:1px solid #e8ece9;";
    const html = `
<!doctype html>
<html>
<body style="margin:0;padding:0;background:#ffffff;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;color:#0a1f0f;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#ffffff;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;">
          <tr>
            <td style="padding-bottom:24px;border-bottom:2px solid #00C805;">
              <div style="font-size:13px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#00C805;">New Lead</div>
            </td>
          </tr>
          <tr>
            <td style="${rowStyle}">
              <span style="${labelStyle}">First Name</span>
              <span style="${valueStyle}">${escapeHtml(firstName)}</span>
            </td>
          </tr>
          <tr>
            <td style="${rowStyle}">
              <span style="${labelStyle}">Last Name</span>
              <span style="${valueStyle}">${escapeHtml(lastName) || "(not provided)"}</span>
            </td>
          </tr>
          <tr>
            <td style="${rowStyle}">
              <span style="${labelStyle}">TikTok</span>
              <span style="${valueStyle}"><a href="${tiktokUrl}" style="color:#00C805;text-decoration:none;font-weight:700;">@${escapeHtml(tiktokHandle)}</a></span>
            </td>
          </tr>
          <tr>
            <td style="${rowStyle}">
              <span style="${labelStyle}">Phone</span>
              <span style="${valueStyle}">${phone ? `<a href="tel:${escapeHtml(phone)}" style="color:#0a1f0f;text-decoration:none;font-weight:600;">${escapeHtml(phone)}</a>` : "(not provided)"}</span>
            </td>
          </tr>
          <tr>
            <td style="${rowStyle}">
              <span style="${labelStyle}">Tier</span>
              <span style="${valueStyle}">${escapeHtml(tierLabel[tier])}</span>
            </td>
          </tr>
          <tr>
            <td style="${rowStyle}">
              <span style="${labelStyle}">Goals</span>
              <span style="${valueStyle};white-space:pre-wrap;line-height:1.5;">${escapeHtml(goals)}</span>
            </td>
          </tr>
          <tr>
            <td style="${rowStyle}border-bottom:none;">
              <span style="${labelStyle}">Submitted</span>
              <span style="${valueStyle}">${escapeHtml(submittedAt)}</span>
            </td>
          </tr>
          <tr>
            <td style="padding-top:24px;font-size:12px;color:#9aa8a0;">
              Sent from investingwithgreg.com
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `.trim();

    const text = [
      `First Name: ${firstName}`,
      `Last Name: ${lastName}`,
      `TikTok: @${tiktokHandle}`,
      `TikTokURL: ${tiktokUrl}`,
      `Phone: ${phone}`,
      `Tier: ${tierLabel[tier]}`,
      `Goals: ${goals.replace(/\r?\n/g, " ")}`,
      `Submitted: ${submittedAt}`,
    ].join("\n");

    const { error } = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      subject: `New lead from ${name} (${tierLabel[tier]})`,
      html,
      text,
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
