import { render, fireEvent, waitFor } from '@testing-library/svelte';
import FlightRouteDisplay from '../FlightRouteDisplay.svelte';
import { searchFlightsParamsStore } from '$lib/flights-commons/flights.store';
import { get } from 'svelte/store';

// Mock the searchFlightsParamsStore
export const DUMMY_SEARCH_REQUEST = {
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
	departDate: '13-02-2024',
	passenger: {
		adultCount: 1,
		infantCount: 0,
		childCount: 0
	},
	travellerClass: {
		key: 'ECONOMY',
		value: 'Economy Class'
	},
	appliedSortFilter: [
		{
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
	],
	partnerCountry: 'IN'
};
describe('FlightRouteDisplay component', () => {
	it('should render source and destination cities', () => {
		searchFlightsParamsStore.set(DUMMY_SEARCH_REQUEST);
		const { getByText } = render(FlightRouteDisplay);
		expect(getByText('New Delhi')).toBeInTheDocument();
		expect(getByText('DEL')).toBeInTheDocument();
		expect(getByText('Mumbai')).toBeInTheDocument();
		expect(getByText('BOM')).toBeInTheDocument();
	});

	it('should call exchangeCities when exchange button is clicked', async () => {
		searchFlightsParamsStore.set(DUMMY_SEARCH_REQUEST);
		const { getByTestId, getByRole } = render(FlightRouteDisplay);
		const src = getByTestId('city-src');
		const des = getByTestId('city-dest');
		expect(src.textContent).toBe('New Delhi');
		expect(des.textContent).toBe('Mumbai');
		await fireEvent.click(getByTestId('exchange-btn'));
		await waitFor(() => {
			expect(get(searchFlightsParamsStore).src.city).toBe('Mumbai');
			expect(get(searchFlightsParamsStore).des.city).toBe('New Delhi');
		});
	});
});
