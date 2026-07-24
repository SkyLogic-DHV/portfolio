import { prisma } from "../src/lib/db";
import bcrypt from "bcryptjs";

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL || "admin@portfolio.com";
  const adminPassword = process.env.ADMIN_PASSWORD || "admin123password";

  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  // Upsert Admin User
  const user = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      password: hashedPassword,
      name: "Admin User",
    },
    create: {
      email: adminEmail,
      password: hashedPassword,
      name: "Admin User",
    },
  });

  console.log("Admin user seeded:", user.email);

  // Seed sample projects if empty
  const projectCount = await prisma.project.count();
  if (projectCount === 0) {
    await prisma.project.createMany({
      data: [
        {
          title: "E-Commerce Mobile Platform",
          slug: "e-commerce-mobile-platform",
          description: "A modern full-stack e-commerce mobile web app built with Next.js, Tailwind CSS, and Prisma.",
          content: "Comprehensive case study on building a high-performance e-commerce platform with real-time inventory management, stripe payment integration, and responsive dark mode UI.",
          image: "https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&w=800&q=80",
          demoUrl: "https://example.com/demo-ecommerce",
          githubUrl: "https://github.com/example/ecommerce",
          tags: "Next.js,React,Tailwind CSS,Prisma,TypeScript",
          featured: true,
        },
        {
          title: "AI Analytics Dashboard",
          slug: "ai-analytics-dashboard",
          description: "Real-time interactive analytics dashboard for monitoring machine learning pipelines and metric streams.",
          content: "Built custom data visualization widgets with CSS animations and responsive layouts, tracking model accuracy, latency, and request volumes.",
          image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
          demoUrl: "https://example.com/demo-analytics",
          githubUrl: "https://github.com/example/ai-dashboard",
          tags: "Next.js,TypeScript,ChartJS,Tailwind CSS",
          featured: true,
        },
        {
          title: "Creative Agency Portfolio",
          slug: "creative-agency-portfolio",
          description: "Sleek and interactive digital agency portfolio featuring modern animations and dark glassmorphic design.",
          content: "Designed for a top-tier design studio with micro-interactions, smooth scrolling, and optimized Web Vitals.",
          image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
          demoUrl: "https://example.com/demo-agency",
          githubUrl: "https://github.com/example/agency-portfolio",
          tags: "React,Next.js,CSS Modules,Framer Motion",
          featured: false,
        },
      ],
    });
    console.log("Sample projects seeded successfully!");
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
