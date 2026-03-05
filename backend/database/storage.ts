import { db } from "./db";
import { foodEntry, FoodEntry } from "./schema";

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
}


const storage = new Storage();
export default storage;