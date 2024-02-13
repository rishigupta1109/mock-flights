<script lang="ts">
	import { loadingStore } from '$lib/flights-commons/flights.store';

	let isLoading = $loadingStore;
</script>

{#if isLoading}
	<div
		data-testId="loading-backdrop"
		class="min-h-screen min-w-screen bg-base-100 fixed top-0 left-0 flex justify-center items-center w-full h-full z-50"
	>
		<span data-testId="loading-spinner" class="loading loading-spinner text-primary loading-lg"
		></span>
	</div>
{/if}
