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
var GameObjects;
(function (GameObjects) {
    var Player = (function () {
        function Player(x, y) {
            this.sprite = UntitledGame.game.add.sprite(x, y, "player");
            this.sprite.anchor.setTo(0.5, 0.5);
            this.SPEED = 400;
            UntitledGame.game.physics.arcade.enable(this.sprite);
            this.health = 100;
            this.progressBar = new GameObjects.ProgressBar(UntitledGame.game.width - 200, 50, 150, 30, this.health);
            this.progressBar.setColors("#ff1111", "#11ff11");
        }
        Player.prototype.Move = function () {
            this.isMoving = true;
            UntitledGame.game.physics.arcade.moveToPointer(this.sprite, this.SPEED);
        };
        Player.prototype.Stop = function () {
            this.isMoving = false;
            this.sprite.body.velocity.x = 0;
            this.sprite.body.velocity.y = 0;
        };
        Player.prototype.isNearPointer = function () {
            var mouseX = UntitledGame.game.input.mousePointer.x;
            var mouseY = UntitledGame.game.input.mousePointer.y;
            if (Phaser.Math.distance(this.sprite.x, this.sprite.y, UntitledGame.game.camera.x + mouseX, UntitledGame.game.camera.y + mouseY) <= 50) {
                return true;
            }
            return false;
        };
        Player.prototype.update = function () {
            if (UntitledGame.game.input.mousePointer.isDown && !this.isNearPointer()) {
                this.Move();
            }
            else {
                this.Stop();
            }
            if (this.health <= 0) {
                this.gameOver();
            }
        };
        Player.prototype.render = function () {
            this.renderHealth();
        };
        Player.prototype.renderHealth = function () {
            this.progressBar.percent = this.health;
            this.progressBar.draw();
        };
        Player.prototype.gameOver = function () {
            UntitledGame.game.state.start("game-over", true, false, false);
        };
        return Player;
    }());
    GameObjects.Player = Player;
})(GameObjects || (GameObjects = {}));
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
var GameRooms;
(function (GameRooms) {
    var Boot = (function (_super) {
        __extends(Boot, _super);
        function Boot() {
            return _super.call(this) || this;
        }
        Boot.prototype.preload = function () {
            // Load resources for the loader state
            //this.game.load.image("loaderBar", "Assets/images/loader_bar.png");
        };
        Boot.prototype.create = function () {
            this.game.stage.backgroundColor = "#000";
            this.game.stage.disableVisibilityChange = true;
            this.game.physics.startSystem(Phaser.Physics.ARCADE);
            this.game.time.advancedTiming = true;
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
            // var loaderBar = this.game.add.sprite(this.game.world.centerX - 128, this.game.world.centerY + 256, "loaderBar");
            // this.game.load.setPreloadSprite(loaderBar);
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
/// <reference path="../GameObjects/ProgressBar.ts" />
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
        };
        MainRoom.prototype.update = function () {
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
    var Game = (function () {
        function Game() {
            UntitledGame.game = new Phaser.Game(800, 800, Phaser.CANVAS, 'game', {
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
        };
        return Game;
    }());
    UntitledGame.Game = Game;
})(UntitledGame || (UntitledGame = {}));
window.onload = function () {
    new UntitledGame.Game();
    UI.ui = new UI.UI();
};
/// <reference path="app.ts" />
var UI;
(function (UI_1) {
    var UI = (function () {
        function UI() {
            this.mainMenu = new MainMenu();
            this.roomMenu = new RoomMenu();
        }
        return UI;
    }());
    UI_1.UI = UI;
    var Menu = (function () {
        function Menu() {
        }
        Menu.prototype.show = function () {
            this.menu.style.display = "block";
        };
        Menu.prototype.hide = function () {
            this.menu.style.display = "none";
        };
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
            _this.menu = document.getElementById("roomMenu");
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
        RoomMenu.prototype.hide = function () {
            this.unpauseGame();
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
