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
	import { goto } from '$app/navigation';
	import SortAndFilterOverlay from './components/SortAndFilterOverlay.svelte';
	import SelectTravellerModal from '../../components/SelectTravellerModal.svelte';

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
			'Invalid search params. Please try again.',
			() => {
				goto('/');
			}
		)
	);

	$: flights = $searchFlightStore?.onwardFlights || [];
	$: errorHandlingDetail = $searchFlightStore?.errorHandlingDetail;
	$: bottomOverlayError = errorHandlingDetail?.bottomOverlayError;
	$: description = bottomOverlayError?.description;
	$: ctaButton = bottomOverlayError?.ctaButtons;
	$: imageURL = bottomOverlayError?.imageUrl;
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
	<div class="h-full mt-auto mb-auto w-full flex p-8 justify-center items-center flex-col gap-4">
		<img src={imageURL} alt="no flights found" />
		<p class="base-content-light">
			{description}
		</p>
		<button
			class="btn btn-xl btn-success text-base-200 w-full"
			on:click={() => {
				stateStore.openModifySearchModal();
			}}
		>
			{ctaButton?.[0].ctaText}
		</button>
	</div>
{/if}
<ModifySearchModal />
<SortAndFilterOverlay />
{#key $stateStore.isTravellerModalOpen}
	<SelectTravellerModal />
{/key}
