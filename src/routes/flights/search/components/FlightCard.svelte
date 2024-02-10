<script lang="ts">
	import type { FlightSegment } from '$lib/flights-commons/flights.type';
	import { getRGBColor } from '../../../../utils/flights.utils';

	export let flight: FlightSegment;
	const fare = flight.fareList[0].currencySymbol + flight.fareList[0].fareS;
	const speacialFeatures = flight.specialFeatures;
	const timeFrame = flight.onwardSegmentDetails.airlineTime;
	const duration = flight.onwardSegmentDetails.airlineDuration;
	const airLineInfo = flight.onwardSegmentDetails.segmentAirlineInfos[0];
	const { airlineIconUrl, airlineName } = airLineInfo;
	console.log(flight.fareList[0]?.color);
	const fareColor = getRGBColor(flight.fareList[0]?.color) || 'base-content';
	let fareElement: HTMLElement;
	$: if (fareElement) {
		console.log(fareElement);
		fareElement.style.color = fareColor;
	}
	console.log('fareColor', fareColor);
</script>

<div class="flex flex-col gap-2 p-4 text-base-content border-t border-t-base-300">
	<div class="flex justify-between items-start">
		<span class="flex flex-col gap-1">
			<img src={airlineIconUrl} alt="airline" class="w-12 h-12" />
			<span class="text-sm">{airlineName}</span>
		</span>
		<span class="flex flex-col">
			<span class="heading-1">{timeFrame}</span>
			<span class="text-sm">{duration}</span>
		</span>
		<span>
			<span bind:this={fareElement} class="heading-1 text-{fareColor}">{fare}</span>
		</span>
	</div>
	<div class="flex gap-4">
		{#each speacialFeatures as feature}
			<span class="flex base-content-light text-sm gap-2">
				<img src={feature.icon} alt={feature.title} class="w-4 h-4" />
				{feature.title}
			</span>
		{/each}
	</div>
</div>
