export function initDrop() {
	const dropMenu = document.querySelector('[data-fls-menu-drop]');
	dropMenu.addEventListener('click', (e) => {
		const targetElement = e.target;
		let isItemControl = targetElement.closest('.menu__control');
		console.log(isItemControl);
		if (isItemControl) {
			const item = isItemControl.closest('.menu-item');
			const subMenu = item.querySelector('.menu-item__list');
			subMenu.classList.toggle('active');
		}
	});
}

if (document.querySelector('[data-fls-menu-drop]')) initDrop();
