<template>
	<div
		class="relative flex min-h-screen items-center justify-center overflow-hidden text-center"
	>
		<div>
			<h1 class="mb-5 text-8xl font-bold text-red-500">404</h1>
			<p class="mb-6 text-xl">Oops, it seems you follow backlink</p>

			<router-link to="/">
				<app-button> Go home </app-button>
			</router-link>

			<icon-truck-delivery
				class="absolute -left-1/4 top-0 -z-[1] h-[80vw] w-[80vw] max-w-7xl opacity-10"
			/>

			<icon-box-seam
				class="absolute -right-1/4 bottom-0 -z-[1] h-[80vw] w-[80vw] max-w-7xl opacity-10"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
import { IconBoxSeam, IconTruckDelivery } from "@tabler/icons-vue";

import AppButton from "@/components/base/AppButton.vue";
</script>

<style scoped lang="postcss"></style>
