import './plain.scss';
import { setFormsInput } from '../survey/survey';

if (
	document.querySelector(
		'[data-fls-popup="plain-messenger"] .popup-body__buttons'
	)
) {
	setFormsInput('[data-fls-popup="plain-day"] .popup-body__buttons');
	setFormsInput('[data-fls-popup="plain-range"] .popup-body__buttons');
	setFormsInput('[data-fls-popup="plain-messenger"] .popup-body__buttons');
}
