<script lang="ts">
	import Loading from '$lib/components/Loading.svelte';
	import NavbarHeader from './components/NavbarHeader.svelte';
	import RecentSearches from './components/RecentSearches.svelte';
	import SearchFlight from './components/SearchFlight.svelte';
	import UpcomingFlights from './components/UpcomingFlights.svelte';
	import { loadingStore } from '$lib/flights-commons/flights.store';
</script>

{#if $loadingStore}
	<Loading />
{:else}
	<NavbarHeader />
	<div class="flex flex-col p-6 gap-4">
		<SearchFlight />
		<UpcomingFlights />
		<RecentSearches />
	</div>
{/if}
