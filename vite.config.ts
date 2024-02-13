import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig(({ mode }) => ({
	plugins: [sveltekit()],
	resolve: {
		// The default would be [ 'svelte', 'node' ]
		// as set by vite-plugin-svelte and vitest.
		// This sets [ 'browser', 'svelte', 'node' ]
		conditions: mode === 'test' ? ['browser'] : []
	},
	test: {
		mockReset: true,
		environment: 'jsdom',
		globals: true,
		include: ['src/**/*.test.{js,ts}'],
		setupFiles: 'src/setupTests.ts'
	}
}));
