<!--
  @component
  Generates an SVG x-axis that always lines up with zero on the y-axis. 
 -->
<script>
	import { getContext } from 'svelte';
	const { width, height, yDomain } = getContext('LayerCake');

	let range, minValue, rangeDiff;

	$: {
		range = Math.abs($yDomain[1] - $yDomain[0]);
		minValue = Math.min($yDomain[0], $yDomain[1]);
		rangeDiff = $height / range;
	}
</script>

<g class="axis x-axis">
	<line
		class="baseline"
		y1={$height + minValue * rangeDiff}
		y2={$height + minValue * rangeDiff}
		x1="0"
		x2={$width}
	/>
	<text class="annotation" y={$height + minValue * rangeDiff} x={$width}>.500</text>
</g>

<style>
	line {
		stroke: #aaa;
		stroke-dasharray: 2;
	}

	.baseline {
		stroke-dasharray: 10;
	}

	.annotation {
		position: absolute;
		font-family: 'Open Sans', sans-serif;
		font-size: 1rem;
		fill: #aaa;
	}
</style>
