import { getByRole, render } from '@testing-library/svelte';
import FlightCard from '../FlightCard.svelte'; // replace with the actual path to the FlightCard component
import { vi } from 'vitest';
import type { FlightSegment } from '$lib/flights-commons/flights.type';

// Mock the getRGBColor function
vi.mock('../../../../utils/flights.utils', () => ({
	getRGBColor: vi.fn().mockReturnValue('rgb(255, 255, 255)')
}));

describe('FlightCard component', () => {
	const DUMMY_FLIGHT: FlightSegment = {
		segmentId: 'DEL_BOM_AI_13022024_ECONOMY_0_0_1_0_0_IN_INR_2230_v2',
		onwardSegmentDetails: {
			arrivalTime: '',
			departTime: '',
			arrivalTimestamp: '1707852000',
			departTimestamp: '1707843600',
			duration: '',
			stops: '',
			airlineCode: '',
			sourceAirportCode: {
				iataCode: 'DEL',
				city: 'New Delhi',
				name: 'Indira Gandhi International Airport',
				countryCode: '',
				iconUrl: ''
			},
			destinationAirportCode: {
				iataCode: 'BOM',
				city: 'Mumbai',
				name: 'Chhatrapati Shivaji International Airport',
				countryCode: '',
				iconUrl: ''
			},
			airlineTime: '22:30 - 00:50',
			airlineDuration: '02h 20m | Non-Stop',
			segmentAirlineInfos: [
				{
					airlineName: 'Air India',
					airlineIconUrl:
						'https://nucleistorage.blob.core.windows.net/nucleicontainer/image-pub/flights/v2/airlines/flights_AI_xxhdpi.png'
				}
			]
		},
		refundable: false,
		hasFreeMeal: false,
		handBaggageOnlyFare: false,
		fareList: [
			{
				fareId: '2_DEL_BOM_AI_13022024_ECONOMY_0_0_1_0_0_IN_INR_2230_v2',
				partnerId: 0,
				partnerName: '',
				fare: 6532,
				currencySymbol: '₹ ',
				fareS: '6,532',
				color: {
					red: 0,
					green: 0,
					blue: 0
				}
			}
		],
		specialFeatures: [
			{
				title: 'Free Meals',
				icon: 'https://nucleistorage.blob.core.windows.net/nucleicontainer/image-pub/flights/filters/meals_flight_icon_xxxhdpi.png'
			},
			{
				title: 'Refundable',
				icon: 'https://nucleistorage.blob.core.windows.net/nucleicontainer/image-pub/flights/refundable_xxxhdpi.png'
			}
		]
	};

	it('should render flight information', () => {
		const { getByText, getByTestId } = render(FlightCard, { props: { flight: DUMMY_FLIGHT } });
		expect(getByTestId('airline-img')).toHaveAttribute(
			'src',
			'https://nucleistorage.blob.core.windows.net/nucleicontainer/image-pub/flights/v2/airlines/flights_AI_xxhdpi.png'
		);
		expect(getByText('Air India')).toBeInTheDocument();
		expect(getByText('22:30 - 00:50')).toBeInTheDocument();
		expect(getByText('02h 20m | Non-Stop')).toBeInTheDocument();
		expect(getByText('Free Meals')).toBeInTheDocument();
		expect(getByText('Refundable')).toBeInTheDocument();
		expect(getByText('₹ 6,532')).toBeInTheDocument();
	});
});
