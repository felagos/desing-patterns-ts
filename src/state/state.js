class DocumentContext {
	constructor() {
		this.content = "";
		this.state = new BlankState();
	}

	setState(state) {
		this.state = state;
	}

	write(text) {
		this.state.write(this, text);
	}

}

class BlankState {
	write(documentContext, text) {
		documentContext.content = text;
		documentContext.setState(new WithContentState());
	}
}

class WithContentState {
	write(documentContext, text) {
		documentContext.content += " " + text;
	}
}

class ApprovedState {
	write(documentContext, text) {
		console.log("Document is approved. No changes allowed.");
	}
}

const dc = new DocumentContext();
console.log(dc.state);

dc.write("Hello");

console.log(dc.content);
console.log(dc.state);

dc.write("World");
dc.write("!");

console.log(dc.content);

dc.setState(new ApprovedState());
dc.write("Goodbye");

dc.setState(new WithContentState());
dc.write("Goodbye");
console.log(dc.content);