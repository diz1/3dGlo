'use strict';
document.addEventListener('DOMContentLoaded', () => {
	const select = document.getElementById('cars'),
		output = document.getElementById('output'),
		ajaxHandler = {
			success(data) {
				data.cars.forEach(item => {
					if (item.brand === select.value) {
						const { brand, model, price } = item;
						output.innerHTML = `Тачка ${brand} ${model} <br>
                        Цена: ${price}$`;
					}
				});
			},
			error(reason) {
				output.innerHTML = `Произошла ошибка c кодом: ${reason.status} и текстом: ${reason.text}`;
			}
		};

	const getCars = () => new Promise((resolve, reject) => {
		const request = new XMLHttpRequest();

		request.open('GET', './cars.json');
		request.addEventListener('readystatechange', () => {
			if (request.readyState !== 4) {
				return;
			}
			if (request.readyState === 4 && request.status === 200) {
				const data = JSON.parse(request.responseText);
				resolve(data);
			} else {
				const reason = {
					status: request.status,
					text: request.statusText
				};
				reject(reason);
			}
		});
		request.setRequestHeader('Content-type', 'application/json');
		request.send();
	});

	select.addEventListener('change', () => {
		getCars()
			.then(ajaxHandler.success)
			.catch(ajaxHandler.error);
	});
});
