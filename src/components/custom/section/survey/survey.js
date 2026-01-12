import './survey.scss';

function getValueButtons(button) {
	let value = button.dataset.value;
	if (!value) {
		console.log(
			'Значение data-value в кнопке отсутствует! Данные от кнопки не были записаны!'
		);
	} else {
		return value.trim();
	}
}

function getInputId(button) {
	let id = button.dataset.inputId;
	if (!id) {
		console.log(
			'Элемент inputId не найден! Данные от кнопки не были записаны!'
		);
	} else {
		return id.trim();
	}
}

function setValueInInput(value, inputId) {
	const inputElement = document.getElementById(`${inputId}`);

	if (value && inputElement) {
		inputElement.value = value;
		inputElement.textContent = value;

		sessionStorage.setItem(inputId, value);
	} else {
		console.log('Данных не хватает');
	}
}

function setFormsInput(parentSelector) {
	const buttons = document.querySelector(`${parentSelector}`).children;

	if (buttons.length > 0) {
		for (let button of buttons) {
			button.addEventListener('click', (e) => {
				const buttonValue = getValueButtons(button);
				const inputId = getInputId(button);
				setValueInInput(buttonValue, inputId);
			});
		}
	}
}

if (document.querySelector('.survey-buttons')) {
	setFormsInput('.survey-buttons');
	setFormsInput('[data-fls-popup="survey-messenger"] .popup-body__buttons');
}

export { setFormsInput };
