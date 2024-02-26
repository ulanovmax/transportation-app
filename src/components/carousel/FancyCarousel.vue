<template>
	<div>
		<div ref="carousel" class="carousel">
			<slot></slot>
		</div>
	</div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { Carousel } from "@fancyapps/ui";
import type { OptionsType } from "@fancyapps/ui/types/Carousel/options";

import "@fancyapps/ui/dist/carousel/carousel.css";

interface Props {
	carouselOptions?: Partial<OptionsType>;
}

type CarouselElement = HTMLElement | string | null;

const props = defineProps<Props>();

const carousel = ref<CarouselElement>(null);

const options = Object.assign(props.carouselOptions ?? {}, {
	center: false,
	adaptiveHeight: true,
});

onMounted(() => new Carousel(carousel.value, options));
</script>

<style lang="postcss">
.f-carousel {
	--f-carousel-dots-height: 50px;
}

.f-carousel__viewport {
	overflow: visible;
}
</style>
