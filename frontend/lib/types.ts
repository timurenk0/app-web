export type FoodEntry = {
    id: number,
    brand: string,
    product: string,
    uom: string,
    calories: number,
    carbs: number,
    protein: number,
    fat: number,
    salt: number,
}

export type UserFoodEntry = {
    id: number;
    amount: number,
    uom: "g" | "ml"
    mealType: "breakfast" | "lunch" | "dinner" | "snacks",
    product: string,
    brand: string,
    calories: number,
    carbs: number,
    protein: number,
    fat: number,
    salt: number,
}

export type UserStats = {
    consumedCalories: number,
    totalCalories: number,
    consumedProtein: number,
    totalProtein: number,
    consumedCarbs: number,
    totalCarbs: number,
    consumedFat: number,
    totalFat: number
}