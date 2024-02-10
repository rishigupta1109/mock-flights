<script>
	import Navbar from '$lib/components/Navbar.svelte';
	import { searchFlightsParamsStore } from '$lib/flights-commons/flights.store';
	import EditIcon from '$lib/icons/editIcon.svelte';
	import RightArrow from '$lib/icons/rightArrow.svelte';
	import dayjs from 'dayjs';

	$: src = $searchFlightsParamsStore.src.city;
	$: des = $searchFlightsParamsStore.des.city;
	$: departDate = dayjs($searchFlightsParamsStore.departDate, 'DD-MM-YYYY').format('DD MMM');
	$: passenger = $searchFlightsParamsStore.passenger;
	$: TravellerClass = $searchFlightsParamsStore.travellerClass;
	$: passengerCount = passenger?.adultCount + passenger?.childCount + passenger?.infantCount;
	console.log(departDate);
</script>

<Navbar>
	<div class="flex justify-between items-center w-full">
		<div class="flex flex-col p-2">
			<span class="flex heading-1">
				{src}
				<span class="flex items-center justify-center w-8 h-8 bg-primary rounded-full">
					<RightArrow color="white" />
				</span>

				{des}
			</span>
			<span>{departDate} | {passengerCount} Traveller | {TravellerClass.value} </span>
		</div>
		<button on:click class="bg-base-200 p-1 rounded-md">
			<EditIcon />
		</button>
	</div>
</Navbar>
