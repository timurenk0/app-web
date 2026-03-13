<script setup lang="ts">
import Image from 'primevue/image';
import { ArrowDown, ArrowUp } from 'lucide-vue-next';
import { Panel } from 'primevue';
import UserWeight from './UserWeight.vue';
import UserMacrosSplitGraph from './UserMacrosSplitGraph.vue';
import { ref } from 'vue';


const toggled = ref(false);

const toggle = () => {
    toggled.value = !toggled.value;
}

const { username, email, image } = defineProps<{
    username: string,
    email: string,
    image: string | null | undefined
}>();

const userImage = (image === undefined || image === null) ? "src/pfp/apple.jpg" : image;
</script>

<template>
    <Panel toggleable collapsed class="w-full">
        <template #header>
            <div class="grid grid-cols-5 py-2">
                <div class="col-span-2">
                        <div class="w-16 h-16 rounded-full overflow-hidden mx-auto" id="image-shadow">
                            <Image
                                :src="userImage"
                                alt="User profile pic"
                                class="flex w-full h-full object-cover"
                            />
                        </div>
                        <p class="text-xs text-center mt-1 underline">Change photo</p>
                </div>
<<<<<<< HEAD
                <div class="col-span-3 my-auto mx-auto">
                    <h2 class="text-main text-lg font-semibold">{{ username }}</h2>
=======
                <div class="col-span-2 my-auto mx-auto">
                    <h2 class="text-accent text-lg font-semibold">{{ username }}</h2>
>>>>>>> eeb05cbbf90896b5892e4f2b3bf20af0bec70ef9
                    <p class="text-xs text-ghost-text">{{ email }}</p>
                </div>
            </div>
        </template>
        <template #toggleicon>
            <div @click="toggle" v-if="toggled">
                <ArrowUp />
            </div>
            <div @click="toggle" v-else>
                <ArrowDown />
            </div>
        </template>
        <template #default>
            <div class="flex flex-col gap-2 mt-6">
                <UserWeight />
                <UserMacrosSplitGraph />
            </div>
        </template>
    </Panel>
</template>

<style scoped>
#image-shadow {
    box-shadow: 0 0 4px 1px rgba(0, 0, 0, .75);
}
</style>