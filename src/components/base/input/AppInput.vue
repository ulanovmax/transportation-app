<template>
	<div>
		<label v-if="label" class="mb-2 text-base font-semibold">
			{{ label }}
			<span v-if="required" class="text-red-500">*</span>
		</label>

		<div class="relative">
			<component
				:is="icon"
				v-if="icon"
				:class="{
					'text-blue-500': modelValue,
				}"
				class="icon left-2 opacity-30 transition-colors"
			/>

			<input
				:type="type"
				:value="modelValue"
				:disabled="disabled"
				:placeholder="placeholder"
				:class="{
					'!pl-10': icon,
					'!border-red-400': error,
				}"
				class="input"
				@input="onInput($event)"
				@blur="emits('blur')"
				@keyup.enter="onEnter($event)"
			/>

			<dots-loader v-if="loading" class="icon right-4" />
		</div>

		<p v-show="error" class="error mt-2 text-red-500 transition">
			{{ error }}
		</p>
	</div>
</template>

<script setup lang="ts">
import type { InputEmits, InputProps } from "@/components/base/input/types";
import DotsLoader from "@/components/loaders/DotsLoader.vue";

import useDebounce from "@/composables/useDebounce.ts";

const emits = defineEmits<InputEmits>();

const props = withDefaults(defineProps<InputProps>(), {
	type: "text",
	placeholder: "",
	searchDelay: 500,
});

// Debounced update
const debounceInputUpdate = useDebounce((value: string) => {
	emits("update:modelValue", value);
}, props.searchDelay);

const onInput = (e: Event) => {
	const target = e.target as HTMLInputElement;

	if (props.debounce) {
		debounceInputUpdate(target.value);
	} else {
		emits("update:modelValue", target.value);
	}
};

const onEnter = (e: Event) => {
	const target = e.target as HTMLInputElement;

	emits("enter", target.value);
};
</script>

<style scoped lang="postcss">
.icon {
	@apply pointer-events-none absolute top-1/2 -translate-y-1/2;
}
</style>
