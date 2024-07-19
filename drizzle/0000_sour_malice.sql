CREATE TABLE IF NOT EXISTS "user" (
	"id" text PRIMARY KEY NOT NULL,
	"clerk_id" text,
	"name" text,
	"email" text NOT NULL,
	"email_verified" timestamp,
	"profile_image_url" text
);
