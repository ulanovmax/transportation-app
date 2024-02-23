<template>
	<back-link />

	<div>
		<div class="mb-10 flex flex-wrap items-center justify-between gap-4">
			<div>
				<slot name="header"></slot>
			</div>

			<type-loader />
		</div>

		<slot name="form"></slot>
	</div>
</template>

<script setup lang="ts">
import BackLink from "@/components/base/BackLink.vue";
import TypeLoader from "@/components/loaders/TypeLoader.vue";
</script>

<style scoped lang="postcss"></style>
