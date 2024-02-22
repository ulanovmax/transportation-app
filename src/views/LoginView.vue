<template>
	<main>
		<div class="flex min-h-screen w-full">
			<div class="w-1/2 flex-grow py-8">
				<div class="container">
					<app-logo class="mb-20" />

					<form class="mx-auto max-w-xl">
						<h1 class="mb-5 text-2xl">Sign up</h1>

						<div class="flex flex-col gap-5">
							<app-input
								v-model="state.email"
								label="Email"
								placeholder="example@cloud.com"
							/>

							<app-input
								v-model="state.password"
								label="Password"
								placeholder="********"
								type="password"
							/>

							<app-button> Sign up </app-button>
						</div>
					</form>
				</div>
			</div>

			<div class="relative w-full max-w-4xl flex-grow bg-blue-600">
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
import { ref } from "vue";

import AppButton from "@/components/base/button/AppButton.vue";
import AppInput from "@/components/base/input/AppInput.vue";
import AppLogo from "@/components/base/logo/AppLogo.vue";

const state = ref({
	email: "",
	password: "",
});
</script>

<style scoped lang="postcss"></style>
