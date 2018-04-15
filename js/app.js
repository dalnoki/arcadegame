// Enemies our player must avoid
class Enemy {
    constructor(x, y, speed) {
        // Variables applied to each of our instances go here,
        // we've provided one for you to get started
        // The image/sprite for our enemies, this uses
        // a helper we've provided to easily load images
        this.sprite = 'images/enemy-bug.png';
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.xUpdated = 1;
    }
    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    // calls the player's detectCollision method to check if the enemy have collided with the player or not
    update(dt) {
        if (this.x >= 505) this.x = 0;
        this.xUpdated = (this.x += this.speed);
        this.xUpdated = this.xUpdated * dt;
        player.detectCollision(this.x, this.y);
        return this.xUpdated;
    }
    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}
// this Player class has a render method that draws the player to the screen, a handleinput method
// that handles movement with the help of the event listener defined below and the above mentioned detectCollision
class Player {
    constructor() {
        this.sprite = 'images/char-boy.png';
        this.x = 200;
        this.y = 400;
    }
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    handleInput(key) {
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
class Explosion {
    constructor(x, y) {
        this.sprite = 'images/bang.png';
        this.x = x;
        this.y = y;
    }
    render(playerX, playerY) {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
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

const player = new Player;
const enemy1 = new Enemy(0, 50, Math.floor((Math.random() * 6) + 1));
const enemy2 = new Enemy(0, 150, Math.floor((Math.random() * 6) + 1));
const enemy3 = new Enemy(0, 230, Math.floor((Math.random() * 6) + 1));
const bigBang = new Explosion(600, 600);
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