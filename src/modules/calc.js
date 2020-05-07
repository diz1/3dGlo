const calc = (price = 100) => {
	const calcBlock = document.querySelector('.calc-block'),
		calcType = document.querySelector('.calc-type'),
		calcSquare = document.querySelector('.calc-square'),
		calcCount = document.querySelector('.calc-count'),
		calcDay = document.querySelector('.calc-day'),
		totalValue = document.getElementById('total');

	const countSum = () => {
		let total = 0, countValue = 1, dayValue = 1, result = 0;

		const typeValue = +calcType.options[calcType.selectedIndex].value,
			squareValue = +calcSquare.value;

		if (calcCount.value > 1) {
			countValue += (calcCount.value - 1) / 10;
		}

		if (calcDay.value && calcDay.value < 5) {
			dayValue *= 2;
		} else if (calcDay.value && calcDay.value < 10) {
			dayValue *= 1.5;
		}

		if (typeValue && squareValue) {
			total = Math.floor(price * typeValue * squareValue * countValue * dayValue);
		} else {
			totalValue.textContent = total.toString();
		}

		const interval = setInterval(() => {
			if (result < total) {
				result += 100;
				totalValue.textContent = result;
			} else if (result > total) {
				clearInterval(interval);
				totalValue.textContent = total.toString();
			}
		}, 1);
	};

	calcBlock.addEventListener('input', e => {
		const regExp = /\D/;
		let target = e.target;
		if (target.matches('select') || target.matches('input')) {
			countSum();
		}
		target = target.closest('input.calc-item');
		if (target) {
			target.value = target.value.replace(regExp, '');
		}
	});
};
export default calc;
