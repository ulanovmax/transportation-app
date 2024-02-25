<template>
	<div class="mb-10">
		<h1 class="mb-5 text-xl text-slate-900">All requests</h1>

		<filter-requests-form
			@change="(list: IRequest[]) => (requests = list)"
		/>
	</div>

	<div class="mt-5">
		<requests-listing :requests="requests" />
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";

import RequestsListing from "@/components/cards/RequestsListing.vue";
import FilterRequestsForm from "@/components/forms/FilterRequestsForm.vue";

import { storeToRefs } from "pinia";

import { useRequestsStore } from "@/store/requests.store.ts";
import type { IRequest } from "@/ts/types/requests";

const { requestsList } = storeToRefs(useRequestsStore());

const requests = ref(requestsList.value);
</script>

<style scoped lang="postcss"></style>
