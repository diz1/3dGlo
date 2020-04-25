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
		const menu = document.querySelector('menu'),
			menuHandler = () => {
				menu.classList.toggle('active-menu');
			};

		document.body.addEventListener('click', e => {
			let target = e.target;
			if (target.closest('.menu')) {
				menuHandler();
			} else if (menu.classList.contains('active-menu')) {
				target = target.closest('.active-menu');
				if (!target) {
					menuHandler();
				} else {
					target = e.target;
					if (target.classList.contains('close-btn') || target.tagName === 'A') {
						menuHandler();
					}
				}
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


	// Слайдер
	const slider = (time = 2500) => {
		const slide = document.querySelectorAll('.portfolio-item'),
			dotsList = document.querySelector('.portfolio-dots'),
			slider = document.querySelector('.portfolio-content');

		const addDots = (dotList, sliderList) => {
			sliderList.forEach(() => {
				const li = document.createElement('li');
				li.classList.add('dot');
				dotList.append(li);
			});
			dotList.firstElementChild.classList.add('dot-active');
			return document.querySelectorAll('.dot');
		};
		const dot = addDots(dotsList, slide);

		let currentSlide = 0,
			interval;

		const prevSlide = (item, index, strClass) => {
			item[index].classList.remove(strClass);
		};

		const nextSlide = (item, index, strClass) => {
			item[index].classList.add(strClass);
		};

		const autoPlaySlide = () => {
			prevSlide(slide, currentSlide, 'portfolio-item-active');
			prevSlide(dot, currentSlide, 'dot-active');
			currentSlide++;
			if (currentSlide >= slide.length) {
				currentSlide = 0;
			}
			nextSlide(slide, currentSlide, 'portfolio-item-active');
			nextSlide(dot, currentSlide, 'dot-active');
		};

		const startSlide = (time = 2500) => {
			interval = setInterval(autoPlaySlide, time);
		};

		const stopSlide = () => {
			clearInterval(interval);
		};

		slider.addEventListener('click', e => {
			e.preventDefault();
			const target = e.target;

			if (!target.matches('.portfolio-btn, .dot')) {
				return;
			}

			prevSlide(slide, currentSlide, 'portfolio-item-active');
			prevSlide(dot, currentSlide, 'dot-active');

			if (target.matches('#arrow-right')) {
				currentSlide++;
			} else if (target.matches('#arrow-left')) {
				currentSlide--;
			} else if (target.matches('.dot')) {
				dot.forEach((item, index) => {
					if (item === target) {
						currentSlide = index;
					}
				});
			}

			if (currentSlide >= slide.length) {
				currentSlide = 0;
			}
			if (currentSlide < 0) {
				currentSlide = slide.length - 1;
			}
			nextSlide(slide, currentSlide, 'portfolio-item-active');
			nextSlide(dot, currentSlide, 'dot-active');
		});

		slider.addEventListener('mouseover', e => {
			const target = e.target;
			if (target.matches('.portfolio-btn') || target.matches('.dot')) {
				stopSlide();
			}
		});

		slider.addEventListener('mouseout', e => {
			const target = e.target;
			if (target.matches('.portfolio-btn') || target.matches('.dot')) {
				startSlide(time);
			}
		});
		startSlide(time);
	};

	slider(2500);


	// Калькулятор
	const calc = () => {
		const calcBlock = document.querySelector('.calc');

		calcBlock.addEventListener('input', e => {
			let target = e.target;
			target = target.closest('input.calc-item');
			if (target) {
				target.value = target.value.replace(/\D/, '');
			}
		});
	};

	calc();


	// Наша команда
	const team = () => {
		const commandPhoto = document.querySelectorAll('.command__photo'),
			commandBlock = document.querySelector('.command'),
			getDefaultImagesSrc = () => {
				const defaultSrc = [];
				commandPhoto.forEach((item, index) => {
					defaultSrc.push({ itemSrc: item.src, itemInd: index });
				});

				defaultSrc.forEach(item => {
					item.itemSrc = item.itemSrc.replace(/.+(?=images)/, '');
				});
				return defaultSrc;
			},
			defaultSrc = getDefaultImagesSrc();

		commandBlock.addEventListener('mouseover', e => {
			let target = e.target;
			target = target.closest('img.command__photo');
			commandPhoto.forEach((item, index) => {
				if (target === item) {
					item.src = item.dataset.img;
				} else if (!target) {
					item.src = defaultSrc[index].itemSrc;
				}
			});
		});
	};

	team();
});
