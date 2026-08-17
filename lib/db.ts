import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { Pool, neonConfig } from "@neondatabase/serverless";
import ws from "ws";

// Provide WebSocket explicitly for Node.js environments
neonConfig.webSocketConstructor = ws;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
  pool: Pool | undefined;
};

const createPrismaClient = () => {
  // Ensure we read the env variable dynamically at runtime, not build time
  const connectionString = process.env["DATABASE_URL"];
  
  if (!connectionString) {
    console.warn("DATABASE_URL is not set at Prisma initialization!");
  }

  const pool = globalForPrisma.pool ?? new Pool({ connectionString });
  
  if (process.env.NODE_ENV !== "production") {
    globalForPrisma.pool = pool;
  }

  const adapter = new PrismaNeon(pool as any);
  
  return new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });
};

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
