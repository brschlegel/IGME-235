

let app;
let rects = [];
let ball;
let ballThrown = false;
let offsetTime;

window.onload = function () {
    app = new PIXI.Application(

        {
            width: 1000,
            height: 600,
            backgroundColor: 0xAAAAAA

        }
    );
    document.body.appendChild(app.view);

    app.renderer.plugins.interaction.on('pointerup', throwBall);
}

let player;
let gameScene;
let platform;

PIXI.loader.add(["images/Profile.jpg"]).load(setup);


function setup() {

    stage = app.stage;

    gameScene = new PIXI.Container();
    stage.addChild(gameScene);


    //#region Borders
    createPlatform(new Platform(0,0,20,600));
    createPlatform(new Platform(980, 0, 20, 600));
    createPlatform(new Platform(0,0,1000,20));
    createPlatform(new Platform(0,580,1000,20));
    //#endregion
    player = new Player(50,50);
    createPlatform(new Platform(0,400,500,20));
    createPlatform(new Platform(0, 400, 500, 20, 0x000000));
    createPlatform(new Platform(400,370,20,50,0x000000));
    createPlatform(new Platform(600,500, 200, 20, 0x000000));
    createPlatform(new Button(960, 200,20,100, new Platform(200,200,30,30)));
   
    ball = new Ball({ x: 0, y: 0 }, player.x, player.y);
    
    
    app.stage.addChild(player);
    app.ticker.add(update);

}

function update() {
    //if (paused) return; // keep this commented out for now


    let dt = 1 / app.ticker.FPS;
    if (dt > 1 / 12) dt = 1 / 12;
    player.update(rects,ballThrown);
    ball.move(1/60, rects);
    if(ballThrown)
    {
        offsetTime += .1;
    }
    if(offsetTime > 3)
    {
    catchBall();
    }
   

}

function throwBall(e) {
    offsetTime = 0;
    if (!ballThrown) {
        ballThrown = true;
        let mousePosition = e.data.global;
        let fwd = unitVector(mousePosition.x - player.x, mousePosition.y - player.y);
        ball = new Ball(fwd, player.x, player.y);
        app.stage.addChild(ball);

    }
    
}

function catchBall() {
    if(rectsIntersect(player.getBounds(), ball.getBounds())){
       
        ballThrown = false;
        app.stage.removeChild(ball);
    }

}

function createPlatform(p){
    rects.push(p);
    app.stage.addChild(p);

}