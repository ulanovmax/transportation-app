import allRequestsRoute from "@/router/routes/all-requests.route.ts";
import userRequestsRoute from "@/router/routes/user-requests.route.ts";

export default {
	path: "/",
	name: "main",
	component: () => import("@/views/MainView.vue"),

	redirect: () => {
		return { name: "userRequests", params: { id: 1 } };
	},

	children: [userRequestsRoute, allRequestsRoute],
};
