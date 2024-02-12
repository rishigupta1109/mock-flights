<script>
	import { alertStore } from '$lib/flights-commons/flights.store';
</script>

<div class="fixed top-0 right-0 text-base-200 p-8 pointer-events-none">
	{#if $alertStore.isOpen}
		{#if $alertStore.type === 'error'}
			<div class="alert alert-error text-base-200">
				<p>{$alertStore.message}</p>
			</div>
		{:else if $alertStore.type === 'success'}
			<div class="alert alert-success text-base-200">
				<p>{$alertStore.message}</p>
			</div>
		{:else if $alertStore.type === 'info'}
			<div class="alert alert-info text-base-200">
				<p>{$alertStore.message}</p>
			</div>
		{:else if $alertStore.type === 'warning'}
			<div class="alert alert-warning text-base-200">
				<p>{$alertStore.message}</p>
			</div>
		{/if}
	{/if}
</div>
