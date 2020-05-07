const scroll = () => {
	const nextSlideBtn = document.querySelector(`main`).querySelector(`a`);

	const animate = ({ timing, draw, duration }) => {
		const start = performance.now();

		requestAnimationFrame(function animate(time) {
			let timeFraction = (time - start) / duration;
			if (timeFraction > 1) timeFraction = 1;

			const progress = timing(timeFraction);

			draw(progress);

			if (timeFraction < 1 && document.documentElement.scrollTop < 830) {
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
export default scroll;
