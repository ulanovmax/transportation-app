import type { Component } from "vue";

export interface InputProps {
	modelValue: string | number;
	debounce?: boolean;
	searchDelay?: number;
	type?: string;
	placeholder?: string;
	label?: string;
	loading?: boolean;
	icon?: Component;
	error?: string;
	required?: boolean;
	disabled?: boolean;
}

export interface InputEmits {
	(e: "update:modelValue", value: string | number): void;
	(e: "blur"): void;
}
