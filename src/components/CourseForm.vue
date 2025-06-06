<template>
  <div id="app">
    <form @submit.prevent="submitForm" id="form" novalidate>
      <div class="form-row">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="form.email" placeholder="Enter your email">
      </div>
      <small v-if="submitted && !emailValid">Please enter a valid email address.</small>
      <div class="form-row">
        <label for="course">Course:</label>
          <select id="course" v-model="form.course">
            <option value="" disabled>Select a course</option>
            <option value="vuejs">Vue.js</option>
            <option value="reactjs">React.js</option>
            <option value="angular">Angular</option>
          </select>
      </div>
      <small v-if="submitted && !form.course">Please select a course.</small>
      <div class="form-row">
        <label for="startDate">Start Date:</label>
        <input type="date" id="startDate" v-model="form.startDate" :min="today">
      </div>
      <small v-if="submitted && !form.startDate">Please select a start date.</small>
      <button type="submit">Submit</button>
      <p v-if="success" class="details-saved">Your details have been saved. Thank you.</p>
    </form>
  </div>
</template>
<script lang="ts">
import { collection, addDoc } from "firebase/firestore";
import { validateEmail } from "../utils/validateEmail"
import { getAuth } from "firebase/auth";

const auth = getAuth();
const currentUser = auth.currentUser;

interface FormData {
  email: string;
  course: string;
  startDate: string;
}

export default {
  data() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');

    return {
      form: {
        email: "",
        course: "",
        startDate: "",
      } as FormData,
      submitted: false,
      success: false,
      today: `${year}-${month}-${day}`,
    };
  },

  computed: {
    emailValid(): boolean {
        return validateEmail(this.form.email);
    },
  },

  methods: {
    async submitForm(): Promise<void> {
      this.submitted = true;

      if (this.emailValid && this.form.course && this.form.startDate) {
        this.success = true;
        await this.saveToFirebase();

        setTimeout(() => {
          this.form.email = "";
          this.form.course = "";
          this.form.startDate = "";
          this.submitted = false;
          this.success = false;
        }, 2000);
      }
    },

    async saveToFirebase(): Promise<void> {
      if (!currentUser) {
        throw new Error("User not authenticated");
      }

      try {
        await addDoc(collection(db, "submissions"), {
          email: this.form.email,
          course: this.form.course,
          startDate: this.form.startDate,
          timestamp: new Date(),
          author_uid: currentUser.uid
        });
      } 
      
      catch (e) {
        console.error("Error adding document: ", e);
      }
    },
  },
};
</script>
<style src="../assets/styles.css"></style>