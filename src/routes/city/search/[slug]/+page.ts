import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export function load({ params }) {
	if (params.slug === 'src') {
		return {
			title: 'Select Source city',
			variable: 'src'
		};
	} else if (params.slug === 'dest') {
		return {
			title: 'Select Destination city',
			variable: 'dest'
		};
	}

	error(404, 'Not found');
}
