<script lang="ts">
	import Loading from '$lib/components/Loading.svelte';
	import NavbarHeader from './components/NavbarHeader.svelte';
	import RecentSearches from './components/RecentSearches.svelte';
	import SearchFlight from './components/SearchFlight.svelte';
	import UpcomingFlights from './components/UpcomingFlights.svelte';
	import {
		configStore,
		loadingStore,
		stateStore,
		upcomingBookingStore,
		walletStore
	} from '$lib/flights-commons/flights.store';
	import { onMount } from 'svelte';
	import SelectTravellerModal from './components/SelectTravellerModal.svelte';

	console.log('page', $loadingStore);
	let loading = true;
	onMount(async () => {
		loading = true;
		await configStore.fetchConfig();
		await walletStore.fetchWallet();
		await upcomingBookingStore.fetchUpcomingBookings();
		loading = false;
	});
</script>

{#if $loadingStore || loading}
	<Loading />
{:else}
	<NavbarHeader />
	<div class="flex flex-col p-6 gap-4" data-testId="landing-page">
		<SearchFlight />
		<UpcomingFlights />
		<RecentSearches />
	</div>
	{#key $stateStore.isTravellerModalOpen}
		<SelectTravellerModal />
	{/key}
{/if}
