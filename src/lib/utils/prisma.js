import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionUrl = String(process.env.DATABASE_URL);
const adapter = new PrismaPg({ connectionString: connectionUrl });
const prisma = new PrismaClient({ adapter });
export default prisma;
