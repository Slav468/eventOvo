// // Налаштування шаблону
// import templateConfig from '../template.config.js';
// // PostCSS
// import postcss from 'postcss';
// // TailWind
// import tailwindcss from '@tailwindcss/vite';
// // Групування медіа-запитів
// import combineMediaQuery from 'postcss-combine-media-query';
// import sortMediaQueries from 'postcss-sort-media-queries';
// // Оптимізація
// import cssnano from 'cssnano';

// import { normalizePath } from 'vite';
// import { globSync } from 'glob';
// import fs from 'fs';
// import logger from './logger.js';

// const isProduction = process.env.NODE_ENV === 'production';
// const isWp = process.argv.includes('--wp');
// const isAssets = templateConfig.server.isassets || isWp ? `assets/` : ``;

// const pathPrefix = isWp
// 	? `src/components/wordpress/fls-theme/build/${isAssets}`
// 	: `dist/${isAssets}`;

// const pathToFiles = `${pathPrefix}css/*.css`;
// const pathToDev = `${pathPrefix}css/dev`;
// const pathToOptimize = `${pathPrefix}css`;

// export const stylesPlugins = [
// 	// Підключення плагіну Tailwind
// 	...(templateConfig.styles.tailwindcss ? [tailwindcss()] : []),
// 	// Заміна PX на REM
// 	...(isProduction && templateConfig.styles.pxtorem
// 		? [
// 				{
// 					name: 'css-pxtorem',
// 					apply: 'build',
// 					enforce: 'pre',
// 					closeBundle: {
// 						order: 'pre',
// 						handler: async () => {
// 							const cssFiles = globSync(pathToFiles);
// 							cssFiles.forEach(async (cssFile) => {
// 								let content = fs.readFileSync(cssFile, 'utf-8');
// 								content = content.replace(
// 									new RegExp(/\d+(\.\d+)?px/, 'g'),
// 									(data) => {
// 										let value = `${parseFloat(data) / 16}rem`;
// 										return value;
// 									}
// 								);
// 								fs.writeFileSync(cssFile, content, 'utf-8');
// 							});
// 						},
// 					},
// 				},
// 		  ]
// 		: []),
// 	// Групування Media-запитів (ASYNC, SAFE)
// 	...(isProduction
// 		? [
// 				{
// 					name: 'css-combine-media-query',
// 					apply: 'build',
// 					enforce: 'pre',
// 					closeBundle: {
// 						order: 'pre',
// 						handler: async () => {
// 							const CONCURRENCY_LIMIT = 4; // безопасно для Windows
// 							const cssDirs = globSync(pathToOptimize);

// 							const tasks = [];

// 							for (const dir of cssDirs) {
// 								const files = await fs.promises.readdir(dir);
// 								for (const file of files) {
// 									if (file.endsWith('.css')) {
// 										tasks.push(path.join(dir, file));
// 									}
// 								}
// 							}

// 							let index = 0;

// 							async function worker() {
// 								while (index < tasks.length) {
// 									const filePath = tasks[index++];
// 									const css = await fs.promises.readFile(filePath, 'utf8');

// 									const result = await postcss()
// 										.use(combineMediaQuery())
// 										.use(sortMediaQueries({ sort: 'desktop-first' }))
// 										.process(css, { from: filePath });

// 									await fs.promises.writeFile(filePath, result.css, 'utf8');
// 								}
// 							}

// 							await Promise.all(
// 								Array.from({ length: CONCURRENCY_LIMIT }, worker)
// 							);
// 						},
// 					},
// 				},
// 		  ]
// 		: []),
// 	...(isProduction && isWp
// 		? [
// 				{
// 					name: 'wp-css-fonts-path',
// 					apply: 'build',
// 					enforce: 'pre',
// 					closeBundle: {
// 						order: 'pre',
// 						handler: () => {
// 							const cssFiles = globSync(pathToFiles);
// 							if (cssFiles.length) {
// 								cssFiles.forEach(async (cssFile) => {
// 									const cssFileCode = fs.readFileSync(cssFile, 'utf-8');
// 									const reg = /\/assets\/fonts\//g;
// 									fs.writeFileSync(
// 										cssFile,
// 										cssFileCode.replace(reg, '/assets/fonts/'),
// 										'utf8'
// 									);
// 								});
// 							}
// 							if (templateConfig.fonts.download) {
// 								let cssCode = fs.readFileSync(
// 									`${pathToOptimize}/webfonts.min.css`,
// 									'utf8'
// 								);
// 								cssCode = cssCode.replace(
// 									/src:\s*url\(\s*fonts/gi,
// 									`src:url(/wp-content/themes/fls-theme/build/assets/fonts/`
// 								);
// 								fs.writeFileSync(
// 									`${pathToOptimize}/webfonts.min.css`,
// 									cssCode,
// 									'utf8'
// 								);
// 							}
// 						},
// 					},
// 				},
// 		  ]
// 		: []),
// 	...(isProduction && templateConfig.fonts.download && !isWp
// 		? [
// 				{
// 					name: 'css-download-path',
// 					apply: 'build',
// 					enforce: 'pre',
// 					closeBundle: {
// 						order: 'pre',
// 						handler: () => {
// 							let cssCode = fs.readFileSync(
// 								`dist/${isAssets}css/webfonts.min.css`,
// 								'utf8'
// 							);
// 							cssCode = cssCode.replace(
// 								/src:\s*url\(\s*fonts/gi,
// 								`src:url(${
// 									templateConfig.server.path === './' ? '../' : '/'
// 								}assets/fonts`
// 							);
// 							fs.writeFileSync(
// 								`dist/${isAssets}css/webfonts.min.css`,
// 								cssCode,
// 								'utf8'
// 							);
// 						},
// 					},
// 				},
// 		  ]
// 		: []),
// 	// Створення копії файлу(лів) для розробніків
// 	...(isProduction && templateConfig.styles.devfiles
// 		? [
// 				{
// 					name: 'css-devfiles',
// 					apply: 'build',
// 					enforce: 'pre',
// 					closeBundle: {
// 						order: 'pre',
// 						handler: () => {
// 							const cssFiles = globSync(pathToFiles);
// 							if (cssFiles.length) {
// 								!fs.existsSync(pathToDev) && templateConfig.styles.codesplit
// 									? fs.mkdirSync(pathToDev)
// 									: null;
// 								cssFiles.forEach(async (cssFile) => {
// 									cssFile = normalizePath(cssFile);
// 									let devCssFile = cssFile.replace('.min', '');
// 									templateConfig.styles.codesplit
// 										? (devCssFile = devCssFile.replace('/css/', '/css/dev/'))
// 										: null;
// 									fs.copyFileSync(cssFile, devCssFile);
// 									const cssCode = fs.readFileSync(cssFile, 'utf8');
// 									const cssFileMin = await postcss()
// 										.use(cssnano())
// 										.process(cssCode, { from: cssFile });
// 									fs.writeFileSync(cssFile, cssFileMin.css, 'utf8');
// 								});
// 								logger('_IMG_CSS_DEV_DONE');
// 							}
// 						},
// 					},
// 				},
// 		  ]
// 		: []),
// ];
// // Повідомлення
// templateConfig.styles.tailwindcss ? logger(`Tailwind підключений`) : null;

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
const pathToOptimize = `${pathPrefix}css`;

const CONCURRENCY_LIMIT = 3;

/* -------------------------------------------------------
	UTILS
------------------------------------------------------- */

async function runSequential(files, handler) {
	for (const file of files) {
		await handler(file);
	}
}

async function runWithLimit(files, handler) {
	let index = 0;

	async function worker() {
		while (index < files.length) {
			const file = files[index++];
			await handler(file);
		}
	}

	await Promise.all(Array.from({ length: CONCURRENCY_LIMIT }, worker));
}

/* -------------------------------------------------------
	PLUGINS
------------------------------------------------------- */

export const stylesPlugins = [
	/* ---------------- Tailwind ---------------- */

	...(templateConfig.styles.tailwindcss ? [tailwindcss()] : []),

	/* ---------------- PX → REM ---------------- */

	...(isProduction && templateConfig.styles.pxtorem
		? [
				{
					name: 'css-pxtorem',
					apply: 'build',
					enforce: 'pre',
					closeBundle: {
						order: 'pre',
						handler: async () => {
							const files = globSync(pathToFiles);

							await runSequential(files, async (file) => {
								const css = await fs.readFile(file, 'utf8');
								const updated = css.replace(
									/\d+(\.\d+)?px/g,
									(px) => `${parseFloat(px) / 16}rem`
								);
								await fs.writeFile(file, updated, 'utf8');
							});
						},
					},
				},
		  ]
		: []),

	/* ---------------- Combine Media Queries ---------------- */

	...(isProduction
		? [
				{
					name: 'css-combine-media-query',
					apply: 'build',
					enforce: 'pre',
					closeBundle: {
						order: 'pre',
						handler: async () => {
							const dirs = [pathToOptimize];
							const files = [];

							for (const dir of dirs) {
								const entries = await fs.readdir(dir);
								for (const file of entries) {
									if (file.endsWith('.css')) {
										files.push(path.join(dir, file));
									}
								}
							}

							await runWithLimit(files, async (filePath) => {
								const css = await fs.readFile(filePath, 'utf8');
								const result = await postcss()
									.use(combineMediaQuery())
									.use(sortMediaQueries({ sort: 'desktop-first' }))
									.process(css, { from: filePath });

								await fs.writeFile(filePath, result.css, 'utf8');
							});
						},
					},
				},
		  ]
		: []),

	/* ---------------- WP Fonts Path Fix ---------------- */

	...(isProduction && isWp
		? [
				{
					name: 'wp-css-fonts-path',
					apply: 'build',
					enforce: 'pre',
					closeBundle: {
						order: 'pre',
						handler: async () => {
							const files = globSync(pathToFiles);

							await runSequential(files, async (file) => {
								const css = await fs.readFile(file, 'utf8');
								const updated = css.replace(
									/\/assets\/fonts\//g,
									'/assets/fonts/'
								);
								await fs.writeFile(file, updated, 'utf8');
							});

							if (templateConfig.fonts.download) {
								const webfonts = `${pathToOptimize}/webfonts.min.css`;
								const css = await fs.readFile(webfonts, 'utf8');
								const updated = css.replace(
									/src:\s*url\(\s*fonts/gi,
									'src:url(/wp-content/themes/fls-theme/build/assets/fonts/'
								);
								await fs.writeFile(webfonts, updated, 'utf8');
							}
						},
					},
				},
		  ]
		: []),

	/* ---------------- Non-WP Fonts Path ---------------- */

	...(isProduction && templateConfig.fonts.download && !isWp
		? [
				{
					name: 'css-download-path',
					apply: 'build',
					enforce: 'pre',
					closeBundle: {
						order: 'pre',
						handler: async () => {
							const file = `dist/${isAssets}css/webfonts.min.css`;
							const css = await fs.readFile(file, 'utf8');
							const updated = css.replace(
								/src:\s*url\(\s*fonts/gi,
								`src:url(${
									templateConfig.server.path === './' ? '../' : '/'
								}assets/fonts`
							);
							await fs.writeFile(file, updated, 'utf8');
						},
					},
				},
		  ]
		: []),

	/* ---------------- CSS Dev Files ---------------- */

	...(isProduction && templateConfig.styles.devfiles
		? [
				{
					name: 'css-devfiles',
					apply: 'build',
					enforce: 'pre',
					closeBundle: {
						order: 'pre',
						handler: async () => {
							const files = globSync(pathToFiles);

							if (!files.length) return;

							if (templateConfig.styles.codesplit) {
								await fs.mkdir(pathToDev, { recursive: true });
							}

							await runSequential(files, async (file) => {
								const normalized = normalizePath(file);
								let devFile = normalized.replace('.min', '');

								if (templateConfig.styles.codesplit) {
									devFile = devFile.replace('/css/', '/css/dev/');
								}

								await fs.copyFile(file, devFile);

								const css = await fs.readFile(file, 'utf8');
								const minified = await postcss()
									.use(cssnano())
									.process(css, { from: file });

								await fs.writeFile(file, minified.css, 'utf8');
							});

							logger('_IMG_CSS_DEV_DONE');
						},
					},
				},
		  ]
		: []),
];

/* ---------------- Log ---------------- */

templateConfig.styles.tailwindcss ? logger('Tailwind підключений') : null;
