'use strict';

// Polyfills
import "@babel/polyfill";
import 'nodelist-foreach-polyfill';
import elementClosest from 'element-closest';
import 'formdata-polyfill';
import 'fetch-polyfill';
import 'mdn-polyfills/Node.prototype.append';
elementClosest(window);


import countTimer from './modules/countTimer';
import toggleMenu from './modules/toggleMenu';
import togglePopup from './modules/togglePopup';
import scroll from './modules/scroll';
import sendForm from './modules/sendForm';
import tabs from './modules/tabs';
import slider from './modules/slider';
import calc from './modules/calc';
import team from './modules/team';

window.addEventListener('DOMContentLoaded', () => {

// Таймер
	countTimer(
		'12 may 2020',
		'#timer-hours',
		'#timer-minutes',
		'#timer-seconds'
	);

// Меню
	toggleMenu();

// Поп-ап
	togglePopup();

// Скроллы
	scroll();

// Обработка форм
	sendForm();

// Табы
	tabs();

// Слайдер
	slider(2500);

// Калькулятор
	calc(100);

// Наша команда
	team();
});
