<script lang="ts">
	import type { Airport } from '$lib/flights-commons/flights.type';
	import LocationIcon from '$lib/icons/locationIcon.svelte';
	import RecentIcon from '$lib/icons/recentIcon.svelte';
	import { createEventDispatcher } from 'svelte';

	export let city: Airport;
	export let isRecent: boolean = false;

	const dispatch = createEventDispatcher();
</script>

<div
	on:click={() => dispatch('click', { city })}
	role="button"
	tabindex="0"
	on:keydown={(e) => e.key === 'Enter'}
	class="w-full cursor-pointer border-t border-t-base-300 p-6 px-8 flex justify-start items-center text-base-content gap-4"
>
	{#if isRecent}
		<RecentIcon />
	{:else}
		<LocationIcon />
	{/if}
	<span class="flex flex-col gap-1">
		<p class="card-content font-medium">{city.city}</p>
		<p class="base-content-light text-xs">{city.iataCode}-{city.name}</p>
	</span>
</div>
