export default {
	path: "/:id/create/delivery",
	name: "createDelivery",
	meta: {
		isCreate: true,
	},
	component: () => import("@/views/create/CreateDeliveryView.vue"),
};
