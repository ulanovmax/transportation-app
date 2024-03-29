<template>
	<div>
		<label v-if="label" class="mb-2 text-base font-semibold">
			{{ label }}
			<span v-if="required" class="text-red-500">*</span>
		</label>

		<div class="relative">
			<textarea
				ref="textareaElement"
				:value="modelValue"
				:placeholder="placeholder"
				class="input min-h-20 resize-none transition"
				@input="onInput($event.target)"
				@blur="emits('blur')"
			></textarea>
		</div>
	</div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

import type { InputEmits, InputProps } from "@/components/base/input/types";

const emits = defineEmits<InputEmits>();

defineProps<
	Pick<InputProps, "placeholder" | "label" | "modelValue" | "required">
>();

const textareaElement = ref<HTMLTextAreaElement | null>(null);
let initialTextareaHeight = 0;

const onInput = (textElement: EventTarget | null) => {
	const target = textElement as HTMLTextAreaElement;

	emits("update:modelValue", target.value);

	const scrollHeight = target.scrollHeight;

	if (target.scrollHeight <= 160) {
		target.style.height = initialTextareaHeight + "px";
		target.style.height = scrollHeight + "px";
	}
};

onMounted(() => {
	initialTextareaHeight = textareaElement.value?.scrollHeight ?? 0;
});
</script>

<style scoped lang="postcss"></style>
