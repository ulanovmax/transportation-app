<template>
	<main>
		<div class="flex min-h-screen w-full">
			<div class="flex w-1/2 flex-grow items-center py-20 max-lg:w-full">
				<div class="container w-full">
					<app-logo class="absolute top-5" />

					<div class="mx-auto max-w-xl">
						<div class="mb-5">
							<h1 class="mb-2 text-2xl">
								Welcome to the <span>Transportation 👋</span>
							</h1>
							<p>Please tell me your name</p>
						</div>

						<form @submit.prevent="onSubmit">
							<div class="flex flex-col gap-5">
								<app-input
									v-model="name"
									label="Name"
									placeholder="Will Smith"
									:error="errors.name"
									required
								/>

								<app-input
									v-model="id"
									label="Id"
									:error="errors.id"
									placeholder="12345"
									required
								/>

								<app-button
									:disabled="isDisabled"
									class="justify-center"
									type="submit"
								>
									Sign up
								</app-button>
							</div>
						</form>
					</div>
				</div>
			</div>

			<div class="relative w-1/3 flex-grow bg-blue-600 max-lg:hidden">
				<img
					src="@img/login-bg.jpg"
					class="absolute right-0 top-0 h-full w-full object-cover"
					alt="Background"
				/>

				<app-logo
					class="absolute bottom-10 right-10 z-10"
					:variant="'white'"
				/>
			</div>
		</div>
	</main>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useForm } from "vee-validate";

import AppButton from "@/components/base/AppButton.vue";
import AppLogo from "@/components/base/AppLogo.vue";
import AppInput from "@/components/base/input/AppInput.vue";

import { storeToRefs } from "pinia";

import { loginSchema } from "@/schemas/form.schemas.ts";
import { useRequestsStore } from "@/store/requests.store.ts";
import { useUserStore } from "@/store/user.store.ts";
import type { LoginForm } from "@/ts/types/forms";

const { user, usersList } = storeToRefs(useUserStore());
const { isUserExist } = useRequestsStore();

const router = useRouter();

const { handleSubmit, errors, defineField } = useForm<LoginForm>({
	validationSchema: loginSchema,
	initialValues: {
		name: "",
		id: "",
	},
});

const [name] = defineField("name");
const [id] = defineField("id");

const isDisabled = computed(() => !name.value || !id.value);

const onSubmit = handleSubmit((values) => {
	user.value = {
		name: values.name,
		id: +values.id,
	};

	if (!isUserExist(usersList.value, +values.id)) {
		usersList.value.push(user.value);
	}

	void router.replace({ name: "userRequests", params: { id: values.id } });
});
</script>

<style scoped lang="postcss"></style>
