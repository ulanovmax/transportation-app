<template>
	<div class="">
		<label v-if="label" class="mb-2 text-base font-semibold">
			{{ label }}
		</label>

		<select class="input" @change="onChange">
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
}

interface Emits {
	(e: "update:modelValue", value: string): void;
}

defineProps<Props>();
const emits = defineEmits<Emits>();

const onChange = (e: Event) => {
	const target = e.target as HTMLSelectElement;

	emits("update:modelValue", target.value);
};
</script>

<style scoped lang="postcss">
select {
	padding: 10.5px 12px;
}
</style>
