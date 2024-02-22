<template>
	<div class="relative">
		<label v-if="label" class="mb-2 text-lg font-semibold">
			{{ label }}
		</label>

		<input
			:type="type"
			:value="modelValue"
			:placeholder="placeholder"
			class="w-full rounded-md border border-solid border-slate-300 px-3 py-2 text-lg transition focus:border-blue-500 focus-visible:border-blue-500"
			@input="onInput($event)"
		/>
	</div>
</template>

<script setup lang="ts">
interface Props {
	modelValue: string;

	type?: string;
	placeholder?: string;
	label?: string;
}

interface Emits {
	(e: "update:modelValue", value: string | number): void;
}

const emits = defineEmits<Emits>();

withDefaults(defineProps<Props>(), {
	type: "text",
	placeholder: "",
});

const onInput = (e: Event) => {
	const target = e.target as HTMLInputElement;

	emits("update:modelValue", target.value);
};
</script>

<style scoped lang="postcss"></style>
