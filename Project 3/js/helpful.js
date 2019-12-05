//ripped this straight from circleBlast
function rectsIntersect(a,b){
    var ab = a.getBounds();
    var bb = b.getBounds();
    return ab.x + ab.width > bb.x && ab.x < bb.x + bb.width && ab.y + ab.height > bb.y && ab.y < bb.y + bb.height;
}

function clamp(val, min, max){
    return val < min ? min : (val > max ? max : val);
}

function unitVector(xv,yv)
{
    let mag = Math.sqrt(xv * xv + yv * yv);
    return {x: xv/mag, y: yv/mag}
}