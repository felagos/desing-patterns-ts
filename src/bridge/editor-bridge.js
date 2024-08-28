const inputRange = document.querySelector('#range');
const inputColor = document.querySelector('#editorColor');
const div = document.querySelector('#content');
const canvas = document.querySelector('#canvas');



class HtmlPainter {

	constructor(container) {
		this.container = container;
		this.width = "1px";
		this.height = "1px";
		this.color = "#000000"
	}

	setWidth(width) {
		this.width = `${width}px`;
	}

	setHeight(height) {
		this.height = `${height}px`;
	}

	setColor(color) {
		this.color = color;
	}

	print() {
		this.container.innerHTML = `
			<div style="width: ${this.width}; height: ${this.height}; background-color: ${this.color};">
			</div>
		`;
	}

}

class Editor {
	
	constructor(implementor) {
		this.implementor = implementor;
	}

	print(width, height, color) {
		this.implementor.setWidth(width);
		this.implementor.setHeight(height);
		this.implementor.setColor(color);
		this.implementor.print();
	}

}

class CanvasPainter {

	constructor(canvas) {
		this.canvas = canvas;
		this.ctx = canvas.getContext('2d');
		this.width = 1;
		this.height = 1;
		this.color = "#000000";
	}

	setWidth(width) {
		this.width = width;
	}

	setHeight(height) {
		this.height = height;
	}

	setColor(color) {
		this.color = color;
	}

	print() {
		this.ctx.clearRect(0, 0, this.width, this.height);
		this.ctx.fillStyle = this.color;
		this.ctx.fillRect(0, 0, this.width, this.height);
	}

}

const editor = new Editor(new HtmlPainter(div));
const canvasEditor = new Editor(new CanvasPainter(canvas));

inputRange.addEventListener('input', (event) => {
	const dimension = event.target.value;

	editor.print(dimension, dimension, inputColor.value);
	canvasEditor.print(dimension, dimension, inputColor.value);
});

inputColor.addEventListener('input', (event) => {
	const color = event.target.value;

	editor.print(inputRange.value, inputRange.value, color);
	canvasEditor.print(inputRange.value, inputRange.value, color);
});