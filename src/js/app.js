// Підключення функціоналу "Чортоги Фрілансера"
import {
	addTouchAttr,
	addLoadedAttr,
	isMobile,
	FLS,
} from '@js/common/functions.js';
addTouchAttr();
addLoadedAttr();

export function changeBackground() {
	const changeElements = document.querySelectorAll('[data-change-background]');

	if (changeElements.length > 0) {
		changeElements.forEach((changeElement) => {
			const elementColor = changeElement.getAttribute('data-background-color');
			const elementImg = changeElement.getAttribute('data-background-img');
			changeElement.style.setProperty(
				'background-color',
				`var(${elementColor})`
			);
			changeElement.style.setProperty(
				'background-image',
				`url("${elementImg}")`
			);
		});
	} else return;
}

document.addEventListener('DOMContentLoaded', changeBackground);
