import { get, writable } from 'svelte/store';
import {
	getConfig,
	getPopularCities,
	getSearchCity,
	getUpcomingBookings,
	getWallet,
	searchFlight
} from './flights.api';
import type {
	AirportListResponse,
	City,
	ConfigResponse,
	FlightSearchRequest,
	FlightSearchResponse,
	WalletResponse
} from './flights.type';
import dayjs from 'dayjs';
import { catchError } from '../../utils/flights.utils';

const createLoadingStore = () => {
	const { subscribe, set, update } = writable(false);
	return {
		subscribe,
		set,
		update,
		start: () => {
			set(true);
		},
		stop: () => {
			set(false);
		}
	};
};

export const loadingStore = createLoadingStore();

async function createConfigStore() {
	const data: ConfigResponse = await catchError(getConfig);
	const { subscribe, set, update } = writable<ConfigResponse>(data);
	const searchRequest = data.searchRequest;
	return {
		subscribe,
		set,
		update,
		getDepartDate: () => {
			return searchRequest.departDate;
		},
		getDest: () => {
			return searchRequest.des;
		},
		getSrc: () => {
			return searchRequest.src;
		},
		getReturnDate: () => {
			return dayjs(parseInt(searchRequest.returnDate) * 1);
		},
		getTravellersCount: () => {
			const { adultCount, childCount, infantCount } = searchRequest;
			return adultCount + childCount + infantCount;
		},
		isRoundTrip: () => {
			return searchRequest.isRoundTrip;
		},
		getPartnerCountry: () => {
			return searchRequest.partnerCountry;
		},
		getPartnerCurrency: () => {
			return searchRequest.partnerCurrency;
		},
		getDefaultTravellerClass: () => {
			let travellerClass = searchRequest.travellerClass.toLocaleUpperCase();
			let travellerClassObj = searchRequest.travellers.find(
				(traveller) => traveller.key === travellerClass
			);
			if (travellerClassObj === undefined) {
				travellerClassObj = searchRequest.travellers[0];
			}

			return travellerClassObj;
		},
		getGuests: () => {
			return searchRequest.guests;
		},
		getTravellerClasses: () => {
			return searchRequest.travellers;
		},
		getDefaultSortFilter: () => {
			return searchRequest.defaultSortFilter;
		},
		getMinTotalGuest: () => {
			return searchRequest.configMap.MIN_TOTAL_GUEST;
		},

		getListingDaysTillEndDate: () => {
			return searchRequest.configMap.LISTING_DAYS_TILL_END_DATE;
		},

		getNonStopFlightLanding: () => {
			return searchRequest.configMap.NON_STOP_FLIGHT_LANDING === 'true';
		},

		getMaxTotalGuest: () => {
			return searchRequest.configMap.MAX_TOTAL_GUEST;
		},

		getListingDaysFromStartDate: () => {
			return searchRequest.configMap.LISTING_DAYS_FROM_START_DATE;
		},

		getCachingTimeInMillisecond: () => {
			return searchRequest.configMap.CACHING_TIME_IN_MILLISECOND;
		},

		getSearchCityRegex: () => {
			return searchRequest.configMap.SEARCH_CITY_REGEX;
		},

		getLandingDaysFromStartDate: () => {
			return searchRequest.configMap.LANDING_DAYS_FROM_START_DATE;
		},

		getPassportNumberRegex: () => {
			return searchRequest.configMap.PASSPORT_NUMBER_REGEX;
		},

		getOnwardNumberOfStopFilterId: () => {
			return searchRequest.configMap.ONWARD_NUMBER_OF_STOP_FILTER_ID;
		},

		getMaxCalenderDays: () => {
			return searchRequest.configMap.MAX_CALENDER_DAYS;
		},

		getSearchCityRegexErrorMessage: () => {
			return searchRequest.configMap.SEARCH_CITY_REGEX_ERROR_MESSAGE;
		},

		getGstEnabled: () => {
			return searchRequest.configMap.GST_ENABLED === 'true';
		},

		getLandingDaysTillEndDate: () => {
			return searchRequest.configMap.LANDING_DAYS_TILL_END_DATE;
		},

		getPassportDateMaxYears: () => {
			return searchRequest.configMap.PASSPORT_DATE_MAX_YEARS;
		},

		getReturnNumberOfStopFilterId: () => {
			return searchRequest.configMap.RETURN_NUMBER_OF_STOP_FILTER_ID;
		},

		getBookingResultPerPage: () => {
			return searchRequest.configMap.BOOKING_RESULT_PER_PAGE;
		},

		getNonStopFlightFilterId: () => {
			return searchRequest.configMap.NON_STOP_FLIGHT_FILTER_ID;
		},

		getListingLoadingMessage: () => {
			return searchRequest.configMap.LISTING_LOADING_MESSAGE;
		},
		showWallet: () => {
			return data.categorySdkConfig.walletEnabled;
		},
		showCoupon: () => {
			return data.categorySdkConfig.couponEnabled;
		},
		getDefaultPassenger: () => {
			return {
				adultCount: searchRequest.adultCount,
				infantCount: searchRequest.infantCount,
				childCount: searchRequest.childCount
			};
		}
	};
}
export const configStore = await createConfigStore();

const createWalletStore = async () => {
	const data: WalletResponse = await catchError(getWallet);
	console.log(data);
	const walletDetails = data.walletDetails;
	const { subscribe, set, update } = writable<WalletResponse>(data);
	return {
		subscribe,
		set,
		update,
		getTotalBalance: () => {
			return walletDetails.walletTotalBalance;
		},
		getCurrencySymbol: () => {
			return walletDetails.displayInfo.currency_symbol;
		}
	};
};

export const walletStore = await createWalletStore();

const createUpcomingBookingStore = async () => {
	const data = await catchError(getUpcomingBookings);
	console.log(data);
	const { subscribe, set, update } = writable(data);
	return {
		subscribe,
		set,
		update,
		getUpcomingBookings: () => {
			return data;
		}
	};
};

export const upcomingBookingStore = await createUpcomingBookingStore();

const createPopularCitiesStore = async () => {
	const data: AirportListResponse = await catchError(getPopularCities);
	console.log(data);
	const { subscribe, set, update } = writable<AirportListResponse>(data);
	return {
		subscribe,
		set,
		update,
		getPopularCities: () => {
			return data.airportList;
		}
	};
};

export const popularCitiesStore = await createPopularCitiesStore();

const createSearchCityStore = async () => {
	const { subscribe, set, update } = writable<AirportListResponse>();
	return {
		subscribe,
		set,
		update,
		getSearchCity: async (searchText: string) => {
			const data: AirportListResponse = await catchError(getSearchCity.bind(null, searchText));
			console.log(data);
			set(data);
			return data;
		},
		getAirportList: () => {
			return get(searchCityStore).airportList;
		}
	};
};

export const searchCityStore = await createSearchCityStore();

const createSearchFlightStore = async () => {
	const { subscribe, set, update } = writable<FlightSearchResponse>();
	return {
		subscribe,
		set,
		update,
		searchFlight: async (request: FlightSearchRequest) => {
			const data: FlightSearchResponse = await catchError(searchFlight.bind(null, request));
			console.log(data);
			set(data);
			return data;
		},
		getAirportList: () => {
			return get(searchFlightStore).onwardFlights;
		}
	};
};

export const searchFlightStore = await createSearchFlightStore();

function createSearchFlightsParamsStore() {
	console.log(dayjs(new Date(parseInt(configStore.getDepartDate()))).format('DD-MM-YYYY'));
	const { subscribe, set, update } = writable<FlightSearchRequest>({
		src: configStore.getSrc(),
		des: configStore.getDest(),
		departDate: dayjs(new Date(parseInt(configStore.getDepartDate()))).format('DD-MM-YYYY'),
		partnerCountry: configStore.getPartnerCountry(),
		passenger: {
			adultCount: 1,
			infantCount: 0,
			childCount: 0
		},
		travellerClass: configStore.getDefaultTravellerClass(),
		appliedSortFilter: [configStore.getDefaultSortFilter()]
	});
	return {
		subscribe,
		set,
		update,
		getSelectedCities: () => {
			return {
				src: get(searchFlightsParamsStore).src,
				des: get(searchFlightsParamsStore).des
			};
		},
		getDepartDate: () => {
			return dayjs(get(searchFlightsParamsStore).departDate);
		},
		getPassenger: () => {
			return get(searchFlightsParamsStore).passenger;
		},
		getTravellerClass: () => {
			return get(searchFlightsParamsStore).travellerClass;
		},
		getAppliedSortFilter: () => {
			return get(searchFlightsParamsStore).appliedSortFilter;
		},
		setSrc: (src: City) => {
			update((state) => {
				state.src = src;
				return state;
			});
		},
		setDes: (des: City) => {
			update((state) => {
				state.des = des;
				return state;
			});
		},
		exchangeCities: () => {
			update((state) => {
				const temp = state.src;
				state.src = state.des;
				state.des = temp;
				return state;
			});
		},
		setDepartDate: (departDate: string) => {
			update((state) => {
				state.departDate = departDate;
				return state;
			});
		},
		setPassenger: (passenger: { adultCount: number; infantCount: number; childCount: number }) => {
			update((state) => {
				state.passenger = passenger;
				return state;
			});
		},
		setTravellerClass: (travellerClass: { key: string; value: string }) => {
			update((state) => {
				state.travellerClass = travellerClass;
				return state;
			});
		}
	};
}

export const searchFlightsParamsStore = createSearchFlightsParamsStore();

function createStateStore() {
	const { set, subscribe, update } = writable({
		isModifySearchModalOpen: false
	});
	return {
		set,
		subscribe,
		update,
		openModifySearchModal: () => {
			update((state) => {
				return {
					...state,
					isModifySearchModalOpen: true
				};
			});
		},
		closeModifySearchModal: () => {
			update((state) => {
				return {
					...state,
					isModifySearchModalOpen: false
				};
			});
		}
	};
}

export const stateStore = createStateStore();
