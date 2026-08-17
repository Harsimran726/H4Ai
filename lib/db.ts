import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { Pool, neonConfig } from "@neondatabase/serverless";
import ws from "ws";

neonConfig.webSocketConstructor = ws;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const createPrismaClient = () => {
  // Use bracket notation and a dynamic check to prevent Next.js from hardcoding 'undefined' at build time
  const dbUrl = process.env["DATABASE_URL"];
  
  if (!dbUrl) {
    console.error("FATAL: DATABASE_URL is missing at runtime in Vercel!");
    // Fallback to throw a clear error instead of the generic pg pool error
    throw new Error("DATABASE_URL environment variable is missing.");
  }

  const pool = new Pool({ connectionString: dbUrl });
  const adapter = new PrismaNeon(pool as any);

  return new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });
};

export const prisma =
  globalForPrisma.prisma ??
  createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
