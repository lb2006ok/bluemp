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