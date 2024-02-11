<script>
	import DuoCard from '$lib/components/DuoCard.svelte';
	import { searchFlightsParamsStore } from '$lib/flights-commons/flights.store';
	import DownArrowHalf from '$lib/icons/downArrowHalf.svelte';
	import SelectTravellerModal from './SelectTravellerModal.svelte';

	$: passengerCount =
		$searchFlightsParamsStore.passenger.adultCount +
		$searchFlightsParamsStore.passenger.childCount +
		$searchFlightsParamsStore.passenger.infantCount;
	$: console.log($searchFlightsParamsStore);
	let openModal = false;
</script>

<DuoCard
	on:click={() => {
		openModal = true;
	}}
>
	<div slot="left" class="flex w-[45%] flex-col p-2">
		<span class="card-content base-content-light">Class</span>
		<span class="card-sub-heading flex gap-4 items-center justify-start">
			{$searchFlightsParamsStore.travellerClass.value}
			<DownArrowHalf color="black" testId="down-arrow-icon" />
		</span>
	</div>

	<div slot="right" class="flex w-[45%] flex-col p-2">
		<span class="card-content base-content-light">Traveller</span>
		<span class="card-sub-heading flex gap-4 items-center justify-start">
			{passengerCount}
			<DownArrowHalf color="black" testId="down-arrow-icon" />
		</span>
	</div>
</DuoCard>
{#key openModal}
	<SelectTravellerModal bind:open={openModal} />
{/key}
