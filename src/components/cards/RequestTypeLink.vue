<template>
	<router-link
		:to="to"
		class="card-type bordered cursor-pointer overflow-hidden rounded-md shadow-lg"
	>
		<div class="h-96 w-96 overflow-hidden bg-slate-500">
			<img
				v-if="type === RequestTypeEnums.Delivery"
				src="@public/deliver-img.jpg"
				alt="Delivery"
			/>
			<img
				v-else-if="type === RequestTypeEnums.Order"
				src="@public/order-img.jpg"
				alt="Order"
			/>
		</div>

		<div class="p-5">
			<div class="mb-2 flex items-center gap-1">
				<h2>{{ title }}</h2>

				<icon-truck-delivery
					v-if="type === RequestTypeEnums.Delivery"
					class="opacity-60"
				/>

				<icon-box-seam
					v-else-if="type === RequestTypeEnums.Order"
					class="opacity-60"
				/>
			</div>

			<p v-if="description">
				{{ description }}
			</p>
		</div>
	</router-link>
</template>

<script setup lang="ts">
import type { RouteLocationRaw } from "vue-router";
import { IconBoxSeam, IconTruckDelivery } from "@tabler/icons-vue";

import { RequestTypeEnums } from "@/ts/enums/request-type.enums.ts";

interface Props {
	to: RouteLocationRaw;
	title: string;
	description?: string;
	type: RequestTypeEnums;
}

defineProps<Props>();
</script>

<style scoped lang="postcss">
.card-type {
	img {
		opacity: 0.5;
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: 0.3s ease;
	}

	&:hover {
		img {
			opacity: 1;
			transform: scale(1.05);
		}
	}
}
</style>
