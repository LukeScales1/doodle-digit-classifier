// if (document.readyState === "complete") { init(); }
window.onload = () => {
	const canvas = document.getElementById('doodle-pad');
	canvas.addEventListener('mousedown', () => {
		console.log("it's touching me!");
	})
}

