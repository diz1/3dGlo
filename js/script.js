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
			menu = document.querySelector('menu');

		const menuHandler = () => {
			menu.classList.toggle('active-menu');
		};

		btnMenu.addEventListener('click', menuHandler);
		menu.addEventListener('click', e => {
			const target = e.target;
			if (target.tagName === 'A') {
				menuHandler();
			}
		});
	};

	toggleMenu();


	// Поп-ап

	const togglePopup = () => {
		const popup = document.querySelector('.popup'),
			popupBtn = document.querySelectorAll('.popup-btn'),
			popupContent = popup.querySelector('.popup-content'),
			popupStyles = getComputedStyle(popup);

		const popupHandler = () => {
			if (document.documentElement.clientWidth < 768) {
				if (popupStyles.display === `none`) {
					popup.style.display = `block`;
				} else if (popupStyles.display === `block`) {
					popup.style.display = `none`;
				}
			} else {
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
			}
		};

		popup.addEventListener('click', e => {
			let target = e.target;
			if (target.classList.contains('popup-close')) {
				popupHandler();
			} else {
				target = target.closest('.popup-content');
				if (!target) {
					popupHandler();
				}
			}
		});

		popupBtn.forEach(item => item.addEventListener('click', popupHandler));
	};

	togglePopup();


	// Скроллы

	const scroll = () => {
		const nextSlideBtn = document.querySelector(`main`).querySelector(`a`);

		const animate = ({ timing, draw, duration }) => {
			const start = performance.now();

			requestAnimationFrame(function animate(time) {
				let timeFraction = (time - start) / duration;
				if (timeFraction > 1) timeFraction = 1;

				const progress = timing(timeFraction);

				draw(progress);

				if (timeFraction < 1) {
					requestAnimationFrame(animate);
				}
			});
		};

		nextSlideBtn.addEventListener('click', e => {
			e.preventDefault();
			animate({
				duration: 700,
				timing(timeFraction) {
					return timeFraction;
				},
				draw(progress) {
					if (document.documentElement.scrollTop < 830) {
						document.documentElement.scrollTop += progress * 50;
					}
				}
			});
		});
	};

	scroll();

	// Табы

	const tabs = () => {
		const tabHeader = document.querySelector('.service-header'),
			tab = tabHeader.querySelectorAll('.service-header-tab'),
			tabContent = document.querySelectorAll('.service-tab');

		const toggleTabContent = index => {
			for (let i = 0; i < tabContent.length; i++) {
				if (index === i) {
					tab[i].classList.add('active');
					tabContent[i].classList.remove('d-none');
				} else {
					tab[i].classList.remove('active');
					tabContent[i].classList.add('d-none');
				}
			}
		};

		tabHeader.addEventListener('click', e => {
			let target = e.target;
			target = target.closest('.service-header-tab');

			if (target) {
				tab.forEach((item, i) => {
					if (item === target) {
						toggleTabContent(i);
					}
				});
			}
		});
	};

	tabs();
});
