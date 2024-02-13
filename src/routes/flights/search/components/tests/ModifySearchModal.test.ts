import { render, fireEvent } from '@testing-library/svelte';
import ModifySearchModal from '../ModifySearchModal.svelte'; // replace with the actual path to the ModifySearchModal component
import { beforeAll, vi } from 'vitest';

import * as APIS from '$lib/flights-commons/flights.api';
import {
	configStore,
	searchFlightsParamsStore,
	stateStore
} from '$lib/flights-commons/flights.store';
import { get } from 'svelte/store';

// Mock the stateStore
const DUMMY_CONFIG = {
	status: {
		responseCode: 'SUCCESS',
		responseCodeCause: 'NO_SPECIFIC_CAUSE',
		responseMessage: 'Initial Config'
	},
	searchRequest: {
		src: {
			iataCode: 'DEL',
			city: 'New Delhi',
			name: 'Indira Gandhi International Airport',
			countryCode: 'IN',
			iconUrl: ''
		},
		des: {
			iataCode: 'BOM',
			city: 'Mumbai',
			name: 'Chhatrapati Shivaji International Airport',
			countryCode: 'IN',
			iconUrl: ''
		},
		travellerClass: 'Economy',
		departDate: '1707718910889',
		returnDate: '0',
		adultCount: 1,
		childCount: 0,
		infantCount: 0,
		isRoundTrip: false,
		partnerCountry: 'IN',
		partnerCurrency: 'INR',
		configMap: {
			MIN_TOTAL_GUEST: '1',
			LISTING_DAYS_TILL_END_DATE: '15',
			NON_STOP_FLIGHT_LANDING: 'false',
			MAX_TOTAL_GUEST: '9',
			LISTING_DAYS_FROM_START_DATE: '15',
			CACHING_TIME_IN_MILLISECOND: '86400000',
			SEARCH_CITY_REGEX: '^[a-zA-Z\\s]*$',
			LANDING_DAYS_FROM_START_DATE: '0',
			PASSPORT_NUMBER_REGEX: '[a-zA-Z]{1}[0-9]{7}',
			ONWARD_NUMBER_OF_STOP_FILTER_ID: '1',
			MAX_CALENDER_DAYS: '365',
			SEARCH_CITY_REGEX_ERROR_MESSAGE: 'Only characters(a-z) are allowed',
			GST_ENABLED: 'true',
			LANDING_DAYS_TILL_END_DATE: '180',
			PASSPORT_DATE_MAX_YEARS: '10',
			RETURN_NUMBER_OF_STOP_FILTER_ID: '2',
			BOOKING_RESULT_PER_PAGE: '10',
			NON_STOP_FLIGHT_FILTER_ID: '0',
			LISTING_LOADING_MESSAGE: 'Fetching the best flights for you while you wait.'
		},
		travellers: [
			{
				key: 'ECONOMY',
				value: 'Economy Class'
			},
			{
				key: 'BUSINESS',
				value: 'Business Class'
			},
			{
				key: 'PREMIUM',
				value: 'Premium Economy Class'
			}
		],
		guests: [
			{
				guestType: 'ADULT',
				textName: 'Adults',
				subTextName: '12 years and above',
				defaultValue: 1,
				minValue: 1,
				maxValue: 9,
				displayOrder: 1,
				errorMessage: ''
			},
			{
				guestType: 'CHILD',
				textName: 'Children',
				subTextName: '2 to 12 years',
				defaultValue: 0,
				minValue: 0,
				maxValue: 9,
				displayOrder: 2,
				errorMessage: ''
			},
			{
				guestType: 'INFANT',
				textName: 'Infants',
				subTextName: 'Less than 2 years',
				defaultValue: 0,
				minValue: 0,
				maxValue: 4,
				displayOrder: 3,
				errorMessage: 'Infants cannot be more than adults'
			}
		],
		defaultSortFilter: {
			tabId: 'DUMMY',
			sortId: '1',
			filtersList: [
				{
					filterId: 1,
					appliedFilterValueList: {
						filterValues: ['0']
					}
				},
				{
					filterId: 2,
					appliedFilterValueList: {
						filterValues: ['0']
					}
				}
			]
		}
	},
	categorySdkConfig: {
		couponEnabled: true,
		walletEnabled: true,
		payload: {
			'wallet-info': 'dummy-value'
		}
	}
};
const DUMMY_WALLET = {
	response: {
		responseCode: 'SUCCESS',
		responseCodeCause: 'NO_SPECIFIC_CAUSE',
		responseMessage: 'USER_BALANCE_RETURNED_SUCCESSFULLY'
	},
	walletDetails: {
		walletName: 'Nuclei Wallet',
		walletTotalBalance: 0,
		walletAppliedRedeemedAmount: 0,
		walletRollbackAmount: 0,
		userBlocked: false,
		banner: '',
		displayInfo: {
			toast_message: 'Your Wallet Balance is ₹ 0.00',
			overlay_message: 'Your Wallet Balance is ₹ 0.0',
			currency_symbol: '₹'
		}
	}
};
const DUMMY_UPCOMING_BOOKINGS = {
	booking: [
		{
			id: 'N-9I6YXVB-DEVQOO1-MC9K1RA',
			title: 'New Delhi → Bangalore',
			subtitle: 'Mon, Nov 21',
			thirdTitle: '1 Traveller | Economy',
			imageUrl:
				'https://nucleistorage.blob.core.windows.net/nucleicontainer/image-pub/flights/v2/airlines/flights_6E_xxxhdpi.png',
			ctaButton: []
		},
		{
			id: 'N-TSKZ3WV-W03FBCH-HQNSXJ9',
			title: 'New Delhi → Mumbai',
			subtitle: 'Tue, Dec 27',
			thirdTitle: '1 Traveller | Economy',
			imageUrl:
				'https://nucleistorage.blob.core.windows.net/nucleicontainer/image-pub/flights/v2/airlines/flights_SG_xxxhdpi.png',
			ctaButton: []
		},
		{
			id: 'N-HD63VP2-F0EWG2J-J5MA05H',
			title: 'New Delhi → Mumbai',
			subtitle: 'Mon, Sep 11',
			thirdTitle: '1 Traveller | Economy',
			imageUrl:
				'https://nucleistorage.blob.core.windows.net/nucleicontainer/image-pub/flights/v2/airlines/flights_SG_xxxhdpi.png',
			ctaButton: []
		},
		{
			id: 'N-TTJASV0-4VT1FSC-QHHY1F3',
			title: 'New Delhi → Mumbai',
			subtitle: 'Wed, Sep 13',
			thirdTitle: '1 Traveller | Economy',
			imageUrl:
				'https://nucleistorage.blob.core.windows.net/nucleicontainer/image-pub/flights/v2/airlines/flights_SG_xxxhdpi.png',
			ctaButton: []
		},
		{
			id: 'N-W0H7HLZ-F07SOI5-G423Y9A',
			title: 'New Delhi → Mumbai',
			subtitle: 'Wed, Sep 13',
			thirdTitle: '1 Traveller | Economy',
			imageUrl:
				'https://nucleistorage.blob.core.windows.net/nucleicontainer/image-pub/flights/v2/airlines/flights_SG_xxxhdpi.png',
			ctaButton: []
		}
	],
	totalRecords: 16
};
const DUMMY_POPULAR_CITIES = {
	status: {
		responseCode: 'SUCCESS',
		responseCodeCause: 'NO_SPECIFIC_CAUSE',
		responseMessage: ''
	},
	title: 'Suggested city Airports',
	airportList: [
		{
			iataCode: 'DEL',
			city: 'New Delhi',
			name: 'Indira Gandhi International Airport',
			countryCode: 'IN',
			iconUrl: ''
		},
		{
			iataCode: 'BOM',
			city: 'Mumbai',
			name: 'Chhatrapati Shivaji International Airport',
			countryCode: 'IN',
			iconUrl: ''
		},
		{
			iataCode: 'BLR',
			city: 'Bangalore',
			name: 'Kempegowda International Airport',
			countryCode: 'IN',
			iconUrl: ''
		},
		{
			iataCode: 'PAT',
			city: 'Patna',
			name: 'Lok Nayak Jayaprakash Airport',
			countryCode: 'IN',
			iconUrl: ''
		},
		{
			iataCode: 'HYD',
			city: 'Hyderabad',
			name: 'Rajiv Gandhi International Airport',
			countryCode: 'IN',
			iconUrl: ''
		},
		{
			iataCode: 'PNQ',
			city: 'Pune',
			name: 'Pune Airport',
			countryCode: 'IN',
			iconUrl: ''
		}
	]
};

describe('ModifySearchModal component', () => {
	beforeAll(() => {
		const getConfig = vi.spyOn(APIS, 'getConfig');
		const getWallet = vi.spyOn(APIS, 'getWallet');
		const getUpcomingBookings = vi.spyOn(APIS, 'getUpcomingBookings');
		const getPopularCities = vi.spyOn(APIS, 'getPopularCities');
		getConfig.mockResolvedValue(DUMMY_CONFIG);
		getWallet.mockResolvedValue(DUMMY_WALLET);
		getUpcomingBookings.mockResolvedValue(DUMMY_UPCOMING_BOOKINGS);
		getPopularCities.mockResolvedValue(DUMMY_POPULAR_CITIES);
		configStore.set(DUMMY_CONFIG);

		searchFlightsParamsStore.set({
			src: DUMMY_CONFIG.searchRequest.src,
			des: DUMMY_CONFIG.searchRequest.des,
			departDate: DUMMY_CONFIG.searchRequest.departDate,
			partnerCountry: DUMMY_CONFIG.searchRequest.partnerCountry,
			appliedSortFilter: [DUMMY_CONFIG.searchRequest.defaultSortFilter],
			passenger: {
				adultCount: 1,
				childCount: 0,
				infantCount: 0
			},
			travellerClass: {
				key: 'ECONOMY',
				value: 'Economy Class'
			}
		});
	});
	it('should render "Modify Search" title', () => {
		const { getByText } = render(ModifySearchModal);
		expect(getByText('Modify Search')).toBeInTheDocument();
	});

	it('should closeModifySearchModal when close button is clicked', async () => {
		stateStore.openModifySearchModal();
		const { getByTestId } = render(ModifySearchModal);
		await fireEvent.click(getByTestId('close-modify-search-modal-btn'));
		const closeModal = vi.spyOn(stateStore, 'closeModifySearchModal');
		expect(get(stateStore).isModifySearchModalOpen).toBe(false);
	});
});
