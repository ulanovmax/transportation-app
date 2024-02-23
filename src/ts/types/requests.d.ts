import type { RequestTypeEnums } from "@/ts/enums/request-type.enums.ts";

import type { IUser } from "@/ts/types/users";

interface IRequestCard {
	user: IUser;
	id: number;
	fromCity: string;
	toCity: string;
	type: RequestTypeEnums;
	date: string;
	category?: string;
	description?: string;
}

export type { IRequestCard };
