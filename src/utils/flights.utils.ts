export function getFormattedWallet(wallet: number, currencySymbol: string) {
	return currencySymbol + new Intl.NumberFormat('en-IN').format(wallet);
}

export function catchError(callback: Function, params?: any) {
	try {
		return callback(params);
	} catch (error) {
		console.error(error);
	}
}

import { crossfade } from 'svelte/transition';
import { elasticInOut, quintOut } from 'svelte/easing';

export const [send, receive] = crossfade({
	duration: (d) => Math.sqrt(d * 10000),
	fallback(node, params) {
		const style = getComputedStyle(node);
		const transform = style.transform === 'none' ? '' : style.transform;

		return {
			duration: 1000,
			easing: elasticInOut,
			css: (t) => `
				transform: ${transform} scale(${t});
				opacity: ${t}
			`
		};
	}
});

export function getRGBColor(color: { red: number; green: number; blue: number }) {
	if (!color) return false;
	return `[rgb(${color.red}, ${color.green}, ${color.blue})]`;
}
export function getCountFromGuestType(
	guestType: string,
	passengersValues: { adultCount: number; childCount: number; infantCount: number }
) {
	if (guestType === 'ADULT') {
		return passengersValues.adultCount;
	} else if (guestType === 'CHILD') {
		return passengersValues.childCount;
	} else if (guestType === 'INFANT') {
		return passengersValues.infantCount;
	}
	return 0;
}
export function containsValidChars(str: string) {
	const pattern = /^[a-zA-Z\s]*$/;
	return pattern.test(str);
}
