import { render, fireEvent } from '@testing-library/svelte';
import { goto } from '$app/navigation';
import CityWithCodeTag from '../CityWithCodeTag.svelte'; // replace with the actual path to the CityWithCodeTag component
import { vi } from 'vitest';

vi.mock('$app/navigation', () => ({
	goto: vi.fn()
}));

describe('CityWithCodeTag component', () => {
	const city = [
		{
			iataCode: 'DEL',
			city: 'New Delhi',
			name: 'Indira Gandhi International Airport',
			countryCode: 'IN',
			iconUrl: ''
		}
	];

	it('should render city information', () => {
		const { getByText } = render(CityWithCodeTag, { props: { city, type: 'src' } });
		expect(getByText('New Delhi')).toBeInTheDocument();
		expect(getByText('DEL')).toBeInTheDocument();
	});

	it('should call goto when clicked', async () => {
		const { getByRole } = render(CityWithCodeTag, { props: { city, type: 'src' } });
		await fireEvent.click(getByRole('button'));
		expect(goto).toHaveBeenCalledWith('/city/search/src/');
	});
});
