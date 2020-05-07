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
export default team;
