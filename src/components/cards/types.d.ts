import type { IRequest } from "@/ts/types/requests";

export interface CardEmits {
	(e: "select", value: IRequest): void;
	(e: "delete", value: IRequest["id"]): void;
}
