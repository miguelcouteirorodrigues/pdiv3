function handleCollisions() {
    if (!engine.car.invencibility) {
        for (var i = 0; i < engine.obstacles.objects.length; i++) {
            var obstacle = engine.obstacles.objects[i];

            if ((obstacle.y + (engine.centerPoint.y + engine.offSet.y) >= engine.car.edges[1].y &&
                obstacle.y + (engine.centerPoint.y + engine.offSet.y) <= engine.canvas.height - engine.centerPoint.y)) {
                
                if ((((engine.car.edges[1].x * -1 - engine.x) >= obstacle.x) &&
                    (obstacle.x >= (engine.car.edges[3].x * -1 - engine.x)))) {
                        
                        engine.car.invencibility = true;
                        engine.obstacles.objects.splice(i, 1);
                        engine.lives -= 1;
                        soundEffect("impact");
                }


            }
        }
    }

    if ((engine.car.edges[3].y - engine.x) <= engine.road.zeroPoint ||
        (engine.car.edges[2].y - engine.x) >= engine.road.zeroPoint + engine.road.width) {
        
        if (!engine.car.invencibility) {
            engine.lives -= 1;  
        }
        engine.car.invencibility = true;
        engine.car.invencibilityTimer = engine.car.invencibilityTimerDefault;

        engine.x = 0;
        engine.angle = 0;
        
        engine.ax = 0;
        engine.ay = 0;
        engine.aAngle = 0;

        engine.vx = 0;
        engine.vy = 0;
        engine.vAngle = 0;
        
        soundEffect("splash");
    }
}