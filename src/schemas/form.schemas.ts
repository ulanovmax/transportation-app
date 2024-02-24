import type { ObjectSchema } from "yup";
import { object, string } from "yup";

import type { DeliveryForm, OrderForm } from "@/ts/types/forms";

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
