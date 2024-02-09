<script lang="ts">
	import CrossIcon from '$lib/icons/crossIcon.svelte';
	import { type Guest, type Traveller } from '$lib/flights-commons/flights.type';
	import { configStore, searchFlightsParamsStore } from '$lib/flights-commons/flights.store';
	export let open: boolean = false;
	let guests: Guest[] = configStore.getGuests().map((guest) => {
		return {
			...guest,
			value: guest.defaultValue
		};
	});
	let travellers: Traveller[] = configStore.getTravellerClasses();
	let selectedTraveller: string = searchFlightsParamsStore
		.getTravellerClass()
		.key.toLocaleUpperCase();
	function changeHandler(i: number, numToAdd: number) {
		if (!guests || !guests[i] || guests[i]?.value === undefined) return;
		if (numToAdd === -1 && guests[i].value === guests[i].minValue) return;
		if (numToAdd === 1 && guests[i].value === guests[i].maxValue) return;
		guests[i].value = (guests[i].value || 0) + numToAdd;
	}
	$: console.log($searchFlightsParamsStore);

	function proceedHandler() {
		const counts = {
			adultCount: 0,
			childCount: 0,
			infantCount: 0
		};
		for (let guest of guests) {
			if (guest.guestType === 'ADULT') {
				counts.adultCount += guest.value || 0;
			} else if (guest.guestType === 'CHILD') {
				counts.childCount += guest.value || 0;
			} else if (guest.guestType === 'INFANT') {
				counts.infantCount += guest.value || 0;
			}
		}
		searchFlightsParamsStore.setPassenger(counts);
		searchFlightsParamsStore.setTravellerClass(
			travellers.find((traveller) => traveller.key === selectedTraveller) || {
				key: 'ECONOMY',
				value: 'Economy'
			}
		);
		open = false;
	}
</script>

<dialog class="modal modal-bottom text-base-content bg-base-100 {open ? 'modal-open' : ''}">
	<div class="modal-box bottom-0 flex flex-col gap-4">
		<span class="w-full flex justify-end">
			<button
				class="bg-white p-2 rounded-md"
				on:click={() => {
					open = false;
				}}
			>
				<CrossIcon color="primary" />
			</button>
		</span>
		<h2 class="heading-2">Select Traveller(s)</h2>
		{#each guests as guest, i}
			<div class="flex justify-between items-center">
				<span class="flex flex-col">
					<p class="card-sub-heading">{guest.textName}</p>
					<p class="sub-text">{guest.subTextName}</p>
				</span>
				<div class="flex items-center bg-base-200 p-2 rounded-2xl">
					<button
						on:click={changeHandler.bind(null, i, -1)}
						class="btn btn-xs border-none outline-none shadow-none">-</button
					>
					<span class="mx-4">{guest.value}</span>
					<button
						on:click={changeHandler.bind(null, i, 1)}
						class="btn btn-xs border-none outline-none shadow-none">+</button
					>
				</div>
			</div>
		{/each}
		<h2 class="heading-2">Select Class</h2>

		{#each travellers as traveller, i}
			<span class="flex items-center gap-4">
				<input
					type="radio"
					name={traveller.key}
					id={traveller.key}
					value={traveller.key}
					bind:group={selectedTraveller}
					class="radio radio-sm radio-primary"
				/>
				<label for={traveller.key}>{traveller.value}</label>
			</span>
		{/each}

		<button on:click={proceedHandler} class="btn btn-success text-base-200 w-full">Proceed</button>
	</div>
	<form
		method="dialog"
		class="modal-backdrop"
		on:submit={(e) => {
			e.preventDefault();
			open = false;
		}}
	>
		<button>close</button>
	</form>
</dialog>
