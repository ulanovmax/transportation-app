<template>
	<div ref="actionsContainer" class="relative z-20">
		<app-button
			size="sm"
			:icon="IconDots"
			:class="{
				'bg-blue-700': isDropdownShow,
			}"
			@click="isDropdownShow = !isDropdownShow"
		/>

		<div
			v-show="isDropdownShow"
			class="bordered slide-down absolute left-0 top-full overflow-hidden rounded-md bg-white"
		>
			<ul>
				<li
					v-for="item in options"
					:key="item.label"
					class="flex cursor-pointer items-center gap-2 border-b border-solid border-slate-200 bg-white py-1 pl-2 pr-4 text-base text-slate-900 transition-colors hover:bg-slate-200"
					@click="clickAction(item.click)"
				>
					<component :is="item.icon" v-if="item.icon" :size="16" />

					{{ item.label }}
				</li>
			</ul>
		</div>
	</div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import { IconDots } from "@tabler/icons-vue";

import type { ActionOption } from "@/components/actions-button/types";
import AppButton from "@/components/base/AppButton.vue";

interface Props {
	options: ActionOption[];
}

defineProps<Props>();

const isDropdownShow = ref(false);
const actionsContainer = ref<HTMLDivElement | null>(null);

const clickAction = (callback: () => void) => {
	callback();
	isDropdownShow.value = false;
};

function setClickEvent(e: Event) {
	if (
		(e.target as HTMLDivElement) !== actionsContainer.value &&
		!actionsContainer.value?.contains(e.target as Node)
	) {
		isDropdownShow.value = false;
	}
}

onMounted(() => {
	document.addEventListener("click", setClickEvent);
});

onUnmounted(() => {
	document.removeEventListener("click", setClickEvent);
});
</script>

<style scoped lang="postcss"></style>
