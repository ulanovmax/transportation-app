import { ref } from "vue";

import { defineStore } from "pinia";

import router from "@/router";
import type { IUser } from "@/ts/types/users";

export const useUserStore = defineStore(
	"user",
	() => {
		const initialUser = {
			id: "",
			name: "",
		};

		const user = ref<IUser>({ ...initialUser });

		const usersList = ref<IUser[]>([]);

		// Logout function
		const logout = () => {
			user.value = { ...initialUser };

			void router.replace({ name: "login" });
		};

		return {
			user,
			usersList,
			logout,
		};
	},
	{
		persist: {
			paths: ["user.id", "user.name", "usersList"],
		},
	}
);
