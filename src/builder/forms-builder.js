class Form {

	constructor(controls, action) {
		this.controls = controls;
		this.action = action;
	}

	getContent() {
		return `
			<form action="${this.action}" method="POST">
			${this.controls.reduce((acc, control) => (
					acc + 
					`<div class="form-item">
							${this.getLabel(control)}
							${this.getInput(control)}
					</div>`
				), '')}
				<button type="submit">Submit</button>
			</form>
		`;
	}

	getLabel(control) {
		return `<label>${control.text}</label>`;
	}

	getInput(control) {
		return `<input type="${control.type}" name="${control.name}" />`;
	}

}

class FormBuilder {

	constructor() {
		this.action = '';
		this.controls = [];
	}

	setText(name, text) {
		this.controls.push({
			name,
			text,
			type: 'text',
		});
		return this;
	}

	setCheckbox(name, text) {
		this.controls.push({
			name,
			text,
			type: 'checkbox',
		});
		return this;
	}

	setAction(action) {
		this.action = action;
		return this;
	}

	build() {
		return new Form(this.controls, this.action);
	}

}

class FormDirector {

	#formBuilder;

	constructor(builder) {
		this.setFormBuilder(builder);
	}

	setFormBuilder(builder) {
		this.#formBuilder = builder;
	}

	createPeopleForm() {
		return this.#formBuilder
		.setText('name', 'Name')
		.setText('age', 'Age')
		.setText('email', 'Email');
	}

}

const form1 = document.querySelector('.form1');
const form2 = document.querySelector('.form2');

const formBuilder = new FormBuilder();
const formDirector = new FormDirector(new FormBuilder());

const formPeople = formBuilder
	.setAction('/people')
	.setText('name', 'Name')
	.setCheckbox('isStudent', 'Is student')
	.build();

form1.innerHTML = formPeople.getContent();
form2.innerHTML = formDirector.createPeopleForm().build().getContent();