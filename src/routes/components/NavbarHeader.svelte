<script>
	import WalletIcon from '$lib/icons/walletIcon.svelte';
	import PercentageIcon from '$lib/icons/percentageIcon.svelte';
	import ThreeDots from '$lib/icons/threeDots.svelte';
	import Navbar from '$lib/components/Navbar.svelte';

	export let wallet = '1500';
</script>

<Navbar>
	<p class="heading-2">Flights</p>
	<div class="flex justify-between items-stretch gap-4 ml-auto">
		<span
			class="flex items-center justify-between gap-2 cursor-pointer bg-white rounded-md text-primary p-2"
		>
			<WalletIcon color="var(--primary)" testId="wallet-icon" />
			${wallet}
		</span>
		<span
			class="flex items-center justify-between cursor-pointer bg-white rounded-md text-primary p-2"
		>
			<PercentageIcon color="primary" testId="percentage-icon" />
		</span>
		<span class="cursor-pointer min-h-full flex justify-center items-center">
			<ThreeDots testId="three-dots" />
		</span>
	</div>
</Navbar>
