import { supabase } from '$lib/supabaseClient.js';
import dayjs from 'dayjs';

export async function load() {
	let { data: game_uploads } = await supabase
		.from('game_uploads')
		.select('*')
		.order('uploaded_at', { ascending: false })
		.limit(1)
		.maybeSingle();

	let last_uploaded = dayjs(game_uploads.uploaded_at).format('MMM DD, YYYY @ h:mma');

	let { data: teams } = await supabase.from('teams').select('*');

	return {
		last_uploaded,
		teams
	};
}
