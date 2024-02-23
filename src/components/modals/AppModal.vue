<template>
	<transition>
		<div
			v-if="modelValue"
			ref="modal"
			data-scroll-lock-scrollable
			class="fixed inset-0 z-50 overflow-y-auto bg-slate-400/30 backdrop-blur-sm"
		>
			<div
				class="flex min-h-full items-center justify-center p-4 text-center"
				@click.self="close()"
			>
				<div
					class="zoom-in bordered relative flex w-full max-w-5xl flex-col overflow-hidden rounded-md bg-white p-4 text-left shadow-xl"
				>
					<div
						class="mb-4 flex items-center justify-between border-b border-solid border-b-slate-200 pb-4"
					>
						<slot name="header"></slot>

						<app-button class="ml-auto" size="sm" @click="close">
							<icon-x :size="20" />
						</app-button>
					</div>

					<slot></slot>
				</div>
			</div>
		</div>
	</transition>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { IconX } from "@tabler/icons-vue";
// Plugin to disable scroll in all browsers
import {
	disablePageScroll,
	enablePageScroll,
} from "scroll-lock/dist/scroll-lock.js";

import AppButton from "@/components/base/AppButton.vue";

interface Props {
	modelValue: boolean;
}

interface Emits {
	(e: "update:modelValue", value: boolean): void;
}

const props = defineProps<Props>();
const emits = defineEmits<Emits>();

const modal = ref();

watch(
	() => props.modelValue,
	(value) => {
		if (value) {
			disablePageScroll(modal.value);
		} else {
			enablePageScroll();
		}
	}
);

if (props.modelValue) disablePageScroll(modal.value);

function close() {
	emits("update:modelValue", false);
	enablePageScroll();
}
</script>

<style scoped lang="postcss">
.v-enter-active,
.v-leave-active {
	transition: all 0.3s ease;
}

.v-enter-from,
.v-leave-to {
	opacity: 0;
}
</style>
