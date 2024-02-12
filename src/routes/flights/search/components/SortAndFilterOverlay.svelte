<script>
	import FilterIcon from '$lib/icons/filterIcon.svelte';
</script>

<div class="fixed bottom-0 w-screen flex">
	<div class="flex justify-start gap-2 items-center w-4/5 overflow-x-scroll bg-base-300 p-4">
		<p class="bg-base-200 rounded-md base-content-light text-xs p-2 whitespace-nowrap">Non-Stop</p>
		<p class="bg-base-200 rounded-md base-content-light text-xs p-2 whitespace-nowrap">
			Morning Departure
		</p>
		<p class="bg-base-200 rounded-md base-content-light text-xs p-2 whitespace-nowrap">Indigo</p>
		<p class="bg-base-200 rounded-md base-content-light text-xs p-2 whitespace-nowrap">Air India</p>
		<p class="bg-base-200 rounded-md base-content-light text-xs p-2 whitespace-nowrap">Vistara</p>
	</div>
	<div class="flex flex-col gap-2 justify-center items-center bg-primary p-2 py-4 w-1/5">
		<FilterIcon />
		<p class="content text-xs">Sort & Filters</p>
	</div>
</div>
