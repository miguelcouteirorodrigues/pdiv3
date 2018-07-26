function handleMotion() {
    engine.vy += engine.ay;
    engine.vx += engine.ax;
    engine.vAngle += engine.aAngle;

    engine.vy = (engine.vy * engine.friction);
    engine.vx = (engine.vx * engine.friction);

    if (engine.vy >= engine.maxVelocity) {
        engine.vy = engine.maxVelocity;
    }
    if (engine.vy < 0) {
        engine.vy = 0;
    }
    if (engine.vx >= engine.maxVelocity) {
        engine.vx = engine.maxVelocity;
    }
    if (engine.vx < 0) {
        engine.vx = 0;
    }

    engine.angle = engine.vAngle;

    let theta = engine.angle;

    engine.deltaX = ((Math.cos(theta) * engine.vx) - (Math.sin(theta) * engine.vy));
    engine.deltaY = ((Math.sin(theta) * engine.vx) + (Math.cos(theta) * engine.vy)) * engine.vy;

    engine.deltaY = Math.abs(engine.deltaY);

    engine.x -= engine.deltaX;
    engine.y -= engine.deltaY;

    engine.offSet.x = engine.centerPoint.x - ((Math.cos(theta) * engine.centerPoint.x) - (Math.sin(theta) * engine.centerPoint.y)) + engine.vx;
    engine.offSet.y = Math.abs(engine.centerPoint.y - ((Math.sin(theta) * engine.centerPoint.x) + (Math.cos(theta) * engine.centerPoint.y)));
}