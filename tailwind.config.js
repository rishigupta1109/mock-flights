const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
	mode: 'jit',
	content: ['./src/**/*.{html,js,svelte,ts}'],
	plugins: [
		require('daisyui'),
		require('tailwindcss-flip'),
		plugin(function ({ addBase }) {
			addBase({
				'.heading-1': {
					'@apply font-semibold text-xl': {} // done
				},
				'.heading-2': {
					'@apply font-medium text-base': {} // font-weight: 500; font-size: 16px
				},
				'.content': {
					'@apply font-normal text-base': {} // font-weight: 400; font-size: 16px
				},
				'.sub-text': {
					'@apply font-normal text-xs': {} // done
				},
				'.card-heading': {
					'@apply font-semibold text-lg': {} // font-weight: 600; font-size: 18px
				},
				'.card-sub-heading': {
					'@apply font-medium text-base': {} // font-weight: 500; font-size: 16px
				},
				'.card-content': {
					'@apply font-normal text-sm': {} // font-weight: 400; font-size: 14px
				},
				'.cta-text': {
					'@apply font-semibold text-xl': {} // done
				},
				'.cta-ghost-text': {
					'@apply font-bold text-sm': {} // font-weight: 700; font-size: 14px
				},
				'.nav-text': {
					'@apply font-semibold text-xl': {} // done
				},
				'.base-content-light': {
					'@apply fill-base-content text-base-content stroke-base-content text-opacity-50': {}
				}
			});
		})
	],
	theme: {
		extend: {
			screens: {
				'2xs': '240px',
				xs: '275px',
				sm: '380px',
				md: '400px',
				lg: '540px'
			},
			colors: {
				'nu-black-100': 'rgba(118, 118, 118, 1)',
				'nu-black-200': 'rgba(17, 17, 17, 1)',
				'nu-black-900': 'rgba(17, 24, 39, 1)',
				'nu-booking-cancelled-bg': 'rgba(254, 199, 193, 1)',
				'nu-grey': 'rgba(232, 232, 232, 1)',
				'nu-slate-300': 'rgba(203, 213, 225, 1)',
				'nu-slate-400': 'rgba(148, 163, 184, 1)',
				'nu-slate-500': 'rgba(100, 116, 139, 1)',
				'nu-slate-600': 'rgb(119, 120, 122, 1)',
				'nu-wallet': 'rgba(0, 195, 67, 1)',
				'nu-success': 'rgba(44, 194, 114, 1)',
				'nu-error': 'rgba(244, 67, 54, 1)',
				'nu-blue-500': 'rgba(27, 164, 247, 1)',
				'nu-blue-700': 'rgba(5, 84, 131, 1)',
				'nu-grey-700': 'rgba(165, 169, 181, 1)',
				'nu-modal-backdrop': 'rgba(17, 24, 39, 0.6)',
				'nu-grey-200': 'rgba(175, 175, 175, 1)'
			},
			animation: {
				swap: 'swap 500ms linear 1'
			},
			keyframes: {
				swap: {
					from: { transform: 'rotate(180deg)' },
					to: { transform: 'rotate(0deg)' }
				}
			},
			boxShadow: {
				sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
				DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
				md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
				lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
				xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
				'2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
				'3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
				inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
				none: 'none'
			}
		}
	},
	daisyui: {
		styled: true,
		utils: true,
		darkTheme: 'nucleiSdkTheme',
		themes: [
			{
				nucleiSdkTheme: {
					primary: '#009fda', // primary color : icons,appbar,primary cta, radio button etc
					'primary-focus': '#007aa7', // primary dark
					secondary: '#009fda',
					'secondary-content': '#ffffff', // appbar element color , tabUnderlineColor, tabBarTextColor
					accent: '#d93f9c35', // buttonEnabledColor
					'accent-content': '#ffffff', // buttonTextColor
					neutral: '#009fda', // for icons background and some case for container
					'base-100': '#f0f0f5', // app background color
					'base-200': '#ffffff', // container/card background color
					'primary-content': '#ffffff', // primary content is for content inside components with primary col, mostly same as secondary-content
					'base-content': '#000000', // base text color used everywhere - mostly black
					'base-300': '#d7d7db', // for dark/gray dividers, or dary gray text color etc.
					'neutral-content': '#ffffff' //for foreground content that are always white
				},
				'nucleiSdkTheme-dark': {
					primary: '#33255c', // primary color : icons,appbar,primary cta, radio button etc
					'primary-focus': '#000000', // primary dark
					secondary: '#150050',
					'secondary-content': '#FFFFFF', // appbar element color , tabUnderlineColor, tabBarTextColor
					accent: '#5C112E', // buttonEnabledColor
					'accent-content': '#FFFFFF', // buttonTextColor
					neutral: '#FFFFFF', // for icons background and some case for container
					'base-100': '#4e495e', // app background color
					'base-200': '#63638a', //  container/card background color
					'primary-content': '#FFFFFF', // primary content is for content inside components with primary col, mostly same as secondary-content
					'base-content': '#FFFFFF', // base text color used everywhere - mostly black
					'base-300': '#FFFFFF', // for dark/gray dividers, or dary gray text color etc.
					'neutral-content': '#63638a'
				}
			}
		]
	}
};

function withColor(variable) {
	return `hsl(var(${variable}))`;
}
