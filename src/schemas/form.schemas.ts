import type { ObjectSchema } from "yup";
import { number, object, string } from "yup";

import type { DeliveryForm, LoginForm, OrderForm } from "@/ts/types/forms";

export const deliverySchema: ObjectSchema<DeliveryForm> = object({
	fromCity: string().required("Please select city"),
	toCity: string().required("Please select city"),
	dateDispatch: string().required("Please select date"),
});

export const orderSchema: ObjectSchema<OrderForm> = object({
	fromCity: string().required("Please select city"),
	toCity: string().required("Please select city"),
	dateDispatch: string().required("Please select date"),
	category: string().required("Please select category"),
	description: string().optional(),
});

export const loginSchema: ObjectSchema<LoginForm> = object({
	name: string()
		.required("Please enter your name")
		.max(50)
		.matches(/[a-zA-Zа-яА-Я]/, "Name must contain letters"),
	id: number()
		.typeError("ID must be a number")
		.positive()
		.integer("ID must be an integer")
		.required("Please enter id"),
});
