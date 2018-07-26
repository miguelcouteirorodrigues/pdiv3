class Road {
    constructor(ctx) {
        this.ctx = engine.context;

        this.thickness = 2;
        this.length = 40;

        this.xOffSet = engine.centerPoint.x;
        this.yOffSet = engine.centerPoint.y;

        this.zeroPoint = ((this.ctx.canvas.width / 3.5) + ((this.ctx.canvas.width / 3.5) * 0.05)) - this.xOffSet;
        this.width = ((this.ctx.canvas.width - (this.ctx.canvas.width / 3.5)) - ((this.ctx.canvas.width / 3.5) * 0.05)) - ((this.ctx.canvas.width / 3.5) + ((this.ctx.canvas.width / 3.5) * 0.05));
    }

    draw() {
        this.ctx.save();

        this.ctx.fillStyle = "#cccccc";

        this.ctx.beginPath();
        this.ctx.moveTo((this.ctx.canvas.width / 3.5) - this.xOffSet, (this.ctx.canvas.height * 2) - this.yOffSet);
        this.ctx.lineTo((this.ctx.canvas.width / 3.5) - this.xOffSet, (this.ctx.canvas.height * -2) - this.yOffSet);
        this.ctx.lineTo((this.ctx.canvas.width - (this.ctx.canvas.width / 3.5)) - this.xOffSet, (this.ctx.canvas.height * -2) - this.yOffSet);
        this.ctx.lineTo((this.ctx.canvas.width - (this.ctx.canvas.width / 3.5)) - this.xOffSet, (this.ctx.canvas.height * 2) - this.yOffSet);
        this.ctx.closePath();

        this.ctx.stroke();
        this.ctx.fill();

        this.ctx.fillStyle = "#222222";

        this.ctx.beginPath();
        this.ctx.moveTo(((this.ctx.canvas.width / 3.5) + ((this.ctx.canvas.width / 3.5) * 0.05)) - this.xOffSet, (this.ctx.canvas.height * 2) - this.yOffSet);
        this.ctx.lineTo(((this.ctx.canvas.width / 3.5) + ((this.ctx.canvas.width / 3.5) * 0.05)) - this.xOffSet, (this.ctx.canvas.height * -2) - this.yOffSet);
        this.ctx.lineTo(((this.ctx.canvas.width - (this.ctx.canvas.width / 3.5)) - ((this.ctx.canvas.width / 3.5) * 0.05)) - this.xOffSet, (this.ctx.canvas.height * -2) - this.yOffSet);
        this.ctx.lineTo(((this.ctx.canvas.width - (this.ctx.canvas.width / 3.5)) - ((this.ctx.canvas.width / 3.5) * 0.05)) - this.xOffSet, (this.ctx.canvas.height * 2) - this.yOffSet);
        this.ctx.closePath();

        this.ctx.stroke();
        this.ctx.fill();

        this.ctx.fillStyle = "#ffffff";

        for (var i = 1; i < 4; i++) {
            var startPointX = this.zeroPoint + (((this.width / 4) * i) - (this.thickness / 2));

            this.ctx.beginPath();
            this.ctx.rect(startPointX, this.ctx.canvas.height * -2, this.thickness, this.ctx.canvas.height * 5);
            this.ctx.closePath();

            this.ctx.fill();
        }

        this.ctx.restore();
    }
}