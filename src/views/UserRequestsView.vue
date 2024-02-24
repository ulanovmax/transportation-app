<template>
	<div class="mb-10">
		<div>
			<h1 class="mb-5 text-xl text-slate-900">
				Hello, {{ user.name }} 👋
			</h1>
		</div>

		<router-link :to="{ name: 'createRequest', params: { id: user.id } }">
			<app-button size="sm" variant="success" :icon="IconPlus">
				Add new
			</app-button>
		</router-link>
	</div>

	<filter-requests-form
		@change="(list: IRequest[]) => (mainRequestsList = list)"
	/>

	<div>
		<h3 class="mb-5 text-lg">
			Your requests ({{ mainRequestsList.length }})
		</h3>

		<template v-if="mainRequestsList.length > 0">
			<div class="grid auto-rows-fr grid-cols-2 gap-5 max-md:grid-cols-1">
				<request-card
					v-for="card in mainRequestsList"
					:key="card.id"
					editable
					:data="card"
					@select="select"
				/>
			</div>
		</template>

		<not-found v-else msg="No requests found" />
	</div>

	<request-modal v-model="isPopupOpen" :data="currentRequest" />
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { IconPlus } from "@tabler/icons-vue";

import AppButton from "@/components/base/AppButton.vue";
import NotFound from "@/components/base/NotFound.vue";
import RequestCard from "@/components/cards/RequestCard.vue";
import FilterRequestsForm from "@/components/forms/FilterRequestsForm.vue";
import RequestModal from "@/components/modals/RequestModal.vue";

import { storeToRefs } from "pinia";

import { useRequestsStore } from "@/store/requests.store.ts";
import { useUserStore } from "@/store/user.store.ts";
import type { IRequest } from "@/ts/types/requests";

const { user } = useUserStore();

const { requestsList } = storeToRefs(useRequestsStore());

const mainRequestsList = computed(() =>
	requestsList.value.filter((item) => item.user.id === user.id)
);

const isPopupOpen = ref(false);
const currentRequest = ref({});

const select = (request: IRequest) => {
	currentRequest.value = request;
	isPopupOpen.value = true;
};
</script>

<style scoped lang="postcss"></style>
