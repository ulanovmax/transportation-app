import { string } from "yup";

import type { IRequest } from "@/ts/types/requests";

export interface OrderForm
	extends Omit<IRequest, "id" | "type" | "user" | "dateCreated"> {}

export interface DeliveryForm
	extends Omit<OrderForm, "description" | "category"> {}
