import eslintPlugin from "@nabla/vite-plugin-eslint";
import vue from "@vitejs/plugin-vue";
import path from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue(), eslintPlugin()],

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
});
