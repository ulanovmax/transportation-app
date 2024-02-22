<template>
	<div class="rounded-lg bg-white shadow-lg">
		<div class="relative">
			<div
				class="flex items-center justify-between gap-4 rounded-t-lg bg-blue-500 p-3 text-white"
			>
				<div class="flex items-center gap-4">
					<h3 class="text-lg">
						{{ fromCity }}
					</h3>

					<icon-truck-delivery />

					<h3 class="text-lg">
						{{ toCity }}
					</h3>
				</div>

				<div class="flex gap-3">
					<app-badge class="capitalize">
						{{ type }}
					</app-badge>

					<actions-button :options="options" />
				</div>
			</div>

			<div class="relative overflow-hidden p-3 pt-5">
				<ul class="mb-5 space-y-3">
					<li class="flex items-center gap-2 text-base font-medium">
						<icon-calendar-event
							:size="20"
							class="text-slate-800 opacity-50"
						/>
						{{ date }}
					</li>

					<li class="flex items-center gap-2 text-base font-medium">
						<icon-category
							:size="20"
							class="text-slate-800 opacity-50"
						/>
						{{ category }}
					</li>
				</ul>

				<p class="break-words text-base opacity-80">
					{{ description ?? "No description" }}
				</p>

				<div class="mt-5 flex gap-3">
					<app-button size="sm"> Show more </app-button>
				</div>

				<!-- Background Icon -->
				<icon-box-seam
					v-if="type === RequestTypeEnums.Order"
					class="icon"
				/>

				<icon-truck-delivery
					v-else-if="type === RequestTypeEnums.Delivery"
					class="icon"
				/>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import {
	IconBoxSeam,
	IconCalendarEvent,
	IconCategory,
	IconEdit,
	IconTrash,
	IconTruckDelivery,
} from "@tabler/icons-vue";

import ActionsButton from "@/components/actions-button/ActionsButton.vue";
import type { ActionOption } from "@/components/actions-button/types";
import AppBadge from "@/components/base/AppBadge.vue";
import AppButton from "@/components/base/AppButton.vue";

import { RequestTypeEnums } from "@/ts/enums/request-type.enums.ts";

import type { IRequestCard } from "@/ts/types/requests";

defineProps<IRequestCard>();

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
	@apply pointer-events-none absolute -right-20 -top-20 h-96 w-96 opacity-15;
}
</style>
