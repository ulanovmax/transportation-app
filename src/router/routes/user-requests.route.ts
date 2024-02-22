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

		redirect: { name: "userRequests" },
	},
];
