interface IStrategy {
	execute(amount: number): number;
}

class RegularStrategy implements IStrategy {

	constructor(private tax: number) {}	
	
	execute(amount: number): number {
		return amount + (amount * this.tax);
	}
}

class DiscountStrategy implements IStrategy {
	
	constructor(private discount: number, private tax: number) {}

	execute(amount: number): number {
		return amount  + (amount * this.tax) - this.discount;
	}

}

class SaleContext {

	constructor(private strategy: IStrategy) {}

	calculate(amount: number) {
		return this.strategy.execute(amount);
	}

	setStrategy(strategy: IStrategy) {
		this.strategy = strategy;
	}

}

const sale = new SaleContext(new RegularStrategy(0.1));
console.log(`regular strategy: ${sale.calculate(100)}`);

sale.setStrategy(new DiscountStrategy(10, 0.1));
console.log(`discount strategy: ${sale.calculate(100)}`);



