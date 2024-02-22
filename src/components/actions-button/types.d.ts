import type { Component } from "vue";

export interface ActionOption {
	label: string;
	icon?: Component;
	click: () => void;
}
