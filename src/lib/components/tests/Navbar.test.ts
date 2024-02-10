import { render, fireEvent } from '@testing-library/svelte';
import Navbar from '../Navbar.svelte';
import { vi } from 'vitest';

describe('Navbar component', () => {
	it('should render the navbar with back button', () => {
		const { getByTestId } = render(Navbar);
		const backButton = getByTestId('back-btn');

		expect(backButton).toBeInTheDocument();
	});

	it('should call navigateBack when back button is clicked', async () => {
		const mockNavigateBack = vi.fn();
		window.history.back = mockNavigateBack; // Mock the function

		const { getByRole } = render(Navbar);

		const backButton = getByRole('button');
		await fireEvent.click(backButton);

		expect(mockNavigateBack).toHaveBeenCalled();
	});
});
