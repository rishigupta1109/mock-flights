<script lang="ts">
	import CrossIcon from '$lib/icons/crossIcon.svelte';
	import SearchIcon from '$lib/icons/searchIcon.svelte';
	import CityList from './components/CityList.svelte';
	import NavHeader from './components/NavHeader.svelte';

	export let data: {
		title: string;
		variable: string;
	};
	let { title, variable } = data;
	let city: string = '';
</script>

<NavHeader {title} />
<div class="w-full p-4">
	<span class="w-full flex justify-between items-center bg-base-200 p-4 py-2 rounded-md">
		<input
			type="text"
			bind:value={city}
			placeholder="Enter City/Airport Name"
			class="p-2 w-full outline-none text-base-content"
		/>
		{#if city.trim() === ''}
			<SearchIcon />
		{:else}
			<button on:click={() => (city = '')}>
				<CrossIcon />
			</button>
		{/if}
	</span>
</div>
{#if city.trim() === ''}
	<CityList title="Recent Searches" isRecent={true} />
	<CityList title="Popular Cities" />
{:else}
	<CityList title="Search Results" />
{/if}
