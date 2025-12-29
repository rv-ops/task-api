import { NextResponse } from "next/server";

/**
 * Health check endpoint
 *
 * Design goals:
 * - MUST never block (ALB friendly)
 * - MUST clearly show which environment served the request
 * - MUST work correctly with ECS + Next.js (runtime env vars)
 *
 * IMPORTANT:
 * Next.js inlines env vars at build time.
 * This endpoint only reads runtime env vars.
 */
export async function GET() {
  return NextResponse.json({
    status: "ok",

    // Do NOT touch the database here (health must not block)
    database: "unknown",

    // Runtime environment (set by ECS task definition)
    environment: process.env.APP_ENV ?? "unknown",

    // Unique per-container identifier (useful for load-balancing proof)
    instanceId: process.env.HOSTNAME ?? "unknown",

    // Helpful for debugging & demo recording
    timestamp: new Date().toISOString(),
  });
}
