import path from 'path';
const projectName = path.basename(path.resolve()).toLowerCase();

const isProduction = process.env.NODE_ENV === 'production';
const isWp = process.argv.includes('--wp');

export default {
	lang: 'ru',
	vscode: {
		settings: true,
		snippets: true,
	},
	devcomponents: {
		enable: true,
		filename: '_components.html',
	},
	newpage: {
		copyfromindex: false,
		usetemplate: 'main',
	},
	git: {
		repo: ``,
		branch: `main`,
	},
	navpanel: {
		dev: true,
		build: true,
		position: 'left',
		color: '#ffffff',
		background: 'rgba(51, 51, 51, 0.5)',
		transition: '300',
	},
	statistics: {
		enable: true,
		showonbuild: true,
	},
	server: {
		path: './',
		isassets: false,
		buildforlocal: false,
		copyfiles: true,
		version: true,
		hostname: 'localhost',
		port: '1111',
	},
	html: {
		beautify: {
			enable: true,
			indent: 'tab',
		},
	},
	styles: {
		tailwindcss: false,
		pxtorem: true,
		critical: false,
		codesplit: true,
		devfiles: false,
	},
	fonts: {
		iconsfont: true,
		download: false,
	},
	images: {
		svgsprite: true,
		optimize: {
			enable: true,
			edithtml: false,
			sizes: [],
			dpi: [],
			attrignore: 'data-img-ignore',
			modernformat: {
				enable: true,
				type: 'webp', // webp/avif
				only: false,
				quality: 85,
			},
			jpeg: {
				quality: 85,
			},
			png: {
				quality: 85,
			},
		},
	},
	js: {
		hotmodules: true,
		devfiles: false,
		bundle: {
			// Збирає в один JS та один CSS файли
			// незалежно від налаштування
			// styles -> codesplit,
			enable: false,
		},
		react: false,
		vue: false,
	},
	php: {
		enable: false,
		base: './src/php/',
		hostname: 'localhost',
		port: '1110',
		binary: 'C:\\php\\php.exe',
		ini: 'template_modules/assets/php.ini',
	},
	pug: {
		enable: false,
	},
	ftp: {
		host: 'vh250.timeweb.ru',
		port: 21,
		remoteDir: `/public_html/${projectName}`,
		user: 'kasko_ser',
		password: 'S29d5R1U',
	},
	logger: {
		// Логи роботи збірки в терміналі
		terminal: true,
		// Логи роботи модулів в консолі
		console: {
			enable: true,
			removeonbuild: true,
		},
	},
	projectpage: {
		enable: false,
		projectname: '',
		template: 'src/projectpage/projectpage.html',
		outfilename: '',
	},
	aliases: {
		// HTML/SCSS/JS components
		'@components': 'src/components',
		// Scripts
		'@js': 'src/js',
		// Styles
		'@styles': 'src/styles',
		// Media & files
		'@fonts': 'src/assets/fonts',
		'@img':
			isWp && !isProduction
				? 'src/wp-content/themes/fls-theme/assets/img'
				: 'src/assets/img',
		'@video': 'src/assets/video',
		'@files': 'src/files',
		// Other
		'@pug': 'src/pug',
	},
	coffee: {
		enable: true,
		text: 'Работаешь уже 60 минут?',
		interval: 60,
	},
	novaposhta: {
		enable: false,
		key: '',
	},
};
