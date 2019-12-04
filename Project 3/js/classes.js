class Player extends PIXI.Sprite{

    constructor(x=0,y=0){
        super(PIXI.loader.resources["images/Profile.jpg"].texture);
        this.anchor.set(.5,.5);
        this.scale.set(0.1);
        this.x= x;
        this.y = y;
    }

    update(rects)
    {
        let g = 5;
        for(let r of rects)
        {
            if(!rectsIntersect(r,this))
            {
                this.y += g
            }

        }

       

    }
}

class Platform extends PIXI.Graphics{
    constructor(x,y,width,height,color = 0x46484a)
    {
        super();
        this.beginFill(color);
        this.drawRect(x,y,width,height);
        this.endFill();
       

    }

}