CREATE TABLE `club` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text(255) NOT NULL,
	`slug` text(100) NOT NULL,
	`description` text(1000) NOT NULL,
	`logoUrl` text(255),
	`memberCount` integer DEFAULT 0,
	`schoolId` integer,
	`establishedAt` integer NOT NULL,
	`createdAt` integer NOT NULL,
	`updatedAt` integer,
	FOREIGN KEY (`schoolId`) REFERENCES `school`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE UNIQUE INDEX `club_slug_unique` ON `club` (`slug`);--> statement-breakpoint
CREATE UNIQUE INDEX `club_slug_idx` ON `club` (`slug`);--> statement-breakpoint
CREATE TABLE `event` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text(255) NOT NULL,
	`summary` text(500) NOT NULL,
	`description` text(5000) NOT NULL,
	`location` text(255) NOT NULL,
	`startDate` integer NOT NULL,
	`endDate` integer NOT NULL,
	`type` text(20) NOT NULL,
	`imageUrl` text(255),
	`capacity` integer DEFAULT 0,
	`organizerId` integer NOT NULL,
	`createdAt` integer NOT NULL,
	`updatedAt` integer,
	FOREIGN KEY (`organizerId`) REFERENCES `club`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `event_sponsor` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`eventId` integer NOT NULL,
	`sponsorId` integer NOT NULL,
	`createdAt` integer NOT NULL,
	`updatedAt` integer,
	FOREIGN KEY (`eventId`) REFERENCES `event`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`sponsorId`) REFERENCES `sponsor`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `event_sponsor_unique_idx` ON `event_sponsor` (`eventId`,`sponsorId`);--> statement-breakpoint
CREATE INDEX `event_sponsor_event_idx` ON `event_sponsor` (`eventId`);--> statement-breakpoint
CREATE INDEX `event_sponsor_sponsor_idx` ON `event_sponsor` (`sponsorId`);--> statement-breakpoint
CREATE TABLE `facility` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text(255) NOT NULL,
	`description` text(1000) NOT NULL,
	`location` text(255) NOT NULL,
	`status` text(20) DEFAULT 'available' NOT NULL,
	`imageUrl` text(255),
	`createdAt` integer NOT NULL,
	`updatedAt` integer
);
--> statement-breakpoint
CREATE INDEX `facility_status_idx` ON `facility` (`status`);--> statement-breakpoint
CREATE TABLE `partner` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text(255) NOT NULL,
	`type` text(20) NOT NULL,
	`description` text(1000) NOT NULL,
	`website` text(255),
	`logoUrl` text(255),
	`city` text(100) NOT NULL,
	`country` text(100) NOT NULL,
	`latitude` real NOT NULL,
	`longitude` real NOT NULL,
	`createdAt` integer NOT NULL,
	`updatedAt` integer
);
--> statement-breakpoint
CREATE INDEX `partner_location_idx` ON `partner` (`latitude`,`longitude`);--> statement-breakpoint
CREATE INDEX `partner_type_idx` ON `partner` (`type`);--> statement-breakpoint
CREATE INDEX `partner_country_idx` ON `partner` (`country`);--> statement-breakpoint
CREATE INDEX `partner_city_idx` ON `partner` (`city`);--> statement-breakpoint
CREATE TABLE `post` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text(255) NOT NULL,
	`summary` text(500),
	`content` text(10000) NOT NULL,
	`category` text(20) NOT NULL,
	`featuredImageUrl` text(255),
	`authorId` integer NOT NULL,
	`createdAt` integer NOT NULL,
	`updatedAt` integer,
	FOREIGN KEY (`authorId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `post_created_idx` ON `post` (`createdAt`);--> statement-breakpoint
CREATE INDEX `post_author_idx` ON `post` (`authorId`);--> statement-breakpoint
CREATE INDEX `post_category_idx` ON `post` (`category`);--> statement-breakpoint
CREATE TABLE `research` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text(255) NOT NULL,
	`abstract` text(2000) NOT NULL,
	`link` text(500),
	`status` text(20) DEFAULT 'active' NOT NULL,
	`publishedTime` integer,
	`createdAt` integer NOT NULL,
	`updatedAt` integer
);
--> statement-breakpoint
CREATE INDEX `research_status_idx` ON `research` (`status`);--> statement-breakpoint
CREATE INDEX `research_published_idx` ON `research` (`publishedTime`);--> statement-breakpoint
CREATE TABLE `resource` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text(255) NOT NULL,
	`description` text(1000) NOT NULL,
	`type` text(20) NOT NULL,
	`url` text(500) NOT NULL,
	`category` text(20) NOT NULL,
	`uploaderId` integer NOT NULL,
	`createdAt` integer NOT NULL,
	`updatedAt` integer,
	FOREIGN KEY (`uploaderId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `resource_uploader_idx` ON `resource` (`uploaderId`);--> statement-breakpoint
CREATE INDEX `resource_type_idx` ON `resource` (`type`);--> statement-breakpoint
CREATE INDEX `resource_category_idx` ON `resource` (`category`);--> statement-breakpoint
CREATE TABLE `school` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text(255) NOT NULL,
	`slug` text(100) NOT NULL,
	`createdAt` integer NOT NULL,
	`updatedAt` integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX `school_slug_unique` ON `school` (`slug`);--> statement-breakpoint
CREATE INDEX `school_name_idx` ON `school` (`name`);--> statement-breakpoint
CREATE TABLE `sponsor` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text(255) NOT NULL,
	`logoUrl` text(255) NOT NULL,
	`websiteUrl` text(255) NOT NULL,
	`createdAt` integer NOT NULL,
	`updatedAt` integer
);
--> statement-breakpoint
CREATE INDEX `sponsor_name_idx` ON `sponsor` (`name`);--> statement-breakpoint
CREATE TABLE `user` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`email` text(255) NOT NULL,
	`fullName` text NOT NULL,
	`bio` text,
	`passwordHash` text,
	`avatarUrl` text,
	`createdAt` integer NOT NULL,
	`updatedAt` integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX `user_email_idx` ON `user` (`email`);--> statement-breakpoint
CREATE TABLE `user_in_club` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`userId` integer NOT NULL,
	`clubId` integer NOT NULL,
	`role` text(20) DEFAULT 'member',
	`joinedAt` integer NOT NULL,
	`createdAt` integer NOT NULL,
	`updatedAt` integer,
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`clubId`) REFERENCES `club`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `user_in_club_unique_idx` ON `user_in_club` (`userId`,`clubId`);--> statement-breakpoint
CREATE INDEX `user_in_club_user_idx` ON `user_in_club` (`userId`);--> statement-breakpoint
CREATE INDEX `user_in_club_club_idx` ON `user_in_club` (`clubId`);--> statement-breakpoint
CREATE TABLE `user_in_research` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`researchId` integer NOT NULL,
	`userId` integer NOT NULL,
	`role` text(20) NOT NULL,
	`createdAt` integer NOT NULL,
	`updatedAt` integer,
	FOREIGN KEY (`researchId`) REFERENCES `research`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `research_coauthor_unique_idx` ON `user_in_research` (`researchId`,`userId`);--> statement-breakpoint
CREATE INDEX `user_in_research_user_idx` ON `user_in_research` (`userId`);--> statement-breakpoint
CREATE INDEX `user_in_research_research_idx` ON `user_in_research` (`researchId`);