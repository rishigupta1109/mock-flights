<script lang="ts">
	import type { UpcomingBooking } from '$lib/flights-commons/flights.type';
	import CarouselCard from './CorouselCard.svelte';
	export let isRecent: boolean;
	export let items: UpcomingBooking[];
</script>

<div class="carousel carousel-center py-4 w-full bg-base-100 gap-4">
	{#each items as item}
		<CarouselCard {item} {isRecent} />
	{/each}

	{#if items.length === 0 && isRecent}
		<p class="base-content-light">No recent searches found</p>
	{/if}

	{#if items.length === 0 && !isRecent}
		<p class="base-content-light">No upcoming bookings found</p>
	{/if}
</div>
