interface ListImplementor {
	elements: number[];

	add(number: number): void;
	getElements(): number[];
}

interface DataAbstraction {
	listImplementor: ListImplementor;
	add(number: number): void;
	get(): number[];
	operation(fn: (n: number) => number): number[];
}

class SortedList implements ListImplementor {
	elements: number[] = [];

	add(number: number): void {
		this.elements.push(number);
		this.elements.sort((a, b) => a - b);
	}

	getElements(): number[] {
		return this.elements;
	}
}

class UniqueList implements ListImplementor {
	elements: number[] = [];

	add(number: number): void {
		if (!this.elements.includes(number)) {
			this.elements.push(number);
		}
	}

	getElements(): number[] {
		return this.elements;
	}
}

class DataRefinedAbstraction implements DataAbstraction {
	listImplementor: ListImplementor;

	constructor(listImplementor: ListImplementor) {
		this.listImplementor = listImplementor;
	}

	add(number: number): void {
		this.listImplementor.add(number);
	}

	get(): number[] {
		return this.listImplementor.getElements();
	}

	operation(fn: (n: number) => number): number[] {
		return this.listImplementor.getElements().map(fn);
	}

}

const uniqueData = new DataRefinedAbstraction(new UniqueList());
const sortedData = new DataRefinedAbstraction(new SortedList());

uniqueData.add(1);
uniqueData.add(2);
uniqueData.add(1);

sortedData.add(2);
sortedData.add(1);
sortedData.add(1);
sortedData.add(3);

const uniqueItems = uniqueData.operation((n) => n * 2);

console.log(uniqueData.get());
console.log(sortedData.get());
console.log(uniqueItems);