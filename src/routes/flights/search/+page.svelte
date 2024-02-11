<script lang="ts">
	import { onMount } from 'svelte';
	import {
		loadingStore,
		searchFlightStore,
		searchFlightsParamsStore,
		stateStore
	} from '$lib/flights-commons/flights.store';
	import type { FlightSearchRequest } from '$lib/flights-commons/flights.type';
	import NavbarHeader from './components/Navheader.svelte';
	import FlightCard from './components/FlightCard.svelte';
	import SkeletonFlightCard from './components/SkeletonFlightCard.svelte';
	import ModifySearchModal from './components/ModifySearchModal.svelte';
	import { catchError } from '../../../utils/flights.utils';

	onMount(
		catchError.bind(
			null,
			() => {
				console.log('Mounted');
				const query = new URLSearchParams(window.location.search);
				const searchParam = query.get('obj') ? JSON.parse(query.get('obj') as string) : {};
				console.log('searchParam', searchParam);
				if (!$stateStore.isModifySearchModalOpen)
					searchFlightStore.searchFlight(searchParam as FlightSearchRequest);
				if (!$stateStore.isModifySearchModalOpen) searchFlightsParamsStore.set(searchParam);
				console.log('searchParam', searchParam, $searchFlightStore);
			},
			undefined,
			'Invalid search params. Please try again.'
		)
	);
	$: console.log('searchFlightStore', $searchFlightStore, $searchFlightsParamsStore);
	$: flights = $searchFlightStore?.onwardFlights || [];
</script>

<NavbarHeader
	on:click={() => {
		stateStore.openModifySearchModal();
	}}
/>

{#if $loadingStore}
	{#each Array(8) as _, i}
		<SkeletonFlightCard />
	{/each}
{:else if flights.length > 0}
	<div class="flex flex-col">
		{#each flights as flight}
			<FlightCard {flight} />
		{/each}
	</div>
{:else}
	<div class="h-full w-full flex p-8 justify-center items-center flex-col gap-4">
		<p class="base-content-light">Looks like we couldnt find any flights</p>
		<button
			class="btn btn-xl btn-success text-base-200 w-full"
			on:click={() => {
				stateStore.openModifySearchModal();
			}}
		>
			Modify Search
		</button>
	</div>
{/if}
<ModifySearchModal />
