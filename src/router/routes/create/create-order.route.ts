export default {
	path: "/:id/create/order",
	name: "createOrder",
	meta: {
		isCreate: true,
	},
	component: () => import("@/views/create/CreateOrderView.vue"),
};
