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

console.log("test git 3")
</script>

<style lang="postcss">
@import "./assets/postcss/style.pcss";
</style>
