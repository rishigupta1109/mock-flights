import { describe, it, vi } from 'vitest';
import Page from './+page.svelte';
import { render, waitFor } from '@testing-library/svelte';
import { configStore, loadingStore } from '$lib/flights-commons/flights.store';
import Layout from './+layout.svelte';
import TestingLandingPage from './TestingLandingPage.svelte';
import * as APIS from '$lib/flights-commons/flights.api';
export const DUMMY_CONFIG = {
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
describe('Testing Landing Page', () => {
	it('should show Loading while config is fetching', () => {
		const { getByTestId } = render(TestingLandingPage);
		const backdrop = getByTestId('loading-backdrop');
		const spinner = getByTestId('loading-spinner');
		expect(backdrop).toBeInTheDocument();
		expect(spinner).toBeInTheDocument();
	});
	it('should render landing page when config is loaded', async () => {
		const getConfig = vi.spyOn(APIS, 'getConfig');
		const getWallet = vi.spyOn(APIS, 'getWallet');
		const getUpcomingBookings = vi.spyOn(APIS, 'getUpcomingBookings');
		const getPopularCities = vi.spyOn(APIS, 'getPopularCities');
		getConfig.mockResolvedValue(DUMMY_CONFIG);
		getWallet.mockResolvedValue(DUMMY_WALLET);
		getUpcomingBookings.mockResolvedValue(DUMMY_UPCOMING_BOOKINGS);
		getPopularCities.mockResolvedValue(DUMMY_POPULAR_CITIES);
		const { getByTestId } = render(TestingLandingPage);
		const backdrop = getByTestId('loading-backdrop');
		const spinner = getByTestId('loading-spinner');
		expect(backdrop).toBeInTheDocument();
		expect(spinner).toBeInTheDocument();

		await waitFor(() => {
			expect(getConfig).toHaveBeenCalled();
			expect(getWallet).toHaveBeenCalled();
			expect(getUpcomingBookings).toHaveBeenCalled();
			expect(getPopularCities).toHaveBeenCalled();
			expect(backdrop).not.toBeInTheDocument();
			expect(spinner).not.toBeInTheDocument();
			loadingStore.stop();
			const landingPage = getByTestId('landing-page');
			expect(landingPage).toBeInTheDocument();
		});
	});
	it('should show error message when config is not loaded', async () => {
		const getConfig = vi.spyOn(APIS, 'getConfig');
		getConfig.mockRejectedValue(new Error('Failed to fetch config'));
		const { getByTestId, getByText } = render(TestingLandingPage);
		const alert = getByTestId('alert');

		await waitFor(() => {
			expect(getConfig).toHaveBeenCalled();
			expect(alert).toBeInTheDocument();
			expect(getByText('Failed to fetch config')).toBeInTheDocument();
		});
	});
	it('should show error message when wallet is not loaded', async () => {
		const getConfig = vi.spyOn(APIS, 'getConfig');
		const getWallet = vi.spyOn(APIS, 'getWallet');

		getConfig.mockResolvedValue(DUMMY_CONFIG);
		getWallet.mockRejectedValue(new Error('Failed to fetch wallet'));

		const { getByTestId, getByText } = render(TestingLandingPage);
		const alert = getByTestId('alert');

		await waitFor(() => {
			expect(getConfig).toHaveBeenCalled();
			expect(getWallet).toHaveBeenCalled();
			expect(alert).toBeInTheDocument();
			expect(getByText('Failed to fetch wallet')).toBeInTheDocument();
		});
	});
	it('should show error message when upcoming bookings is not loaded', async () => {
		const getConfig = vi.spyOn(APIS, 'getConfig');
		const getWallet = vi.spyOn(APIS, 'getWallet');
		const getUpcomingBookings = vi.spyOn(APIS, 'getUpcomingBookings');
		getConfig.mockResolvedValue(DUMMY_CONFIG);
		getWallet.mockResolvedValue(DUMMY_WALLET);
		getUpcomingBookings.mockRejectedValue(new Error('Failed to fetch upcoming bookings'));
		const { getByTestId, getByText } = render(TestingLandingPage);
		const alert = getByTestId('alert');

		await waitFor(() => {
			expect(getConfig).toHaveBeenCalled();
			expect(getWallet).toHaveBeenCalled();
			expect(getUpcomingBookings).toHaveBeenCalled();
			expect(alert).toBeInTheDocument();
			expect(getByText('Failed to fetch upcoming bookings')).toBeInTheDocument();
		});
	});
	it('should show error message when popular cities is not loaded', async () => {
		const getConfig = vi.spyOn(APIS, 'getConfig');
		const getWallet = vi.spyOn(APIS, 'getWallet');
		const getUpcomingBookings = vi.spyOn(APIS, 'getUpcomingBookings');
		const getPopularCities = vi.spyOn(APIS, 'getPopularCities');
		getConfig.mockResolvedValue(DUMMY_CONFIG);
		getWallet.mockResolvedValue(DUMMY_WALLET);
		getUpcomingBookings.mockResolvedValue(DUMMY_UPCOMING_BOOKINGS);
		getPopularCities.mockRejectedValue(new Error('Failed to fetch popular cities'));
		const { getByTestId, getByText } = render(TestingLandingPage);
		const alert = getByTestId('alert');

		await waitFor(() => {
			expect(getConfig).toHaveBeenCalled();
			expect(getWallet).toHaveBeenCalled();
			expect(getUpcomingBookings).toHaveBeenCalled();
			expect(getPopularCities).toHaveBeenCalled();
			expect(alert).toBeInTheDocument();
			expect(getByText('Failed to fetch popular cities')).toBeInTheDocument();
		});
	});
});
