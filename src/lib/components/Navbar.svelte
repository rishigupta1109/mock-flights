<script lang="ts">
	import { goto } from '$app/navigation';
	import BackIcon from '$lib/icons/backIcon.svelte';

	export let back: string | undefined = undefined;

	function navigateBack() {
		if (back !== undefined) goto(back);
		else if (typeof window !== 'undefined') window.history.back();
	}
</script>

<nav
	data-testid="navbar"
	class="h-20 w-full bg-primary flex items-center justify-start px-4 sticky top-0"
>
	<button on:click class="w-8 h-8 cursor-pointer" data-testid="baack-btn" on:click={navigateBack}>
		<BackIcon testId="back-btn" />
	</button>
	<slot />
</nav>
