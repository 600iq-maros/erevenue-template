import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendLeadWebhook(data: {
  email: string;
  name: string;
  phone: string;
}) {
  const webhookUrl = process.env.WEBHOOK_URL;
  const projectId = process.env.PROJECT_ID;

  if (!webhookUrl || !projectId) return;

  try {
    await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.WEBHOOK_SECRET ?? ""}`,
      },
      body: JSON.stringify({
        projectId,
        lead: {
          email: data.email,
          name: data.name,
          phone: data.phone,
          source: process.env.VERCEL_URL ?? "unknown",
          createdAt: new Date().toISOString(),
        },
      }),
    });
  } catch (err) {
    // Don't block the main flow if webhook fails
    console.error("Webhook error:", err);
  }
}

export async function POST(request: Request) {
  try {
    const { email, name, phone } = await request.json();

    if (!email || !name || !phone) {
      return NextResponse.json(
        { error: "Všetky polia sú povinné." },
        { status: 400 }
      );
    }

    // Send notification to the business
    await resend.emails.send({
      from: "Dotazník <onboarding@resend.dev>",
      to: "info@webzatyzden.sk",
      subject: `Nový lead: ${name}`,
      html: `
        <h2>Nový potenciálny klient</h2>
        <p><strong>Meno:</strong> ${name}</p>
        <p><strong>E-mail:</strong> ${email}</p>
        <p><strong>Telefón:</strong> ${phone}</p>
      `,
    });

    // Send confirmation to the client
    await resend.emails.send({
      from: "WebZaTýždeň <onboarding@resend.dev>",
      to: email,
      subject: "Ďakujeme za Váš záujem!",
      html: `
        <h2>Ďakujeme, ${name}!</h2>
        <p>Vaša žiadosť o stretnutie bola úspešne odoslaná.</p>
        <p>Čoskoro Vás budeme kontaktovať na čísle <strong>${phone}</strong> alebo na tento e-mail.</p>
        <br/>
        <p>S pozdravom,<br/>Tím WebZaTýždeň</p>
      `,
    });

    // Send lead to klienti dashboard via webhook
    await sendLeadWebhook({ email, name, phone });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Resend error:", error);
    return NextResponse.json(
      { error: "Nepodarilo sa odoslať e-mail." },
      { status: 500 }
    );
  }
}
