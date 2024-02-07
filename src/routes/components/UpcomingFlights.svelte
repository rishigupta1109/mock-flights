<script>
	import RightArrowHalf from '$lib/icons/rightArrowHalf.svelte';
	import UpcomingFlightsCarousel from './UpcomingFlightsCarousel.svelte';
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
	<UpcomingFlightsCarousel />
</div>
