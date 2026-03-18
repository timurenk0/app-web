<script setup lang="ts">
import { ArrowLeft, ArrowRight } from 'lucide-vue-next';
import { computed, ref } from 'vue';

const now = new Date();

const getDates = (date: Date) => {
    const dates = Array.from({ length: 7 }).map((_, i) => {
        const d = new Date(date);
        d.setDate(date.getDate() - (6-i));
        return d;
    });

    return dates;
};

const date = ref(new Date());
const dates = computed(() => getDates(date.value));


const selectedDate = ref<string>(now.toISOString().slice(0, 10));
const emit = defineEmits(["date-selected"])
function selectDate(day: string) {
    selectedDate.value = day;
    emit("date-selected", day);
}
</script>

<template>
    <div>
        <section class="flex items-center justify-between w-screen bg-auxiliary px-5 py-2 lg:hidden">
            <div @click="selectDate(n.toISOString().slice(0, 10)) " v-for="n in dates" :key="n.getDate()" :class="['calendar-day', n.getDate()===new Date(selectedDate).getDate() && 'bg-accent/50']">
                {{ n.getDate() }}
            </div>
        </section>
        <section class="hidden lg:grid grid-cols-2 items-center justify-between w-full bg-auxiliary px-5 py-2 rounded-lg">
            <div class="w-full damion text-8xl max-h-0 flex justify-center items-center">
                <p>Calendar</p>
            </div>
            <div class="flex justify-between items-center">
                <ArrowLeft @click="date = new Date(date.setDate(date.getDate()-7))" class="cursor-pointer" />
                <div @click="selectDate(n.toISOString().slice(0, 10)) " v-for="n in dates" :key="n.getDate()" :class="['calendar-day', n.getDate()===new Date(selectedDate).getDate() && 'bg-accent/50']">
                    {{ n.toLocaleDateString("en-EN", { weekday: "short" }) }}
                    <br />
                    {{ n.toLocaleDateString("en-EN", { day: "2-digit" }) }}
                </div>
                <ArrowRight @click="date = new Date(date.setDate(date.getDate()+7))" class="cursor-pointer" />
            </div>
        </section>
    </div>
</template>