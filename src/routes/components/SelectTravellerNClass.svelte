<script>
	import DuoCard from '$lib/components/DuoCard.svelte';
	import DownArrowHalf from '$lib/icons/downArrowHalf.svelte';
</script>

<DuoCard>
	<div slot="left" class="flex w-[45%] flex-col p-2">
		<span class="card-content base-content-light">Class</span>
		<span class="card-sub-heading flex gap-4 items-center justify-start"
			>Economy
			<DownArrowHalf color="black" testId="down-arrow-icon" />
		</span>
	</div>

	<div slot="right" class="flex w-[45%] flex-col p-2">
		<span class="card-content base-content-light">Traveller</span>
		<span class="card-sub-heading flex gap-4 items-center justify-start"
			>1
			<DownArrowHalf color="black" testId="down-arrow-icon" />
		</span>
	</div>
</DuoCard>
