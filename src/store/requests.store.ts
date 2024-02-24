import { ref } from "vue";

import { defineStore } from "pinia";

import type { IRequest } from "@/ts/types/requests";
import type { IUser } from "@/ts/types/users";

export const useRequestsStore = defineStore(
	"requests",
	() => {
		const requestsList = ref<IRequest[]>([]);
		const usersList = ref<IUser[]>([]);

		const getUserRequests = (userId: number) =>
			requestsList.value.filter((item) => item.user.id === userId);

		const isUserExist = (id: number | string) =>
			usersList.value.find((item) => item.id === id);

		const isRequestExist = (id: number | string) =>
			requestsList.value.find((item) => item.id === id);

		return {
			requestsList,
			usersList,
			isUserExist,
			isRequestExist,
			getUserRequests,
		};
	},
	{
		persist: {
			paths: ["usersList", "requestsList"],
		},
	}
);
