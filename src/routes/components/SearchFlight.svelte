<script lang="ts">
	import { goto } from '$app/navigation';
	import {
		configStore,
		searchFlightStore,
		searchFlightsParamsStore,
		stateStore
	} from '$lib/flights-commons/flights.store';
	import { cacheRecentFlightSearches } from '../../utils/flights.utils';
	import FlightRouteDisplay from './FlightRouteDisplay.svelte';
	import SelectDates from './SelectDates.svelte';
	import SelectTravellerNClass from './SelectTravellerNClass.svelte';

	let checked = configStore.getNonStopFlightLanding();

	function searchFlightHandler() {
		let str = JSON.stringify($searchFlightsParamsStore);
		goto(`/flights/search?obj=${str}`);
		cacheRecentFlightSearches($searchFlightsParamsStore);
		searchFlightStore.searchFlight($searchFlightsParamsStore);
		stateStore.closeModifySearchModal();
	}
</script>

<FlightRouteDisplay />

<SelectDates />

<SelectTravellerNClass />

<div class="flex justify-start items-center gap-2">
	<input
		bind:checked
		type="checkbox"
		name="non-stop"
		class="checkbox checkbox-primary h-[18px] w-[18px]"
		data-testid="checkbox-non-stop"
	/>
	<p class="sub-text text-[14px] base-content-light">Show only non-stop flights</p>
</div>

<button
	on:click={searchFlightHandler}
	class="btn btn-success text-base-200 text-xl w-full"
	data-testid="search-flight"
>
	Search Flights
</button>
