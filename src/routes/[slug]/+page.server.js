import { error } from '@sveltejs/kit';
import { supabase } from '$lib/supabaseClient.js';

export async function load({ params }) {
	if (!params.slug) {
		throw error(404);
	}

	let { data: team } = await supabase
		.from('teams')
		.select('*')
		.eq('abbreviation', params.slug)
		.maybeSingle();

	let gamesChart = [{ x: 0, y: 0, winloss: '' }];
	let lastTenChart = [{ x: 0, y: 0, winloss: '' }];
	let lastTenIndex = -1;

	let { data: games } = await supabase
		.from('games')
		.select('*')
		.eq('year', 2023)
		.eq('team', params.slug);

	games?.forEach((game, index) => {
		let winloss = game.winloss.split('-').map(Number);
		let winsOver = winloss[0] - winloss[1];

		gamesChart.push({ x: game.game_num, y: winsOver, winloss: game.winloss });
	});

	let lastTenWins = 0;
	let lastTenLosses = 0;
	games.slice(-10).forEach((game, index) => {
		game.win ? lastTenWins++ : lastTenLosses++;
		console.log(`game ${game.game_num} win = ${game.win} ${lastTenWins}-${lastTenLosses}`);
		lastTenChart.push({
			x: index,
			y: lastTenWins - lastTenLosses,
			winloss: `${lastTenWins}-${lastTenLosses}`
		});
	});

	let numGamesPlayed = games.length;
	let overallWinloss = games.slice(-1).pop().winloss;

	return {
		team,
		gamesChart,
		lastTenChart,
		seasonDescription: getSeasonDescription(overallWinloss, numGamesPlayed)
	};
}

function getSeasonDescription(winloss, numGamesPlayed) {
	let winLossSplit = winloss.split('-');
	let wins = Number(winLossSplit[0]);
	let losses = Number(winLossSplit[1]);

	if (losses === 0) {
		losses = 1;
	}

	let description = '';
	let overallWinPercentage = wins / (wins + losses);

	if (numGamesPlayed < 20) {
		return '';
	}

	if (overallWinPercentage > 0.6) {
		description = '🔥 They are having an amazing season and are world series favorites. 🔥';
	} else if (overallWinPercentage > 0.5) {
		description = '😎 They are having an good season and are in the playoff hunt. 😎';
	} else if (overallWinPercentage > 0.45) {
		description = '😬 They are having an awful season. 😬';
	} else {
		description = '🤢 They are having a nightmare season. 🤢';
	}

	return description;
}
