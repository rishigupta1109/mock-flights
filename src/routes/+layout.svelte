<script lang="ts">
	import 'tailwindcss/tailwind.css';
	import '../global.css';
	import dayjs from 'dayjs';
	import customParseFormat from 'dayjs/plugin/customParseFormat';
	import {
		alertStore,
		configStore,
		popularCitiesStore,
		stateStore,
		upcomingBookingStore,
		walletStore
	} from '$lib/flights-commons/flights.store';
	import { onMount } from 'svelte';
	import Loading from '$lib/components/Loading.svelte';
	import Alerts from '$lib/components/Alerts.svelte';
	import SelectTravellerModal from './components/SelectTravellerModal.svelte';
	dayjs.extend(customParseFormat);
	let loading = true;
	onMount(async () => {
		await configStore.fetchConfig();
		await walletStore.fetchWallet();
		await upcomingBookingStore.fetchUpcomingBookings();
		await popularCitiesStore.fetchPopularCities();
		loading = false;
	});
</script>

<div class="bg-base-100 min-h-screen text-white">
	{#if loading}
		<Loading />
	{:else}
		<slot />
		{#key $stateStore.isTravellerModalOpen}
			<SelectTravellerModal />
		{/key}
	{/if}
	<Alerts />
</div>

<style>
	:global(html) {
		font-size: 10px;
	}
	@media (min-width: 281px) {
		:global(html) {
			font-size: 12px;
		}
	}
	@media (min-width: 375px) {
		:global(html) {
			font-size: 14px;
		}
	}
</style>
