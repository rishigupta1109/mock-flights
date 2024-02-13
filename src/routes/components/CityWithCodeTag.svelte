<script lang="ts">
	import { goto } from '$app/navigation';
	import type { City } from '$lib/flights-commons/flights.type';
	import { flip } from 'svelte/animate';
	import { receive, send } from '../../utils/flights.utils';

	export let city: City[];
	export let type: 'src' | 'dest' = 'src';

	function handleClick() {
		goto(`/city/search/${type}/`);
	}
</script>

{#each city as c (c)}
	<div
		class="flex gap-2 items-center"
		animate:flip={{ duration: 200 }}
		on:click={handleClick}
		role="button"
		tabindex="0"
		on:keydown={() => {}}
		in:receive={{ key: c.iataCode }}
		out:send={{ key: c.iataCode }}
	>
		<span
			data-testId={`city-${type}-code`}
			class="rounded-sm border-base-300 border py-1/2 px-2 text-[9px] font-normal text-base-content"
			>{c.iataCode}</span
		>
		<p data-testId={`city-${type}`} class="text-base-content card-sub-heading">{c.city}</p>
	</div>
{/each}
