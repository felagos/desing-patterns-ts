const url = "https://jsonplaceholder.typicode.com/photos";

class ClientComponent {

	constructor(url) {
		this.url = url;
	}

	async getData() {
		const response = await fetch(this.url);
		const data = await response.json();
		return data;
	}

}

class ClientDecorator {

	constructor(client) {
		this.client = client;
	}

	async getData() {
		return await this.client.getData();
	}

}

class UpperCaseDecorator extends ClientDecorator {

	async getData() {
		const data = await super.getData();
		return data.map(item => ({
			...item,
			title: item.title.toUpperCase()
		}));
	}
}

class SliceDecorator extends ClientDecorator {

	constructor(client, slice) {
		super(client);
		this.slice = slice;
	}

	async getData() {
		const data = await super.getData();
		return data.slice(0, this.slice);
	}

}

class HtmlClientDecorator extends ClientDecorator {

	async getData() {
		const data = await super.getData();
		return data.map(item => ({
			...item,
			thumbnailUrl: `<img src="${item.thumbnailUrl}" alt="${item.title}" />`,
			title: `<h1>${item.title}</h1>`
		}));
	}

}

(async () => {
	const content1 = document.querySelector(".content1");

	const client = new ClientComponent(url);
	const upperCaseDecorator = new UpperCaseDecorator(client);
	const htmlClient =  new HtmlClientDecorator(upperCaseDecorator);
	const slideDecorator = new SliceDecorator(htmlClient, 10);

	const data = await slideDecorator.getData();
	content1.innerHTML = data.reduce((acc, el ) => {
		return acc + el.title + el.thumbnailUrl;
	}, "");

})();