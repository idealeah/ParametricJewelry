var drawPath;
var path2;

window.globals = {}

var size = new Size(250, 250);

var innerPath;
var num = 0;

var angleInset = 10;
var boxHeight = 75;
window.boxWidth = 50;

var centerPoint = new Point(200, 130);
var centerStart = centerPoint;
window.numCubes = 3;
var chainLength = 4;
var chain = 'true';

var blue = new Color(0, 0, 1);

var xPos = centerPoint.x;

var clickCount = 0;

var rect = new Path.Rectangle(centerPoint, size);
rect.strokeColor = 'black';
rect.fillColor = '#FFD700';
rect.strokeWidth = 3;

window.drawPath;
/*
var text = new PointText(new Point(30, 40));
text.fontFamily = "Trebuchet MS";
text.fillColor = 'black';
text.fontSize = 25;

// Set the content of the text item:
text.content = 'Select your cube width, and then draw in the box to create a tab shape.';

var text2 = new PointText(new Point(30, 75));
text2.fontFamily = "Trebuchet MS";
text2.fillColor = 'black';
text2.fontSize = 25;

// Set the content of the text item:
text2.content = 'Press "p" to create your file and "s" to download the file.';
*/
var textX = new PointText(new Point(30, 40));
textX.fillColor = 'black'
textX.fontWeight = 'bold';
textX.fontFamily = "Trebuchet MS";
textX.fontSize = 20;

// Set the content of the text item:
//textX.content = 'Cube width is ' + boxWidth + '. Press "1" to subtract or "2" to add.';

var textNum = new PointText(new Point(30, 65));
textNum.fillColor = 'black'
textNum.fontWeight = 'bold';
textNum.fontFamily = "Trebuchet MS";
textNum.fontSize = 20;

// Set the content of the text item:
//textNum.content = 'There will be ' + numCubes + ' cubes. Press "3" to subtract or "4" to add.';

function onMouseDown(event) {

    clickCount++;
    console.log(clickCount);

    // If we produced a path before, deselect it:
    if (drawPath) {
        drawPath.selected = false;
    }

    if (clickCount == 1) {
        // Create a new path and set its stroke color to black:
        drawPath = new Path({
            segments: [event.point],
            strokeColor: '#0000CD',
            // Select the path, so we can see its segment points:
            fullySelected: true
        });
    }

}
// While the user drags the mouse, points are added to the path
// at the position of the mouse:
function onMouseDrag(event) {
    if (num === 0) {
        drawPath.add(event.point);
    }
}

// When the mouse is released, we simplify the path:
function onMouseUp(event) {
    simplifyPath();
}


globals.printPrep = function () {
    project.activeLayer.removeChildren();
    rect.remove();
    boxHeight = 75;
    angleInset = 10;
    console.log(centerPoint);
    centerPoint.x = 200;
    centerPoint.y = 130;
    console.log(centerPoint);
    xPos = centerPoint.x;

    //describe box basic
    var box = new Rectangle(centerPoint, new Size(boxWidth, boxHeight));
    console.log(box);
    var upperLeft = new Point(box.topLeft);
    var upperRight = new Point(box.topRight);
    var lowerRight = new Point(box.bottomRight.x - angleInset, box.bottomRight.y);
    var lowerLeft = new Point(box.bottomLeft.x + angleInset, box.bottomLeft.y);
    var boxBoundary = new Path.Line(upperLeft, upperRight);
    boxBoundary.add(lowerRight, lowerLeft);
    boxBoundary.closed = true;
    boxBoundary.strokeColor = blue;

    //create cube group
    var centerCubes = new Group();
    var details = new Group();

    //repeating for all central cubes
    for (n = 0; n < numCubes; n++) {

        //draw cubes
        var center = new Path.Rectangle(box);
        center.strokeColor = blue;
        var offsetHeight = 0;
        var prevCenter = center.bounds.width;

        //scale up every other cube
        if (n % 2 != 0) {
            center.scale(1.25, 1);
        }
        var currCenter = center.bounds.width;
        var offset = (currCenter - prevCenter) / 2;
        xPos += center.bounds.width;

        center.position.x = xPos - offset;

        //draw detail from user input onto cubes
        detailDraw = drawPath2.clone();
        detailDraw.scale(1, -1);
        if (n % 2 != 0) {
            detailDraw.scale(-1, 1);
        }
        detailDraw.position.x = xPos - offset;
        var xScale = boxWidth / 3 / detailDraw.bounds.width;
        var yScale = boxHeight / detailDraw.bounds.height;
        detailDraw.scale(xScale, yScale);
        detailDraw.position.y = (centerStart.y) - (detailDraw.bounds.height / 2);

        if (n == 0) {
            centerPoint = center.bounds.leftCenter;
            //console.log(centerPoint);
        }

        //add each element to groups
        centerCubes.addChild(center);
        details.addChild(detailDraw);

        //draw the polygons to create the cubes
        for (i = 0; i < 5; i++) {
            var height2 = boxBoundary.bounds.height;
            boundary2 = boxBoundary.clone();

            //flip vertical
            if (i % 2 != 0) {
                boundary2.scale(1, -1);
            }
            if (n % 2 != 0) {
                boundary2.scale(1.25, 1);
            }

            //tabs on bottom
            if (i == 4) {
                var prevHeight = boundary2.bounds.height;
                //boundary2.position.x -= 40;
                boundary2.scale(.25, .4);
                // console.log(boundary2.position.x);
                // var tab2 = boundary2.clone();
                //tab2.position.x += 80;
                //console.log(tab2.position.x);

                var currHeight = boundary2.bounds.height;

                offsetHeight = (prevHeight - currHeight) / 2;
            }

            boundary2.position.y += height2 + height2 * i - offsetHeight;
            boundary2.position.x = xPos - offset;

            //add to group
            centerCubes.addChild(boundary2);
        }

        //xPos += center.bounds.width;

        var lineCenter = new Point(center.bounds.bottomCenter);
        var tabLineLeft = new Point(lineCenter.x - boundary2.bounds.width / 2 + 5, lineCenter.y);
        var tabLineRight = new Point(lineCenter.x + boundary2.bounds.width / 2 + 5, lineCenter.y);
        var tabLine = new Path(tabLineLeft, tabLineRight);
        tabLine.strokeColor = blue;
        console.log(tabLine);

        var drawLineLeft = new Point(lineCenter.x - detailDraw.bounds.width / 2 + 5, lineCenter.y + boxHeight * 2);
        var drawLineRight = new Point(lineCenter.x + detailDraw.bounds.width / 2 + 5, lineCenter.y + boxHeight * 2);
        var tabLine = new Path(drawLineLeft, drawLineRight);
        tabLine.strokeColor = blue;
        console.log(tabLine);

    }

    centerCubes.fillColor = "#C6E2FF";
    centerCubes.noStroke;
    boxBoundary.remove();
    drawPath2.remove();
    textX.remove();
    textNum.remove();

    /*
    var move = centerPoint.x;
    var chain = new CompoundPath();

    //draw side chains
    for (n = 0; n < chainLength; n++){
        var chainSection = new Path.RegularPolygon({
            radius: 100- n*7,
            center: centerPoint,
            sides: 6,
            strokeColor: 'black',
        });

        chainSection.position.x = move -chainSection.bounds.width/2;
        move -= chainSection.bounds.width;
        //console.log(move);

        chain.addChild(chainSection);
    }

    chain.fillColor = 'black';

    //var chainScale = chain.bounds.height/boxHeight;
    //console.log(chainScale);
    var leftBound = centerCubes.bounds.topRight.x;
    console.log(centerCubes);

    var rightChain = chain.clone();
    rightChain.scale(-1, 1);
    rightChain.position.x = leftBound + chain.bounds.width/2;

    details.fillColor = 'blue';
    details.bringToFront();*/
}

function simplifyPath() {
    if (drawPath.segments.length > 1) {
        console.log(drawPath.segments.length);
        // When the mouse is released, simplify it:
        drawPath.simplify(50);
        drawPath.flatten(20);
        drawPath.smooth();
        drawPath.closed = true;
        drawPath.fillColor = '#C6E2FF';
        drawPath.selected = false;

        //make a flat top
        var flatPoint = drawPath.bounds.topLeft;
        var flatSize = new Size(drawPath.bounds.width * 2, 20);
        var flatBox = new Path.Rectangle(flatPoint - 20, flatSize);
        drawPath2 = drawPath.subtract(flatBox);
        drawPath.removeSegments();
        flatBox.remove();
    }
}

globals.downloadAsSVG = function (fileName) {
    // use default name if not provided
    fileName = fileName || "output.svg";

    // create a data url of the file
    var svgData = project.exportSVG({
        asString: true
    });
    var url = "data:image/svg+xml;utf8," + encodeURIComponent(svgData);

    // create a link to the data, and "click" it
    var link = document.createElement("a");
    link.download = fileName;
    link.href = url;
    link.click();
}

globals.reDraw = function () {
    console.log(drawPath2);
    if (drawPath2.segments) {
        drawPath2.removeSegments();
    } else {
        drawPath2.removeChildren();
    }
}




function onKeyDown(event) {
    // if (event.key === 's') {
    //     globals.downloadAsSVG();
    // }

    // if (event.key === 'p') {
    //     globals.printPrep();
    // }

    // if (event.key === '2') {
    //     //boxWidth += 5;

    //     // // Set the content of the text item:
    //     // textX.content = 'Cube width is ' + boxWidth + '. Press "1" to subtract or "2" to add.';
    //     // console.log("yes");
    // }
    // if (event.key === '1') {
    //     //boxWidth -= 5;
    //     // textX.content = 'Cube width is ' + boxWidth + '. Press "1" to subtract or "2" to add.';
    //     // console.log("no");
    // }
    // if (event.key === '3') {
    //     // numCubes -= 1;

    //     // // Set the content of the text item:
    //     // textNum.content = 'There will be ' + numCubes + ' cubes. Press "3" to subtract or "4" to add.';
    //     // console.log("yes");
    // }
    // if (event.key === '4') {
    //     // numCubes += 1;
    //     // textNum.content = 'There will be ' + numCubes + ' cubes. Press "3" to subtract or "4" to add.';
    //     // console.log("no");
    // }

}