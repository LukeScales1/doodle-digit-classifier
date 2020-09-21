let drawing = false;
const doodle = {
	x: [],
	y: []
}

window.onload = () => {
	const canvas = document.getElementById('doodle-pad');
	const ctx = canvas.getContext('2d');
	ctx.strokeStyle = '#ffffff';
	ctx.lineJoin = 'round';
	ctx.lineWidth = '12';

	canvas.addEventListener('mousedown', (e) => {
		drawing = true;
		
		addCoordinates(e);
	});

	canvas.addEventListener('mousemove', (e) => {
		if (drawing === true) {
			addCoordinates(e);
			drawDoodle();
		}
	});

	canvas.addEventListener('mouseup', (e) => {
		if (drawing === true) {
			addCoordinates(e);
			drawDoodle();
			drawing = false;
		}
	});

	addCoordinates = (e) => {
		const xval = e.clientX - canvas.offsetLeft;
		const yval = e.clientY - canvas.offsetTop;

		doodle.x.push(xval);
		doodle.y.push(yval);
	}

	drawDoodle = () => {
		for (let i = 0; i < doodle.x.length-1; i++) {
			if (doodle.x[i+1]) {
				console.log('drawing');
				ctx.beginPath();
				ctx.moveTo(doodle.x[i], doodle.y[i]);
				ctx.lineTo(doodle.x[i+1], doodle.y[i+1]);
				ctx.closePath();
				ctx.stroke();
			}
			
		}
	}

}
