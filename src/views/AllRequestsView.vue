<template>
	<div class="mb-10">
		<h1 class="mb-5 text-xl text-slate-900">All requests</h1>
	</div>

	<div class="grid grid-cols-2 gap-5">
		<request-card v-for="card in data" :key="card.id" :data="card" />
	</div>
</template>

<script setup lang="ts">
import RequestCard from "@/components/cards/RequestCard.vue";

import { RequestTypeEnums } from "@/ts/enums/request-type.enums.ts";

import type { IRequest } from "@/ts/types/requests";

const data: IRequest[] = [
	{
		id: 1,
		type: RequestTypeEnums.Order,
		user: {
			id: 1,
			name: "Maxim",
		},
		category: "Clothes",
		dateDispatch: "20.01.2025",
		description:
			"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur atque consequatur corporis deserunt ea iusto laudantium minima odit, perferendis perspiciatis provident quo velit voluptas. Aliquid explicabo id impedit laudantium, maxime nesciunt omnis pariatur quisquam voluptatibus. Autem dignissimos fuga ipsum iste libero maiores quibusdam sapiente! Asperiores nisi reiciendis suscipit vero. Ex!\n",
		fromCity: "Odesa",
		toCity: "Paris",
		dateCreated: "20.01.2024",
	},
	{
		id: 2,
		type: RequestTypeEnums.Delivery,
		user: {
			id: 1,
			name: "Alex",
		},
		dateDispatch: "20.01.2025",
		fromCity: "Odesa",
		toCity: "Paris",
		dateCreated: "20.01.2024",
	},
];
</script>

<style scoped lang="postcss"></style>
