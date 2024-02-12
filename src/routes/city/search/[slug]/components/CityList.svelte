<script lang="ts">
	import { popularCitiesStore } from '$lib/flights-commons/flights.store';
	import type { Airport } from '$lib/flights-commons/flights.type';
	import LocationIcon from '$lib/icons/locationIcon.svelte';
	import RecentIcon from '$lib/icons/recentIcon.svelte';
	import CityCard from './CityCard.svelte';

	export let title: string;
	export let isRecent: boolean = false;
	export let cities: Airport[] = popularCitiesStore.getPopularCities();
</script>

<div>
	<h2 class="card-sub-heading text-base-content px-4">{title}</h2>
	<div class="flex flex-col py-4">
		{#each cities as city (city)}
			<CityCard on:click {city} {isRecent} />
		{/each}
		{#if cities.length === 0}
			<p class="base-content-light px-4">No cities found</p>
		{/if}
	</div>
</div>
