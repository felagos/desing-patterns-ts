const input = document.querySelector('#myText');
const div2 = document.querySelector('.div2');

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

class Observer {

	constructor(fn) {
		this.fn = fn;
	}

	update(data) {
		this.fn(data);
	}
}

const subject = new Subject();
const observer1 = new Observer(data => console.log(`Observer 1 ${data}`));
const observer2 = new Observer(data => {
	div2.innerHTML = data;
});

subject.subscribe(observer1);
subject.subscribe(observer2);

function change() {
	subject.notify(input.value);
};