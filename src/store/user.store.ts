import { ref } from "vue";

import { defineStore } from "pinia";

import router from "@/router";
import type { IUser } from "@/ts/types/users";

export const useUserStore = defineStore(
	"user",
	() => {
		const initialUser: IUser = {
			id: 0,
			name: "",
		};

		const user = ref<IUser>({ ...initialUser });

		const usersList = ref<IUser[]>([]);

		const isUserExist = (id: IUser["id"]) => {
			return usersList.value.find((item) => item.id === id);
		};

		// Logout function
		const logout = () => {
			user.value = { ...initialUser };

			void router.replace({ name: "login" });
		};

		return {
			user,
			usersList,
			isUserExist,
			logout,
		};
	},
	{
		persist: {
			paths: ["user.id", "user.name", "usersList"],
		},
	}
);
