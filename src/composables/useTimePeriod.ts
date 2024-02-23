import type { ComputedRef, Ref } from "vue";
import { computed } from "vue";
import {
	endOfMonth,
	endOfToday,
	endOfWeek,
	endOfYear,
	startOfMonth,
	startOfToday,
	startOfWeek,
	startOfYear,
} from "date-fns";

import { PeriodsEnums } from "@/ts/enums/periods.enums";

export interface ITimePeriod {
	from: Date;
	to: Date;
}

export const useTimePeriod = (period: PeriodsEnums) => {
	switch (period) {
		case PeriodsEnums.Day:
			return {
				from: startOfToday(),
				to: endOfToday(new Date()),
			};

		case PeriodsEnums.Week:
			return {
				from: startOfWeek(new Date()),
				to: endOfWeek(new Date()),
			};

		case PeriodsEnums.Month:
			return {
				from: startOfMonth(new Date()),
				to: endOfMonth(new Date()),
			};

		case PeriodsEnums.Year:
			return {
				from: startOfYear(new Date()),
				to: endOfYear(new Date()),
			};
	}
};
