import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET() {
  try {
    await query("SELECT 1");
    return NextResponse.json({
      status: "ok",
      database: "connected",
      environment: process.env.APP_ENV,
      instanceId: process.env.HOSTNAME,
    });
  } catch {
    return NextResponse.json(
      { status: "error", database: "down" },
      { status: 503 }
    );
  }
}
