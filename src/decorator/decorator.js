const div = document.querySelector('#productDiv')

class ProductComponent {
	constructor(name) {
		this.name = name;
	}

	getDetail() {
		return this.name;
	}

}

class ProductDecorator {
	constructor(productComponent) {
		this.productComponent = productComponent;
	}

	getDetail() {
		return this.productComponent.getDetail();
	}
}

class CommercialInfoProductDecorator extends ProductDecorator {
	constructor(productComponent, tradeName, brand) {
		super(productComponent);

		this.brand = brand;
		this.tradeName = tradeName;
	}

	getDetail() {
		return super.getDetail() + ` - ${this.tradeName} - ${this.brand}`;
	}
}


class StoreProductDecorator extends ProductDecorator {
	constructor(productComponent, price) {
		super(productComponent);
		this.price = price;
	}

	getDetail() {
		return super.getDetail() + ` - ${this.price}`;
	}
}


class HTMLProductDecorator extends ProductDecorator {
	constructor(productComponent) {
		super(productComponent);
	}

	getDetail() {
		return `<div>
			<h1>Infromación del producto</h1>
			<p>${super.getDetail()}</p>
		</div>`;
	}
}

const product = new ProductComponent('Product 1');
const productWithCommercialInfo = new CommercialInfoProductDecorator(product, 'Trade Name', 'Brand');
const storeProduct = new StoreProductDecorator(productWithCommercialInfo, 100);
const htmlProduct = new HTMLProductDecorator(storeProduct);

div.innerHTML = htmlProduct.getDetail();