<template>
	<div class="mb-10">
		<h1 class="mb-5 text-xl text-slate-900">Your requests</h1>

		<app-button size="sm" variant="success" :icon="IconPlus">
			Add new
		</app-button>
	</div>

	<div class="grid grid-cols-2 gap-5">
		<request-card
			:id="2"
			:type="'delivery'"
			category="Food"
			date="20.01.2024"
			from-city="Odesa"
			to-city="Kiev"
		/>

		<request-card
			:id="1"
			:type="'order'"
			category="Food"
			date="20.01.2024"
			from-city="Odesa"
			to-city="Kiev"
		/>
	</div>
</template>

<script setup lang="ts">
import { IconPlus } from "@tabler/icons-vue";

import AppButton from "@/components/base/AppButton.vue";
import RequestCard from "@/components/cards/RequestCard.vue";
</script>

<style scoped lang="postcss"></style>
