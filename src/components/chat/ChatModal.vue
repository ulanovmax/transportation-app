<template>
	<app-modal v-model="isOpen">
		<template #header>
			<h3 class="text-lg">Chat</h3>
		</template>

		<div class="min-h-44 overflow-y-auto">
			<div class="flex flex-col gap-4">
				<div
					v-for="msg in messages"
					:key="msg.message"
					class="w-1/3 rounded-md bg-slate-200 p-2 font-semibold"
					:class="{
						'ml-auto !bg-blue-400 text-white':
							user.name === msg.sender,
					}"
				>
					{{ msg.message }}
				</div>
			</div>
		</div>

		<app-input
			v-model="messageValue"
			placeholder="Write a message..."
			@enter="sendMessage"
		/>
	</app-modal>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";

import AppInput from "@/components/base/input/AppInput.vue";
import AppModal from "@/components/modals/AppModal.vue";

import { useUserStore } from "@/store/user.store.ts";
import { socket } from "@/ws/socket.ts";

interface Props {
	modelValue: boolean;
}

interface Emits {
	(e: "update:modelValue", value: Props["modelValue"]): void;
}

interface IMessage {
	message: string;
	sender: string;
}

const props = defineProps<Props>();
const emits = defineEmits<Emits>();

const messages = ref<IMessage[]>([]);

const { user } = useUserStore();

const isOpen = computed({
	get() {
		return props.modelValue;
	},

	set(value) {
		emits("update:modelValue", value);
	},
});

const messageValue = ref("");

const onMessage = (msg: MessageEvent<string>) => {
	const response: IMessage = JSON.parse(msg.data);

	messages.value.push(response);
};

const sendMessage = () => {
	const readyMsg: IMessage = {
		message: messageValue.value,
		sender: user.name,
	};

	// socket.emit("add-message", readyMsg);

	socket.send(JSON.stringify(readyMsg));

	messages.value.push(readyMsg);
	messageValue.value = "";
};

socket.onmessage = onMessage;
</script>

<style scoped lang="postcss"></style>
