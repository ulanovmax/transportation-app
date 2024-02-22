import type { RequestTypeEnums } from "@/ts/enums/request-type.enums.ts";

interface IRequestCard {
	id: number;
	fromCity: string;
	toCity: string;
	type: RequestTypeEnums;
	date: string;
	category: string;
	description?: string;
}

export type { IRequestCard };
