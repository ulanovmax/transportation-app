<template>
	<div class="mb-10">
		<h1 class="mb-5 text-xl text-slate-900">All requests</h1>

		<filter-requests-form
			@change="(list: IRequest[]) => (requests = list)"
		/>
	</div>

	<div class="mt-5">
		<template v-if="requests.length > 0">
			<div class="grid auto-rows-fr grid-cols-2 gap-5">
				<request-card
					v-for="card in requests"
					:key="card.id"
					:data="card"
				/>
			</div>
		</template>

		<not-found v-else msg="No requests found" />
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";

import NotFound from "@/components/base/NotFound.vue";
import RequestCard from "@/components/cards/RequestCard.vue";
import FilterRequestsForm from "@/components/forms/FilterRequestsForm.vue";

import { storeToRefs } from "pinia";

import { useRequestsStore } from "@/store/requests.store.ts";
import type { IRequest } from "@/ts/types/requests";

const { requestsList } = storeToRefs(useRequestsStore());

const requests = ref(requestsList.value);
</script>

<style scoped lang="postcss"></style>
