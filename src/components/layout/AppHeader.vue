<template>
	<header>
		<div class="bordered py-4">
			<div class="container flex items-center justify-between">
				<app-logo />
			</div>
		</div>

		<nav class="bordered pt-6 shadow-md">
			<div class="container">
				<ul class="flex gap-4">
					<router-link
						class="link"
						:to="{ name: 'userRequests', params: { id: 1 } }"
					>
						Dashboard
					</router-link>

					<router-link class="link" :to="{ name: 'allRequests' }">
						All requests
					</router-link>
				</ul>
			</div>
		</nav>
	</header>
</template>

<script setup lang="ts">
import AppLogo from "@/components/base/logo/AppLogo.vue";
</script>

<style scoped lang="postcss">
.link {
	padding-bottom: 8px;
	transition: color 0.3s ease;
	position: relative;
	font-weight: 600;

	&:before {
		content: "";
		position: absolute;
		width: 0;
		height: 3px;
		border-radius: 8px;
		right: 0;
		bottom: 0;
		transition: 0.3s ease;
		background: var(--blue);
	}

	&.router-link-active {
		&:before {
			width: 100%;
			left: 0;
			right: auto;
		}
	}
}
</style>
