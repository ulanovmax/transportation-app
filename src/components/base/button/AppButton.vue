<template>
	<button
		:disabled="disabled"
		:type="type"
		class="rounded-md bg-blue-500 px-3 py-2.5 text-lg font-semibold text-white transition"
		:class="{
			'opacity-60': disabled,
			'hover:bg-blue-700': !disabled,
		}"
	>
		<slot></slot>
	</button>
</template>

<script setup lang="ts">
interface Props {
	type?: string;
	loading?: boolean;
	disabled?: boolean;
	variant?: "secondary" | "error" | "success";
	size?: "sm" | "xs";
}

withDefaults(defineProps<Props>(), {
	type: "button",
});
</script>

<style scoped lang="postcss"></style>
