import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import Login from './components/Login.vue'
import CourseForm from './components/CourseForm.vue'
import './assets/styles.css'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: "/", component: Login, name: "Login"},
        { path: "/course-form", component: CourseForm, name: "CourseForm"}
    ]
});

const app = createApp(App);
app.component('Login', Login);
app.component('CourseForm', CourseForm);
app.use(router);
app.mount('#app')
