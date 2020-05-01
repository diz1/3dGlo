'use strict';

class Card {

	_cardTemplate(item) {
		return `
			<div class="hero cards__hero">

                <div class="hero__image">
                    <img class="image image__item" src="./db/${item.photo.replace(/[/]$/, '')}"
                     alt="#">
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

            </div>
		`;
	}

	_dataListItemTemplate(item, key) {
		let title = key;
		let description = item[key].split(/\s+/).map(word => word[0].toUpperCase() + word.substring(1)).join(' ');
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
            </li>
		`;
	}

	_moviesListItemTemplate(item) {
		return `
			<li class="list__item movie__list--item">${item}</li>
		`;
	}

	_render(item, container) {
		container.insertAdjacentHTML('beforeend', this.cardTemplate(item));
		for (let key in item) {
			if ((typeof item[key]) === 'string' && key !== 'photo') {
				container.lastElementChild.querySelector('.data__list')
					.insertAdjacentHTML('beforeend', this.dataListItemTemplate(item, key));
			}
			if (key === 'movies' && item[key]) {
				const movieList = container.lastElementChild.querySelector('.movie__list');
				container.lastElementChild.querySelector('.movie__title').textContent = 'Movies list';
				item[key].forEach(movie => {
					movieList.insertAdjacentHTML('beforeend', this.moviesListItemTemplate(movie));
				});
			}
		}
	}

	constructor(...data) {
		this.data = data;
	}

	get cardTemplate() {
		return this._cardTemplate;
	}

	get dataListItemTemplate() {
		return this._dataListItemTemplate;
	}

	get moviesListItemTemplate() {
		return this._moviesListItemTemplate;
	}

	get render() {
		return this._render;
	}

}

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
		};

	const getData = url => new Promise((resolve, reject) => {
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

	const getCards = data => {
		const card = new Card(data);
		heroesCardsContainer.innerHTML = '';
		data.forEach(item => {
			card.render(item, heroesCardsContainer);
		});
	};

	const getMoviesTitles = data => {
		let movies = [],
			moviesTitles = [];

		data.forEach(item => {
			if (item.movies) {
				movies.push(item.movies);
			}
		});

		movies.forEach(item => {
			item.forEach(title => {
				moviesTitles.push(title);
			});
		});

		moviesTitles = [...new Set([...moviesTitles])];

		return moviesTitles;
	};

	const getList = titles => {
		const searchList = document.querySelector('.search__list'),
			searchInput = document.querySelector('.search__input');
		searchList.innerHTML = '';

		titles.forEach(title => {
			const li = document.createElement('li');
			li.className = 'list__item search__list--item';
			li.textContent = title;
			searchList.append(li);
		});


		searchInput.addEventListener('input', e => {
		});
	};

	const filterList = () => {
		const searchList = document.querySelector('.search__list'),
			searchInput = document.querySelector('.search__input');
		searchList.innerHTML = '';

		searchInput.addEventListener('focus', e => {
			searchList.classList.remove('search__list--hide');
		});

		searchInput.addEventListener('blur', e => {
			searchList.classList.add('search__list--hide');
		});

		document.addEventListener('click', e => {
			let target = e.target;
			target = target.closest('.list__item');
		});
	};
	filterList();

	const dataHandler = {
		success(data) {
			ajaxLoader.remove(heroesCardsContainer);
			getCards(data);
			// getMoviesTitles(data);
			const moviesTitles = getMoviesTitles(data);
			getList(moviesTitles);
		},
		error(reason) {
			console.log(reason);
		}
	};

	getData(url)
		.then(dataHandler.success)
		.catch(dataHandler.error);

});
