'use strict';

window.addEventListener('DOMContentLoaded', () => {
	class Timer {
		constructor(deadline, timeElement, dayElement, daysElement, headerElement) {
			this.deadline = deadline;
			this.timeElement = timeElement;
			this.dayElement = dayElement;
			this.daysElement = daysElement;
			this.headerElement = headerElement;
			this._elements = this.getElements();
		}

		getElements() {
			const timerTime = document.querySelector(this.timeElement),
				timerDays = document.querySelector(this.daysElement),
				timerDay = document.querySelector(this.dayElement),
				timerHeader = document.querySelector(this.headerElement);

			return { timerTime, timerDay, timerDays, timerHeader };
		}

		getTimeRemaining() {
			const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

			const dateStop = new Date(this.deadline).getTime(),
				dateNow = new Date().getTime(),
				date = new Date(),
				timeRemaining = (dateStop - dateNow) / 1000,
				time = date.toLocaleTimeString('en-EN'),
				days = Math.floor(timeRemaining / 60 / 60 / 24),
				day = date.toLocaleDateString('ru-RU', options).split(', ')[0];

			return { timeRemaining, time, day, days };
		}

		updateClock() {
			const timer = this.getTimeRemaining();

			if (timer.timeRemaining > 0) {
				this._elements.timerDays.textContent = `${timer.days}`;
				this._elements.timerDay.textContent =
					`${timer.day.slice(0, 1).toUpperCase()}${timer.day.slice(1, timer.day.length)}`;
				this._elements.timerTime.textContent = `${timer.time}`;

				const fixTimer = [];
				timer.time.split(':').forEach(item => {
					if (item.length === 1) {
						item = `0${item}`;
					}
					fixTimer.push(item);
				});
				this._elements.timerTime.textContent = `${fixTimer.join(':')}`;

			} else if (timer.timeRemaining === 0 || timer.timeRemaining < 0) {
				this._elements.timerDays.textContent = `0`;
			}

			this.getHeader();
		}

		getHeader() {
			const hours = parseFloat(this._elements.timerTime.textContent.split(':')[0]),
				midnight = this._elements.timerTime.textContent.split(':')[2].split(' ')[1];

			if (midnight === 'AM' && hours > 6) {
				this._elements.timerHeader.textContent = 'Доброе утро';
			} else if (midnight === 'PM' && hours < 6) {
				this._elements.timerHeader.textContent = 'Добрый день';
			} else if (midnight === 'PM' && hours > 6) {
				this._elements.timerHeader.textContent = 'Добрый вечер';
			} else if (midnight === 'AM' && hours < 6) {
				this._elements.timerHeader.textContent = 'Доброй ночи';
			}
		}
	}

	const countTimer = new Timer(
		'31 december 2020',
		'#time',
		'#day',
		'#timer-days',
		'.timer-header'
	);

	countTimer.updateClock();
	setInterval(countTimer.updateClock.bind(countTimer), 1000);
});
