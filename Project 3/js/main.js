

let app;
let rects= [];

window.onload = function(){
app = new PIXI.Application(

    {
        width: 1000,
        height: 600,
        backgroundColor: 0xAAAAAA

    }
);
document.body.appendChild(app.view);

}

let player;
let gameScene;
let platform;

PIXI.loader.add(["images/Profile.jpg"]).load(setup);


function setup(){

    stage = app.stage;

    gameScene = new PIXI.Container();
    stage.addChild(gameScene);

    player = new Player();
    platform = new Platform(0,400,400,20,0x000000);
    rects.push(platform);
    app.stage.addChild(platform);
    app.stage.addChild(player);
    app.ticker.add(update);
}

function update(){
    //if (paused) return; // keep this commented out for now

    // #1 - Calculate "delta time"
    let dt = 1/app.ticker.FPS;
    if(dt > 1/12) dt=1/12;
    player.update(rects);

}