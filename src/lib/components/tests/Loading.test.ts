import { loadingStore } from '$lib/flights-commons/flights.store';
import { cleanup, render } from '@testing-library/svelte';
import Loading from '../Loading.svelte';

describe('Loading component', () => {
	afterEach(cleanup);

	it('should render loading spinner when isLoading is true', () => {
		loadingStore.set(true); // set isLoading to true
		const { getByTestId } = render(Loading);
		expect(getByTestId('loading-spinner')).toBeInTheDocument();
	});

	it('should not render loading spinner when isLoading is false', () => {
		loadingStore.set(false); // set isLoading to false
		const { queryByTestId } = render(Loading);
		expect(queryByTestId('loading-spinner')).not.toBeInTheDocument();
	});
});
