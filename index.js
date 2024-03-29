/*Downloaded from https://www.codeseek.co/osublake/svg-blob-vdzjyg */

var blob1 = createBlob({
    element: document.querySelector("#path1"),
    numPoints: 90,
    centerX: 500,
    centerY: 500,
    minRadius: 300,
    maxRadius: 325,
    minDuration: 0.1,
    maxDuration: 0.2
});

var blob2 = createBlob({
    element: document.querySelector("#path2"),
    numPoints: 10,
    centerX: 500,
    centerY: 500,
    minRadius: 200,
    maxRadius: 225,
    minDuration: 0.75,
    maxDuration: 1.75
});

// To show the points
// createDots([blob1, blob2]);

function createBlob(options) {

    var points = [];
    var path = options.element;
    var slice = (Math.PI * 2) / options.numPoints;
    var startAngle = random(Math.PI * 2);

    var tl = new TimelineMax({
        onUpdate: update
    });

    for (var i = 0; i < options.numPoints; i++) {

        var angle = startAngle + i * slice;
        var duration = random(options.minDuration, options.maxDuration);

        var point = {
            x: options.centerX + Math.cos(angle) * options.minRadius,
            y: options.centerY + Math.sin(angle) * options.minRadius
        };

        var tween = TweenMax.to(point, duration, {
            x: options.centerX + Math.cos(angle) * options.maxRadius,
            y: options.centerY + Math.sin(angle) * options.maxRadius,
            repeat: -1,
            yoyo: true,
            ease: Sine.easeInOut
        });

        tl.add(tween, -random(duration));
        points.push(point);
    }

    options.tl = tl;
    options.points = points;

    function update() {
        path.setAttribute("d", cardinal(points, true, 1));
    }

    return options;
}

// Cardinal spline - a uniform Catmull-Rom spline with a tension option
function cardinal(data, closed, tension) {

    if (data.length < 1) return "M0 0";
    if (tension == null) tension = 1;

    var size = data.length - (closed ? 0 : 1);
    var path = "M" + data[0].x + " " + data[0].y + " C";

    for (var i = 0; i < size; i++) {

        var p0, p1, p2, p3;

        if (closed) {
            p0 = data[(i - 1 + size) % size];
            p1 = data[i];
            p2 = data[(i + 1) % size];
            p3 = data[(i + 2) % size];

        } else {
            p0 = i == 0 ? data[0] : data[i - 1];
            p1 = data[i];
            p2 = data[i + 1];
            p3 = i == size - 1 ? p2 : data[i + 2];
        }

        var x1 = p1.x + (p2.x - p0.x) / 6 * tension;
        var y1 = p1.y + (p2.y - p0.y) / 6 * tension;

        var x2 = p2.x - (p3.x - p1.x) / 6 * tension;
        var y2 = p2.y - (p3.y - p1.y) / 6 * tension;

        path += " " + x1 + " " + y1 + " " + x2 + " " + y2 + " " + p2.x + " " + p2.y;
    }

    return closed ? path + "z" : path;
}

function random(min, max) {
    if (max == null) { max = min; min = 0; }
    if (min > max) { var tmp = min; min = max; max = tmp; }
    return min + (max - min) * Math.random();
}



const btn = document.querySelector('#btn');
const close = document.querySelector('.close');
const blob = document.querySelector('#svg');
const overlay = document.querySelector('.overlay');
btn.addEventListener('click', () => {
    blob.classList.add('active');
    blob.style.transform = 'scale(50)';
    setTimeout(function () {
        blob.classList.remove('active');
        blob.classList.add('filled');
        overlay.classList.add('active');
    }, 500)
    // blob.style.top = ((parseInt(document.body.clientHeight) / 2) - (parseInt(blob.Height) / 2)) + 'px';
    // blob.style.left = ((parseInt(document.body.clientWidth) / 2) - (parseInt(blob.Width) / 2)) + 'px';
})
close.addEventListener('click', () => {
    overlay.classList.remove('active');
    blob.classList.add('active');
    blob.classList.remove('filled');
    setTimeout(function () {
        blob.style.transform = 'scale(1)';
    }, 500)
    // blob.classList.remove('filled');
    // blob.classList.add('closing');

})