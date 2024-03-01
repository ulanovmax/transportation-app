import { reactive } from "vue";

export const state = reactive({
	connected: false,
});

const url = `wss://socketsbay.com/wss/v2/2/${process.env.SOCKETS_BAY_API_KEY}/`;
export const socket = new WebSocket(url);

socket.onopen = () => (state.connected = true);

socket.onclose = () => (state.connected = false);
