/**
 * Seed availability slots directly into the database.
 * Run with: npx tsx prisma/seed-slots.ts
 * 
 * Generates 30-min slots, Mon–Fri, 9 AM–5 PM for the next 30 days.
 */

import 'dotenv/config';
import { PrismaClient } from '../app/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const DAYS_AHEAD = 30;
  const START_HOUR = 9;    // 9 AM
  const END_HOUR = 17;     // 5 PM
  const SLOT_DURATION = 30; // minutes

  const now = new Date();
  let created = 0;
  let skipped = 0;

  console.log(`Generating slots for the next ${DAYS_AHEAD} days (Mon–Fri, ${START_HOUR}:00–${END_HOUR}:00)...`);

  for (let d = 0; d < DAYS_AHEAD; d++) {
    const day = new Date(now);
    day.setDate(now.getDate() + d + 1); // start from tomorrow
    day.setHours(0, 0, 0, 0);

    const dayOfWeek = day.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) continue; // skip weekends

    for (let hour = START_HOUR; hour < END_HOUR; hour++) {
      for (let min = 0; min < 60; min += SLOT_DURATION) {
        const start = new Date(day);
        start.setHours(hour, min, 0, 0);
        const end = new Date(start);
        end.setMinutes(end.getMinutes() + SLOT_DURATION);

        const slotDate = new Date(day);
        slotDate.setHours(0, 0, 0, 0);

        try {
          await prisma.availabilitySlot.create({
            data: { slot_date: slotDate, start_time: start, end_time: end },
          });
          created++;
        } catch (e: any) {
          // Skip duplicates (unique constraint violation)
          skipped++;
        }
      }
    }
  }

  console.log(`\n✅ Done!`);
  console.log(`   Created: ${created} new slots`);
  console.log(`   Skipped: ${skipped} (already existed)`);
  console.log(`\nVisitors can now book at: http://localhost:3000/book-a-call`);
}

main()
  .catch((e) => {
    console.error('❌ Fatal error:', e.message || e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    pool.end();
  });
