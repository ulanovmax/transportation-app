import { reactive, ref } from "vue";

import { defineStore } from "pinia";

import type { IRequest } from "@/ts/types/requests";
import type { IUser } from "@/ts/types/users";

export const useRequestsStore = defineStore(
	"requests",
	() => {
		const requestsList = ref<IRequest[]>([]);
		const usersList = reactive<IUser[]>([]);

		const isUserExist = (id: number | string) =>
			usersList.find((item) => item.id === id);

		return {
			requestsList,
			usersList,
			isUserExist,
		};
	},
	{
		persist: {
			paths: ["usersList"],
		},
	}
);
