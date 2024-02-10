<script lang="ts">
	import { stateStore } from '$lib/flights-commons/flights.store';
	import CrossIcon from '$lib/icons/crossIcon.svelte';
	import SearchFlight from '../../../components/SearchFlight.svelte';
</script>

<dialog
	class="modal modal-top text-base-content bg-base-100 {$stateStore.isModifySearchModalOpen
		? 'modal-open'
		: ''}"
>
	<div class="modal-box top-0 flex flex-col gap-4 min-h-fit">
		<span class="w-full flex justify-end">
			<button
				class="bg-white p-2 rounded-md"
				on:click={() => {
					stateStore.closeModifySearchModal();
				}}
			>
				<CrossIcon color="primary" />
			</button>
		</span>
		<h2 class="heading-2">Modify Search</h2>
		<SearchFlight />
	</div>
	<form
		method="dialog"
		class="modal-backdrop"
		on:submit={(e) => {
			e.preventDefault();
			stateStore.closeModifySearchModal();
		}}
	>
		<button>close</button>
	</form>
</dialog>
