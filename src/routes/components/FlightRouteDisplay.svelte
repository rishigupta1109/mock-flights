<script>
	import AirplaneIcon from '$lib/icons/airplaneIcon.svelte';
	import ExchangeIcon from '$lib/icons/exchangeIcon.svelte';
	import CityWithCodeTag from './CityWithCodeTag.svelte';
</script>

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
