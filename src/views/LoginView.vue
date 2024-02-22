<template>
	<main>
		<div class="flex min-h-screen w-full">
			<div class="w-1/2 flex-grow py-8">
				<div class="container">
					<app-logo class="mb-20" />

					<form class="mx-auto max-w-xl">
						<div class="mb-5">
							<h1 class="mb-2 text-2xl">
								Welcome to the Transportation 👋
							</h1>
							<p>Please tell me your name</p>
						</div>

						<div class="flex flex-col gap-5">
							<app-input
								v-model="user.name"
								label="Name"
								placeholder="Will Smith"
							/>

							<app-input
								v-model.number="user.id"
								label="Id"
								placeholder="12345"
							/>

							<app-button
								class="justify-center"
								@click="onSubmit"
							>
								Sign up
							</app-button>
						</div>
					</form>
				</div>
			</div>

			<div class="relative w-1/3 flex-grow bg-blue-600">
				<img
					src="@public/login-bg.jpg"
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
import { useRouter } from "vue-router";

import AppButton from "@/components/base/AppButton.vue";
import AppInput from "@/components/base/AppInput.vue";
import AppLogo from "@/components/base/AppLogo.vue";

import { useUserStore } from "@/store/user.store.ts";

const { user } = useUserStore();

const router = useRouter();

const onSubmit = () => {
	void router.replace({ name: "userRequests", params: { id: user.id } });
};
</script>

<style scoped lang="postcss"></style>
