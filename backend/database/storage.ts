import { eq } from "drizzle-orm";
import { db } from "./db";
import { foodEntry, FoodEntry, weightEntry, WeightEntry } from "./schema";

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
}


const storage = new Storage();
export default storage;