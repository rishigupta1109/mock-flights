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
</div>
