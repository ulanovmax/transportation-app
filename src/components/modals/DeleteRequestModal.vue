<template>
	<app-modal v-model="isOpen" size="sm" :header="false">
		<template #default="{ close }">
			<div class="flex flex-col items-center pb-3 pt-5">
				<h2 class="mb-5 text-center text-xl">
					Are you sure you want to delete?
				</h2>

				<div class="mb-8 flex items-center gap-2 text-slate-400">
					<h3 class="text-lg">
						{{ fromCity }}
					</h3>

					<icon-truck-delivery />

					<h3 class="text-lg">
						{{ toCity }}
					</h3>
				</div>

				<div class="flex gap-4">
					<app-button variant="secondary" @click="close">
						Cancel
					</app-button>

					<app-button variant="error" @click="emits('delete')">
						Delete
					</app-button>
				</div>
			</div>
		</template>
	</app-modal>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { IconTruckDelivery } from "@tabler/icons-vue";

import AppButton from "@/components/base/AppButton.vue";
import AppModal from "@/components/modals/AppModal.vue";

import type { IRequest } from "@/ts/types/requests";

interface Emits {
	(e: "update:modelValue", value: Props["modelValue"]): void;
	(e: "delete"): void;
}

interface Props extends Pick<IRequest, "fromCity" | "toCity"> {
	modelValue: boolean;
}

const props = defineProps<Props>();
const emits = defineEmits<Emits>();

const isOpen = computed({
	get() {
		return props.modelValue;
	},

	set(value) {
		emits("update:modelValue", value);
	},
});
</script>

<style scoped lang="postcss"></style>
