let drawing = false;

const prev = {
	x: null,
	y: null
};
const curr = {...prev};

let ctx;

window.onload = () => {
	const canvas = document.getElementById('doodle-pad');
	ctx = canvas.getContext('2d');
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
		stopDrawing(e);
	});

	canvas.addEventListener('mouseout', (e) => {
		stopDrawing(e);
	});

	stopDrawing = (e) => {
		if (drawing === true) {
			updateCoordinates(e);
			drawing = false;
			curr.x = curr.y = null;
		}
	}

	updateCoordinates = (e) => {
		prev.x = curr.x ?? e.clientX - canvas.offsetLeft;
		prev.y = curr.y ?? e.clientY - canvas.offsetTop;
		curr.x = e.clientX - canvas.offsetLeft;
		curr.y = e.clientY - canvas.offsetTop;

		drawDoodle();
	}

	drawDoodle = () => {
		ctx.beginPath();
		ctx.moveTo(prev.x, prev.y);
		ctx.lineTo(curr.x, curr.y);
		ctx.closePath();
		ctx.stroke();
	}

	clearDoodle = () => {
		ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
	}

	predictDoodle = async () => {
		// const tf = require("@tensorflow/tfjs");
		// const tfn = require("@tensorflow/tfjs-node");
		// const handler = tfn.io.fileSystem("model/saved_model/1600990812/model.json");
		// const model = await tf.loadModel(handler);
		const model = await tf.loadLayersModel("http://localhost:8080/model/saved_model/1600990812/model.json");
		console.log('MNIST model loaded!', model);

	}
}
