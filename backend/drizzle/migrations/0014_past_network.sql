CREATE TABLE "user_goal_entry" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"goal_weight" double precision NOT NULL,
	"activity_level" text NOT NULL,
	"uploaded_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "activity_level_check" CHECK (activity_level IN ('low', 'moderate', 'high'))
);
--> statement-breakpoint
ALTER TABLE "user_goal_entry" ADD CONSTRAINT "user_goal_entry_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;