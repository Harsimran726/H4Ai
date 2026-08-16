import 'dotenv/config';
import { PrismaClient } from '../app/generated/prisma/client';
import bcrypt from 'bcryptjs';

import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const email = 'contact@h4ai.in';
  const password = 'password123'; // Note: You should change this after logging in!
  
  const existingAdmin = await prisma.adminUser.findUnique({ where: { email } });
  
  if (existingAdmin) {
    console.log(`Admin ${email} already exists`);
    return;
  }
  
  const salt = await bcrypt.genSalt(12);
  const password_hash = await bcrypt.hash(password, salt);
  
  await prisma.adminUser.create({
    data: {
      email,
      password_hash,
      email_verified: true, // Seeded user is already verified
    }
  });
  
  await prisma.service.upsert({
    where: { slug: 'discovery-call' },
    update: {},
    create: {
      id: '00000000-0000-0000-0000-000000000000',
      name: 'Discovery Call',
      slug: 'discovery-call',
      description: 'A 30-minute introductory call.',
      duration: 30
    }
  });
  
  console.log(`Created admin account: ${email} / ${password} and Default Service`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    pool.end();
  });
