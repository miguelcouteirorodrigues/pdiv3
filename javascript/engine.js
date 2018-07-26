class Engine {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.angle = 0;
        this.canvas = document.getElementById("canvas");
        this.canvas.focus();
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.context = canvas.getContext('2d');

        this.gameOver = false;
        this.hasGameOverMusicStarted = false;

        this.mute = false;

        this.canPause = true;
        this.pause = false;

        this.lives = 5;
        this.idleAudio;

        /*
        canvas updates at 60 frames per second,
        so acceleration is measured as distance per frame so,
        one hundred millionth of the canvas height
        divided by one sixtieth of a second, or 16.6ms, squared
        */
        //this.distance = this.canvas.height / 20000000;
        this.distance = this.canvas.height / 10000000;
        this.time = 1 / 60;
        this.acceleration = this.distance / Math.pow(this.time, 2);

        this.maxVelocity = (this.canvas.height / 5000) / this.time;
        this.friction = 0.99;
        this.turnAngle = Math.PI / 768;

        this.tempVx = 0;
        this.deltaX = 0;
        this.vx = 0;
        this.tempVy = 0;
        this.deltaY = 0;
        this.vy = 0;
        this.vAngle = 0;

        this.ax = 0;
        this.ay = 0;
        this.aAngle = 0;

        this.isTurningLeft = false;
        this.isTurningRight = false;
        this.isDrifting = false;

        //event listeners
        this.keys = [];
        document.addEventListener('keydown', function(e){
            engine.keys[e.which] = true;
        });
        document.addEventListener('keyup', function(e){
            engine.keys[e.which] = false;
        });

        this.centerPoint = new Point(this.canvas.width / 2, this.canvas.height - (this.canvas.height / 8));
        this.offSet = new Point(0, 0);
        
        this.wave;
        this.road;
        this.car;
    }

    initialize() {
        this.wave = new Wave(50);
        this.road = new Road();
        this.car = new Car();
        this.obstacles = new Obstacles();
        
        this.animate(this.canvas, this.context);
    }

    animate(canvas, context) {
        if (!this.gameOver) {
            this.context.save();
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.context.translate(this.centerPoint.x, this.centerPoint.y);
            this.context.rotate(this.angle);
            this.context.translate(this.x, this.centerPoint.y);
            this.wave.draw();
            this.road.draw();
            this.obstacles.draw();

            this.context.beginPath();
            this.context.arc(0, 0, 10, 0, Math.PI * 2);
            this.context.stroke();
            this.context.closePath();

            this.context.restore();

            this.car.draw();

            handleMotion();
            
            handleControls(this.keys);

            handleCollisions();

            handleHud();

            if (this.lives == 0) {
                this.gameOver = true;
            }

            if (false) {
                this.context.rect(1000,330,200,165);
                this.context.fillStyle = "#ffffff77";
                this.context.fill();
                this.context.font = "15px Arial";
                this.context.fillText("Car Top Left X: " + (engine.car.edges[2].y - this.x), 1000, 350);
                this.context.fillText("Car Top Right X: " + (engine.car.edges[3].y - this.x), 1000, 370);
                this.context.fillText("Width: " + this.road.width, 1000, 390);
                this.context.fillText("ZeroPoint: " + this.road.zeroPoint, 1000, 410);
                this.context.fillText("Total Width: " + (this.road.zeroPoint + this.road.width), 1000, 430);
                this.context.fillText("Angle: " + this.angle, 1000, 450);

                if (this.obstacles.objects.length > 0) {
                    this.context.fillText("Obstacle X: " + (this.obstacles.objects[0].x), 1000, 470);
                    this.context.fillText("Obstacle Y: " + (this.obstacles.objects[0].y + (this.centerPoint.y + this.offSet.y)), 1000, 490);
                }
            }
            
            requestAnimationFrame(function() {
                engine.animate(canvas, context);
            });
        }
        else {
            this.context.save();
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.drawGameOverScreen();
            this.context.restore();
        }
    }

    drawPauseIcon() {
        this.context.beginPath()
        this.context.fillStyle = "#44444499";
        this.context.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        
        this.context.fillStyle = "#ffffffff";
        ethis.context.fillRect(ctx.canvas.width / 2 - 30, ctx.canvas.height / 2 - 40, 20, 80);
        this.context.fillRect(ctx.canvas.width / 2 + 10, ctx.canvas.height / 2 - 40, 20, 80);

        this.context.strokeStyle = "#000000ff";
        this.context.strokeRect(ctx.canvas.width / 2 - 30, ctx.canvas.height / 2 - 40, 20, 80);
        this.context.strokeRect(ctx.canvas.width / 2 + 10, ctx.canvas.height / 2 - 40, 20, 80);
        this.context.closePath();
    }

    drawGameOverScreen() {
        this.context.save();
        this.context.beginPath()
        this.context.fillStyle = "#44444499";
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.context.fillStyle = "#ffffff";
        this.context.font = "120px Arial";
        this.context.textAlign = "center";
        this.context.textBaseline = "middle";
        this.context.fillText("Game Over", this.canvas.width / 2, this.canvas.height / 2);
        if (!this.hasGameOverMusicStarted) {
            soundEffect("game_over");
            this.hasGameOverMusicStarted = true;
        }
        this.context.closePath();
        this.context.restore();
    }
}