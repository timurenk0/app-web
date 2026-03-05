CREATE TABLE "food_entry" (
	"id" text PRIMARY KEY NOT NULL,
	"brand" text,
	"product" text NOT NULL,
	"uom" text NOT NULL,
	"calories" integer NOT NULL,
	"carbs" double precision NOT NULL,
	"protein" double precision NOT NULL,
	"fat" double precision NOT NULL,
	"salt" double precision NOT NULL,
	CONSTRAINT "uom" CHECK (uom IN ('100g', '100ml'))
);
