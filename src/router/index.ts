import { createRouter, createWebHistory } from "vue-router";

import baseRoute from "@/router/routes/base.route.ts";
import loginRoute from "@/router/routes/login.route.ts";

const routes = [baseRoute, loginRoute];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
