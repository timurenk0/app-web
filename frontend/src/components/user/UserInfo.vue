<script setup lang="ts">
import Image from 'primevue/image';
import Card from 'primevue/card';
import Button from "primevue/button";
import { ChevronRight } from 'lucide-vue-next';


const { username, email, image } = defineProps<{
    username: string,
    email: string,
    image: string | null | undefined
}>();

const userImage = (image === undefined || image === null) ? "src/pfp/apple.jpg" : image;
</script>

<template>
    <Card class="w-full">
        <template #content>
            <div class="grid grid-cols-4">
                <div class="col-span-1">
                        <div class="w-16 h-16 rounded-full overflow-hidden mx-auto" id="image-shadow">
                            <Image
                                :src="userImage"
                                alt="User profile pic"
                                class="flex w-full h-full object-cover"
                            />
                        </div>
                        <p class="text-xs text-center mt-1 underline">Change photo</p>
                </div>
                <div class="col-span-2 my-auto mx-auto">
                    <h2 class="text-main text-lg font-semibold">{{ username }}</h2>
                    <p class="text-xs text-ghost-text">{{ email }}</p>
                </div>
                <div class="col-span-1 my-auto ml-auto">
                    <Button severity="secondary" class="h-8 w-10">
                        <ChevronRight />
                    </Button>
                </div>
            </div>
        </template>
    </Card>
</template>

<style scoped>
#image-shadow {
    box-shadow: 0 0 4px 1px rgba(0, 0, 0, .75);
}
</style>