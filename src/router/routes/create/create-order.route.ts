export default {
	path: "/:id/create/order",
	name: "createOrder",
	component: () => import("@/views/create/CreateOrderView.vue"),
};
