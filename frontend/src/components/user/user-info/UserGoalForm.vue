<script setup lang="ts">
import Dialog from "primevue/dialog";
import Button from "primevue/button";
import InputNumber from "primevue/inputnumber";
import Select from "primevue/select";
import { Form, type FormSubmitEvent } from "@primevue/forms";

import { ref } from "vue";
import z from "zod";
import { useToast } from "primevue";
import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { zodResolver } from "@primevue/forms/resolvers/zod";


const formSchema = z.object({
    goalWeight: z.number().min(1, { error: "Goal weight value is required" }),
    activityLevel: z.string().min(1, { error: "Activity level is required" }),
    age: z.number().min(1, { error: "Age value is required" }),
    height: z.number().min(1, { error: "Heigh value is required" })
});
type UserGoalFormValues = z.infer<typeof formSchema>;
    
const activityLevels = ["low", "moderate", "high"];

const toast = useToast();
const visible = ref(false);
const queryClient = useQueryClient();

const resolver = zodResolver(formSchema);

const mutation = useMutation({
    mutationFn: async (values: UserGoalFormValues) => {
        const res = await fetch("http://localhost:3000/api/user-goals", {
            method: "POST",
            body: JSON.stringify(values),
            credentials: "include"
        });

        if (!res.ok) throw new Error("Failed to post user goal entry");
        return res.json();
    },
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["http://localhost:3000/api/user-goals"] });
        visible.value = false;
        toast.add({ severity: "success", summary: "User goal entry added successfully", life: 2000 });
    },
    onError: (err) => {
        console.error(err);
        toast.add({ severity: "error", summary: "Failed to add user goal entry", detail: err.message, life: 5000 });
    }
});

const onSubmit = async (event: FormSubmitEvent) => {
    const values = event.values as UserGoalFormValues;
    
    if (!values) {
        console.error("Values were not passed");
        return;
    }
    mutation.mutate(values);
}
</script>

<template>
    <Button @click="visible = true" fluid class="mt-6" >
        <p class="w-full text-center">
            + Add goal record
        </p>
    </Button>
    <Dialog v-model:visible="visible" modal header="Add end-goal record" class="w-full mx-4">
        <Form :resolver @submit="onSubmit">
            <div class="flex flex-col gap-4">
                <InputNumber :min="1" name="goalWeight" fluid :suffix="` kg`" placeholder="Enter goal weight (kg)" />
                <InputNumber :min="1" :max="100" name="age" fluid placeholder="Enter age" />
                <InputNumber :min="1" :max="250" name="height" fluid :suffix="` cm`" placeholder="Enter height (cm)" />
                <Select name="activityLevel" :options="activityLevels" placeholder="Select activity level"></Select>
                <div class="flex justify-end gap-2 mt-4">
                    <Button type="button" variant="outlined" severity="secondary">Cancel</Button>
                    <Button type="submit">Submit</Button>
                </div>
            </div>
        </Form>
    </Dialog>
</template>