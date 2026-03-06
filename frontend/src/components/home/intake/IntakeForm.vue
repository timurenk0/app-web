<script setup lang="ts">
import { Plus } from "lucide-vue-next";
import { InputText } from "primevue";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import { ref } from "vue";

const visible = ref(false);
</script>

<template>
    <Button @click="visible = true" variant="text">
        <Plus />
    </Button>
    <Dialog v-model:visible="visible" modal header="What did you eat today?">
        <div class="flex items-center gap-4 mb-4">
            <label for="name">Food name</label>
            <InputText id="name" class="flex-auto" autocomplete="off" />
        </div>
        <div class="flex items-center gap-4 mb-4">
            <label for="calories">Calories</label>
            <InputText id="calories" class="flex-auto" autocomplete="off" />
        </div>
        <div class="flex justify-end gap-2">
            <Button type="button" label="Cancel" severity="secondary" @click="visible = false"></Button>
            <Button type="button" label="Save" @click="visible = false"></Button>
        </div>
    </Dialog>
</template>