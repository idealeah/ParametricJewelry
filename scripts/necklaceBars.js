var drawPath, drawPath2;

var num = 0;

var clickCount = 0;

var startPoint = new Point(200, 10);
var linkSize = new Size(400, 70);
var difference = 40;
var linkDepth = 30;
var linkNum = 2;

var allGroup = new Group();

var blue = new Color(0, 0, 1);

var rect = new Path.Rectangle(startPoint, linkSize);
rect.fillColor = "#999999";

rect.strokeWidth = 2;
//rect.strokeColor= 'black;'

var startPoint2 = new Point(startPoint.x, startPoint.y + linkSize.height + 50);
var linkSize2 = new Size(linkSize.width, linkSize.height + difference);
var rect2 = new Path.Rectangle(startPoint2, linkSize2);
rect2.fillColor = "#000033";

rect2.strokeWidth = 2;

window.globals = {};
/*
var text = new PointText(new Point(30, 50));
text.fontFamily = "Trebuchet MS";
text.fillColor = 'black';
text.fontSize = 25;

// Set the content of the text item:
text.content = 'Select your cube width, and then draw in the box to create a tab shape.';

var text2 = new PointText(new Point(30, 90));
text2.fontFamily = "Trebuchet MS";
text2.fillColor = 'black';
text2.fontSize = 25;

// Set the content of the text item:
text2.content = 'Press "p" to create your file and "s" to download the file.';
*/
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
      strokeColor: "#0000CD",
      // Select the path, so we can see its segment points:
      fullySelected: true
    });
  }

  if (clickCount == 2) {
    // Create a new path and set its stroke color to black:
    drawPath2 = new Path({
      segments: [event.point],
      strokeColor: blue,
      // Select the path, so we can see its segment points:
      fullySelected: true
    });
  }
}

// While the user drags the mouse, points are added to the path
// at the position of the mouse:
function onMouseDrag(event) {
  if (clickCount == 1) {
    drawPath.add(event.point);
  }

  if (clickCount == 2) {
    drawPath2.add(event.point);
  }
}

// When the mouse is released, we simplify the path:
function onMouseUp(event) {
  if (clickCount == 1) {
    // When the mouse is released, simplify it:
    drawPath.simplify(50);
    drawPath.flatten(20);
    drawPath.smooth();
    //drawPath.closed = true;
    drawPath.fillColor = "#C6E2FF";
    //drawPath.strokeColor= 'blue';
    drawPath.selected = false;

    //console.log(rect);
    drawPath.scale(linkSize.width / drawPath.bounds.width / 1.2, 1);
    drawPath.position = rect.bounds.bottomCenter;
    drawPath.add(rect.bounds.topRight, rect.bounds.topLeft);
    drawPath.closed = true;

    rect.removeSegments();
  }

  if (clickCount == 2) {
    // When the mouse is released, simplify it:
    drawPath2.simplify(50);
    drawPath2.flatten(20);
    drawPath2.smooth();
    //drawPath2.closed = true;
    drawPath2.fillColor = "	#FFD700";
    //drawPath2.strokeColor= 'blue';
    drawPath2.selected = false;

    drawPath2.scale(linkSize.width / drawPath2.bounds.width / 1.2, 1);
    drawPath2.position = rect2.bounds.bottomCenter;
    drawPath2.add(rect2.bounds.topRight, rect2.bounds.topLeft);
    drawPath2.closed = true;

    rect2.removeSegments();
    drawPath2.translate(0, -linkSize.height - 50);
    drawPath2.sendToBack();
  }
}

function onKeyDown(event) {
  if (event.key === "s") {
    downloadAsSVG();
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

globals.reset = function () {
  drawPath.removeSegments();
  drawPath2.removeSegments();

  num = 0;

  clickCount = 0;

  startPoint = new Point(200, 10);
  linkSize = new Size(400, 70);
  difference = 40;
  linkDepth = 30;
  linkNum = 2;

  allGroup = new Group();

  rect = new Path.Rectangle(startPoint, linkSize);
  rect.fillColor = "#C6E2FF";
  rect.strokeColor = "black";
  rect.strokeWidth = 2;
  //rect.strokeColor= 'black;'

  startPoint2 = new Point(startPoint.x, startPoint.y + linkSize.height + 50);
  linkSize2 = new Size(linkSize.width, linkSize.height + difference);
  rect2 = new Path.Rectangle(startPoint2, linkSize2);
  rect2.fillColor = "	#FFD700";
  rect2.strokeColor = "black";
  rect2.strokeWidth = 2;
};

globals.prepare = function () {
  for (i = 0; i < linkNum; i++) {
    var topSection = drawPath.clone();
    var bottomSection = drawPath2.clone();
    topSection.scale(1, -1);
    bottomSection.translate(0, drawPath.bounds.height + linkDepth);

    var topRect = new Path.Rectangle(
      topSection.bounds.bottomLeft,
      bottomSection.bounds.topRight
    );
    topRect.fillColor = "#C6E2FF";
    topRect.strokeColor = blue;

    /*var circle = new Path.Circle(topRect.bounds.rightCenter, linkDepth/2);
          circle.fillColor = "yellow";
          var circle2 = circle.clone();
          circle2.position.x = topRect.bounds.leftCenter.x;*/

    var combo1 = topSection.unite(topRect);
    var combo2 = combo1.unite(bottomSection);
    combo2.strokeColor = blue;
    topSection.remove();
    bottomSection.remove();
    topRect.remove();

    var inset = 20;
    var cutLineTop = new Point(
      topSection.bounds.bottomLeft.x + inset,
      topSection.bounds.bottomLeft.y
    );
    var cutLineBottom = new Point(
      bottomSection.bounds.topLeft.x + inset,
      bottomSection.bounds.topLeft.y
    );
    var cutLine = new Path.Line(cutLineTop, cutLineBottom);
    cutLine.strokeColor = blue;

    var cutLine2 = cutLine.clone();
    cutLine2.position.x += topRect.bounds.width - inset * 2;

    var linkGroup = new Group(
      topSection,
      bottomSection,
      topRect,
      cutLine,
      cutLine2
    );
    linkGroup.position.y += i * (linkGroup.bounds.height + 10);
    //console.log(linkGroup);

    var linkArm;
    if (i % 2 !== 0) {
      var armLength = 150;
      var offset = 7;
      var armWidth = linkDepth - offset;
      var linkArmLength = new Point(
        topRect.bounds.topLeft.x - armLength,
        topRect.bounds.topLeft.y + offset
      );
      var linkArmLength2 = new Point(
        topRect.bounds.topLeft.x - armLength,
        linkArmLength.y + armWidth - offset
      );
      linkArm = new Path(
        topRect.bounds.topLeft,
        linkArmLength,
        linkArmLength2,
        topRect.bounds.bottomLeft
      );
      linkArm.closed = true;
      linkArm.fillColor = "#C6E2FF";
      linkArm.strokeColor = blue;

      linkArm2 = linkArm.clone();
      linkArm2.scale(-1, 1);
      linkArm2.position.x += topRect.bounds.width + linkArm2.bounds.width;

      linkGroup.addChild(linkArm);

      topSection.scale(-1, 1);
      bottomSection.scale(-1, 1);
    }

    drawPath.remove();
    drawPath2.remove();
  }
}