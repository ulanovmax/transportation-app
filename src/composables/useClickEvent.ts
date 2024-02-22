export function useClickEvent(
	event: Event,
	element: HTMLDivElement | null,
	callback: () => void
) {
	if (
		(event.target as HTMLDivElement) !== element &&
		!element?.contains(event.target as Node)
	) {
		callback();
	}
}
