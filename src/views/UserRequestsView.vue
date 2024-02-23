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

	<form class="mb-10">
		<div class="flex gap-4">
			<app-input
				v-model="date"
				label="Search by dispatch date"
				type="date"
			/>

			<app-select
				v-model="sortValue"
				label="Sorting"
				class="w-fit"
				:options="['Sort by', 'Oldest to newest', 'Newest to oldest']"
			/>
		</div>

		<button v-show="isResetShow" type="reset" class="hover-link mt-2">
			Reset
		</button>
	</form>

	<div>
		<h3 class="mb-4 text-lg">Your requests</h3>

		<template v-if="userRequests.length > 0">
			<div class="grid auto-rows-fr grid-cols-2 gap-5">
				<request-card
					v-for="card in userRequests"
					:key="card.id"
					editable
					:data="card"
					@select="select"
				/>
			</div>
		</template>

		<not-found v-else msg="You have no requests yet" />
	</div>

	<request-modal v-model="isPopupOpen" :data="currentRequest" />
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { IconPlus } from "@tabler/icons-vue";

import AppButton from "@/components/base/AppButton.vue";
import AppSelect from "@/components/base/AppSelect.vue";
import AppInput from "@/components/base/input/AppInput.vue";
import NotFound from "@/components/base/NotFound.vue";
import RequestCard from "@/components/cards/RequestCard.vue";
import RequestModal from "@/components/modals/RequestModal.vue";

import { storeToRefs } from "pinia";

import { useRequestsStore } from "@/store/requests.store.ts";
import { useUserStore } from "@/store/user.store.ts";
import type { IRequest } from "@/ts/types/requests";

const { user } = useUserStore();
const { requestsList } = storeToRefs(useRequestsStore());

const userRequests = computed(() =>
	requestsList.value.filter((item) => item.user.id === user.id)
);

const date = ref("");
const sortValue = ref("");

const isResetShow = computed(() => date.value || sortValue.value);

const isPopupOpen = ref(false);
const currentRequest = ref({});

const select = (request: IRequest) => {
	currentRequest.value = request;
	isPopupOpen.value = true;
};
</script>

<style scoped lang="postcss"></style>
