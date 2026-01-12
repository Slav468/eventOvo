// Підключення функціоналу "Чертоги Фрілансера"
import {
	FLS,
	slideUp,
	slideDown,
	slideToggle,
	dataMediaQueries,
	throttle,
} from '@js/common/functions.js';

import './provision.scss';

function initProvisionBlock(block) {
	const content = block.querySelector('[data-fls-provision-content]');
	const button = block.querySelector('[data-fls-provision-button]');
	const items = content.querySelectorAll('.provision-item');

	const countToShow =
		parseInt(content.getAttribute('data-provision-count')) || 2;
	const totalItems = items.length;
	const mediaQueryValue = block.getAttribute('data-fls-provision');

	let shownCount = 0;
	let clickHandler = null;
	let currentMediaQuery = null;
	let currentMatchMedia = null;

	// Функция для показа элементов
	function showItems(count) {
		const toShow = Math.min(count, totalItems - shownCount);

		for (let i = shownCount; i < shownCount + toShow; i++) {
			if (items[i]) {
				items[i].removeAttribute('hidden');
			}
		}

		shownCount += toShow;

		// Обновляем состояние кнопки
		updateButtonVisibility();
	}

	// Функция для скрытия элементов
	function hideAllItems() {
		items.forEach((item) => {
			item.setAttribute('hidden', '');
		});
		shownCount = 0;
	}

	// Функция для показа всех элементов
	function showAllItems() {
		items.forEach((item) => {
			item.removeAttribute('hidden');
		});
		shownCount = totalItems;
	}

	// Функция обновления видимости кнопки
	function updateButtonVisibility() {
		if (shownCount >= totalItems) {
			button.setAttribute('hidden', '');
		} else {
			button.removeAttribute('hidden');
		}
	}

	// Функция инициализации логики с кнопкой
	function initWithButton() {
		// Скрываем все элементы
		hideAllItems();

		// Показываем первоначальное количество
		showItems(countToShow);

		// Обновляем видимость кнопки
		updateButtonVisibility();

		// Удаляем старый обработчик, если есть
		if (clickHandler) {
			button.removeEventListener('click', clickHandler);
		}

		// Создаем новый обработчик
		clickHandler = () => {
			showItems(countToShow);
		};

		// Добавляем обработчик
		button.addEventListener('click', clickHandler);

		// Показываем кнопку (если еще есть скрытые элементы)
		if (shownCount < totalItems) {
			button.removeAttribute('hidden');
		}
	}

	// Функция очистки логики с кнопкой
	function destroyWithButton() {
		if (clickHandler) {
			button.removeEventListener('click', clickHandler);
			clickHandler = null;
		}
	}

	// Функция для обработки состояния медиазапроса
	function handleMediaState(isActive) {
		if (isActive) {
			// Медиазапрос активен (ширина экрана меньше указанной) - инициализируем логику с кнопкой
			initWithButton();
		} else {
			// Медиазапрос не активен - показываем все элементы и скрываем кнопку
			destroyWithButton();
			showAllItems();
			button.setAttribute('hidden', '');
		}
	}

	// Основная функция инициализации
	function init() {
		// Если в data-fls-provision нет значения
		if (!mediaQueryValue || mediaQueryValue.trim() === '') {
			// Показываем все элементы и скрываем кнопку
			showAllItems();
			button.setAttribute('hidden', '');
			return;
		}

		// Парсим медиазапрос
		const [breakpoint, type = 'max'] = mediaQueryValue.split(',');
		const mediaQuery = `(${type}-width: ${breakpoint}px)`;
		currentMediaQuery = mediaQuery;
		currentMatchMedia = window.matchMedia(mediaQuery);

		// Функция обработки изменения медиазапроса
		const mediaChangeHandler = (e) => {
			handleMediaState(e.matches);
		};

		// Инициализируем текущее состояние
		handleMediaState(currentMatchMedia.matches);

		// Слушаем изменения медиазапроса
		currentMatchMedia.addEventListener('change', mediaChangeHandler);

		// Сохраняем обработчик для очистки
		currentMatchMedia._provisionHandler = mediaChangeHandler;
	}

	// Функция очистки
	function destroy() {
		if (currentMatchMedia && currentMatchMedia._provisionHandler) {
			currentMatchMedia.removeEventListener(
				'change',
				currentMatchMedia._provisionHandler
			);
		}
		destroyWithButton();
	}

	// Инициализируем блок
	init();

	// Возвращаем объект с методами для управления
	return {
		showMore: () => {
			if (currentMatchMedia && currentMatchMedia.matches) {
				showItems(countToShow);
			}
		},
		reset: () => {
			destroy();
			init();
		},
		destroy: destroy,
		getShownCount: () => shownCount,
		getTotalCount: () => totalItems,
		isActive: () => (currentMatchMedia ? currentMatchMedia.matches : false),
	};
}

function initAllProvisionBlocks() {
	const blocks = document.querySelectorAll('[data-fls-provision]');
	const instances = [];

	blocks.forEach((block) => {
		if (!block.hasAttribute('data-provision-initialized')) {
			const instance = initProvisionBlock(block);
			block.setAttribute('data-provision-initialized', 'true');
			instances.push({ instance, block });
		}
	});

	return {
		instances,
		destroyAll: () => {
			instances.forEach(({ instance, block }) => {
				if (instance.destroy) instance.destroy();
				block.removeAttribute('data-provision-initialized');
			});
		},
	};
}

// Автоматическая инициализация
if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', () => {
		initAllProvisionBlocks();
	});
} else {
	initAllProvisionBlocks();
}

// Экспорт функций
export { initProvisionBlock, initAllProvisionBlocks };
