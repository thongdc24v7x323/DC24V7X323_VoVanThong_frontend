// 🔹 Import Vue
import { createApp } from "vue";
import App from "./App.vue";

// 🔹 Import router
import router from "./router";

// 🔹 Import Bootstrap và Font Awesome
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";




createApp(App).use(router).mount("#app");
