import { render } from '@testing-library/svelte';
import NavbarHeader from '../NavbarHeader.svelte';

describe('NavbarHeader component', () => {
	it('should render the correct text and icons', () => {
		const { getByText, getByTestId } = render(NavbarHeader);

		expect(getByText('Flights')).toBeInTheDocument();
		expect(getByText('₹1,500')).toBeInTheDocument();
		expect(getByTestId('wallet-icon')).toBeInTheDocument();
		expect(getByTestId('percentage-icon')).toBeInTheDocument();
		expect(getByTestId('three-dots')).toBeInTheDocument();
	});
	it('should render the amount of money in wallet passed as props', async () => {
		const { getByText } = render(NavbarHeader, { props: { wallet: 2000 } });
		expect(getByText('₹2,000')).toBeInTheDocument();
	});
	it("should have bg as 'bg-primary'", () => {
		const { getByTestId } = render(NavbarHeader);
		const navbar = getByTestId('navbar');
		expect(navbar).toHaveClass('bg-primary');
	});
});
