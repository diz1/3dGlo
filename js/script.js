'use strict';
window.addEventListener('DOMContentLoaded', () => {

	// Таймер
	const countTimer = (deadline, hoursElement, minutesElement, secondsElement) => {

		const getElements = () => {
			const timerHours = document.querySelector(hoursElement),
				timerMinutes = document.querySelector(minutesElement),
				timerSeconds = document.querySelector(secondsElement);

			return { timerHours, timerMinutes, timerSeconds };
		};

		const getTimeRemaining = () => {
			const dateStop = new Date(deadline).getTime(),
				dateNow = new Date().getTime(),
				timeRemaining = (dateStop - dateNow) / 1000,
				seconds = Math.floor(timeRemaining % 60),
				minutes = Math.floor((timeRemaining / 60) % 60),
				hours = Math.floor(timeRemaining / 60 / 60);

			return { timeRemaining, hours, minutes, seconds };
		};

		const elements = getElements();

		const updateClock = () => {
			const timer = getTimeRemaining();

			if (timer.timeRemaining > 0) {
				elements.timerHours.textContent = `${timer.hours}`;
				elements.timerMinutes.textContent = `${timer.minutes}`;
				elements.timerSeconds.textContent = `${timer.seconds}`;

				if (timer.hours.toString().length === 1) {
					elements.timerHours.textContent = `0${timer.hours}`;
				}

				if (timer.minutes.toString().length === 1) {
					elements.timerMinutes.textContent = `0${timer.minutes}`;
				}

				if (timer.seconds.toString().length === 1) {
					elements.timerSeconds.textContent = `0${timer.seconds}`;
				}
			} else if (timer.timeRemaining === 0 || timer.timeRemaining < 0) {
				elements.timerHours.textContent = '00';
				elements.timerMinutes.textContent = '00';
				elements.timerSeconds.textContent = '00';
			}
		};

		updateClock();
		setInterval(updateClock, 1000);
	};

	countTimer(
		'22 april 2020',
		'#timer-hours',
		'#timer-minutes',
		'#timer-seconds'
	);

	// Меню
	const toggleMenu = () => {
		const btnMenu = document.querySelector('.menu'),
			menu = document.querySelector('menu'),
			closeBtn = document.querySelector('.close-btn'),
			menuItem = menu.querySelectorAll('ul > li');

		const menuHandler = () => {
			menu.classList.toggle('active-menu');
		};

		btnMenu.addEventListener('click', menuHandler);
		closeBtn.addEventListener('click', menuHandler);
		menuItem.forEach(item => item.addEventListener('click', menuHandler));
	};

	toggleMenu();

	// Поп-ап

	const togglePopup = () => {
		const popup = document.querySelector('.popup'),
			popupBtn = document.querySelectorAll('.popup-btn'),
			popupClose = document.querySelector('.popup-close'),
			popupContent = popup.querySelector('.popup-content'),
			popupStyles = getComputedStyle(popup);

		// 	() => {
		// 	popup.style.display = `block`;
		// }));

		const popupHandler = () => {
			let count = -50;
			if (popupStyles.display === `none`) {
				popup.style.display = `block`;
				popupContent.style.top = `${count}%`;

				const timer = setInterval(() => {
					count += 1;

					popupContent.style.top = count + '%';

					if (count > 20) clearInterval(timer);
				}, 15);
			} else if (popupStyles.display === `block`) {
				count = 20;
				const timer = setInterval(() => {
					count -= 1;

					popupContent.style.top = count + '%';

					if (count === -50) clearInterval(timer);
				}, 15);
				setTimeout(() => popup.style.display = `none`, 1000);
			}
		};

		popupBtn.forEach(item => item.addEventListener('click', popupHandler));
		popupClose.addEventListener('click', popupHandler);

		if (document.documentElement.clientWidth < 768) {
			popupBtn.forEach(item => item.removeEventListener('click', popupHandler));
			popupClose.removeEventListener('click', popupHandler);

			popupBtn.forEach(item => item.addEventListener('click', () => {
				popup.style.display = `block`;
			}));
			popupClose.addEventListener('click', () => {
				popup.style.display = `none`;
			});
		} else {
			popupBtn.forEach(item => item.addEventListener('click', popupHandler));
			popupClose.addEventListener('click', popupHandler);
		}
	};

	togglePopup();
});
