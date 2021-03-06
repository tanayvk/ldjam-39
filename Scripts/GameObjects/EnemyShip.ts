/// <reference path="../app.ts" />

module GameObjects {
	export class EnemyShip {
        sprite: Phaser.Sprite;
        
        wrappedX: number = 0;
        wrappedY: number = 0;
        apparentX: number = 0;
        apparentY: number = 0;

        MAX_SPEED = 500;

        health: number;
        healthBar: GameObjects.ProgressBar;

		constructor(x, y) {
			this.sprite = UntitledGame.game.add.sprite( x, y, "enemyship" );
            this.sprite.anchor.setTo(0.5, 0.5);

            UntitledGame.game.physics.arcade.enable(this.sprite);
            this.sprite.body.setCircle(this.sprite.width / 2);

            var enemyShip = this;
			this.sprite.update = function() {

                enemyShip.apparentX = enemyShip.wrappedX + enemyShip.sprite.body.x;
                enemyShip.apparentY = enemyShip.wrappedY + enemyShip.sprite.body.y;

                var deltaX = GameObjects.spaceShip.apparentX - enemyShip.apparentX;
                var deltaY = GameObjects.spaceShip.apparentY - enemyShip.apparentY;
                var acceleration = new Phaser.Point(deltaX, deltaY).normalize().multiply(1000, 1000);
                this.body.acceleration.setTo(acceleration.x, acceleration.y);

                this.angle = Math.atan2(this.body.velocity.y, this.body.velocity.x) * 180 / Math.PI;

                if (GameObjects.worldGenerator.spriteGetPart(this).equals(GameObjects.worldGenerator.spriteGetPart(GameObjects.spaceShip.sprite)))
                    UntitledGame.game.physics.arcade.collide(this, GameObjects.spaceShip.sprite);
            
            };

			this.sprite.body.drag.set(100);
            this.sprite.body.maxVelocity.set(this.MAX_SPEED);
            // this.sprite.body.bounce.set(3);


            this.health = 100;
            this.healthBar = new GameObjects.ProgressBar(0, 0, 150, 150, 100);
            this.healthBar.fixedCamera = false;
            this.healthBar.setColors("#7F2818", "#FF6247", "#000000");
		}

		renderHealth() {
			this.healthBar.x = this.sprite.x - 30;
			this.healthBar.y = this.sprite.y - 50;
			this.healthBar.width = 60;
			this.healthBar.height = 10;

            this.healthBar.percent = this.health;
			this.healthBar.draw();
        }
        
        kill() {
            this.sprite.destroy();
        }

	}
}
