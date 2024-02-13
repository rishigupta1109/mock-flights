<script lang="ts">
	import { stateStore } from '$lib/flights-commons/flights.store';
	import CrossIcon from '$lib/icons/crossIcon.svelte';
	import SearchFlight from '../../../components/SearchFlight.svelte';
</script>

<dialog
	class="modal modal-top w-full text-base-content bg-base-100 {$stateStore.isModifySearchModalOpen
		? 'modal-open'
		: ''}"
>
	<div class="modal-box w-full rounded-t-none flex flex-col gap-4 min-h-fit rounded-md">
		<span class="w-full flex justify-between items-center">
			<h2 class="nav-text">Modify Search</h2>
			<button
				class="bg-white p-2 rounded-md"
				data-testId="close-modify-search-modal-btn"
				on:click={() => {
					stateStore.closeModifySearchModal();
				}}
			>
				<CrossIcon color="primary" />
			</button>
		</span>
		<SearchFlight />
		<span class="w-16 h-1 rounded-xl bg-[#878C9D] absolute bottom-2 left-1/2 -translate-x-1/2" />
	</div>
	<form
		method="dialog"
		class="modal-backdrop"
		data-testId="backdrop-close-modify-search-modal"
		on:submit={(e) => {
			e.preventDefault();
			stateStore.closeModifySearchModal();
		}}
	>
		<button>close</button>
	</form>
</dialog>
