import { render } from '@testing-library/svelte';
import CityWithCodeTag from '../CityWithCodeTag.svelte';

describe('CityWithCodeTag component', () => {
	it('should render the correct city and code', () => {
		const { getByText } = render(CityWithCodeTag, { props: { city: 'Banglore', code: 'BLR' } });

		expect(getByText('Banglore')).toBeInTheDocument();
		expect(getByText('BLR')).toBeInTheDocument();
	});
	it('should render the city code as tag', () => {
		const { getByText } = render(CityWithCodeTag, { props: { city: 'Banglore', code: 'BLR' } });

		expect(getByText('BLR')).toHaveClass('rounded-sm border-base-300 border py-1 px-4 text-xs ');
	});

	it('should render the city code color as base-content', () => {
		const { getByText } = render(CityWithCodeTag, { props: { city: 'Banglore', code: 'BLR' } });
		expect(getByText('BLR')).toHaveClass('base-content-light');
	});

	it('should render the city name color as base-content', () => {
		const { getByText } = render(CityWithCodeTag, { props: { city: 'Banglore', code: 'BLR' } });
		expect(getByText('Banglore')).toHaveClass('text-base-content');
	});
});
