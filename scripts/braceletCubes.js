var drawPath, drawPath2;

var num = 0;

var clickCount = 0;

var startPoint = new Point(70, 70);
mainRectSize = new Size(70, 140);
console.log(mainRectSize);

var tabInset = 10.7;
var tabWidth = mainRectSize.height - tabInset * 2;

window.wallNum = 3;
var wallWidth = 5.25;

var dotNum = 10;
window.dotSides = 3;
var dotRadius = 10.5;

var taper = 24.5;

var blue = new Color(0, 0, 1);

var shapes = new Group();

var allGroup = new Group();
window.dotTest = true;

window.globals = {}
/*
var text = new PointText(new Point(30, 30));
var text = new PointText(new Point(30, 40));
text.fontFamily = "Trebuchet MS";
text.fillColor = 'black';
text.fontSize = 25;

// Set the content of the text item:
text.content = 'Select your cube width. Press "p" to create your file and "s" to download the file.';

var text2 = new PointText(new Point(30, 120));
text2.fillColor = 'black'
text2.fontWeight= 'bold';
text2.fontFamily = "Trebuchet MS";
text2.fontSize = 25;

// Set the content of the text item:
//text2.content = 'Press "3", "4", or "5" to select triangle, square, or pentagon shaped cutouts.';
*/
// var text3 = new PointText(new Point(30, 65));
// text3.fillColor = "black";
// text3.fontWeight = "bold";
// text3.fontFamily = "Trebuchet MS";
// text3.fontSize = 20;

// // Set the content of the text item:
// text3.content = "Cutout shape is a triangle.";

// var textX = new PointText(new Point(30, 40));
// textX.fillColor = "black";
// textX.fontWeight = "bold";
// textX.fontFamily = "Trebuchet MS";
// textX.fontSize = 20;

// // Set the content of the text item:
// textX.content =
//   "Cube side length is " +
//   mainRectSize.width +
//   '. Press "1" to subtract or "2" to add.';

//rect.strokeColor= 'black;'
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
}

// While the user drags the mouse, points are added to the path
// at the position of the mouse:
function onMouseDrag(event) {
  if (clickCount == 1) {
    drawPath.add(event.point);
  }
}

// When the mouse is released, we simplify the path:
function onMouseUp(event) {
  if (clickCount == 1) {
    // When the mouse is released, simplify it:
    drawPath.simplify(50);
    drawPath.flatten(20);
    //drawPath.smooth();
    //drawPath.closed = true;
    drawPath.fillColor = "#0000CD";
    //drawPath.strokeColor= 'blue';
    drawPath.selected = false;

    //console.log(rect);
    //drawPath.scale(linkSize.width/drawPath.bounds.width/1.2, 1);
    //drawPath.position = (rect.bounds.bottomCenter);
    //drawPath.add(rect.bounds.topRight, rect.bounds.topLeft);
    drawPath.closed = true;

    //rect.remove();
  }
}

function onKeyDown(event) {
  // if (event.key === "s") {
  //   globals.downloadAsSVG();
  // }

  // if (event.key === "p") {
  //   globals.printPrep();
  // }

  // if (event.key === "2") {
  //   mainRectSize.width += 5;
  //   // Set the content of the text item:
  //   textX.content =
  //     "Cube side length is " +
  //     mainRectSize.width +
  //     '. Press "1" to subtract or "2" to add.';
  // }
  // if (event.key === "1") {
  //   mainRectSize.width -= 5;
  //   textX.content =
  //     "Cube side length is " +
  //     mainRectSize.width +
  //     '. Press "1" to subtract or "2" to add.';
  // }

  // if (event.key === "3") {
  //   //text3.content = "Cutout shape is a triangle.";
  //   window.dotTest = true;
  //   dotSides = 3;
  // }
  // if (event.key === "4") {
  //   //text3.content = "Cutout shape is a square.";
  //   window.dotTest = true;
  //   dotSides = 4;
  // }
  // if (event.key === "5") {
  //   // text3.content = "Cutout shape is a pentagon.";
  //   window.dotTest = true;
  //   dotSides = 5;
  // }
  // if (event.key === "6") {
  //   //  text3.content = "No cutouts.";
  //   window.dotTest = false;
  // }
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

globals.printPrep = function () {
  project.activeLayer.removeChildren();
  var rect = new Path.Rectangle(startPoint, mainRectSize);
  rect.fillColor = "#C6E2FF";

  var linkWidth = rect.bounds.width / 3;

  var cutLinePoint = new Point(
    rect.bounds.topLeft.x + linkWidth,
    rect.bounds.topLeft.y + tabInset
  );
  var cutLinePoint2 = new Point(
    rect.bounds.topLeft.x + 2 * linkWidth,
    rect.bounds.topLeft.y + tabInset
  );
  var cutLinePointBot = new Point(
    rect.bounds.topLeft.x + linkWidth,
    rect.bounds.topLeft.y + rect.bounds.height - tabInset
  );
  var cutLinePointBot2 = new Point(
    rect.bounds.topLeft.x + 2 * linkWidth,
    rect.bounds.topLeft.y + rect.bounds.height - tabInset
  );

  var cutLine = new Path.Line(cutLinePoint, cutLinePointBot);
  cutLine.strokeColor = blue;
  var cutLine2 = new Path.Line(cutLinePoint2, cutLinePointBot2);
  cutLine2.strokeColor = blue;

  var linkRectTopRight = new Point(
    cutLinePoint2.x + linkWidth,
    cutLinePoint2.y
  );
  var linkRectBottomLeft = new Point(
    cutLinePoint2.x + linkWidth * 2,
    cutLinePointBot2.y
  );
  var linkRect = new Path.Rectangle(linkRectTopRight, linkRectBottomLeft);
  linkRect.fillColor = "#C6E2FF";

  var linkRect2 = linkRect.clone();
  linkRect2.position.x += linkWidth;
  var linkRect3 = linkRect.clone();
  linkRect3.position.x += linkWidth * 2;

  var tabLength = tabWidth * wallNum;

  var cubeCutTop = new Point(
    linkRect3.bounds.topRight.x,
    linkRect3.bounds.topRight.y + taper
  );
  var cubeCutBottom = new Point(
    linkRect3.bounds.bottomRight.x,
    linkRect3.bounds.bottomRight.y - taper
  );
  var cubeCutLine = new Path(cubeCutTop, cubeCutBottom);
  cubeCutLine.strokeColor = blue;

  var taperRectRTop = new Point(
    cubeCutTop.x + tabLength,
    cubeCutTop.y - taper / 2
  );
  var taperRectRBottom = new Point(
    cubeCutBottom.x + tabLength,
    cubeCutBottom.y + taper / 2
  );
  var taperRect = new Path(
    linkRect3.bounds.topRight,
    taperRectRTop,
    taperRectRBottom,
    linkRect3.bounds.bottomRight
  );
  taperRect.closed = true;
  taperRect.fillColor = "#C6E2FF";

  var tabEndCutIn = new Point(taperRectRTop.x, taperRectRTop.y + taper / 2);
  var tabEndCut1 = new Path.Line(taperRectRTop, tabEndCutIn);
  tabEndCut1.strokeColor = blue;

  var tabEndCut2 = tabEndCut1.clone();
  tabEndCut2.position.y += taperRect.bounds.height - taper * 1.5;

  console.log(taperRect);
  var endTop = new Point(taperRectRBottom.x, taperRectRBottom.y);
  var endBot = new Point(taperRectRTop.x, taperRectRTop.y);
  var endMid = new Point(
    taperRect.bounds.rightCenter.x + linkWidth,
    taperRect.bounds.rightCenter.y
  );
  var endShape = new Path(endTop, endMid, endBot);
  endShape.closed = true;
  endShape.fillColor = "#C6E2FF";

  var combo1 = endShape.unite(taperRect);
  var combo2 = combo1.unite(linkRect3);
  var combo3 = combo2.unite(linkRect2);
  var combo4 = combo3.unite(linkRect);
  var combo5 = combo4.unite(rect);
  combo1.remove();
  combo2.remove();
  combo3.remove();
  combo4.remove();
  rect.remove();
  linkRect.remove();
  linkRect2.remove();
  linkRect3.remove();
  taperRect.remove();
  endShape.remove();

  var bendLines = new Group();

  for (var i = 1; i < wallNum; i++) {
    var bendLine = new Path.Line(
      linkRect3.bounds.topRight,
      linkRect3.bounds.bottomRight
    );
    bendLine.strokeColor = "red";
    bendLine.position.x += (taperRect.bounds.width / wallNum) * i;
    bendLines.addChild(bendLine);
  }

  var dots = new Group();
  if (window.dotTest == true) {

    for (
      var x = taperRect.bounds.topLeft.x + 17.5; x < taperRect.bounds.topRight.x - 14; x += dotRadius * 4
    ) {
      for (
        var y = taperRect.bounds.topLeft.y - 7; y < taperRect.bounds.bottomLeft.y + 21; y += dotRadius * 3
      ) {
        var dotCenter = new Point(x, y);
        var dot = new Path.RegularPolygon(dotCenter, dotSides, dotRadius);
        dot.rotate(Math.random() * 180);
        dot.fillColor = "black";
        dot.strokeColor = blue;
        dots.addChild(dot);
      }
    }
  }

  var group1 = new Group();
  group1.addChildren(dots, tabEndCut1, tabEndCut2, cutLine);

  /*console.log(dots.children.length);

      for (var k = 0; k < dots.children.length; k++){
          combo5.subtract(dots[i]);
          console.log("yes");
      }*/

  combo5.strokeColor = blue;
  combo5.sendToBack();

  for (i = 0; i < 3; i++) {
    var flip = combo5.clone();
    var dots2 = dots.clone();
    var cutLineA = cutLine.clone();
    var cutLineB = cutLine2.clone();
    var cutLineC = cubeCutLine.clone();
    var cutLineD = tabEndCut1.clone();
    var cutLineE = tabEndCut2.clone();
    var bendLines2 = bendLines.clone();
    cutLineC.position.y = i * (combo5.bounds.height + 17.5) + 119;
    cutLineA.position.y = i * (combo5.bounds.height + 17.5) + 119;
    cutLineB.position.y = i * (combo5.bounds.height + 17.5) + 119;
    cutLineD.position.y = i * (combo5.bounds.height + 17.5) + 119;
    cutLineE.position.y = i * (combo5.bounds.height + 17.5) + 119;
    bendLines2.position.y = i * (combo5.bounds.height + 17.5) + 119;
    flip.position.y = i * (combo5.bounds.height + 17.5) + 119;
    dots2.position.y = i * (combo5.bounds.height + 17.5) + 119;
  }

  bendLines.removeChildren();
  tabEndCut1.remove();
  tabEndCut2.remove();
  cubeCutLine.remove();
  cutLine.remove();
  cutLine2.remove();
  dots.removeChildren();
  combo5.remove();
  // text3.remove();
  // textX.remove();
  console.log(project);
}