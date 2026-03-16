<script setup lang="ts">
import { ref } from 'vue';

const now = new Date();

const dates = Array.from ({ length: 7 }).map((_, i) => {
    const d = new Date();
    d.setDate(now.getDate() - (6-i));
    return d;
});


const selectedDate = ref<string>(now.toISOString().slice(0, 10));
const emit = defineEmits(["date-selected"])
function selectDate(day: string) {
    selectedDate.value = day;
    emit("date-selected", day);
}
</script>

<template>
    <section class="flex items-center justify-between w-screen lg:w-full bg-auxiliary px-5 py-2">
        <div @click="selectDate(n.toISOString().slice(0, 10)) " v-for="n in dates" :key="n.getDate()" :class="['calendar-day', n.getDate()===new Date(selectedDate).getDate() && 'bg-accent/50']">
            {{ n.getDate() }}
        </div>
    </section>
</template>