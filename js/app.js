"use strict";

class GameEntity {
    constructor(sprite,x,y) {
        this.sprite = sprite;
        this.x = x;
        this.y = y;
    }
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}


// Enemies our player must avoid
class Enemy extends GameEntity {
    constructor(sprite,x,y,speed) {
        super(sprite,x,y);
            this.speed = speed;
    }
    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    // calls the player's detectCollision method to check if the enemy have collided with the player or not
    update(dt) {
        if (this.x >= 505) {
            this.x = 0;
        }
        this.x = this.x + dt * this.speed;
        
    }

    checkCollision() {
        return player.detectCollision(this.x, this.y);

    }
}
// this Player class has a render method that draws the player to the screen, a handleinput method
// that handles movement with the help of the event listener defined below and the above mentioned detectCollision
class Player extends GameEntity {
    handleInput(key) {
        enemy1.checkCollision();
        enemy2.checkCollision();
        enemy3.checkCollision();
        player.update();
        switch (key) {
            case 'up':
                this.y -= 20;
                break;
            case 'down':
                this.y += 20;
                break;
            case 'left':
                this.x -= 20;
                break;
            case 'right':
                this.x += 20;
                break;
        }
    }
    detectCollision(enemyX, enemyY) {
        this.enemyX = enemyX;
        this.enemyY = enemyY
        let xMinus = enemyX - 30;
        let xPlus = enemyX + 30
        let yMinus = enemyY - 30;
        let yPlus = enemyY + 30
        if ((this.x > xMinus && this.x < xPlus) && (this.y > yMinus && this.y < yPlus)) {
            bigBang.update(0, this.x, this.y);
            this.x = 200;
            this.y = 400
        }
    }
    // the update method checks if the player went out of the field or not or if the player has already won
    update() {
        if (this.y <= 8) {
            enemy1.sprite = 'images/winner.png';
            enemy2.sprite = 'images/winner.png';
            enemy3.sprite = 'images/winner.png';
            this.y = 400;
            this.x = 200;
        } else if (this.y >= 450) {
            this.y = 400;
        } else if (this.x <= -10) {
            this.x = 15;
        } else if (this.x >= 400) {
            this.x = 380;
        }
    }
}
// this class draws and handles the blow up effect that happens when player and enemy collides
class Explosion extends GameEntity{
    update(dt, x, y) {
        this.dt = dt;
        dt = 1;
        this.x = x - 70;
        this.y = y - 70;
        setTimeout(() => {
            this.x = 600;
            this.y = 600;
        }, 500);
    }
}
// Objects are instantiated here
// Enemies are put in the array for the method in engine.js

const player = new Player('images/char-boy.png',200,400);
const enemy1 = new Enemy('images/enemy-bug.png',0, 50, Math.floor((Math.random() * 600) + 1));
const enemy2 = new Enemy('images/enemy-bug.png',0, 150, Math.floor((Math.random() * 600) + 1));
const enemy3 = new Enemy('images/enemy-bug.png',0, 230, Math.floor((Math.random() * 600) + 1));
const bigBang = new Explosion('images/bang.png',600, 600);
const allEnemies = [enemy1, enemy2, enemy3]
// This listens for key presses and sends the keys to the
// Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});