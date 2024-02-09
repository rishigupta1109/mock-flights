<script lang="ts">
	import WalletIcon from '$lib/icons/walletIcon.svelte';
	import PercentageIcon from '$lib/icons/percentageIcon.svelte';
	import ThreeDots from '$lib/icons/threeDots.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import { getFormattedWallet } from '../../utils/flights.utils';
	import { configStore, walletStore } from '$lib/flights-commons/flights.store';

	export let wallet = walletStore.getTotalBalance();
	let currencySymbol = walletStore.getCurrencySymbol();
	let showWallet = configStore.showWallet();
	let showCoupon = configStore.showCoupon();
</script>

<Navbar>
	<p class="heading-1">Flights</p>
	<div class="flex justify-between items-stretch gap-4 ml-auto">
		{#if showWallet}
			<span
				class="flex items-center justify-between gap-2 cursor-pointer bg-base-200 rounded-md text-primary p-1 px-2"
			>
				<WalletIcon color="primary" testId="wallet-icon" />

				{getFormattedWallet(wallet, currencySymbol)}
			</span>
		{/if}
		{#if showCoupon}
			<span
				class="flex items-center justify-between cursor-pointer bg-base-200 rounded-md text-primary p-1 px-2"
			>
				<PercentageIcon color="primary" testId="percentage-icon" />
			</span>
		{/if}
		<span class="cursor-pointer min-h-full flex justify-center items-center px-2">
			<ThreeDots testId="three-dots" />
		</span>
	</div>
</Navbar>
