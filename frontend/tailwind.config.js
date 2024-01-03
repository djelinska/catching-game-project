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
		extend: {},
	},
	plugins: [require('@tailwindcss/forms')],
};
