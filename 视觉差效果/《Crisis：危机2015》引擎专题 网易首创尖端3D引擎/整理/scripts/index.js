function change(a) {
    $(".nav_swicth li").removeClass("current").eq((a + 1) % 3).addClass("current");
    var b = $(".part2 .content-bg");
    b.eq(a).animate({
        opacity: 0
    }, 600), b.eq((a + 1) % 3).animate({
        opacity: 1
    }, 600), nowpic = ++a % 3
}

function openDV2() {
    clearInterval(t), popWindow("pop1")
}

function closeDV2() {
    t = setInterval("change(nowpic)", 1e3), popClose("pop1")
}
var nowpic, t, done1, throttle, popWindow, popClose;
nie.config.copyRight.setWhite(), nowpic = 0, done1 = done2 = done3 = done4 = done5 = done6 = !1, throttle = function (a, b, c) {
    var e, d = null;
    return function () {
        var f = this,
            g = arguments,
            h = +new Date;
        clearTimeout(d), e || (e = h), h - e >= c ? (a.apply(f, g), e = h) : d = setTimeout(function () {
            a.apply(f, g)
        }, b)
    }
}, $(function () {
    function I() {
        $.browser.msie && "7.0" == $.browser.version || $("body").niceScroll(H)
    }

    function J() {
        $.browser.msie && "6.0" == $.browser.version ? ($(".content,#NIE-share").css("background", "none"), $(".part2").css("background", "url(images/bg2.6.jpg) no-repeat center 0"), $(".part3").css("background", "url(images/bg3.6.jpg) no-repeat center 0"), $(".part4").css("background", "url(images/bg4.6.jpg) no-repeat center 0"), $(".part5").css("background", "url(images/bg5.6.jpg) no-repeat center 0"), $(".part6").css("background", "url(images/bg6.6.jpg) no-repeat center 0"), $(".part7").css("background", "url(images/bg7.6.jpg) no-repeat center 0"), $(".nav_swicth,.soldier,.missile,.stone,.home,.head,.gs1,.gs2,.gs3,.soldier1").css("display", "none")) : $(window).scroll(function () {
            P(), K(), L()
        })
    }

    function K() {
        var a = $(window).scrollTop();
        20 > a ? $(".scroll-tip").fadeIn() : $(".scroll-tip").fadeOut(), a > 500 ? $(".fixed-nav").fadeIn() : $(".fixed-nav").hide()
    }

    function L() {
        var b, a = $(window).scrollTop();
        return 500 > a ? ($("nav ul li").removeClass("current"), !1) : (b = parseInt((a - 500) / 1e3, 10), $("nav ul li").removeClass("current").eq(b).addClass("current"), void 0)
    }

    function M(a) {
        b.css("top", p + .3 * a), c.css("top", q + .3 * a), d.css("top", 1.7 * -a), e.css("top", 1.2 * -a), f.css("top", .7 * -a)
    }

    function N() {
        done1 = !0, t = setInterval("change(nowpic)", 3e3)
    }

    function O(a) {
        var b = ".soldier3-" + a;
        $(".soldier").stop().css({
            opacity: 0
        }), $(b).stop().css({
            opacity: 1
        }), a >= 2 ? $("#part3-mask").fadeIn() : $("#part3-mask").fadeOut()
    }

    function P() {
        var c, d, e, f, p, q, a = $(window).scrollTop();
        parseInt(a / 1e3), c = ($(window).height() - 380) / 2, d = ($(window).height() - 300) / 2, e = r, f = s, p = (c - e) / 500, q = (c - f) / 500, M(a), 500 > a && $(".part2 .box").fadeOut("fast"), a > 500 && 1500 > a && ($(".part2 .box").show(), $(".part3 .box").fadeOut("fast"), d > f + (a - 500) * q ? h.css("top", f + (a - 500) * q) : h.css("top", d), d > e + (a - 500) * p ? g.css("top", e + (a - 500) * p) : g.css("top", d)), a > 1500 && 2500 > a && ($(".part3 .box").show(), $(".part4 .box").fadeOut("fast"), c > f + (a - 1500) * q ? $(".part3 .box").css("top", f + (a - 1500) * q) : $(".part3 .box").css("top", c), c > e + (a - 1500) * p ? $(".part3 h2").css("top", e + (a - 1500) * p) : $(".part3 h2").css("top", c), a > 1500 && 1900 > a && ($(".soldier").css("opacity", 0), $(".soldier3-1").css("opacity", 1), $("#part3-mask").fadeOut(), -200 > D + 4 * (a - 1500) ? $(".soldier3-1").css({
            right: D + 4 * (a - 1500)
        }) : $(".soldier3-1").css({
            right: -200
        })), a > 1900 && O(2), a > 2e3 && O(3), a > 2100 && O(4)), a > 2500 && 3500 > a && ($(".part4 .box").show(), $(".part5 .box").fadeOut("fast"), j.css({
            top: w + 3.2 * (a - 2800),
            left: x + 5.1 * (a - 2800)
        }), j.find("img").css({
            width: z + .9 * (a - 2820),
            height: A + .9 * (a - 2820)
        }), w + 3.2 * (a - 2800) > 580 ? B - 2 * (a - 2800) >= 450 && k.css("marginLeft", B - 2 * (a - 2800)) : k.css("marginLeft", 1250), c > f + (a - 2500) * q ? $(".part4 .box").css("top", f + (a - 2500) * q) : $(".part4 .box").css("top", c), c > e + (a - 2500) * p ? $(".part4 h2").css("top", e + (a - 2500) * p) : $(".part4 h2").css("top", c)), a > 3500 && 4500 > a && ($(".part5 .box").show(), $(".part6 .box").fadeOut("fast"), 478 >= v + .5 * (a - 3800) && i.css({
            top: u - .5 * (a - 3800),
            height: v + .5 * (a - 3800)
        }), c > f + (a - 3500) * q ? $(".part5 .box").css("top", f + (a - 3500) * q) : $(".part5 .box").css("top", c), c > e + (a - 3500) * p ? $(".part5 h2").css("top", e + (a - 3500) * p) : $(".part5 h2").css("top", c)), a > 4500 && 5500 > a && ($(".part6 .box").show(), $(".part7 .box").fadeOut("fast"), l.css({
            top: C - 2.5 * (a - 4600)
        }), c > f + (a - 4500) * q ? $(".part6 .box").css("top", f + (a - 4500) * q) : $(".part6 .box").css("top", c), c > e + (a - 4500) * p ? $(".part6 h2").css("top", e + (a - 4500) * p) : $(".part6 h2").css("top", c)), a > 5500 && 6100 > a && ($(".part7 .box").show(), m.css({
            left: E.left + .3 * (a - 5500),
            top: E.top - .2 * (a - 5500)
        }), n.css({
            left: F.left - .3 * (a - 5700),
            top: F.top - .2 * (a - 5700)
        }), o.css({
            left: G.left - .7 * (a - 5700),
            top: G.top + .8 * (a - 5700)
        }), c > f + (a - 5500) * q ? $(".part7 .box").css("top", f + (a - 5500) * q) : $(".part7 .box").css("top", c), c > e + (a - 5500) * p ? $(".part7 h2").css("top", e + (a - 5500) * p) : $(".part7 h2").css("top", c)), a > 6100 ? ($(".fixed-nav").css({
            position: "absolute",
            top: 6850
        }), $(".back-top img").fadeIn()) : ($(".fixed-nav").css({
            position: "fixed",
            top: $(window).height() - 120
        }), $(".back-top img").fadeOut())
    }
    var b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, u, v, w, x, y, z, A, B, C, D, E, F, G, H;
    nie.use(["util.share,nie.util.video"], function () {
        nie.util.share({
            type: 6,
            defShow: [5, 2, 1, 3],
            title: "#危机2015枪感开测#专业尖端3D引擎Dynamite，六大革新，开启FPS全新世代！高级光照渲染，可视粒子特效……你从未发现射击游戏可以如此精彩！",
            img: "http://wj.163.com/2013/engine/wshare.jpg"
        }), $(".btn_video").each(function (a) {
            $(this).click(function () {
                var b = "http://v.nie.netease.com/f/2013/0808/" + (a + 1) + ".f4v",
                    c = "http://v.nie.netease.com/f/2013/0808/" + (a + 1) + ".mp4";
                nie.util.video("#popTc .video", {
                    movieUrl: b,
                    mp4_movieUrl: c,
                    width: "100%",
                    height: 455,
                    bufferTime: 5,
                    loopTimes: -1,
                    wmode: "transparent",
                    autoPlay: !0
                })
            })
        })
    }),
    function () {
        $("nav").css({
            top: $(window).height() - 120
        }), $(window).resize(function () {
            $("nav").css({
                top: $(window).height() - 120
            })
        })
    }(), b = $(".part1 .ball"), c = $(".part1 .text"), d = $(".part1 .st1"), e = $(".part1 .st2"), f = $(".part1 .st3"), g = $(".part2 h2"), h = $(".part2 .box"), i = $(".home"), j = $(".missile"), k = $(".part4 .stone"), l = $(".part6 .head"), m = $(".part7 .gs1"), n = $(".part7 .gs2"), o = $(".part7 .gs3"), p = parseInt(b.css("top"), 10), q = parseInt(c.css("top"), 10), r = parseInt(g.css("top"), 10), s = parseInt(h.css("top"), 10), u = parseInt(i.css("top"), 10), v = i.height(), w = parseInt(j.css("top"), 10), x = parseInt(j.css("left"), 10), y = j.find("img"), z = y.width(), A = y.height(), B = parseInt(k.css("marginLeft"), 10), C = parseInt(l.css("top"), 10), D = parseInt($(".soldier3-1").css("right"), 10), E = {
        left: parseInt(m.css("left"), 10),
        top: parseInt(m.css("top"), 10)
    }, F = {
        left: parseInt(n.css("left"), 10),
        top: parseInt(n.css("top"), 10)
    }, G = {
        left: parseInt(o.css("left"), 10),
        top: parseInt(o.css("top"), 10)
    }, H = {
        scrollspeed: 100,
        cursorcolor: "#eaeaea",
        cursorborder: "1px solid #ccc",
        cursorwidth: "8px",
        ZIndex: 100,
        cursorborderradius: 0
    }, I(), J(), $("nav ul li").click(function () {
        var a = $(this).index() + 1;
        a > 0 && $("html,body").stop().animate({
            scrollTop: 1e3 * a
        }, 500)
    }), N(), $(".part1").mousemove(function (a) {
        var c, d, e, f, g, h, i, b = $(window).scrollTop();
        a = a || window.event, c = $(window).width(), d = $(window).height(), ePageX = a.pageX, ePageY = a.pageY, e = c / 2, f = d / 2 - 20, g = ePageX - e, h = ePageY - f, g /= e, h /= f, i = $(window).width() / 2, $(".ball").css({
            left: i + 10 * g,
            top: p + .3 * b - 10 * h
        }), $(".st1").css({
            left: i + 20 * g,
            top: 1.7 * -b - 20 * h
        }), $(".st2").css({
            left: i + 30 * g,
            top: 1.2 * -b - 25 * h
        }), $(".st3").css({
            left: i + 25 * g,
            top: .7 * -b - 25 * h
        })
    }), $(".back-top img").click(function () {
        $("html,body").stop().animate({
            scrollTop: 0
        }, 1500)
    })
}), popWindow = function () {
    var d, e, a = $("#popTc");
    return a.width(), a.height(), d = $(window).scrollTop() + ($(window).height() - a.height()) / 2, e = ($(window).width() - a.width()) / 2, a.css({
        top: d,
        left: e
    }).fadeIn(), $("#fade").length < 1 && $("body").append('<div id="fade"></div>'), $("#fade").css({
        filter: "alpha(opacity=80)"
    }).fadeIn(), !1
}, popClose = function () {
    return $("#fade ,#popTc").fadeOut(), $("#popTc .video").html(""), !1
};