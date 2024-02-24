<template>
	<app-modal v-model="isOpen">
		<template #header>
			<div class="flex items-center gap-3">
				<h3 class="text-xl">Edit request</h3>

				<icon-edit class="opacity-60" />
			</div>
		</template>

		<request-form
			:default-values="initialState"
			:type="data.type"
			button-label="Update"
			@submit="onSubmit"
		/>
	</app-modal>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useToast } from "vue-toastification";
import { IconEdit } from "@tabler/icons-vue";

import RequestForm from "@/components/forms/RequestForm.vue";
import AppModal from "@/components/modals/AppModal.vue";

import { RequestTypeEnums } from "@/ts/enums/request-type.enums.ts";

import { useRequestsStore } from "@/store/requests.store.ts";
import type { OrderForm } from "@/ts/types/forms";
import type { IRequest } from "@/ts/types/requests";

const { editExistedRequest } = useRequestsStore();

const toast = useToast();

interface Props {
	data: IRequest;
	modelValue: boolean;
}

interface Emits {
	(e: "update:modelValue", value: Props["modelValue"]): void;
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

const initialState: OrderForm = {
	fromCity: props.data.fromCity,
	toCity: props.data.toCity,
	dateDispatch: props.data.dateDispatch,
	category: props.data.category,
	description: props.data.description,
};

const onSubmit = (values: OrderForm) => {
	const { dateDispatch, fromCity, toCity } = values;

	const updatedRequest: OrderForm = {
		dateDispatch,
		fromCity,
		toCity,
	};

	if (props.data.type === RequestTypeEnums.Order) {
		updatedRequest.description = values.description;
		updatedRequest.category = values.category;
	}

	console.log(updatedRequest);

	editExistedRequest(props.data.id, updatedRequest);

	toast.success("Request is successfully updated");

	isOpen.value = false;
};
</script>

<style scoped lang="postcss"></style>
