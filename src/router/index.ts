import type { RouteLocationRaw } from "vue-router";
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

router.beforeEach((to, from): void | RouteLocationRaw | boolean => {
	const { user } = useUserStore();

	// If user id not found
	if (!user.id) {
		if (to.name === "login") {
			return;
		} else {
			return { name: "login" };
		}

		// If user id exist
	} else if (to.params.id) {
		// If param id is not the same as user id
		if (to.params.id !== user.id.toString()) {
			return {
				name: from.name as string,
				params: { id: from.params.id },
			};
		} else {
			return;
		}

		// If user logged in
	} else if (to.name === "login") {
		return { name: from.name as string };
	}

	return;
});

export default router;
