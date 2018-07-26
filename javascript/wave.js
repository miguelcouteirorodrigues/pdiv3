class Wave {
    constructor(maxWaves) {
        this.ctx = engine.context;

        //canvas dimensions
        this.W = engine.canvas.width;
        this.H = engine.canvas.height;

        this.mp = maxWaves; //max waves
        this.waves = [];
        //for(var i = 0; i < this.mp; i++) {
        while(this.waves.length < this.mp) {
            this.waves.push({
                x: Math.random() * this.W, //x-coordinate
                y: Math.random() * this.H, //y-coordinate
                r: getRandomInt(10, 20),
                spikes: getRandomInt(3, 5)
            })
        }
    }

    draw() {
        this.ctx.save();
        this.ctx.translate(0, -engine.centerPoint.y);
        this.ctx.translate(-engine.centerPoint.x, -engine.centerPoint.y);
        this.ctx.strokeStyle = "#ffffff";
        this.ctx.lineWidth = 2;

        for (var i = 0; i < this.waves.length; i++) {
            var wave = this.waves[i];

            if(wave.y > this.ctx.canvas.width) {
                this.waves.splice(i, 1);
                continue;
            }

            wave.x += engine.vx;
            wave.y += engine.vy;
            
            this.ctx.beginPath();

            for (var j = 0; j < wave.spikes; j++) {
                if (j == 0) {
                    this.ctx.arc(wave.x + (2 * j * wave.r), wave.y, wave.r, Math.PI / 2, 2 * Math.PI, true);
                }
                else if (j == wave.spikes - 1) {
                    this.ctx.arc(wave.x + (2 * j * wave.r), wave.y, wave.r, Math.PI, Math.PI / 2, true);
                }
                else {
                    this.ctx.arc(wave.x + (2 * j * wave.r), wave.y, wave.r, Math.PI, 2 * Math.PI, true);
                }
            }
            
            this.ctx.stroke();
        }

        this.ctx.restore();
        this.handleWaves();
    }

    handleWaves() {
        while(this.waves.length < this.mp) {
            this.waves.push({
                x: Math.random() * this.W, //x-coordinate
                y: Math.random() * this.H, //y-coordinate
                r: getRandomInt(10, 20),
                spikes: getRandomInt(3, 5)
            })
        }
    }
}