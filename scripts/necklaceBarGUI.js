window.GUIglobals = {};

$(function () {
    $('#slider').hide();
    $('#download-to-svg').hide();

    $("#boxClear").click(function () {
        window.globals.reset();
    });

    $("#fileMake").click(function () {
        window.globals.prepare();
        $("#download-to-svg").click(function () {
            window.globals.downloadAsSVG("barNecklace");
        });
        $('#download-to-svg').show();
        $('#fileMake').hide();
        $('#boxClear').hide();
    });
});