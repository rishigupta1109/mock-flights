import { describe } from 'vitest';
import Alerts from '../Alerts.svelte';
import { render } from '@testing-library/svelte';
import { alertStore } from '$lib/flights-commons/flights.store';

describe('Alerts', () => {
	it('should render not render a alert when alert store is closed', () => {
		const { getByTestId } = render(Alerts);
		const alert = getByTestId('alert');
		expect(alert).toBeInTheDocument();
		expect(alert.childNodes.length).toBe(0);
	});
	it('should render an error alert when alert store is open', () => {
		alertStore.set({ isOpen: true, message: 'Test message', type: 'error' });
		const { getByTestId } = render(Alerts);
		const alert = getByTestId('alert');
		const alertMessage = getByTestId('alert-message');
		expect(alert).toBeInTheDocument();
		expect(alertMessage).toBeInTheDocument();
		expect(alertMessage.textContent).toBe('Test message');
		expect(alertMessage.classList.contains('alert-error')).toBe(true);
	});
	it('should render a warning alert when alert store is open', () => {
		alertStore.set({ isOpen: true, message: 'Test message', type: 'warning' });
		const { getByTestId } = render(Alerts);
		const alert = getByTestId('alert');
		const alertMessage = getByTestId('alert-message');
		expect(alert).toBeInTheDocument();
		expect(alertMessage).toBeInTheDocument();
		expect(alertMessage.textContent).toBe('Test message');
		expect(alertMessage.classList.contains('alert-warning')).toBe(true);
	});
	it('should render a success alert when alert store is open', () => {
		alertStore.set({ isOpen: true, message: 'Test message', type: 'success' });
		const { getByTestId } = render(Alerts);
		const alert = getByTestId('alert');
		const alertMessage = getByTestId('alert-message');
		expect(alert).toBeInTheDocument();
		expect(alertMessage).toBeInTheDocument();
		expect(alertMessage.textContent).toBe('Test message');
		expect(alertMessage.classList.contains('alert-success')).toBe(true);
	});
	it('should render an info alert when alert store is open', () => {
		alertStore.set({ isOpen: true, message: 'Test message', type: 'info' });
		const { getByTestId } = render(Alerts);
		const alert = getByTestId('alert');
		const alertMessage = getByTestId('alert-message');
		expect(alert).toBeInTheDocument();
		expect(alertMessage).toBeInTheDocument();
		expect(alertMessage.textContent).toBe('Test message');
		expect(alertMessage.classList.contains('alert-info')).toBe(true);
	});
	it('should close the alert after 1 sec', () => {
		alertStore.set({ isOpen: true, message: 'Test message', type: 'info' });
		const { getByTestId } = render(Alerts);
		const alert = getByTestId('alert');
		const alertMessage = getByTestId('alert-message');
		expect(alert).toBeInTheDocument();
		expect(alertMessage).toBeInTheDocument();
		expect(alertMessage.textContent).toBe('Test message');
		expect(alertMessage.classList.contains('alert-info')).toBe(true);
		setTimeout(() => {
			const alert = getByTestId('alert');
			expect(alert.childNodes.length).toBe(0);
		}, 1000);
	});
	it('should render defaul alert when alert store is open', () => {
		alertStore.set({ isOpen: true, message: 'Test message', type: 'default' as any });
		const { getByTestId } = render(Alerts);
		const alert = getByTestId('alert');
		const alertMessage = getByTestId('alert-message');
		expect(alert).toBeInTheDocument();
		expect(alertMessage).toBeInTheDocument();
		expect(alertMessage.textContent).toBe('Test message');
	});
});
