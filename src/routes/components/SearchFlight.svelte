<script lang="ts">
	import { configStore } from '$lib/flights-commons/flights.store';
	import FlightRouteDisplay from './FlightRouteDisplay.svelte';
	import SelectDates from './SelectDates.svelte';
	import SelectTravellerNClass from './SelectTravellerNClass.svelte';

	let checked = configStore.getNonStopFlightLanding();
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

<button class="btn btn-success text-base-200 w-full" data-testid="search-flight">
	Search Flights
</button>
