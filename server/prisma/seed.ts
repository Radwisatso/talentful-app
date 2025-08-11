import { PrismaClient } from '../generated/prisma';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function hashPassword(password: string): Promise<string> {
  const saltRounds = 12;
  return bcrypt.hash(password, saltRounds);
}

async function main() {
  console.log('Start seeding...');

  // Hash passwords
  const hashedEmployeePassword = await hashPassword('password123');
  const hashedAdminPassword = await hashPassword('admin123');

  // Create employee user
  const employee = await prisma.employee.upsert({
    where: { email: 'john.doe@company.com' },
    update: {},
    create: {
      name: 'John Doe',
      email: 'john.doe@company.com',
      password: hashedEmployeePassword,
      position: 'Frontend Developer',
      phoneNumber: '081234567891',
      role: 'EMPLOYEE',
    },
  });

  // Create admin user
  const admin = await prisma.employee.upsert({
    where: { email: 'admin@company.com' },
    update: {},
    create: {
      name: 'Admin HRD',
      email: 'admin@company.com',
      password: hashedAdminPassword,
      position: 'HR Manager',
      phoneNumber: '081234567890',
      role: 'ADMIN',
    },
  });

  console.log('Seeding finished.');
  console.log('Created users:');
  console.log('Employee:', { id: employee.id, email: employee.email, name: employee.name });
  console.log('Admin:', { id: admin.id, email: admin.email, name: admin.name });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
