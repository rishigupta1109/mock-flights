import { render, fireEvent } from '@testing-library/svelte';
import SelectDates from '../SelectDates.svelte';
import { configStore, searchFlightsParamsStore } from '$lib/flights-commons/flights.store';
import { DUMMY_CONFIG } from '../../page.test';

describe('SelectDates component', () => {
	beforeAll(() => {
		searchFlightsParamsStore.set({
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
		});
		configStore.set(DUMMY_CONFIG);
	});
	it('should render "Departure" and "Return" text', () => {
		const { getByText } = render(SelectDates);
		expect(getByText('Departure')).toBeInTheDocument();
		expect(getByText('Return')).toBeInTheDocument();
	});
	it('should render "Departure" and "Return" date', () => {
		const { getByText } = render(SelectDates);
		expect(getByText('13 Feb')).toBeInTheDocument();
		expect(getByText('Return')).toBeInTheDocument();
	});
});
