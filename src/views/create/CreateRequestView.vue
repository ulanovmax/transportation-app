<template>
	<div class="mb-10 text-center">
		<h1 class="mb-4 text-2xl">Create request</h1>
		<p class="text-lg">Choose type of your request</p>
	</div>

	<div class="flex justify-center gap-5">
		<request-type-link
			title="Order"
			:to="{ name: 'createOrder', params: { id: user.id } }"
			:type="RequestTypeEnums.Order"
			description="If you want to send your parcel"
		/>

		<request-type-link
			title="Delivery"
			:to="{ name: 'createDelivery', params: { id: user.id } }"
			:type="RequestTypeEnums.Delivery"
			description="If you open to deliver"
		/>
	</div>
</template>

<script setup lang="ts">
import RequestTypeLink from "@/components/cards/RequestTypeLink.vue";

import { RequestTypeEnums } from "@/ts/enums/request-type.enums.ts";

import { useUserStore } from "@/store/user.store.ts";

const { user } = useUserStore();
</script>

<style scoped lang="postcss"></style>
