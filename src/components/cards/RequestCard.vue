<template>
	<div
		class="card rounded-lg bg-white shadow-lg transition-shadow hover:shadow-2xl"
	>
		<div class="relative flex h-full flex-col">
			<div
				class="flex items-center justify-between gap-4 rounded-t-lg bg-blue-500 p-3 text-white"
			>
				<div class="flex items-center gap-4">
					<h3 class="text-lg">
						{{ data.fromCity }}
					</h3>

					<icon-truck-delivery />

					<h3 class="text-lg">
						{{ data.toCity }}
					</h3>
				</div>

				<div class="flex gap-3">
					<app-badge class="capitalize">
						{{ data.type }}
					</app-badge>

					<actions-button v-if="editable" :options="options" />
				</div>
			</div>

			<div
				class="relative flex flex-grow flex-col overflow-hidden p-3 pt-5"
			>
				<ul class="mb-5 space-y-3">
					<li
						v-if="data.user && !editable"
						class="flex items-center gap-2 text-base font-medium"
					>
						<icon-user
							:size="20"
							class="text-slate-800 opacity-50"
						/>

						{{ isOwner ? "Your request" : data.user.name }}
					</li>

					<li class="flex items-center gap-2 text-base font-medium">
						<icon-calendar-event
							:size="20"
							class="text-slate-800 opacity-50"
						/>
						{{ data.dateDispatch }}
					</li>

					<li
						v-if="data.type === RequestTypeEnums.Order"
						class="flex items-center gap-2 text-base font-medium"
					>
						<icon-category
							:size="20"
							class="text-slate-800 opacity-50"
						/>
						{{ data.category }}
					</li>

					<li class="flex items-center gap-2 text-base font-medium">
						<icon-users-group
							:size="20"
							class="text-slate-800 opacity-50"
						/>

						{{ matchingList.length }} matching {{ requestTypeName }}
					</li>
				</ul>

				<p
					v-if="data.type === RequestTypeEnums.Order"
					class="description mb-5 break-words text-base opacity-80"
				>
					{{ data.description ? data.description : "No description" }}
				</p>

				<div v-if="editable" class="mt-auto flex gap-3">
					<app-button size="sm" @click="emits('select', data)">
						Show more
					</app-button>
				</div>

				<!-- Background Icon -->
				<icon-box-seam
					v-if="data.type === RequestTypeEnums.Order"
					class="icon"
				/>

				<icon-truck-delivery
					v-else-if="data.type === RequestTypeEnums.Delivery"
					class="icon"
				/>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent } from "vue";
import {
	IconBoxSeam,
	IconCalendarEvent,
	IconCategory,
	IconEdit,
	IconTrash,
	IconTruckDelivery,
	IconUser,
	IconUsersGroup,
} from "@tabler/icons-vue";

const ActionsButton = defineAsyncComponent(
	() => import("@/components/actions-button/ActionsButton.vue")
);

import type { ActionOption } from "@/components/actions-button/types";
import AppBadge from "@/components/base/AppBadge.vue";
import AppButton from "@/components/base/AppButton.vue";

import { RequestTypeEnums } from "@/ts/enums/request-type.enums.ts";

import { useMatchingRequests } from "@/composables/useMatchingRequests.ts";
import { useRequestTypeName } from "@/composables/useRequestTypeName.ts";
import { useUserStore } from "@/store/user.store.ts";
import type { IRequest } from "@/ts/types/requests";

interface Props {
	data: IRequest;
	editable?: boolean;
}

interface Emits {
	(e: "select", value: IRequest): void;
}

const emits = defineEmits<Emits>();

const props = defineProps<Props>();

const { user } = useUserStore();

const isOwner = computed(() => props.data.user.id === user.id);

const matchingList = computed(() => {
	return useMatchingRequests(props.data);
});

const requestTypeName = computed(() => useRequestTypeName(props.data.type));

const options: ActionOption[] = [
	{
		label: "Edit",
		icon: IconEdit,
		click: () => {
			console.log("edit");
		},
	},
	{
		label: "Delete",
		icon: IconTrash,
		click: () => {
			console.log("delete");
		},
	},
];
</script>

<style scoped lang="postcss">
.icon {
	pointer-events: none;
	position: absolute;
	top: -40%;
	height: 170%;
	width: 50%;
	right: -10%;
	opacity: 0.15;
	transition: transform 0.5s ease;
	transform: translateX(0) scaleX(-1);
}

.description {
	overflow-y: auto;
	max-height: 98px;

	&::-webkit-scrollbar {
		width: 5px;
	}

	&::-webkit-scrollbar-thumb {
		background: rgba(15, 23, 42, 0.5);
		border-radius: 10px;
	}
}

.card {
	&:hover {
		.icon {
			transform: translateX(30%) scaleX(-1);
		}
	}
}
</style>
