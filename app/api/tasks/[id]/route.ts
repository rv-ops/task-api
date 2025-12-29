import { NextResponse } from "next/server";
import { query } from "@/lib/db";

type Context = {
  params: Promise<{ id: string }>;
};

export async function PUT(req: Request, context: Context) {
  try {
    const { id } = await context.params;
    const body = await req.json();

    if (typeof body.completed !== "boolean") {
      return NextResponse.json(
        { error: "completed must be a boolean" },
        { status: 400 }
      );
    }

    const result = await query(
      "UPDATE tasks SET completed=$1 WHERE id=$2 RETURNING *",
      [body.completed, id]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: "Task not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      environment: process.env.APP_ENV,
      instanceId: process.env.HOSTNAME,
      data: result.rows[0],
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to update task" },
      { status: 500 }
    );
  }
}

export async function DELETE(_: Request, context: Context) {
  try {
    const { id } = await context.params;

    const result = await query(
      "DELETE FROM tasks WHERE id=$1 RETURNING id",
      [id]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: "Task not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      environment: process.env.APP_ENV,
      instanceId: process.env.HOSTNAME,
      deleted: true,
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to delete task" },
      { status: 500 }
    );
  }
}
