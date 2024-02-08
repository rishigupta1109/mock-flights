<script lang="ts">
	import NavbarHeader from './components/NavbarHeader.svelte';
	import RecentSearches from './components/RecentSearches.svelte';
	import SearchFlight from './components/SearchFlight.svelte';
	import UpcomingFlights from './components/UpcomingFlights.svelte';
</script>

<NavbarHeader />
<div class="flex flex-col p-8 gap-4">
	<SearchFlight />
	<UpcomingFlights />
	<RecentSearches />
</div>
