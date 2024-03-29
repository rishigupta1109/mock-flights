<script lang="ts">
	import { goto } from '$app/navigation';
	import {
		popularCitiesStore,
		searchCityStore,
		searchFlightsParamsStore
	} from '$lib/flights-commons/flights.store';
	import type { Airport } from '$lib/flights-commons/flights.type';
	import CrossIcon from '$lib/icons/crossIcon.svelte';
	import SearchIcon from '$lib/icons/searchIcon.svelte';
	import { fly } from 'svelte/transition';
	import CityList from './components/CityList.svelte';
	import NavHeader from './components/NavHeader.svelte';
	import { spring } from 'svelte/motion';
	import { bounceInOut } from 'svelte/easing';
	import { containsValidChars } from '../../../../utils/flights.utils';

	export let data: {
		title: string;
		variable: string;
	};
	let { title, variable } = data;
	let city: string = '';
	let showSearchResults: boolean = false;
	let timeOut: NodeJS.Timeout;
	let error: string = '';
	const popularCities: Airport[] = popularCitiesStore.getPopularCities();
	$: searchResults = $searchCityStore?.airportList || [];
	function clickHandler(e: CustomEvent<{ city: Airport }>) {
		const city = e.detail.city;
		if (variable === 'src') {
			if ($searchFlightsParamsStore.des.iataCode === city.iataCode)
				return (error = 'Source and Destination cannot be same');
			searchFlightsParamsStore.setSrc(city);
		} else {
			if ($searchFlightsParamsStore.src.iataCode === city.iataCode)
				return (error = 'Source and Destination cannot be same');
			searchFlightsParamsStore.setDes(city);
		}
		if (typeof window !== 'undefined') window.history.back();
	}
	$: {
		if (!containsValidChars(city)) {
			error = 'only characters (a-z) are allowed';
		} else if (city.trim().length > 50) error = 'city name is too long';
		else if (city.trim().length >= 3) {
			error = '';
			showSearchResults = true;
			if (timeOut) clearTimeout(timeOut);
			timeOut = setTimeout(() => {
				searchCityStore.getSearchCity(city);
			}, 1000);
		}
	}
</script>

<NavHeader {title} />
<div class="w-full p-4">
	<span class="w-full flex justify-between items-center bg-base-200 p-4 py-2 rounded-md">
		<input
			type="text"
			bind:value={city}
			placeholder="Enter City/Airport Name"
			maxlength="50"
			class="p-2 w-full outline-none text-base-content"
		/>
		{#if !showSearchResults}
			<SearchIcon />
		{:else}
			<button on:click={() => (city = '')}>
				<CrossIcon />
			</button>
		{/if}
	</span>
	{#if error.trim().length > 0}
		{#key error}
			<p class="text-red-500 wiggle-x">
				{error}
			</p>
		{/key}
	{/if}
</div>
{#if !showSearchResults}
	<CityList on:click={clickHandler} title="Recent Searches" isRecent={true} />
	<CityList on:click={clickHandler} title="Popular Cities" cities={popularCities} />
{:else}
	<CityList on:click={clickHandler} title="Search Results" cities={searchResults} />
{/if}

<style>
	@keyframes wiggle-x {
		0%,
		100% {
			transform: translateX(0);
		}
		25% {
			transform: translateX(-5px);
		}
		50% {
			transform: translateX(5px);
		}
		75% {
			transform: translateX(-5px);
		}
	}
	.wiggle-x {
		animation: wiggle-x 0.5s;
	}
</style>
