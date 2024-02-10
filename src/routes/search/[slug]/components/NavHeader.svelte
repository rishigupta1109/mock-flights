<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	export let title: string;
</script>

<Navbar>
	<p class="heading-1">{title}</p>
</Navbar>
