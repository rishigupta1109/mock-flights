<script lang="ts">
	import type { UpcomingBooking } from '$lib/flights-commons/flights.type';
	import RecentIcon from '$lib/icons/recentIcon.svelte';
	import RightArrowHalf from '$lib/icons/rightArrowHalf.svelte';
	export let item: UpcomingBooking = {
		title: 'title',
		subtitle: 'subtitle',
		thirdTitle: 'thirdTitle',
		imageUrl: 'imageUrl',
		id: 'id',
		ctaButton: []
	};
	export let isRecent: boolean;
</script>

<div class="flex justify-between items-center min-w-80 p-4 gap-8 rounded-md bg-base-200">
	<div class="flex justify-between items-center gap-4 w-9/10">
		<span class="w-2/5 flex justify-center items-center">
			{#if isRecent}
				<svelte:component this={RecentIcon} />
			{:else}
				<img src={item.imageUrl} alt="flight" class="rounded-md aspect-square h-14" />
			{/if}
		</span>
		<div class="flex w-3/5 flex-col text-black gap-1">
			<p class="w-full whitespace-nowrap">
				{item.title}
			</p>
			<p class="text-xs base-content-light">{item.subtitle}</p>
			{#if !isRecent}
				<p class="text-xs">{item.thirdTitle}</p>
			{/if}
		</div>
	</div>
	<RightArrowHalf color="black" />
</div>
