<script lang="ts">
	import DuoCard from '$lib/components/DuoCard.svelte';
	import AddIcon from '$lib/icons/addIcon.svelte';
	import { Datepicker } from 'svelte-calendar';
	import dayjs from 'dayjs';
	import customParseFormat from 'dayjs/plugin/customParseFormat';
	import { searchFlightsParamsStore } from '$lib/flights-commons/flights.store';

	let departureDate: any;
	let returnDate: any;

	console.log(
		'searchFlightsParamsStore',
		$searchFlightsParamsStore.departDate,
		dayjs($searchFlightsParamsStore.departDate, 'DD-MM-YYYY').format('DD-MM-YYYY')
	);
	let departDate = dayjs($searchFlightsParamsStore.departDate, 'DD-MM-YYYY').toDate();

	$: {
		if (!isNaN(departDate.getTime()))
			searchFlightsParamsStore.setDepartDate(dayjs(departDate).format('DD-MM-YYYY'));
		else departDate = dayjs($searchFlightsParamsStore.departDate, 'DD-MM-YYYY').toDate();
	}
	$: console.log('departDate', departDate, departDate.getTime(), $searchFlightsParamsStore);
	let theme = {
		calendar: {
			height: '100vh'
		}
	};
</script>

<DuoCard>
	<div slot="left" class="flex w-[45%] flex-col p-2 cursor-pointer">
		<Datepicker
			bind:store={departureDate}
			bind:selected={departDate}
			let:key
			let:send
			let:receive
			{theme}
		>
			<button class="flex flex-col w-full" in:receive|local={{ key }} out:send|local={{ key }}>
				<span class="card-content base-content-light">Departure</span>
				<span class="card-sub-heading">{dayjs($departureDate?.selected).format('D MMM')}</span>
				<span class="card-content base-content-light">
					{dayjs($departureDate?.selected).format('dddd')}
				</span>
			</button>
		</Datepicker>
	</div>
	<div slot="right" class="flex w-[45%] justify-between items-center">
		<Datepicker bind:store={returnDate} let:key let:send let:receive {theme}>
			<button class="flex flex-col w-full" in:receive|local={{ key }} out:send|local={{ key }}>
				{#if $returnDate?.hasChosen}
					<span class="card-content base-content-light">Departure</span>
					<span class="card-sub-heading">{dayjs($returnDate.selected).format('D MMM')}</span>
					<span class="card-content base-content-light">
						{dayjs($returnDate.selected).format('dddd')}
					</span>
				{:else}
					<div class="flex justify-between items-center w-full gap-8">
						<div class="flex flex-col justify-center items-start">
							<span class="card-content base-content-light">Return</span>
							<span class="card-sub-heading">Add Return</span>
							<span class="card-content base-content-light"> and save more! </span>
						</div>
						<button class="h-6 aspect-square rounded-full cursor-pointer">
							<AddIcon color="primary" testId="add-icon" />
						</button>
					</div>
				{/if}
			</button>
		</Datepicker>
		<!-- <div class="flex flex-col p-2">
			<span class="card-content base-content-light">Return</span>
			<span class="card-sub-heading">Add Return</span>
			<span class="card-content base-content-light">and save more!</span>
		</div>
		<button class="h-6 aspect-square rounded-full cursor-pointer">
			<AddIcon color="primary" testId="add-icon" />
		</button> -->
	</div>
</DuoCard>
