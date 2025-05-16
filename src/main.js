import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "./router.js";
import store from "./store/user.js";

const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')