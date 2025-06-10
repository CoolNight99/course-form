<template>
  <div id="app">
    <form @submit.prevent="submitForm" id="form" novalidate>
      <div class="form-row">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="form.email" disabled>
      </div>
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
      <p v-if="success" class="details-saved">Form details have been saved. Thank you.</p>
    </form>
  </div>
</template>
<script lang="ts">
import { collection, addDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

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
    const email = auth.currentUser.email;

    return {
      form: {
        email: auth.currentUser.email,
        course: "",
        startDate: "",
      } as FormData,
      submitted: false,
      success: false,
      today: `${year}-${month}-${day}`,
    };
  },

  created() {
    if (!auth.currentUser) {
      this.$router.push({ name: 'Login' });
    }
  },

  methods: {
    async submitForm(): Promise<void> {
      this.submitted = true;

      if (this.form.course && this.form.startDate) {
        this.success = true;
        await this.saveToFirebase();

        setTimeout(() => {
          this.form.email = "";
          this.form.course = "";
          this.form.startDate = "";
          this.submitted = false;
          this.success = false;
          this.$router.push({ name: 'Login' });
        }, 2000);
      }
    },

    async saveToFirebase(): Promise<void> {
      const currentUser = auth.currentUser;

      try {
        await addDoc(collection(db, "submissions"), {
          email: this.form.email,
          course: this.form.course,
          startDate: this.form.startDate,
          timestamp: new Date(),
          author_uid: currentUser ? currentUser.uid : null
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