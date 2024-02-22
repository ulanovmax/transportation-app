import { createApp } from "vue";
// Toast
import Toast from "vue-toastification";

import { createPinia } from "pinia";

// Styles
import "./assets/tailwind.css";
import "./assets/reset.css";
import "vue-toastification/dist/index.css";

import App from "./App.vue";

// Pinia
const pinia = createPinia();
import piniaPluginPersistedState from "pinia-plugin-persistedstate";

pinia.use(piniaPluginPersistedState);

// Router
import router from "@/router";

createApp(App)
	.use(pinia)
	.use(router)
	.use(Toast, { pauseOnHover: false, position: "bottom-right" })
	.mount("#app");
