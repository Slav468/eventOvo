// // Налаштування шаблону
// import templateConfig from '../template.config.js';
// import fs from 'fs';

// import chalk from 'chalk';
// export default async function logger(text, vars) {
// 	if (templateConfig.logger.terminal) {
// 		const lang = JSON.parse(
// 			fs.readFileSync(
// 				`./template_modules/languages/${templateConfig.lang}.json`,
// 				'UTF-8'
// 			)
// 		);
// 		if (Array.isArray(vars)) {
// 			let i = 0;
// 			text = lang[text].replace(/@@/g, () => vars[i++]);
// 		} else {
// 			text = lang[text]
// 				? text.replace(text, lang[text].replace('@@', vars))
// 				: text;
// 		}
// 		if (text.startsWith('(?)')) {
// 			console.log(`${chalk.magenta(text.replace('(?)', ''))}`);
// 		} else if (text.startsWith('(!)')) {
// 			console.log(`${chalk.yellow(text.replace('(!)', '! '))}`);
// 		} else if (text.startsWith('(!!)')) {
// 			console.log(`${chalk.red(text.replace('(!!)', ''))}`);
// 		} else {
// 			console.log(`${chalk.green(`✓ ${text}`)}`);
// 		}
// 	}
// }

// Налаштування шаблону
import templateConfig from '../template.config.js';
import fs from 'fs';
import chalk from 'chalk';

let cachedLang = null;

function getLang() {
	if (!cachedLang) {
		cachedLang = JSON.parse(
			fs.readFileSync(
				`./template_modules/languages/${templateConfig.lang}.json`,
				'UTF-8'
			)
		);
	}
	return cachedLang;
}

export default async function logger(text, vars) {
	if (!templateConfig.logger.terminal) return;

	const lang = getLang(); // вместо чтения файла каждый раз

	if (Array.isArray(vars)) {
		let i = 0;
		text = lang[text].replace(/@@/g, () => vars[i++]);
	} else {
		text = lang[text]
			? text.replace(text, lang[text].replace('@@', vars))
			: text;
	}

	if (text.startsWith('(?)')) {
		console.log(chalk.magenta(text.replace('(?)', '')));
	} else if (text.startsWith('(!)')) {
		console.log(chalk.yellow(text.replace('(!)', '! ')));
	} else if (text.startsWith('(!!)')) {
		console.log(chalk.red(text.replace('(!!)', '')));
	} else {
		console.log(chalk.green(`✓ ${text}`));
	}
}
