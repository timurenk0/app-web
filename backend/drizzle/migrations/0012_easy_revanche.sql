CREATE TABLE "user_food_entry" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"food_entry_id" integer NOT NULL,
	"amount" integer DEFAULT 100 NOT NULL,
	"meal_type" text NOT NULL,
	"uploaded_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "meal_type" CHECK (meal_type IN ('breakfast', 'lunch', 'dinner', 'snack'))
);
--> statement-breakpoint
ALTER TABLE "weight_entry" DROP CONSTRAINT "weight_entry_user_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "user_food_entry" ADD CONSTRAINT "user_food_entry_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_food_entry" ADD CONSTRAINT "user_food_entry_food_entry_id_food_entry_id_fk" FOREIGN KEY ("food_entry_id") REFERENCES "public"."food_entry"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "weight_entry" ADD CONSTRAINT "weight_entry_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;