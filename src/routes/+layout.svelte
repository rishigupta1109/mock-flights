<script lang="ts">
	import 'tailwindcss/tailwind.css';
	import '../global.css';
</script>

<div class="bg-base-100 min-h-screen text-white">
	<slot />
</div>

<style>
	:global(html) {
		font-size: 10px;
	}
	@media (min-width: 281px) {
		:global(html) {
			font-size: 12px;
		}
	}
	@media (min-width: 375px) {
		:global(html) {
			font-size: 14px;
		}
	}
</style>
