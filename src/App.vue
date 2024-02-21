<template>
	<router-view></router-view>
</template>

<script setup lang="ts">
// VH calc for true value
const calcVh = () => {
	const vh = window.innerHeight * 0.01;
	document.documentElement.style.setProperty("--vh", `${vh}px`);
};

calcVh();

window.addEventListener("resize", () => calcVh());
</script>

<style lang="postcss">
body {
	font-family: "Inter", sans-serif;
	font-weight: 400;
}

a,
span,
label {
	display: inline-block;
}

h1,
h2,
h3,
h4,
h5,
h6 {
	font-weight: 700;
}
</style>
