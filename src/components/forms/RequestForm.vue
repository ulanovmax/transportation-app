<template>
	<form @submit.prevent="onSubmit">
		<div
			class="mb-5 grid gap-4"
			:class="{
				'grid-cols-1': type === RequestTypeEnums.Delivery,
				'grid-cols-2 max-xs:grid-cols-1':
					type === RequestTypeEnums.Order,
			}"
		>
			<search-cities-input
				label="Select departure city"
				placeholder="From"
				:error="errors.fromCity"
				required
				:reset="isReset"
				:default-value="fromCity"
				@select="(city) => (fromCity = city)"
			/>

			<search-cities-input
				label="Select where to send"
				placeholder="To"
				:error="errors.toCity"
				required
				:reset="isReset"
				:default-value="toCity"
				@select="(city) => (toCity = city)"
			/>

			<app-select
				v-if="type === RequestTypeEnums.Order"
				v-model="category"
				label="Select order category"
				placeholder="Select category"
				:options="orderCategories"
				:error="errors.category"
				required
			/>

			<app-input
				v-model="dateDispatch"
				label="Select dispatch date"
				:icon="IconCalendarEvent"
				type="date"
				:error="errors.dateDispatch"
				required
			/>

			<app-textarea
				v-if="type === RequestTypeEnums.Order"
				v-model="description"
				placeholder="What's in the box"
				class="col-span-full"
				label="Description (optional)"
				:error="errors.description"
			/>
		</div>

		<app-button :disabled="isDisabled" type="submit">
			{{ buttonLabel }}
		</app-button>
	</form>
</template>

<script setup lang="ts">
import type { Ref } from "vue";
import { computed, ref } from "vue";
import { useToast } from "vue-toastification";
import { IconCalendarEvent } from "@tabler/icons-vue";
import type { BaseFieldProps, GenericObject } from "vee-validate";
import { useForm } from "vee-validate";
import type { ObjectSchema } from "yup";

import AppButton from "@/components/base/AppButton.vue";
import AppSelect from "@/components/base/AppSelect.vue";
import AppTextarea from "@/components/base/AppTextarea.vue";
import AppInput from "@/components/base/input/AppInput.vue";
import SearchCitiesInput from "@/components/base/SearchCitiesInput.vue";

import { RequestTypeEnums } from "@/ts/enums/request-type.enums.ts";

import { orderCategories } from "@/constants/order-categories.ts";
import { deliverySchema, orderSchema } from "@/schemas/form.schemas.ts";
import { useRequestsStore } from "@/store/requests.store.ts";
import type { DeliveryForm, OrderForm } from "@/ts/types/forms";

interface Emits {
	(e: "submit", value: OrderForm): void;
}

interface Props {
	type: RequestTypeEnums;
	defaultValues?: OrderForm;
	buttonLabel: string;
}

// For validation fields
type ValidateTuple = [Ref<string>, Ref<BaseFieldProps & GenericObject>];

const props = defineProps<Props>();
const emits = defineEmits<Emits>();

const { defaultValues } = props;

const { isRequestExist } = useRequestsStore();

const initialValues: OrderForm = {
	fromCity: defaultValues?.fromCity ?? "",
	toCity: defaultValues?.toCity ?? "",
	dateDispatch:
		defaultValues?.dateDispatch ?? new Date().toISOString().split("T")[0],
	description: defaultValues?.description ?? "",
	category: defaultValues?.category ?? "",
};

const isDisabled = computed(() => {
	if (!defaultValues) return;

	// For enable editing
	const mainCondition =
		defaultValues.dateDispatch === dateDispatch.value &&
		defaultValues.fromCity === fromCity.value &&
		defaultValues.toCity === toCity.value;

	const orderCondition =
		defaultValues.description === description.value &&
		defaultValues.category === category.value;

	return props.type === RequestTypeEnums.Order
		? mainCondition && orderCondition
		: mainCondition;
});

const isReset = ref(false);

const schema: ObjectSchema<OrderForm | DeliveryForm> =
	props.type === RequestTypeEnums.Order ? orderSchema : deliverySchema;

const { handleSubmit, errors, defineField } = useForm<OrderForm>({
	validationSchema: schema,
	initialValues,
});

const [fromCity] = defineField("fromCity");
const [toCity] = defineField("toCity");
const [dateDispatch] = defineField("dateDispatch");
const [category] = defineField("category") as ValidateTuple;
const [description] = defineField("description") as ValidateTuple;

const toast = useToast();

const onSubmit = handleSubmit((values, { resetForm }) => {
	if (values.fromCity === values.toCity) {
		toast.error("The cities cannot be the same");

		return;
	}

	// If request already exist
	if (isRequestExist(values, props.type)) {
		toast.error("The request is already exist");

		return;
	}

	emits("submit", values);

	isReset.value = true;

	resetForm();
});
</script>

<style scoped lang="postcss"></style>
