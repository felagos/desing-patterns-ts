function add() {
	const input = document.querySelector('#name');
	const name = input.value;

	itemSubject.add(name);
}

class Subject {
	constructor() {
		this.observers = [];
	}

	subscribe(observer) {
		this.observers.push(observer);
	}

	unsubscribe(observer) {
		this.observers = this.observers.filter(obs => obs !== observer);
	}

	notify(data) {
		this.observers.forEach(observer => observer.update(data));
	}
}

class ItemSubject extends Subject {
	constructor() {
		super();
		this.data = [];
	}

	add(item) {
		this.data.push(item);
		this.notify(this.data);
	}
}

class HtmlElementObserver {
	constructor(element) {
		this.element = element;
	}

	update(data) {
		this.element.innerHTML = data.reduce((acc, el) => acc + `<p>${el}</p>`, "");
	}
}

const itemSubject = new ItemSubject();
const div1Obs = new HtmlElementObserver(document.querySelector('#div1'));
const div2Obs = new HtmlElementObserver(document.querySelector('#div2'));
const div3Obs = new HtmlElementObserver(document.querySelector('#div3'));

itemSubject.subscribe(div1Obs);
	