function handleControls (keys) {
    engine.ay = 0;
    engine.ax = 0;
    engine.aAngle = 0;

    engine.isTurningLeft = false;
    engine.isTurningRight = false;
    engine.isDrifting = false;
    
    if (!engine.isGameOver) {
        //M
        /* if(keys[77]) {
            if (engine.canChangeMute != engine.mute) {
                engine.mute = !engine.mute;
            }
        }
        else if (!keys[77]) {
            engine.canChangeMute = !engine.mute;
        } */

        //P
        /* if(keys[80]) {
            if (engine.canPause) {
                engine.pause = !engine.pause;
                engine.canPause = false;
                soundEffect("pause");
            }
        }
        else if (!keys[80]) {
            engine.canPause = true;
        } */

        if (!engine.pause) {
            //MOTION
            //A
            if(keys[65]) {
                engine.ay += engine.acceleration;
            }
            //S
            if(keys[83]) {
                if (engine.vy > 0) {
                    engine.ay -= engine.acceleration * 1/3;
                }
            }
            //Spacebar
            if(keys[32]) {
                engine.isDrifting = true;;
            }
            else if (!keys[32]) {
                engine.isDrifting = false;
            }

            //TURNING
            //Left arrow key
            if(keys[37]) {
                if (engine.angle < Math.PI / 4 && (engine.vy > 0 || engine.vx > 0)) {
                    engine.aAngle = engine.turnAngle;
                    engine.isTurningLeft = true;
                }
            }
            //Right arrow key
            if(keys[39]) {
                if (engine.angle > -1 * Math.PI / 4 && (engine.vy > 0 || engine.vx > 0)) {
                    engine.aAngle = (engine.turnAngle) * -1;
                    engine.isTurningRight = true;
                }
            }

            if (engine.isDrifting) {
                if (engine.isTurningLeft) {
                    engine.aAngle += engine.turnAngle * 2;
                }
                if (engine.isTurningRight) {
                    engine.aAngle += (engine.turnAngle) * -2;
                }
                if (engine.isTurningLeft || engine.isTurningRight) {
                    soundEffect("skid");
                }
                
            }
        }
    }
}