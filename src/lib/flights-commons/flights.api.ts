import type { FlightSearchRequest } from './flights.type';

async function fetchWithToken(url: string, method: string, body: any) {
	const token = import.meta.env.VITE_TOKEN;
	let headers: HeadersInit = {
		'Content-Type': 'application/json',
		Authorization: `Bearer ${token}`
	};
	return fetch(url, {
		method,
		headers,
		body: JSON.stringify(body)
	});
}
const landingPageConfigURL =
	'https://uat-web.gonuclei.com/com.gonuclei.flights.v1.LandingService/getConfig';

export async function getConfig() {
	const response = await fetchWithToken(landingPageConfigURL, 'POST', {});
	const data = await response.json();
	return data;
}

const walletURL =
	'https://uat-web.gonuclei.com/com.gonuclei.commonservice.v1.CommonService/GetUserWallet';

export async function getWallet() {
	const response = await fetchWithToken(walletURL, 'POST', {});
	const data = await response.json();
	return data;
}

const upcommingBookingURL =
	'https://uat-web.gonuclei.com/com.gonuclei.flights.v1.FlightTicketService/GetAllBookings';

export async function getUpcomingBookings() {
	const response = await fetchWithToken(upcommingBookingURL, 'POST', {
		requestType: 'UPCOMING',
		paginationRequest: {
			pageNumberToGet: 0,
			resultsPerPage: 5
		}
	});
	const data = await response.json();
	return data;
}

const popularCitiesURL =
	'https://uat-web.gonuclei.com/com.gonuclei.flights.v1.LandingService/getPopularCities';

export async function getPopularCities() {
	const response = await fetchWithToken(popularCitiesURL, 'POST', {});
	const data = await response.json();
	return data;
}

const searchCity =
	'https://uat-web.gonuclei.com/com.gonuclei.flights.v1.LandingService/getAirportSearchResults';

export async function getSearchCity(searchString: string) {
	const response = await fetchWithToken(searchCity, 'POST', {
		searchText: searchString
	});
	const data = await response.json();
	return data;
}

const searchFlightURL =
	'https://uat-web.gonuclei.com/com.gonuclei.flights.v1.ListingService/GetFlightsSearchListV2';

export async function searchFlight(request: FlightSearchRequest) {
	const response = await fetchWithToken(searchFlightURL, 'POST', request);
	const data = await response.json();
	return data;
}
