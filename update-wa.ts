import "dotenv/config";
import { prisma } from "./src/lib/db";

async function main() {
  await prisma.contactInfo.update({
    where: { id: "default" },
    data: { whatsapp: "+62 813-1688-1677" },
  });
  console.log("Updated WhatsApp number in DB");
}

main().catch(console.error).finally(() => prisma.$disconnect());
