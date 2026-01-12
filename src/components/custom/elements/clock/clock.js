// Підключення функціоналу "Чортоги Фрілансера"
import {
	addTouchAttr,
	addLoadedAttr,
	isMobile,
	FLS,
} from '@js/common/functions.js';

import './clock.scss';

// Функция инициализации таймера обратного отсчета
function initTimer(id) {
	const timer = document.getElementById(id);
	if (!timer) return;
	let seconds = Number.parseInt(timer.dataset.time, 10);
	if (Number.isNaN(seconds) || seconds < 0) return;

	const elMinutes = timer.querySelector('.clock__minutes');
	const elSeconds = timer.querySelector('.clock__seconds');

	function updateTimer() {
		const minutes = Math.floor(seconds / 60);
		const sec = seconds % 60;

		elMinutes.textContent = String(minutes).padStart(2, '0');
		elSeconds.textContent = String(sec).padStart(2, '0');

		if (seconds <= 0) {
			clearInterval(timerId);
			elMinutes.textContent = '00';
			elSeconds.textContent = '00';
			timer.dataset.timeEnd = true;
		}
		seconds--;
	}

	updateTimer();
	const timerId = setInterval(updateTimer, 1000);
}

initTimer('clock-general');
