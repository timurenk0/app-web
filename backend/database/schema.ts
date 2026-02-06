import { relations, sql } from "drizzle-orm";
import { pgTable, serial, integer, varchar, timestamp, check } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import z from "zod";


// DATABASE TABLES SCHEMA

export const products = pgTable("products", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }).notNull().unique(),
    calories: integer("calories").notNull(),
    protein: integer("protein").notNull(),
    fat: integer("fat").notNull(),
    carb: integer("carb").notNull(),
});

export const insertProductSchema = createInsertSchema(products).omit({
    id: true
});


export const users = pgTable("users", {
    id: serial("id").primaryKey(),
    username: varchar("username", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    password: varchar("password", { length: 255 }).notNull(),
    createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).omit({
    id: true,
    createdAt: true
});


export const userProfiles = pgTable("user_profiles", {
    userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    currentWeight: integer("current_weight").notNull(),
    goalWeight: integer("goal_weight").notNull(),
    activityLevel: varchar("activity_level", { length: 20 }).notNull(),
}, (table) => [
    check("activity_level_check", sql`activity_level IN ('high', 'medium', 'low')`),
]);

export const insertUserProfileSchema = createInsertSchema(userProfiles);


export const userFoodEntries = pgTable("user_food_entries", {
    id: serial("id").primaryKey(),
    userId: integer("user_id").notNull().references(()=>users.id, { onDelete: "cascade" }),
    productId: integer("product_id").notNull().references(()=>products.id, { onDelete: "cascade" }),
    quantity: integer("quantity").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserFoodEntrieSchema = createInsertSchema(userFoodEntries).omit({
    id: true,
    createdAt: true
});


// CREATE DATABASE SCHEMA TYPES

export type Product = typeof products.$inferSelect;
export type InsertProduct = z.infer<typeof insertProductSchema>;

export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type UserProfile = typeof userProfiles.$inferSelect;
export type InsertUserProfile = z.infer<typeof insertUserProfileSchema>;

export type UserFoodEntry = typeof userFoodEntries.$inferSelect;
export type InsertUserFoodEntry = z.infer<typeof insertUserFoodEntrieSchema>;


// DEFINE TABLE RELATIONS

export const productRelations = relations(products, ({ many }) => ({
    userFoodEntry: many(products)
}));

export const userRelations = relations(users, ({ one, many }) => ({
    userProfile: one(userProfiles, {
        fields: [users.id],
        references: [userProfiles.userId]
    }),
    userFoodEntry: many(userFoodEntries)
}));

export const userProfileRelations = relations(userProfiles, ({ one }) => ({
    user: one(users, {
        fields: [userProfiles.userId],
        references: [users.id]
    })
}));

export const userFoodEntryRelations = relations(userFoodEntries, ({ one}) => ({
    user: one(users, {
        fields: [userFoodEntries.userId],
        references: [users.id]
    }),
    product: one(products, {
        fields: [userFoodEntries.productId],
        references: [products.id]
    })
}));