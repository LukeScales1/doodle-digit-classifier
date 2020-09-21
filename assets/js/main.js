let drawing = false;
const sketch = {
	x: [],
	y: []
}

window.onload = () => {
	const canvas = document.getElementById('doodle-pad');
	const ctx = canvas.getContext('2d');
	ctx.fillStyle = '#fff';
	ctx.lineJoin = 'round';
	ctx.lineWidth = '12';

	canvas.addEventListener('mousedown', (e) => {
		drawing = true;
		console.log("it's touching me!");
		const xval = e.pageX - canvas.offsetLeft;
		const yval = e.pageY - canvas.offsetTop;

		console.log(`${xval} ${yval}`);
		sketch.x.push(xval);
		sketch.y.push(yval);

	});

	drawDoodle = () => {
		for (let i = 0; i < sketch.x.length-1; i++) {
			if (sketch.x[i+1]) {
				ctx.beginPath();
				ctx.moveTo(sketch.x[i], sketch.y[i]);
				ctx.lineTo(xval, yval);
				ctx.closePath();
				ctx.stroke();
			}
			
		}
	}

}
