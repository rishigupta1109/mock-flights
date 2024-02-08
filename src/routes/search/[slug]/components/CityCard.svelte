<script lang="ts">
	import LocationIcon from '$lib/icons/locationIcon.svelte';
	import RecentIcon from '$lib/icons/recentIcon.svelte';

	export let city: string;
	export let code: string;
	export let airport: string;
	export let isRecent: boolean = false;
</script>

<div
	class="w-full cursor-pointer border-t border-t-base-300 p-6 px-8 flex justify-start items-center text-base-content gap-4"
>
	{#if isRecent}
		<RecentIcon />
	{:else}
		<LocationIcon />
	{/if}
	<span>
		<p class="text-xs">{city}</p>
		<p class="base-content-light text-xs">{code}-{airport}</p>
	</span>
</div>
