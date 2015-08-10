bluemp.loginCheck = function() {
	var flag;
    jsonAjaxSyn('/Login/check', {}, function(data) {
        if (data.status == '1') {
			flag = true;
        } else {
            bluemp.login();
            flag = false;
        }
    }, 'get');
	return flag;
}
bluemp.login = function() {
    var wbhtml = '<a href="javascript:void(0);" id="weibo">';
    wbhtml += '<dl>';
    wbhtml += '<dt><img src="/Public/Home/Images/weibo-icon.jpg"></dt>';
    wbhtml += '<dd>Î¢²©µÇÂ¼</dd>';
    wbhtml += '</dl>';
    wbhtml += '</a>';

    var qqhtml = '<a href="javascript:void(0);" id="qq">';
    qqhtml += '<dl>';
    qqhtml += '<dt><img src="/Public/Home/Images/QQ-icon.jpg"></dt>';
    qqhtml += '<dd>QQµÇÂ¼</dd>';
    qqhtml += '</dl>';
    qqhtml += '</a>';
    var wechathtml = '<a href="javascript:void(0);" id="wechat">';
    wechathtml += '<dl>';
    wechathtml += '<dt><img src="/Public/Home/Images/weixin-icon.jpg"></dt>';
    wechathtml += '<dd>Î¢ÐÅµÇÂ¼</dd>';
    wechathtml += '</dl>';
    wechathtml += '</a>';
    var width = '290px';
    var html = '<div class="dltanchu" >';
    if (weibo == 1) {
        html += wbhtml;
    }
    if (qq == 1) {
        html += qqhtml;
    }
    if (wechat == 1 && in_wechat == 1) {
        html += wechathtml;
    }
  

    html += '</div>';
    var index = $.layer({
        type: 1,
        title: false,
        area: [width, 'auto'],
        shade: [0.5, '#8E8E8E'],
        border: [0],
        //offset: [($(window).height() - '200')/2 + 'px', ''],
        shadeClose: true,
        page: {
            html: html
        },
        success: function() {
            $('#weibo').unbind('click').click(function() {
                $.cookie('ref', window.location.href, {domain: webdomain, path: '/'});
                var params = {};
                params.url = window.location.href;
                $.getJSON(
                	    "http://www.bluemp.cn/Auth/Oauth/setcookie?url="+params.url+'&callback=?',
                	function(data) {
                	    	if (data.code==0){
                	    		window.location.href = '/Auth/Oauth/login/type/sina';
                	    	}
                });
            })
            $('#qq').unbind('click').click(function() {
                $.cookie('ref', window.location.href, {domain: webdomain, path: '/'});
                var params = {};
                params.url = window.location.href;
                $.getJSON(
                	    "http://www.bluemp.cn/Auth/Oauth/setcookie?url="+params.url+'&callback=?',
                	function(data) {
                	    	if (data.code==0){
                	    		 window.location.href = '/Auth/Oauth/login/type/qq';
                	    	}
                });
               
            })
            $('#wechat').unbind('click').click(function() {
                $.cookie('ref', window.location.href, {domain: webdomain, path: '/'});
                var params = {};
                params.url = window.location.href;
                $.getJSON(
                	    "http://www.bluemp.cn/Auth/Oauth/setcookie?url="+params.url+'&callback=?',
                	function(data) {
                	    if (data.code==0){
                	    		 window.location.href = '/Auth/Oauth/login/type/wechat';
               	    	}
                });
               
            })
        }
    });
}

bluemp.logout = function(){
	var url = '/Login/loginout';
    var params = {};
    jsonAjax(url, params, function(data) {
        popup.remind(data.msg);
        if (data.status == '1') {
        	 window.location.href = '/Home/index';
        }
    }, 'get');
}

/*¹«ÓÃµ¯´°*/
var popup = {
    t: 0,
    remind: function(txt) {
        var self = this;
        var _boxHtml = $('<div class="popRemind"><div class="conBox"><div class="con"></div></div><div class="bg"></div></div>');
        if (!$(".popRemind")[0]) {
            _boxHtml.appendTo($('body'));
        }
        $(".popRemind .con").html(txt);
        var _box = $(".popRemind");
        _box.css({
            position: 'absolute',
            left: ($(window).width() - _box.outerWidth()) / 2,
            top: ($(window).height() - _box.outerHeight()) / 2 + $(document).scrollTop()
        });
        $('.popRemind .bg').css({
            height: _box.outerHeight(),
            width: _box.outerWidth()
        });
        this.open(_box);
        this.t = setTimeout(function() {
            self.close(_box)
        }, 2000);
        $(".popRemind .close").click(function() {
            var node = $(".popRemind");
            self.close(node);
        })
    },
    score: function(txt, node, color) {
        var self = this;
        var _boxHtml = $('<span id="popAddScore"><i></i></span>');
        if (!$("#popAddScore")[0]) {
            _boxHtml.appendTo($('body'));
        }
        var _box = $("#popAddScore");
        _box.find('i').html(txt);
        _box.css({
            'font-size': '12px',
            position: 'absolute',
            left: node.offset().left + node.outerWidth() / 2 - 10,
            top: node.offset().top + node.height(),
            display: 'block',
            color: color,
            'white-space': 'nowrap'
        });
        _box.find('i').css({
            position: 'absolute',
            left: 0,
            bottom: 0,
            display: 'block'
        });
        var _fontSize = _box.css('font-size');
        _fontSize = parseFloat(_fontSize, 10);
        var fontTime = setInterval(function() {
            _fontSize++;
            _box.css({
                'font-size': _fontSize
            });
        }, 30);
        _box.fadeOut(800);
        setTimeout(function() {
            clearInterval(fontTime);
        }, 600);
    },
    open: function(node) {
        clearTimeout(this.t);
        node.fadeIn(600);
    },
    close: function(node) {
        clearTimeout(this.t);
        node.fadeOut(1000);
    }
};

/**
 * µÇÂ¼²ã
 */
function login() {
    var wbhtml = '<a href="javascript:void(0);" id="weibo">';
    wbhtml += '<dl>';
    wbhtml += '<dt><img src="/Public/Home/Images/weibo-icon.jpg"></dt>';
    wbhtml += '<dd>Î¢²©µÇÂ¼</dd>';
    wbhtml += '</dl>';
    wbhtml += '</a>';

    var qqhtml = '<a href="javascript:void(0);" id="qq">';
    qqhtml += '<dl>';
    qqhtml += '<dt><img src="/Public/Home/Images/QQ-icon.jpg"></dt>';
    qqhtml += '<dd>QQµÇÂ¼</dd>';
    qqhtml += '</dl>';
    qqhtml += '</a>';
    var wechathtml = '<a href="javascript:void(0);" id="wechat">';
    wechathtml += '<dl>';
    wechathtml += '<dt><img src="/Public/Home/Images/weixin-icon.jpg"></dt>';
    wechathtml += '<dd>Î¢ÐÅµÇÂ¼</dd>';
    wechathtml += '</dl>';
    wechathtml += '</a>';
    var width = '290px';
    var html = '<div class="dltanchu" >';
    if (weibo == 1) {
        html += wbhtml;
    }
    if (qq == 1) {
        html += qqhtml;
    }
    if (wechat == 1 && in_wechat == 1) {
        html += wechathtml;
    }
  

    html += '</div>';
    var index = $.layer({
        type: 1,
        title: false,
        area: [width, 'auto'],
        shade: [0.5, '#8E8E8E'],
        border: [0],
        //offset: [($(window).height() - '200')/2 + 'px', ''],
        shadeClose: true,
        page: {
            html: html
        },
        success: function() {
            $('#weibo').unbind('click').click(function() {
                $.cookie('ref', window.location.href, {domain: webdomain, path: '/'});
                var params = {};
                params.url = window.location.href;
                $.getJSON(
                	    "http://www.bluemp.cn/Auth/Oauth/setcookie?url="+params.url+'&callback=?',
                	function(data) {
                	    	if (data.code==0){
                	    		window.location.href = '/Auth/Oauth/login/type/sina';
                	    	}
                });
            })
            $('#qq').unbind('click').click(function() {
                $.cookie('ref', window.location.href, {domain: webdomain, path: '/'});
                var params = {};
                params.url = window.location.href;
                $.getJSON(
                	    "http://www.bluemp.cn/Auth/Oauth/setcookie?url="+params.url+'&callback=?',
                	function(data) {
                	    	if (data.code==0){
                	    		 window.location.href = '/Auth/Oauth/login/type/qq';
                	    	}
                });
               
            })
            $('#wechat').unbind('click').click(function() {
                $.cookie('ref', window.location.href, {domain: webdomain, path: '/'});
                var params = {};
                params.url = window.location.href;
                $.getJSON(
                	    "http://www.bluemp.cn/Auth/Oauth/setcookie?url="+params.url+'&callback=?',
                	function(data) {
                	    if (data.code==0){
                	    		 window.location.href = '/Auth/Oauth/login/type/wechat';
               	    	}
                });
               
            })
        }
    });
}
