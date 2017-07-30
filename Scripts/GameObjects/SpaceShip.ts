/// <reference path="../app.ts" />

module GameObjects {
	export class SpaceShip {
		sprite: Phaser.Sprite;
		cursors;

		MAX_SPEED = 300;
		BOMB_SPEED = 3000;

		constructor(x, y) {
			this.sprite = UntitledGame.game.add.sprite( x, y, "spaceship" );
			this.sprite.tint = 0x7021FF;
			this.sprite.anchor.setTo(0.5, 0.5);

			UntitledGame.game.physics.arcade.enable(this.sprite);
			
			this.sprite.body.drag.set(100);
			this.sprite.body.maxVelocity.set(this.MAX_SPEED);

			this.cursors = UntitledGame.game.input.keyboard.createCursorKeys();

			this.handleBombs();
		}

		update() {

			if (this.cursors.up.isDown)
				UntitledGame.game.physics.arcade.accelerationFromRotation(this.sprite.rotation, 2000, this.sprite.body.acceleration);
			else if (this.cursors.down.isDown)
				UntitledGame.game.physics.arcade.accelerationFromRotation(this.sprite.rotation, -200, this.sprite.body.acceleration);	
			else
				this.sprite.body.acceleration.set(0);

			if (this.cursors.left.isDown)
				this.sprite.body.angularVelocity = -300;
			else if (this.cursors.right.isDown)
				this.sprite.body.angularVelocity = 300;
			else
				this.sprite.body.angularVelocity = 0;
		}

		handleBombs() {
			var ship = this;
			UntitledGame.game.input.onDown.add(function() {
				var bomb = new GameObjects.Bomb(ship.sprite.x, ship.sprite.y, ship.BOMB_SPEED);
				
				bomb.shootTowards(UntitledGame.game.input.x, UntitledGame.game.input.y);


				bomb.tweenTint(0xFF8925, 0x3EFF46, 1000); // a shade of orage to a shade of lime
			});
		}
	}
}
