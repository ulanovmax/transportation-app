<template>
	<app-header class="mb-10" />

	<main class="pb-10">
		<div class="container">
			<router-view></router-view>
		</div>
	</main>
</template>

<script setup lang="ts">
import AppHeader from "@/components/layout/AppHeader.vue";
</script>

<style scoped lang="postcss"></style>
