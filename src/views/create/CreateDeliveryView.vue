<template>
	<create-request-layout>
		<template #header>
			<h1 class="mb-2 flex items-center gap-2 text-xl">
				Create delivery

				<icon-truck-delivery class="text-blue-500" />
			</h1>
			<p>Please fill the form below 👇</p>
		</template>

		<template #form>
			<form @submit.prevent="onSubmit">
				<div class="mb-5 grid gap-4">
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

					<app-input
						v-model="date"
						label="Select dispatch date"
						type="date"
						:error="errors.date"
						required
					/>
				</div>

				<app-button type="submit"> Create </app-button>
			</form>
		</template>
	</create-request-layout>
</template>

<script setup lang="ts">
import { IconTruckDelivery } from "@tabler/icons-vue";
import { useForm } from "vee-validate";
import type { ObjectSchema } from "yup";
import { object, string } from "yup";

import AppButton from "@/components/base/AppButton.vue";
import AppInput from "@/components/base/input/AppInput.vue";
import SearchCitiesInput from "@/components/base/SearchCitiesInput.vue";
import CreateRequestLayout from "@/components/layout/CreateRequestLayout.vue";

interface DeliveryForm {
	fromCity: string;
	toCity: string;
	date: string | Date;
}

const schema: ObjectSchema<DeliveryForm> = object({
	fromCity: string().required("Please select city"),
	toCity: string().required("Please select date"),
	date: string().required("Please select date"),
});

const { handleSubmit, errors, defineField } = useForm<DeliveryForm>({
	validationSchema: schema,
	initialValues: {
		date: "",
	},
});

const [fromCity] = defineField("fromCity");
const [toCity] = defineField("toCity");
const [date] = defineField("date");

const onSubmit = handleSubmit((values) => {
	console.log(values);
});
</script>

<style scoped lang="postcss"></style>
