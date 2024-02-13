import { render, fireEvent } from '@testing-library/svelte';
import SelectTravellerModal from '../SelectTravellerModal.svelte';
import {
	configStore,
	searchFlightsParamsStore,
	stateStore
} from '$lib/flights-commons/flights.store';
import { DUMMY_CONFIG } from '../../page.test';
import { DUMMY_SEARCH_REQUEST } from './FlightRouteDisplay.test';
import { get } from 'svelte/store';

describe('SelectTravellerModal', () => {
	beforeEach(() => {
		configStore.set(DUMMY_CONFIG);
		searchFlightsParamsStore.set(DUMMY_SEARCH_REQUEST);
	});

	it('should increase the guest count when + button is clicked', async () => {
		const { getAllByText } = render(SelectTravellerModal);
		const plusButton = getAllByText('+')[0];
		await fireEvent.click(plusButton);
		await fireEvent.click(getAllByText('Proceed')[0]);
		expect(get(searchFlightsParamsStore).passenger).toEqual({
			adultCount: 2,
			childCount: 0,
			infantCount: 0
		});
	});

	it('should not decrease the guest count when - button and count is minvaalue ', async () => {
		const { getAllByText } = render(SelectTravellerModal);
		const minusButton = getAllByText('-')[0];
		await fireEvent.click(minusButton);
		await fireEvent.click(getAllByText('Proceed')[0]);
		expect(get(searchFlightsParamsStore).passenger).toEqual({
			adultCount: 1,
			childCount: 0,
			infantCount: 0
		});
	});

	it('should update the traveller class and close the modal when proceed button is clicked', async () => {
		const { getByText } = render(SelectTravellerModal);
		const proceedButton = getByText('Proceed');
		await fireEvent.click(proceedButton);
		expect(get(searchFlightsParamsStore).travellerClass).toEqual({
			key: 'ECONOMY',
			value: 'Economy Class'
		});
	});

	it('should not increase the guest count beyond the maximum value', async () => {
		const { getAllByText } = render(SelectTravellerModal);
		const plusButton = getAllByText('+')[0];
		for (let i = 0; i < 15; i++) {
			await fireEvent.click(plusButton);
		}
		await fireEvent.click(getAllByText('Proceed')[0]);
		expect(get(searchFlightsParamsStore).passenger).toEqual({
			adultCount: 9,
			childCount: 0,
			infantCount: 0
		});
	});

	it('should not allow more infants than adults', async () => {
		const { getAllByText } = render(SelectTravellerModal);
		const plusButtons = getAllByText('+');
		const minusButtons = getAllByText('-');
		const adultMminusButton = minusButtons[0];
		for (let i = 0; i < 9; i++) {
			await fireEvent.click(adultMminusButton);
		}
		const adultPlusButton = plusButtons[0];
		const infantPlusButton = plusButtons[2];
		await fireEvent.click(adultPlusButton);
		for (let i = 0; i < 9; i++) {
			await fireEvent.click(infantPlusButton);
		}
		await fireEvent.click(getAllByText('Proceed')[0]);
		expect(get(searchFlightsParamsStore).passenger).toEqual({
			adultCount: 2,
			childCount: 0,
			infantCount: 2
		});
	});
});
