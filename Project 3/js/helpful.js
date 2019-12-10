//ripped this straight from circleBlast
function rectsIntersect(ab, bb) {
    return ab.x + ab.width > bb.x && ab.x < bb.x + bb.width && ab.y + ab.height > bb.y && ab.y < bb.y + bb.height;
}

function clamp(val, min, max) {
    return val < min ? min : (val > max ? max : val);
}

function unitVector(xv, yv) {
    let mag = Math.sqrt(xv * xv + yv * yv);
    return { x: xv / mag, y: yv / mag }
}


function checkingCollisionsX(player, potX, rects) {

    for (let r of rects) {
        var ab = player.getBounds();
        var bb = r.getBounds();
        ab.x += potX;
      

        if (ab.x + ab.width > bb.x && ab.x < bb.x + bb.width && ab.y + ab.height > bb.y && ab.y < bb.y + bb.height) {
            r.activate(rects);
            return false;
        }
    }

    return true;
}

function checkingCollisionsY(player, potY, rects) {

    for (let r of rects) {
        var ab = player.getBounds();
        var bb = r.getBounds();
        ab.y += potY;
        if (ab.x + ab.width > bb.x && ab.x < bb.x + bb.width && ab.y + ab.height > bb.y && ab.y < bb.y + bb.height) {
            r.activate(rects);
            return false;
        }
    }
    return true;
}