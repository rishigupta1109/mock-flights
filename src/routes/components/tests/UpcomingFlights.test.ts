import { render } from '@testing-library/svelte';
import UpcomingFlights from '../UpcomingFlights.svelte'; // replace with the actual path to the UpcomingFlights component
import { vi } from 'vitest';
import { upcomingBookingStore } from '$lib/flights-commons/flights.store';

describe('UpcomingFlights component', () => {
	beforeAll(() => {
		upcomingBookingStore.set({
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
		});
	});
	it('should render "Upcoming Flights" title', () => {
		const { getByText } = render(UpcomingFlights);
		expect(getByText('Upcoming Flights')).toBeInTheDocument();
	});

	it('should render "Web Check-in" title', () => {
		const { getByText } = render(UpcomingFlights);
		expect(getByText('Web Check-in')).toBeInTheDocument();
	});
	it('should render "New Delhi → Bangalore" title', () => {
		const { getByText } = render(UpcomingFlights);
		expect(getByText('New Delhi → Bangalore')).toBeInTheDocument();
	});
});
