const data = [
	{ name: "Heineken", country: "Netherlands", info: "A pale lager beer with 5% alcohol." },
	{ name: "Guinness", country: "Ireland", info: "A dark Irish dry stout." },
	{ name: "Corona", country: "Mexico", info: "A pale lager, one of the top-selling beers worldwide." },
	{ name: "Budweiser", country: "United States", info: "An American-style pale lager." },
	{ name: "Stella Artois", country: "Belgium", info: "A pilsner beer, originally brewed in Leuven." },
	{ name: "Tsingtao", country: "China", info: "A well-hopped standard lager beer." },
	{ name: "Sapporo", country: "Japan", info: "A lager that is known for its crisp taste." },
	{ name: "Victoria Bitter", country: "Australia", info: "A lager with a rich, hoppy taste and higher alcohol content." },
	{ name: "Kingfisher", country: "India", info: "A lager brewed by United Breweries Group." },
	{ name: "Quilmes", country: "Argentina", info: "A lager that is the most popular beer in Argentina." }
];

class InfoContext {
	constructor(strategy, data, element) {
		this.strategy = strategy;
		this.data = data;
		this.element = element;
	}

	setStrategy(strategy) {
		this.strategy = strategy;
	}

	show() {
		this.strategy.show(this.data, this.element);
	}

}

class ListStrategy {

	show(data, element) {
		element.innerHTML = `
			<ol>
				${data.map(item => `<li>${item.name} - ${item.country}</li>`).join('')}
			</ol>
		`;
	}

}

class ListDetailStrategy {

	show(data, element) {
		element.innerHTML = `
			<ol>
				${data.map(item => `
					<li>
						<strong>${item.name}</strong> - ${item.country}
						<p>${item.info}</p>
					</li>
				`).join('')}
			</ol>
		`;
	}

}

const strategies = [
	new ListStrategy(),
	new ListDetailStrategy()
];

const info = new InfoContext(new ListStrategy(), data, document.querySelector('.content'));
info.show();


const handleSelectChange = (event) => {
	const opt = Number(event.target.value);
	const strategy = strategies[opt];
	info.setStrategy(strategy);

	info.show();
}

