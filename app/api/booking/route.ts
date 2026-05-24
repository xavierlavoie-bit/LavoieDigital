import sgMail from "@sendgrid/mail";
import { NextResponse } from "next/server";

const PROJECT_TYPE_LABEL: Record<string, string> = {
  app: "Application full-stack",
  site: "Site web premium",
  branding: "Branding digital",
  autre: "Autre projet",
};

const BUDGET_LABEL: Record<string, string> = {
  "5k": "Moins de 5 000 $",
  "5-15k": "5 000 — 15 000 $",
  "15-40k": "15 000 — 40 000 $",
  "40k+": "Plus de 40 000 $",
};

const TIMELINE_LABEL: Record<string, string> = {
  asap: "Dès que possible",
  "1-3": "Dans 1 à 3 mois",
  "3-6": "Dans 3 à 6 mois",
  flex: "Flexible",
};

type BookingPayload = {
  projectType?: string;
  budget?: string;
  timeline?: string;
  name?: string;
  email?: string;
  company?: string;
  phone?: string;
  message?: string;
};

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: Request) {
  try {
    const data = (await request.json()) as BookingPayload;

    if (!data?.email || !data?.name) {
      return NextResponse.json(
        { error: "Nom et courriel requis." },
        { status: 400 },
      );
    }
    if (!/.+@.+\..+/.test(data.email)) {
      return NextResponse.json(
        { error: "Courriel invalide." },
        { status: 400 },
      );
    }

    const apiKey = process.env.SENDGRID_API_KEY;
    const from = process.env.SENDGRID_FROM_EMAIL;
    const to = process.env.SENDGRID_TO_EMAIL;

    if (!apiKey || !from || !to) {
      console.error("[booking] SendGrid env vars missing");
      return NextResponse.json(
        { error: "Configuration courriel manquante." },
        { status: 500 },
      );
    }

    sgMail.setApiKey(apiKey);

    const projectType =
      PROJECT_TYPE_LABEL[data.projectType ?? ""] ?? data.projectType ?? "—";
    const budget = BUDGET_LABEL[data.budget ?? ""] ?? data.budget ?? "—";
    const timeline = TIMELINE_LABEL[data.timeline ?? ""] ?? data.timeline ?? "—";

    const safeName = escapeHtml(data.name);
    const safeEmail = escapeHtml(data.email);
    const safeCompany = escapeHtml(data.company ?? "");
    const safePhone = escapeHtml(data.phone ?? "");
    const safeMessage = escapeHtml(data.message ?? "");

    // ---- Email 1: notification to Xavier ----
    const notifSubject = `Nouvelle demande — ${safeName} (${projectType})`;
    const notifText = [
      `Nouvelle demande de projet`,
      ``,
      `Nom: ${data.name}`,
      `Courriel: ${data.email}`,
      `Entreprise: ${data.company || "—"}`,
      `Téléphone: ${data.phone || "—"}`,
      ``,
      `Type: ${projectType}`,
      `Budget: ${budget}`,
      `Délai: ${timeline}`,
      ``,
      `Message:`,
      data.message || "(aucun)",
    ].join("\n");
    const notifHtml = brandedEmail({
      preheader: `Nouvelle demande de ${safeName}`,
      title: "Nouvelle demande",
      lead: `<strong>${safeName}</strong> vient de soumettre une demande via le formulaire de réservation.`,
      rows: [
        ["Nom", safeName],
        ["Courriel", `<a href="mailto:${safeEmail}" style="color:#fff">${safeEmail}</a>`],
        ["Entreprise", safeCompany || "—"],
        ["Téléphone", safePhone || "—"],
        ["Type de projet", projectType],
        ["Budget", budget],
        ["Délai", timeline],
      ],
      message: safeMessage,
      cta: { label: "Répondre par courriel", href: `mailto:${safeEmail}` },
    });

    // ---- Email 2: confirmation to the client ----
    const confirmSubject = `On a bien reçu votre demande — Lavoie Digital`;
    const confirmText = [
      `Bonjour ${data.name},`,
      ``,
      `Merci d'avoir pris contact avec Lavoie Digital. On a bien reçu votre demande et on revient vers vous sous 24 heures pour planifier un appel découverte.`,
      ``,
      `Récapitulatif :`,
      `• Type de projet : ${projectType}`,
      `• Budget : ${budget}`,
      `• Délai : ${timeline}`,
      ``,
      `À très bientôt,`,
      `Xavier Lavoie — Lavoie Digital`,
    ].join("\n");
    const confirmHtml = brandedEmail({
      preheader: `On a bien reçu votre demande. Réponse sous 24 heures.`,
      title: "Merci, on a reçu votre demande.",
      lead: `Bonjour <strong>${safeName.split(" ")[0]}</strong>, on a bien reçu votre demande. On revient vers vous <strong>sous 24 heures</strong> pour planifier un appel découverte.`,
      rows: [
        ["Type de projet", projectType],
        ["Budget", budget],
        ["Délai", timeline],
      ],
      message: "",
      signature: "Xavier Lavoie — Lavoie Digital",
    });

    await Promise.all([
      sgMail.send({
        to,
        from,
        replyTo: data.email,
        subject: notifSubject,
        text: notifText,
        html: notifHtml,
      }),
      sgMail.send({
        to: data.email,
        from,
        subject: confirmSubject,
        text: confirmText,
        html: confirmHtml,
      }),
    ]);

    return NextResponse.json({ ok: true });
  } catch (e: unknown) {
    const err = e as { response?: { body?: unknown }; message?: string };
    console.error("[booking] error:", err.response?.body ?? err.message ?? e);
    return NextResponse.json(
      { error: "Erreur lors de l'envoi du courriel." },
      { status: 500 },
    );
  }
}

/* ---------- Branded HTML email shell ---------- */

function brandedEmail({
  preheader,
  title,
  lead,
  rows,
  message,
  cta,
  signature,
}: {
  preheader: string;
  title: string;
  lead: string;
  rows: [string, string][];
  message?: string;
  cta?: { label: string; href: string };
  signature?: string;
}) {
  const rowsHtml = rows
    .map(
      ([label, value]) => `
      <tr>
        <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.08);font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;font-size:12px;color:rgba(255,255,255,0.5);letter-spacing:0.12em;text-transform:uppercase;width:38%;vertical-align:top">${label}</td>
        <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.08);font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;font-size:15px;color:#fff;vertical-align:top">${value}</td>
      </tr>`,
    )
    .join("");

  const messageBlock = message
    ? `
    <p style="margin:32px 0 10px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;font-size:11px;letter-spacing:0.22em;text-transform:uppercase;color:rgba(255,255,255,0.4)">Message du client</p>
    <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:14px;padding:18px 20px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;font-size:15px;line-height:1.6;color:rgba(255,255,255,0.85);white-space:pre-wrap">${message}</div>`
    : "";

  const ctaBlock = cta
    ? `
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:36px 0 0">
      <tr>
        <td style="border-radius:999px;background:#ffffff">
          <a href="${cta.href}" style="display:inline-block;padding:14px 26px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;font-size:14px;font-weight:600;color:#000;text-decoration:none;border-radius:999px">${cta.label} →</a>
        </td>
      </tr>
    </table>`
    : "";

  const signatureBlock = signature
    ? `
    <p style="margin:40px 0 0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;font-size:14px;color:rgba(255,255,255,0.65)">À très bientôt,<br/><strong style="color:#fff">${signature}</strong></p>`
    : "";

  return `<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>${title}</title>
  </head>
  <body style="margin:0;padding:0;background:#000;color:#fff;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif">
    <div style="display:none;max-height:0;overflow:hidden;color:transparent">${preheader}</div>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#000">
      <tr>
        <td align="center" style="padding:40px 16px">
          <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="max-width:600px;width:100%;background:linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.012));border:1px solid rgba(255,255,255,0.1);border-radius:28px;overflow:hidden">
            <tr>
              <td style="padding:36px 36px 0">
                <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;font-size:11px;letter-spacing:0.28em;text-transform:uppercase;color:rgba(255,255,255,0.55)">Lavoie Digital · Studio code &amp; web</div>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 36px 8px">
                <h1 style="margin:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;font-size:32px;line-height:1.05;letter-spacing:-0.02em;color:#fff;font-weight:700">${title}</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:0 36px 8px">
                <p style="margin:14px 0 0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;font-size:16px;line-height:1.55;color:rgba(255,255,255,0.7)">${lead}</p>
              </td>
            </tr>
            <tr>
              <td style="padding:28px 36px 0">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                  ${rowsHtml}
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:0 36px 36px">
                ${messageBlock}
                ${ctaBlock}
                ${signatureBlock}
              </td>
            </tr>
            <tr>
              <td style="padding:18px 36px 26px;border-top:1px solid rgba(255,255,255,0.08)">
                <p style="margin:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:rgba(255,255,255,0.35)">Québec · Est. 2026 · lavoiedigital.ca</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}
