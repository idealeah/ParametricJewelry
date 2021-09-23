window.GUIglobals = {};

$(function () {
    $('#slider').hide();
    $('#download-to-svg').hide();
    $('#inputNum').hide();
    $('#submitNum').hide();

    $("#boxClear").click(function () {
        window.globals.reDraw();
    });

    $("#boxSubmit").click(function () {
        step2();
    });
});

function step2() {
    window.globals.printPrep();
    $("#stepText").html("Set the number of links and<br/>choose link width with the slider");
    // $("#stepText").css({
    //     "width": "200px"
    // });
    $('#slider').show();
    $('#inputNum').show();
    $('#submitNum').show();
    $('#download-to-svg').show();
    $('#boxClear').hide();
    $('#boxSubmit').hide();
    $("#slider").slider({
        min: 3,
        max: 10,
        value: 5,
        // step: 1,
        slide: function (showNum) {
            let selection = $("#slider").slider("value");
            window.boxWidth = selection * 10;
            console.log(window.boxWidth);
            window.globals.printPrep();
        }
    });
    $("#submitNum").click(function () {
        var num = $("#inputNum").val();
        if (num > 0) {
            window.numCubes = num;
            window.globals.printPrep();
        }
    });
    $("#download-to-svg").click(function () {
        window.globals.downloadAsSVG("necklaceCubes");
    });

}