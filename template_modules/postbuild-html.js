import templateConfig from '../template.config.js';
import fs from 'fs/promises';
import { globSync } from 'glob';
import posthtml from 'posthtml';
import posthtmBeautify from 'posthtml-beautify';

export default function postbuildHtml() {
	return {
		name: 'postbuild-html',
		apply: 'build',
		enforce: 'post',
		async closeBundle() {
			const htmlFiles = globSync('dist/*.html');

			for (const file of htmlFiles) {
				let html = await fs.readFile(file, 'utf8');

				// SVG spritemap
				if (templateConfig.images.svgsprite && html.includes('__spritemap')) {
					html = html.replace(
						/__spritemap/gi,
						`${templateConfig.server.path}assets/img/spritemap.svg`
					);
				}

				// Beautify
				if (templateConfig.html.beautify.enable) {
					const result = await posthtml([
						posthtmBeautify({
							rules: {
								indent: templateConfig.html.beautify.indent,
								blankLines: '',
								sortAttrs: true,
							},
						}),
					]).process(html);
					html = result.html;
				}

				// Replace common.js
				html = html.replace(
					/<script\s+type="module"\s+crossorigin=""\s+src="(.\/js\/common\.min\.js\?v=\d+)"><\/script>/,
					'<link rel="modulepreload" crossorigin href="$1">'
				);

				await fs.writeFile(file, html, 'utf8');
			}
		},
	};
}
