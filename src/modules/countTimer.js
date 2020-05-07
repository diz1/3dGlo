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
export default countTimer;
