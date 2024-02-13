<script lang="ts">
	import 'tailwindcss/tailwind.css';
	import '../global.css';
	import dayjs from 'dayjs';
	import customParseFormat from 'dayjs/plugin/customParseFormat';
	import { stateStore } from '$lib/flights-commons/flights.store';
	import Alerts from '$lib/components/Alerts.svelte';
	import SelectTravellerModal from './components/SelectTravellerModal.svelte';

	dayjs.extend(customParseFormat);
</script>

<div class="bg-base-100 min-h-screen text-white">
	<slot />

	<Alerts />
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
