<template>
	<app-modal v-model="isOpen">
		<template #header>
			<div class="flex flex-wrap items-center gap-x-4 gap-y-2">
				<div class="flex flex-wrap items-center gap-x-4 gap-y-2">
					<h3 class="text-xl">
						{{ data.fromCity }}
					</h3>

					<icon-truck-delivery />

					<h3 class="text-xl">
						{{ data.toCity }}
					</h3>
				</div>

				<app-badge class="capitalize text-white">
					{{ data.type }}
				</app-badge>
			</div>
		</template>

		<div class="mb-6">
			<ul class="mb-5 space-y-3">
				<li class="flex items-center gap-2 text-base font-medium">
					<icon-calendar-event
						:size="20"
						class="text-slate-800 opacity-50"
					/>
					{{ data.dateDispatch }}
				</li>

				<li
					v-if="data.category"
					class="flex items-center gap-2 text-base font-medium"
				>
					<icon-category
						:size="20"
						class="text-slate-800 opacity-50"
					/>
					{{ data.category }}
				</li>
			</ul>

			<p class="break-words text-base opacity-80">
				{{ data.description ? data.description : "No description" }}
			</p>
		</div>

		<div>
			<h3 class="mb-4 text-lg">
				{{
					matchingList.length > 0
						? `Matching ${requestTypeName} (${matchingList.length})`
						: `No matching ${requestTypeName}`
				}}
			</h3>

			<fancy-carousel
				v-if="matchingList.length > 0"
				:carousel-options="{
					infinite: false,
					center: false,
					Navigation: false,
				}"
			>
				<request-card
					v-for="card in matchingList"
					:key="card.id"
					:clickable="false"
					class="f-carousel__slide !mr-3 !w-1/2 max-sm:!w-full"
					:data="card"
				/>
			</fancy-carousel>
		</div>
	</app-modal>
</template>

<script setup lang="ts">
import { computed } from "vue";
import {
	IconCalendarEvent,
	IconCategory,
	IconTruckDelivery,
} from "@tabler/icons-vue";

import AppBadge from "@/components/base/AppBadge.vue";
import RequestCard from "@/components/cards/RequestCard.vue";
import FancyCarousel from "@/components/carousel/FancyCarousel.vue";
import AppModal from "@/components/modals/AppModal.vue";

import { useMatchingRequests } from "@/composables/useMatchingRequests.ts";
import { useRequestTypeName } from "@/composables/useRequestTypeName.ts";
import type { IRequest } from "@/ts/types/requests";

interface Props {
	data: IRequest;
	modelValue: boolean;
}

interface Emits {
	(e: "update:modelValue", value: Props["modelValue"]): void;
}

const props = defineProps<Props>();
const emits = defineEmits<Emits>();

const matchingList = computed(() => {
	return useMatchingRequests(props.data);
});

const requestTypeName = computed(() => useRequestTypeName(props.data.type));

const isOpen = computed({
	get() {
		return props.modelValue;
	},

	set(value) {
		emits("update:modelValue", value);
	},
});
</script>

<style scoped lang="postcss"></style>
