<script setup lang="ts">
import Dialog from "primevue/dialog";
import Button from "primevue/button";
import { ref } from "vue";
import { InputNumber } from "primevue";

const visible = ref(false);
</script>

<template>
    <Button @click="visible = true" fluid class="mt-6">
        <p class="w-full text-center">
            + Add weight record
        </p>
    </Button>
    <Dialog v-model:visible="visible" modal header="Add weight record" class="w-full mx-4">
    <InputNumber :max-fraction-digits="2" mode="decimal" fluid placeholder="e.g 80.4kg" suffix=" kg" />
        <div class="flex justify-end gap-2 mt-4">
            <Button type="button" severity="secondary" @click="visible = false">Cancel</Button>
            <Button type="button" @click="visible = false">Submit</Button>
        </div>
    </Dialog>
</template>