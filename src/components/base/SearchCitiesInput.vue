<template>
	<div ref="searchContainer" class="relative">
		<app-input
			v-model="searchValue"
			debounce
			:label="label"
			:placeholder="placeholder"
			:loading="isLoading"
			:icon="IconMapPin"
			@update:model-value="onInput"
		/>

		<div
			v-show="isDropdownShow"
			class="dropdown slide-down bordered absolute right-0 z-20 w-full overflow-hidden rounded-md shadow-lg"
		>
			<ul class="dropdown__list overflow-y-auto">
				<template v-if="cities.length > 0">
					<li
						v-for="city in cities"
						:key="city.latitude"
						class="flex cursor-pointer items-center gap-3 border-b border-solid border-b-slate-200 bg-white px-3 py-1.5 transition-colors hover:bg-slate-300"
						@click="onSelect(city)"
					>
						<icon-map-pin size="16" class="opacity-40" />
						<span class="capitalize">
							{{ city.name }}
							({{ city.country }})
						</span>
					</li>
				</template>

				<li
					v-else
					class="border-b border-solid border-b-slate-200 px-3 py-1.5"
				>
					<span class="opacity-60"> No city found... </span>
				</li>
			</ul>
		</div>
	</div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import { useToast } from "vue-toastification";
import { IconMapPin } from "@tabler/icons-vue";

import AppInput from "@/components/base/input/AppInput.vue";

import { getCities } from "@/api/get-cities.api.ts";
import { useClickEvent } from "@/composables/useClickEvent.ts";
import type { ICity } from "@/ts/types/cities";

interface Props {
	label?: string;
	placeholder?: string;
}

interface Emits {
	(e: "select", value: ICity): void;
}

defineProps<Props>();
const emits = defineEmits<Emits>();

const toast = useToast();

const searchValue = ref("");
const searchContainer = ref<HTMLDivElement | null>(null);
const isDropdownShow = ref(false);
const isLoading = ref(false);
const cities = ref<ICity[]>([]);

const onInput = async () => {
	if (!searchValue.value) return;

	isLoading.value = true;

	try {
		cities.value = await getCities(searchValue.value);
		isDropdownShow.value = true;
	} catch (err) {
	} finally {
		isLoading.value = false;
	}
};

const onSelect = (city) => {
	searchValue.value = city.name;
	emits("select", city);

	isDropdownShow.value = false;
};

const setClickEvent = (e: Event) =>
	useClickEvent(e, searchContainer.value, () => {
		isDropdownShow.value = false;
	});

onMounted(() => {
	document.addEventListener("click", setClickEvent);
});

onUnmounted(() => {
	document.removeEventListener("click", setClickEvent);
});
</script>

<style scoped lang="postcss">
.dropdown {
	top: calc(100% + 10px);
}

.dropdown__list {
	max-height: 147px;
}
</style>
