<script>
	import DuoCard from '$lib/components/DuoCard.svelte';
	import { searchFlightsParamsStore, stateStore } from '$lib/flights-commons/flights.store';
	import DownArrowHalf from '$lib/icons/downArrowHalf.svelte';

	$: passengerCount =
		$searchFlightsParamsStore.passenger.adultCount +
		$searchFlightsParamsStore.passenger.childCount +
		$searchFlightsParamsStore.passenger.infantCount;
</script>

<DuoCard
	on:click={() => {
		stateStore.openTravellerModal();
	}}
>
	<div slot="left" class="flex w-[45%] flex-col p-2 gap-1">
		<span class="sub-text base-content-light">Class</span>
		<span class="card-sub-heading flex gap-12 items-center justify-start">
			{$searchFlightsParamsStore.travellerClass.value.slice(0, -5)}
			<DownArrowHalf color="black" testId="down-arrow-icon" />
		</span>
	</div>

	<div slot="right" class="flex w-[45%] flex-col p-2 gap-1">
		{#if passengerCount <= 1}
			<span class="sub-text base-content-light">Traveller</span>
		{:else}
			<span class="sub-text base-content-light">Traveller(s)</span>
		{/if}
		<span class="card-sub-heading flex gap-12 items-center justify-start">
			{passengerCount}
			<DownArrowHalf color="black" testId="down-arrow-icon" />
		</span>
	</div>
</DuoCard>
