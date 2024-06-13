DO $$ BEGIN
 CREATE TYPE "public"."currency" AS ENUM('PLN', 'EUR', 'USD');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."language" AS ENUM('PL', 'EN');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "settings" (
	"org_id" text PRIMARY KEY NOT NULL,
	"currency" "currency",
	"language" "language"
);
