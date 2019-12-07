class Platform extends PIXI.Graphics{
    constructor(x,y,width,height,color = 0x000000)
    {
        super();
        this.beginFill(color);
        this.drawRect(x,y,width,height);
        this.endFill();
       

    }

    activate()
    {

    }

}

class Ball extends PIXI.Graphics{
    constructor(fwd,x=0,y=0,color=0xFF0000){
        super();
        this.beginFill(color);
        this.radius = 5;
        this.drawCircle(0,0,this.radius);
        this.endFill();
        this.fwd = fwd
        this.speed = 150;
        this.isAlive = true;
        this.x = x;
        this.y = y;
        
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

class Button extends PIXI.Graphics
{
    constructor(x,y,width,height,rect,color = 0xff615c)
    {
        super();
        this.beginFill(color);
        this.drawRect(x,y,width,height);
        this.endFill();
        this.rect = rect;
    }

   

    activate()
    {
        
        
        createPlatform(this.rect);
    }
}
