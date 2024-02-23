<template>
	<div class="mb-10">
		<h1 class="mb-5 text-xl text-slate-900">Your requests</h1>

		<router-link :to="{ name: 'createRequest', params: { id: user.id } }">
			<app-button size="sm" variant="success" :icon="IconPlus">
				Add new
			</app-button>
		</router-link>
	</div>

	<div class="grid grid-cols-2 gap-5">
		<request-card
			v-for="card in data"
			:key="card.id"
			editable
			:data="card"
			@click="isPopupOpen = true"
		/>
	</div>

	<app-modal v-model="isPopupOpen">
		<template #header>
			<div class="flex items-center gap-4">
				<h3 class="text-xl">Odesa</h3>

				<icon-truck-delivery />

				<h3 class="text-xl">Paris</h3>

				<app-badge class="capitalize text-white"> Delivery </app-badge>
			</div>
		</template>

		<div class="mb-6">
			<ul class="mb-5 space-y-3">
				<li class="flex items-center gap-2 text-base font-medium">
					<icon-calendar-event
						:size="20"
						class="text-slate-800 opacity-50"
					/>
					20.01.2024
				</li>

				<li class="flex items-center gap-2 text-base font-medium">
					<icon-category
						:size="20"
						class="text-slate-800 opacity-50"
					/>
					Clothes
				</li>
			</ul>

			<p class="break-words text-base opacity-80">No description</p>
		</div>

		<div class="">
			<h3 class="mb-4 text-lg">Matching orders</h3>

			<fancy-carousel
				:carousel-options="{
					infinite: false,
					center: false,
					Navigation: false,
				}"
			>
				<request-card
					v-for="i in 5"
					:key="i"
					class="f-carousel__slide !mr-3 !w-1/2"
					:data="data[0]"
				/>
			</fancy-carousel>
		</div>
	</app-modal>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {
	IconCalendarEvent,
	IconCategory,
	IconPlus,
	IconTruckDelivery,
} from "@tabler/icons-vue";

import AppBadge from "@/components/base/AppBadge.vue";
import AppButton from "@/components/base/AppButton.vue";
import RequestCard from "@/components/cards/RequestCard.vue";
import FancyCarousel from "@/components/carousel/FancyCarousel.vue";
import AppModal from "@/components/modals/AppModal.vue";

import { RequestTypeEnums } from "@/ts/enums/request-type.enums.ts";

import { useUserStore } from "@/store/user.store.ts";
import type { IRequestCard } from "@/ts/types/requests";

const data: IRequestCard[] = [
	{
		id: 1,
		type: RequestTypeEnums.Order,
		user: {
			id: 1,
			name: "Maxim",
		},
		category: "Clothes",
		date: "20.01.2025",
		description:
			"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur atque consequatur corporis deserunt ea iusto laudantium minima odit, perferendis perspiciatis provident quo velit voluptas. Aliquid explicabo id impedit laudantium, maxime nesciunt omnis pariatur quisquam voluptatibus. Autem dignissimos fuga ipsum iste libero maiores quibusdam sapiente! Asperiores nisi reiciendis suscipit vero. Ex!\n",
		fromCity: "Odesa",
		toCity: "Paris",
	},
	{
		id: 2,
		type: RequestTypeEnums.Order,
		user: {
			id: 1,
			name: "Alex",
		},
		date: "20.01.2025",
		category: "Food",
		description: "",
		fromCity: "Odesa",
		toCity: "Paris",
	},
];

const { user } = useUserStore();

const isPopupOpen = ref(false);
</script>

<style scoped lang="postcss"></style>
