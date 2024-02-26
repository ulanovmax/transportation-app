<template>
	<button
		:disabled="disabled"
		:type="type"
		class="flex items-center gap-3 rounded-md font-semibold text-white transition"
		:class="classes"
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
import { computed } from "vue";

interface Props {
	type?: "button" | "reset" | "submit";
	loading?: boolean;
	disabled?: boolean;
	variant?: "secondary" | "error" | "success" | "default";
	size?: "sm" | "lg";
	icon?: Component;
}

interface Emits {
	(e: "click"): void;
}

const emits = defineEmits<Emits>();

const props = withDefaults(defineProps<Props>(), {
	type: "button",
	size: "lg",
	variant: "default",
});

const classes = computed(() => {
	const { variant, disabled, size } = props;

	return {
		"bg-blue-500 ": variant === "default",
		"px-3 py-2 text-lg": size === "lg",
		"gap-2 p-2 text-sm": size === "sm",
		"opacity-60": disabled,
		"hover:bg-blue-700": !disabled,
		"bg-green-500 hover:bg-green-600": variant === "success",
		"disabled:opacity-60": disabled,
		"border-2 border-solid border-blue-500 bg-transparent !text-blue-500 hover:bg-blue-500 hover:!text-white":
			variant === "secondary",
		"bg-red-500 text-white hover:bg-red-600": variant === "error",
	};
});
</script>

<style scoped lang="postcss"></style>
