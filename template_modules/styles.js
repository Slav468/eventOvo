// Налаштування шаблону
import templateConfig from '../template.config.js';

// PostCSS
import postcss from 'postcss';
import cssnano from 'cssnano';

// Tailwind
import tailwindcss from '@tailwindcss/vite';

// Media queries
import combineMediaQuery from 'postcss-combine-media-query';
import sortMediaQueries from 'postcss-sort-media-queries';

import { normalizePath } from 'vite';
import { globSync } from 'glob';
import fs from 'fs/promises';
import path from 'path';

import logger from './logger.js';

const isProduction = process.env.NODE_ENV === 'production';
const isWp = process.argv.includes('--wp');
const isAssets = templateConfig.server.isassets || isWp ? `assets/` : ``;

const pathPrefix = isWp
	? `src/components/wordpress/fls-theme/build/${isAssets}`
	: `dist/${isAssets}`;

const pathToFiles = `${pathPrefix}css/*.css`;
const pathToDev = `${pathPrefix}css/dev`;

/* -------------------------------------------------------
    PLUGINS
------------------------------------------------------- */

export const stylesPlugins = [
	/* ---------------- Tailwind ---------------- */

	...(templateConfig.styles.tailwindcss ? [tailwindcss()] : []),

	/* ---------------- CSS Postprocess (всё в одном) ---------------- */

	...(isProduction
		? [
				{
					name: 'css-postprocess',
					apply: 'build',
					enforce: 'post',
					closeBundle: async () => {
						const files = globSync(pathToFiles);

						if (!files.length) return;

						// Папка для dev-файлів
						if (
							templateConfig.styles.devfiles &&
							templateConfig.styles.codesplit
						) {
							await fs.mkdir(pathToDev, { recursive: true });
						}

						for (const file of files) {
							let css = await fs.readFile(file, 'utf-8');

							// PX → REM
							if (templateConfig.styles.pxtorem) {
								css = css.replace(
									/\d+(\.\d+)?px/g,
									(px) => `${parseFloat(px) / 16}rem`
								);
							}

							// Combine Media Queries (как было — всегда в проде)
							const resultMedia = await postcss()
								.use(combineMediaQuery())
								.use(sortMediaQueries({ sort: 'desktop-first' }))
								.process(css, { from: file });
							css = resultMedia.css;

							// WP Fonts Path Fix
							if (isWp) {
								css = css.replace(/\/assets\/fonts\//g, '/assets/fonts/');
							}

							// Non-WP Fonts Path
							if (!isWp && templateConfig.fonts.download) {
								css = css.replace(
									/src:\s*url\(\s*fonts/gi,
									`src:url(${
										templateConfig.server.path === './' ? '../' : '/'
									}assets/fonts`
								);
							}

							// CSS Dev Files + минификация
							if (templateConfig.styles.devfiles) {
								const normalized = normalizePath(file);
								let devFile = normalized.replace('.min', '');

								if (templateConfig.styles.codesplit) {
									devFile = devFile.replace('/css/', '/css/dev/');
								}

								await fs.copyFile(file, devFile);

								const minified = await postcss()
									.use(cssnano())
									.process(css, { from: file });

								css = minified.css;
							}

							await fs.writeFile(file, css, 'utf-8');
						}

						if (templateConfig.styles.devfiles) {
							logger('_IMG_CSS_DEV_DONE');
						}
					},
				},
		  ]
		: []),
];

/* ---------------- Log ---------------- */

templateConfig.styles.tailwindcss ? logger('Tailwind підключений') : null;
