$(window).scroll(function() {
    $('.container p').each(function() {
        var scrollTop = $(window).scrollTop(),
            elementOffset = $(this).offset().top,
            distance = (elementOffset - scrollTop),
            windowHeight = $(window).height(),
            breakPoint = windowHeight * 0.9;

        if (distance > breakPoint) {
            $(this).addClass("more-padding");
        }
        if (distance < breakPoint) {
            $(this).removeClass("more-padding");
        }
    });
});

$(document).ready(function() {

    $("html").niceScroll({
        cursorcolor: "#75DE6C",
        cursoropacitymin: 1,
        cursoropacitymax: 1,
        cursorwidth: "25px",
        cursorborder: "0px solid #fff",
        cursorborderradius: "0px",
        scrollspeed: 40,
        mousescrollstep: 20,
        background: "#444444",
        railalign: "right",
        railvalign: "bottom",
        hidecursordelay: 750,
        cursordragspeed: 1,
        zindex: 1000,
    });

    $("#picRefOne").click(function() {
        $('html, body').animate({
            scrollTop: $("#one").offset().top
        }, 1300);
        return false;
    });

    $("#refOne").click(function() {
        $('html, body').animate({
            scrollTop: $("#one").offset().top
        }, 1800);
        return false;
    });

    $("#refTwo").click(function() {
        $('html, body').animate({
            scrollTop: $("#two").offset().top - $("#menu").height()
        }, 1800);
        return false;
    });

    $("#refThree").click(function() {
        $('html, body').animate({
            scrollTop: $("#contact").offset().top
        }, 1800);
        return false;
    });

    $("#moreInfo1").click(function() {
        $("#MoreInfo1").addClass("appear");
        return false;
    });

    $("#moreInfo2").click(function() {
        $("#MoreInfo2").addClass("appear");
        return false;
    });

    $("#moreInfo3").click(function() {
        $("#MoreInfo3").addClass("appear");
        return false;
    });

});
