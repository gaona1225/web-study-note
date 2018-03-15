var message = {
    cssUrl: "http://www.game2.cn/css/",
    scriptUrl: "http://script.game2.cn/",
    title: "\u7cfb\u7edf\u63d0\u793a",
    className: "",
    height: 211,
    width: 532,
    event: {},
    lastArgs: null,
    init: function() {
        message_display.draw();
        tool.initDrag("notice_div", "msg_drag", "msg_hiddenBorder")
    },
    loadFile: function() {
        var A = document.getElementsByTagName("head")[0],
        $ = document.createElement("link");
        $.type = "text/css";
        $.rel = "STYLESHEET";
        $.src = "/blank.htm";
        $.href = message.cssUrl + "pop_old.css";
        A.appendChild($);
        var _ = [];
        if (!document.getElementById("tool")) _.push("<script type=\"text/javascript\" src=\"" + message.scriptUrl + "tool.js\" id=\"tool\"></script>");
        _.push("<script type=\"text/javascript\" src=\"" + message.scriptUrl + "msg_display.js\"></script>");
        document.write(_.join(""))
    },
    show: function(F, A, C, B) {
        this.lastArgs = arguments;
        var D = document.getElementById("msg_close");
        if (!D) {
            window.setTimeout(message.showLast, 100);
            return
        }
        var E = document.getElementById("msg_cancel"),
        _ = document.getElementById("msg_confirm");
        this.mark(true);
        this.hiddenAllbutton(false);
        D.onclick = E.onclick = function() {
            message.close(B || C || false);
            return false
        };
        _.onclick = function() {
            message.close(C || null);
            return false
        };
        this.hiddenCancel(!B);
        var $ = document.getElementById("msg_content");
        if (typeof F == "string") {
            $.className = "";
            $.innerHTML = F.match(/^\</) ? F: ("<p>" + F + "</p>")
        } else if (typeof F.obj != "undefined") {
            $.className = "pop_info";
            $.innerHTML = message_display.getMsg(F);
            _.onclick = function() {
                if ($.getElementsByTagName("input").length) var _ = $.getElementsByTagName("input")[0].value;
                else _ = $.getElementsByTagName("textarea")[0].value;
                if (F.require !== false && _ == "") message.show(F.error || "\u8bf7\u8f93\u5165\u539f\u56e0", null, 
                function() {
                    message.show(F, A || null, C || null, B || null)
                });
                else {
                    if (typeof F.obj != "undefined") F.obj.value = _;
                    message.close(C(_) || null)
                }
                return false
            }
        } else {
            $.className = "";
            $.innerHTML = "";
            $.insertBefore(F, $.firstChild)
        }
        if (A) A();
        tool.setCenter("notice_div")
    },
    setTitle: function($) {
        document.getElementById("msg_drag").getElementsByTagName("span")[0].innerHTML = $ || message.title
    },
    setClass: function($) {
        document.getElementById("notice_div").className = $ || message.className
    },
    close: function($) {
        document.getElementById("notice_div").style.display = "none";
        this.mark(false);
        this.setMsgBtn("\u786e\u3000\u5b9a", "\u53d6\u3000\u6d88");
        message.setTitle();
        message.setClass();
        if ($) $()
    },
    mark: function($) {
        var _ = document.getElementById("fbg");
        if (!_) return;
        if ($) {
            _.style.height = (document.documentElement.clientHeight || document.body.clientHeight) + (document.documentElement.scrollTop || document.body.scrollTop) + "px";
            _.style.display = "";
            document.documentElement.style.overflow = "hidden"
        } else {
            _.style.display = "none";
            document.documentElement.style.overflow = "auto";
            document.documentElement.style.overflowX = "hidden"
        }
    },
    hiddenAllbutton: function($) {
        var _ = $ ? "none": "";
        document.getElementById("msg_cancel").style.display = _;
        document.getElementById("msg_close").style.display = _;
        document.getElementById("msg_confirm").style.display = _
    },
    hiddenCancel: function($) {
        document.getElementById("msg_cancel").style.display = $ ? "none": ""
    },
    setMsgBtn: function() {
        var C = ["msg_confirm", "msg_cancel"],
        E = document.getElementById("bt_Container"),
        D = E.getElementsByTagName("input"),
        B = D.length;
        for (i = 2; i < B; i++) tool.removeObj(D[i]);
        for (i = 0, l = arguments.length; i < l; i++) {
            var $ = arguments[i],
            A = document.getElementById(C[i]);
            if (typeof $ == "string") $ = {
                "value": $
            };
            if (!$.className) $.className = "b2";
            if (!A && $.id) {
                A = document.createElement("input");
                A.id = $.id;
                A.type = $.type ? $.type: "button";
                E.appendChild(A)
            }
            try {
                for (k in $) if (typeof $[k] == "function") {
                    message.event[A.id] = $[k];
                    A[k] = function() {
                        message.execute(this)
                    }
                } else A[k] = $[k]
            } catch(_) {}
        }
    },
    execute: function($) {
        message.close(message.event[$.id])
    },
    showLast: function() {
        message.show(message.lastArgs[0], message.lastArgs[1], message.lastArgs[2], message.lastArgs[3])
    }
};
message.loadFile();
window.onerror = function() {
    return true
}