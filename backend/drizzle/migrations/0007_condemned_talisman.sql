ALTER TABLE "food_entry" DROP CONSTRAINT "uom";--> statement-breakpoint
ALTER TABLE "food_entry" ADD CONSTRAINT "uom" CHECK (uom IN ('g', 'ml'));