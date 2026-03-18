<script setup lang="ts">
import Card from 'primevue/card';
import { Form, type FormSubmitEvent } from '@primevue/forms';
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
type LoginFormValues = z.infer<typeof formSchema>;

const onSubmit = async (event: FormSubmitEvent) => {
    const values = event.values as LoginFormValues;
    if (!values) {
        console.error("Values not passed");
        return;
    }

    try {
        await signInWithEmail(values);
    } catch (error) {
        const msg = error instanceof Error ? error.message : "Unknown error";
        toast.add({ severity: "error", summary: "Failed to login", detail: msg, life: 5000 });
        throw error;
    }
}

</script>

<template>
    <section class="flex items-center lg:justify-center">
        <Card class="w-full mx-6 lg:w-100">
            <template #title>
                <p class="pb-4 text-2xl font-semibold">Login</p>
            </template>
            <template #content>
                <Form v-slot="$form" :resolver="resolver" :initialValues="initialValues" @submit="onSubmit" class="flex justify-center flex-col gap-6">
                    <div class="flex flex-col gap-1">
                        <InputText name="email" type="text" placeholder="Email" />
                        <Message v-if="$form.email?.invalid" severity="error" size="small" variant="simple">{{ $form.email.error?.message }}</Message>
                    </div>
                    <div class="flex flex-col gap-1">
                        <InputText name="password" type="password" placeholder="Password" />
                        <Message v-if="$form.password?.invalid" severity="error" size="small" variant="simple">{{ $form.password.error?.message }}</Message>
                    </div>
                    <Button type="submit" severity="contrast">Login</Button>
                    <p class="text-sm text-center">Don't have an account yet? <a href="/signup" class="text-blue-500 underline">Sign up</a></p>
                </Form>
                <p class="text-center my-4">or</p>
                <Button severity="secondary" fluid @click="signInWithGoogle">
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