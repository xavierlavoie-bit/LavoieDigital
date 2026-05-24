import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Basic validation
    if (!data?.email || !data?.name) {
      return NextResponse.json(
        { error: "Nom et courriel requis." },
        { status: 400 },
      );
    }

    // TODO: wire up to email / CRM (Resend, Postmark, Notion, Airtable, etc.)
    // For now, just log to the server console so you can see it during dev.
    console.log("[booking] new request:", data);

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[booking] error:", e);
    return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
  }
}
