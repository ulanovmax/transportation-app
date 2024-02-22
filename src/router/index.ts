import { createRouter, createWebHistory } from "vue-router";

import baseRoute from "@/router/routes/base.route.ts";
import loginRoute from "@/router/routes/login.route.ts";
import { useUserStore } from "@/store/user.store.ts";

const routes = [baseRoute, loginRoute];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

router.beforeEach((to, from, next) => {
	const { user } = useUserStore();

	if (!user.id) {
		if (to.name === "login") {
			next();
		} else {
			next({ name: "login" });
		}
	} else {
		if (to.params.id && to.params.id !== user.id.toString()) {
			next({ name: from.name });
		} else {
			next();
		}
	}
});

export default router;
