export const useDateFormat = (
	date: string | Date,
	options: Intl.DateTimeFormatOptions = { dateStyle: "medium" }
) => {
	return new Intl.DateTimeFormat("en-US", options).format(
		typeof date === "string" ? new Date(date) : date
	);
};
