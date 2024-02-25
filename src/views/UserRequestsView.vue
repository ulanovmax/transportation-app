<template>
	<div class="mb-10">
		<div>
			<h1 class="mb-5 text-xl text-slate-900">
				Hello, {{ user.name }} 👋
			</h1>
		</div>

		<router-link :to="{ name: 'createRequest', params: { id: user.id } }">
			<app-button size="sm" variant="success" :icon="IconPlus">
				Add new request
			</app-button>
		</router-link>
	</div>

	<filter-requests-form
		sort-by-user
		@change="(list: IRequest[]) => (userRequests = list)"
	/>

	<div>
		<h3 class="mb-5 text-lg">Your requests ({{ userRequests.length }})</h3>

		<requests-listing
			:requests="userRequests"
			@delete="onDelete"
			@select="onSelect"
		/>
	</div>

	<request-modal v-model="isPopupOpen" :data="currentRequest" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import { IconPlus } from "@tabler/icons-vue";

import AppButton from "@/components/base/AppButton.vue";
import RequestsListing from "@/components/cards/RequestsListing.vue";
import FilterRequestsForm from "@/components/forms/FilterRequestsForm.vue";
import RequestModal from "@/components/modals/RequestModal.vue";

import { useRequestsStore } from "@/store/requests.store.ts";
import { useUserStore } from "@/store/user.store.ts";
import type { IRequest } from "@/ts/types/requests";

const { user } = useUserStore();

const requestsStore = useRequestsStore();

const userRequests = ref(requestsStore.getUserRequests(user.id));

const isPopupOpen = ref(false);
const currentRequest = ref({});

const onDelete = (id: IRequest["id"]) => {
	userRequests.value = userRequests.value.filter((item) => item.id !== id);
};

const onSelect = (request: IRequest) => {
	currentRequest.value = request;
	isPopupOpen.value = true;
};
</script>

<style scoped lang="postcss"></style>
