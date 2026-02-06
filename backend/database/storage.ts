import {
    products, type Product, type InsertProduct,
    users, type User, type InsertUser,
    userProfiles, type UserProfile, type InsertUserProfile,
    userFoodEntries, type UserFoodEntry, type InsertUserFoodEntry,
} from "./schema"
import { db } from "./db"
import { eq } from "drizzle-orm";



// CLASS WITH DATABASE DATA MANIPULATION METHODS
export class DatabaseStorage {
    /* ==================== Product Methods ==================== */
    async getProducts(): Promise<Product[]> {
        return await db.select().from(products);
    }

    async getProduct(id: number): Promise<Product | undefined> {
        const [product] = await db.select().from(products).where(eq(products.id, id));
        return product;
    }

    async addProduct(productData: InsertProduct): Promise<Product> {
        const [product] = await db.insert(products).values(productData).returning();
        return product;
    }
    
    /* ==================== Users Methods ==================== */
    async getUsers(): Promise<Omit<User, "password">[]> {
        return await db.select({
            id: users.id,
            username: users.username,
            email: users.email,
            createdAt: users.createdAt,
        }).from(users);
    }

    async getUserByID(id: number): Promise<Omit<User, "password"> | undefined> {
        const [user] = await db.select({
            id: users.id,
            username: users.username,
            email: users.email,
            createdAt: users.createdAt,
        }).from(users).where(eq(users.id, id));

        return user;
    }

    async getUserByUsername(username: string): Promise<Omit<User, "password"> | undefined> {
        const [user] = await db.select({
            id: users.id,
            username: users.username,
            email: users.email,
            createdAt: users.createdAt,
        }).from(users).where(eq(users.username, username));

        return user;
    }

    /* ==================== User Profiles Methods ==================== */
    async getUserProfiles(): Promise<UserProfile[]> {
        return await db.select().from(userProfiles);
    }

    async getUserProfile(userId: number): Promise<UserProfile | undefined> {
        const [userProfile] = await db.select().from(userProfiles).where(eq(userProfiles.userId, userId));
        return userProfile;
    }

    /* ==================== User Food Entries Methods ==================== */
    async getUserFoodEntries(): Promise<UserFoodEntry[]> {
        return await db.select().from(userFoodEntries);
    }

    async getUserFoodEntry(id: number): Promise<UserFoodEntry | undefined> {
        const [userFoodEntry] = await db.select().from(userFoodEntries).where(eq(userFoodEntries.id, id));
        return userFoodEntry;
    }
}


export const storage = new DatabaseStorage();