<template>
    <div class="login">
        <form @submit.prevent="login">
            <div class="login-msg">
                <h1>Welcome!</h1>
                <h2>Please log in</h2>
            </div>
            <div class="login-form">
                <button type="submit" @click="login" :disabled="loading" class="login-btn"><img src="../assets/google icon.png" class="google-logo"><span>Log in with Google</span></img></button>
                <small v-if="loginError">Sign-in failed. Please try again.</small>
                <small v-if="attemptedLogin && !whitelisted">Your email is not whitelisted. You cannot access the form.</small>
            </div>
            <p v-if="success" class="details-saved">Login successful. Thank you.</p>
        </form>
    </div>
</template>
<script lang="ts">
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "../firebase";

export default {
    data() {
        return {
            success: false,
            loginError: false,
            whitelisted: false,
            loading: false,
            attemptedLogin: false
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
                    this.attemptedLogin = true;
                    this.whitelisted = await this.checkWhitelist(result.user.email);

                    if (this.whitelisted) {
                        this.success = true;

                        setTimeout(() => {
                            this.success = false;
                            this.$router.push({ name: 'CourseForm' });
                        }, 2000);
                    }  
                }
            }

            catch (error) {
                this.loginError = true;
            }

            finally {
                this.loading = false;
            }
        },

        async checkWhitelist(email: string) {
            const q = query(
                collection(db, "course-request-users"), 
                where("email", "==", email)
            );

            const querySnapshot = await getDocs(q);
            
            let whitelisted = false;

            querySnapshot.forEach((doc) => {
                const emailList = doc.data()

                if (emailList.status) {
                    whitelisted = true;
                }
            });

            return whitelisted;
        }
    },
};

</script>
<style src="../assets/styles.css"></style>