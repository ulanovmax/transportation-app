<template>
	<div class="">
		<label v-if="label" class="mb-2 text-base font-semibold">
			{{ label }}
			<span v-if="required" class="text-red-500">*</span>
		</label>

		<select class="input" @change="onChange">
			<option v-if="placeholder" class="text-slate-400">
				{{ placeholder }}
			</option>
			<option v-for="item in options" :key="item" :value="item">
				{{ item }}
			</option>
		</select>
	</div>
</template>

<script setup lang="ts">
interface Props {
	modelValue: string;
	options: Array<string | number>;
	label?: string;
	required?: boolean;
	placeholder?: string;
}

interface Emits {
	(e: "update:modelValue", value: string): void;
}

const props = defineProps<Props>();
const emits = defineEmits<Emits>();

const onChange = (e: Event) => {
	const target = e.target as HTMLSelectElement;

	emits(
		"update:modelValue",
		target.value === props.placeholder ? "" : target.value
	);
};
</script>

<style scoped lang="postcss">
select {
	padding: 10.5px 12px;
}
</style>
