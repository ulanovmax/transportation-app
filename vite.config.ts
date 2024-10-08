import eslintPlugin from "@nabla/vite-plugin-eslint";
import vue from "@vitejs/plugin-vue";
import path from "path";
import { defineConfig, loadEnv } from "vite";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), "");

	return {
		plugins: [vue(), eslintPlugin()],

		// base: "/transportation-app/",

		build: {
			sourcemap: true,
		},

		css: {
			devSourcemap: true,
		},

		resolve: {
			alias: {
				"@": path.resolve(__dirname, "./src"),
				"@img": path.resolve(__dirname, "./public/images"),
			},
		},

		define: {
			"process.env.CITIES_API_KEY": JSON.stringify(env.CITIES_API_KEY),
			"process.env.SOCKETS_BAY_API_KEY": JSON.stringify(
				env.SOCKETS_BAY_API_KEY
			),
		},
	};
});
