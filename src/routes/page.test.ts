import { test } from 'vitest';
import { render } from '@testing-library/svelte';
import Page from './+page.svelte';
test('page', async () => {
	const { getAllByText } = render(Page);
});
