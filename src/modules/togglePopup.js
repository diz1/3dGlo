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
export default togglePopup;
