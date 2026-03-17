<script setup lang="ts">
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import InputText from "primevue/inputtext";
import InputNumber from "primevue/inputnumber";
import FloatLabel from "primevue/floatlabel";
import Select from "primevue/select";
import { ref } from "vue";
import { Form, type FormSubmitEvent } from "@primevue/forms";
import { useMutation } from "@tanstack/vue-query";
import { useToast } from "primevue";
import { z } from "zod";
import { zodResolver } from "@primevue/forms/resolvers/zod";
import { Lock } from "lucide-vue-next";


const { userRole } = defineProps<{
    userRole: string
}>();


const formSchema = z.object({
    brand: z.string().min(1, { error: "Brand name is required." }),
    product: z.string().min(1, { error: "Product name is required." }),
    uom: z.string().min(1, { error: "Unit of measure value is required." }),
    calories: z.number().min(1, { error: "Calories value is required" }),
    protein: z.number().min(1, { error: "Protein value is required" }),
    carbs: z.number().min(1, { error: "Carbohydrates value is required" }),
    fat: z.number().min(1, { error: "Fat value is required" }),
    salt: z.number().min(1, { error: "Salt value is required" })
});
type ProductFormValues = z.infer<typeof formSchema>;

const visible = ref(false);
const uoms = ["100g", "100ml"]
const selectedUom = ref("g");
const toast = useToast();

const resolver = zodResolver(formSchema);

const mutation = useMutation({
    mutationFn: async (values: ProductFormValues) => {
        console.log(values);

        const res = await fetch("http://localhost:3000/api/foods", {
            method: "POST",
            body: JSON.stringify(values),
            credentials: "include"
        });

        if (!res.ok) throw new Error("Failed to post product");
        return res.json();
    },
    onSuccess: () => {
        visible.value = false;
        toast.add({ severity: "success", summary: "Product record uploaded successfully.", life: 2000 });
    },
    onError: (err) => {
        console.error(err);
        toast.add({ severity: "error", summary: "Failed to add product record.", detail: err.message, life: 5000 });
    }
});

const onSubmit = async (event: FormSubmitEvent) => {
    const values = event.values as ProductFormValues;

    if (!values) {
        console.error("Values not passed");
        return;
    }

    const data = {
        ...values,
        uom: values.uom.slice(3)
    }

    console.log(data);
    mutation.mutate(data);
}
</script>

<template>
    <Button @click="visible = true" fluid class="mt-6" :severity="userRole === 'admin' ? 'success' : 'secondary'" :disabled="userRole !== 'admin'">
        <p class="w-full text-center">
            + Add new product
        </p>
        <p v-if="userRole !== 'admin'" title="Admin only feature">
            <Lock />
        </p>
    </Button>
    <Dialog v-model:visible="visible" v-if="userRole === 'admin'" modal header="Add new product" class="w-full mx-4">
        <Form :resolver="resolver" @submit="onSubmit">
            <div class="flex flex-col gap-4 my-2">
                <FloatLabel variant="on">
                    <InputText fluid id="brand" name="brand"/>
                    <label for="brand">Brand</label>
                </FloatLabel>
                <FloatLabel variant="on">
                    <InputText fluid id="product" name="product"/>
                    <label for="brand">Product</label>
                </FloatLabel>
                <div class="w-full grid grid-cols-2 gap-4">
                    <FloatLabel variant="on">
                        <Select fluid id="uom" name="uom" v-model="selectedUom" :options="uoms" />
                        <label for="uom">Unit of Measure</label>
                    </FloatLabel>
                    <FloatLabel variant="on">
                        <InputNumber fluid id="calories" name="calories" />
                        <label for="calories">Calories</label>
                    </FloatLabel>
                    <FloatLabel variant="on">
                        <InputNumber fluid id="carbs" name="carbs" />
                        <label for="carbs">Carbohydrates</label>
                    </FloatLabel>
                    <FloatLabel variant="on">
                        <InputNumber fluid id="protein" name="protein" />
                        <label for="protein">Protein</label>
                    </FloatLabel>
                    <FloatLabel variant="on">
                        <InputNumber fluid id="fat" name="fat" />
                        <label for="fat">Fat</label>
                    </FloatLabel>
                    <FloatLabel variant="on">
                        <InputNumber fluid id="salt" name="salt" />
                        <label for="salt">Salt</label>
                    </FloatLabel>
                </div>
            </div>
            <div class="mt-4 flex justify-end gap-2">
                <Button type="button" severity="secondary" variant="outlined">Cancel</Button>
                <Button type="submit">Submit</Button>
            </div>
        </Form>
    </Dialog>
</template>