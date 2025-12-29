import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET() {
  const result = await query("SELECT * FROM tasks ORDER BY id");
  return NextResponse.json({
    environment: process.env.APP_ENV,
    instanceId: process.env.HOSTNAME,
    data: result.rows,
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.title) {
      return NextResponse.json(
        { error: "Title is required" },
        { status: 400 }
      );
    }

    const result = await query(
      "INSERT INTO tasks(title) VALUES($1) RETURNING *",
      [body.title]
    );

    return NextResponse.json({
      environment: process.env.APP_ENV,
      instanceId: process.env.HOSTNAME,
      data: result.rows[0],
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to create task" },
      { status: 500 }
    );
  }
}
