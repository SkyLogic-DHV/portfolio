/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `content` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `tags` on the `Project` table. All the data in the column will be lost.
  - Added the required column `longDesc` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shortDesc` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_email_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "User";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "AdminUser" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "role" TEXT NOT NULL DEFAULT 'ADMIN',
    "deactive" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "OtpToken" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "otp" TEXT NOT NULL,
    "expiresAt" DATETIME NOT NULL,
    "used" BOOLEAN NOT NULL DEFAULT false,
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "HeroSection" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT 'default',
    "title" TEXT NOT NULL DEFAULT 'We Build From Scratch',
    "subtitle" TEXT NOT NULL DEFAULT 'Innovative Software & Systems',
    "description" TEXT NOT NULL DEFAULT 'SkyLogic creates high-performance web applications, mobile platforms, and custom software systems engineered to scale.',
    "ctaButton" TEXT NOT NULL DEFAULT 'Explore Projects',
    "ctaLink" TEXT NOT NULL DEFAULT '#projects',
    "bgImage" TEXT NOT NULL DEFAULT '',
    "bgGradient" TEXT NOT NULL DEFAULT 'from-slate-100 via-indigo-50 to-slate-200',
    "badge" TEXT NOT NULL DEFAULT 'SKYLOGIC // ENTERPRISE SOFTWARE ARCHITECTURE',
    "partnerLogos" TEXT NOT NULL DEFAULT '[]',
    "socialLinks" TEXT NOT NULL DEFAULT '[]',
    "isOpenForProject" BOOLEAN NOT NULL DEFAULT true,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "TeamMember" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "avatar" TEXT NOT NULL DEFAULT '',
    "linkedin" TEXT NOT NULL DEFAULT '',
    "github" TEXT NOT NULL DEFAULT '',
    "instagram" TEXT NOT NULL DEFAULT '',
    "email" TEXT NOT NULL DEFAULT '',
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "TeamSectionInfo" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT 'default',
    "title" TEXT NOT NULL DEFAULT 'Meet Our Engineering Team',
    "description" TEXT NOT NULL DEFAULT 'Architects, full-stack developers, and designers crafting world-class digital products.',
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "TechStack" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "icon" TEXT NOT NULL DEFAULT '',
    "color" TEXT NOT NULL DEFAULT '#6366F1',
    "level" TEXT NOT NULL DEFAULT 'Expert',
    "category" TEXT NOT NULL DEFAULT 'Framework',
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Service" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "icon" TEXT NOT NULL DEFAULT 'Code',
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "cta" TEXT NOT NULL DEFAULT 'Learn More',
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "ContactInfo" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT 'default',
    "email" TEXT NOT NULL DEFAULT 'contact@skylogic.id',
    "whatsapp" TEXT NOT NULL DEFAULT '+6281234567890',
    "instagram" TEXT NOT NULL DEFAULT 'https://instagram.com/skylogic.id',
    "linkedin" TEXT NOT NULL DEFAULT 'https://linkedin.com/company/skylogic',
    "github" TEXT NOT NULL DEFAULT 'https://github.com/skylogic',
    "discord" TEXT NOT NULL DEFAULT 'https://discord.gg/skylogic',
    "telegram" TEXT NOT NULL DEFAULT 'https://t.me/skylogic',
    "address" TEXT NOT NULL DEFAULT 'Jakarta, Indonesia',
    "googleMapsUrl" TEXT NOT NULL DEFAULT 'https://maps.google.com',
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "LeaveYourMark" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "color" TEXT NOT NULL DEFAULT 'yellow',
    "isPinned" BOOLEAN NOT NULL DEFAULT false,
    "isApproved" BOOLEAN NOT NULL DEFAULT true,
    "isHidden" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "VisitorLog" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "ip" TEXT NOT NULL DEFAULT '127.0.0.1',
    "path" TEXT NOT NULL DEFAULT '/',
    "device" TEXT NOT NULL DEFAULT 'Desktop',
    "browser" TEXT NOT NULL DEFAULT 'Chrome',
    "os" TEXT NOT NULL DEFAULT 'Windows',
    "country" TEXT NOT NULL DEFAULT 'Indonesia',
    "city" TEXT NOT NULL DEFAULT 'Jakarta',
    "referral" TEXT NOT NULL DEFAULT 'Direct',
    "sessionDuration" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "MediaFile" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "filename" TEXT NOT NULL,
    "originalName" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "folder" TEXT NOT NULL DEFAULT 'general',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "SiteSetting" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT 'default',
    "siteName" TEXT NOT NULL DEFAULT 'SkyLogic',
    "logo" TEXT NOT NULL DEFAULT '',
    "favicon" TEXT NOT NULL DEFAULT '',
    "footerText" TEXT NOT NULL DEFAULT 'Empowering businesses with software built from scratch.',
    "copyright" TEXT NOT NULL DEFAULT '© 2026 SkyLogic Inc. All rights reserved.',
    "primaryColor" TEXT NOT NULL DEFAULT '#6366F1',
    "secondaryColor" TEXT NOT NULL DEFAULT '#06B6D4',
    "darkModeDefault" BOOLEAN NOT NULL DEFAULT false,
    "metaTitle" TEXT NOT NULL DEFAULT 'SkyLogic - We Build From Scratch',
    "metaDescription" TEXT NOT NULL DEFAULT 'Leading software engineering company building high-performance web applications.',
    "ogImage" TEXT NOT NULL DEFAULT '',
    "robots" TEXT NOT NULL DEFAULT 'index, follow',
    "sitemap" TEXT NOT NULL DEFAULT 'https://skylogic.id/sitemap.xml',
    "updatedAt" DATETIME NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Project" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL DEFAULT '',
    "gallery" TEXT NOT NULL DEFAULT '[]',
    "shortDesc" TEXT NOT NULL,
    "longDesc" TEXT NOT NULL,
    "techStack" TEXT NOT NULL DEFAULT '[]',
    "githubUrl" TEXT NOT NULL DEFAULT '',
    "demoUrl" TEXT NOT NULL DEFAULT '',
    "client" TEXT NOT NULL DEFAULT '',
    "year" TEXT NOT NULL DEFAULT '2026',
    "duration" TEXT NOT NULL DEFAULT '3 Months',
    "category" TEXT NOT NULL DEFAULT 'Website',
    "status" TEXT NOT NULL DEFAULT 'Completed',
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "highlight" TEXT NOT NULL DEFAULT '',
    "projectType" TEXT NOT NULL DEFAULT 'Enterprise',
    "challenge" TEXT NOT NULL DEFAULT '',
    "solution" TEXT NOT NULL DEFAULT '',
    "result" TEXT NOT NULL DEFAULT '',
    "screenshots" TEXT NOT NULL DEFAULT '[]',
    "videoDemo" TEXT NOT NULL DEFAULT '',
    "seoImage" TEXT NOT NULL DEFAULT '',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Project" ("createdAt", "demoUrl", "featured", "githubUrl", "id", "slug", "title", "updatedAt") SELECT "createdAt", coalesce("demoUrl", '') AS "demoUrl", "featured", coalesce("githubUrl", '') AS "githubUrl", "id", "slug", "title", "updatedAt" FROM "Project";
DROP TABLE "Project";
ALTER TABLE "new_Project" RENAME TO "Project";
CREATE UNIQUE INDEX "Project_slug_key" ON "Project"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "AdminUser_username_key" ON "AdminUser"("username");

-- CreateIndex
CREATE UNIQUE INDEX "AdminUser_email_key" ON "AdminUser"("email");
