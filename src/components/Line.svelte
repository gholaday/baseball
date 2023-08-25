<!--
  @component
  Generates an SVG line shape using the `line` function from [d3-shape](https://github.com/d3/d3-shape).
 -->
<script>
	import { getContext } from 'svelte';
	import { line, curveLinear, curveBasis } from 'd3-shape';

	const { data, xGet, yGet } = getContext('LayerCake');

	/** @type {String} [stroke='#ab00d6'] - The shape's fill color. This is technically optional because it comes with a default value but you'll likely want to replace it with your own color. */
	export let stroke = '#ab00d6';

	/** @type {Function} [curve=curveLinear] - An optional D3 interpolation function. See [d3-shape](https://github.com/d3/d3-shape#curves) for options. Pass this function in uncalled, i.e. without the open-close parentheses. */
	export let curve = 'curveBasis';

	let curveFunction = null;

	if (curve === 'curveBasis') {
		curveFunction = curveBasis;
	} else if (curve === 'curveLinear') {
		curveFunction = curveLinear;
	}

	$: path = line().x($xGet).y($yGet).curve(curveFunction);
</script>

<path class="path-line" d={path($data)} {stroke} />

<style>
	.path-line {
		fill: none;
		stroke-linejoin: round;
		stroke-linecap: round;
		stroke-width: 2;
		stroke-dasharray: 1000;
		stroke-dashoffset: 1000;
		animation: dash 3s linear forwards;
	}

	@keyframes dash {
		to {
			stroke-dashoffset: 0;
		}
	}
</style>
