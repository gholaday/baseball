<script>
	import ZeroAxis from './../../components/ZeroAxis.svelte';
	import Line from './../../components/Line.svelte';
	import { LayerCake, Svg } from 'layercake';
	export let data;

	console.log(data);
</script>

<div class="chart-container">
	<LayerCake data={data.gamesChart} x="x" y="y">
		<Svg>
			<ZeroAxis />
			<Line />
		</Svg>
	</LayerCake>
</div>

<style>
	.chart-container {
		width: 100%;
		height: 100px;
	}
</style>
