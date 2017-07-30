var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var GameRooms;
(function (GameRooms) {
    var Boot = (function (_super) {
        __extends(Boot, _super);
        function Boot() {
            return _super.call(this) || this;
        }
        Boot.prototype.preload = function () {
            this.game.load.image("loaderBar", "Assets/images/loader_bar.png");
        };
        Boot.prototype.create = function () {
            this.game.stage.backgroundColor = "#000";
            this.game.stage.disableVisibilityChange = true; // doesn't pause the game on changing focus
            this.game.physics.startSystem(Phaser.Physics.ARCADE);
            this.game.state.start("loader");
        };
        return Boot;
    }(Phaser.State));
    GameRooms.Boot = Boot;
})(GameRooms || (GameRooms = {}));
var GameRooms;
(function (GameRooms) {
    var Loader = (function (_super) {
        __extends(Loader, _super);
        function Loader() {
            return _super.call(this) || this;
        }
        Loader.prototype.init = function () {
        };
        Loader.prototype.preload = function () {
            var loaderBar = this.game.add.sprite(this.game.world.centerX - 128, this.game.world.centerY + 256, "loaderBar");
            this.game.load.setPreloadSprite(loaderBar);
            this.game.load.image("spaceship", "Assets/Images/spaceship.png");
            this.game.load.image("bomb", "Assets/Images/bomb.png");
        };
        Loader.prototype.create = function () {
            this.game.state.start("main-menu");
        };
        return Loader;
    }(Phaser.State));
    GameRooms.Loader = Loader;
})(GameRooms || (GameRooms = {}));
var GameRooms;
(function (GameRooms) {
    var MainMenu = (function (_super) {
        __extends(MainMenu, _super);
        function MainMenu() {
            return _super.call(this) || this;
        }
        MainMenu.prototype.preload = function () {
        };
        MainMenu.prototype.create = function () {
            UI.ui.mainMenu.show();
        };
        MainMenu.prototype.shutdown = function () {
            UI.ui.mainMenu.hide();
        };
        return MainMenu;
    }(Phaser.State));
    GameRooms.MainMenu = MainMenu;
})(GameRooms || (GameRooms = {}));
var GameObjects;
(function (GameObjects) {
    var ProgressBar = (function () {
        function ProgressBar(x, y, width, height, percent) {
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
            this.percent = percent;
            this.text = "";
            this.showText = true;
            this.backgroundColor = "#ffffff";
            this.foregroundColor = "#ffff00";
            this.textColor = "#ffffff";
            this.fixedCamera = true;
        }
        ProgressBar.prototype.setColors = function (backgroundColor, foregroundColor, textColor) {
            this.backgroundColor = backgroundColor;
            this.foregroundColor = foregroundColor;
            this.textColor = textColor;
        };
        ProgressBar.prototype.setString = function (text) {
            this.text = text;
        };
        ProgressBar.prototype.getWidth = function () {
            return ((this.percent / 100) * this.width);
        };
        ProgressBar.prototype.draw = function () {
            if (this.fixedCamera) {
                var cameraX = UntitledGame.game.camera.x;
                var cameraY = UntitledGame.game.camera.y;
                this.backRect = new Phaser.Rectangle(cameraX + this.x, cameraY + this.y, this.width, this.height);
                this.frontRect = new Phaser.Rectangle(cameraX + this.x, cameraY + this.y, this.getWidth(), this.height);
            }
            else {
                this.backRect = new Phaser.Rectangle(this.x, this.y, this.width, this.height);
                this.frontRect = new Phaser.Rectangle(this.x, this.y, this.getWidth(), this.height);
            }
            UntitledGame.game.debug.geom(this.backRect, this.backgroundColor);
            UntitledGame.game.debug.geom(this.frontRect, this.foregroundColor);
            if (this.showText)
                UntitledGame.game.debug.text(this.text, this.x, this.y - 10, this.textColor);
        };
        return ProgressBar;
    }());
    GameObjects.ProgressBar = ProgressBar;
})(GameObjects || (GameObjects = {}));
/// <reference path="../app.ts" />
var GameObjects;
(function (GameObjects) {
    var SpaceShip = (function () {
        function SpaceShip(x, y) {
            this.MAX_SPEED = 300;
            this.BOMB_SPEED = 3000;
            this.sprite = UntitledGame.game.add.sprite(x, y, "spaceship");
            this.sprite.tint = 0x7021FF;
            this.sprite.anchor.setTo(0.5, 0.5);
            UntitledGame.game.physics.arcade.enable(this.sprite);
            this.sprite.body.drag.set(100);
            this.sprite.body.maxVelocity.set(this.MAX_SPEED);
            this.cursors = UntitledGame.game.input.keyboard.createCursorKeys();
            this.handleBombs();
        }
        SpaceShip.prototype.update = function () {
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
        };
        SpaceShip.prototype.handleBombs = function () {
            var ship = this;
            UntitledGame.game.input.onDown.add(function () {
                var bomb = new GameObjects.Bomb(ship.sprite.x, ship.sprite.y, ship.BOMB_SPEED);
                bomb.shootTowards(UntitledGame.game.input.x, UntitledGame.game.input.y);
                bomb.tweenTint(0xFF8925, 0x3EFF46, 1000); // a shade of orage to a shade of lime
            });
        };
        return SpaceShip;
    }());
    GameObjects.SpaceShip = SpaceShip;
})(GameObjects || (GameObjects = {}));
/// <reference path="../GameObjects/ProgressBar.ts" />
/// <reference path="../GameObjects/SpaceShip.ts" />
var GameRooms;
(function (GameRooms) {
    var MainRoom = (function (_super) {
        __extends(MainRoom, _super);
        function MainRoom() {
            return _super.call(this) || this;
        }
        MainRoom.prototype.create = function () {
            // Show the menu
            UI.ui.roomMenu.show();
            this.spaceShip = new GameObjects.SpaceShip(400, 400);
            UntitledGame.game.camera.follow(this.spaceShip.sprite);
        };
        MainRoom.prototype.update = function () {
            this.spaceShip.update();
        };
        MainRoom.prototype.shutdown = function () {
            UI.ui.roomMenu.hide();
        };
        return MainRoom;
    }(Phaser.State));
    GameRooms.MainRoom = MainRoom;
})(GameRooms || (GameRooms = {}));
var GameRooms;
(function (GameRooms) {
    var GameOver = (function (_super) {
        __extends(GameOver, _super);
        function GameOver(hasWon) {
            return _super.call(this) || this;
        }
        GameOver.prototype.init = function (hasWon) {
            this.hasWon = hasWon;
            this.game.add.sprite(0, 0, "game-over");
        };
        GameOver.prototype.preload = function () {
        };
        GameOver.prototype.create = function () {
        };
        return GameOver;
    }(Phaser.State));
    GameRooms.GameOver = GameOver;
})(GameRooms || (GameRooms = {}));
/// <reference path="3rdParty/phaser.d.ts" />
/// <reference path="GameRooms/Boot.ts" />
/// <reference path="GameRooms/Loader.ts" />
/// <reference path="GameRooms/MainMenu.ts" />
/// <reference path="GameRooms/MainRoom.ts" />
/// <reference path="GameRooms/GameOver.ts" />
var UntitledGame;
(function (UntitledGame) {
    UntitledGame.tint = 0x234252;
    var Game = (function () {
        function Game() {
            UntitledGame.game = new Phaser.Game(900, 900, Phaser.CANVAS, 'game', {
                create: this.create
            });
        }
        Game.prototype.create = function () {
            UntitledGame.game.state.add("boot", GameRooms.Boot);
            UntitledGame.game.state.add("loader", GameRooms.Loader);
            UntitledGame.game.state.add("main-menu", GameRooms.MainMenu);
            UntitledGame.game.state.add("main-room", GameRooms.MainRoom);
            UntitledGame.game.state.add("game-over", GameRooms.GameOver);
            UntitledGame.game.state.start("boot");
            UntitledGame.game.canvas.oncontextmenu = function (e) { e.preventDefault(); };
        };
        return Game;
    }());
    UntitledGame.Game = Game;
})(UntitledGame || (UntitledGame = {}));
window.onload = function () {
    new UntitledGame.Game();
    UI.ui = new UI.UI();
};
/// <reference path="../app.ts"/>
var GameObjects;
(function (GameObjects) {
    var Bomb = (function () {
        function Bomb(x, y, initialSpeed) {
            this.speed = initialSpeed;
            this.sprite = UntitledGame.game.add.sprite(x, y, "bomb");
            UntitledGame.game.physics.arcade.enable(this.sprite);
            this.sprite.anchor.setTo(0.5, 0.5);
            this.sprite.update = function () {
                this.body.acceleration.setTo(-5 * this.body.velocity.x ^ 3, -5 * this.body.velocity.y ^ 3);
            };
        }
        Bomb.prototype.shootTowards = function (x, y) {
            var deltaX = x - this.sprite.body.x;
            var deltaY = y - this.sprite.body.y;
            var velocity = new Phaser.Point(deltaX, deltaY).normalize().multiply(this.speed, this.speed);
            this.sprite.body.velocity.setTo(velocity.x, velocity.y);
        };
        Bomb.prototype.tweenTint = function (startColor, endColor, time) {
            var obj = this.sprite;
            var colorBlend = { step: 0 };
            var colorTween = UntitledGame.game.add.tween(colorBlend).to({ step: 100 }, time);
            colorTween.onUpdateCallback(function () {
                obj.tint = Phaser.Color.interpolateColor(startColor, endColor, 100, colorBlend.step);
            });
            obj.tint = startColor;
            colorTween.start();
        };
        return Bomb;
    }());
    GameObjects.Bomb = Bomb;
})(GameObjects || (GameObjects = {}));
/// <reference path="app.ts" />
var UI;
(function (UI_1) {
    var UI = (function () {
        function UI() {
            this.mainMenu = new MainMenu();
            this.roomMenu = new RoomMenu();
            this.mouseEvents();
        }
        UI.prototype.mouseEvents = function () {
            var ui = this;
            document.onmousedown = function (e) {
                if (e.which == 1)
                    ui.mouseLeftDown = true;
            };
            document.onmouseup = function (e) {
                if (e.which == 1)
                    ui.mouseLeftDown = false;
            };
        };
        return UI;
    }());
    UI_1.UI = UI;
    var Menu = (function () {
        function Menu() {
        }
        Menu.prototype.show = function () { };
        Menu.prototype.hide = function () { };
        return Menu;
    }());
    // Menus
    var MainMenu = (function (_super) {
        __extends(MainMenu, _super);
        function MainMenu() {
            var _this = _super.call(this) || this;
            _this.menu = document.getElementById("mainMenu");
            var startGame = document.getElementById("startGameButton");
            startGame.onclick = function () {
                UntitledGame.game.state.start("main-room");
            };
            _this.hide();
            return _this;
        }
        MainMenu.prototype.show = function () {
            this.menu.style.display = "block";
        };
        MainMenu.prototype.hide = function () {
            this.menu.style.display = "none";
        };
        return MainMenu;
    }(Menu));
    var RoomMenu = (function (_super) {
        __extends(RoomMenu, _super);
        function RoomMenu() {
            var _this = _super.call(this) || this;
            _this.pauseButton = document.getElementById("pauseButton");
            _this.pauseMenu = document.getElementById("pauseMenu");
            _this.pauseOverlay = document.getElementById("pauseOverlay");
            _this.continueButton = document.getElementById("continueButton");
            _this.backButton = document.getElementById("backButton");
            _this.pauseButton.onclick = function () {
                _this.pauseGame();
            };
            _this.continueButton.onclick = function () {
                _this.unpauseGame();
            };
            _this.backButton.onclick = function () {
                UntitledGame.game.paused = false;
                UntitledGame.game.state.start("main-menu");
            };
            _this.pauseOverlay.style.display = "none";
            _this.pauseMenu.style.display = "none";
            _this.hide();
            return _this;
        }
        RoomMenu.prototype.show = function () {
            this.pauseButton.style.display = "block";
        };
        RoomMenu.prototype.hide = function () {
            this.unpauseGame();
            this.pauseButton.style.display = "none";
        };
        RoomMenu.prototype.pauseGame = function () {
            UntitledGame.game.paused = true;
            this.pauseMenu.style.display = "block";
            this.pauseOverlay.style.display = "block";
            this.pauseButton.classList.add("button-no-hover");
            this.pauseButton.classList.remove("button");
        };
        RoomMenu.prototype.unpauseGame = function () {
            UntitledGame.game.paused = false;
            this.pauseMenu.style.display = "none";
            this.pauseOverlay.style.display = "none";
            this.pauseButton.classList.add("button");
            this.pauseButton.classList.remove("button-no-hover");
        };
        return RoomMenu;
    }(Menu));
})(UI || (UI = {}));
