$(function () {
    $("#slider").slider({
        min: 4,
        max: 10,
        value: 7,
        step: 1,
        slide: function (showNum) {
            let selection = $("#slider").slider("value");
            window.mainRectSize.width = selection * 10;
            console.log(window.mainRectSize.width);
            window.globals.printPrep();
        }
    });

    $("#download-to-svg").click(function () {
        window.globals.downloadAsSVG("braceletCubes");
    });

    $("#tri").click(function () {
        window.dotTest = true;
        window.dotSides = 3;
        window.globals.printPrep();
    });

    $("#sq").click(function () {
        window.dotTest = true;
        window.dotSides = 4;
        window.globals.printPrep();
    });

    $("#pent").click(function () {
        window.dotTest = true;
        window.dotSides = 5;
        window.globals.printPrep();
    });

    $("#noCutouts").click(function () {
        window.dotTest = false;
        window.globals.printPrep();
    });
});