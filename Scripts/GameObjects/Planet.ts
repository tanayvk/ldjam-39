/// <reference path="../app.ts" />

module GameObjects {
    export class Planet {
        sprite: Phaser.Sprite;

        constructor(x: number, y: number) {
            this.sprite = UntitledGame.game.add.sprite( x, y, "planet" );
            UntitledGame.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
            this.sprite.body.moves = false;
            this.sprite.update = GameObjects.Planet.update;

        }

        static update() {
            UntitledGame.game.physics.arcade.collide(this, GameObjects.spaceShip.sprite);
            GameObjects.enemies.forEach(enemy => {
                UntitledGame.game.physics.arcade.collide(this, enemy.sprite);
            });
        }
    }
}