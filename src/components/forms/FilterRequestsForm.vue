<template>
	<form class="relative mb-10" @reset="reset">
		<div class="flex gap-5">
			<app-input
				v-model="dateDispatch"
				label="Search by dispatch date"
				type="date"
				@update:model-value="emits('change', filteredRequests)"
			/>

			<app-select
				v-model="sortValue"
				placeholder="Sort by"
				label="Sorting"
				class="w-fit"
				:options="['Day', 'Week', 'Month', 'Year']"
				@update:model-value="emits('change', filteredRequests)"
			/>
		</div>

		<button
			v-show="isResetShow"
			class="hover-link fade-down absolute top-full"
			type="reset"
		>
			Reset
		</button>
	</form>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

import AppSelect from "@/components/base/AppSelect.vue";
import AppInput from "@/components/base/input/AppInput.vue";

import type { PeriodsEnums } from "@/ts/enums/periods.enums.ts";

import { storeToRefs } from "pinia";

import { useTimePeriod } from "@/composables/useTimePeriod.ts";
import { useRequestsStore } from "@/store/requests.store.ts";
import { useUserStore } from "@/store/user.store.ts";
import type { IRequest } from "@/ts/types/requests";

interface Props {
	sortByUser?: boolean;
}

interface Emits {
	(e: "change", value: IRequest[]): void;
}

const emits = defineEmits<Emits>();
const props = defineProps<Props>();

const dateDispatch = ref("");
const sortValue = ref<PeriodsEnums | "">("");

const isResetShow = computed(() => dateDispatch.value || sortValue.value);

const requestsStore = useRequestsStore();
const { requestsList } = storeToRefs(requestsStore);

const { user } = useUserStore();

const reset = () => {
	sortValue.value = "";
	dateDispatch.value = "";

	emits("change", filteredRequests.value);
};

const filteredRequests = computed<IRequest[]>(() => {
	let requests: IRequest[] = requestsList.value;

	if (props.sortByUser) {
		requests = requestsList.value.filter(
			(item) => item.user.id === user.id
		);
	}

	if (sortValue.value) {
		const { from, to } = useTimePeriod(sortValue.value);

		requests = [
			...requests.filter(
				(item) =>
					new Date(item.dateCreated) <= new Date(to) &&
					new Date(item.dateCreated) >= new Date(from)
			),
		];
	}

	if (dateDispatch.value) {
		return requests.filter(
			(request) => request.dateDispatch === dateDispatch.value
		);
	}

	return requests;
});
</script>

<style scoped lang="postcss"></style>
