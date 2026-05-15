import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function check() {
  console.log('Models found in Prisma Client:');
  console.log(Object.keys(prisma).filter(k => !k.startsWith('_') && !k.startsWith('$')));
  
  try {
    const { Role } = await import('@prisma/client');
    console.log('Role Enum Values:', Object.values(Role));
  } catch (e) {
    console.error('Failed to import Role enum:', e);
  }
  
  process.exit(0);
}

check();
