class EncodeTextAbstraction {

	constructor(encoder) {
		this.encoder = encoder;
	}

	encode(text) {
		return this.encoder.encode(text);
	}

	decode(text) {
		return this.encoder.decode(text);
	}

}

class Base64Encoder {

	encode(text) {
		return btoa(encodeURIComponent(text));
	}

	decode(text) {
		return decodeURIComponent(atob(text));
	}

}

class HTMLEncoder {
	
	encode(text) {
		return text.split('.').reduce((acc, word) => {
			return acc + `<p>${word.trim()}</p>`;
		}, '');
	}

	decode(text) {
		return text.split('</p>').reduce((acc, word) => {
			return acc + word.replace('<p>', '').trim() + ' ';
		}, '');
	}
}

const encoder64 = new EncodeTextAbstraction(new Base64Encoder());
console.log(encoder64.encode('Hello World!'));

const encoderHTML = new EncodeTextAbstraction(new HTMLEncoder());
console.log(encoderHTML.encode('Hello World!'));
console.log(encoderHTML.decode('<p>Hello</p><p>World!</p>'));