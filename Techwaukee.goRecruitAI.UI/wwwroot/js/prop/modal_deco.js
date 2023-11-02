/// <reference path="../jquery.js" />

function modal_dec() {
    $("#id_post_image").click(function () {
        $("#modal").removeClass("hidden");
        $("#modal").addClass("force_display");
    });
    $(".close").click(function () {
        $(".modal").removeClass("force_display");
        $(".modal").addClass("hidden");
    });

    $("#id_post_video").click(function () {
        $("#modal_1").removeClass("hidden");
        $("#modal_1").addClass("force_display");
    });

    $("#id_post_article").click(function () {
        $("#modal_2").removeClass("hidden");
        $("#modal_2").addClass("force_display");
        feed_type = "text";
    });
}