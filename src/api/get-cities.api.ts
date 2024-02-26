import axios from "axios";

import { useThrowError } from "@/composables/useThrowError.ts";
import type { ICity } from "@/ts/types/cities";

export const getCities = async (name: string, limit: number = 10) => {
	try {
		const res = await axios.get<ICity[]>(
			`https://api.api-ninjas.com/v1/city?name=${name}&limit=${limit}`,
			{
				headers: {
					"X-Api-Key": process.env.CITIES_API_KEY,
				},
			}
		);

		return res.data;
	} catch (err) {
		useThrowError(err);
	}
};
