class Ticket {
	private state: State;
	quantity: number;
	readonly limit: number;
	private position: number;

	constructor(limit: number) {
		this.limit = limit;
		this.position = 0;
		this.quantity = 0;
		this.state = new EmptyState();
	}

	set setState(state: State) {
		this.state = state;
	}

	get getState() {
		return this.state;
	}

	get getPosition(): number {
		return this.position++;
	}

	next(): number | null {
		return this.state.next(this);
	}

	add(quantity: number): void {
		if(quantity < this.limit) {
			this.state.add(this, quantity);
		}
	}

}

interface State {

	next(ticket: Ticket): number | null;
	add(ticket: Ticket, quantity: number): void;

}

class EmptyState implements State {
	
	next(ticket: Ticket): number | null {
		return null;
	}

	add(ticket: Ticket, quantity: number): void {
		if(quantity < ticket.limit) {
			ticket.quantity = quantity;
			ticket.setState = new WithDataSate();
		}
		else if(quantity === ticket.limit) {
			ticket.quantity = quantity;
			ticket.setState = new FullState();
		}
	}

}

class WithDataSate implements State {

	next(ticket: Ticket): number {
		ticket.quantity--;
		if(ticket.quantity <= 0) {
			ticket.setState = new EmptyState();
		}
		return ticket.getPosition;
	}

	add(ticket: Ticket, quantity: number): void {
		if(ticket.quantity + quantity < ticket.limit) {
			ticket.quantity += quantity;
			ticket.setState = new WithDataSate();
		}
		else if(ticket.quantity + quantity === ticket.limit) {
			ticket.quantity += quantity;
			ticket.setState = new FullState();
		}
	}
}

class FullState implements State {

	next(ticket: Ticket): number | null {
		ticket.quantity--;

		const newState = ticket.quantity <= 0 ? new EmptyState() : new WithDataSate();
		ticket.setState = newState;

		return ticket.getPosition;
	}

	add(ticket: Ticket, quantity: number): void {
		console.log("Ticket is full. No changes allowed.");
	}
}

const ticket = new Ticket(5);
console.log('state: ', ticket.getState);
console.log('next value', ticket.next());

console.log('-----------------');
ticket.add(6);
console.log('state: ', ticket.getState);
console.log('next value', ticket.next());

console.log('-----------------');
ticket.add(4);
console.log('state: ', ticket.getState);
console.log('next value', ticket.next());
console.log('next value', ticket.next());
console.log('state: ', ticket.getState);