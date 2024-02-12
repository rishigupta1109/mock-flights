<script lang="ts">
	import { goto } from '$app/navigation';
	import {
		searchFlightStore,
		searchFlightsParamsStore,
		stateStore
	} from '$lib/flights-commons/flights.store';
	import type { FlightSearchRequest, UpcomingBooking } from '$lib/flights-commons/flights.type';
	import RecentIcon from '$lib/icons/recentIcon.svelte';
	import RightArrowHalf from '$lib/icons/rightArrowHalf.svelte';
	import { cacheRecentFlightSearches } from '../../utils/flights.utils';

	export let item: UpcomingBooking = {
		title: 'title',
		subtitle: 'subtitle',
		thirdTitle: 'thirdTitle',
		imageUrl: 'imageUrl',
		id: 'id',
		ctaButton: []
	};
	export let isRecent: boolean;
	const ctaRecentItem: any = item.ctaButton?.[0];

	function clickHandler() {
		if (!ctaRecentItem) {
			return;
		}
		let str = JSON.stringify(ctaRecentItem);
		goto(`/flights/search?obj=${str}`);
		searchFlightsParamsStore.set(ctaRecentItem);
		searchFlightStore.searchFlight(ctaRecentItem);
		stateStore.closeModifySearchModal();
	}
</script>

<div class="flex justify-between items-center min-w-80 p-4 gap-8 rounded-md bg-base-200">
	<div class="flex justify-between items-center gap-4 w-full">
		<span class="w-1/4 flex justify-center items-center">
			{#if isRecent}
				<svelte:component this={RecentIcon} />
			{:else}
				<img src={item.imageUrl} alt="flight" class="rounded-md aspect-square h-[53px]" />
			{/if}
		</span>
		<div class="flex w-3/4 flex-col justify-center items-start text-black gap-1">
			<p class="w-full content whitespace-nowrap">
				{item.title}
			</p>
			<p class="text-xs base-content-light">{item.subtitle}</p>
			{#if !isRecent}
				<p class="text-xs">{item.thirdTitle}</p>
			{/if}
		</div>
	</div>
	<button on:click={clickHandler}>
		<RightArrowHalf color="black" />
	</button>
</div>
