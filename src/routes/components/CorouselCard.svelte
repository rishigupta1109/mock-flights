<script lang="ts">
	import RightArrow from '$lib/icons/rightArrow.svelte';
	import RightArrowHalf from '$lib/icons/rightArrowHalf.svelte';
	export let item: any;
	export let isRecent: boolean;
</script>

<div class="flex justify-between items-center min-w-80 p-4 gap-8 rounded-md bg-base-200">
	<div class="flex justify-between items-center gap-4 w-9/10">
		<span class="w-2/5 flex justify-center items-center">
			{#if isRecent}
				<svelte:component this={item.icon} class="h-14" />
			{:else}
				<img src={item.image} alt="flight" class="rounded-md aspect-square h-14" />
			{/if}
		</span>
		<div class="flex w-3/5 flex-col text-black">
			<p class="flex items-center w-full whitespace-nowrap gap-1">
				{item.source}
				<RightArrow color="black" testId="arrow" />
				{item.destination}
			</p>
			<p class="text-xs base-content-light">{item.date}</p>
			{#if !isRecent}
				<p class="text-xs">{item.traveller} Traveller | {item.class}</p>
			{/if}
		</div>
	</div>
	<RightArrowHalf color="black" />
</div>
