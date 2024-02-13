import { get, writable } from 'svelte/store';
import {
	getConfig,
	getPopularCities,
	getSearchCity,
	getUpcomingBookings,
	getWallet,
	searchFlight
} from './flights.api';
import {
	type UpcomingBookingResponse,
	type AirportListResponse,
	type City,
	type ConfigResponse,
	type FlightSearchRequest,
	type FlightSearchResponse,
	type WalletResponse
} from './flights.type';
import dayjs from 'dayjs';
import { catchError } from '../../utils/flights.utils';

const createLoadingStore = () => {
	const { subscribe, set, update } = writable(true);
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

function createAlertStore() {
	const { subscribe, set, update } = writable<{
		isOpen: boolean;
		message: string;
		type: 'info' | 'error' | 'success' | 'warning';
	}>({
		isOpen: false,
		message: '',
		type: 'info'
	});
	return {
		subscribe,
		set,
		update,
		openAlert: (message: string, type: 'info' | 'error' | 'success' | 'warning') => {
			set({
				isOpen: true,
				message,
				type
			});
			setTimeout(() => {
				update((state) => {
					state.isOpen = false;
					return state;
				});
			}, 2000);
		},
		closeAlert: () => {
			set({
				isOpen: false,
				message: '',
				type: 'info'
			});
		}
	};
}

function createConfigStore() {
	const { subscribe, set, update } = writable<ConfigResponse>();

	return {
		subscribe,
		set,
		update,
		fetchConfig: async () => {
			console.log('fetching config');
			const data: ConfigResponse = await catchError(getConfig);
			if (data === null) {
				return;
			}
			set(data);
			let travellerClass = data.searchRequest.travellerClass.toLocaleUpperCase();
			let travellerClassObj = get(configStore).searchRequest.travellers.find(
				(traveller) => traveller.key === travellerClass
			);
			if (travellerClassObj === undefined) {
				travellerClassObj = get(configStore).searchRequest.travellers[0];
			}
			const departDate = dayjs(new Date(parseInt(data.searchRequest.departDate))).format(
				'DD-MM-YYYY'
			);
			searchFlightsParamsStore.set({
				src: data.searchRequest.src,
				des: data.searchRequest.des,
				departDate: departDate,
				passenger: {
					adultCount: data.searchRequest.adultCount,
					infantCount: data.searchRequest.infantCount,
					childCount: data.searchRequest.childCount
				},
				travellerClass: travellerClassObj,
				appliedSortFilter: [data.searchRequest.defaultSortFilter],
				partnerCountry: data.searchRequest.partnerCountry
			});
		},
		getDepartDate: () => {
			return get(configStore).searchRequest.departDate;
		},
		getDest: () => {
			return get(configStore).searchRequest.des;
		},
		getSrc: () => {
			return get(configStore).searchRequest.src;
		},
		getReturnDate: () => {
			return dayjs(parseInt(get(configStore).searchRequest.returnDate) * 1);
		},
		getTravellersCount: () => {
			const { adultCount, childCount, infantCount } = get(configStore).searchRequest;
			return adultCount + childCount + infantCount;
		},
		isRoundTrip: () => {
			return get(configStore).searchRequest.isRoundTrip;
		},
		getPartnerCountry: () => {
			return get(configStore).searchRequest.partnerCountry;
		},
		getPartnerCurrency: () => {
			return get(configStore).searchRequest.partnerCurrency;
		},
		getDefaultTravellerClass: () => {
			let travellerClass = get(configStore).searchRequest.travellerClass.toLocaleUpperCase();
			let travellerClassObj = get(configStore).searchRequest.travellers.find(
				(traveller) => traveller.key === travellerClass
			);
			if (travellerClassObj === undefined) {
				travellerClassObj = get(configStore).searchRequest.travellers[0];
			}

			return travellerClassObj;
		},
		getGuests: () => {
			return get(configStore).searchRequest.guests;
		},
		getTravellerClasses: () => {
			return get(configStore).searchRequest.travellers;
		},
		getDefaultSortFilter: () => {
			return get(configStore).searchRequest.defaultSortFilter;
		},
		getMinTotalGuest: () => {
			return get(configStore).searchRequest.configMap.MIN_TOTAL_GUEST;
		},

		getListingDaysTillEndDate: () => {
			return get(configStore).searchRequest.configMap.LISTING_DAYS_TILL_END_DATE;
		},

		getNonStopFlightLanding: () => {
			return get(configStore).searchRequest.configMap.NON_STOP_FLIGHT_LANDING === 'true';
		},

		getMaxTotalGuest: () => {
			return get(configStore).searchRequest.configMap.MAX_TOTAL_GUEST;
		},

		getListingDaysFromStartDate: () => {
			return get(configStore).searchRequest.configMap.LISTING_DAYS_FROM_START_DATE;
		},

		getCachingTimeInMillisecond: () => {
			return get(configStore).searchRequest.configMap.CACHING_TIME_IN_MILLISECOND;
		},

		getSearchCityRegex: () => {
			return get(configStore).searchRequest.configMap.SEARCH_CITY_REGEX;
		},

		getLandingDaysFromStartDate: () => {
			return get(configStore).searchRequest.configMap.LANDING_DAYS_FROM_START_DATE;
		},

		getPassportNumberRegex: () => {
			return get(configStore).searchRequest.configMap.PASSPORT_NUMBER_REGEX;
		},

		getOnwardNumberOfStopFilterId: () => {
			return get(configStore).searchRequest.configMap.ONWARD_NUMBER_OF_STOP_FILTER_ID;
		},

		getMaxCalenderDays: () => {
			return get(configStore).searchRequest.configMap.MAX_CALENDER_DAYS;
		},

		getSearchCityRegexErrorMessage: () => {
			return get(configStore).searchRequest.configMap.SEARCH_CITY_REGEX_ERROR_MESSAGE;
		},

		getGstEnabled: () => {
			return get(configStore).searchRequest.configMap.GST_ENABLED === 'true';
		},

		getLandingDaysTillEndDate: () => {
			return get(configStore).searchRequest.configMap.LANDING_DAYS_TILL_END_DATE;
		},

		getPassportDateMaxYears: () => {
			return get(configStore).searchRequest.configMap.PASSPORT_DATE_MAX_YEARS;
		},

		getReturnNumberOfStopFilterId: () => {
			return get(configStore).searchRequest.configMap.RETURN_NUMBER_OF_STOP_FILTER_ID;
		},

		getBookingResultPerPage: () => {
			return get(configStore).searchRequest.configMap.BOOKING_RESULT_PER_PAGE;
		},

		getNonStopFlightFilterId: () => {
			return get(configStore).searchRequest.configMap.NON_STOP_FLIGHT_FILTER_ID;
		},

		getListingLoadingMessage: () => {
			return get(configStore).searchRequest.configMap.LISTING_LOADING_MESSAGE;
		},
		showWallet: () => {
			return get(configStore).categorySdkConfig.walletEnabled;
		},
		showCoupon: () => {
			return get(configStore).categorySdkConfig.couponEnabled;
		},
		getDefaultPassenger: () => {
			return {
				adultCount: get(configStore).searchRequest.adultCount,
				infantCount: get(configStore).searchRequest.infantCount,
				childCount: get(configStore).searchRequest.childCount
			};
		}
	};
}

const createWalletStore = () => {
	const { subscribe, set, update } = writable<WalletResponse>();
	return {
		subscribe,
		set,
		update,
		fetchWallet: async () => {
			console.log('fetching wallet');
			const data: WalletResponse = await catchError(getWallet);
			if (data === null) {
				return;
			}
			console.log(data);
			set(data);
		},
		getTotalBalance: () => {
			if (!get(walletStore)) return 0;
			return get(walletStore).walletDetails.walletTotalBalance;
		},
		getCurrencySymbol: () => {
			if (!get(walletStore)) return '';
			return get(walletStore).walletDetails.displayInfo.currency_symbol;
		}
	};
};

const createUpcomingBookingStore = () => {
	const { subscribe, set, update } = writable<UpcomingBookingResponse>();
	return {
		subscribe,
		set,
		update,
		fetchUpcomingBookings: async () => {
			const data: UpcomingBookingResponse = await catchError(getUpcomingBookings);
			if (data === null) {
				return;
			}
			console.log(data);
			set(data);
		},
		getUpcomingBookings: () => {
			return get(upcomingBookingStore);
		}
	};
};

const createPopularCitiesStore = () => {
	const { subscribe, set, update } = writable<AirportListResponse>();
	return {
		subscribe,
		set,
		update,
		fetchPopularCities: async () => {
			const data: AirportListResponse = await catchError(getPopularCities);
			if (data === null) {
				return;
			}
			console.log(data);
			set(data);
		},
		getPopularCities: () => {
			return get(popularCitiesStore).airportList;
		}
	};
};

const createSearchCityStore = () => {
	const { subscribe, set, update } = writable<AirportListResponse>();
	return {
		subscribe,
		set,
		update,
		getSearchCity: async (searchText: string) => {
			const data: AirportListResponse = await catchError(getSearchCity.bind(null, searchText));
			if (data === null) {
				return;
			}
			console.log(data);
			set(data);
			return data;
		},
		getAirportList: () => {
			return get(searchCityStore).airportList;
		}
	};
};

const createSearchFlightStore = () => {
	const { subscribe, set, update } = writable<FlightSearchResponse>();
	return {
		subscribe,
		set,
		update,
		searchFlight: async (request: FlightSearchRequest) => {
			const data: FlightSearchResponse = await catchError(searchFlight.bind(null, request));
			if (data === null) {
				return;
			}
			console.log(data);
			set(data);
			return data;
		},
		getAirportList: () => {
			return get(searchFlightStore).onwardFlights;
		}
	};
};

function createSearchFlightsParamsStore() {
	const { subscribe, set, update } = writable<FlightSearchRequest>();
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

function createStateStore() {
	const { set, subscribe, update } = writable<{
		isModifySearchModalOpen: boolean;
		isTravellerModalOpen: boolean;
	}>({
		isModifySearchModalOpen: false,
		isTravellerModalOpen: false
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
		},

		openTravellerModal: () => {
			update((state) => {
				return {
					...state,
					isTravellerModalOpen: true
				};
			});
		},
		closeTravellerModal: () => {
			update((state) => {
				return {
					...state,
					isTravellerModalOpen: false
				};
			});
		}
	};
}

export const loadingStore = createLoadingStore();
export const alertStore = createAlertStore();
export const configStore = createConfigStore();
export const walletStore = createWalletStore();
export const upcomingBookingStore = createUpcomingBookingStore();
export const popularCitiesStore = createPopularCitiesStore();
export const searchCityStore = createSearchCityStore();
export const searchFlightStore = createSearchFlightStore();
export const searchFlightsParamsStore = createSearchFlightsParamsStore();
export const stateStore = createStateStore();
