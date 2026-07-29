import prisma from "../src/lib/utils/prisma.js";

async function main() {
  const admins = [
    { email: 'moluscaxyz@gmail.com', username: 'moluscaxyz' },
    { email: 'heratonyputri@gmail.com', username: 'heratonyputri' },
    { email: 'meriaamelia01@gmail.com', username: 'meriaamelia01' },
  ];

  for (const admin of admins) {
    await prisma.adminUser.upsert({
      where: { email: admin.email },
      update: { deactive: false },
      create: {
        email: admin.email,
        username: admin.username,
        deactive: false,
      },
    });
    console.log(`✅ Upserted admin: ${admin.email}`);
  }

  const existingHero = await prisma.heroSection.findUnique({ where: { id: 'default' } });
  if (!existingHero) {
    await prisma.heroSection.create({ data: { id: 'default' } });
    console.log('✅ Created default HeroSection');
  }

  const existingContact = await prisma.contactInfo.findUnique({ where: { id: 'default' } });
  if (!existingContact) {
    await prisma.contactInfo.create({ data: { id: 'default' } });
    console.log('✅ Created default ContactInfo');
  }

  const existingSite = await prisma.siteSetting.findUnique({ where: { id: 'default' } });
  if (!existingSite) {
    await prisma.siteSetting.create({ data: { id: 'default' } });
    console.log('✅ Created default SiteSetting');
  }

  console.log('🎉 Seed selesai!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
