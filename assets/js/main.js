let drawing = false;

const prev = {
	x: null,
	y: null
};
const curr = {...prev};

let ctx;
let model;
let newDoodle = false;

window.onload = () => {
	tf.loadLayersModel("http://localhost:8080/model/saved_model/1600990812/model.json")
		.then(r => {
			model = r;
			console.log('MNIST model loaded!', r);
			})
		.catch(e => console.log('Error loading model', e));

	const canvas = document.getElementById('doodle-pad');
	ctx = canvas.getContext('2d');
	ctx.strokeStyle = '#ffffff';
	ctx.lineJoin = 'round';
	ctx.lineWidth = '12';

	const resultBox = document.getElementById('results-box');
	const result = document.getElementById('result');

	canvas.addEventListener('mousedown', (e) => {
		// if (newDoodle) clearDoodle();
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
		hideResults();
		newDoodle = false;
	}

	predictDoodle = async () => {
		const tensor = tf.browser
			.fromPixels(canvas)
			.resizeNearestNeighbor([28, 28])
			.mean(2)
			.expandDims(2)
			.expandDims()
			.toFloat()
			.div(255.0);

		const predictions = await model.predict(tensor).data();
		newDoodle = true;
		const bestGuess = await tf.argMax(predictions).data();
		showResults(bestGuess[0]);
	}

	showResults = (x) => {
		result.textContent = x;
		resultBox.classList.remove('hide');
	}

	hideResults = () => {
		resultBox.classList.add('hide');
	}
}
