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
			<request-form
				:type="RequestTypeEnums.Delivery"
				button-label="Create"
				@submit="onSubmit"
			/>
		</template>
	</create-request-layout>
</template>

<script setup lang="ts">
import { useToast } from "vue-toastification";
import { IconTruckDelivery } from "@tabler/icons-vue";

import RequestForm from "@/components/forms/RequestForm.vue";
import CreateRequestLayout from "@/components/layout/CreateRequestLayout.vue";

import { RequestTypeEnums } from "@/ts/enums/request-type.enums.ts";

import { storeToRefs } from "pinia";

import { useGeneratedID } from "@/composables/useGeneratedID.ts";
import { useRequestsStore } from "@/store/requests.store.ts";
import { useUserStore } from "@/store/user.store.ts";
import type { OrderForm } from "@/ts/types/forms";
import type { IRequest } from "@/ts/types/requests";

const { user } = useUserStore();
const requestStore = useRequestsStore();
const { requestsList } = storeToRefs(requestStore);

const toast = useToast();

const onSubmit = (values: OrderForm) => {
	const dateNow = new Date().toISOString();
	const id = useGeneratedID();

	const request: IRequest = {
		id,
		dateCreated: dateNow,
		toCity: values.toCity,
		fromCity: values.fromCity,
		dateDispatch: values.dateDispatch,
		type: RequestTypeEnums.Delivery,
		user: {
			id: user.id,
			name: user.name,
		},
	};

	requestsList.value.push(request);

	toast.success("Delivery request is successfully created");
};
</script>

<style scoped lang="postcss"></style>
