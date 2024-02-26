<template>
	<back-link :to="{ name: 'createRequest' }" />

	<div>
		<div class="mb-10 flex flex-wrap items-center justify-between gap-4">
			<div>
				<slot name="header"></slot>
			</div>

			<type-loader />
		</div>

		<slot name="form"></slot>
	</div>

	<!-- Confirmation modal -->
	<app-modal v-model="isPopupOpen" size="sm" :header="false">
		<template #default="{ close }">
			<div class="pb-5 pt-5">
				<div class="flex flex-col items-center">
					<h2 class="mb-10 text-center text-xl">
						Thanks for creating request!
					</h2>

					<div class="flex gap-4">
						<app-button variant="secondary" @click="close">
							Create another one
						</app-button>

						<router-link
							:to="{
								name: 'userRequests',
								params: { id: user.id },
							}"
						>
							<app-button class="h-full" variant="success">
								Show my requests
							</app-button>
						</router-link>
					</div>
				</div>
			</div>
		</template>
	</app-modal>
</template>

<script setup lang="ts">
import { computed } from "vue";

import AppButton from "@/components/base/AppButton.vue";
import BackLink from "@/components/base/BackLink.vue";
import TypeLoader from "@/components/loaders/TypeLoader.vue";
import AppModal from "@/components/modals/AppModal.vue";

import { useUserStore } from "@/store/user.store.ts";

const props = defineProps<{ modelValue: boolean }>();

const { user } = useUserStore();

interface Emits {
	(e: "update:modelValue", value: boolean): void;
}

const emits = defineEmits<Emits>();

const isPopupOpen = computed({
	get() {
		return props.modelValue;
	},

	set(value) {
		emits("update:modelValue", value);
	},
});
</script>

<style scoped lang="postcss"></style>
