
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
        for (let r of rects) {
            if (rectsIntersect(r, this)) {
                colliding = true;
                jumping = false;
            }


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
            let canMove = false
            for (let r of rects) {
                var ab = this.getBounds();
                var bb = r.getBounds();
                if (!rectsIntersect(r, this) && !(ab.x + ab.width > bb.x && ab.y + ab.height > bb.y)) {
                    canMove = true;

                }
            }
            if (canMove) {
                this.x += this.speed * dt;
            }

        }

        if (keys[65]) {
            let canMove = true
            for (let r of rects) {
                var ab = this.getBounds();
                var bb = r.getBounds();
                console.log(ab.y + ab.height);
                
                if (ab.x < bb.x + bb.width && ab.y + ab.height > bb.y) {
                    canMove = false;

                }
            }
            if (canMove) {
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

