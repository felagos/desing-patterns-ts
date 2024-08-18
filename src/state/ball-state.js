const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
ctx.fillStyle = 'black';

class Ball {
	constructor(ctx, canvas, ballSize) {
		this.ctx = ctx;
		this.width = canvas.width;
		this.height = canvas.height;
		this.ballSize = ballSize;
		this.positionX = 0;
		this.positionY = 0;

		this.state = new RightShiftState();
	}

	setState(state) {
		this.state = state;
	}

	print() {
		this.state.print(this);
	}
}

class RightShiftState {

	print(ball) {
		ball.ctx.clearRect(0, 0, ball.width, ball.height);

		ball.ctx.fillRect(ball.positionX, ball.positionY, ball.ballSize, ball.ballSize);

		if(ball.positionX < ball.width - ball.ballSize) {
			ball.positionX += ball.ballSize;
		}
		else ball.setState(new DownShiftState());
	}

}

class DownShiftState {

	print(ball) {
		ball.ctx.clearRect(0, 0, ball.width, ball.height);

		ball.ctx.fillRect(ball.positionX, ball.positionY, ball.ballSize, ball.ballSize);

		if(ball.positionY < ball.height - ball.ballSize) {
			ball.positionY += ball.ballSize;
		}
		else ball.setState(new LeftShiftState());
	}

}

class LeftShiftState {

	print(ball) {
		ball.ctx.clearRect(0, 0, ball.width, ball.height);

		ball.ctx.fillRect(ball.positionX, ball.positionY, ball.ballSize, ball.ballSize);

		if(ball.positionX > 0) {
			ball.positionX -= ball.ballSize;
		}
		else ball.setState(new UpShiftState());
	}

}

class UpShiftState {

	print(ball) {
		ball.ctx.clearRect(0, 0, ball.width, ball.height);

		ball.ctx.fillRect(ball.positionX, ball.positionY, ball.ballSize, ball.ballSize);

		if(ball.positionY > 0) {
			ball.positionY -= ball.ballSize;
		}
		else ball.setState(new RightShiftState());
	}

}

const ball = new Ball(ctx, canvas, 10);

setInterval(() => {
	ball.print();
}, 100);