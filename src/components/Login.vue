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
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, User } from "firebase/auth";
import { validateEmail } from '../utils/validateEmail';

// configure Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCV2wb4ny9H_EHdpsUeFyYA_VkldCYtncc",
  authDomain: "course-form-c5a4b.firebaseapp.com",
  projectId: "course-form-c5a4b",
  storageBucket: "course-form-c5a4b.firebasestorage.app",
  messagingSenderId: "114852724417",
  appId: "1:114852724417:web:18469198c36f119b979e40",
  measurementId: "G-JFMV72M8TN",
};

// Firebase initialization
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

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