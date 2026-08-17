import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET() {
  const hasDbUrl = !!process.env.DATABASE_URL;
  const dbUrlLength = process.env.DATABASE_URL?.length || 0;
  
  return NextResponse.json({
    status: "ok",
    environment: process.env.NODE_ENV,
    hasDatabaseUrl: hasDbUrl,
    databaseUrlLength: dbUrlLength,
    keys: Object.keys(process.env).filter(k => k.includes('DB') || k.includes('DATA'))
  });
}
