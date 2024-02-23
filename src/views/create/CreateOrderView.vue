<template>
	<create-request-layout>
		<template #header>
			<h1 class="mb-2 flex items-center gap-2 text-xl">
				Create order

				<icon-box-seam class="text-blue-500" />
			</h1>
			<p>Please fill the form below 👇</p>
		</template>

		<template #form>
			<form @submit.prevent="onSubmit">
				<div class="mb-5 grid grid-cols-2 gap-4">
					<search-cities-input
						label="Select departure city"
						placeholder="From"
						:error="errors.fromCity"
						required
						:reset="isReset"
						@select="(city) => (fromCity = city)"
					/>

					<search-cities-input
						label="Select where to send"
						placeholder="To"
						:error="errors.toCity"
						required
						:reset="isReset"
						@select="(city) => (toCity = city)"
					/>

					<app-select
						v-model="category"
						label="Select order category"
						:options="orderCategories"
						:error="errors.category"
						required
					/>

					<app-input
						v-model="date"
						label="Select dispatch date"
						type="date"
						:error="errors.date"
						required
					/>

					<app-textarea
						v-model="description"
						placeholder="What's in the box"
						class="col-span-full"
						label="Description (optional)"
						:error="errors.description"
					/>
				</div>

				<app-button type="submit"> Create </app-button>
			</form>
		</template>
	</create-request-layout>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useToast } from "vue-toastification";
import { IconBoxSeam } from "@tabler/icons-vue";
import { useForm } from "vee-validate";
import { object, type ObjectSchema, string } from "yup";

import AppButton from "@/components/base/AppButton.vue";
import AppSelect from "@/components/base/AppSelect.vue";
import AppTextarea from "@/components/base/AppTextarea.vue";
import AppInput from "@/components/base/input/AppInput.vue";
import SearchCitiesInput from "@/components/base/SearchCitiesInput.vue";
import CreateRequestLayout from "@/components/layout/CreateRequestLayout.vue";

import { RequestTypeEnums } from "@/ts/enums/request-type.enums.ts";

import { storeToRefs } from "pinia";

import { useGeneratedID } from "@/composables/useGeneratedID.ts";
import { orderCategories } from "@/constants/order-categories.ts";
import { useRequestsStore } from "@/store/requests.store.ts";
import { useUserStore } from "@/store/user.store.ts";
import type { IRequest } from "@/ts/types/requests";

const requestStore = useRequestsStore();
const { requestsList } = storeToRefs(requestStore);
const { user } = useUserStore();

const toast = useToast();

interface OrderForm {
	fromCity: string;
	toCity: string;
	category: string;
	date: string;
	description?: string;
}

const schema: ObjectSchema<OrderForm> = object({
	fromCity: string().required("Please select city"),
	toCity: string().required("Please select city"),
	date: string().required("Please select date"),
	category: string().required("Please select category"),
	description: string().optional(),
});

const { handleSubmit, errors, defineField } = useForm<OrderForm>({
	validationSchema: schema,
	initialValues: {
		date: "",
		category: "",
		description: "",
	},
});

const [fromCity] = defineField("fromCity");
const [toCity] = defineField("toCity");
const [date] = defineField("date");
const [category] = defineField("category");
const [description] = defineField("description");
const isReset = ref(false);

const onSubmit = handleSubmit((values, { resetForm }) => {
	const dateNow = new Date().toISOString();
	const id = useGeneratedID();

	const request: IRequest = {
		id,
		dateCreated: dateNow,
		toCity: values.toCity,
		fromCity: values.fromCity,
		dateDispatch: values.date,
		type: RequestTypeEnums.Order,
		category: values.category,
		description: values.description,
		user: {
			id: user.id,
			name: user.name,
		},
	};

	requestsList.value.push(request);

	toast.success("Delivery request is successfully created");

	isReset.value = true;
	resetForm();
});
</script>

<style scoped lang="postcss"></style>
