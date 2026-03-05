// Copy to: klienti/app/api/webhook/lead/route.ts
// This endpoint receives leads from deployed client websites

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // adjust import to your prisma client path

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get("authorization");
    const body = await request.json();
    const { projectId, lead } = body;

    if (!projectId || !lead) {
      return NextResponse.json({ error: "Missing data" }, { status: 400 });
    }

    const project = await prisma.project.findUnique({
      where: { id: projectId },
    });

    if (!project) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      );
    }

    // Verify webhook secret
    const token = authHeader?.replace("Bearer ", "");
    if (token !== project.webhookSecret) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const newLead = await prisma.lead.create({
      data: {
        name: lead.name,
        email: lead.email,
        phone: lead.phone,
        source: lead.source ?? null,
        projectId: project.id,
      },
    });

    return NextResponse.json({ success: true, leadId: newLead.id });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
