import { createApp } from 'vue'
import App from './App.vue'
import CourseForm from './components/CourseForm.vue'
import './assets/styles.css'

const app = createApp(App);
app.component('CourseForm', CourseForm);
app.mount('#app')
