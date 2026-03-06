import { Resend } from "resend";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email, name, phone } = await request.json();

    const resend = new Resend(process.env.RESEND_API_KEY);

    if (!email || !name || !phone) {
      return NextResponse.json(
        { error: "Všetky polia sú povinné." },
        { status: 400 }
      );
    }

    // Save lead directly to Supabase (shared DB with klienti)
    const projectId = process.env.PROJECT_ID;
    if (projectId) {
      try {
        const { prisma } = await import("@/lib/prisma");
        await prisma.lead.create({
          data: {
            name,
            email,
            phone,
            sourcePage: process.env.VERCEL_URL ?? "unknown",
            projectId,
          },
        });
      } catch (err) {
        console.error("Failed to save lead to database:", err);
      }
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

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Resend error:", error);
    return NextResponse.json(
      { error: "Nepodarilo sa odoslať e-mail." },
      { status: 500 }
    );
  }
}
