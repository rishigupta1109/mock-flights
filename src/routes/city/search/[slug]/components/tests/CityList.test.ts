import { render } from '@testing-library/svelte';
import CityList from '../CityList.svelte'; // replace with the actual path to the CityList component
import { vi } from 'vitest';

// Mock the popularCitiesStore
vi.mock('$lib/flights-commons/flights.store', () => ({
	popularCitiesStore: {
		getPopularCities: () => [
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
				name: 'Chhatrapati Shivaji Maharaj International Airport',
				countryCode: 'IN',
				iconUrl: ''
			}
		]
	}
}));

describe('CityList component', () => {
	it('should render title', () => {
		const { getByText } = render(CityList, { props: { title: 'Popular Cities' } });
		expect(getByText('Popular Cities')).toBeInTheDocument();
	});

	it('should render CityCard for each city', () => {
		const { getByText } = render(CityList, {
			props: {
				cities: [
					{
						iataCode: 'DEL',
						city: 'City1',
						name: 'Indira Gandhi International Airport',
						countryCode: 'IN',
						iconUrl: ''
					},
					{
						iataCode: 'DEL',
						city: 'City2',
						name: 'Indira Gandhi International Airport',
						countryCode: 'IN',
						iconUrl: ''
					}
				],
				title: 'Popular Cities'
			}
		});
		expect(getByText('City1')).toBeInTheDocument();
		expect(getByText('City2')).toBeInTheDocument();
	});
	it('should render popular cities by default', () => {
		const { getByText } = render(CityList);
		expect(getByText('New Delhi')).toBeInTheDocument();
		expect(getByText('Mumbai')).toBeInTheDocument();
	});
	it('should render "No cities found" when cities array is empty', () => {
		const { getByText } = render(CityList, { props: { cities: [], title: '' } });
		expect(getByText('No cities found')).toBeInTheDocument();
	});
});
