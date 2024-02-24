<template>
	<form @submit.prevent="onSubmit">
		<div
			class="mb-5 grid grid-cols-2 gap-4"
			:class="{
				'grid-cols-1': type === RequestTypeEnums.Delivery,
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
import { computed, ref } from "vue";
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
import type { DeliveryForm, OrderForm } from "@/ts/types/forms";

interface Emits {
	(e: "submit", value: OrderForm): void;
}

interface Props {
	type: RequestTypeEnums;
	defaultValues?: OrderForm;
	buttonLabel: string;
}

const props = defineProps<Props>();
const emits = defineEmits<Emits>();

const { defaultValues } = props;

const initialValues: OrderForm = {
	fromCity: defaultValues?.fromCity ?? "",
	toCity: defaultValues?.toCity ?? "",
	dateDispatch: defaultValues?.dateDispatch ?? "",
	description: defaultValues?.description ?? "",
	category: defaultValues?.category ?? "",
};

const isDisabled = computed(() => {
	if (!defaultValues) return;

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
const [category] = defineField("category");
const [description] = defineField("description");

const onSubmit = handleSubmit((values, { resetForm }) => {
	emits("submit", values);
	isReset.value = true;
	resetForm();
});
</script>

<style scoped lang="postcss"></style>
