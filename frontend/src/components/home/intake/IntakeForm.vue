<script setup lang="ts">
import { Plus } from "lucide-vue-next";
import { InputNumber, useToast } from "primevue";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import Select from "primevue/select";
import { computed, ref } from "vue";
import { z } from "zod";
import { zodResolver } from "@primevue/forms/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import { Form, type FormSubmitEvent } from "@primevue/forms";
import type { FoodEntry } from "@l/types"

const { type } = defineProps<{
    type: string
}>();
const visible = ref(false);
const selectedFood = ref();
const amount = ref(100);


const { data, isLoading } = useQuery<FoodEntry[]>({
    queryKey: ["foods"],
    queryFn: async () => {
        const res = await fetch("http://localhost:3000/api/foods", {
            method: "GET",
            credentials: "include"
        });
        if (!res.ok) {
            throw new Error("Failed to fetch food entries");
        }
    
        return res.json();
    }
});

const formSchema = z.object({
    foodEntryId: z.number().min(1, { error: "Please select food record" }),
    amount: z.number().min(1, { error: "Please select the amount" }),
});
type UserFoodFormValues = z.infer<typeof formSchema>;

const toast = useToast();
const queryClient = useQueryClient();

const resolver = zodResolver(formSchema);

const mutation = useMutation({
    mutationFn: async (values: UserFoodFormValues) => {
        const data = {
            ...values,
            mealType: type.toLowerCase()
        };

        const res = await fetch("http://localhost:3000/api/user-foods", {
            method: "POST",
            body: JSON.stringify(data),
            credentials: "include"
        });

        if (!res.ok) {
            throw new Error("Failed to post user food entry");
        }

        return res.json();
    },
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["http://localhost:3000/api/user-foods"] });
        visible.value = false;
        toast.add({ severity: "success", summary: "User food entry added successfully", life: 2000 });
    },
    onError: (err) => {
        console.error(err);
        toast.add({ severity: "error", summary: "Failed to add user food entry", detail: err.message, life: 5000 })
    }
});

const onSubmit = async (event: FormSubmitEvent) => {
    const values = event.values as UserFoodFormValues;

    if (!values) {
        console.error("Values were not passed");
        return;
    }

    mutation.mutate(values);
}

const food = computed(() => {
    if (selectedFood) {
        return data.value?.find(d => d.id === selectedFood.value);
    }
});

</script>

<template>
    <Button @click="visible = true" variant="text">
        <Plus />
    </Button>
    <Dialog v-model:visible="visible" modal header="What did you eat today?">
        <Form :resolver="resolver" @submit="onSubmit">
            <div class="flex flex-col gap-4">
                <Select name="foodEntryId" v-model="selectedFood" :options="data" option-value="id" filter placeholder="Select food" :loading="isLoading">
                    <template #option="slotProps">
                        <div class="flex justify-between w-full px-2 py-1 border rounded">
                            <div>
                                <p class="text-xs text-ghost-text">{{ slotProps.option.brand }}</p>
                                <p class="truncate max-w-36">{{ slotProps.option.product }}</p>
                            </div>
                            <div>
                                <p class="text-xs">kcal: {{ slotProps.option.calories }}</p>
                            </div>
                        </div>
                    </template>
                    <template #value>
                        <div v-if="food" class="flex">
                            <span>
                                {{ food.brand }} {{ food.product }}
                            </span>
                        </div>
                    </template>
                </Select>
                
                <!-- Food amount and macros -->
                <div v-if="food" class="w-full">
                    <InputNumber name="amount" v-model="amount" fluid :default-value="100" :suffix="` ${food.uom}`" />
                    <div class="mt-4 w-full max-w-sm border-2 border-black bg-white text-black p-4 font-sans">
                        <!-- Title -->
                        <div class="text-2xl font-bold tracking-tight px-2">
                            Nutrition Facts
                        </div>

                        <div class="border-t-4 border-black my-2"></div>

                        <!-- Serving size -->
                        <div class="flex justify-between text-sm px-2">
                            <span>Serving size</span>
                            <span class="font-semibold">{{ amount }}{{ food.uom }}</span>
                        </div>

                        <div class="border-t border-black my-2"></div>

                        <!-- Calories -->
                        <div class="flex justify-between items-end px-2">
                            <span class="text-lg font-bold">Calories</span>
                            <span class="text-4xl font-bold">
                                {{ Math.round(food.calories * amount / 100) }}
                            </span>
                        </div>

                        <div class="border-t-4 border-black my-2"></div>

                        <!-- Macronutrients -->
                        <div class="space-y-1 text-sm">

                            <div class="flex justify-between border-t border-black pt-1 px-2">
                                <span class="font-semibold">Protein</span>
                                <span>{{ Math.round(food.protein * amount / 100) }} g</span>
                            </div>

                            <div class="flex justify-between border-t border-black pt-1 px-2">
                                <span class="font-semibold">Carbohydrates</span>
                                <span>{{ Math.round(food.carbs * amount / 100) }} g</span>
                            </div>

                            <div class="flex justify-between border-t border-black pt-1 px-2">
                                <span class="font-semibold">Fat</span>
                                <span>{{ Math.round(food.fat * amount / 100) }} g</span>
                            </div>

                            <div class="flex justify-between border-t border-black pt-1 px-2">
                                <span class="font-semibold">Fat</span>
                                <span>{{ Math.round(food.salt * amount / 100) }} g</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex justify-end gap-2">
                    <Button type="button" severity="secondary" @click="visible = false">Cancel</Button>
                    <Button type="submit">Submit</Button>
                </div>
            </div>
        </Form>
    </Dialog>
</template>