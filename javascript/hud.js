function handleHud() {
    let ctx = engine.context;
    let x;
    let y;
    let radius = (engine.canvas.width / engine.canvas.height) * 50;

    ctx.save();
    
    //Speedometer
    ctx.lineWidth = 3;
    ctx.fillStyle = "#ffffff99";

    ctx.beginPath();
    ctx.arc(engine.canvas.width - (engine.canvas.width / 8), engine.canvas.height - (engine.canvas.height / 8), radius, 6 * Math.PI / 8, 18 * Math.PI / 8);
    ctx.stroke();
    ctx.fill();
    ctx.closePath();

    ctx.strokeStyle = "#ff0000";

    ctx.beginPath();
    let angle = (10 * Math.PI / 8) + (((engine.vx + engine.vy) / engine.maxVelocity) * 8) * (Math.PI / 5.35);
    let sineAngle = Math.sin(angle);
	let cosAngle = -Math.cos(angle);
	let pointX = sineAngle * radius;
	let pointY = cosAngle * radius;
    
    ctx.translate(engine.canvas.width - (engine.canvas.width / 8), engine.canvas.height - (engine.canvas.height / 8));
    ctx.moveTo(0, 0);
    ctx.lineTo(pointX,pointY);
    ctx.stroke();
    ctx.closePath();

    ctx.restore();

    //Lives
    let scale = (engine.canvas.width / engine.canvas.height) * 0.018;
    let img = new Image();
    img.src = "assets/red-sports-car-top-view.svg";
    let topLeft = new Point((img.width * scale) / 2, (img.height * scale) / 2);
    let centerDrawPoint = new Point(engine.canvas.width - (engine.canvas.width / 8), engine.canvas.height - (engine.canvas.height / 6.5));

    for (var i = -2; i <= engine.lives - 3; i++) {
        ctx.drawImage(img, centerDrawPoint.x + ((topLeft.x * 2) * i) - topLeft.x, centerDrawPoint.y - topLeft.y, topLeft.x * 2, topLeft.y * 2);
    }
}