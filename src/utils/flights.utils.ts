import { crossfade } from 'svelte/transition';
import { elasticInOut, quintOut } from 'svelte/easing';
import { get } from 'svelte/store';
import { alertStore, configStore } from '$lib/flights-commons/flights.store';
import type { City, FlightSearchRequest } from '$lib/flights-commons/flights.type';

export function getFormattedWallet(wallet: number, currencySymbol: string) {
	return currencySymbol + new Intl.NumberFormat('en-IN').format(wallet);
}

export function catchError(callback: Function, params?: any, errorMesssage?: string) {
	try {
		return callback(params);
	} catch (error: any) {
		console.log(error);
		console.log(errorMesssage);
		alertStore.openAlert(errorMesssage || error, 'error');
	}
}

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
	const pattern = new RegExp(get(configStore).searchRequest.configMap.SEARCH_CITY_REGEX);
	return pattern.test(str);
}

export function cacheData(key: string, data: any, cacheTime: number) {
	localStorage.setItem(key, JSON.stringify(data));
	localStorage.setItem(key + 'CacheTime', JSON.stringify(Date.now() + cacheTime));
}

export function getCachedData(key: string) {
	const cacheTime = localStorage.getItem(key + 'CacheTime');
	if (cacheTime && parseInt(cacheTime) > Date.now()) {
		return JSON.parse(localStorage.getItem(key) || '');
	}
	return null;
}

export function cacheRecentFlightSearches(search: FlightSearchRequest) {
	const recentSearches = localStorage.getItem('recentSearches');
	if (recentSearches) {
		const searches = JSON.parse(recentSearches);
		if (
			searches.findIndex((s: FlightSearchRequest) => {
				return (
					s.src.city === search.src.city &&
					s.des.city === search.des.city &&
					s.departDate === search.departDate
				);
			}) !== -1
		) {
			return;
		}
		if (searches.length >= 5) {
			searches.pop();
		}
		searches.unshift(search);
		localStorage.setItem('recentSearches', JSON.stringify(searches));
	} else {
		localStorage.setItem('recentSearches', JSON.stringify([search]));
	}
}

export function getRecentFlightSearches() {
	const recentSearches = localStorage.getItem('recentSearches');
	if (recentSearches) {
		return JSON.parse(recentSearches);
	}
	return [];
}

export function cacheRecentCitySearches(city: City) {
	const recentSearches = localStorage.getItem('recentCitySearches');
	if (recentSearches) {
		const searches = JSON.parse(recentSearches);

		if (
			searches.findIndex((c: City) => {
				return c.city === city.city;
			}) !== -1
		) {
			return;
		}
		console.log(searches, city);
		if (searches.length >= 5) {
			searches.pop();
		}
		searches.unshift(city);
		console.log(searches, city);
		localStorage.setItem('recentCitySearches', JSON.stringify(searches));
	} else {
		localStorage.setItem('recentCitySearches', JSON.stringify([city]));
	}
}

export function getRecentCitySearches() {
	const recentSearches = localStorage.getItem('recentCitySearches');
	if (recentSearches) {
		return JSON.parse(recentSearches);
	}
	return [];
}
