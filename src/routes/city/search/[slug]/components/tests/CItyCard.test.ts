import { render, fireEvent, getByTestId } from '@testing-library/svelte';
import CityCard from '../CityCard.svelte'; // replace with the actual path to the CityCard component
import { vi } from 'vitest';
import { get } from 'svelte/store';

describe('CityCard component', () => {
	const city = {
		iataCode: 'DEL',
		city: 'New Delhi',
		name: 'Indira Gandhi International Airport',
		countryCode: 'IN',
		iconUrl: ''
	};

	it('should render city information', () => {
		const { getByText } = render(CityCard, { props: { city } });
		expect(getByText(city.city)).toBeInTheDocument();
		expect(getByText(`${city.iataCode}-${city.name}`)).toBeInTheDocument();
	});

	it('should dispatch click event with city data when clicked', async () => {
		const { component, getByRole } = render(CityCard, { props: { city } });
		const clickListener = vi.fn();
		component.$on('click', clickListener);
		await fireEvent.click(getByRole('button'));
		expect(clickListener).toHaveBeenCalledWith(new CustomEvent('click', { detail: city }));
	});

	it('should display RecentIcon when isRecent is true', () => {
		const { getByTestId } = render(CityCard, { props: { city, isRecent: true } });
		expect(getByTestId('recent-icon')).toBeInTheDocument();
	});

	it('should display LocationIcon when isRecent is false', () => {
		const { getByTestId } = render(CityCard, { props: { city, isRecent: false } });
		expect(getByTestId('location-icon')).toBeInTheDocument();
	});
});
