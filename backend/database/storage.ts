import { and, eq, sql } from "drizzle-orm";
import { db } from "./db";
import { foodEntry, FoodEntry, InsertWeightEntry, weightEntry, WeightEntry } from "./schema";

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
            return await db.select().from(weightEntry).where(eq(weightEntry.userId, userId));
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