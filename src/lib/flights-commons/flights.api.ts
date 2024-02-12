import { get } from 'svelte/store';
import { loadingStore } from './flights.store';
import type { ConfigResponse, FlightSearchRequest } from './flights.type';
import { cacheData, getCachedData } from '../../utils/flights.utils';
const errorCodes = [400, 401, 402, 403, 404];
const errorMesssage: any = {
	401: 'Unauthorized User',
	404: 'Not Found'
};
async function fetchWithToken(url: string, method: string, body: any) {
	if (loadingStore) loadingStore.start();
	const token = import.meta.env.VITE_TOKEN;
	let headers: HeadersInit = {
		'Content-Type': 'application/json',
		Authorization: `Bearer ${token}`
	};
	let res = await fetch(url, {
		method,
		headers,
		body: JSON.stringify(body)
	});
	if (errorCodes.includes(res.status)) {
		throw new Error(errorMesssage[res.status] || 'Something Went Wrong');
	}
	let data = await res.json();
	console.log(data);
	if (loadingStore) loadingStore.stop();
	return data;
}

const landingPageConfigURL =
	'https://uat-web.gonuclei.com/com.gonuclei.flights.v1.LandingService/getConfig';

export async function getConfig() {
	const cachedData = getCachedData('landingPageConfig');
	if (cachedData !== null) {
		return cachedData;
	}
	const data: ConfigResponse = await fetchWithToken(landingPageConfigURL, 'POST', {});
	console.log(data.searchRequest.configMap.CACHING_TIME_IN_MILLISECOND, 'cache time in ms');
	cacheData(
		'landingPageConfig',
		data,
		parseInt(data?.searchRequest?.configMap?.CACHING_TIME_IN_MILLISECOND)
	);
	return data;
}

const walletURL =
	'https://uat-web.gonuclei.com/com.gonuclei.commonservice.v1.CommonService/GetUserWallet';

export async function getWallet() {
	const data = await fetchWithToken(walletURL, 'POST', {});
	return data;
}

const upcommingBookingURL =
	'https://uat-web.gonuclei.com/com.gonuclei.flights.v1.FlightTicketService/GetAllBookings';

export async function getUpcomingBookings() {
	const data = await fetchWithToken(upcommingBookingURL, 'POST', {
		requestType: 'UPCOMING',
		paginationRequest: {
			pageNumberToGet: 0,
			resultsPerPage: 5
		}
	});
	return data;
}

const popularCitiesURL =
	'https://uat-web.gonuclei.com/com.gonuclei.flights.v1.LandingService/getPopularCities';

export async function getPopularCities() {
	const data = await fetchWithToken(popularCitiesURL, 'POST', {});
	return data;
}

const searchCity =
	'https://uat-web.gonuclei.com/com.gonuclei.flights.v1.LandingService/getAirportSearchResults';

export async function getSearchCity(searchString: string) {
	const data = await fetchWithToken(searchCity, 'POST', {
		searchText: searchString
	});
	return data;
}

const searchFlightURL =
	'https://uat-web.gonuclei.com/com.gonuclei.flights.v1.ListingService/GetFlightsSearchListV2';

export async function searchFlight(request: FlightSearchRequest) {
	const data = await fetchWithToken(searchFlightURL, 'POST', request);
	return data;
}
