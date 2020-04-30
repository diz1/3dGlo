'use strict';
const output = document.getElementById('output'),
	urlPhoto = `https://jsonplaceholder.typicode.com/photos`;

const getData = url => new Promise((res, rej) => {
	const req = new XMLHttpRequest();
	req.open('GET', url);
	req.addEventListener('readystatechange', () => {
		if (req.readyState !== 4) {
			return;
		}
		if (req.status === 200) {
			const response = JSON.parse(req.responseText);
			res(response);
		} else {
			rej(req.status);
		}
	});
	req.send();
});

const outputPhotos = data => {
	let template = `<h4>${data.title}</h4>
		<img src="${data.thumbnailUrl}" alt="${data.title}">`;

	if (Array.isArray(data)) {
		data.forEach(item => {
			template =
				`<h4>${item.title}</h4>
				<img src="${item.thumbnailUrl}" alt="${item.title}">`;
			output.insertAdjacentHTML('beforebegin', template);
		});
		return;
	}
	output.insertAdjacentHTML('beforebegin', template);
};

// const oneImg = getData(`${urlPhoto}/1`),
// 	twoImg = getData(`${urlPhoto}/2`),
// 	threeImg = getData(`${urlPhoto}/3`);

// oneImg
// 	.then(outputPhotos)
// 	.catch(error => console.log(error));
//
// twoImg
// 	.then(outputPhotos)
// 	.catch(error => console.log(error));

// getData(urlPhoto)
// 	.then(outputPhotos)
// 	.catch(error => console.log(error));

// Promise.all([oneImg, twoImg, threeImg])
// 	.then(outputPhotos)
// 	.catch(error => console.log(error));
