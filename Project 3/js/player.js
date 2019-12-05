
let keys = [];

let t;
let jumping;
jumping = false;
let colliding = false;
class Player extends PIXI.Sprite {

    constructor(x = 0, y = 0) {
        super(PIXI.loader.resources["images/Profile.jpg"].texture);
        this.anchor.set(.5, .5);
        this.scale.set(0.1);
        this.x = x;
        this.y = y;
        this.speed = 150;
        //keyboard event handlers
        window.addEventListener("keydown", keysDown);
        window.addEventListener("keyup", keysUp);

    }

    update(rects, ballThrown) {
        colliding = false;
        let g = 5;
        if(!checkingCollisionsY(player,5, rects))
        {
           colliding = true;
           jumping = false;

        }
       
        if (ballThrown) {
            this.keyboardControls(1 / 60, rects);
        }

        if (!colliding) {
            this.y += 5;
        }

        


    }
    //keycodes are W: 87, A: 65, S: 83, D: 68
    keyboardControls(dt = 1 / 60, rects) {

        if (keys[68]) {
            if (checkingCollisionsX(player, this.speed * dt, rects)) {
                this.x += this.speed * dt;
            }

        }
        

        
        if (keys[65]) {
            
            
            if (checkingCollisionsX(player, -this.speed * dt, rects)) {
                this.x -= this.speed * dt;
            }
        }

        if (!jumping) {
            t = 1;
        }

        if (keys[87]) {
            jumping = true;

        }
        if (jumping) {

            t -= dt;
            if (t < 0) {
                t = 0;
            }
            this.y -= 10 * t;

        }

    }


}

function keysDown(e) {

    keys[e.keyCode] = true;

}


function keysUp(e) {

    keys[e.keyCode] = false;
}


