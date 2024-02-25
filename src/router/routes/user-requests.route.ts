import type { RouteLocationNormalized } from "vue-router";

import { useUserStore } from "@/store/user.store.ts";

export default [
	{
		path: "/:id/requests",
		name: "userRequests",
		component: () => import("@/views/UserRequestsView.vue"),
	},

	{
		path: "/:id",
		name: "userRequestsID",
		component: () => import("@/views/UserRequestsView.vue"),

		redirect: (to: RouteLocationNormalized) => {
			const { user } = useUserStore();

			const isRightID = Number.isInteger(+(to.params.id as string));

			// If right param id redirect to user requests
			if (isRightID) {
				if (user.id) {
					return { name: "userRequests", params: { id: user.id } };
				} else {
					return { name: "login" };
				}
			} else {
				// Redirect to 404 page
				return { name: "notFound" };
			}
		},
	},
];
