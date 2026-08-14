import "dotenv/config";
import { prisma } from "./src/lib/db";

async function main() {
  const contact = await prisma.contactInfo.findUnique({ where: { id: "default" } });
  console.log("Current DB Contact:", contact);
}

main().catch(console.error).finally(() => prisma.$disconnect());
