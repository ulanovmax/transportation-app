<template>
	<div class="flex flex-col items-center">
		<div class="box mb-3 max-h-72 min-h-40 min-w-40 max-w-72">
			<img
				class="h-full w-full select-none object-contain"
				src="@img/not-found.svg"
				alt="Not found"
			/>
		</div>

		<p class="text-lg font-medium text-slate-400">
			{{ msg }}
		</p>
	</div>
</template>

<script setup lang="ts">
withDefaults(
	defineProps<{
		msg: string;
	}>(),
	{
		msg: "Not found",
	}
);
</script>

<style scoped lang="postcss">
.box {
	width: 18vw;
	height: 18vw;
}
</style>
