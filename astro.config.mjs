// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
	integrations: [
		starlight({
			title: '',

			logo: {
				src: './src/assets/logo.png',
				alt: 'Kyaw Soe Logo',
			},

			social: [
				{
					icon: 'github',
					label: 'GitHub',
					href: 'https://github.com/kyawsoe-dev',
				},
			],

			sidebar: [
				{
					label: 'Javascript',
					items: [
						{ label: 'Javascript Introduction', slug: 'blog/js-intro' },
						{ label: 'Javascript Variables', slug: 'blog/js-variables' },
					],
				},
				{
					label: 'Reference',
					autogenerate: { directory: 'reference' },
				},
			],
		}),
	],
});
