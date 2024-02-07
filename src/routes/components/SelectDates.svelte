<script>
	import DuoCard from '$lib/components/DuoCard.svelte';
	import AddIcon from '$lib/icons/addIcon.svelte';
</script>

<DuoCard>
	<div slot="left" class="flex w-[45%] flex-col p-2">
		<span class="card-content base-content-light">Departure</span>
		<span class="card-sub-heading">7 feb</span>
		<span class="card-content base-content-light">Wednesday</span>
	</div>
	<div slot="right" class="flex w-[45%] justify-between items-center">
		<div class="flex flex-col p-2">
			<span class="card-content base-content-light">Return</span>
			<span class="card-sub-heading">Add Return</span>
			<span class="card-content base-content-light">and save more!</span>
		</div>
		<button class="h-6 aspect-square rounded-full cursor-pointer">
			<AddIcon color="primary" testId="add-icon" />
		</button>
	</div>
</DuoCard>
