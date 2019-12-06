class Platform extends PIXI.Graphics{
    constructor(x,y,width,height,color = 0x000000)
    {
        super();
        this.beginFill(color);
        this.drawRect(x,y,width,height);
        this.endFill();
       

    }

}

class Ball extends PIXI.Graphics{
    constructor(fwd,x=0,y=0,color=0xFF0000){
        super();
        this.beginFill(color);
        this.drawCircle(0,0,2);
        this.endFill();
        this.fwd = fwd
        this.speed = 150;
        this.isAlive = true;
        this.x = x;
        this.y = y;
        this.radius = 3;
    }

    move(dt = 1/60, rects){
        this.x += this.fwd.x * this.speed * dt;
        this.y += this.fwd.y * this.speed * dt;
        if(!checkingCollisionsX(this, this.fwd.x * this.speed * dt, rects))
        {
            this.reflectX();
            
        }

        if(!checkingCollisionsY(this, this.fwd.y * this.speed * dt, rects))
        {
            this.reflectY();
            
        }
    }

    reflectX(){
        this.fwd.x *= -1;
    }

    reflectY(){
        this.fwd.y *= -1;
    }
}
