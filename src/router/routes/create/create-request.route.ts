export default {
	path: "/:id/create",
	name: "createRequest",
	meta: {
		isCreate: true,
	},
	component: () => import("@/views/create/CreateRequestView.vue"),
};
