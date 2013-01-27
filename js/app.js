$(document).bind("mobileinit", function () {
    $.mobile.pushStateEnabled = true;
});
 
$(function () {
    var menuStatus;
    var show = function() {
        if(menuStatus) {
            return;
        }
        $('#menu').show();
        $.mobile.activePage.animate({
            marginLeft: "165px",
        }, 300, function () {
            menuStatus = true
        });
    };
    var hide = function() {
        if(!menuStatus) {
            return;
        }
        $.mobile.activePage.animate({
            marginLeft: "0px",
        }, 300, function () {
            menuStatus = false
            $('#menu').hide();
        });
    };
    var toggle = function() {
        if (!menuStatus) {
            show();
        } else {
            hide();
        }
        return false;
    };
 
    // Show/hide the menu
    $("a.showMenu").click(toggle);
    $('#menu, .pages').live("swipeleft", hide);
    $('.pages').live("swiperight", show);
 
    $('div[data-role="page"]').live('pagebeforeshow', function (event, ui) {
        menuStatus = false;
        $(".pages").css("margin-left", "0");
    });
 
    // Menu behaviour
    $("#menu li a").click(function () {
        var p = $(this).parent();
        p.siblings().removeClass('active');
        p.addClass('active');
    });
});
 
