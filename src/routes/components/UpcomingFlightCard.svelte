<script lang="ts">
	import RightArrow from '$lib/icons/rightArrow.svelte';
	import RightArrowHalf from '$lib/icons/rightArrowHalf.svelte';
	export let item: any;
</script>

<div class="flex justify-between items-center min-w-fit p-4 gap-8 rounded-md bg-base-200">
	<div class="flex justify-between items-center gap-4">
		<img src={item.image} alt="flight" class="rounded-md aspect-square h-14" />
		<div class="flex flex-col w-full text-black">
			<p class="flex items-center gap-1">
				{item.source}
				<RightArrow />
				{item.destination}
			</p>
			<p class="text-xs base-content-light">{item.date}</p>
			<p class="text-xs">{item.traveller} Traveller | {item.class}</p>
		</div>
	</div>
	<RightArrowHalf color="black" />
</div>
