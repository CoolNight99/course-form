<template>
    <div class="login">
        <form @submit.prevent="login">
            <div class="login-msg">
                <h1>Welcome!</h1>
                <h2>Please log in</h2>
            </div>
            <div class="">
                <button type="submit" @click="login" :disabled="loading" class="login-btn"><img src="../assets/google icon.png" class="google-logo"><span>Log in with Google</span></img></button>
                <small v-if="loginError">Sign-in failed. Please try again.</small>
            </div>
            <p v-if="success" class="details-saved">Login successful. Thank you.</p>
        </form>
    </div>
</template>
<script lang="ts">
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";

export default {
    data() {
        return {
            success: false,
            loginError: false,
            loading: false
        };
    },

    methods: {
        async login() {
            this.loginError = false;
            this.loading = true;

            try {
                const provider = new GoogleAuthProvider();
                const result = await signInWithPopup(auth, provider);
                
                if (result.user) {
                    this.success = true;
                    setTimeout(() => {
                        this.success = false;
                        this.$router.push({ name: 'CourseForm' });
                    }, 2000);
                }
            } 
            
            catch (error) {
                this.loginError = true;
            }
            
            finally {
                this.loading = false;
            }
        },
    },
};

</script>
<style src="../assets/styles.css"></style>