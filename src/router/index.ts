import { createRouter, createWebHistory } from "vue-router";

import baseRoute from "@/router/routes/base.route.ts";
import loginRoute from "@/router/routes/login.route.ts";
import notFoundRoute from "@/router/routes/notFound.route.ts";
import { useUserStore } from "@/store/user.store.ts";

const routes = [baseRoute, loginRoute, notFoundRoute];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

router.beforeEach((to, from, next) => {
	const { user } = useUserStore();

	if (to.meta.requiresAuth && !user.id) {
		next({ name: "login" }); // If user id not found
	} else if (!to.meta.requiresAuth && user.id) {
		next({ name: "main" });
	} else {
		// If param id is not the same as user id
		if (to.params.id && to.params.id !== user.id.toString()) {
			next({ name: to.name as string, params: { id: user.id } });
		} else {
			next();
		}
	}
});

export default router;
