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
            this.game.load.image("enemyship", "Assets/Images/enemyship.png");
            this.game.load.image("planet", "Assets/Images/planet.png");
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
            this.wrappedX = 0;
            this.wrappedY = 0;
            this.apparentX = 0;
            this.apparentY = 0;
            this.MAX_SPEED = 800;
            this.BOMB_SPEED = 2000;
            this.sprite = UntitledGame.game.add.sprite(x, y, "spaceship");
            this.sprite.tint = 0x7021FF;
            this.sprite.anchor.setTo(0.5, 0.5);
            UntitledGame.game.physics.arcade.enable(this.sprite);
            this.sprite.body.drag.set(200);
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
            this.apparentX = this.wrappedX + this.sprite.x;
            this.apparentY = this.wrappedY + this.sprite.y;
        };
        SpaceShip.prototype.handleBombs = function () {
            var ship = this;
            UntitledGame.game.input.onDown.add(function () {
                var bomb = new GameObjects.Bomb(ship.sprite.x, ship.sprite.y, ship.BOMB_SPEED);
                bomb.shootTowards(UntitledGame.game.input.x + UntitledGame.game.camera.x, UntitledGame.game.input.y + UntitledGame.game.camera.y);
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
            var _this = _super.call(this) || this;
            _this.PART_SIZE = 1000;
            _this.DIMENSION = 5;
            return _this;
        }
        MainRoom.prototype.init = function () {
            GameObjects.worldGenerator = this.worldGenerator = new GameObjects.WorldGenerator(this.PART_SIZE, this.DIMENSION);
            this.worldGenerator.generateWorld();
        };
        MainRoom.prototype.create = function () {
            // Show the menu
            UI.ui.roomMenu.show();
            GameObjects.spaceShip = this.spaceShip = new GameObjects.SpaceShip(this.game.world.width / 2, this.game.world.height / 2);
            UntitledGame.game.world.camera.follow(this.spaceShip.sprite);
            this.shipPreviousPart = this.worldGenerator.coordGetPart(this.spaceShip.sprite.x, this.spaceShip.sprite.y);
            this.createPlanets();
            this.createEnemies();
        };
        MainRoom.prototype.update = function () {
            var _this = this;
            this.spaceShip.update();
            this.wrapShip(this.spaceShip, -150);
            this.enemies.forEach(function (enemy) {
                _this.wrapShip(enemy, 0);
            });
            var shipCurrentPart = this.worldGenerator.coordGetPart(this.spaceShip.wrappedX + this.spaceShip.sprite.x, this.spaceShip.wrappedY + this.spaceShip.sprite.y);
            if (!this.shipPreviousPart.equals(shipCurrentPart)) {
                this.shipPreviousPart = shipCurrentPart;
                this.shipChangedPart(shipCurrentPart);
                //console.log(this.worldGenerator.partExists(shipCurrentPart));
            }
        };
        MainRoom.prototype.render = function () {
            UntitledGame.game.debug.text(this.spaceShip.apparentX + " " + this.spaceShip.apparentY, 30, 700);
            UntitledGame.game.debug.text(this.enemies[0].apparentX + " " + this.enemies[0].apparentY, 30, 760);
        };
        MainRoom.prototype.shutdown = function () {
            UI.ui.roomMenu.hide();
        };
        MainRoom.prototype.createPlanets = function () {
            var planet = new GameObjects.Planet(600, 600);
        };
        MainRoom.prototype.shipChangedPart = function (currentPart) {
            var startX = currentPart.x - 1;
            var startY = currentPart.y - 1;
            for (var i = 0; i < 3; i++) {
                for (var j = 0; j < 3; j++) {
                    var part = new GameObjects.Part(startX + i, startY + j);
                    if (!this.worldGenerator.partExists(part))
                        this.worldGenerator.loadPart(part);
                }
            }
        };
        MainRoom.prototype.wrapShip = function (ship, padding) {
            var size = this.PART_SIZE * this.DIMENSION;
            if (ship.sprite.x + padding < UntitledGame.game.world.bounds.x) {
                ship.sprite.x = UntitledGame.game.world.bounds.right + padding;
                ship.wrappedX -= size;
            }
            else if (ship.sprite.x - padding > UntitledGame.game.world.bounds.right) {
                ship.sprite.x = UntitledGame.game.world.bounds.left - padding;
                ship.wrappedX += size;
            }
            if (ship.sprite.y + padding < UntitledGame.game.world.bounds.top) {
                ship.sprite.y = UntitledGame.game.world.bounds.bottom + padding;
                ship.wrappedY -= size;
            }
            else if (ship.sprite.y - padding > UntitledGame.game.world.bounds.bottom) {
                ship.sprite.y = UntitledGame.game.world.bounds.top - padding;
                ship.wrappedY += size;
            }
        };
        MainRoom.prototype.createEnemies = function () {
            GameObjects.enemies = this.enemies = [];
            var enemy = new GameObjects.EnemyShip(500, 500);
            this.enemies.push(enemy);
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
/// <reference path="../app.ts" />
var GameObjects;
(function (GameObjects) {
    var EnemyShip = (function () {
        function EnemyShip(x, y) {
            this.wrappedX = 0;
            this.wrappedY = 0;
            this.apparentX = 0;
            this.apparentY = 0;
            this.MAX_SPEED = 500;
            this.sprite = UntitledGame.game.add.sprite(x, y, "enemyship");
            this.sprite.tint = 0x1f23a4;
            this.sprite.anchor.setTo(0.5, 0.5);
            UntitledGame.game.physics.arcade.enable(this.sprite);
            GameObjects.enemyShip = this;
            this.sprite.update = function () {
                GameObjects.enemyShip.apparentX = GameObjects.enemyShip.wrappedX + GameObjects.enemyShip.sprite.body.x;
                GameObjects.enemyShip.apparentY = GameObjects.enemyShip.wrappedY + GameObjects.enemyShip.sprite.body.y;
                var deltaX = GameObjects.spaceShip.apparentX - GameObjects.enemyShip.apparentX;
                var deltaY = GameObjects.spaceShip.apparentY - GameObjects.enemyShip.apparentY;
                var velocity = new Phaser.Point(deltaX, deltaY).normalize().multiply(1000, 1000);
                this.body.acceleration.setTo(velocity.x, velocity.y);
                UntitledGame.game.physics.arcade.collide(this, GameObjects.spaceShip.sprite);
            };
            this.sprite.body.drag.set(100);
            this.sprite.body.maxVelocity.set(this.MAX_SPEED);
        }
        EnemyShip.prototype.update = function () {
        };
        return EnemyShip;
    }());
    GameObjects.EnemyShip = EnemyShip;
})(GameObjects || (GameObjects = {}));
/// <reference path="../app.ts" />
var GameObjects;
(function (GameObjects) {
    var WorldGenerator = (function () {
        function WorldGenerator(partSize, dimension) {
            this.partSize = partSize;
            this.dimension = dimension;
            // Initialize loadedParts
            this.loadedParts = [];
            for (var i = 0; i < this.dimension; i++) {
                var column = [];
                for (var j = 0; j < this.dimension; j++) {
                    column.push(null);
                }
                this.loadedParts.push(column);
            }
        }
        WorldGenerator.prototype.generateArea = function (x, y) {
        };
        WorldGenerator.prototype.clearArea = function (x, y) {
        };
        WorldGenerator.prototype.loadPart = function (part) {
            // console.log("loading part...", part.x, part.y);
            var area = part.getArea(this.dimension);
            this.clearArea(area.x, area.y);
            this.generateArea(area.x, area.y);
            this.loadedParts[area.x][area.y] = part;
        };
        WorldGenerator.prototype.generateWorld = function () {
            UntitledGame.game.world.setBounds(0, 0, this.dimension * this.partSize, this.dimension * this.partSize);
            for (var i = 0; i < this.dimension; i++) {
                for (var j = 0; j < this.dimension; j++) {
                    this.loadPart(new Part(i, j));
                }
            }
            this.loadPart(new Part(2, 2));
        };
        WorldGenerator.prototype.coordGetPart = function (x, y) {
            var part = new Part(Math.floor(x / this.partSize), Math.floor(y / this.partSize));
            return part;
        };
        WorldGenerator.prototype.partExists = function (part) {
            var area = part.getArea(this.dimension);
            if (this.loadedParts[area.x][area.y] && this.loadedParts[area.x][area.y].equals(part))
                return true;
            return false;
        };
        return WorldGenerator;
    }());
    GameObjects.WorldGenerator = WorldGenerator;
    var Part = (function () {
        function Part(x, y) {
            this.x = x;
            this.y = y;
        }
        Part.prototype.getArea = function (dimension) {
            var part = new Part(0, 0);
            part.x = this.x % dimension;
            if (part.x < 0)
                part.x += dimension;
            part.y = this.y % dimension;
            if (part.y < 0)
                part.y += dimension;
            return part;
        };
        Part.prototype.equals = function (part) {
            if (this.x === part.x && this.y === part.y)
                return true;
            return false;
        };
        return Part;
    }());
    GameObjects.Part = Part;
})(GameObjects || (GameObjects = {}));
/// <reference path="../app.ts" />
var GameObjects;
(function (GameObjects) {
})(GameObjects || (GameObjects = {}));
/// <reference path="../app.ts" />
var GameObjects;
(function (GameObjects) {
    var Planet = (function () {
        function Planet(x, y) {
            this.sprite = UntitledGame.game.add.sprite(x, y, "planet");
            UntitledGame.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
            this.sprite.body.moves = false;
            this.sprite.update = GameObjects.Planet.update;
        }
        Planet.update = function () {
            var _this = this;
            UntitledGame.game.physics.arcade.collide(this, GameObjects.spaceShip.sprite);
            GameObjects.enemies.forEach(function (enemy) {
                UntitledGame.game.physics.arcade.collide(_this, enemy.sprite);
            });
        };
        return Planet;
    }());
    GameObjects.Planet = Planet;
})(GameObjects || (GameObjects = {}));
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
                UntitledGame.game.world.wrap(this, 0, true);
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
