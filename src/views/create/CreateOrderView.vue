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
						@select="(city) => (fromCity = city)"
					/>

					<search-cities-input
						label="Select where to send"
						placeholder="To"
						:error="errors.toCity"
						required
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
import { IconBoxSeam } from "@tabler/icons-vue";
import { useForm } from "vee-validate";
import { object, type ObjectSchema, string } from "yup";

import AppButton from "@/components/base/AppButton.vue";
import AppSelect from "@/components/base/AppSelect.vue";
import AppTextarea from "@/components/base/AppTextarea.vue";
import AppInput from "@/components/base/input/AppInput.vue";
import SearchCitiesInput from "@/components/base/SearchCitiesInput.vue";
import CreateRequestLayout from "@/components/layout/CreateRequestLayout.vue";

import { orderCategories } from "@/constants/order-categories.ts";

interface OrderForm {
	fromCity: string;
	toCity: string;
	category: string;
	date: string | Date;
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

const onSubmit = handleSubmit((values) => {
	console.log(values);
});
</script>

<style scoped lang="postcss"></style>
