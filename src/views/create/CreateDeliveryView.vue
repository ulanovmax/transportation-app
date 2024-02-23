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
import { ref } from "vue";
import { useToast } from "vue-toastification";
import { IconTruckDelivery } from "@tabler/icons-vue";
import { useForm } from "vee-validate";
import type { ObjectSchema } from "yup";
import { object, string } from "yup";

import AppButton from "@/components/base/AppButton.vue";
import AppInput from "@/components/base/input/AppInput.vue";
import SearchCitiesInput from "@/components/base/SearchCitiesInput.vue";
import CreateRequestLayout from "@/components/layout/CreateRequestLayout.vue";

import { RequestTypeEnums } from "@/ts/enums/request-type.enums.ts";

import { storeToRefs } from "pinia";

import { useGeneratedID } from "@/composables/useGeneratedID.ts";
import { useRequestsStore } from "@/store/requests.store.ts";
import { useUserStore } from "@/store/user.store.ts";
import type { IRequest } from "@/ts/types/requests";

const { user } = useUserStore();
const requestStore = useRequestsStore();
const { requestsList } = storeToRefs(requestStore);

const toast = useToast();

interface DeliveryForm {
	fromCity: string;
	toCity: string;
	date: string;
}

const schema: ObjectSchema<DeliveryForm> = object({
	fromCity: string().required("Please select city"),
	toCity: string().required("Please select city"),
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
		type: RequestTypeEnums.Delivery,
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
