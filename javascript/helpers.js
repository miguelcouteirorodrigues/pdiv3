/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Returns a point rotated by the angle.
 * Rotate clockwise, angle in radians.
 * @param {Point} pivot current xy position and angle 
 * @param {Point} point the point to rotate
 */
function rotatePoint(pivot, point) {
    var x = Math.round((Math.cos(pivot.angle) * point.x) -
                        (Math.sin(pivot.angle) * point.y) +
                        pivot.x),
        y = Math.round((Math.sin(pivot.angle) * point.x) +
                        (Math.cos(pivot.angle) * point.y) +
                        pivot.y);

    return new Point(x, y, pivot.angle);
}

/**
 * Determines if a point is contained between two others.
 * Returns true if it does, false otherwise.
 * @param {Point} elemAPointA
 * @param {Point} elemAPointB 
 * @param {Point} elemBPointA
 * @param {Point} elemBPointB
 */
function isIntersecting(elemAPointA, elemAPointB, elemBPointA, elemBPointB) {
    if (
        (((elemAPointA.x <= elemBPointA.x && elemBPointA.x <= elemAPointB.x) ||
        (elemAPointA.x <= elemBPointB.x && elemBPointB.x <= elemAPointB.x)) ||
        ((elemBPointA.x <= elemAPointA.x && elemAPointA.x <= elemBPointB.x) ||
        (elemBPointA.x <= elemAPointB.x && elemAPointB.x <= elemBPointB.x)))
        &&
        (elemAPointA.y > elemBPointA.y || elemAPointA.y > elemBPointB.y || elemAPointB.y > elemBPointA.y || elemBPointA.y > elemBPointA.y)
    ) {
        return true;
    }
    return false;
}

function soundEffect(id) {
    if (!engine.mute) {
        let tag_id = id + "_" + getRandomInt(1,100);
        audio = new Audio();

        let src1  = document.createElement("source");
        src1.type = "audio/mpeg";
        src1.src  = "assets/" + id + ".mp3";
        src1.id = tag_id;
        audio.appendChild(src1);

        audio.play();
    }
}