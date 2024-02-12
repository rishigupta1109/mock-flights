<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';

	export let title: string;
</script>

<Navbar>
	<p class="nav-text">{title}</p>
</Navbar>
