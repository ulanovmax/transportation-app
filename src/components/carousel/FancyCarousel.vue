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
import type { OptionsType as ICarouselOptions } from "@fancyapps/ui/types/Carousel/options";

import "@fancyapps/ui/dist/carousel/carousel.css";

interface Props {
	carouselOptions?: Partial<ICarouselOptions>;
}

const props = defineProps<Props>();

const carousel = ref<typeof Carousel | null>(null);

const options = Object.assign(props.carouselOptions ?? {}, {
	center: false,
	adaptiveHeight: true,
});

onMounted(async () => {
	const constructorOptions = [carousel.value, options];

	const { Thumbs } = await import(
		"@fancyapps/ui/dist/carousel/carousel.thumbs.esm.js"
	);
	await import("@fancyapps/ui/dist/carousel/carousel.thumbs.css");

	constructorOptions.push({ Thumbs });

	new Carousel(...constructorOptions);
});
</script>

<style lang="postcss">
.f-carousel {
	--f-carousel-dots-height: 50px;
}

.f-carousel__viewport {
	overflow: visible;
}
</style>
