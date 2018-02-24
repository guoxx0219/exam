const $ = require("jquery");
$(function(){
    $(".leftnav h2").click(function(){
        $(this).next().slideToggle(200);
        $(this).toggleClass("on");
    })
    $(".leftnav ul li a").click(function(){
        $(".leftnav ul li a").removeClass("on");
        $(this).addClass("on");
    })
});