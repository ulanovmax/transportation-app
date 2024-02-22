export default {
	path: "/create",
	name: "createRequest",
	component: () => import("@/views/CreateRequestView.vue"),

	// children: [userRequestsRoute, allRequestsRoute],
};
