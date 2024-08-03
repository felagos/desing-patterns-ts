interface IObserver<T> {
	notify(value: T): void;
}

interface ISubject<T> {
	subscribe(observer: IObserver<T>): void;
	unsubscribe(observer: IObserver<T>): void;
}

class Subject<T> implements ISubject<T> {
	private observers: IObserver<T>[] = [];

	subscribe(observer: IObserver<T>): void {
		this.observers.push(observer);
	}

	unsubscribe(observer: IObserver<T>): void {
		this.observers = this.observers.filter(obs => obs !== observer);
	}

	notify(value: T): void {
		this.observers.forEach(observer => observer.notify(value));
	}
	
}

class Observer<T> implements IObserver<T> {
	private fn: (value: T) => void;

	constructor(fn: (value: T) => void) {
		this.fn = fn;
	}

	notify(value: T): void {
		this.fn(value);
	}

}

const subject = new Subject<number>();
const observer = new Observer<number>(value => console.log(`Value is ${value}`));

subject.subscribe(observer);
subject.notify(1);

const subjectStr = new Subject<string>();
const obsStr = new Observer<string>(value => console.log(`Value in uppercase ${value.toUpperCase()}`));

subjectStr.subscribe(obsStr);
subjectStr.notify('hello');