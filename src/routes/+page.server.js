import { supabase } from '$lib/supabaseClient';

export async function load() {
	let { data, error } = await supabase.from('teams').select('*');

	return {
		teams: data || []
	};
}
