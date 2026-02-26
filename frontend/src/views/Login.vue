<script setup lang="ts">
import Card from 'primevue/card';
import { Form } from '@primevue/forms';
import InputText from 'primevue/inputtext';
import Message from 'primevue/message';
import Button from 'primevue/button';
import { ref } from 'vue';
import { zodResolver } from '@primevue/forms/resolvers/zod';
import { useToast } from "primevue/usetoast";
import { z } from 'zod';

const toast = useToast();
const initialValues = ref({
    username: '',
    email: '',
    password: ''
});

const resolver = ref(zodResolver(
    z.object({
        email: z.email().min(1, { message: 'Email is required.' }),
        password: z.string().min(1, { message: 'Password must be at least 8 characters long' })
    })
));

const onFormSubmit = ({ valid }: { valid: boolean }) => {
    if (valid) {
        toast.add({ severity: 'success', summary: 'Form is submitted.', life: 3000 });
    }
};
</script>

<template>
    <section class="flex items-center">
        <Card class="w-full mx-6">
            <template #title>
                <p class="pb-4 text-2xl font-semibold">Login</p>
            </template>
            <template #content>
                <Form v-slot="$form" :resolver="resolver" :initialValues="initialValues" @submit="onFormSubmit" class="flex justify-center flex-col gap-6">
                    <div class="flex flex-col gap-1">
                        <InputText name="email" type="text" placeholder="Email" />
                        <Message v-if="$form.email?.invalid" severity="error" size="small" variant="simple">{{ $form.email.error?.message }}</Message>
                    </div>
                    <div class="flex flex-col gap-1">
                        <InputText name="password" type="password" placeholder="Password" />
                        <Message v-if="$form.password?.invalid" severity="error" size="small" variant="simple">{{ $form.password.error?.message }}</Message>
                    </div>
                    <Button type="submit" severity="secondary" label="Submit" />
                </Form>
            </template>
        </Card>
    </section>
</template>

<style scoped>
    section {
        height: 100vh;
    }
</style>