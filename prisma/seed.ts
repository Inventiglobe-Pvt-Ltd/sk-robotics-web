import { PrismaClient, Role } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Seeding data...');

  // 1. Clear existing (in correct order to avoid FK violations)
  await prisma.sessionEntry.deleteMany({});
  await prisma.trainerAttendance.deleteMany({});
  await prisma.visit.deleteMany({});
  await prisma.class.deleteMany({});
  await prisma.school.deleteMany({});
  await prisma.user.deleteMany({});

  const hashedPassword = await bcrypt.hash('admin123', 10);

  // 2. Create Admin
  await prisma.user.create({
    data: {
      name: 'System Admin',
      email: 'admin@skrobotics.com',
      password: hashedPassword,
      role: Role.ADMIN,
    },
  });

  // 3. Create Trainers
  const trainersData = [
    { name: 'Arjun Kumar', email: 'arjun@trainer.com' },
    { name: 'Neha Singh', email: 'neha@trainer.com' },
    { name: 'Sai Kiran', email: 'saikiran@trainer.com' },
  ];

  await Promise.all(
    trainersData.map((t) =>
      prisma.user.create({
        data: {
          name: t.name,
          email: t.email,
          password: hashedPassword,
          role: Role.TRAINER,
        },
      })
    )
  );

  // 4. Create Schools
  const schoolsData = [
    {
      name: 'Global International School',
      address: 'Hyderabad, Telangana',
      principalName: 'Dr. Ramesh Kumar',
      contactEmail: 'principal@globalinter.edu',
      classes: {
        create: [
          { name: '3rd A', studentCount: 40 },
          { name: '3rd B', studentCount: 38 },
          { name: '4th A', studentCount: 45 },
          { name: '5th C', studentCount: 42 },
        ],
      },
    },
    {
      name: 'Vikas Vidhyalaya',
      address: 'Secunderabad, Telangana',
      principalName: 'Mrs. Shanthi Priya',
      contactEmail: 'info@vikasvidya.org',
      classes: {
        create: [
          { name: '6th A', studentCount: 35 },
          { name: '7th B', studentCount: 37 },
        ],
      },
    },
    { name: 'Heritage Valley School', address: 'Banjara Hills', principalName: 'Mr. Venkatesh Rao' },
    { name: 'St. Marys Academy', address: 'Abids', principalName: 'Sister Mary' },
    { name: 'Little Flowers School', address: 'Uppal', principalName: 'Mr. Satish G.' },
  ];

  for (const s of schoolsData) {
    await prisma.school.create({ data: s });
  }

  console.log('Seeding complete.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
