import { RequestTypeEnums } from "@/ts/enums/request-type.enums.ts";

import { useRequestsStore } from "@/store/requests.store.ts";
import { useUserStore } from "@/store/user.store.ts";
import type { IRequest } from "@/ts/types/requests";

export const useMatchingRequests = (request: IRequest): IRequest[] => {
	const { requestsList } = useRequestsStore();
	const { user } = useUserStore();

	return requestsList.filter((item) => {
		const selectedRequestDate = new Date(request.dateDispatch);
		const otherRequestDate = new Date(item.dateDispatch);

		return (
			item.user.id !== user.id &&
			request.toCity === item.toCity &&
			request.fromCity === item.fromCity &&
			request.type !== item.type &&
			(request.type === RequestTypeEnums.Delivery
				? selectedRequestDate <= otherRequestDate
				: selectedRequestDate >= otherRequestDate)
		);
	});
};
