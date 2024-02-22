<template>
	<button
		:disabled="disabled"
		:type="type"
		class="flex items-center gap-3 rounded-md bg-blue-500 font-semibold text-white transition"
		:class="{
			'px-3 py-2 text-lg': size === 'lg',
			'gap-2 p-2 text-sm': size === 'sm',
			'opacity-60': disabled,
			'hover:bg-blue-700': !disabled,
			'bg-green-500 hover:bg-green-600': variant === 'success',
		}"
		@click="emits('click')"
	>
		<slot></slot>
		<component
			:is="icon"
			v-if="icon"
			:class="{
				'h-5 w-5': size === 'sm',
			}"
		/>
	</button>
</template>

<script setup lang="ts">
import type { Component } from "vue";

interface Props {
	type?: string;
	loading?: boolean;
	disabled?: boolean;
	variant?: "secondary" | "error" | "success";
	size?: "sm" | "lg";
	icon?: Component;
}

interface Emits {
	(e: "click"): void;
}

const emits = defineEmits<Emits>();

withDefaults(defineProps<Props>(), {
	type: "button",
	size: "lg",
});
</script>

<style scoped lang="postcss"></style>
