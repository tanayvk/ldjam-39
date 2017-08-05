/// <reference path="../app.ts"/>

module GameObjects {
	export class Bomb {

		sprite: Phaser.Sprite;
		speed: number;
		velocity: Phaser.Point;
		angle: number;

		constructor( x: number, y: number, initialSpeed: number) {
			this.speed = initialSpeed;
			this.sprite = UntitledGame.game.add.sprite(x, y, "bomb");
			UntitledGame.game.physics.arcade.enable(this.sprite);
			this.sprite.anchor.setTo(0.5, 0.5);

			this.sprite.update = function() {
				this.body.acceleration.setTo(-5 * this.body.velocity.x^3, -5 * this.body.velocity.y^3);
				UntitledGame.game.world.wrap(this, 0, true);
			};
		}

		shootTowards( x: number, y: number ) {
			var deltaX = x - this.sprite.body.x;
			var deltaY = y - this.sprite.body.y;
			var velocity = new Phaser.Point(deltaX, deltaY).normalize().multiply(this.speed, this.speed);
			this.sprite.body.velocity.setTo(velocity.x, velocity.y);
		}

		explode() {
			this.sprite.destroy();
		}

		tweenTint(startColor, endColor, time) { 
			var obj = this.sprite;
			
			var colorBlend = {step: 0};
			var colorTween = UntitledGame.game.add.tween(colorBlend).to({step: 100}, time);
			colorTween.onUpdateCallback(function() {
				obj.tint = Phaser.Color.interpolateColor(startColor, endColor, 100, colorBlend.step);
			});
			obj.tint = startColor;
			colorTween.start();
		}
	}
}
