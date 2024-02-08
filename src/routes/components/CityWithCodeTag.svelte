<script lang="ts">
	import { goto } from '$app/navigation';

	export let city = 'Banglore';
	export let code = 'BLR';
	export let type: 'src' | 'dest' = 'src';

	function handleClick() {
		goto(`/search/${type}/`);
	}
</script>

<div
	class="flex gap-2 items-center"
	on:click={handleClick}
	role="button"
	tabindex="0"
	on:keydown={() => {}}
>
	<span class="rounded-sm border-base-300 border py-1/2 px-2 text-xs text-base-content">{code}</span
	>
	<p class="text-base-content heading-2">{city}</p>
</div>
