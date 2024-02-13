import { render, fireEvent } from '@testing-library/svelte';
import { goto } from '$app/navigation';
import Navbar from '../Navbar.svelte'; // replace with the actual path to the Navbar component
import { vi } from 'vitest';

vi.mock('$app/navigation', () => ({
	goto: vi.fn()
}));

describe('Navbar component', () => {
	it('should render back button', () => {
		const { getByTestId } = render(Navbar);
		expect(getByTestId('back-btn')).toBeInTheDocument();
	});

	it('should navigate back when back button is clicked and back prop is defined', async () => {
		const { getByTestId } = render(Navbar, { props: { back: '/previous' } });
		await fireEvent.click(getByTestId('back-btn'));
		expect(goto).toHaveBeenCalledWith('/previous');
	});

	it('should navigate back using window.history.back when back button is clicked and back prop is undefined', async () => {
		window.history.back = vi.fn();
		const { getByTestId } = render(Navbar);
		await fireEvent.click(getByTestId('back-btn'));
		expect(window.history.back).toHaveBeenCalled();
	});
});
