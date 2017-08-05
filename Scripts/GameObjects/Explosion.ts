/// <reference path="../app.ts" />

module GameObjects {

    export class Explosion {
        sprite: Phaser.Sprite;

        scaleTween: Phaser.Tween;
        alphaTween: Phaser.Tween;

        constructor(x, y) {
            this.sprite = UntitledGame.game.add.sprite( x, y, "explosion" );
            this.sprite.anchor.setTo( 0.5, 0.5 );
            
            this.sprite.scale.setTo(0, 0);
            this.sprite.alpha = 1;

            UntitledGame.game.physics.arcade.enable(this.sprite);

            UntitledGame.game.add.tween(this.sprite).to( { alpha: 0 }, 150, Phaser.Easing.Exponential.In, true);
            UntitledGame.game.add.tween(this.sprite.scale).to( { x: 1, y: 1 }, 150, Phaser.Easing.Linear.None, true);
            UntitledGame.game.add.tween(this.sprite.body).to( { width: 256, height: 256 }, 150, Phaser.Easing.Linear.None, true);

            UntitledGame.game.time.events.add(150, this.destroy, this);

            this.sprite.update = function() {
                this.body.width = this.width;
                this.body.height = this.height;
                GameObjects.enemies.forEach(enemy => {
                    if (enemy)
                        UntitledGame.game.physics.arcade.overlap(this, enemy.sprite, function() {
                            enemy.health -= 20;
                        });
                });
            };

        }

        destroy() {
            this.sprite.destroy();
        }
    }

}