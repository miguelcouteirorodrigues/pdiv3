class Car {
    constructor() {
        this.ctx = engine.context;

        this.scale = (engine.canvas.width / engine.canvas.height) * 0.05;

        this.img = new Image();
        this.img.src = "assets/red-sports-car-top-view.svg";
        this.width = this.img.width * this.scale;
        this.height = this.img.height * this.scale;

        this.edges = [
            //rear left
            new Point(-1 * (this.width / 4), -1 * (this.height / 2)),
            //rear right
            new Point(-1 * (this.width / 4), (this.height / 2)),
            //front left
            new Point(3 * (this.width / 4), -1 * (this.height / 2)),
            //front right
            new Point(3 * (this.width / 4), (this.height / 2))
        ];

        this.invencibility = false;
        
        this.invencibilityTimerDefault = 120;
        this.invencibilityTimer;

        this.shouldDraw = true;
    }

    draw() {
        this.ctx.save();
        this.ctx.translate(engine.centerPoint.x, engine.centerPoint.y);
        this.ctx.rotate(3 * Math.PI / 2);

        let turnAngle; 

        if (engine.isDrifting) {
            turnAngle = Math.PI / 12;
        }
        else {
            turnAngle = Math.PI / 24;
        }

        if (engine.isTurningLeft) {
            this.ctx.rotate(-1 * turnAngle);
        }
        if (engine.isTurningRight) {
            this.ctx.rotate(turnAngle);
        }
        
        if (this.invencibility) {
            if (this.invencibilityTimer % 15 == 0)
            {
                this.shouldDraw = true;
            }
            else {
                this.shouldDraw = false;
            }

            this.invencibilityTimer -= 1;

            if (this.invencibilityTimer <= 0) {
                this.invencibility = false;
            }
        }
        else {
            this.shouldDraw = true;
            this.invencibilityTimer = this.invencibilityTimerDefault;
        }

        if (this.shouldDraw) {
            this.ctx.drawImage(this.img, this.edges[0].x, this.edges[0].y, this.width, this.height);
        }

        this.ctx.beginPath();
        this.ctx.moveTo(0, 0);
        this.ctx.arc(0, 0, 10, 0, Math.PI * 2);

        this.ctx.moveTo(this.edges[0].x, this.edges[0].y);
        this.ctx.arc(this.edges[0].x, this.edges[0].y, 10, 0, Math.PI * 2);

        this.ctx.moveTo(this.edges[1].x, this.edges[1].y);
        this.ctx.arc(this.edges[1].x, this.edges[1].y, 10, 0, Math.PI * 2);

        this.ctx.moveTo(this.edges[2].x, this.edges[2].y);
        this.ctx.arc(this.edges[2].x, this.edges[2].y, 10, 0, Math.PI * 2);

        this.ctx.moveTo(this.edges[3].x, this.edges[3].y);
        this.ctx.arc(this.edges[3].x, this.edges[3].y, 10, 0, Math.PI * 2);

        this.ctx.stroke();
        this.ctx.closePath();

        this.ctx.restore();
    }
}