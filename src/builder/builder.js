class Person {

	constructor(name, lastName, age, city) {
		this.name = name;
		this.lastName = lastName;
		this.age = age;
		this.city = city;
	}

}

class PersonBuilder {
	constructor() {
		this.reset();
	}

	reset() {
		this.name = '';
		this.lastName = '';
		this.age = 0;
		this.city = '';
	}

	setName(name) {
		this.name = name;
		return this;
	}

	setLastName(lastName) {
		this.lastName = lastName;
		return this;
	}

	setAge(age) {
		this.age = age;
		return this;
	}

	setCity(city) {
		this.city = city;
		return this;
	}

	build() {
		return new Person(this.name, this.lastName, this.age, this.city);
	}
}