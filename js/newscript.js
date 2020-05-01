'use strict';
window.addEventListener('DOMContentLoaded', () => {


	const url = `./db/dbHeroes.json`,
		loader = document.createElement('div'),
		heroesCardsContainer = document.querySelector('.heroes__cards'),
		ajaxLoader = {
			add(container) {
				loader.classList.add('sk-rotating-plane');
				container.append(loader);
			},
			remove(container) {
				loader.classList.remove('sk-rotating-plane');
				container.removeChild(loader);
			}
		},
		searchInput = document.querySelector('.search__input');
	const searchFilter = document.querySelector('.search__filter');

	// Запрос
	const request = url => new Promise((resolve, reject) => {
		ajaxLoader.add(heroesCardsContainer);

		const request = new XMLHttpRequest();

		request.open('GET', `${url}`);

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


	// Инициализация карточек
	const cardsInit = data => {
		if (heroesCardsContainer.innerHTML) {
			heroesCardsContainer.innerHTML = '';
		}

		// Шаблон карточки
		const cardTemplate = hero => `
			<div class="hero cards__hero">
			
			    <div class="hero__image">
			        <img class="image image__item" src="./db/${hero.photo.replace(/[/]$/, '')}"
			         alt="${hero.name}">
			    </div>
			
			    <div class="data hero__data">
			
			        <ul class="list data__list">
			            
			        </ul>
			        <!-- /.list -->
			
			    </div>
			    <!-- /.data -->
			
			    <div class="movie hero__movie">
			        <h2 class="movie__title"></h2>
			
			        <ul class="list movie__list">
			            
			        </ul>
			        <!-- /.list -->
			
			    </div>
			    <!-- /.movie -->
			
			</div>`;

		// Шаблон списка инфы о герое
		const dataListItemTemplate = (hero, key) => {
				let title = key;
				let description = hero[key].split(/\s+/).map(word => word[0]
					.toUpperCase() + word.substring(1)).join(' ');
				if (key === 'name') {
					title = 'Name';
				}
				if (key === 'realName') {
					title = 'Real name';
				}
				if (key === 'species') {
					title = 'Species';
				}
				if (key === 'citizenship') {
					title = 'Citizenship';
				}
				if (key === 'gender') {
					title = 'Gender';
				}
				if (key === 'birthDay') {
					title = 'Birth day';
				}
				if (key === 'deathDay') {
					title = 'Death day';
				}
				if (key === 'status') {
					title = 'Status';
				}
				if (key === 'actors') {
					title = 'Actor';
				}
				return `
					<li class="list__item data__list--item">
		                <span class="list__item-title" id="${key}">${title}</span>
		                <span class="list__item-description">${description}</span>
		            </li>`;
			};

		// Шаблон элемента списка фильмов
		const moviesListItemTemplate = item => `
			<li class="list__item movie__list--item">${item}</li>
		`;

		data.forEach(hero => {
			heroesCardsContainer.insertAdjacentHTML('beforeend', cardTemplate(hero));
			for (let key in hero) {
				if ((typeof hero[key]) === 'string' && key !== 'photo') {
					heroesCardsContainer.lastElementChild.querySelector('.data__list')
						.insertAdjacentHTML('beforeend', dataListItemTemplate(hero, key));
				}
				if (key === 'movies' && hero[key]) {
					const movieList = heroesCardsContainer.lastElementChild.querySelector('.movie__list');
					heroesCardsContainer.lastElementChild.querySelector('.movie__title')
						.textContent = 'Movies list';
					hero[key].forEach(movie => {
						movieList.insertAdjacentHTML('beforeend', moviesListItemTemplate(movie));
					});
				}
			}
		});
		return data;
	};


	// Получение элементов списка для инициализации
	const getSearchListItems = data => {
		let items = [], searchListItems = [];

		data.forEach(item => {
			if (item.movies) {
				items.push(item.movies);
			}
		});

		items.forEach(item => {
			item.forEach(title => {
				searchListItems.push(title);
			});
		});

		searchListItems = [...new Set([...searchListItems])];

		return searchListItems;
	};


	// Инициализация списка фильмов для поиска
	const searchListInit = data => {
		const searchList = document.querySelector('.search__list');

		if (searchList.children.length === 0) {
			searchList.innerHTML = '';
		}

		data.forEach(listItem => {
			const li = document.createElement('li');

			li.classList.add('list__item');
			li.classList.add('search__list--item');
			li.textContent = listItem;

			searchList.append(li);
		});

	};

	// Инициализация запроса
	request(url)
		.then(cardsInit)
		.then(getSearchListItems)
		.then(searchListInit)
	.catch(reason => new Error(reason));


	// Обновление карточек
	const cardsUpdate = () => {};


	// Обновление списка
	const searchListUpdate = () => {};

	const searchList = document.querySelector('.search__list');

	// Обработчики
	searchInput.addEventListener('focus', e => {
		searchList.classList.remove('search__list--hide');
	});

	searchInput.addEventListener('blur', e => {
		searchList.classList.add('search__list--hide');
	});

	searchInput.addEventListener('input', e => {

	});

	searchList.addEventListener('click', e => {
		console.log(e.target);
	});
	console.log(searchList);


});