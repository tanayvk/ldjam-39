/// <reference path="../app.ts" />

module GameObjects {
	export class SpaceShip {
		health: number;
		progressBar;

		sprite: Phaser.Sprite;
		SPEED: number;

		isMoving: boolean;

		constructor(x, y) {
			this.sprite = UntitledGame.game.add.sprite( x, y, "spaceship" );
			this.sprite.anchor.setTo(0.5, 0.5);
			this.SPEED = 300;

			UntitledGame.game.physics.arcade.enable(this.sprite);
		}

		Move() {
			this.isMoving = true;
			UntitledGame.game.physics.arcade.moveToPointer(this.sprite, this.getSpeed()*UntitledGame.game.time.physicsElapsed);
		}

		Stop() {
			this.isMoving = false;
			this.sprite.body.velocity.x = 0;
			this.sprite.body.velocity.y = 0;
		}

		update() {
			if(UI.ui.mouseDown) {
				this.Move();
			}
			else {
				this.Stop();
			}
		}

		render() {
			this.renderHealth();
		}

		renderHealth() {
			this.progressBar.percent = this.health;
			this.progressBar.draw();
		}

		getSpeed():number {
			var speed: number;

			var mouseX = UntitledGame.game.input.mousePointer.x;
			var mouseY = UntitledGame.game.input.mousePointer.y;
			var distance = Phaser.Math.distance(this.sprite.x, this.sprite.y, UntitledGame.game.camera.x + mouseX, UntitledGame.game.camera.y + mouseY);
			
			return distance*this.SPEED;
		}
	}
}
