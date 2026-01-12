// Підключення модуля
import flatpickr from 'flatpickr';
import { Russian } from 'flatpickr/dist/l10n/ru.js';

import { setFormsInput } from '../../custom/section/survey/survey';

import './datepicker.scss';

if (document.querySelector('[data-fls-datepicker]')) {
	const datePickers = document.querySelectorAll('[data-fls-datepicker]');

	window.flsDatePickers = [];

	datePickers.forEach((datePicker, i) => {
		const isRange = datePicker.getAttribute('data-fls-datepicker');

		switch (isRange) {
			case 'date':
				const datePickerDate = flatpickr(datePicker, {
					// Основные настройки
					dateFormat: 'd.m.Y', // Формат даты (день.месяц.год)
					altInput: true, // Показывает пользователю понятный формат
					altFormat: 'j F Y', // Отображаемый формат (например, "24 Декабря 2025")

					// Локализация (русский язык)
					locale: Russian,

					// Настройки времени
					enableTime: false, // Включить выбор времени
					noCalendar: false, // Скрыть календарь (только время)
					time_24hr: true, // 24-часовой формат

					// Диапазоны и ограничения
					minDate: 'today', // Минимальная дата - сегодня
					maxDate: new Date().fp_incr(365), // Максимальная дата +30 дней от сегодня

					// Выходные
					onDayCreate: function (dObj, dStr, fp, dayElem) {
						// Проверяем, является ли день субботой (6) или воскресеньем (0)
						if (
							dayElem.dateObj.getDay() === 6 ||
							dayElem.dateObj.getDay() === 0
						) {
							dayElem.classList.add('weekend'); // Добавляем класс для стилизации
						}
					},

					// Изменение
					onChange: function (selectedDates, dateStr, instance) {
						// Все три способа работают:

						const popupBody = instance.altInput.closest('.popup-body');
						const popup = popupBody.closest('.popup');
						const popupData = popup.dataset.flsPopup;

						const popupBtn = popupBody.querySelector(
							'.popup-body__buttons button'
						);

						popupBtn.removeAttribute('disabled');
						popupBtn.dataset.value = dateStr;
					},

					// Режимы выбора
					mode: 'single', // Возможные варианты: "single", "multiple", "range"

					// Дополнительные опции
					weekNumbers: false, // Показывать номера недель
					static: false, // Статичное позиционирование
					inline: false, // Встроенный календарь (без поля ввода)

					// Даты по умолчанию
					defaultDate: [], // Сегодняшняя дата по умолчанию

					// Исключения (выходные дни)
					disable: [],

					// Позиционирование календаря
					position: 'auto', // "auto", "above", "below"

					// Всплывающие подсказки
					animate: true, // Анимация открытия/закрытия
					showMonths: 1, // Количество отображаемых месяцев
				});
				window.flsDatePickers.push(datePickerDate);
				break;
			case 'range':
				const datePickerRange = flatpickr(datePicker, {
					// Основные настройки
					dateFormat: 'd.m.Y', // Формат даты (день.месяц.год)
					altInput: true, // Показывает пользователю понятный формат
					altFormat: 'j F ', // Отображаемый формат (например, "24 Декабря 2025")

					// Локализация (русский язык)
					locale: Russian,

					// Настройки времени
					enableTime: false, // Включить выбор времени
					noCalendar: false, // Скрыть календарь (только время)
					time_24hr: true, // 24-часовой формат

					// Диапазоны и ограничения
					minDate: 'today', // Минимальная дата - сегодня
					maxDate: new Date().fp_incr(96), // Максимальная дата +30 дней от сегодня

					// Выходные
					onDayCreate: function (dObj, dStr, fp, dayElem) {
						// Проверяем, является ли день субботой (6) или воскресеньем (0)
						if (
							dayElem.dateObj.getDay() === 6 ||
							dayElem.dateObj.getDay() === 0
						) {
							dayElem.classList.add('weekend'); // Добавляем класс для стилизации
						}
					},

					// Изменение
					onChange: function (selectedDates, dateStr, instance) {
						// Все три способа работают:

						const popupBody = instance.altInput.closest('.popup-body');
						const popup = popupBody.closest('.popup');
						const popupData = popup.dataset.flsPopup;

						const popupBtn = popupBody.querySelector(
							'.popup-body__buttons button'
						);

						popupBtn.removeAttribute('disabled');
						popupBtn.dataset.value = dateStr;
					},

					// Режимы выбора
					mode: 'range', // Возможные варианты: "single", "multiple", "range"

					// Дополнительные опции
					weekNumbers: false, // Показывать номера недель
					static: false, // Статичное позиционирование
					inline: false, // Встроенный календарь (без поля ввода)

					// Даты по умолчанию
					defaultDate: [], // Сегодняшняя дата по умолчанию

					// Исключения (выходные дни)
					disable: [],

					// Позиционирование календаря
					position: 'auto', // "auto", "above", "below"

					// Всплывающие подсказки
					animate: true, // Анимация открытия/закрытия
					showMonths: 1, // Количество отображаемых месяцев
				});
				window.flsDatePickers.push(datePickerRange);
				break;
			default:
				console.log(
					'Укажите в data-fls-datepicker тип выбора даты (например: date, range)'
				);
				break;
		}
	});
}
