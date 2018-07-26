class Obstacles {
    constructor() {
        this.ctx = engine.context;

        this.barrel = new Image();
        this.barrel.src = "assets/barrel.svg";

        this.zeroPoint = engine.road.zeroPoint;
        this.width = engine.road.width;
        this.objects = [];
    }

    draw() {
        this.ctx.save();

        this.handleObjects();

        for (var i = 0; i < this.objects.length; i++) {
            var object = this.objects[i];

            this.ctx.drawImage(object.object, object.x, object.y, object.object.width * object.scale, object.object.height * object.scale);
        }

        this.ctx.restore();
    }

    handleObjects() {
        while (this.objects.length < 3) {
            let item = getRandomInt(0, 0);

            let image;
            let scale;

            switch(item) {
                case 0:
                    image = this.barrel;
                    scale = (engine.canvas.width / engine.canvas.height) / 15;
                    break;
        
                default:
                    image = this.barrel;
                    scale = (engine.canvas.width / engine.canvas.height) / 15;
                    break;
            }

            let edges = [
                new Point((-image.width * scale) / 2, (-image.height * scale) / 2),
                new Point((image.width * scale) / 2, (-image.height * scale) / 2),
                new Point((-image.width * scale) / 2, (image.height * scale) / 2),
                new Point((image.width * scale) / 2, (image.height * scale) / 2)
            ];

            let x = getRandomInt(this.zeroPoint - (edges[0].x * 2.5), this.zeroPoint + this.width - (edges[1].x * 2.5));
            let y = (this.ctx.canvas.height * -2) - edges[0].y + getRandomInt(-100, 100);

            this.objects.push({
                //x: x - edges[0].x,
                x: x,
                y: y,
                object: image,
                scale: scale,
                edges: edges
            });
        }

        for (var i = 0; i < this.objects.length; i++) {
            let object = this.objects[i];

            object.y += engine.vy;

            if (object.y > engine.centerPoint.y / 6) {
                this.objects.splice(i, 1);
            }
        }
    }
}