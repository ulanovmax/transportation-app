/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx,.module.js,scss}"],
	theme: {
		extend: {
			transitionDuration: {
				DEFAULT: "300ms",
			},

			screens: {
				xs: "551px",
			},
		},
	},
	plugins: [],
	corePlugins: {
		container: false,
	},
};
