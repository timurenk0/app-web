<script setup lang="ts">
import Image from 'primevue/image';
import Card from 'primevue/card';
import Button from "primevue/button";
import { ChevronRight } from 'lucide-vue-next';
</script>

<template>
    <Card class="w-full">
        <template #content>
            <div class="grid grid-cols-4">
                <div class="col-span-1">
                        <div class="w-16 h-16 rounded-full overflow-hidden mx-auto" id="image-shadow">
                            <Image
                                src="https://primefaces.org/cdn/primevue/images/galleria/galleria10.jpg"
                                alt="User profile pic"
                                class="flex w-full h-full object-cover"
                            />
                        </div>
                        <p class="text-xs text-center mt-1 underline">Change photo</p>
                </div>
                <div class="col-span-2 my-auto mx-auto">
                    <h2 class="text-main text-lg font-semibold">Username</h2>
                    <p class="text-xs text-ghost-text">user.email@xyz.com</p>
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