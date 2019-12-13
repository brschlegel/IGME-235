class Platform extends PIXI.Graphics {
    constructor(x, y, width, height, color = 0x000000) {
        super();
        this.beginFill(color);
        this.drawRect(x, y, width, height);
        this.endFill();


    }

    activate(rects) {

    }

    

}

window.onload = function () {
}

class Ball extends PIXI.Graphics {
    constructor(fwd, x = 0, y = 0, color = 0xFF0000) {
        super();
        this.beginFill(color);
        this.radius = 5;
        this.drawCircle(0, 0, this.radius);
        this.endFill();
        this.fwd = fwd
        this.speed = 400;
        this.isAlive = true;
        this.x = x;
        this.y = y;

    }

    move(dt = 1 / 60, rects) {
        this.x += this.fwd.x * this.speed * dt;
        this.y += this.fwd.y * this.speed * dt;
        if (!checkingCollisionsX(this, this.fwd.x * this.speed * dt, rects)) {
            this.reflectX();

        }

        if (!checkingCollisionsY(this, this.fwd.y * this.speed * dt, rects)) {
            this.reflectY();

        }
    }

    reflectX() {
        this.fwd.x *= -1;
    }

    reflectY() {
        this.fwd.y *= -1;
    }
}

//So the whole idea is that each of the Buttons are really just a special platform, so that they can all be stored together and updated together,
//they handle their own actions so that you can have cool things like nested buttons
class SubtractiveButton extends PIXI.Graphics {
    constructor(x, y, width, height, rect, color = 0xff615c) {
        super();
        this.beginFill(color);
        this.drawRect(x, y, width, height);
        this.endFill();
        this.rect = rect;
        createPlatform(rect);
    }



    activate(rects) {
        while(rects.includes(this.rect))
        {
        rects.splice(rects.indexOf(this.rect), 1)
        app.stage.removeChild(this.rect);
        }
    }

    
}

class AdditiveButton extends PIXI.Graphics {
    constructor(x, y, width, height, rect, rects, color = 0x09b1db) {
        super();
        this.beginFill(color);
        this.drawRect(x, y, width, height);
        this.endFill();
        this.rect = rect;
       

    }



    activate(rects) {
        
        createPlatform(this.rect);

    }

    


}

class LabelButton extends PIXI.Graphics {
    constructor(x, y, width, height, label, labelx, labely, color = 0x000000) {
        super();
        this.beginFill(color);
        this.drawRect(x, y, width, height);
        this.endFill();
        this.label = label;
        this.labely = labely;
        this.labelx = labelx;

    }



    activate(rects) {
        createLabel(this.label, this.labelx, this.labely);

    }

}

class Checkpoint extends PIXI.Graphics {
    constructor(x, y, width, height,checkpoints, color = 0x8ded80) {
        super();
        this.beginFill(color);
        //dude I literally have no clue where these numbers are getting doubled
        this.x = x/2;
        this.y = y/2;
        this.drawRect(this.x, this.y, width, height);
        this.endFill();
        checkpoints.push(this);
       
       

    }

    activate(rects ) {
        if (!ballThrown) {
           
            rects.splice(rects.indexOf(this), 1)
            app.stage.removeChild(this);
            cIndex++;
            //checkpoint system using local storage
            localStorage.setItem("cIndex", cIndex);
            checkpointSound.play();
        }
      
        
    }

   

}



