DO $$ BEGIN
 CREATE TYPE "public"."currency" AS ENUM('THB', 'USD', 'AUD', 'HKD', 'CAD', 'NZD', 'SGD', 'EUR', 'HUF', 'CHF', 'GBP', 'UAH', 'JPY', 'CZK', 'DKK', 'ISK', 'NOK', 'SEK', 'RON', 'BGN', 'TRY', 'ILS', 'CLP', 'PHP', 'MXN', 'ZAR', 'BRL', 'MYR', 'IDR', 'INR', 'KRW', 'CNY', 'XDR', 'AFN', 'MGA', 'PAB', 'ETB', 'VES', 'BOB', 'CRC', 'SVC', 'NIO', 'GMD', 'MKD', 'DZD', 'BHD', 'IQD', 'JOD', 'KWD', 'LYD', 'RSD', 'TND', 'MAD', 'AED', 'STN', 'BSD', 'BBD', 'BZD', 'BND', 'FJD', 'GYD', 'JMD', 'LRD', 'NAD', 'SRD', 'TTD', 'XCD', 'SBD', 'ZWL', 'VND', 'AMD', 'CVE', 'AWG', 'BIF', 'XOF', 'XAF', 'XPF', 'DJF', 'GNF', 'KMF', 'CDF', 'RWF', 'EGP', 'GIP', 'LBP', 'SSP', 'SDG', 'SYP', 'GHS', 'HTG', 'PYG', 'ANG', 'PGK', 'LAK', 'MWK', 'ZMW', 'AOA', 'MMK', 'GEL', 'MDL', 'ALL', 'HNL', 'SLE', 'SZL', 'LSL', 'AZN', 'MZN', 'NGN', 'ERN', 'TWD', 'TMT', 'MRU', 'TOP', 'MOP', 'ARS', 'DOP', 'COP', 'CUP', 'UYU', 'BWP', 'GTQ', 'IRR', 'YER', 'QAR', 'OMR', 'SAR', 'KHR', 'BYN', 'RUB', 'LKR', 'MVR', 'MUR', 'NPR', 'PKR', 'SCR', 'PEN', 'KGS', 'TJS', 'UZS', 'KES', 'SOS', 'TZS', 'UGX', 'BDT', 'WST', 'KZT', 'MNT', 'VUV', 'BAM', 'PLN');
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
DO $$ BEGIN
 CREATE TYPE "public"."category_type" AS ENUM('REVENUE', 'COSTS', 'NEEDS', 'SAVINGS', 'WANTS');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "settings" (
	"settings_table_id" serial PRIMARY KEY NOT NULL,
	"org_id" text NOT NULL,
	"language" "language"
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "used_currencies" (
	"used_currency_id" serial PRIMARY KEY NOT NULL,
	"settings_table_id" serial NOT NULL,
	"currency" "currency" NOT NULL,
	"is_default" boolean NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "budget" (
	"budget_id" text PRIMARY KEY NOT NULL,
	"org_id" text NOT NULL,
	"month" integer NOT NULL,
	"year" integer NOT NULL,
	"created_at" time DEFAULT now(),
	"updated_at" time DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "category" (
	"category_id" text PRIMARY KEY NOT NULL,
	"name" text,
	"category_type" "category_type",
	"org_id" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "default_budget" (
	"default_budget_id" text PRIMARY KEY NOT NULL,
	"template_name" text NOT NULL,
	"org_id" text NOT NULL,
	"is_default" boolean NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "budget_item" (
	"item_id" text PRIMARY KEY NOT NULL,
	"template_id" text NOT NULL,
	"category_id" text NOT NULL,
	"amount" integer NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "used_currencies" ADD CONSTRAINT "used_currencies_settings_table_id_settings_settings_table_id_fk" FOREIGN KEY ("settings_table_id") REFERENCES "public"."settings"("settings_table_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
