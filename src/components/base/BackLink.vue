<template>
	<router-link
		:to="to"
		class="hover-link mb-12 inline-flex items-center gap-2 font-semibold"
	>
		<icon-arrow-narrow-left class="text-blue-500" />

		<slot> Go back </slot>
	</router-link>
</template>

<script setup lang="ts">
import type { RouteLocationRaw } from "vue-router";
import { IconArrowNarrowLeft } from "@tabler/icons-vue";

withDefaults(defineProps<{ to?: RouteLocationRaw }>(), {
	to: "/",
});
</script>

<style scoped lang="postcss"></style>
