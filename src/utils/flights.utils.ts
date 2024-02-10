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
