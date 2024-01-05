/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		colors: {
			transparent: 'transparent',
			current: 'currentColor',
			white: '#f5f5f4',
			yellow: {
				light: '#d1ac00',
				dark: '#a08706',
			},
			green: {
				100: '#bcc9af',
				200: '#7d9d8b',
				300: '#3f7267',
				400: '#1f5c55',
				500: '#004643',
			},
			red: {
				light: '#d1462f',
				dark: '#a73825',
			},
		},
		fontSize: {
			xs: [
				'18px',
				{
					lineHeight: '28px',
					letterSpacing: '2.16px',
				},
			],
			sm: [
				'20px',
				{
					lineHeight: '30px',
					letterSpacing: '1.2px',
				},
			],
			base: [
				'24px',
				{
					lineHeight: '36px',
					letterSpacing: '1.44px',
				},
			],
			lg: [
				'32px',
				{
					lineHeight: '48px',
					letterSpacing: '1.92px',
				},
			],
			xl: [
				'64px',
				{
					lineHeight: '96px',
					letterSpacing: '3.84px',
				},
			],
		},
		borderRadius: {
			none: '0',
			sm: '6px',
			DEFAULT: '12px',
			lg: '18px',
			full: '9999px',
		},
		boxShadow: {
			xs: 'inset 0 -3px 0 0 #a73825',
			sm: 'inset 0 -4px 0 0',
			DEFAULT: 'inset 0 -6px 0 0',
			card: '0px 4px 10px 0px rgba(0, 0, 0, 0.25)',
		},
		extend: {
			borderWidth: {
				3: '3px',
			},
		},
	},
	plugins: [
		require('@tailwindcss/forms'),
		require('@tailwindcss/aspect-ratio'),
	],
};
