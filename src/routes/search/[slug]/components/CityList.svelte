<script lang="ts">
	import LocationIcon from '$lib/icons/locationIcon.svelte';
	import RecentIcon from '$lib/icons/recentIcon.svelte';
	import CityCard from './CityCard.svelte';

	export let title: string;
	export let isRecent: boolean = false;
	export let cities: {
		city: string;
		code: string;
		airport: string;
	}[] = [
		{
			city: 'New Delhi',
			code: 'DEL',
			airport: 'Indira Gandhi International Airport'
		},
		{
			city: 'Mumbai',
			code: 'BOM',
			airport: 'Chhatrapati Shivaji Maharaj International Airport'
		},
		{
			city: 'Bangalore',
			code: 'BLR',
			airport: 'Kempegowda International Airport'
		},
		{
			city: 'Hyderabad',
			code: 'HYD',
			airport: 'Rajiv Gandhi International Airport'
		},
		{
			city: 'Chennai',
			code: 'MAA',
			airport: 'Chennai International Airport'
		},
		{
			city: 'Kolkata',
			code: 'CCU',
			airport: 'Netaji Subhas Chandra Bose International Airport'
		},
		{
			city: 'Ahmedabad',
			code: 'AMD',
			airport: 'Sardar Vallabhbhai Patel International Airport'
		},
		{
			city: 'Pune',
			code: 'PNQ',
			airport: 'Pune Airport'
		},
		{
			city: 'Jaipur',
			code: 'JAI',
			airport: 'Jaipur International Airport'
		},
		{
			city: 'Lucknow',
			code: 'LKO',
			airport: 'Chaudhary Charan Singh International Airport'
		},
		{
			city: 'Kochi',
			code: 'COK',
			airport: 'Cochin International Airport'
		},
		{
			city: 'Goa',
			code: 'GOI',
			airport: 'Goa International Airport'
		},
		{
			city: 'Thiruvananthapuram',
			code: 'TRV',
			airport: 'Trivandrum International Airport'
		},
		{
			city: 'Bhubaneswar',
			code: 'BBI',
			airport: 'Biju Patnaik International Airport'
		},
		{
			city: 'Visakhapatnam',
			code: 'VTZ',
			airport: 'Visakhapatnam International Airport'
		},
		{
			city: 'Guwahati',
			code: 'GAU',
			airport: 'Lokpriya Gopinath Bordoloi International Airport'
		},
		{
			city: 'Patna',
			code: 'PAT',
			airport: 'Jay Prakash Narayan International Airport'
		}
	];
</script>

<div>
	<h2 class="heading-1 text-base-content px-4">{title}</h2>
	<div class="flex flex-col py-4">
		{#each cities as { city, code, airport } (code)}
			<CityCard {city} {code} {airport} {isRecent} />
		{/each}
	</div>
</div>
