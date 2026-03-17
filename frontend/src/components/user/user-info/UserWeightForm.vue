<script setup lang="ts">
import Dialog from "primevue/dialog";
import Button from "primevue/button";
import { ref } from "vue";
import InputNumber from "primevue/inputnumber";
import { Form, type FormSubmitEvent } from "@primevue/forms";
import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { useToast } from "primevue";
import { z } from "zod";
import { zodResolver } from "@primevue/forms/resolvers/zod";


const formSchema = z.object({
    weight: z.number().min(1, { error: "Weight value is required" }).max(999, { error: "Well, c'mon..." })
});
type WeightFormValues = z.infer<typeof formSchema>;

const toast = useToast();
const visible = ref(false);
const queryClient = useQueryClient();

const resolver = zodResolver(formSchema);

const mutation = useMutation({
    mutationFn: async (weight: number) => {
        console.log(weight);
        
        const res = await fetch("http://localhost:3000/api/weights", {
            method: "POST",
            body: JSON.stringify({ weight }),
            credentials: "include"
        });

        if (!res.ok) {
            throw new Error("Failed to post weight record");
        }

        return res.json();
    },
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["weights"], exact: true });
        visible.value = false;
        toast.add({ severity: "success", summary: "Weight record uploaded.", life: 2000 }); 
    },
    onError: (err) => {
        console.error(err);
        toast.add({ severity: "error", summary: "Failed to add weight record", detail: err.message, life: 5000 });
    }
 })

const onSubmit = async (event: FormSubmitEvent) => {
    const { weight } = event.values as WeightFormValues;

    if (!weight) {
        console.error("Weight value is not passed");
        return;
    }

    if (weight < 0) {
        console.error("Weight value cannot be negative");
        return;
    }

    mutation.mutate(weight);
}

</script>

<template>
    <Button @click="visible = true" fluid class="mt-6">
        <p class="w-full text-center">
            + Add weight record
        </p>
    </Button>
    <Dialog v-model:visible="visible" modal header="Add weight record" class="w-full mx-4">
        <Form :resolver="resolver" @submit="onSubmit">
            <InputNumber name="weight" :max-fraction-digits="2" mode="decimal" fluid placeholder="e.g 80.4kg" suffix=" kg" />
            <div class="flex justify-end gap-2 mt-4">
                <Button type="button" severity="secondary" @click="visible = false">Cancel</Button>
                <Button type="submit">Submit</Button>
            </div>
        </Form>
    </Dialog>
</template>