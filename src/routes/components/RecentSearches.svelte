<script lang="ts">
	import type { FlightSearchRequest } from '$lib/flights-commons/flights.type';
	import RecentIcon from '$lib/icons/recentIcon.svelte';
	import dayjs from 'dayjs';
	import { getRecentFlightSearches } from '../../utils/flights.utils';
	import Carousel from './Carousel.svelte';
	$: items = getRecentFlightSearches().map((item: FlightSearchRequest) => {
		return {
			title: `${item.src.city} → ${item.des.city}`,
			subtitle: `${dayjs(item.departDate, 'DD-MM-YYYY').format('dd, MMM DD')}`,
			thirdTitle: ``,
			imageUrl: '',
			id: '',
			ctaButton: [item]
		};
	});
</script>

{#if items.length > 0}
	<div class="w-full flex flex-col text-base-content">
		<p>Recent Searches</p>
		<Carousel {items} isRecent={true} />
	</div>
{/if}
