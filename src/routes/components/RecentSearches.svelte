<script>
	import RecentIcon from '$lib/icons/recentIcon.svelte';
	import Carousel from './Carousel.svelte';
	let items = [
		{
			image: './recentIcon.svg',
			source: 'New Delhi',
			destination: 'Mumbai',
			date: 'Mon,July 12',
			traveller: '1',
			class: 'Economy',
			icon: RecentIcon
		},
		{
			image: './recentIcon.svg',
			source: 'New Delhi',
			destination: 'Mumbai',
			date: 'Mon,July 12',
			traveller: '1',
			class: 'Economy',
			icon: RecentIcon
		},
		{
			image: './recentIcon.svg',
			source: 'New Delhi',
			destination: 'Mumbai',
			date: 'Mon,July 12',
			traveller: '1',
			class: 'Economy',
			icon: RecentIcon
		},
		{
			image: './recentIcon.svg',
			source: 'New Delhi',
			destination: 'Mumbai',
			date: 'Mon,July 12',
			traveller: '1',
			class: 'Economy',
			icon: RecentIcon
		}
	];
</script>

<div class="w-full flex flex-col text-base-content">
	<p>Recent Searches</p>
	<Carousel {items} isRecent={true} />
</div>
