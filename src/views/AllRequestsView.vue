<template>
	<div class="mb-10">
		<h1 class="mb-5 text-xl text-slate-900">All requests</h1>
	</div>

	<div>
		<template v-if="requestsList.length > 0">
			<div class="grid auto-rows-fr grid-cols-2 gap-5">
				<request-card
					v-for="card in requestsList"
					:key="card.id"
					:data="card"
				/>
			</div>
		</template>

		<not-found v-else msg="No requests found" />
	</div>
</template>

<script setup lang="ts">
import NotFound from "@/components/base/NotFound.vue";
import RequestCard from "@/components/cards/RequestCard.vue";

import { storeToRefs } from "pinia";

import { useRequestsStore } from "@/store/requests.store.ts";

const { requestsList } = storeToRefs(useRequestsStore());
</script>

<style scoped lang="postcss"></style>
