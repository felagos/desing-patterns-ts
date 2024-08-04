interface Component {
	getDetail(): string;
}

class ProductComponent implements Component {

	constructor(protected name: string) { }

	getDetail(): string {
		return 'Product Detail';
	}

}

abstract class ProductDecorator implements Component {

	constructor(protected component: Component) { }

	getDetail(): string {
		return this.component.getDetail();
	}

}

class CommercialInfoProductDecorator extends ProductDecorator {

	constructor(component: Component, private tradName: string, private brand: string) {
		super(component);
	}

	getDetail(): string {
		return `${super.getDetail()} - ${this.tradName} - ${this.brand}`;
	}

}

class StoreProductDecorator extends ProductDecorator {

	constructor(component: Component, private price: number) {
		super(component);
	}

	getDetail(): string {
		return `${super.getDetail()} - ${this.price}`;
	}

}

const product = new ProductComponent('Product 1');
const commercialInfoProduct = new CommercialInfoProductDecorator(product, 'Trad Name', 'Brand');
const storeProduct = new StoreProductDecorator(commercialInfoProduct, 100);

console.log(storeProduct.getDetail()); // Product Detail - Trad Name - Brand - 100