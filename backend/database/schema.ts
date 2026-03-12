import { relations, sql } from "drizzle-orm";
import { pgTable, text, timestamp, boolean, index, integer, doublePrecision, check, serial, date } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import z from "zod";

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  image: text("image"),
  role: text("role").notNull().default("user"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const foodEntry = pgTable("food_entry", {
  id: serial("id").primaryKey(),
  brand: text("brand"),
  product: text("product").notNull(),
  uom: text("uom").notNull(),
  calories: integer("calories").notNull(),
  carbs: doublePrecision("carbs").notNull(),
  protein: doublePrecision("protein").notNull(),
  fat: doublePrecision("fat").notNull(),
  salt: doublePrecision("salt").notNull()
}, (table) => [check("uom", sql`uom IN ('g', 'ml')`)]);

export const insertFoodEntrySchema = createInsertSchema(foodEntry).omit({
  id: true
});

export const userFoodEntry = pgTable("user_food_entry", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
  foodEntryId: integer("food_entry_id").notNull().references(() => foodEntry.id, { onDelete: "cascade" }),
  amount: integer("amount").notNull().default(100),
  mealType: text("meal_type").notNull(),
  uploadedAt: timestamp("uploaded_at").notNull().defaultNow()
}, (table) => [check("meal_type", sql`meal_type IN ('breakfast', 'lunch', 'dinner', 'snacks')`)]);

export const insertUserFoodEntrySchema = createInsertSchema(userFoodEntry).omit({
  id: true,
  uploadedAt: true
});

export const userGoalEntry = pgTable("user_goal_entry", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
  goalWeight: doublePrecision("goal_weight").notNull(),
  height: doublePrecision("height").notNull(),
  age: integer("age").notNull(),
  activityLevel: text("activity_level").notNull(),
  uploadedAt: timestamp("uploaded_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow()
}, (table) => [check("activity_level_check", sql`activity_level IN ('low', 'moderate', 'high')`)]);

export const insertUserGoalEntrySchema = createInsertSchema(userGoalEntry).omit({
  id: true,
  uploadedAt: true
});

export const weightEntry = pgTable("weight_entry", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
  weight: doublePrecision("weight").notNull(),
  uploadedAt: date("uploaded_at").notNull().defaultNow()
}, (table) => [index("weight_user_idx").on(table.userId)]);

export const insertWeightEntrySchema = createInsertSchema(weightEntry).omit({
  id: true,
  uploadedAt: true
});

export const session = pgTable(
  "session",
  {
    id: text("id").primaryKey(),
    expiresAt: timestamp("expires_at").notNull(),
    token: text("token").notNull().unique(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
  },
  (table) => [index("session_userId_idx").on(table.userId)],
);

export const account = pgTable(
  "account",
  {
    id: text("id").primaryKey(),
    accountId: text("account_id").notNull(),
    providerId: text("provider_id").notNull(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    idToken: text("id_token"),
    accessTokenExpiresAt: timestamp("access_token_expires_at"),
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
    scope: text("scope"),
    password: text("password"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index("account_userId_idx").on(table.userId)],
);

export const verification = pgTable(
  "verification",
  {
    id: text("id").primaryKey(),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: timestamp("expires_at").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index("verification_identifier_idx").on(table.identifier)],
);

export type FoodEntry = typeof foodEntry.$inferSelect;
export type InsertFoodEntry = z.infer<typeof insertFoodEntrySchema>;

export type UserFoodEntry = typeof userFoodEntry.$inferSelect;
export type InsertUserFoodEntry = z.infer<typeof insertUserFoodEntrySchema>;

export type UserGoalEntry = typeof userGoalEntry.$inferSelect;
export type InsertUserGoalEntry = z.infer<typeof insertUserGoalEntrySchema>;

export type WeightEntry = typeof weightEntry.$inferSelect;
export type InsertWeightEntry = z.infer<typeof insertWeightEntrySchema>;

export const userRelations = relations(user, ({ many }) => ({
  sessions: many(session),
  accounts: many(account),
}));

export const userFoodEntryRelations = relations(userFoodEntry, ({ one }) => ({
  user: one(user, {
    fields: [userFoodEntry.userId],
    references: [user.id]
  }),
  foodEntry: one(foodEntry, {
    fields: [userFoodEntry.foodEntryId],
    references: [foodEntry.id]
  })
}));

export const userGoalEntryRelations = relations(userGoalEntry, ({ one }) => ({
  user: one(user, {
    fields: [userGoalEntry.userId],
    references: [user.id]
  })
}));

export const weightEntryRelations = relations(weightEntry, ({ one }) => ({
  user: one(user, {
    fields: [weightEntry.userId],
    references: [user.id]
  })
}))

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, {
    fields: [session.userId],
    references: [user.id],
  }),
}));

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, {
    fields: [account.userId],
    references: [user.id],
  }),
}));
