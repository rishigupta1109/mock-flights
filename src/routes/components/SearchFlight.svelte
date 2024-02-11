<script lang="ts">
	import { goto } from '$app/navigation';
	import {
		configStore,
		searchFlightStore,
		searchFlightsParamsStore,
		stateStore
	} from '$lib/flights-commons/flights.store';
	import FlightRouteDisplay from './FlightRouteDisplay.svelte';
	import SelectDates from './SelectDates.svelte';
	import SelectTravellerNClass from './SelectTravellerNClass.svelte';

	let checked = configStore.getNonStopFlightLanding();

	function searchFlightHandler() {
		let str = JSON.stringify($searchFlightsParamsStore);
		goto(`/flights/search?obj=${str}`);
		searchFlightStore.searchFlight($searchFlightsParamsStore);
		stateStore.closeModifySearchModal();
	}
</script>

<FlightRouteDisplay />

<SelectDates />

<SelectTravellerNClass />

<div class="flex justify-start items-center gap-4">
	<input
		bind:checked
		type="checkbox"
		name="non-stop"
		class="checkbox checkbox-primary"
		data-testid="checkbox-non-stop"
	/>
	<p class="base-content-light text-sm">Show only non-stop flights</p>
</div>

<button
	on:click={searchFlightHandler}
	class="btn btn-success text-base-200 w-full"
	data-testid="search-flight"
>
	Search Flights
</button>
