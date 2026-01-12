// Налаштування шаблону
import templateConfig from '../template.config.js';
// Логгер
import logger from './logger.js';
// Навігаційна панель
import { navPanel } from './navpanel.js';

import { globSync } from 'glob';
import fs from 'fs/promises';

// Обробка HTML
import posthtml from 'posthtml';
import prerenderHTML from './posthtml/prerender.js';
import posthtmBeautify from 'posthtml-beautify';

import nunjucks from 'vite-plugin-nunjucks';

import pugAliases from 'pug-alias';
import pugPlugin from './pug.js';

const isProduction = process.env.NODE_ENV === 'production';
const isWp = process.argv.includes('--wp');

export const htmlPlugins = [
	// Пре-обробка Inclue, Extend, Expressions
	prerenderHTML({}),
	// Nunjucks
	nunjucks(),
	// Навігаційна панель
	...(!isWp &&
	((!isProduction && templateConfig.navpanel.dev) ||
		(isProduction && templateConfig.navpanel.build))
		? [
				{
					name: 'nav-panel',
					order: 'pre',
					transformIndexHtml(html) {
						html = html.replace('</body>', `${navPanel()}</body>`);
						return html;
					},
				},
		  ]
		: []),
	// Для відкриття в провіднику
	...(isProduction && templateConfig.server.buildforlocal
		? [
				{
					name: 'build-for-local',
					order: 'post',
					transformIndexHtml(html) {
						html = html.replace(new RegExp(`type="module"`, 'gi'), ``);
						html = html.replace(new RegExp(`crossorigin`, 'gi'), `defer`);
						return html;
					},
				},
		  ]
		: []),
	// Прероцесор PUG
	...(templateConfig.pug.enable
		? [
				pugPlugin({
					plugins: [pugAliases({ '@pug': 'src/pug' })],
				}),
		  ]
		: []),
];
