<template>
	<h1 class="mb-5 text-xl text-slate-900">Your requests</h1>

	<app-button size="sm" variant="success" :icon="IconPlus">
		Add new
	</app-button>
</template>

<script setup lang="ts">
import { IconPlus } from "@tabler/icons-vue";

import AppButton from "@/components/base/button/AppButton.vue";
</script>

<style scoped lang="postcss"></style>
