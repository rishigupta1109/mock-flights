<script lang="ts">
	import {
		configStore,
		popularCitiesStore,
		searchCityStore,
		searchFlightsParamsStore
	} from '$lib/flights-commons/flights.store';
	import type { Airport, City } from '$lib/flights-commons/flights.type';
	import CrossIcon from '$lib/icons/crossIcon.svelte';
	import SearchIcon from '$lib/icons/searchIcon.svelte';
	import CityList from './components/CityList.svelte';
	import NavHeader from './components/NavHeader.svelte';
	import {
		cacheRecentCitySearches,
		catchError,
		containsValidChars,
		getRecentCitySearches
	} from '../../../../utils/flights.utils';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	export let data: {
		title: string;
		variable: string;
	};

	let { title, variable } = data;
	let city: string = '';
	let showSearchResults: boolean = false;
	let timeOut: NodeJS.Timeout;
	let error: string = '';
	let loading = true;

	let popularCities: Airport[];

	$: searchResults = $searchCityStore?.airportList || [];
	let recentCities: Airport[] = [];
	$: {
		if (!containsValidChars(city)) {
			error = $configStore?.searchRequest?.configMap?.SEARCH_CITY_REGEX_ERROR_MESSAGE;
		} else if (city.trim().length > 50) error = 'city name is too long';
		else if (city.trim().length >= 3) {
			error = '';
			showSearchResults = true;
			if (timeOut) clearTimeout(timeOut);
			timeOut = setTimeout(async () => {
				loading = true;
				await searchCityStore.getSearchCity(city);
				loading = false;
			}, 1000);
		}
	}

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
		cacheRecentCitySearches(city);
		console.log($searchFlightsParamsStore);
		if (typeof window !== 'undefined' && window.history.length > 1) window.history.back();
		else goto('/');
	}

	onMount(
		catchError.bind(
			null,
			async () => {
				loading = true;
				await configStore.fetchConfig();
				await popularCitiesStore.fetchPopularCities();
				popularCities = popularCitiesStore.getPopularCities() || [];
				recentCities = getRecentCitySearches();
				const query = new URLSearchParams(window.location.search);
				const searchParam = query.get('obj') ? JSON.parse(query.get('obj') as string) : {};
				console.log('searchParam', searchParam);
				searchFlightsParamsStore.set(searchParam);
				loading = false;
			},
			undefined,
			'Invalid search params. Please try again.',
			() => {
				goto('/');
			}
		)
	);
</script>

<NavHeader {title} />
<div class="w-full p-4">
	<span class="w-full flex justify-between items-center bg-base-200 p-4 py-2 rounded-md">
		<input
			type="text"
			bind:value={city}
			placeholder="Enter City/Airport Name"
			maxlength="50"
			class="p-2 w-full outline-none text-base-content sub-text"
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
{#if loading}
	<div class="skeleton"></div>
{:else if !showSearchResults}
	{#if recentCities.length > 0}
		<CityList
			on:click={clickHandler}
			title="Recent Searches"
			cities={recentCities}
			isRecent={true}
		/>
	{/if}
	{#if popularCities.length > 0}
		<CityList on:click={clickHandler} title="Popular Cities" cities={popularCities} />
	{/if}
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
