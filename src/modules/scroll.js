const scroll = () => {
	const nextSlideBtn = document.querySelector('main > a'),
		menu = document.querySelector('menu');

	const getAnimationScroll = target => {
		const targetHREF = target.getAttribute('href')
		if (targetHREF === `#service-block`) {
			return 830;
		}
		if (targetHREF === `#portfolio`) {
			return 1400;
		}
		if (targetHREF === `#calc`) {
			return 2420;
		}
		if (targetHREF === `#command`) {
			return 3480;
		}
		if (targetHREF === `#connect`) {
			return 4370;
		}
	};

	const animate = ({ timing, draw }, target) => {
		const start = performance.now();

		requestAnimationFrame(function animate(time) {
			let timeFraction = (time - start) / 700;
			const progress = timing(timeFraction);

			draw(progress);

			if (document.documentElement.scrollTop < getAnimationScroll(target)) {
				requestAnimationFrame(animate);
			}
		});
	};

	const clickHandler = e => {
		e.preventDefault();
		const target = e.target.closest('a');
		if (target !== null) {
			animate({
				timing(timeFraction) {
					return timeFraction;
				},
				draw(progress) {
					document.documentElement.scrollTop += progress * 50;
				}
			}, target);
		}
	};

	nextSlideBtn.addEventListener('click', clickHandler);
	menu.addEventListener('click', clickHandler);
};
export default scroll;
