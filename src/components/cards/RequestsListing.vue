<template>
	<template v-if="requests.length > 0">
		<transition-group
			name="list"
			tag="div"
			class="slide-up grid auto-rows-fr grid-cols-2 gap-5 max-md:grid-cols-1"
		>
			<request-card
				v-for="card in requests"
				:key="card.id"
				:editable="editable"
				:data="card"
				@select="onSelect"
				@delete="emits('delete', card.id)"
			/>
		</transition-group>
	</template>

	<not-found v-else msg="No requests found" />

	<request-modal
		v-if="isPopupOpen"
		v-model="isPopupOpen"
		:data="currentRequest"
	/>
</template>

<script setup lang="ts">
import type { Component } from "vue";
import { ref } from "vue";
import { defineAsyncComponent } from "vue";

import NotFound from "@/components/base/NotFound.vue";
import RequestCard from "@/components/cards/RequestCard.vue";

import type { IRequest } from "@/ts/types/requests";
const RequestModal: Component = defineAsyncComponent(
	() => import("@/components/modals/RequestModal.vue")
);

interface Props {
	requests: IRequest[];
	editable?: boolean;
}

interface Emits {
	(e: "delete", value: IRequest["id"]): void;
}

defineProps<Props>();
const emits = defineEmits<Emits>();

const isPopupOpen = ref(false);
const currentRequest = ref({});

const onSelect = (request: IRequest) => {
	currentRequest.value = request;
	isPopupOpen.value = true;
};
</script>

<style scoped lang="postcss">
.list-enter-active {
	transition: all 0.4s ease;
}
.list-enter-from {
	opacity: 0;
	transform: translateY(30px);
}
</style>
