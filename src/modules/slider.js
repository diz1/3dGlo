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
export default slider;
