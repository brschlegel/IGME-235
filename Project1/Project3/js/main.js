
//variables and stuff
let app;
let rects = [];
let ball;
let ballThrown = false;
let offsetTime;
let controlsLabel, subButtonLabel, addButtonLabel, patienceLabel, checkpointLabel, cameraLabel, winLabel;
let canScroll = false;
let checkpointSound;


let checkpoints;
let cIndex;
let reloaded;
window.onload = function () {
    app = new PIXI.Application(

        {
            width: 1000,
            height: 4020,
            backgroundColor: 0xAAAAAA

        }
    );
    document.body.appendChild(app.view);
    //ball throwing
    app.renderer.plugins.interaction.on('pointerup', throwBall);
   
    //If never played the game, look at that you start from the center
    if(localStorage.getItem("cIndex")){
    cIndex = localStorage.getItem("cIndex") - 1;
    }
    else{
        cIndex = 0;
    }
    checkpoints = [];
    reloaded = true;
}

let player;


let platform;

PIXI.loader.add(["images/Profile.png"]).load(setup);


function setup() {

    stage = app.stage;
    setUpLabels();

    //So each region represents a "floor"

    //#region Borders
    createPlatform(new Platform(0, 0, 20, 4000));
    createPlatform(new Platform(980, 0, 20, 4000));
    createPlatform(new Platform(0, 0, 1000, 20));
    createPlatform(new LabelButton(0, 4000, 1000, 20, winLabel, 650,3800));
    //#endregion


  
    //#region 1
    createPlatform(new Checkpoint(20, 200, 180, 20, checkpoints))
    createPlatform(new LabelButton(0, 400, 200, 20, controlsLabel, 50, 50));
    createPlatform(new LabelButton(200, 400, 300, 20, subButtonLabel, 600, 20));
    createPlatform(new Platform(500, 400, 20, 100, 0x000000));
    createPlatform(new LabelButton(500, 500, 300, 20, checkpointLabel, 750,200 ));
    createPlatform(new SubtractiveButton(500, 20, 100, 20, new Platform(500, 400, 500, 20)));
    createPlatform(new Checkpoint(800, 500, 180, 20,checkpoints))
    //#endregion 

    //#region 2
    createPlatform(new LabelButton(475, 800, 525, 20, addButtonLabel, 260,420));
    createPlatform(new Platform(455, 670, 20, 150));
    createPlatform(new LabelButton(180, 650, 295, 20, cameraLabel, 520,520));
    createPlatform(new AdditiveButton(150, 420, 100, 20, new Platform(600, 700, 75, 20)))
    createPlatform(new Checkpoint(20, 650, 160, 20,checkpoints))
    //#endregion

    //#region 3
    createPlatform(new SubtractiveButton(435, 695, 20, 100, new Platform(20, 1000, 350, 20)));
    createPlatform(new Platform(370, 1000, 20, 150));
    createPlatform(new LabelButton(20, 1130, 350, 20, patienceLabel, 50,850));
    createPlatform(new Platform(390, 1000, 300, 20));
    createPlatform(new Platform(690, 900, 20, 120));
    createPlatform(new Platform(690, 900, 130, 20));
    createPlatform(new Checkpoint(820, 900, 160, 20,checkpoints))
    //#endregion

    //#region 4
    createPlatform(new Platform(600,1300,380,20));
    createPlatform(new Platform(580,1120,20,300));
    createPlatform(new AdditiveButton(450,1020,160,20, new AdditiveButton(390,1080,20,60,new Platform(730,1200,60,20))));
    createPlatform(new Platform(200,1400,400,20))
    createPlatform(new Checkpoint(20,1400,180,20,checkpoints))
    //#endregion

    //#region 5
    createPlatform(new Platform(20,1600,180,20));
    createPlatform(new Platform(200,1600,20,100));
    createPlatform(new Platform(200,1680,600,20));
    createPlatform(new Platform(800,1600,20,100));
    createPlatform(new Checkpoint(820,1600,160,20,checkpoints));
    createPlatform( new SubtractiveButton(960,1400,20,150,new AdditiveButton(220,1600,580,20,new Platform(580,1400,20,300))));
    //#endregion 5

    //#region 6
    createPlatform(new Platform(820,1800,180,20));
    createPlatform(new Platform(800,1800,20,200));
    createPlatform(new Platform(300,1980,500,20));
    createPlatform(new Platform(300,1800,20,200))
    createPlatform(new SubtractiveButton(780,1850,20,100,new Platform(500,1680,20,320)));
    createPlatform(new AdditiveButton(20,1800,20,160, new Platform(300,1870,100,20)));
    createPlatform(new Checkpoint(20,1980,280,20, checkpoints))
    //#endregion 6 

    //#region 7
    createPlatform(new AdditiveButton(20,2400,280,20, new Platform(20,2300,280,20)));
    createPlatform(new Platform(300,2000,20,320));
    createPlatform(new Platform(300,2400,20,400));
    let p = new Platform(500,2000,20,800);
    createPlatform(p);
    createPlatform(new AdditiveButton(320,2050,20,100,new SubtractiveButton(320,2600,20,200, p)));
    createPlatform(new Platform(300,2800,600,20));
    createPlatform(new Checkpoint(900,2800,80,20,checkpoints))
    //#endregion 7
    
    //#region 8
    createPlatform(new Platform(500,2800,20,1000));
    createPlatform(new Platform(900,3000,20,800));
    createPlatform(new SubtractiveButton(700,2820,50,20,new Platform(900,3000,80,20)));
    createPlatform(new SubtractiveButton(520,2950,20,100,new Platform(900,3100,80,20)));
    createPlatform(new SubtractiveButton(880,3150,20,100,new Platform(900,3200,80,20)));
    createPlatform(new SubtractiveButton(520,3400,20,100,new Platform(900,3300,80,20)));
    createPlatform(new SubtractiveButton(880,3600,20,100,new Platform(900,3400,80,20)));


    //#endregion 8
    player = new Player(getCenterOfWaypoint(checkpoints[cIndex]).x, getCenterOfWaypoint(checkpoints[cIndex]).y, canScroll);
    ball = new Ball({ x: 0, y: 0 }, player.x, player.y);

    checkpointSound = new Howl({
        src: ['sounds/checkpoint.wav']
    });
    app.stage.addChild(player);
    app.ticker.add(update);

}


function update() {
    let dt = 1 / app.ticker.FPS;
    if (dt > 1 / 12) dt = 1 / 12;

    player.update(rects, ballThrown);
    ball.move(1 / 60, rects);
    if (ballThrown) {
        offsetTime += .1;
    }
    if (offsetTime > 2) {
        catchBall();
    }
    if(!canScroll)
    {
    window.scrollTo(0,player.y - 400);
    }
    if(keys[67])
    {
        canScroll = true;
    }
    if(keys[88]){
        canScroll = false;
    }
    if(keys[76] && cIndex == 8){
        localStorage.setItem("cIndex", 1);
        window.location.reload();

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
    if (rectsIntersect(player.getBounds(), ball.getBounds())) {

        ballThrown = false;
        app.stage.removeChild(ball);
    }

}

function createPlatform(p) {
    
    rects.push(p);
    app.stage.addChild(p);

}

function setUpLabels() {
    let HelpStyle = new PIXI.TextStyle({
        fill: 0x000000,
        fontSize: 20,
        fontFamily: "serif"
    });

    controlsLabel = new PIXI.Text("Use WASD to move, and click to toss the ball \n You cannot move until you throw the ball");
    controlsLabel.style = HelpStyle;

    subButtonLabel = new PIXI.Text("<= Maybe try hitting this button?");
    subButtonLabel.style = HelpStyle;

    checkpointLabel = new PIXI.Text("Green is a checkpoint!\n You need to stand on it\n with the ball in your \npossesion to procede");
    checkpointLabel.style = HelpStyle;

    addButtonLabel = new PIXI.Text("I wonder what this one does");
    addButtonLabel.style = HelpStyle;
    
    patienceLabel = new PIXI.Text("“He wins his battles by making no mistakes.” - Sun Tzu \n You have lost your battle. Press R to retry");
    patienceLabel.style = HelpStyle;

    cameraLabel = new PIXI.Text("Press C to enable free camera.\nPress X to turn it back");
    cameraLabel.style = HelpStyle;

    winLabel = new PIXI.Text("Hooray! You did it!\n Press L to restart from floor one!");
    winLabel.style = HelpStyle;

    
}

function createLabel(label, x, y) {
    label.x = x;
    label.y = y;
    app.stage.addChild(label);
}



function getCenterOfWaypoint(waypoint)
{
    let bounds = waypoint
    return{x: 2 *bounds.x + bounds.width/2, y: 2 *bounds.y }
}

function keysDown(e) {

    keys[e.keyCode] = true;

}


function keysUp(e) {

    keys[e.keyCode] = false;
}


