<template>
    <div class="login">
        <form @submit.prevent="login">
                  <div class="form-row">
                    <label for="email">Email:</label>
                    <input type="email" id="email" v-model="form.email" placeholder="Enter your email" required>
                </div>
                <small v-if="submitted && !emailValid">Please enter a valid email address.</small>
        </form>
    </div>
</template>
<script lang="ts">
import { validateEmail } from '../utils/validateEmail';

export default {
    computed: {
        emailValid(): boolean {
            return validateEmail(this.form.email);
        },
    },
}
</script>