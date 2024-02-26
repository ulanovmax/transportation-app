<template>
	<template v-if="requests.length > 0">
		<div class="grid auto-rows-fr grid-cols-2 gap-5 max-md:grid-cols-1">
			<request-card
				v-for="card in requests"
				:key="card.id"
				:editable="editable"
				:data="card"
				@select="(item: IRequest) => emits('select', item)"
				@delete="(id: IRequest['id']) => emits('delete', id)"
			/>
		</div>
	</template>

	<not-found v-else msg="No requests found" />
</template>

<script setup lang="ts">
import NotFound from "@/components/base/NotFound.vue";
import RequestCard from "@/components/cards/RequestCard.vue";
import type { CardEmits } from "@/components/cards/types";

import type { IRequest } from "@/ts/types/requests";
interface Props {
	requests: IRequest[];
	editable?: boolean;
}

const emits = defineEmits<CardEmits>();

defineProps<Props>();
</script>

<style scoped lang="postcss"></style>
