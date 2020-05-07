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
export default toggleMenu;
