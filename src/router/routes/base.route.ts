import allRequestsRoute from "@/router/routes/all-requests.route.ts";
import createDeliveryRoute from "@/router/routes/create/create-delivery.route.ts";
import createOrderRoute from "@/router/routes/create/create-order.route.ts";
import createRequestRoute from "@/router/routes/create/create-request.route.ts";
import userRequestsRoute from "@/router/routes/user-requests.route.ts";
import { useUserStore } from "@/store/user.store.ts";

export default {
	path: "/",
	name: "main",
	component: () => import("@/views/MainView.vue"),

	redirect: () => {
		const { user } = useUserStore();

		if (user.id) {
			return { name: "userRequests", params: { id: user.id } };
		}

		return { name: "login" };
	},

	children: [
		...userRequestsRoute,
		allRequestsRoute,
		createRequestRoute,
		createOrderRoute,
		createDeliveryRoute,
	],
};
