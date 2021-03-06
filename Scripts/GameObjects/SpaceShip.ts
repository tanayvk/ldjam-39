/// <reference path="../app.ts" />

module GameObjects {
	export class SpaceShip {
		sprite: Phaser.Sprite;
		cursors;

		currentPart: GameObjects.Part;

		wrappedX: number = 0;
		wrappedY: number = 0;
		apparentX: number = 0;
		apparentY: number = 0;		

		MAX_SPEED = 500;
		BOMB_SPEED = 2000;

		constructor(x, y) {
			this.sprite = UntitledGame.game.add.sprite( x, y, "spaceship" );
			this.sprite.anchor.setTo(0.5, 0.5);

			UntitledGame.game.physics.arcade.enable(this.sprite);
			this.sprite.body.setCircle(this.sprite.width / 2);
			this.sprite.body.drag.set(200);
			this.sprite.body.maxVelocity.set(this.MAX_SPEED);
			this.sprite.body.friction.setTo( 0, 0 );

			this.cursors = UntitledGame.game.input.keyboard.createCursorKeys();

			this.handleBombs();

		}

		update() {

			if (this.cursors.up.isDown)
				UntitledGame.game.physics.arcade.accelerationFromRotation(this.sprite.rotation, 2000, this.sprite.body.acceleration);
			else if (this.cursors.down.isDown)
				UntitledGame.game.physics.arcade.accelerationFromRotation(this.sprite.rotation, -1000, this.sprite.body.acceleration);	
			else
				this.sprite.body.acceleration.set(0);

			if (this.cursors.left.isDown)
				this.sprite.body.angularVelocity = -300;
			else if (this.cursors.right.isDown)
				this.sprite.body.angularVelocity = 300;
			else
				this.sprite.body.angularVelocity = 0;

			this.apparentX = this.wrappedX + this.sprite.x;
			this.apparentY = this.wrappedY + this.sprite.y;
		}

		handleBombs() {
			var ship = this;
			UntitledGame.game.input.onDown.add(function() {
				var bomb = new GameObjects.Bomb(ship.sprite.x, ship.sprite.y, ship.BOMB_SPEED);	
				bomb.shootTowards(UntitledGame.game.input.x + UntitledGame.game.camera.x, UntitledGame.game.input.y + UntitledGame.game.camera.y);
				UntitledGame.game.world.bringToTop(ship.sprite);
			});
		}
	}
}
