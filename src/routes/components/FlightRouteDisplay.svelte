<script lang="ts">
	import { searchFlightsParamsStore } from '$lib/flights-commons/flights.store';
	import AirplaneIcon from '$lib/icons/airplaneIcon.svelte';
	import ExchangeIcon from '$lib/icons/exchangeIcon.svelte';
	import CityWithCodeTag from './CityWithCodeTag.svelte';

	let src = [$searchFlightsParamsStore.src];
	let des = [$searchFlightsParamsStore.des];
	$: if ($searchFlightsParamsStore.src !== des[0] && $searchFlightsParamsStore.des !== src[0]) {
		src = [$searchFlightsParamsStore.src];
		des = [$searchFlightsParamsStore.des];
	}

	let exchangeBtn: HTMLButtonElement;

	function handleExchange(e: MouseEvent) {
		searchFlightsParamsStore.exchangeCities();
		console.log('exchange cities', e);
		exchangeBtn.classList.add('animate-spin');
		let tempSrc = src[0];
		let tempDes = des[0];
		src = src.filter((s) => s !== tempSrc);
		des = des.filter((d) => d !== tempDes);
		src.push(tempDes);
		des.push(tempSrc);
		setTimeout(() => {
			exchangeBtn.classList.remove('animate-spin');
		}, 500);
	}
</script>

<div class="flex items-center bg-base-200 rounded-md p-5 gap-2">
	<div class="flex flex-col justify-around items-center py-1 gap-1">
		<span class="h-2 w-2 rounded-full bg-primary" />
		<span class="h-7 w-[1px] bg-primary" />
		<AirplaneIcon color="primary" testId="airplane-icon" />
	</div>
	<div class="flex flex-col w-full justify-between gap-2">
		<CityWithCodeTag type={'src'} city={src} />
		<span class="w-full border border-spacing-4 border-dashed border-base-300" />
		<CityWithCodeTag type="dest" city={des} />
	</div>
	<button
		class="border h-10 aspect-square rounded-full border-primary"
		bind:this={exchangeBtn}
		on:click={handleExchange}
	>
		<ExchangeIcon color="primary" testId="exchange-icon" />
	</button>
</div>
