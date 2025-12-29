import { Pool } from "pg";
import os from "os";

let pool: Pool | null = null;

function getPool(): Pool {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL not set");
  }

  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false }, // required for RDS
    });
  }

  return pool;
}

export async function GET() {
  const env = process.env.APP_ENV || "unknown";

  try {
    // lightweight DB check
    await getPool().query("SELECT 1");

    return Response.json({
      status: "ok",
      database: "connected",
      environment: env,
      service: `task-api-${env}`,
      instanceId: os.hostname(),
      timestamp: new Date().toISOString(),
    });
  } catch (err: any) {
    return Response.json(
      {
        status: "error",
        database: "down",
        environment: env,
        service: `task-api-${env}`,
        error: err.message,
      },
      { status: 500 }
    );
  }
}
