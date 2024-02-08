<script lang="ts">
	import { goto } from '$app/navigation';
	import BackIcon from '$lib/icons/backIcon.svelte';

	function navigateBack() {
		if (typeof window !== 'undefined') window.history.back();
	}
</script>

<nav data-testid="navbar" class="h-16 w-full bg-primary flex items-center justify-start px-4">
	<button on:click class="w-8 h-8 cursor-pointer" on:click={navigateBack}>
		<BackIcon testId="back-btn" />
	</button>
	<slot />
</nav>
