let drawing = false;

const prev = {
	x: 0,
	y: 0
};
const curr = {...prev};

window.onload = () => {
	const canvas = document.getElementById('doodle-pad');
	const ctx = canvas.getContext('2d');
	ctx.strokeStyle = '#ffffff';
	ctx.lineJoin = 'round';
	ctx.lineWidth = '12';

	canvas.addEventListener('mousedown', (e) => {
		drawing = true;

		updateCoordinates(e);
	});

	canvas.addEventListener('mousemove', (e) => {
		if (drawing === true) {
			updateCoordinates(e);
		}
	});

	canvas.addEventListener('mouseup', (e) => {
		if (drawing === true) {
			updateCoordinates(e);
			drawing = false;
		}
	});

	updateCoordinates = (e) => {
		prev.x = curr.x;
		prev.y = curr.y;
		curr.x = e.clientX - canvas.offsetLeft;
		curr.y = e.clientY - canvas.offsetTop;

		drawDoodle();
	}

	drawDoodle = () => {
		console.log('drawing', curr, prev);
		ctx.beginPath();
		ctx.moveTo(prev.x, prev.y);
		ctx.lineTo(curr.x, curr.y);
		ctx.closePath();
		ctx.stroke();
	}
}
