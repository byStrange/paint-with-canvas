$canvas.width = window.innerWidth;
$canvas.height = window.innerHeight - $tools.getBoundingClientRect().height;

const context = $canvas.getContext('2d');
let firstColor = 'white'
context.fillStyle = firstColor;
context.fillRect(0, 0, $canvas.width, $canvas.height)

let draw_color = 'black';
let draw_width = '2';
let isDrawing = false;
let restore_array = [];
let index = -1;

function change_color(el) {
    draw_color = el.style.background;
}

$canvas.addEventListener('touchstart', start, false);
$canvas.addEventListener('touchmove', draw, false);
$canvas.addEventListener('mousedown', start, false);
$canvas.addEventListener('mousemove', draw, false);
$canvas.addEventListener('touchend', stop, false);
$canvas.addEventListener('mouseup', stop, false);
$canvas.addEventListener('mouseout', stop, false);

function start(event) {
    isDrawing = true;
    context.beginPath();
    context.moveTo(event.clientX - $canvas.offsetLeft,
        event.clientY - $canvas.offsetTop);
    event.preventDefault();
};

function draw(e) {
    if (isDrawing) {
        context.lineTo(
            e.clientX - $canvas.offsetLeft,
            e.clientY - $canvas.offsetTop
        )
        context.strokeStyle = draw_color;
        context.lineWidth = draw_width;
        context.lineCap = 'round';
        context.lineJoin = 'round';
        context.stroke();
    }
}

function stop(event) {
    if (isDrawing) {
        context.stroke();
        context.closePath();
        isDrawing = false
    }
    event.preventDefault();

    if (event.type != 'mouseout') {
        restore_array.push(context.getImageData(0, 0, $canvas.width, $canvas.height));
        index += 1;
    }
    log(restore_array)
}

function clear_canvas() {
    context.fillStyle = firstColor;
    context.clearRect(0, 0, $canvas.width, $canvas.height);
    context.fillRect(0, 0, $canvas.width, $canvas.height);
    restore_array = [];
    index += 1;
}
function undo() {
	if( index <= 0) {
		clear_canvas()
	}
	else {
		index -= 1;
		restore_array.pop();
		context.putImageData(restore_array[index], 0,0);
	}
}