<template>
	<router-link to="/" class="h-10 w-44 transition hover:scale-110">
		<img
			v-if="variant === 'white'"
			class="contain h-full w-full"
			src="@img/logo-white.svg"
			alt="Transportation"
		/>

		<img
			v-else
			class="contain h-full w-full"
			src="@img/logo.svg"
			alt="Transportation"
		/>
	</router-link>
</template>

<script setup lang="ts">
defineProps<{
	variant?: "white";
}>();
</script>

<style scoped lang="postcss"></style>
