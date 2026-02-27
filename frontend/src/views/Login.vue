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
import { signInWithEmail, signInWithGoogle } from '@l/auth-client';


const toast = useToast();
const initialValues = ref({
    email: '',
    password: ''
});

const formSchema = z.object({
    email: z.email().min(1, { message: 'Email is required.' }),
    password: z.string().min(1, { message: 'Password must be at least 8 characters long' })
})
const resolver = ref(zodResolver(formSchema));
type loginFormValues = z.infer<typeof formSchema>;

const loginWithGoogle = async () => {
    try {
        await signInWithGoogle();
    } catch (error) {
        const msg = error instanceof Error ? error.message : "Unknown error";
        throw new Error(msg);
    }
}

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
                    <Button v-on:click="loginUser" severity="contrast" label="Submit" />
                </Form>
                <p class="text-center my-4">or</p>
                <Button severity="secondary" fluid v-on:click="loginWithGoogle">
                    <v-icon name="fc-google"></v-icon>
                    Login with Google
                </Button>
            </template>
        </Card>
    </section>
</template>

<style scoped>
    section {
        height: 100vh;
    }
</style>