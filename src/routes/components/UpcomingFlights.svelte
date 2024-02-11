<script>
	import { upcomingBookingStore } from '$lib/flights-commons/flights.store';
	import RightArrowHalf from '$lib/icons/rightArrowHalf.svelte';
	import Carousel from './Carousel.svelte';
	$: upcomingFlights = $upcomingBookingStore.booking;
</script>

<div class="w-full flex flex-col">
	<span class="flex w-full justify-between">
		<p class="link link-primary decoration-transparent flex gap-2 items-center">
			Upcoming Flights
			<RightArrowHalf color="primary" />
		</p>
		<p class="link link-primary decoration-transparent flex gap-2 items-center">
			<span class="badge badge-error text-base-200">new</span> Web Check-in
		</p>
	</span>
	<Carousel items={upcomingFlights} isRecent={false} />
</div>
