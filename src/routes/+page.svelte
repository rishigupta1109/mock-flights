<script>
	import Navbar from '$lib/components/Navbar.svelte';
	import NavbarHeader from './components/NavbarHeader.svelte';
	import SearchFlight from './components/SearchFlight.svelte';
	import UpcomingFlights from './components/UpcomingFlights.svelte';
</script>

<NavbarHeader />
<div class="flex flex-col p-8 gap-4">
	<SearchFlight />
	<UpcomingFlights />
</div>
