<template>
	<div class="spinner">
		<span></span>
		<span></span>
		<span></span>
	</div>
</template>

<script setup lang="ts"></script>

<style scoped lang="postcss">
.spinner {
	--gap: 6px;
	/* gap between each circle */
	display: flex;
	justify-content: center;
	align-items: center;
	gap: var(--gap);
}

.spinner span {
	width: 8px;
	height: 8px;
	border-radius: 100%;
	background-color: var(--blue);
	opacity: 0;
}

.spinner span:nth-child(1) {
	animation: fade 1s ease-in-out infinite;
}

.spinner span:nth-child(2) {
	animation: fade 1s ease-in-out 0.33s infinite;
}

.spinner span:nth-child(3) {
	animation: fade 1s ease-in-out 0.66s infinite;
}

@keyframes fade {
	0%,
	100% {
		opacity: 1;
	}

	60% {
		opacity: 0;
	}
}
</style>
