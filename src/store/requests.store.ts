import { ref } from "vue";

import { defineStore } from "pinia";

import type { DeliveryForm, OrderForm } from "@/ts/types/forms";
import type { IRequest } from "@/ts/types/requests";
import type { IUser } from "@/ts/types/users";

export const useRequestsStore = defineStore(
	"requests",
	() => {
		const requestsList = ref<IRequest[]>([]);

		const isUserExist = (usersList: IUser[], id: IUser["id"]) => {
			return usersList.find((item) => item.id === id);
		};

		const getUserRequests = (userId: IUser["id"]) =>
			requestsList.value.filter((item) => item.user.id === userId);

		const isRequestExist = (id: IRequest["id"]) =>
			requestsList.value.find((item) => item.id === id);

		const editExistedRequest = (
			requestId: IRequest["id"],
			body: OrderForm | DeliveryForm
		) => {
			requestsList.value.forEach((item) => {
				if (item.id === requestId) {
					Object.assign(item, body);
				}
			});
		};

		const deleteRequest = (requestId: IRequest["id"]) => {
			requestsList.value = requestsList.value.filter(
				(item) => item.id !== requestId
			);
		};

		return {
			requestsList,
			getUserRequests,
			isUserExist,
			isRequestExist,
			editExistedRequest,
			deleteRequest,
		};
	},
	{
		persist: {
			paths: ["usersList", "requestsList"],
		},
	}
);
