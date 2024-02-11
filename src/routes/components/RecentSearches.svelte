<script>
	import RecentIcon from '$lib/icons/recentIcon.svelte';
	import Carousel from './Carousel.svelte';
	let items = [
		{
			title: 'New Delhi → Bangalore',
			subtitle: 'Mon, Nov 21',
			thirdTitle: 'thirdTitle',
			imageUrl: 'imageUrl',
			id: 'id',
			ctaButton: []
		},
		{
			title: 'New Delhi → Bangalore',
			subtitle: 'Mon, Nov 21',
			thirdTitle: 'thirdTitle',
			imageUrl: 'imageUrl',
			id: 'id',
			ctaButton: []
		},
		{
			title: 'New Delhi → Bangalore',
			subtitle: 'Mon, Nov 21',
			thirdTitle: 'thirdTitle',
			imageUrl: 'imageUrl',
			id: 'id',
			ctaButton: []
		}
	];
</script>

<div class="w-full flex flex-col text-base-content">
	<p>Recent Searches</p>
	<Carousel {items} isRecent={true} />
</div>
