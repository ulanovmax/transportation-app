import eslintPlugin from "@nabla/vite-plugin-eslint";
import vue3 from "@vitejs/plugin-vue";
import path from "path";
import { defineConfig, loadEnv } from "vite";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), "");

	return {
		plugins: [vue3(), eslintPlugin()],

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
				"@public": path.resolve(__dirname, "./public"),
			},
		},

		define: {
			"process.env.CITIES_API_KEY": JSON.stringify(env.CITIES_API_KEY),
		},
	};
});
