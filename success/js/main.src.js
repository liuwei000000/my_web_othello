var Msize = $(".m-page").size(),
    page_n = 1,
    initP = null,
    moveP = null,
    firstP = null,
    newM = null,
    p_b = null,
    move = null,
    start = true,
    startM = null,
    position = null,
    mapS = null,
    textNode = [],
    textInt = 1,
    mousedown = null,
    plugin_type = {
    "info_pic2": {
        num: 0,
        id: 0
    },
    "info_nomore": {
        num: 0,
        id: 0
    },
    "info_more": {
        num: 0,
        id: 0
    },
    "multi_contact": {
        num: 0,
        id: 0
    },
    "video": {
        num: 0,
        id: 0
    },
    "input": {
        num: 0,
        id: 0
    },
    "dpic": {
        num: 0,
        id: 0
    }
};
var v_h = null;
var v_w = null;

function init_pageH(b) {
    var e = function () {
        if (document.compatMode == "BackCompat") {
            var f = document.body
        } else {
            var f = document.documentElement
        }
        return Math.max(f.scrollHeight, f.clientHeight)
    };
    var c = function () {
        if (document.compatMode == "BackCompat") {
            var f = document.body
        } else {
            var f = document.documentElement
        }
        return Math.max(f.scrollWidth, f.clientWidth)
    };
    var d = e();
    var a = $(".m-page").height();
    d >= a ? v_h = d : v_h = a;
    v_w = c();
    $(".m-page").height(v_h);
    $(".p-index").height(v_h)
}
init_pageH();
var lazyNode = $(".lazy-bk");
lazyNode.each(function () {
    var a = $(this);
    if (a.is("img")) {
        a.attr("src", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC")
    } else {
        a.css({
            "background-image": "url(../images/loading.gif)",
            "background-size": "120px 120px"
        })
    }
});
setTimeout(function () {
    for (var a = 0; a < 3; a++) {
        var b = $(".m-page").eq(a);
        if (b.length == 0) {
            break
        }
        if (b.find(".lazy-bk").length != 0) {
            lazy_change(b)
        } else {
            continue
        }
    }
}, 200);

function lazy_bigP() {
    for (var a = 3; a <= 5; a++) {
        var b = $(".m-page").eq(page_n + a - 1);
        if (b.length == 0) {
            break
        }
        if (b.find(".lazy-bk").length != 0) {
            lazy_change(b)
        } else {
            continue
        }
    }
}

function lazy_change(b) {
    if (b.attr("data-yuyue") == "true") {
        $(".weixin-share").find(".lazy-bk").attr("src", $(".weixin-share").find(".lazy-bk").attr("data-bk"))
    }
    var a = b.find(".lazy-bk");
    a.each(function () {
        var c = $(this),
            d = c.attr("data-bk");
        $("<img />").on("load", function () {
            if (c.is("img")) {
                c.attr("src", d)
            } else {
                c.css({
                    "background-image": "url(" + d + ")",
                    "background-size": "cover"
                })
            }
            for (var e = 0; e < $(".m-page").size(); e++) {
                var f = $(".m-page").eq(e);
                if ($(".m-page").find(".lazy-bk").length == 0) {
                    continue
                } else {
                    lazy_change(f)
                }
            }
        }).attr("src", d);
        c.removeClass("lazy-bk")
    })
}

function changeOpen(a) {
    $(".v-page").on("mousedown touchstart", page_v_touchstart);
    $(".v-page").on("mousemove touchmove", page_v_touchmove);
    $(".v-page").on("mouseup touchend mouseout", page_v_touchend);
    $(".h-page").on("mousedown touchstart", page_h_touchstart);
    $(".h-page").on("mousemove touchmove", page_h_touchmove);
    $(".h-page").on("mouseup touchend mouseout", page_h_touchend)
}

function changeClose(a) {
    $(".v-page").off("mousedown touchstart");
    $(".v-page").off("mousemove touchmove");
    $(".v-page").off("mouseup touchend mouseout")
}

function page_v_touchstart(a) {
    if (a.type == "touchstart") {
        initP = window.event.touches[0].pageY
    } else {
        initP = a.y || a.pageY;
        mousedown = true
    }
    firstP = initP
}

function page_h_touchstart(a) {
    if (a.type == "touchstart") {
        initP = window.event.touches[0].pageX
    } else {
        initP = a.x || a.pageX;
        Mousedown = true
    }
    firstP = initP
}

function V_start(a) {
    initP = a;
    mousedown = true;
    firstP = initP
}

function page_v_touchmove(b) {
    b.preventDefault();
    b.stopPropagation();

    if (start || startM) {
        startM = true;
        if (b.type == "touchmove") {
            moveP = window.event.touches[0].pageY;
            moveP2 = window.event.touches[0].pageX
        } else {
            if (mousedown) {
                moveP = b.y || b.pageY
                moveP2 = b.x || b.pageX
            }
        }
    }
    if (moveP && startM) {
        if (!p_b) {
            p_b = true;
            position = moveP - initP > 0 ? true : false;
            if (position) {
                if (page_n != 1) {
                    newM = page_n - 1;
                    $(".m-page").eq(newM - 1).addClass("active").css("top", -v_h);
                    move = true
                } else {
					newM = 1
                    move = false
                }
            } else {
                if (page_n != Msize) {
                    newM = page_n + 1
					$(".m-page").eq(newM - 1).addClass("active").css("top", v_h);
                	move = true
                } else {
                    newM = 1
					move = false
                }
            }
        }
        if (move) {
            start = false;
            var a = parseInt($(".m-page").eq(newM - 1).css("top"));
            $(".m-page").eq(newM - 1).css({
                "top": a + moveP - initP
            });
            initP = moveP
        } else {
            moveP = null
        }
    }
}

function page_h_touchmove(b) {
    b.preventDefault();
    b.stopPropagation();
    if (page_n == Msize) {
        window.location.href = "#"
    }
    if (start || startM) {
        startM = true;
        if (b.type == "touchmove") {
            moveP = window.event.touches[0].pageX
        } else {
            if (mousedown) {
                moveP = b.x || b.pageX
            }
        }
    }
    if (moveP && startM) {
        if (!p_b) {
            p_b = true;
            position = moveP - initP > 0 ? true : false;
            if (position) {
                if (page_n != Msize) {
                    newM = page_n + 1
                } else {
                    newM = 1
                }
                $(".m-page").eq(newM - 1).addClass("active").css("left", -v_w);
                move = true
            } else {
                if (page_n != Msize) {
                    newM = page_n + 1
                } else {
                    newM = 1
                }
                $(".m-page").eq(newM - 1).addClass("active").css("left", v_w);
                move = true
            }
        }

        if (move) {
            start = false;
            var a = parseInt($(".m-page").eq(newM - 1).css("left"));
            $(".m-page").eq(newM - 1).css({
                "left": a + moveP - initP
            });
            initP = moveP
        } else {
            moveP = null
        }
    }
}

function page_v_touchend(a) {
    startM = null;
    p_b = false;
    var b;
    position ? b = moveP - firstP > 100 : b = firstP - moveP > 100;
    if (move) {
        if (b && Math.abs(moveP) > 5) {
            $(".m-page").eq(newM - 1).animate({
                "top": 0
            }, 300, "easeOutSine", function () {
                success()
            })
        } else {
            if (Math.abs(moveP) >= 5) {
                position ? $(".m-page").eq(newM - 1).animate({
                    "top": -v_h
                }, 100, "easeOutSine") : $(".m-page").eq(newM - 1).animate({
                    "top": v_h
                }, 100, "easeOutSine");
                $(".m-page").eq(newM - 1).removeClass("active");
                start = true
            }
        }
    }
    initP = null, moveP = null, firstP = null, mousedown = null;
    initP2 = null, moveP2 = null, firstP2 = null, mousedown2 = null
}

function page_h_touchend(a) {
    startM = null;
    p_b = false;
    var b;
    position ? b = moveP - firstP > 100 : b = firstP - moveP > 100;
    if (move) {
        if (b && Math.abs(moveP) > 5) {
            $(".m-page").eq(newM - 1).animate({
                "left": 0
            }, 300, "easeOutSine", function () {
                success()
            })
        } else {
            if (Math.abs(moveP) >= 5) {
                position ? $(".m-page").eq(newM - 1).animate({
                    "left": -v_w
                }, 100, "easeOutSine") : $(".m-page").eq(newM - 1).animate({
                    "left": v_w
                }, 100, "easeOutSine");
                $(".m-page").eq(newM - 1).removeClass("active");
                start = true
            }
        }
    }
    initP = null, moveP = null, firstP = null, mousedown = null;
    initP2 = null, moveP2 = null, firstP2 = null, mousedown2 = null
}

function success() {
    $(".m-page").eq(page_n - 1).removeClass("show active").addClass("hide");
    $(".m-page").eq(newM - 1).removeClass("active hide").addClass("show");
    if ($(".m-page.show").hasClass("h-page")) {
        $(".u-arrow").css("display", "none")
    } else {
        $(".u-arrow").css("display", "block")
    }
    lazy_bigP();
    page_n = newM;
    start = true;
    if (page_n == Msize) {
        canmove = true
    }
}

/*
$(function () {
	  return
    var b = $(".fn-audio").find(".btn");
    b.on("click", a);

    function a() {
        if ($("#car_audio") == undefined) {
            return
        }
        if (audio_switch_btn) {
            $("#car_audio")[0].pause();
            audio_switch_btn = false;
            $("#car_audio")[0].currentTime = 0;
            b.find("span").eq(0).css("display", "none");
            b.find("span").eq(1).css("display", "inline-block")
        } else {
            audio_switch_btn = true;
            b.find("span").eq(1).css("display", "none");
            b.find("span").eq(0).css("display", "inline-block")
        }
    }
});*/