import { sql } from "drizzle-orm";
import { pgTable, serial, integer, varchar, timestamp, check } from "drizzle-orm/pg-core";


// DATABASE TABLES SCHEMA

export const products = pgTable("products", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }).notNull().unique(),
    calories: integer("calories").notNull(),
    protein: integer("protein").notNull(),
    fat: integer("protein").notNull(),
    carb: integer("protein").notNull(),
});

export const users = pgTable("users", {
    id: serial("id").primaryKey(),
    username: varchar("username", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    password: varchar("password", { length: 255 }).notNull(),
    createdAt: timestamp("created_at").defaultNow(),
});

export const userProfiles = pgTable("user_profiles", {
    userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    currentWeight: integer("current_weight").notNull(),
    goalWeight: integer("goal_weight").notNull(),
    activityLevel: varchar("activity_level", { length: 20 }).notNull(),
}, (table) => [
    check("activity_level_check", sql`activity_level IN ('high', 'medium', 'low')`),
]);

export const userFoodEntries = pgTable("user_food_entries", {
    id: serial("id").primaryKey(),
    userId: integer("user_id").notNull().references(()=>users.id, { onDelete: "cascade" }),
    productId: integer("product_id").notNull().references(()=>products.id, { onDelete: "cascade" }),
    quantity: integer("quantity").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
})
