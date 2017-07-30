/// <reference path="app.ts" />

module UI {
    export var ui: UI;

    export class UI {
        public mainMenu: Menu;
        public roomMenu: Menu;
        public mouseLeftDown: boolean;

        constructor() {
            this.mainMenu = new MainMenu();
            this.roomMenu = new RoomMenu();

            this.mouseEvents();
        }

        mouseEvents() {
            var ui = this;

            document.onmousedown = function(e) { 
                if(e.which == 1) // code 1 means left button
                    ui.mouseLeftDown = true;
            }
            document.onmouseup = function(e) {
                if(e.which == 1) // code 1 means left button
                    ui.mouseLeftDown = false;
            }
        }
    }


    class Menu {
        show(): void {}
        hide(): void {}
    }

    // Menus
    
    class MainMenu extends Menu {
        menu: HTMLElement;
        constructor() {
            super();

            this.menu = document.getElementById( "mainMenu" );
            var startGame = document.getElementById( "startGameButton" );

            startGame.onclick = () => {
                UntitledGame.game.state.start( "main-room" );
            }
            
            this.hide();
        }

        show() {
            this.menu.style.display = "block";
        }  

        hide() {
            this.menu.style.display = "none";
        }
    }

    class RoomMenu extends Menu {
        pauseButton = document.getElementById( "pauseButton" );
        pauseMenu = document.getElementById( "pauseMenu" );
        pauseOverlay = document.getElementById( "pauseOverlay" ); 

        continueButton = document.getElementById( "continueButton" );
        backButton = document.getElementById( "backButton" );

        constructor() {
            super();

            this.pauseButton.onclick = () => {
                this.pauseGame();
            }

            this.continueButton.onclick = () => {
                this.unpauseGame();
            }

            this.backButton.onclick = () => {
                UntitledGame.game.paused = false;
                UntitledGame.game.state.start( "main-menu" );
            }

            this.pauseOverlay.style.display = "none";
            this.pauseMenu.style.display = "none";
            this.hide();
        }

        show(): void {
            this.pauseButton.style.display = "block";
        }

        hide(): void {
            this.unpauseGame();
            this.pauseButton.style.display = "none";
        }

        pauseGame(): void {
                UntitledGame.game.paused = true;

                this.pauseMenu.style.display = "block";
                this.pauseOverlay.style.display = "block";

                this.pauseButton.classList.add( "button-no-hover" );
                this.pauseButton.classList.remove( "button" );
        }

        unpauseGame(): void {
            UntitledGame.game.paused = false;
            
            this.pauseMenu.style.display = "none";
            this.pauseOverlay.style.display = "none";

            this.pauseButton.classList.add( "button" );
            this.pauseButton.classList.remove( "button-no-hover" );
        }
    }
}