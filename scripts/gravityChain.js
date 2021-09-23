let path;
let path2;
let Engine;
let engine;
let render;
let bridge;
let links = 10;
let World;
let world;
let group;
let xStart = 70;
let yStart = 200;
let xEnd = 800;
let yEnd = 200;
let canvas;
let lengths = [];
let totalLength;
let draw = true;
let decagon;

window.onload = function () {
    // // Get a reference to the canvas object
    canvas = document.getElementById("myCanvas");
    // // Create an empty project and a view for the canvas:
    paper.setup(canvas);

    let width = canvas.width;
    let height = canvas.height;
    console.log(width, height);

    // // Create a Paper.js Path to draw a line into it:
    path = new paper.Path({
        strokeColor: "#E4141B",
        strokeWidth: 45,
        strokeCap: "round"
    });

    path2 = new paper.Path({
        strokeColor: "black",
        strokeWidth: 10,
        strokeCap: "round"
    });

    // // Draw the view now:
    paper.view.draw();

    // module aliases
    (Engine = Matter.Engine), //manages simulation and updating
    (Render = Matter.Render), //renders for debugging
    (Runner = Matter.Runner), //updates the loop
    (Body = Matter.Body), //a rigid body
    (Composites = Matter.Composites), //common setups like chains, etc.
    (Common = Matter.Common),
    (Constraint = Matter.Constraint),
    (MouseConstraint = Matter.MouseConstraint),
    (Mouse = Matter.Mouse),
    (World = Matter.World),
    (Bodies = Matter.Bodies);

    // create an engine
    engine = Engine.create();
    world = engine.world;

    engine.world.gravity.y = 0.001;

    // create a renderer
    render = Render.create({
        element: document.body,
        engine: engine
    });

    // add bodies
    group = Body.nextGroup(true);

    //for (let i = links; )

    bridge = Composites.stack(160, 0, links, 1, 0, 0, function (x, y) {
        //return Bodies.rectangle(x - 60, yEnd, Math.random() * 110 + 60, 20, {
        return Bodies.rectangle(x - 60, yEnd, Math.random() * 70 + 30, 20, {
            collisionFilter: {
                group: group
            },
            chamfer: 10,
            density: 0.1,
            frictionAir: 0.12,
            render: {
                fillStyle: "#575375"
            }
        });
    });

    for (let i = 0; i < links; i++) {
        let length = bridge.bodies[i].bounds.max.x - bridge.bodies[i].bounds.min.x;
        console.log(length);
        lengths.push(length);
    }

    totalLength = lengths.reduce((a, b) => a + b, 0);

    Composites.chain(bridge, 0.5, 0, -0.5, 0, {
        stiffness: 0.2,
        length: 1,
        render: {
            visible: true
        }
    });

    World.add(world, [
        bridge,

        Constraint.create({
            pointA: {
                x: xStart,
                y: yStart
                // x: decagon.segments[0].point.x,
                // y: decagon.segments[0].point.y
            },
            bodyB: bridge.bodies[0],
            pointB: {
                x: -lengths[0] / 2,
                y: 0
            },
            length: 1,
            stiffness: .4
        }),
        Constraint.create({
            pointA: {
                x: xStart + totalLength,
                y: yEnd
                //x: decagon.segments[1].point.x,
                //y: decagon.segments[1].point.y
            },
            bodyB: bridge.bodies[bridge.bodies.length - 1],
            pointB: {
                x: lengths[links - 1] / 2,
                y: 0
            },
            length: 1,
            stiffness: 0.4
        })
    ]);

    // run the engine
    Engine.run(engine);

    // run the renderer
    //Render.run(render);

    // let firstPoint = new paper.Point(world.constraints[0].pointA);
    let lastPoint = new paper.Point(world.constraints[1].pointA);

    //
    for (let i = 0; i < links; i++) {
        linkPoint = new paper.Point(bridge.bodies[i].position);
        //console.log(linkPoint);

        path.add(linkPoint);
        path2.add(linkPoint);
    }

    path.add(lastPoint);
    path2.add(lastPoint);

    //setTimeout(shrink(70), 5000);
    //console.log(canvas);
};

document.addEventListener("mousedown", e => {
    //console.log(e.x, e.y);
    if (e.y < 100) {
        lineEdit();
    }
    if (e.y >= 100 && e.y < 500) {
        shrink(100);
    }
});

setInterval(update, 20);

function update() {
    Matter.Engine.update(engine);
    //console.log(path);

    if (draw == true) {
        for (let i = 0; i < links; i++) {
            path.segments[i].point = bridge.bodies[i].vertices[0];
            path2.segments[i].point = bridge.bodies[i].vertices[0];
        }

        path.lastSegment.point = world.constraints[1].pointA;
        path2.lastSegment.point = world.constraints[1].pointA;
    }

    path.smooth({
        type: "continuous"
    });
    path2.smooth({
        type: "continuous"
    });
}

function shrink(shrinkAmt) {
    console.log("shrink");
    for (let i = 0; i < shrinkAmt; i++) {
        //console.log(world.constraints[0].pointA);
        //console.log(world.constraints[1].pointA);
        world.constraints[0].pointA.x += 1;
        world.constraints[1].pointA.x -= 1;
    }
}

function lineEdit() {
    console.log("edit");

    var smallPath = path.splitAt(path.length / 4);
    var smallPath2 = path2.splitAt(path2.length / 4);

    smallPath.strokeColor = 'green';
    smallPath2.strokeColor = 'pink';


    var intersections = path2.getIntersections(path2);
    console.log(intersections);

    draw = false;
}

document.addEventListener("DOMContentLoaded", function (event) {
    document.getElementById("download-to-svg").onclick = function () {
        var fileName = "custom.svg";
        var url =
            "data:image/svg+xml;utf8," +
            encodeURIComponent(
                paper.project.exportSVG({
                    asString: true
                })
            );
        var link = document.createElement("a");
        link.download = fileName;
        link.href = url;
        link.click();
    };
});