<script>
	import ZeroAxis from './../../components/ZeroAxis.svelte';
	import Line from './../../components/Line.svelte';
	import { LayerCake, Svg } from 'layercake';
	import { onMount } from 'svelte';

	export let data;

	let displayWinloss = '';

	onMount(async () => {
		await animateWinLoss();
	});

	async function animateWinLoss() {
		displayWinloss = '';
		for (let index = 0; index < data.gamesChart.length; index++) {
			const len = data.gamesChart.length;
			const element = data.gamesChart[index];
			displayWinloss = element.winloss;
			await new Promise((resolve) => setTimeout(resolve, 2000 / len));
		}
	}
</script>

<div class="container">
	<div class="container-header">
		<img width="100" src="/images/teams/{data.team.id}.png" alt="" />
		<h1>
			The {data.team.location}
			{data.team.shortName} have a record of
		</h1>
		<h2>{displayWinloss}</h2>
	</div>

	<div class="chart-container">
		<LayerCake data={data.gamesChart} x="x" y="y">
			<Svg>
				<ZeroAxis />
				<Line stroke={data.team.primary_color} />
			</Svg>
		</LayerCake>
	</div>
</div>
<div class="team-description"><p>{data.seasonDescription}</p></div>
<div class="last-ten">
	<h1>Last 10 games</h1>
	<br />
	<h2>7-3</h2>
</div>

<!-- <div class="chart-container">
	<LayerCake data={data.lastTenChart} x="x" y="y">
		<Svg>
			<ZeroAxis />
			<Line stroke={data.team.primary_color} curve={'curveLinear'} />
		</Svg>
	</LayerCake>
</div> -->

<style lang="scss" scoped>
	h1 {
		font-size: 1.25rem;
		margin: 0;
	}

	.container {
		width: 25rem;
		display: flex;
		flex-direction: column;
		gap: 4rem;
		align-items: center;
	}

	.container-header {
		font-size: 2rem;
		text-align: center;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;

		& > h2 {
			text-align: center;
			font-size: 2rem;
			margin: 0;
		}

		& > img {
			filter: drop-shadow(5px 5px 10px #555555);
		}
	}

	.chart-container {
		width: 100%;
		height: 100px;
		padding: 2rem;
	}

	.team-description {
		width: 100%;
		text-align: center;
	}
</style>
