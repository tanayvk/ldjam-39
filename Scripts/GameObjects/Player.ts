module GameObjects {
	export class Player {
		health: number;
		progressBar;

		sprite: Phaser.Sprite;
		SPEED: number;

		isMoving: boolean;

		constructor(x, y) {
			this.sprite = UntitledGame.game.add.sprite(x, y, "player");
			this.sprite.anchor.setTo(0.5, 0.5);
			this.SPEED = 400;
			UntitledGame.game.physics.arcade.enable(this.sprite);

			this.health = 100;
			this.progressBar = new GameObjects.ProgressBar(UntitledGame.game.width - 200, 50, 150, 30, this.health);
			this.progressBar.setColors("#ff1111", "#11ff11");
		}

		Move() {
			this.isMoving = true;
			UntitledGame.game.physics.arcade.moveToPointer(this.sprite, this.SPEED);
		}

		Stop() {
			this.isMoving = false;
			this.sprite.body.velocity.x = 0;
			this.sprite.body.velocity.y = 0;
		}

		isNearPointer() {
			var mouseX = UntitledGame.game.input.mousePointer.x;
			var mouseY = UntitledGame.game.input.mousePointer.y;

			if(Phaser.Math.distance(this.sprite.x, this.sprite.y, UntitledGame.game.camera.x + mouseX, UntitledGame.game.camera.y + mouseY) <= 50){
				return true;
			}

			return false;
		}

		update() {
			if(UntitledGame.game.input.mousePointer.isDown && !this.isNearPointer()) {
				this.Move();
			}
			else {
				this.Stop();
			}

			if(this.health <= 0) {
				this.gameOver();
			}
		}

		render() {
			this.renderHealth();
		}

		renderHealth() {
			this.progressBar.percent = this.health;
			this.progressBar.draw();
		}

		gameOver() {
			UntitledGame.game.state.start("game-over", true, false, false);
		}
	}
}
