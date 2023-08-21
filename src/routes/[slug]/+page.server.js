import { error } from '@sveltejs/kit';
import { supabase } from '$lib/supabaseClient.js';

export async function load({ params }) {
	if (!params.slug) {
		throw error(404);
	}

	let gamesChart = [{ x: 0, y: 0 }];

	let { data: games, error: err } = await supabase
		.from('games')
		.select('*')
		.eq('team', params.slug);

	games?.forEach((game) => {
		let winloss = game.winloss.split('-').map(Number);
		let winsOver = winloss[0] - winloss[1];

		gamesChart.push({ x: game.game_num, y: winsOver });
	});

	return {
		gamesChart
	};
}
