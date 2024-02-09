<script lang="ts">
	import { goto } from '$app/navigation';
	import { popularCitiesStore, searchFlightsParamsStore } from '$lib/flights-commons/flights.store';
	import type { Airport } from '$lib/flights-commons/flights.type';
	import CrossIcon from '$lib/icons/crossIcon.svelte';
	import SearchIcon from '$lib/icons/searchIcon.svelte';
	import CityList from './components/CityList.svelte';
	import NavHeader from './components/NavHeader.svelte';

	export let data: {
		title: string;
		variable: string;
	};
	let { title, variable } = data;
	let city: string = '';
	const popularCities: Airport[] = popularCitiesStore.getPopularCities();

	function clickHandler(e: CustomEvent<{ city: Airport }>) {
		const city = e.detail.city;
		if (variable === 'src') {
			if ($searchFlightsParamsStore.des.iataCode === city.iataCode) return;
			searchFlightsParamsStore.setSrc(city);
		} else {
			if ($searchFlightsParamsStore.src.iataCode === city.iataCode) return;
			searchFlightsParamsStore.setDes(city);
		}
		goto('/');
	}
</script>

<NavHeader {title} />
<div class="w-full p-4">
	<span class="w-full flex justify-between items-center bg-base-200 p-4 py-2 rounded-md">
		<input
			type="text"
			bind:value={city}
			placeholder="Enter City/Airport Name"
			class="p-2 w-full outline-none text-base-content"
		/>
		{#if city.trim() === ''}
			<SearchIcon />
		{:else}
			<button on:click={() => (city = '')}>
				<CrossIcon />
			</button>
		{/if}
	</span>
</div>
{#if city.trim() === ''}
	<CityList on:click={clickHandler} title="Recent Searches" isRecent={true} />
	<CityList on:click={clickHandler} title="Popular Cities" cities={popularCities} />
{:else}
	<CityList on:click={clickHandler} title="Search Results" />
{/if}
