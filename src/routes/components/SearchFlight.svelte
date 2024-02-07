<script lang="ts">
	import DuoCard from '$lib/components/DuoCard.svelte';
	import AirplaneIcon from '$lib/icons/airplaneIcon.svelte';
	import ExchangeIcon from '$lib/icons/exchangeIcon.svelte';
	import AddIcon from '$lib/icons/addIcon.svelte';
	import CityWithCodeTag from './CityWithCodeTag.svelte';
</script>

<div class="flex flex-col p-8 gap-4">
	<div class="flex items-center bg-base-200 rounded-md p-5 gap-2">
		<div class="flex flex-col justify-around items-center gap-1">
			<span class="h-2 w-2 rounded-full bg-primary" />
			<span class="h-10 w-[1px] bg-primary" />
			<AirplaneIcon color="primary" testId="airplane-icon" />
		</div>
		<div class="flex flex-col w-full justify-between gap-2">
			<CityWithCodeTag city="Delhi" code="DEL" />
			<span class="w-full border border-spacing-4 border-dashed border-base-300" />
			<CityWithCodeTag city="Banglore" code="BLR" />
		</div>
		<button class="border h-10 aspect-square rounded-full border-primary">
			<ExchangeIcon color="primary" testId="exchange-icon" />
		</button>
	</div>

	<DuoCard>
		<div slot="left" class="flex w-[40%] flex-col p-2">
			<span class="card-content text-base-300">Departure</span>
			<span class="card-sub-heading">7 feb</span>
			<span class="card-content text-base-300">Wednesday</span>
		</div>
		<div slot="right" class="flex w-[45%] justify-between items-center">
			<div class="flex flex-col p-2">
				<span class="card-content text-base-300">Return</span>
				<span class="card-sub-heading">Add Return</span>
				<span class="card-content text-base-300">and save more!</span>
			</div>
			<button class="h-6 aspect-square rounded-full cursor-pointer">
				<AddIcon color="primary" testId="exchange-icon" />
			</button>
		</div>
	</DuoCard>
</div>
