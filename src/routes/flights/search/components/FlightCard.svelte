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
	const fareColor = getRGBColor(flight.fareList[0]?.color) || 'base-content';
	let fareElement: HTMLElement;

	$: if (fareElement) {
		fareElement.style.color = fareColor;
	}
</script>

<div class="flex flex-col gap-2 p-4 text-base-content border-t border-t-base-300">
	<div class="flex justify-between items-start">
		<span class="flex flex-col gap-1 w-1/3">
			<img src={airlineIconUrl} alt="airline" data-testId="airline-img" class="w-10 h-10" />
			<span class="text-xs">{airlineName}</span>
		</span>
		<span class="flex flex-col items-center w-1/3">
			<span class="card-heading">{timeFrame}</span>
			<span class="sub-text">{duration}</span>
		</span>
		<span class="w-1/3 flex justify-end">
			<span bind:this={fareElement} class="card-heading text-{fareColor}">{fare}</span>
		</span>
	</div>
	<div class="flex gap-4">
		{#each speacialFeatures as feature}
			<span class="flex base-content-light text-xs gap-2">
				<img src={feature.icon} alt={feature.title} class="w-4 h-4" />
				{feature.title}
			</span>
		{/each}
	</div>
</div>
