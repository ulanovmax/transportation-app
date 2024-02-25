<script setup lang="ts">
import AppButton from "@/components/base/AppButton.vue";
</script>

<template>
	<div class="flex min-h-screen items-center justify-center text-center">
		<div class="">
			<h1 class="mb-5 text-8xl font-bold text-red-500">404</h1>
			<p class="mb-6 text-xl">Oops it seems you follow backlink</p>

			<router-link to="/">
				<app-button> Go home </app-button>
			</router-link>
		</div>
	</div>
</template>

<style scoped lang="postcss"></style>
