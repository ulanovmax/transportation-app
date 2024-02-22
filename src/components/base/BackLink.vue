<template>
	<span
		class="hover-link mb-12 inline-flex items-center gap-2 font-semibold"
		@click="router.go(-1)"
	>
		<icon-arrow-narrow-left class="text-blue-500" />

		<slot> Go back </slot>
	</span>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { IconArrowNarrowLeft } from "@tabler/icons-vue";

const router = useRouter();
</script>

<style scoped lang="postcss"></style>
