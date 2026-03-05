// Copy to: klienti/app/api/projects/route.ts
// This endpoint creates new projects (called by setup-project.ts script)

import { NextResponse } from "next/server";
import { randomBytes } from "crypto";
import { prisma } from "@/lib/prisma"; // adjust import to your prisma client path

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get("authorization");
    const token = authHeader?.replace("Bearer ", "");

    // Verify admin API key
    if (token !== process.env.ADMIN_API_KEY) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { name, domain, vercelProjectId } = await request.json();

    if (!name) {
      return NextResponse.json(
        { error: "Project name is required" },
        { status: 400 }
      );
    }

    // Generate a random webhook secret for this project
    const webhookSecret = randomBytes(32).toString("hex");

    const project = await prisma.project.create({
      data: {
        name,
        domain: domain ?? null,
        vercelId: vercelProjectId ?? null,
        webhookSecret,
      },
    });

    return NextResponse.json({
      projectId: project.id,
      webhookSecret: project.webhookSecret,
    });
  } catch (error) {
    console.error("Create project error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

// List all projects
export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get("authorization");
    const token = authHeader?.replace("Bearer ", "");

    if (token !== process.env.ADMIN_API_KEY) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const projects = await prisma.project.findMany({
      include: {
        _count: { select: { leads: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ projects });
  } catch (error) {
    console.error("List projects error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
