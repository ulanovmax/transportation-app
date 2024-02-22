<template>
	<back-link />

	<div>
		<div class="mb-10 flex flex-wrap items-center justify-between gap-4">
			<div class="">
				<h1 class="mb-2 flex items-center gap-2 text-xl">
					Create order

					<icon-box-seam class="text-blue-500" />
				</h1>
				<p>Please fill the form below 👇</p>
			</div>

			<type-loader />
		</div>

		<form>
			<div class="mb-5 grid grid-cols-2 gap-4">
				<search-cities-input
					label="Select departure city"
					placeholder="From"
				/>

				<search-cities-input
					label="Select where to send"
					placeholder="To"
				/>

				<app-select
					v-model="state.type"
					label="Select order category"
					:options="options"
				/>

				<app-input
					v-model="state.date"
					label="Select dispatch date"
					type="date"
				/>

				<app-textarea
					v-model="state.description"
					placeholder="What's in the box"
					class="col-span-full"
					label="Description"
				/>
			</div>

			<app-button> Create </app-button>
		</form>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { IconBoxSeam } from "@tabler/icons-vue";

import AppButton from "@/components/base/AppButton.vue";
import AppSelect from "@/components/base/AppSelect.vue";
import AppTextarea from "@/components/base/AppTextarea.vue";
import BackLink from "@/components/base/BackLink.vue";
import AppInput from "@/components/base/input/AppInput.vue";
import SearchCitiesInput from "@/components/base/SearchCitiesInput.vue";
import TypeLoader from "@/components/loaders/TypeLoader.vue";

const state = ref({
	city: "",
	type: "",
	date: "",
	description: "",
});

const options = ["Gadgets", "Medicines", "Drinks", "Clothes", "Other"];
</script>

<style scoped lang="postcss">
.form {
	form {
		margin-bottom: 10px;
	}
}
</style>
