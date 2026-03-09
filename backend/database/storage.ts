import { and, asc, desc, eq, gt, sql } from "drizzle-orm";
import { db } from "./db";
import { foodEntry, FoodEntry, InsertUserFoodEntry, InsertWeightEntry, userFoodEntry, UserFoodEntry, weightEntry, WeightEntry } from "./schema";

class Storage {
    constructor() {}

    // ==================== Food Entry Methods ==================== 
    async getFoods(): Promise<FoodEntry[]> {
        try {
            return await db.select().from(foodEntry);
        } catch (error) {
            throw error
        }
    }

    // ================== User Food Entry Methods =================
    async getUserFoodEntries(): Promise<UserFoodEntry[]> {
        try {
            return await db.select().from(userFoodEntry)
        } catch (error) {
            throw error;            
        }
    }

    async getUserFoodEntriesForUser(userId: string): Promise<UserFoodEntry[]> {
        try {
            return await db.select().from(userFoodEntry).where(eq(userFoodEntry.userId, userId));
        } catch (error) {
            throw error;
        }
    }

    async addUserFoodEntry(insertUserFoodEntry: InsertUserFoodEntry): Promise<UserFoodEntry | undefined> {
        try {
            const [ufe] = await db.insert(userFoodEntry).values(insertUserFoodEntry).returning();
        
            return ufe;
        } catch (error) {
            throw error;
        }
    }

    // =================== Weight Entry Methods =================== 
    async getWeightEntries(): Promise<WeightEntry[]> {
        try {
            return await db.select().from(weightEntry);
        } catch (error) {
            throw error;
        }
    }

    async getWeightEntriesForUser(userId: string): Promise<WeightEntry[]> {
        try {
            const weights = await db.select().from(weightEntry).where(and(eq(weightEntry.userId, userId), sql`DATE(${weightEntry.uploadedAt}) >= CURRENT_DATE - INTERVAL '7 days'`));
            
            if (weights.length < 1) {
                const lastWeight = (await db.select().from(weightEntry).where(and(eq(weightEntry.userId, userId), sql`DATE(${weightEntry.uploadedAt}) < CURRENT_DATE - INTERVAL '7 days'`)).orderBy(desc(weightEntry.uploadedAt)))[0];
                if (!lastWeight) return [];

                return [lastWeight];
            }
            return weights;
        } catch (error) {
            throw error;
        }
    }

    async addWeightEntry(insertWeightEntry: InsertWeightEntry): Promise<WeightEntry | undefined> {
        try {
            // check if the weight record for given user already exists for this date and update the record
            const [updated] = await db.update(weightEntry).set(insertWeightEntry).where(and(eq(weightEntry.userId, insertWeightEntry.userId), sql`DATE(${weightEntry.uploadedAt}) = CURRENT_DATE`)).returning();
            if (updated) return updated;

            // otherwise create a new record
            const [we] = await db.insert(weightEntry).values(insertWeightEntry).returning();
            return we;
        } catch (error) {
            throw error;
        }
    }
}


const storage = new Storage();
export default storage;