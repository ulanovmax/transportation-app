export default {
	path: "/:id/requests",
	name: "userRequests",
	component: () => import("@/views/UserRequestsView.vue"),
};
