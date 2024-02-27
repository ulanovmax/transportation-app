import { ref } from "vue";

import type { RequestTypeEnums } from "@/ts/enums/request-type.enums.ts";

import { defineStore } from "pinia";

import { useUserStore } from "@/store/user.store.ts";
import type { DeliveryForm, OrderForm } from "@/ts/types/forms";
import type { IRequest } from "@/ts/types/requests";
import type { IUser } from "@/ts/types/users";

export const useRequestsStore = defineStore(
	"requests",
	() => {
		const requestsList = ref<IRequest[]>([]);

		const getUserRequests = (userId: IUser["id"]) =>
			requestsList.value.filter((item) => item.user.id === userId);

		const isRequestExist = (values: OrderForm, type: RequestTypeEnums) => {
			const { user } = useUserStore();

			const userRequests = getUserRequests(user.id);

			return userRequests.some(
				(item) =>
					item.fromCity === values.fromCity &&
					item.toCity === values.toCity &&
					item.type === type &&
					item.dateDispatch === values.dateDispatch
			);
		};

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
