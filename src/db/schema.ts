import {
	sqliteTable as table,
	text,
	int,
	integer,
	index,
	uniqueIndex,
	real,
} from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

// Timestamp tracking columns
const timestamp = {
	createdAt: integer({ mode: 'timestamp' })
		.$default(() => sql`(strftime('%s','now'))`)
		.notNull(),
	updatedAt: integer({ mode: 'timestamp' }).$onUpdate(() => sql`(strftime('%s', 'now')`)
};

// User & Authentication
export const user = table(
	'user',
	{
		id: int().primaryKey({ autoIncrement: true }),
		email: text({ length: 255 }).notNull().$type<`${string}@${string}.${string}`>(),
		fullName: text().notNull(),
		bio: text(),
		passwordHash: text(),
		avatarUrl: text(),
		...timestamp
	},
	(table) => [uniqueIndex('user_email_idx').on(table.email)]
);

// Clubs & Network
export const club = table(
	'club',
	{
		id: int().primaryKey({ autoIncrement: true }),
		name: text({ length: 255 }).notNull(),
		slug: text({ length: 100 }).notNull().unique(),
		description: text({ length: 1000 }).notNull(),
		logoUrl: text({ length: 255 }),
		memberCount: int().default(0),
		schoolId: int().references(() => school.id, { onDelete: 'set null' }),
		establishedAt: integer({ mode: 'timestamp' }).notNull(),
		...timestamp
	},
	(table) => [uniqueIndex('club_slug_idx').on(table.slug)]
);

// Schools & Faculties
export const school = table(
	'school',
	{
		id: int().primaryKey({ autoIncrement: true }),
		name: text({ length: 255 }).notNull(),
		slug: text({ length: 100 }).notNull().unique(),
		...timestamp
	},
	(table) => [index('school_name_idx').on(table.name)]
);

export const userInClub = table(
	'user_in_club',
	{
		id: int().primaryKey({ autoIncrement: true }),
		userId: int()
			.notNull()
			.references(() => user.id, { onDelete: 'cascade' }),
		clubId: int()
			.notNull()
			.references(() => club.id, { onDelete: 'cascade' }),
		role: text({ length: 20 }).$type<'member' | 'president' | 'advisor'>().default('member'),
		joinedAt: integer({ mode: 'timestamp' }).notNull(),
		...timestamp
	},
	(table) => [
		uniqueIndex('user_in_club_unique_idx').on(table.userId, table.clubId),
		index('user_in_club_user_idx').on(table.userId),
		index('user_in_club_club_idx').on(table.clubId)
	]
);

// Events
export const event = table('event', {
	id: int().primaryKey({ autoIncrement: true }),
	title: text({ length: 255 }).notNull(),
	summary: text({ length: 500 }).notNull(),
	description: text({ length: 5000 }).notNull(),
	location: text({ length: 255 }).notNull(),
	startDate: integer({ mode: 'timestamp' }).notNull(),
	endDate: integer({ mode: 'timestamp' }).notNull(),
	type: text({ length: 20 })
		.$type<'workshop' | 'competition' | 'cultural' | 'research' | 'symposium'>()
		.notNull(),
	imageUrl: text({ length: 255 }),
	capacity: integer().default(0),
	organizerId: int()
		.notNull()
		.references(() => club.id, { onDelete: 'cascade' }),
	...timestamp
});

// Sponsors
export const sponsor = table(
	'sponsor',
	{
		id: int().primaryKey({ autoIncrement: true }),
		name: text({ length: 255 }).notNull(),
		logoUrl: text({ length: 255 }).notNull(),
		websiteUrl: text({ length: 255 }).notNull(),
		...timestamp
	},
	(table) => [index('sponsor_name_idx').on(table.name)]
);

export const eventSponsor = table(
	'event_sponsor',
	{
		id: int().primaryKey({ autoIncrement: true }),
		eventId: int()
			.notNull()
			.references(() => event.id, { onDelete: 'cascade' }),
		sponsorId: int()
			.notNull()
			.references(() => sponsor.id, { onDelete: 'cascade' }),
		...timestamp
	},
	(table) => [
		uniqueIndex('event_sponsor_unique_idx').on(table.eventId, table.sponsorId),
		index('event_sponsor_event_idx').on(table.eventId),
		index('event_sponsor_sponsor_idx').on(table.sponsorId)
	]
);

// Student Research
export const research = table(
	'research',
	{
		id: int().primaryKey({ autoIncrement: true }),
		name: text({ length: 255 }).notNull(),
		abstract: text({ length: 2000 }).notNull(),
		link: text({ length: 500 }),
		status: text({ length: 20 })
			.$type<'active' | 'completed' | 'published'>()
			.notNull()
			.default('active'),
		publishedTime: integer({ mode: 'timestamp' }),
		...timestamp
	},
	(table) => [
		index('research_status_idx').on(table.status),
		index('research_published_idx').on(table.publishedTime)
	]
);

export const userInResearch = table(
	'user_in_research',
	{
		id: int().primaryKey({ autoIncrement: true }),
		researchId: int()
			.notNull()
			.references(() => research.id, { onDelete: 'cascade' }),
		userId: int()
			.notNull()
			.references(() => user.id, { onDelete: 'cascade' }),
		role: text({ length: 20 }).$type<'main_author' | 'co_author' | 'advisor'>().notNull(),
		...timestamp
	},
	(table) => [
		uniqueIndex('research_coauthor_unique_idx').on(table.researchId, table.userId),
		index('user_in_research_user_idx').on(table.userId),
		index('user_in_research_research_idx').on(table.researchId)
	]
);

// News/Blog Content
export const post = table(
	'post',
	{
		id: int().primaryKey({ autoIncrement: true }),
		title: text({ length: 255 }).notNull(),
		summary: text({ length: 500 }),
		content: text({ length: 10000 }).notNull(),
		category: text({ length: 20 })
			.$type<'news' | 'announcement' | 'research' | 'achievement'>()
			.notNull(),
		featuredImageUrl: text({ length: 255 }),
		authorId: int()
			.notNull()
			.references(() => user.id, { onDelete: 'cascade' }),
		...timestamp
	},
	(table) => [
		index('post_created_idx').on(table.createdAt),
		index('post_author_idx').on(table.authorId),
		index('post_category_idx').on(table.category)
	]
);

// Resources & Facilities
export const resource = table(
	'resource',
	{
		id: int().primaryKey({ autoIncrement: true }),
		title: text({ length: 255 }).notNull(),
		description: text({ length: 1000 }).notNull(),
		type: text({ length: 20 }).$type<'document' | 'presentation' | 'video' | 'link'>().notNull(),
		url: text({ length: 500 }).notNull(),
		category: text({ length: 20 })
			.$type<'tools' | 'training' | 'documentation' | 'paper'>()
			.notNull(),
		uploaderId: int()
			.notNull()
			.references(() => user.id, { onDelete: 'cascade' }),
		...timestamp
	},
	(table) => [
		index('resource_uploader_idx').on(table.uploaderId),
		index('resource_type_idx').on(table.type),
		index('resource_category_idx').on(table.category)
	]
);

export const facility = table(
	'facility',
	{
		id: int().primaryKey({ autoIncrement: true }),
		name: text({ length: 255 }).notNull(),
		description: text({ length: 1000 }).notNull(),
		location: text({ length: 255 }).notNull(),
		status: text({ length: 20 })
			.$type<'available' | 'maintenance' | 'unavailable'>()
			.notNull()
			.default('available'),
		imageUrl: text({ length: 255 }),
		...timestamp
	},
	(table) => [index('facility_status_idx').on(table.status)]
);

// Partners
export const partner = table(
	'partner',
	{
		id: int().primaryKey({ autoIncrement: true }),
		name: text({ length: 255 }).notNull(),
		type: text({ length: 20 })
			.$type<'university' | 'company' | 'institute' | 'club' | 'other'>()
			.notNull(),
		description: text({ length: 1000 }).notNull(),
		website: text({ length: 255 }),
		logoUrl: text({ length: 255 }),
		city: text({ length: 100 }).notNull(),
		country: text({ length: 100 }).notNull(),
		latitude: real('latitude').notNull(),
		longitude: real('longitude').notNull(),
		...timestamp
	},
	(table) => [
		index('partner_location_idx').on(table.latitude, table.longitude),
		index('partner_type_idx').on(table.type),
		index('partner_country_idx').on(table.country),
		index('partner_city_idx').on(table.city)
	]
);

// Type Exports
export type User = typeof user.$inferSelect;
export type School = typeof school.$inferSelect;
export type Club = typeof club.$inferSelect;
export type UserInClub = typeof userInClub.$inferSelect;
export type UserInResearch = typeof userInResearch.$inferSelect;
export type Partner = typeof partner.$inferSelect;
export type Sponsor = typeof sponsor.$inferSelect;
export type Event = typeof event.$inferSelect;
export type EventSponsor = typeof eventSponsor.$inferSelect;
export type Research = typeof research.$inferSelect;
export type Post = typeof post.$inferSelect;
export type Resource = typeof resource.$inferSelect;
export type Facility = typeof facility.$inferSelect;
