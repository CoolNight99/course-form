<template>
    <div class="login">
        <h1>Welcome!</h1>
        <h2>Please log in</h2>
        <form @submit.prevent="login">
            <div class="form-row">
                <label for="email">Email:</label>
                <input type="email" id="email" v-model="form.email" placeholder="Enter your email">
            </div>
            <small v-if="submitted && !emailValid">Please enter a valid email address.</small>
            <div class="form-row">
                <label for="password">Password:</label>
                <input type="password" id="password" v-model="form.password" placeholder="Enter your password">
            </div>
            <small v-if="submitted && loginError">Please enter the correct password.</small>
            <button type="submit">Login</button>
            <p v-if="success && !loginError" class="details-saved">Login successful. Thank you.</p>
        </form>
    </div>
</template>
<script lang="ts">
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { validateEmail } from '../utils/validateEmail';

interface FormData {
    email: string;
    password: string;
}

export default {
    data() {
        return {
            form: {
                email: "",
                password: "",
            } as FormData,
            submitted: false,
            success: false,
            loginError: false
        };
    },

    computed: {
        emailValid(): boolean {
            return validateEmail(this.form.email);
        },
    },

    methods: {
        async login(): Promise<void> {
            this.submitted = true;

            if (this.emailValid) {
                this.success = true;
                
                try {
                    const userCredential = await signInWithEmailAndPassword(auth, this.form.email, this.form.password);

                    setTimeout(() => {
                        this.form.email = "";
                        this.form.password = "";
                        this.submitted = false;
                        this.success = false;
                        this.$router.push({ name: 'CourseForm' });
                    }, 2000);
                }
                
                catch (error) {
                    console.error("Login error:", error.code, error.message);
                    this.success = false;
                    this.loginError = true;
                }   
            }
        },
    },
}
</script>