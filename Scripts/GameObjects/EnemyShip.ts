/// <reference path="../app.ts" />

module GameObjects {
	export class EnemyShip {
        sprite: Phaser.Sprite;
        
        wrappedX: number = 0;
        wrappedY: number = 0;
        apparentX: number = 0;
        apparentY: number = 0;


        MAX_SPEED = 500;

		constructor(x, y) {
			this.sprite = UntitledGame.game.add.sprite( x, y, "enemyship" );
			this.sprite.tint = 0x1f23a4;
			this.sprite.anchor.setTo(0.5, 0.5);

            UntitledGame.game.physics.arcade.enable(this.sprite);
            

            GameObjects.enemyShip = this;
			this.sprite.update = function() {

                enemyShip.apparentX = enemyShip.wrappedX + enemyShip.sprite.body.x;
                enemyShip.apparentY = enemyShip.wrappedY + enemyShip.sprite.body.y;

                var deltaX = GameObjects.spaceShip.apparentX - GameObjects.enemyShip.apparentX;
                var deltaY = GameObjects.spaceShip.apparentY - GameObjects.enemyShip.apparentY;
                var velocity = new Phaser.Point(deltaX, deltaY).normalize().multiply(1000, 1000);
                this.body.acceleration.setTo(velocity.x, velocity.y);

                UntitledGame.game.physics.arcade.collide(this, GameObjects.spaceShip.sprite);
            };
			this.sprite.body.drag.set(100);
			this.sprite.body.maxVelocity.set(this.MAX_SPEED);
		}

		update() {
        }

	}
}
