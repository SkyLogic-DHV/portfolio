-- CreateTable
CREATE TABLE `AdminUser` (
    `id` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `role` VARCHAR(191) NOT NULL DEFAULT 'ADMIN',
    `deactive` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `AdminUser_username_key`(`username`),
    UNIQUE INDEX `AdminUser_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OtpToken` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `otp` VARCHAR(191) NOT NULL,
    `expiresAt` DATETIME(3) NOT NULL,
    `used` BOOLEAN NOT NULL DEFAULT false,
    `attempts` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `HeroSection` (
    `id` VARCHAR(191) NOT NULL DEFAULT 'default',
    `title` VARCHAR(191) NOT NULL DEFAULT 'We Build From Scratch',
    `subtitle` VARCHAR(191) NOT NULL DEFAULT 'Innovative Software & Systems',
    `description` VARCHAR(191) NOT NULL DEFAULT 'SkyLogic creates high-performance web applications, mobile platforms, and custom software systems engineered to scale.',
    `ctaButton` VARCHAR(191) NOT NULL DEFAULT 'Explore Projects',
    `ctaLink` VARCHAR(191) NOT NULL DEFAULT '#projects',
    `bgImage` VARCHAR(191) NOT NULL DEFAULT '',
    `bgGradient` VARCHAR(191) NOT NULL DEFAULT 'from-slate-100 via-indigo-50 to-slate-200',
    `badge` VARCHAR(191) NOT NULL DEFAULT 'SKYLOGIC // ENTERPRISE SOFTWARE ARCHITECTURE',
    `partnerLogos` VARCHAR(191) NOT NULL DEFAULT '[]',
    `socialLinks` VARCHAR(191) NOT NULL DEFAULT '[]',
    `isOpenForProject` BOOLEAN NOT NULL DEFAULT true,
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TeamMember` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `role` VARCHAR(191) NOT NULL,
    `bio` VARCHAR(191) NOT NULL,
    `avatar` VARCHAR(191) NOT NULL DEFAULT '',
    `linkedin` VARCHAR(191) NOT NULL DEFAULT '',
    `github` VARCHAR(191) NOT NULL DEFAULT '',
    `instagram` VARCHAR(191) NOT NULL DEFAULT '',
    `email` VARCHAR(191) NOT NULL DEFAULT '',
    `displayOrder` INTEGER NOT NULL DEFAULT 0,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TeamSectionInfo` (
    `id` VARCHAR(191) NOT NULL DEFAULT 'default',
    `title` VARCHAR(191) NOT NULL DEFAULT 'Meet Our Engineering Team',
    `description` VARCHAR(191) NOT NULL DEFAULT 'Architects, full-stack developers, and designers crafting world-class digital products.',
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Project` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `thumbnail` VARCHAR(191) NOT NULL DEFAULT '',
    `gallery` VARCHAR(191) NOT NULL DEFAULT '[]',
    `shortDesc` VARCHAR(191) NOT NULL,
    `longDesc` VARCHAR(191) NOT NULL,
    `techStack` VARCHAR(191) NOT NULL DEFAULT '[]',
    `githubUrl` VARCHAR(191) NOT NULL DEFAULT '',
    `demoUrl` VARCHAR(191) NOT NULL DEFAULT '',
    `client` VARCHAR(191) NOT NULL DEFAULT '',
    `year` VARCHAR(191) NOT NULL DEFAULT '2026',
    `duration` VARCHAR(191) NOT NULL DEFAULT '3 Months',
    `category` VARCHAR(191) NOT NULL DEFAULT 'Website',
    `status` VARCHAR(191) NOT NULL DEFAULT 'Completed',
    `featured` BOOLEAN NOT NULL DEFAULT false,
    `highlight` VARCHAR(191) NOT NULL DEFAULT '',
    `projectType` VARCHAR(191) NOT NULL DEFAULT 'Enterprise',
    `challenge` VARCHAR(191) NOT NULL DEFAULT '',
    `solution` VARCHAR(191) NOT NULL DEFAULT '',
    `result` VARCHAR(191) NOT NULL DEFAULT '',
    `screenshots` VARCHAR(191) NOT NULL DEFAULT '[]',
    `videoDemo` VARCHAR(191) NOT NULL DEFAULT '',
    `seoImage` VARCHAR(191) NOT NULL DEFAULT '',
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Project_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TechStack` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `icon` VARCHAR(191) NOT NULL DEFAULT '',
    `color` VARCHAR(191) NOT NULL DEFAULT '#6366F1',
    `level` VARCHAR(191) NOT NULL DEFAULT 'Expert',
    `category` VARCHAR(191) NOT NULL DEFAULT 'Framework',
    `displayOrder` INTEGER NOT NULL DEFAULT 0,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `image` VARCHAR(191) NULL DEFAULT '',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Service` (
    `id` VARCHAR(191) NOT NULL,
    `icon` VARCHAR(191) NOT NULL DEFAULT 'Code',
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `cta` VARCHAR(191) NOT NULL DEFAULT 'Learn More',
    `displayOrder` INTEGER NOT NULL DEFAULT 0,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ContactInfo` (
    `id` VARCHAR(191) NOT NULL DEFAULT 'default',
    `email` VARCHAR(191) NOT NULL DEFAULT 'contact@skylogic.id',
    `whatsapp` VARCHAR(191) NOT NULL DEFAULT '+6281234567890',
    `instagram` VARCHAR(191) NOT NULL DEFAULT 'https://instagram.com/skylogic.id',
    `linkedin` VARCHAR(191) NOT NULL DEFAULT 'https://linkedin.com/company/skylogic',
    `github` VARCHAR(191) NOT NULL DEFAULT 'https://github.com/skylogic',
    `discord` VARCHAR(191) NOT NULL DEFAULT 'https://discord.gg/skylogic',
    `telegram` VARCHAR(191) NOT NULL DEFAULT 'https://t.me/skylogic',
    `address` VARCHAR(191) NOT NULL DEFAULT 'Jakarta, Indonesia',
    `googleMapsUrl` VARCHAR(191) NOT NULL DEFAULT 'https://maps.google.com',
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LeaveYourMark` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `message` VARCHAR(191) NOT NULL,
    `color` VARCHAR(191) NOT NULL DEFAULT 'yellow',
    `isPinned` BOOLEAN NOT NULL DEFAULT false,
    `isApproved` BOOLEAN NOT NULL DEFAULT true,
    `isHidden` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `VisitorLog` (
    `id` VARCHAR(191) NOT NULL,
    `ip` VARCHAR(191) NOT NULL DEFAULT '127.0.0.1',
    `path` VARCHAR(191) NOT NULL DEFAULT '/',
    `device` VARCHAR(191) NOT NULL DEFAULT 'Desktop',
    `browser` VARCHAR(191) NOT NULL DEFAULT 'Chrome',
    `os` VARCHAR(191) NOT NULL DEFAULT 'Windows',
    `country` VARCHAR(191) NOT NULL DEFAULT 'Indonesia',
    `city` VARCHAR(191) NOT NULL DEFAULT 'Jakarta',
    `referral` VARCHAR(191) NOT NULL DEFAULT 'Direct',
    `sessionDuration` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MediaFile` (
    `id` VARCHAR(191) NOT NULL,
    `filename` VARCHAR(191) NOT NULL,
    `originalName` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `mimeType` VARCHAR(191) NOT NULL,
    `size` INTEGER NOT NULL,
    `folder` VARCHAR(191) NOT NULL DEFAULT 'general',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SiteSetting` (
    `id` VARCHAR(191) NOT NULL DEFAULT 'default',
    `siteName` VARCHAR(191) NOT NULL DEFAULT 'SkyLogic',
    `logo` VARCHAR(191) NOT NULL DEFAULT '',
    `favicon` VARCHAR(191) NOT NULL DEFAULT '',
    `footerText` VARCHAR(191) NOT NULL DEFAULT 'Empowering businesses with software built from scratch.',
    `copyright` VARCHAR(191) NOT NULL DEFAULT '© 2026 SkyLogic Inc. All rights reserved.',
    `primaryColor` VARCHAR(191) NOT NULL DEFAULT '#6366F1',
    `secondaryColor` VARCHAR(191) NOT NULL DEFAULT '#06B6D4',
    `darkModeDefault` BOOLEAN NOT NULL DEFAULT false,
    `metaTitle` VARCHAR(191) NOT NULL DEFAULT 'SkyLogic - We Build From Scratch',
    `metaDescription` VARCHAR(191) NOT NULL DEFAULT 'Leading software engineering company building high-performance web applications.',
    `ogImage` VARCHAR(191) NOT NULL DEFAULT '',
    `robots` VARCHAR(191) NOT NULL DEFAULT 'index, follow',
    `sitemap` VARCHAR(191) NOT NULL DEFAULT 'https://skylogic.id/sitemap.xml',
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
