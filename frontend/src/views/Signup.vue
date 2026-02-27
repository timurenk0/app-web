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
import { signUpWithEmail } from '@l/auth-client';

const toast = useToast();
const initialValues = ref({
    name: '',
    email: '',
    password: '',
    repeatPassword: ''
});

const formSchema = z.object({
    name: z.string().min(1, { message: "User name is required" }),
    email: z.email().min(1, { message: 'Email is required.' }),
    password: z.string().min(8, { message: 'Password must be at least 8 characters long' }),
    repeatPassword: z.string().min(8, { message: "Passwords don't match" }).check()
}).refine((data) => data.password === data.repeatPassword, {
    message: "Passwords don't match",
    path: ["repeatPassword"]
})

const resolver = ref(zodResolver(formSchema));
type signupFormValues = z.infer<typeof formSchema>;

const registerWithEmail = async (data: signupFormValues) => {
    try {
        await signUpWithEmail(data);
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
                <p class="pb-4 text-2xl font-semibold">Sign Up</p>
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
                    <div class="flex flex-col gap-1">
                        <InputText name="repeatPassword" type="password" placeholder="Repeat Password" />
                        <Message v-if="$form.repeatPassword?.invalid" severity="error" size="small" variant="simple">{{ $form.repeatPassword.error?.message }}</Message>
                    </div>
                    <Button type="submit" severity="contrast" label="Submit" />
                </Form>
                <p class="pt-4 text-center">Already have an account? <a href="/login" class="text-blue-600 underline">Sign in</a></p>
                <!-- <p class="text-center py-4">or</p>
                    <Button fluid severity="secondary" v-on:click="loginWithGoogle">
                        <v-icon name="fc-google"></v-icon>
                        <p>Sign in with Google</p>
                    </Button> -->
            </template>
        </Card>
    </section>
</template>

<style scoped>
    section {
        height: 100vh;
    }
</style>