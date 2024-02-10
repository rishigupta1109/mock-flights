<script lang="ts">
	import CarouselCard from './CorouselCard.svelte';
	export let isRecent: boolean;
	export let items: any[] = [
		{
			image:
				'https://is1-ssl.mzstatic.com/image/thumb/Purple116/v4/b0/cf/dc/b0cfdc9a-7958-e116-9070-b12cd83993aa/AppIcon-0-0-1x_U007emarketing-0-6-0-85-220.png/512x512bb.jpg',
			source: 'New Delhi',
			destination: 'Mumbai',
			date: 'Mon,July 12',
			traveller: '1',
			class: 'Economy'
		},
		{
			image:
				'https://is1-ssl.mzstatic.com/image/thumb/Purple116/v4/b0/cf/dc/b0cfdc9a-7958-e116-9070-b12cd83993aa/AppIcon-0-0-1x_U007emarketing-0-6-0-85-220.png/512x512bb.jpg',
			source: 'New Delhi',
			destination: 'Mumbai',
			date: 'Mon,July 12',
			traveller: '1',
			class: 'Economy'
		},
		{
			image:
				'https://is1-ssl.mzstatic.com/image/thumb/Purple116/v4/b0/cf/dc/b0cfdc9a-7958-e116-9070-b12cd83993aa/AppIcon-0-0-1x_U007emarketing-0-6-0-85-220.png/512x512bb.jpg',
			source: 'New Delhi',
			destination: 'Mumbai',
			date: 'Mon,July 12',
			traveller: '1',
			class: 'Economy'
		},
		{
			image:
				'https://is1-ssl.mzstatic.com/image/thumb/Purple116/v4/b0/cf/dc/b0cfdc9a-7958-e116-9070-b12cd83993aa/AppIcon-0-0-1x_U007emarketing-0-6-0-85-220.png/512x512bb.jpg',
			source: 'New Delhi',
			destination: 'Mumbai',
			date: 'Mon,July 12',
			traveller: '1',
			class: 'Economy'
		}
	];
</script>

<div class="carousel carousel-center py-4 w-full bg-base-100 gap-4">
	{#each items as item}
		<CarouselCard {item} {isRecent} />
	{/each}
</div>
