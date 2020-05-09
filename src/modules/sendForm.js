const sendForm = () => {
	const message = {
			error: `Что-то пошло не так`,
			success: `Спасибо! Мы скоро с вами свяжемся!`,
			status: document.createElement('div'),
		},
		ajaxLoader = {
			add(elem) {
				elem.textContent = '';
				elem.classList.add('sk-rotating-plane');
			},
			remove(elem) {
				elem.classList.remove('sk-rotating-plane');
			}
		},
		ajaxHandler = {
			success() {
				ajaxLoader.remove(message.status);
				message.status.textContent = message.success;
			},
			error(status) {
				ajaxLoader.remove(message.status);
				message.status.textContent = message.error;
				console.warn(status.code);
				console.warn(status.text);
			}
		},
		forms = [...document.forms];
	message.status.style.cssText = `
			font-size: 2rem;
			color: #fff;
		`;

	function maskPhone(selector, masked = '+7 (___) ___-__-__') {
		const elem = document.querySelector(selector);

		function mask(event) {
			const keyCode = event.keyCode;
			const template = masked,
				def = template.replace(/\D/g, ""),
				val = this.value.replace(/\D/g, "");
			let i = 0,
				newValue = template.replace(/[_\d]/g, a => (i < val.length ? val.charAt(i++) || def.charAt(i) : a));
			i = newValue.indexOf("_");
			if (i != -1) {
				newValue = newValue.slice(0, i);
			}
			let reg = template.substr(0, this.value.length).replace(/_+/g,
				a => "\\d{1," + a.length + "}").replace(/[+()]/g, "\\$&");
			reg = new RegExp("^" + reg + "$");
			if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) {
				this.value = newValue;
			}
			if (event.type == "blur" && this.value.length < 5) {
				this.value = "";
			}
		}
		elem.addEventListener("input", mask);
		elem.addEventListener("focus", mask);
		elem.addEventListener("blur", mask);
	}

	maskPhone('#form1-phone');
	maskPhone('#form2-phone');
	maskPhone('#form3-phone');

	const postData = body => fetch('./server.php', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(body)
	});

	const clearInputs = formElements => {
		formElements.forEach(item => item.value = '');
	};

	forms.forEach(form => {
		const formElements = [...form];
		let reg = '';

		form.addEventListener('input', e => {
			const target = e.target;
			if (target.tagName.toLowerCase() === 'input' &&
				(!target.classList.contains('form-phone')) && target.value !== '') {
				if (!target.classList.contains('form-email')) {
					reg = /[^а-я\s]+/gi;
				} else if (target.classList.contains('form-email')) {
					reg = /[^\w@\.]+/gi;
				}
				target.value = target.value.replace(reg, '');
			}
		});

		form.addEventListener('submit', e => {
			e.preventDefault();
			ajaxLoader.add(message.status);
			form.append(message.status);

			const formData = new FormData(form);
			const body = {};

			formData.forEach((item, index) => {
				body[index] = item;
			});

			postData(body)
				.then(response => {
					if (response.status !== 200) {
						throw new Error('Status !== 200');
					}
					ajaxHandler.success();
				})
				.catch(response => {
					console.error(response);
					ajaxHandler.error(response);
				});

			clearInputs(formElements);
		});
	});
};
export default sendForm;
