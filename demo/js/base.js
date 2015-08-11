var weixlyq = 0;
window.onload = function() {
    if (isWeiXin()) {
        weixlyq = 1;
    }
}


/**
 * 判断微信浏览器
 * @returns {Boolean}
 */
function isWeiXin() {
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true;
    } else {
        return false;
    }
}

$(function() {
    
	(function(w,d,m){
				var utils = (function () {
					var me = {};
				
					var _elementStyle = document.createElement('div').style;
					var _vendor = (function () {
						var vendors = ['t', 'webkitT', 'MozT', 'msT', 'OT'],
							transform,
							i = 0,
							l = vendors.length;
				
						for ( ; i < l; i++ ) {
							transform = vendors[i] + 'ransform';
							if ( transform in _elementStyle ) return vendors[i].substr(0, vendors[i].length-1);
						}
				
						return false;
					})();
				
					function _prefixStyle (style) {
						if ( _vendor === false ) return false;
						if ( _vendor === '' ) return style;
						return _vendor + style.charAt(0).toUpperCase() + style.substr(1);
					}
				
					var _transform = _prefixStyle('transform');
				
					me.extend = function (target, obj) {
						for ( var i in obj ) {
							target[i] = obj[i];
						}
					};
					me.extend(me, {
						hasTransform: _transform !== false,
						hasPerspective: _prefixStyle('perspective') in _elementStyle,
						hasTouch: 'ontouchstart' in window,
						hasPointer: window.PointerEvent || window.MSPointerEvent, // IE10 is prefixed
						hasTransition: _prefixStyle('transition') in _elementStyle
					});
					me.extend(me.style = {}, {
						transform: _transform,
						transitionTimingFunction: _prefixStyle('transitionTimingFunction'),
						transitionDuration: _prefixStyle('transitionDuration'),
						transitionDelay: _prefixStyle('transitionDelay'),
						transformOrigin: _prefixStyle('transformOrigin')
					});
				
				
				
					return me;
				})();
				function Carousel(el,option){
					var i=0;
					this.windowWidth = (document.documentElement['clientWidth']||window.offsetWidth)>520?520:document.documentElement['clientWidth']||window.offsetWidth;//浏览器尺寸
					this.windowHeight = document.documentElement['clientHeight']||window.offsetHeight;
					this.options = {
						originStyle:'translateX(0px) translateY(0px)',
						rightStyle:'translateX('+this.windowWidth+'px) translateY(-15px)',
						leftStyle:'translateX(-'+this.windowWidth+'px) translateY(-15px)',
						transitionTimingFunction:'ease-in',
						transitionDuration:'600ms'
					};
					this.targets = typeof el == 'string' ? document.querySelector(el) : el;
					this.imgs = this.targets.getElementsByTagName('img');
					this.id = 'Carousel-'+el.replace(/\#|\./g,'');
					this.len = this.imgs.length;
					this.index = 0;
					this.isMoveing = false;
					this.img = [];
					for(;i<this.imgs.length;i++){
						this.img.push(this.imgs[i].getAttribute('href'));
					}
					this.originX = 0;
					this.newX = 0;
					this.distanceX = 0;
					this.initClick();
				}
				Carousel.prototype = {
					_initBackgrount:function(){
						if(document.getElementById('carousel-over'+this.id)!=null||document.getElementById('carousel-over'+this.id)!=undefined) return false;
						this.background = document.createElement('div');
						this.background.setAttribute('class','carousel-over');
						this.background.setAttribute('id','carousel-over'+this.id);
						this.backgroundStyle = this.background.style;
						this.backgroundStyle['height'] = parseInt(this.windowHeight+70)+'px';
						this.backgroundStyle['width'] = '100%';
						document.body.appendChild(this.background);
					},
					_initCarousel : function(index){
						if(document.getElementById(this.id)!=null||document.getElementById(this.id)!=undefined) return false;
						this.carousel = document.createElement('div');
						this.carousel.setAttribute('id',this.id);
						this.carousel.setAttribute('class','carousel-main');
						document.body.appendChild(this.carousel);
						this._initClose();
						this._initContentHtml(index);
						this._initPageHtml(index);
					},
					_initContentHtml : function(index){
						this.ulwarp = document.createElement('div');
						this.ulwarp.setAttribute('class','carousel-warp');
						//this.ulwarp.style['height'] = this.windowHeight+'px';
						this.ulwarp.style['width'] = 100*this.len+'%';
						this.content = document.createElement('table');
						this.tbody = document.createElement('tbody');
						this.tr = document.createElement('tr');
						this.tr.style[utils.style.transitionTimingFunction] = this.options.transitionTimingFunction;
						this.tr.style[utils.style.transitionDuration] = this.options.transitionDuration;
						this.tr.style[utils.style.transform] = this.options.originStyle;
						var td,img,imgH=[],imgW=[];
						for(i=0;i<this.len;i++){
							td = document.createElement('td');
							td.style['zIndex'] = '9';
							td.style['width'] = this.windowWidth+'px';
							img = document.createElement('img');
							img.style['maxWidth'] = this.windowWidth+'px';
							img.src = this.img[i];
							td.appendChild(img);
							/*td.style['height'] = img.height+'px';
							td.style['width'] = img.width+'px';*/
							imgH.push(img.height)
							imgW.push(img.width)
							this.tr.appendChild(td);
						}
						this.tr.style['height'] = this.windowHeight+'px';
						this.content.style['height'] = this.windowHeight+'px';
						this.tbody.appendChild(this.tr);
						this.content.appendChild(this.tbody);
						this.ulwarp.appendChild(this.content);
						this.carousel.appendChild(this.ulwarp);
						this._initContentCss(index);
					},
					_initPageHtml:function(index){
						this.pageDiv = document.createElement('div');
						this.pageDiv.setAttribute('class','carousel-page');
						var ol = document.createElement('ol');
						var li;
						for(i=0;i<this.len;i++){
							li = document.createElement('li');
							ol.appendChild(li);
						}
						
						this.pageDiv.appendChild(ol);
						this.carousel.appendChild(this.pageDiv);
					},
					_initClose:function(){
						this.closeDiv = document.createElement('div');
						this.closeDiv.setAttribute('class','carousel-close')
						this.closeDiv.innerHTML = '×';
						this.carousel.appendChild(this.closeDiv);
					},
					_initContentCss : function(index){
						this.content.className = 'clearfix';
						this.tagTd = this.content.getElementsByTagName('td');
						this.tr.style[utils.style.transform] = 'translateX(-'+this.windowWidth*(this.index)+'px) translateY(0)';
						/*(this.tagTd)
						this.tagTd[index].style['zIndex'] = '99';
						this.tagTd[index].style.visibility = 'visible';
					//	this.content.style
						index = parseInt(index,10)
						if(index==this.len&&this.len>=2){
							this.tagTd[index-1].style.visibility = 'visible';
							this.tagTd[index-1].style[utils.style.transform] = this.options.leftStyle;		
						}else if(index == 0&&this.len>1){
							this.tagTd[index+1].style.visibility = 'visible';
							this.tagTd[index+1].style[utils.style.transform] = this.options.rightStyle;
						}else if(index>0&&index<this.len&&this.len>2){
							this.tagTd[index-1].style.visibility = 'visible';
							this.tagTd[index+1].style.visibility = 'visible';
							this.tagTd[index-1].style[utils.style.transform] = this.options.leftStyle;
							this.tagTd[index+1].style[utils.style.transform] = this.options.rightStyle;
						}else if(this.len==1){
							
						}*/
						this.bindEvent();
					},
					bindEvent : function(){
						this.initTouch();
						this.close();
					},
					initClick : function(){
						var _this = this;
						for(i=0;i<this.len;i++){
							this.imgs[i].addEventListener('click',function(e){
								_this.index = e.currentTarget.getAttribute('data-index');
								//_this.remove();
								_this._initBackgrount();
								_this._initCarousel(_this.index);
								_this.updatePage(_this.index);
							})
						}
					},
					initTouch : function(){
						var _this = this;
						this.content.addEventListener('touchstart',function(e){
							e.preventDefault();
							_this.originX = e.changedTouches[0].pageX;
						})
						this.content.addEventListener('touchmove',function(e){
							e.preventDefault();
							_this.newX = e.changedTouches[0].pageX;
						})
						this.content.addEventListener('touchend',function(e){
							e.preventDefault();
							_this.newX = e.changedTouches[0].pageX;
							_this.distanceX = Math.round(_this.originX - _this.newX);
							if(_this.distanceX>=0){
								_this.index<_this.len-1?(_this.scrollNext(),_this.index++):void 0;
							}else{
								_this.index>0?(_this.scrollPrev(),_this.index--):void 0;
							}
						})
					},
					scrollPrev : function(){
						this.tr.style[utils.style.transitionTimingFunction] = this.options.transitionTimingFunction;
						this.tr.style[utils.style.transitionDuration] = this.options.transitionDuration;
						this.tr.style[utils.style.transform] = 'translateX(-'+this.windowWidth*(this.index-1)+'px) translateY(0)';
						/*this.tagTd[this.index-1].style[utils.style.transitionTimingFunction] = this.options.transitionTimingFunction;
						this.tagTd[this.index-1].style[utils.style.transitionDuration] = this.options.transitionDuration;
						this.tagTd[this.index-1].style[utils.style.transform] = this.options.originStyle;
						this.tagTd[this.index-1].style['zIndex'] = '99';
						this.tagTd[this.index].style[utils.style.transitionTimingFunction] = this.options.transitionTimingFunction;
						this.tagTd[this.index].style[utils.style.transitionDuration] = this.options.transitionDuration;
						this.tagTd[this.index].style[utils.style.transform] = this.options.rightStyle;
						this.tagTd[this.index].style['zIndex'] = '9';
						if(this.index-2>=0&&this.index+1<=this.len-1){
							this.tagTd[this.index-2].style.visibility = 'visible';
							this.tagTd[this.index-2].style[utils.style.transform] = this.options.leftStyle;
							this.tagTd[this.index+1].style.visibility = 'hidden';
						}else if(this.index-2<0&&this.index+1<=this.len-1){
							this.tagTd[this.index+1].style.visibility = 'hidden';
						}else if(this.index-2>=0&&this.index+1>this.len-1){
							this.tagTd[this.index-2].style.visibility = 'visible';
							this.tagTd[this.index-2].style[utils.style.transform] = this.options.leftStyle;
						}*/
						this.updatePage(this.index-1);
					},
					scrollNext : function(){
						this.index = parseInt(this.index,10);
						this.tr.style[utils.style.transitionTimingFunction] = this.options.transitionTimingFunction;
						this.tr.style[utils.style.transitionDuration] = this.options.transitionDuration;
						this.tr.style[utils.style.transform] = 'translateX(-'+this.windowWidth*(this.index+1)+'px) translateY(0)';
						/*this.tagTd[this.index+1].style[utils.style.transitionTimingFunction] = this.options.transitionTimingFunction;
						this.tagTd[this.index+1].style[utils.style.transitionDuration] = this.options.transitionDuration;
						this.tagTd[this.index+1].style[utils.style.transform] = this.options.originStyle;
						this.tagTd[this.index+1].style['zIndex'] = '99';
						this.tagTd[this.index].style[utils.style.transitionTimingFunction] = this.options.transitionTimingFunction;
						this.tagTd[this.index].style[utils.style.transitionDuration] = this.options.transitionDuration;
						this.tagTd[this.index].style[utils.style.transform] = this.options.leftStyle;
						this.tagTd[this.index].style['zIndex'] = '9';
						if(this.index-1>=0&&this.index+2<=this.len-1){
							this.tagTd[this.index+2].style.visibility = 'visible';
							this.tagTd[this.index+2].style[utils.style.transform] = this.options.rightStyle;
							this.tagTd[this.index-1].style.visibility = 'hidden';
						}else if(this.index-1<0&&this.index+2<=this.len-1){
							this.tagTd[this.index+2].style.visibility = 'visible';
							this.tagTd[this.index+2].style[utils.style.transform] = this.options.rightStyle;
						}else if(this.index-1>=0&&this.index+2>this.len-1){
							this.tagTd[this.index-1].style.visibility = 'hidden';
						}*/
						this.updatePage(this.index+1);
					},
					updatePage:function(index){
						var li = this.pageDiv.getElementsByTagName('li');
						for (i=0;i<this.len;i++) {
							li[i].style['background'] = '#000';
						}
						li[index].style['background'] = '#fff';
					},
					close:function(){
						var _this = this;
						this.closeDiv.addEventListener('click',function(e){
							document.body.removeChild(_this.carousel);
							document.body.removeChild(_this.background);
							_this.destroy();
						})
					},
					remove:function(){
						/*this.carousel?document.body.removeChild(this.carousel):void 0;
						this.background?document.body.removeChild(this.background):void 0;*/
					},
					destroy:function(){
						this.content.removeEventListener('touchstart');
						this.content.removeEventListener('touchmove');
						this.content.removeEventListener('touchend');
						this.carousel = null;
						this.background = null;
						this.closeDiv = null;
					}
					/*,
					move : function(){
						
					},
					
					show : function(){
						
					},
					hide : function(){
						
					}*/
				};
				window.Carousel = Carousel;
			})(window,document,Math);


})



/*公用弹窗*/
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

/*一些特效*/
var effect = {
    retract: function(id) {
        $('#' + id).slideToggle(800);
    }
};

/*
 
 * 
 * 表情包
 * */
/**
 * @time 2012-12-14
 */

//自定义hashtable
function Hashtable() {
    this._hash = new Object();
    this.put = function(key, value) {
        if (typeof (key) != "undefined") {
            if (this.containsKey(key) == false) {
                this._hash[key] = typeof (value) == "undefined" ? null : value;
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
    this.remove = function(key) { delete this._hash[key]; }
    this.size = function() { var i = 0; for (var k in this._hash) { i++; } return i; }
    this.get = function(key) { return this._hash[key]; }
    this.containsKey = function(key) { return typeof (this._hash[key]) != "undefined"; }
    this.clear = function() { for (var k in this._hash) { delete this._hash[k]; } }
}

var emotions = new Array();
var categorys = new Array();// 分组
var uSinaEmotionsHt = new Hashtable();

// 初始化缓存，页面仅仅加载一次就可以了
$(function() {
	//var app_id = '1362404091';
	$.ajax( {
		//dataType : 'jsonp',
		dataType : 'json',
		//url : 'https://api.weibo.com/2/emotions.json?source=' + app_id,
		url:'/Home/Public/biaoqing',
		success : function(response) {
			var data = response.data;
			for ( var i in data) {
				if (data[i].category == '') {
					data[i].category = '默认';
				}
				if (emotions[data[i].category] == undefined) {
					emotions[data[i].category] = new Array();
					categorys.push(data[i].category);
				}
				emotions[data[i].category].push( {
					name : data[i].phrase,
					icon : data[i].icon
				});
				uSinaEmotionsHt.put(data[i].phrase, data[i].icon);
			}
		}
	});
});

//替换
function AnalyticEmotion(s) {
	if(typeof (s) != "undefined") {
		var sArr = s.match(/\[.*?\]/g);
		for(var i = 0; i < sArr.length; i++){
			if(uSinaEmotionsHt.containsKey(sArr[i])) {
				var reStr = "<img src=\"" + uSinaEmotionsHt.get(sArr[i]) + "\" height=\"22\" width=\"22\" />";
				s = s.replace(sArr[i], reStr);
			}
		}
	}
	return s;
}

(function($){
	$.fn.SinaEmotion = function(target){
		var cat_current;
		var cat_page;
		$(this).click(function(event){
			event.stopPropagation();
			
			//var eTop = target.offset().top + target.height() + 15;
			//var eLeft = target.offset().left - 1;
			var eTop = '185px';
			var eLeft ='20px';
			if($('#emotions .categorys')[0]){
				$('#emotions').css({top: eTop, left: eLeft});
				$('#emotions').toggle();
				return;
			}
			$('#face').after('<div id="emotions"></div>');
			$('#emotions').css({top: eTop, left: eLeft});
			$('#emotions').html('<div>正在加载，请稍候...</div>');
			$('#emotions').click(function(event){
				event.stopPropagation();
			});
			
			//$('#emotions').html('<div style="float:right"><a href="javascript:void(0);" id="prev">&laquo;</a><a href="javascript:void(0);" id="next">&raquo;</a></div><div class="categorys"></div><div class="container"></div><div class="page"></div>');
			$('#emotions').html('<div class="categorys"></div><div class="container"></div>');
			/*$('#emotions #prev').click(function(){
				showCategorys(cat_page - 1);
			});
			$('#emotions #next').click(function(){
				showCategorys(cat_page + 1);
			});*/
			showCategorys();
			showEmotions();
			
		});
		$('body').click(function(){
			$('#emotions').remove();
		});
		$.fn.insertText = function(text){
			this.each(function() {
				if(this.tagName !== 'INPUT' && this.tagName !== 'TEXTAREA') {return;}
				if (document.selection) {
					this.focus();
					var cr = document.selection.createRange();
					cr.text = text;
					cr.collapse();
					cr.select();
				}else if (this.selectionStart || this.selectionStart == '0') {
					var 
					start = this.selectionStart,
					end = this.selectionEnd;
					this.value = this.value.substring(0, start)+ text+ this.value.substring(end, this.value.length);
					this.selectionStart = this.selectionEnd = start+text.length;
				}else {
					this.value += text;
				}
			});        
			return this;
		}
		function showCategorys(){
			var page = arguments[0]?arguments[0]:0;
			if(page < 0 || page >= categorys.length / 5){
				return;
			}
			$('#emotions .categorys').html('');
			cat_page = page;
			//for(var i = page * 5; i < (page + 1) * 5 && i < categorys.length; ++i){
				//$('#emotions .categorys').append($('<a href="javascript:void(0);">' + categorys[i] + '</a>'));
			//}
			$('#emotions .categorys a').click(function(){
				showEmotions($(this).text());
			});
			$('#emotions .categorys a').each(function(){
				if($(this).text() == cat_current){
					$(this).addClass('current');
				}
			});
		}
		function showEmotions(){
			var category = arguments[0]?arguments[0]:'默认';
			
			var page = arguments[1]?arguments[1] - 1:0;
			
			$('#emotions .container').html('');
			$('#emotions .page').html('');
			cat_current = category;
			//alert(emotions[category].length);
			/*for(var i = page * 72; i < (page + 1) * 72 && i < emotions[category].length; ++i){
				$('#emotions .container').append($('<a href="javascript:void(0);" title="' + emotions[category][i].name + '"><img src="' + emotions[category][i].icon + '" alt="' + emotions[category][i].name + '" width="22" height="22" /></a>'));
			}*/
			for(var i = 1; i < 25; ++i){
				$('#emotions .container').append($('<a href="javascript:void(0);" title="' + emotions[category][i].name + '"><img src="' + emotions[category][i].icon + '" alt="' + emotions[category][i].name + '" width="22" height="22" /></a>'));
			}
			
			$('#emotions .container a').click(function(){
				target.insertText($(this).attr('title'));
				$('#emotions').remove();
			});
			/*for(var i = 1; i < emotions[category].length / 72 + 1; ++i){
				$('#emotions .page').append($('<a href="javascript:void(0);"' + (i == page + 1?' class="current"':'') + '>' + i + '</a>'));
			}*/
			$('#emotions .page a').click(function(){
				showEmotions(category, $(this).text());
			});
			$('#emotions .categorys a.current').removeClass('current');
			$('#emotions .categorys a').each(function(){
				if($(this).text() == category){
					$(this).addClass('current');
				}
			});
		}
	}
})(jQuery);

/**
 * ajax请求提交
 * @param url
 * @param param
 * @param callback
 * @param type
 */
function jsonAjax(url, param, callback, type) {
    url = 'http://100011.bluemp.cn/Home' + url;
    _type = 'post';
    if (type.toLowerCase() == 'get') {
        _type = 'get';
    }
    $.ajax({
        url: url,
        type: _type,
        data: param,
        dataFilter: function(data) {
            console.log(typeof data)
			if(eval('(' + data + ')')){
				data = eval('(' + data + ')')
			}else{
				data = data
			}
           
            return data;
        },
        success: callback,
        error: function() {
            console.log("系统异常，请稍后重试！");
        }
    });
}

/**
 * ajax请求提交,同步
 * @param url
 * @param param
 * @param callback
 * @param type
 */
function jsonAjaxSyn(url, param, callback, type) {
    url = 'http://100011.bluemp.cn/Home' + url;
    _type = 'post';
    if (type.toLowerCase() == 'get') {
        _type = 'get';
    }
    $.ajax({
        url: url,
        type: _type,
        async: false,
        data: param,
        dataFilter: function(data) {
            data = eval('(' + data + ')')
            return data;
        },
        success: callback,
        error: function() {
            console.log("系统异常，请稍后重试！");
        }
    });
}



//公用api/tool
if (!window.bluemp) {
    window.bluemp = {};
}
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
    wbhtml += '<dd>微博登录</dd>';
    wbhtml += '</dl>';
    wbhtml += '</a>';

    var qqhtml = '<a href="javascript:void(0);" id="qq">';
    qqhtml += '<dl>';
    qqhtml += '<dt><img src="/Public/Home/Images/QQ-icon.jpg"></dt>';
    qqhtml += '<dd>QQ登录</dd>';
    qqhtml += '</dl>';
    qqhtml += '</a>';
    var wechathtml = '<a href="javascript:void(0);" id="wechat">';
    wechathtml += '<dl>';
    wechathtml += '<dt><img src="/Public/Home/Images/weixin-icon.jpg"></dt>';
    wechathtml += '<dd>微信登录</dd>';
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
bluemp.tool = {};

/** 
 *投票提交tool
 * @config.container {seletor} 初始化dom选择器
 * @config.fnSuccess {function} 投票提交成功callback,处理提交成功之后的其他操作，不包括投票结果显示
 */

bluemp.tool.Vote = function() {
    var vote = function(config) {
        this.targetContainer = config.container;
        if (config.fnSuccess) {
        	this.fnSuccess = config.fnSuccess;
        }
        this._init();
    };

    vote.prototype = {
    	_init: function () {
    		var _this = this;
            jsonAjax("/Portal/getVoteInfo",{
            	articleid: bluemp_aid,
            	voteresult: 0
            },function(data){
				if(data.status=='1'){
					if (!data.info.sid) {
                        return;
					}
					_this.voteInfo = data.info;
					_this._renderVote();
				} else {

				} 
			},'post');
    	},

    	_renderVote: function () {
            var voteTpl = this._getVoteTpl();
            var questionItemTpl; // = this._getQuestionItemTpl();
            var answerItemTpl; // = this._getVoteAnswerItemTpl();
            this.targetContainer.append(voteTpl);
            $(".vote_subject_content").text(this.voteInfo.subject);
            $(".subjectid").val(this.voteInfo.sid);
            if (this.voteInfo.voteresult == 1) {
                $(".vote_submit_area").hide();
            }

            for (var i = 0; i < this.voteInfo.option.length; i++) {
            	// this.voteInfo.option[i]
            	questionItemTpl = this._getQuestionItemTpl();
                var $questionItemTpl = $(questionItemTpl);
                $questionItemTpl.find(".questionid").attr("value", this.voteInfo.option[i].questionid);
                $questionItemTpl.find(".question_content_text").text((i+1) + ". " + this.voteInfo.option[i].question);
                $(".vote_qa_area").append($questionItemTpl);
                for (var j = 0; j < this.voteInfo.option[i].answer.length; j++) {
                	answerItemTpl = this._getVoteAnswerItemTpl(this.voteInfo.optiontype);
                	var $answerItemTpl = $(answerItemTpl);

                    $answerItemTpl.find(".answer_check").attr({
                    	value: this.voteInfo.option[i].answer[j].id,
                    	name: "answer" + this.voteInfo.option[i].questionid,
                    	id: "answer" + this.voteInfo.option[i].questionid + "a" + this.voteInfo.option[i].answer[j].id
                    });
                    
                    $answerItemTpl.find(".answer_result").addClass('answer_result_q' + this.voteInfo.option[i].questionid + "a" + this.voteInfo.option[i].answer[j].id);
                    
                	$answerItemTpl.find(".answer_content").text(this.voteInfo.option[i].answer[j].option);
                	$answerItemTpl.find(".answer_content").attr("for", "answer" + this.voteInfo.option[i].questionid + "a" + this.voteInfo.option[i].answer[j].id);
                	$($(".answer_contents_list")[i]).append($answerItemTpl);
                }
            }
            if (this.voteInfo.voteresult == 1) {
            	this._displayResult(this.voteInfo);
            } else {
                this._addVoteSubmitEvent();
                this._initEvents();
            }
    	},

    	_initEvents: function () {
    		$(".answer_content").on('click', function(event) {
				event.preventDefault();
				event.stopPropagation();
				if (event.target.previousElementSibling.type == "radio") {
					event.target.previousElementSibling.checked = true;
				} else {
					event.target.previousElementSibling.checked = !event.target.previousElementSibling.checked;
				}
				
			});
    	},

    	_getVoteTpl: function () {
    		var tpl = "";
            tpl += '<div class="img_text_n vote_container">';
		    tpl += '    <div class="Hot2_n">';
		    tpl += '        <input type="hidden" value="" class="subjectid">';
		    tpl += '        <p class="Hot2_n_p"><img src="/Public/Home/Images/dcjg_xz_icon.png">&nbsp;<span class="vote_subject_content"></span></p>';
		    tpl += '    </div>';
		    tpl += '    <div class="vote_qa_area"></div>';
		    tpl += '    <p class="vote_submit_area" style="text-align: center;">';
		    tpl += '        <input type="button" class="dytp_tj_btn vote_submit_btn">';
		    tpl += '    </p>';
		    tpl += '</div>';
		    return tpl;
    	},

    	_getQuestionItemTpl: function () {
            var tpl = "";
            tpl += '<div class="Hot2_n">';
			tpl += '    <input type="hidden" class="questionid" value="">';
			tpl += '    <div class="Hot2_n2 question_content">';
			tpl += '        <p class="Hot2_n_p2 question_content_text"></p>';
			tpl += '    </div>';
			tpl += '    <div class="Hot2_n answer_contents">';
			tpl += '        <div class="Hot2_n2 answer_contents_list">';
			tpl += '        </div>';
			tpl += '    </div>';
			tpl += '</div>';
		    return tpl;
    	},

    	_getVoteAnswerItemTpl: function (type) {
    		var tpl = "";
    		tpl += '<p class="Hot2_n_p3">';
    		if (type == 1) {
                tpl += '    <input class="answer_check" value="" id="" type="radio">';
    		} else {
                tpl += '    <input class="answer_check" value="" id="" type="checkbox">';
    		}
			tpl += '    <label class="answer_content"></label>';
			tpl += '	<p class="Hot2_n_p3 answer_result" style="display:none;">';
            tpl += '        <span class="dyjd_span answer_result_color" style=""></span>';
            tpl += '        <span class="dyjd_span answer_result_base_color"></span>';
            tpl += '        <span class="dyjd_num_span answer_result_percent"></span>';
            tpl += '    </p>';
			tpl += '</p>';
			return tpl;
    	},

    	_addVoteSubmitEvent: function () {
    		var _this = this;
			$('.vote_submit_btn').unbind('click').click(function(){
				if(loginCheck()){
					var $container = $(this.parentNode.parentNode);
					var result = {};
					result.subjectid = $container.find(".subjectid").val();
					result.articleid = bluemp_aid;
					result.qainfo = {};
					var questions = $container.find(".questionid");
					for (var i = 0; i < questions.length; i++) {
						var questionid = $(questions[i]).val();
						var answers;
						if ($(questions[0]).parent().find('.answer_contents').find('input[type="radio"]').length > 0) {
				            answers = $(questions[i]).parent().find('.answer_contents').find('input[type="radio"]');
						} else {
							answers = $(questions[i]).parent().find('.answer_contents').find('input[type="checkbox"]');
						}
						var checkedVal = [];
						for (var j = 0; j < answers.length; j++) {
							if(answers[j].checked == true){
								if (answers[j].value > 0 && answers[j].value < 7) {
                                    checkedVal.push(answers[j].value);
								} else {
								    popup.remind("您提交的数据存在异常")
								    return false;	
								}
							}
						}
						if (checkedVal.length == 0) {
						    popup.remind("您的答案还未填写完全")
						    return false;
						}
						result.qainfo[i] = checkedVal;
					}
					jsonAjax("/Portal/submitVote",result,function(data){
						if(data.status=='1'){
							_this._displayResult(data.info);
							if (_this.fnSuccess) {
                                _this.fnSuccess();
							}
						} else {
	                        console.error("submit res = " + JSON.stringify(data));
						} 
					},'post');	
				}
			})
    	},

    	_displayResult: function (voteInfo) {
    		$(".answer_check").remove();
    		$(".vote_submit_area").remove();
    		$(".answer_result").show();
    		var answerRsts = $(".answer_result");
    		var answerData = [];
    		for (var i = 0; i < voteInfo.option.length; i++) {
    			for (var j = 0; j < voteInfo.option[i].answer.length; j++) {
    				var answerItem = {};
    				answerItem.id = voteInfo.option[i].answer[j].id;
    				answerItem.color = "#0066C" + j;
                    if(voteInfo.option[i].optionsum == 0){
                        percent = 0;
                        answerItem.width = "0%";
                    }else{
                        var percent = parseInt(voteInfo.option[i].answer[j].selectednum) / parseInt(voteInfo.option[i].optionsum);
                        percent = percent.toFixed(5);
                        percent = percent.slice(0, 5);
                        percent = percent * 100;
                        percent = percent.toFixed(1);
                        answerItem.width = parseInt(voteInfo.option[i].answer[j].selectednum) / parseInt(voteInfo.option[i].optionsum) * 70 + "%";
                    }
    				answerItem.percent = voteInfo.option[i].answer[j].selectednum + "(" + percent + "%)";
    				answerData.push(answerItem);
    			}
    		}
    		for (var i = 0; i < answerRsts.length; i++) {
    			$(answerRsts[i]).find('.answer_result_color').css({
    				color: answerData[i].color,
    				width: answerData[i].width
    			});
    			$(answerRsts[i]).find('.answer_result_percent').text(answerData[i].percent);
    		}
    	}
    };

    return vote;
}()

/* 
 *弹窗tool
 * 
 * @config.html {string} 弹窗html
 * @config.fnSuccess {function} 请求成功callback
 * @config.fnFailed {function} 关闭callback
 */

bluemp.tool.Dialog = function() {
    var dialog = function(config) {
        var DEFAULT_CONFIG = {
            closeBtn: false,
        };

        var _this = this;
        this._config = $.extend({}, DEFAULT_CONFIG, config);
        this.fnSuccess = config.fnSuccess;
        this.fnFailed = config.fnFailed;
        var index = $.layer({
            type: 1,
            title: false,
            area: ['100%', '210px'],
            shade: [0.5, '#000'],
            border: [0],
            offset: ["0px", "0%"],
            closeBtn: false,
            page: {
                html: _this._config.html
            },
            success: function() {
                $(document).bind('touchmove', function(event) {
                    event.preventDefault();
                })
                $('#closelay').unbind('click').click(function() {
                    layer.close(index);
                    if(typeof _this._config.fnFailed()=='function'){
                    	_this._config.fnFailed();
                    }
                	
                    $(document).unbind('touchmove');
                })
                _this._config.fnSuccess();
                //$(document).unbind('touchmove');释放滚动事件
            }
        })
    };

    return dialog;
}()

/** 
 *文章回复tool
 *
 * @config.container {seletor} 初始化dom选择器
 * @config.params {object}
 * @config.params.aid {string} 文章id
 * 
 * @config.fnSuccess {function} 请求成功callback
 * @config.fnFailed {function} 请求失败callback
 */
bluemp.tool.Reply = function(){
	var re = function(config){
		var DEFAULT_CONFIG = {
		
		};
		
		var _this = this;
		var $container = $(config.container);
		this.container = $container;
		this._config = $.extend({}, DEFAULT_CONFIG, config);
		this.fnSuccess = config.fnSuccess;
		this.fnFailed = config.fnFailed;
		this.flag = true;
		this.container.click(function(){
			if(loginCheck()&&_this.flag){
				_this.flag = false;
				_this._init(config.fnSuccess,config.fnFailed);
			}else{
			
			};
			
		});
	};
	
	re.prototype = {
		_init : function(fnS,fnF){
			var p = {};
			p.params = {};
			p.params.aid = this._config.params.aid;
			var _this = this;//三层判断，文章是否禁止评论，用户是否禁言，是否允许匿名
			p.fnSuccess = function(dataC){
				var q = {};
				q.fnSuccess = function(dataR){
					var o = {};
					o.params = {};
					o.params.aid = _this._config.params.aid;
					o.fnSuccess = function(data){
						if(data.status=='1'){
							var is_anonymity = data.is_anonymity;
							var html = _this._getHtml(is_anonymity);
							var config = {};
							config.html = html;
							config.fnSuccess = function(){
								_this._numLimit();
								_this._initFace();
	                            $('#postreply').unbind('click').click(function(){   //重要改动
								//$(document).unbind('click').on('click','#postreply',function(){
									var params = {};
									params.aid = p.params.aid;
									$('#anonymous').is(':checked')?params.anonymity = 0:params.anonymity = 1;
									params.content = $('#reply-content').val();
									var m = {};
									m.params = params;
									m.fnSuccess = function(data){
										_this.flag = true;
										fnS(data);
									};
									m.fnFailed = function(data){
										_this.flag = true;
										fnF(data);
									};
									bluemp.api.Reply(m);
									$(document).unbind('touchmove');
									
								})
							}
							
							config.fnFailed = function(){
								_this.flag = true;
							}
							new bluemp.tool.Dialog(config)
						}else{
							popup.remind(data.info);
						}
					}
					bluemp.api.IsAnonymity(o)
				}
				q.fnFailed = function(dataR){
					popup.remind(dataR.info);
					return false;
				}
				bluemp.api.Silenced(q);
			}
			p.fnFailed = function(dataC){
				popup.remind(dataC.info);
				return false;
			}
			bluemp.api.noComment(p)
			
		},
		
		_getHtml : function(data){
			var 	html= '';
	        html+='<div class="huifutanchu">';
			html+='<div class="huifu-textarea">';
		    html+='<textarea style="width:100%;maxlength:140;" id="reply-content"  class="emotion chackTextarea"></textarea>';
			html+='</div><div class="huifu_sz"><span style="float:right" id="textcount" class="num">140</span></div>';
			html+='<ul class = "reply-ul"><li class="reply-ul_left"><span class="span2"><a href="javascript:void(0);" id="face"><img src="/Public/Home/Images/biaoqing-icon.jpg"></a></span></li>';
			if(data=='1'){
				html+='<li class="reply-ul_left"><h2><span><input type="checkbox" id="anonymous">匿名回复</span></h2></li>';
			}
			html+='';
			html+='<li class="reply-ul_right"><div class="send-2btn" style="width:100%;"><div class="huifu_sz">';
			html+='<input type="button" class="input1" value="取消" id="closelay">';
			html+='<input type="button" class="input2" value="发送" id="postreply">';
			html+='</li>';
			html+='</div>';
			html+='</ul></div>';
			
			return html;
		},
		
		_numLimit : function(){
			var txtobj={
				   divName:"huifutanchu", //外层容器的class
				   textareaName:"chackTextarea", //textarea的class
				   numName:"num", //数字的class
				   num:140 //数字的最大数目
				} 
			$("."+txtobj.textareaName).on("focus",function(){
				$b=$(this).parents("."+txtobj.divName).find("."+txtobj.numName); //获取当前的数字
				$par=$b.parent(); 
				$onthis=$(this); //获取当前的textarea
				$num = txtobj.num;
				var setNum=setInterval(function(){
					var strlen=0; //初始定义长度为0
					var txtval = $.trim($onthis.val());
					for(var i=0;i<txtval.length;i++){
						if(isChinese(txtval.charAt(i))==true){
							strlen=strlen+2;//中文为2个字符
						}else{
							strlen=strlen+1;//英文一个字符
						}
					}
					strlen=Math.ceil(strlen/2);//中英文相加除2取整数
					if($num-strlen<0){
						$par.html('<span style="float:right;" id="textcount" class="num">超出<b  style="color:red;font-weight:lighter;" class='+txtobj.numName+'>'+Math.abs($num-strlen)+'</b> 字</span>'); //超出的样式
						$('#postreply').attr("disabled",true).removeClass("input2").addClass("input1");
					}
					else{
						$par.html('<span style="float:right" id="textcount" class="num">'+($num-strlen)+'</span>'); //正常时候
						$('#postreply').attr("disabled",false).removeClass("input1").addClass("input2");
					}
					$b.html($num-strlen); 
				},500);    
				function isChinese(str){  //判断是不是中文
					var reCh=/[u00-uff]/;
					return !reCh.test(str);
				}
			});
		},
		
		_initFace : function(){
			$('#face').SinaEmotion($('.emotion'));
		}
	};
	return re; 
}()


/** 
 *文章回复tool模块化用
 *
 * @config.container {seletor} 初始化dom选择器
 * @config.params {object}
 * @config.params.aid {string} 文章id
 * 
 * @config.fnSuccess {function} 请求成功callback
 * @config.fnFailed {function} 请求失败callback
 */
bluemp.tool.blockReply = function(){
	var re = function(config){
		var DEFAULT_CONFIG = {
		
		};
		
		var _this = this;
		var $container = $(config.container);
		this.container = $container;
		this._config = $.extend({}, DEFAULT_CONFIG, config);
		this.fnSuccess = config.fnSuccess;
		this.fnFailed = config.fnFailed;
		this.flag = true;
		this.container.click(function(){
			if(loginCheck()&&_this.flag){
				_this.flag = false;
				_this._init(config.fnSuccess,config.fnFailed);
			}else{
			
			};
			
		});
	};
	
	re.prototype = {
		_init : function(fnS,fnF){
			var p = {};
			p.params = {};
			p.params.aid = this._config.params.aid;
			var _this = this;//三层判断，文章是否禁止评论，用户是否禁言，是否允许匿名
			p.fnSuccess = function(dataC){
				var q = {};
				q.fnSuccess = function(dataR){
					var o = {};
					o.params = {};
					o.params.aid = _this._config.params.aid;
					o.fnSuccess = function(data){
						if(data.status=='1'){
							var is_anonymity = data.is_anonymity;
							var html = _this._getHtml(is_anonymity);
							var config = {};
							config.html = html;
							config.fnSuccess = function(){
								_this._numLimit();
								_this._initFace();
	                            $('#postreply').unbind('click').click(function(){   //重要改动
								//$(document).unbind('click').on('click','#postreply',function(){
									var params = {};
									params.aid = p.params.aid;
									$('#anonymous').is(':checked')?params.anonymity = 0:params.anonymity = 1;
									params.content = $('#reply-content').val();
									var m = {};
									m.params = params;
									m.fnSuccess = function(data){
										_this.flag = true;
										fnS(data);
									};
									m.fnFailed = function(data){
										_this.flag = true;
										fnF(data);
									};
									bluemp.api.blockReply(m);
									$(document).unbind('touchmove');
									
								})
							}
							
							config.fnFailed = function(){
								_this.flag = true;
							}
							new bluemp.tool.Dialog(config)
						}else{
							popup.remind(data.info);
						}
					}
					bluemp.api.IsAnonymity(o)
				}
				q.fnFailed = function(dataR){
					popup.remind(dataR.info);
					return false;
				}
				bluemp.api.Silenced(q);
			}
			p.fnFailed = function(dataC){
				popup.remind(dataC.info);
				return false;
			}
			bluemp.api.noComment(p)
			
		},
		
		_getHtml : function(data){
			var 	html= '';
	        html+='<div class="huifutanchu">';
			html+='<div class="huifu-textarea">';
		    html+='<textarea style="width:100%;maxlength:140;" id="reply-content"  class="emotion chackTextarea"></textarea>';
			html+='</div><div class="huifu_sz"><span style="float:right" id="textcount" class="num">140</span></div>';
			html+='<ul class = "reply-ul"><li class="reply-ul_left"><span class="span2"><a href="javascript:void(0);" id="face"><img src="/Public/Home/Images/biaoqing-icon.jpg"></a></span></li>';
			if(data=='1'){
				html+='<li class="reply-ul_left"><h2><span><input type="checkbox" id="anonymous">匿名回复</span></h2></li>';
			}
			html+='';
			html+='<li class="reply-ul_right"><div class="send-2btn" style="width:100%;"><div class="huifu_sz">';
			html+='<input type="button" class="input1" value="取消" id="closelay">';
			html+='<input type="button" class="input2" value="发送" id="postreply">';
			html+='</li>';
			html+='</div>';
			html+='</ul></div>';
			
			return html;
		},
		
		_numLimit : function(){
			var txtobj={
				   divName:"huifutanchu", //外层容器的class
				   textareaName:"chackTextarea", //textarea的class
				   numName:"num", //数字的class
				   num:140 //数字的最大数目
				} 
			$("."+txtobj.textareaName).on("focus",function(){
				$b=$(this).parents("."+txtobj.divName).find("."+txtobj.numName); //获取当前的数字
				$par=$b.parent(); 
				$onthis=$(this); //获取当前的textarea
				$num = txtobj.num;
				var setNum=setInterval(function(){
					var strlen=0; //初始定义长度为0
					var txtval = $.trim($onthis.val());
					for(var i=0;i<txtval.length;i++){
						if(isChinese(txtval.charAt(i))==true){
							strlen=strlen+2;//中文为2个字符
						}else{
							strlen=strlen+1;//英文一个字符
						}
					}
					strlen=Math.ceil(strlen/2);//中英文相加除2取整数
					if($num-strlen<0){
						$par.html('<span style="float:right;" id="textcount" class="num">超出<b  style="color:red;font-weight:lighter;" class='+txtobj.numName+'>'+Math.abs($num-strlen)+'</b> 字</span>'); //超出的样式
						$('#postreply').attr("disabled",true).removeClass("input2").addClass("input1");
					}
					else{
						$par.html('<span style="float:right" id="textcount" class="num">'+($num-strlen)+'</span>'); //正常时候
						$('#postreply').attr("disabled",false).removeClass("input1").addClass("input2");
					}
					$b.html($num-strlen); 
				},500);    
				function isChinese(str){  //判断是不是中文
					var reCh=/[u00-uff]/;
					return !reCh.test(str);
				}
			});
		},
		
		_initFace : function(){
			$('#face').SinaEmotion($('.emotion'));
		}
	};
	return re; 
}()
/** 
 *话题回复tool
 *
 * @config.container {seletor} 初始化dom选择器
 * @config.params {object}
 * @config.params.htid {string} 话题id
 * @config.params.is_anonymity {string} 是否匿名
 * @config.params.rid {string} 话题回复id（用来再回复）
 * 
 * @config.fnSuccess {function} 请求成功callback
 * @config.fnFailed {function} 请求失败callback
 */
bluemp.tool.topicReply = function(){
	var re = function(config){
		var DEFAULT_CONFIG = {
		
		};
		
		var _this = this;
		var $container = $(config.container);
		this.container = $container;
		this._config = $.extend({}, DEFAULT_CONFIG, config);
		this.fnSuccess = config.fnSuccess;
		this.fnFailed = config.fnFailed;
		this.flag = true;
		this.container.click(function(){
			if(loginCheck()){
				_this._init(config.fnSuccess,config.fnFailed);
			}else{
			
			};
			
		});
	};
	
	re.prototype = {
		_init : function(fnS,fnF){
			var p = {},q = {};
			p = this._config;
			var _this = this;
			q.fnSuccess = function(dataR){
				var is_anonymity = p.params.is_anonymity;
				var html = _this._getHtml(is_anonymity);
				var config = {};
				config.html = html;
				config.fnSuccess = function(){
					_this._numLimit();
					_this._initFace();
                    $('#postreply').unbind('click').click(function(){   //重要改动
					//$(document).unbind('click').on('click','#postreply',function(){
						var params = {};
						params.htid = p.params.htid;
						$('#anonymous').is(':checked')?params.anonymity = 0:params.anonymity = 1;
						params.content = $('#reply-content').val();
						if(p.params.rid){
							params.rid = p.params.rid;
						}
						var m = {};
						m.params = params;
						m.fnSuccess = function(data){
							_this.flag = true;
							fnS(data);
						};
						m.fnFailed = function(data){
							_this.flag = true;
							fnF(data);
						};
						
						if(_this.flag){
							_this.flag = false;
							bluemp.api.ReplyTopic(m);
						}
						$(document).unbind('touchmove');
						
					})
				}
				config.fnFailed = function(){
					_this.flag = true;
				}
				new bluemp.tool.Dialog(config)
			}
			q.fnFailed = function(dataR){
				popup.remind(dataR.info);
				return false;
			}
			bluemp.api.Silenced(q);
		},
		
		_getHtml : function(data){
			var 	html= '';
	        html+='<div class="huifutanchu">';
			html+='<div class="huifu-textarea">';
		    html+='<textarea style="width:100%;maxlength:140;" id="reply-content"  class="emotion chackTextarea"></textarea>';
			html+='</div><div class="huifu_sz"><span style="float:right" id="textcount" class="num">140</span></div>';
			html+='<ul class = "reply-ul"><li class="reply-ul_left"><span class="span2"><a href="javascript:void(0);" id="face"><img src="/Public/Home/Images/biaoqing-icon.jpg"></a></span></li>';
			if(data=='1'){
				html+='<li class="reply-ul_left"><h2><span><input type="checkbox" id="anonymous">匿名回复</span></h2></li>';
			}
			html+='';
			html+='<li class="reply-ul_right"><div class="send-2btn" style="width:100%;"><div class="huifu_sz">';
			html+='<input type="button" class="input1" value="取消" id="closelay">';
			html+='<input type="button" class="input2" value="发送" id="postreply">';
			html+='</li>';
			html+='</div>';
			html+='</ul></div>';
			
			return html;
		},
		
		_numLimit : function(){
			var txtobj={
				   divName:"huifutanchu", //外层容器的class
				   textareaName:"chackTextarea", //textarea的class
				   numName:"num", //数字的class
				   num:140 //数字的最大数目
				} 
			$("."+txtobj.textareaName).on("focus",function(){
				$b=$(this).parents("."+txtobj.divName).find("."+txtobj.numName); //获取当前的数字
				$par=$b.parent(); 
				$onthis=$(this); //获取当前的textarea
				$num = txtobj.num;
				var setNum=setInterval(function(){
					var strlen=0; //初始定义长度为0
					var txtval = $.trim($onthis.val());
					for(var i=0;i<txtval.length;i++){
						if(isChinese(txtval.charAt(i))==true){
							strlen=strlen+2;//中文为2个字符
						}else{
							strlen=strlen+1;//英文一个字符
						}
					}
					strlen=Math.ceil(strlen/2);//中英文相加除2取整数
					if($num-strlen<0){
						$par.html('<span style="float:right;" id="textcount" class="num">超出<b  style="color:red;font-weight:lighter;" class='+txtobj.numName+'>'+Math.abs($num-strlen)+'</b> 字</span>'); //超出的样式
						$('#postreply').attr("disabled",true).removeClass("input2").addClass("input1");
					}
					else{
						$par.html('<span style="float:right" id="textcount" class="num">'+($num-strlen)+'</span>'); //正常时候
						$('#postreply').attr("disabled",false).removeClass("input1").addClass("input2");
					}
					$b.html($num-strlen); 
				},500);    
				function isChinese(str){  //判断是不是中文
					var reCh=/[u00-uff]/;
					return !reCh.test(str);
				}
			});
		},
		
		_initFace : function(){
			$('#face').SinaEmotion($('.emotion'));
		}
	};
	return re; 
}()

/**
 *话题回复框tool
 *
 * @config.params {object}
 * @config.params.tid {string} 话题id
 * @config.params.is_anonymity {string} 是否匿名
 * @config.params.rid {string} 话题回复id（用来再回复）
 * 
 * @config.fnSuccess {function} 请求成功callback
 * @config.fnFailed {function} 请求失败callback
 */
bluemp.tool.topicReplyBox = function(){
	var re = function(config){
		var DEFAULT_CONFIG = {
		
		};
		
		var _this = this;
		var $container = $(config.container);
		this.container = $container;
		this._config = $.extend({}, DEFAULT_CONFIG, config);
		this.fnSuccess = config.fnSuccess;
		this.fnFailed = config.fnFailed;
		this.flag = true;
		this.init(config.fnSuccess,config.fnFailed);
	};
	
	re.prototype = {
		init : function(fnS,fnF){
			var p = {};
			p = this._config;
			var _this = this;
			var is_anonymous = p.params.is_anonymous;
			var html = _this._getHtml(is_anonymous);
			var config = {};
			config.html = html;
			config.fnSuccess = function(){
				_this._numLimit();
				_this._initFace();
                $('#postreply').unbind('click').click(function(){   //重要改动
				//$(document).unbind('click').on('click','#postreply',function(){
					var params = {};
					params.htid = p.params.tid;
					$('#anonymous').is(':checked')?params.anonymity = 0:params.anonymity = 1;
					params.content = $('#reply-content').val();
					if (params.content == '') {
						alert('回复内容不能为空');
						return false;
					}
					if(p.params.rid){
						params.rid = p.params.rid;
					}
					var m = {};
					m.params = params;
					m.fnSuccess = function(data){
						_this.flag = true;
						popup.remind(data.msg);
						layer.closeAll();
						fnS(data);
					};
					m.fnFailed = function(data){
						_this.flag = true;
						fnF(data);
						popup.remind(data.msg);
						if (data.status == '-2') {
							
						} else if (data.status == '-1') {
							layer.closeAll();
							login();
						}
					};
					
					if(_this.flag){
						_this.flag = false;
						bluemp.api.ReplyTopicBlock(m);
					}
					$(document).unbind('touchmove');
					
				})
			}
			config.fnFailed = function(){
				_this.flag = true;
			}
			new bluemp.tool.Dialog(config)
		},
		
		_getHtml : function(data){
			var 	html= '';
	        html+='<div class="huifutanchu">';
			html+='<div class="huifu-textarea">';
		    html+='<textarea style="width:100%;maxlength:140;" id="reply-content"  class="emotion chackTextarea"></textarea>';
			html+='</div><div class="huifu_sz"><span style="float:right" id="textcount" class="num">140</span></div>';
			html+='<ul class = "reply-ul"><li class="reply-ul_left"><span class="span2"><a href="javascript:void(0);" id="face"><img src="/Public/Home/Images/biaoqing-icon.jpg"></a></span></li>';
			if(data=='1'){
				html+='<li class="reply-ul_left"><h2><span><input type="checkbox" id="anonymous">匿名回复</span></h2></li>';
			}
			html+='';
			html+='<li class="reply-ul_right"><div class="send-2btn" style="width:100%;"><div class="huifu_sz">';
			html+='<input type="button" class="input1" value="取消" id="closelay">';
			html+='<input type="button" class="input2" value="发送" id="postreply">';
			html+='</li>';
			html+='</div>';
			html+='</ul></div>';
			
			return html;
		},
		
		_numLimit : function(){
			var txtobj={
				   divName:"huifutanchu", //外层容器的class
				   textareaName:"chackTextarea", //textarea的class
				   numName:"num", //数字的class
				   num:140 //数字的最大数目
				} 
			$("."+txtobj.textareaName).on("focus",function(){
				$b=$(this).parents("."+txtobj.divName).find("."+txtobj.numName); //获取当前的数字
				$par=$b.parent(); 
				$onthis=$(this); //获取当前的textarea
				$num = txtobj.num;
				var setNum=setInterval(function(){
					var strlen=0; //初始定义长度为0
					var txtval = $.trim($onthis.val());
					for(var i=0;i<txtval.length;i++){
						if(isChinese(txtval.charAt(i))==true){
							strlen=strlen+2;//中文为2个字符
						}else{
							strlen=strlen+1;//英文一个字符
						}
					}
					strlen=Math.ceil(strlen/2);//中英文相加除2取整数
					if($num-strlen<0){
						$par.html('<span style="float:right;" id="textcount" class="num">超出<b  style="color:red;font-weight:lighter;" class='+txtobj.numName+'>'+Math.abs($num-strlen)+'</b> 字</span>'); //超出的样式
						$('#postreply').attr("disabled",true).removeClass("input2").addClass("input1");
					}
					else{
						$par.html('<span style="float:right" id="textcount" class="num">'+($num-strlen)+'</span>'); //正常时候
						$('#postreply').attr("disabled",false).removeClass("input1").addClass("input2");
					}
					$b.html($num-strlen); 
				},500);    
				function isChinese(str){  //判断是不是中文
					var reCh=/[u00-uff]/;
					return !reCh.test(str);
				}
			});
		},
		
		_initFace : function(){
			$('#face').SinaEmotion($('.emotion'));
		}
	};
	return re; 
}()



/** 
 * 分享模块
 * @config.container {seletor} 初始化dom选择器
 * 
 *
 * 
 */
bluemp.tool.Share = function() {
    var share = function(config) {
        var _this = this;
        _this.container = $(config.container);

        _this.container.click(function() {
            $.layer({
                type: 2,
                area: ['272px', '315px'],
                title: false,
                shade: [0.5, '#8E8E8E'],
                border: [0],
                bgcolor: 'opacity:0; filter:alpha(opacity=100);',
                offset: [($(window).height() - '350') / 2 + 'px', ''],
                shadeClose: true,
                //closeBtn: false,
                iframe: {src: '/Home/Public/share?url=' + window.location.href + '&bdText=' + document.title}
            });
        })
    }
    return share;
}()

bluemp.api = {};
/**
 * 文章回复
 * @config {object} 
 * @config.params {object}
 * @config.params.aid {string} 文章id
 * @config.params.anonymity {string} 是(1)否(0)匿名
 * @config.params.content {string} 评论内容
 * @config.fnSuccess {function} 请求成功callback
 * @config.fnFailed {function} 请求失败callback
 */

bluemp.api.Reply = function() {
    var reply = function(config) {
        jsonAjax('/portal/newcomment', config.params, function(data) {
            if (data.status == '1') {
                config.fnSuccess(data);
                layer.closeAll();
            } else {
            	config.fnFailed(data);
            }
        }, 'get');
    }
    return reply;
}()

/**
 * 文章回复 模块化用
 * @config {object} 
 * @config.params {object}
 * @config.params.aid {string} 文章id
 * @config.params.anonymity {string} 是(1)否(0)匿名
 * @config.params.content {string} 评论内容
 * @config.fnSuccess {function} 请求成功callback
 * @config.fnFailed {function} 请求失败callback
 */

bluemp.api.blockReply = function() {
    var reply = function(config) {
        jsonAjax('/Interface/comment', config.params, function(data) {
            if (data.status == '1') {
                config.fnSuccess(data);
                layer.closeAll();
            } else {
            	config.fnFailed(data);
            }
        }, 'get');
    }
    return reply;
}()
/**
 * 判断文章所在频道是否支持匿名
 * @config.fnSuccess {function} 请求成功callback
 * @config.fnFailed {function} 请求失败callback
 *
 */

bluemp.api.IsAnonymity = function() {
    var clazz = function(config) {
        jsonAjax('/portal/com', config.params, function(data) {
            if (data.status == '1') {
                config.fnSuccess(data);
            } else {
                config.fnFailed(data);
            }
        }, 'get');
    }
    return clazz;
}()
/**
 * 判断用户是否被禁言
 * 
 * @config.fnSuccess {function} 请求成功callback
 * @config.fnFailed {function} 请求失败callback
 */

bluemp.api.Silenced = function() {
    var silenced = function(config) {
        jsonAjaxSyn('/Portal/comRole', {}, function(data) {
            if (data.status == '1') {
                config.fnSuccess(data);
            } else {
                config.fnFailed(data);
            }
        }, 'get');
    }
    return silenced;
}()

/**
 * 
 * 文章话题的评论点赞
 * @config.params {Object} 
 * @config.params.type {String} 1、文章,!1、话题
 * @config.params.id {String} 评论 id
 * @config.fnSuccess {function} 请求成功callback
 * @config.fnFailed {function} 请求失败callback
 */

bluemp.api.Exellent = function() {
    var exellent = function(config) {
        var url = '';
        if (config.params.type == 1) {
            url = '/Portal/comlike';
        } else {
            url = '/Like/ajax';
        }
        var o = {};
        o.fnSuccess = function(dataR){
			jsonAjax(url, config.params, function(data) {
				if (data.status == '1') {
					config.fnSuccess(data);
				} else {
					config.fnFailed(data);
				}
			}, 'get');
		}
        o.fnFailed = function(dataR){
			popup.remind(dataR.info);
			return false;
		}
		bluemp.api.Silenced(o)
        

    }
    return exellent;
}()
/**
 * 
 * 文章点赞
 * @config.params {Object} 
 * @config.params.id {String} 文章id
 * 
 * @config.fnSuccess {function} 请求成功callback
 * @config.fnFailed {function} 请求失败callback
 *
 */

bluemp.api.plugExellent = function() {
    var exellent = function(config) {
     	var o = {};
     	o.fnSuccess = function(dataR){
			jsonAjax('/Portal/praise', config.params, function(data) {
				if (data.status == '1') {
					config.fnSuccess(data);
				} else {
					config.fnFailed(data);
				}
			}, 'get');
		}
     	o.fnFailed = function(dataR){
			popup.remind(dataR.info);
			return false;
		}
		bluemp.api.Silenced(o)
        

    }
    return exellent;
}()


/**
 * 
 * 删除文章评论
 *
 * @config.params {Object} 
 * @config.params.id {String} 评论id
 * 
 * @config.fnSuccess {function} 请求成功callback
 * @config.fnFailed {function} 请求失败callback
 */
bluemp.api.DeleteReply = function() {
    var deleteReply = function(config) {
        jsonAjax('/Portal/commentdel', config.params, function(data) {
            if (data.status == '1') {
                config.fnSuccess(data);
            } else {
                config.fnFailed(data);
            }
        }, 'get');
    }
    return deleteReply;
}()

/**
 * 话题回复/话题评论回复
 *
 * @config.params {Object} 
 * @config.params.htid {String} 话题id 
 * @config.params.content {String} 回复内容
 * @config.params.rid {String} 回复id（用于回复他人回复）
 * @config.params.anonymous {String} 是(1)否(0)匿名
 * 
 * @config.fnSuccess {function} 请求成功callback
 * @config.fnFailed {function} 请求失败callback
 *
 */
bluemp.api.ReplyTopic = function() {
    var reply = function(config) {
        jsonAjax('/Reply/post', config.params, function(data) {
            if (data.status == '1') {
                config.fnSuccess(data);
            } else {
                config.fnFailed(data);
            }
        }, 'post');
    }
    return reply;
}();

/**
 * 话题回复/话题评论回复
 *
 * @config.params {Object} 
 * @config.params.htid {String} 话题id 
 * @config.params.content {String} 回复内容
 * @config.params.rid {String} 回复id（用于回复他人回复）
 * @config.params.anonymous {String} 是(0)否(1)匿名
 * 
 * @config.fnSuccess {function} 请求成功callback
 * @config.fnFailed {function} 请求失败callback
 *
 */
bluemp.api.ReplyTopicBlock = function() {
    var reply = function(config) {
        jsonAjax('/Interface/replypost', config.params, function(data) {
            if (data.status == '1') {
                config.fnSuccess(data);
            } else {
                config.fnFailed(data);
            }
        }, 'post');
    }
    return reply;
}();
/**
 * 话题本版块置顶
 *
 * @config.params {Object} 
 * @config.params.htid {String} 话题id 
 * 
 * @config.fnSuccess {function} 请求成功callback
 * @config.fnFailed {function} 请求失败callback
 *
 */
bluemp.api.topicTop = function() {
    var reply = function(config) {
        jsonAjax('/Forum/top', config.params, function(data) {
            if (data.status == '1') {
                config.fnSuccess(data);
            } else {
                config.fnFailed(data);
            }
        }, 'get');
    }
    return reply;
}();

/**
 * 话题本版块取消置顶
 *
 * @config.params {Object} 
 * @config.params.htid {String} 话题id 
 * 
 * @config.fnSuccess {function} 请求成功callback
 * @config.fnFailed {function} 请求失败callback
 *
 */
bluemp.api.topicCancelTop = function() {
    var reply = function(config) {
        jsonAjax('/Forum/untop', config.params, function(data) {
            if (data.status == '1') {
                config.fnSuccess(data);
            } else {
                config.fnFailed(data);
            }
        }, 'get');
    }
    return reply;
}();

/**
 * 删除话题
 *
 * @config.params {Object} 
 * @config.params.id {String} 话题id 
 * 
 * @config.fnSuccess {function} 请求成功callback
 * @config.fnFailed {function} 请求失败callback
 *
 */
bluemp.api.deleteTopic = function() {
    var reply = function(config) {
        jsonAjax('/Forum/delete', config.params, function(data) {
            if (data.status == '1') {
                config.fnSuccess(data);
            } else {
                config.fnFailed(data);
            }
        }, 'get');
    }
    return reply;
}();

/**
 * 删除话题回复
 * @config.params.id {String} 回复id
 * 
 * @config.fnSuccess {function} 请求成功callback
 * @config.fnFailed {function} 请求失败callback
 *
 */
bluemp.api.DeleteReplyTopic = function() {
    var reply = function(config) {
        jsonAjax('/Reply/delete', config.params, function(data) {
            if (data.status == '1') {
                config.fnSuccess(data);
            } else {
                config.fnFailed(data);
            }
        }, 'get');
    }
    return reply;
}();

/**
 * 
 * 发布话题
 * @config.params.title {String} 内容
 * @config.params.saveimg {Array} 图片url
 * 
 * @config.fnSuccess {function} 请求成功callback
 * @config.fnFailed {function} 请求失败callback
 */

bluemp.api.SubmitTopic = function() {
    var submitTopic = function(config) {
        jsonAjax('/Forum/publish', config.params, function(data) {
            if (data.status == '1') {
                config.fnSuccess(data);
            } else {
                config.fnFailed(data);
            }
        }, 'post');
    }
    return submitTopic;
}()


/**
 * 
 * 频道禁止评论
 * @config.params.aid {String} 文章id
 * 
 * @config.fnSuccess {function} 请求成功callback
 * @config.fnFailed {function} 请求失败callback
 */

bluemp.api.noComment = function() {
    var noComment = function(config) {
        jsonAjax('/Portal/articlecom', config.params, function(data) {
            if (data.status == '1') {
                config.fnSuccess(data);
            } else {
                config.fnFailed(data);
            }
        }, 'get');
    }
    return noComment;
}()

/**
 * 
 * 瀑布流获取文章列表
 *
 *
 * @config.params.cid {String} 频道id
 * @config.params.page {String} 页数
 * @config.params.minid {String} 当前页最小文章id
 * 
 * 
 * @config.fnSuccess {function} 请求成功callback
 * @config.fnFailed {function} 请求失败callback
 */
bluemp.api.GetArticleList = function() {
    var clazz = function(config) {
        jsonAjax('/Portal/newfluida', config.params, function(data) {
            if (data.status == '1') {
                config.fnSuccess(data);
            } else {
                config.fnFailed(data);
            }
        }, 'get');
    }
    return clazz;
}();

/**
 * 
 * 获取文章评论列表
 *
 * @config.params.aid {String} 频道id
 * @config.params.page {String} 页数
 * @config.params.minid {String} 当前页最小评论id
 * 
 * 
 * @config.fnSuccess {function} 请求成功callback
 * @config.fnFailed {function} 请求失败callback
 *
 */
bluemp.api.GetReply = function() {
    var getReply = function(config) {
        jsonAjax('/Portal/newfluidc', config.params, function(data) {
            if (data.status == '1') {
                config.fnSuccess(data);
            } else {
                config.fnFailed(data);
            }
        }, 'get');
    }
    return getReply;
}();






/**
 * 
 * 获取社区首页话题列表
 *
 * @config.params.id {String} 版块id
 * @config.params.page {String} 页数
 * @config.params.type {String} 类型,new最新,hot最热,pic有图有真相 
 * @config.params.minid {String} 当前页话题最小id
 * 
 * 
 * @config.fnSuccess {function} 请求成功callback
 * @config.fnFailed {function} 请求失败callback
 *
 */
bluemp.api.GetTopic = function() {
    var getReply = function(config) {
        jsonAjax('/Forum/newfluid', config.params, function(data) {
            if (data.status == '1') {
                config.fnSuccess(data);
            } else {
                config.fnFailed(data);
            }
        }, 'get');
    }
    return getReply;
}();
/**
 * 
 * 获取社区话题回复列表
 * 
 * @config.params.id {String} 版块id
 * @config.params.page {String} 页数
 * @config.params.maxid {String} 当前页话题评论最大id（获取最新）
 * 
 * 
 * @config.fnSuccess {function} 请求成功callback
 * @config.fnFailed {function} 请求失败callback
 */
bluemp.api.GetReplyTopic = function() {
    var getReply = function(config) {
        jsonAjax('/Reply/newfluid', config.params, function(data) {
            if (data.status == '1') {
                config.fnSuccess(data);
            } else {
                config.fnFailed(data);
            }
        }, 'get');
    }
    return getReply;
}();

/**
 * 
 * 获取门户首页头部
 * 
 * @config.params.type
 * 
 * 
 * @config.fnSuccess {function} 请求成功callback
 * @config.fnFailed {function} 请求失败callback
 */
/*bluemp.api.getIndexHeader = function() {
    var getReply = function(config) {
        jsonAjax('/Reply/newfluid', config.params, function(data) {
            if (data.status == '1') {
                config.fnSuccess(data);
            } else {
                config.fnFailed(data);
            }
        }, 'get');
    }
    return getReply;
}();*/
/** 
 * 发布话题 目前跳转发布话题页
 * 
 * @config.container {String} 版块id
 * @config.params.page {String} 页数
 * @config.params.maxid {String} 当前页话题评论最大id（获取最新）
 * 
 * 
 * @config.fnSuccess {function} 请求成功callback
 * @config.fnFailed {function} 请求失败callback
 */
/*bluemp.tool.PublishTopic = function() {
	var re = function(config){
		var DEFAULT_CONFIG = {
		
		};
		
		var _this = this;
		var $container = $(config.container);
		this.container = $container;
		this._config = $.extend({}, DEFAULT_CONFIG, config);
		
	};
    var publish = function(container, config) {
        var _this = this;
        var DEFAULT_CONFIG = {
            DEFAULT_URL: ''
        }

        this.container = $(container);
        this.config = $.extend({}, DEFAULT_CONFIG, config);
		this.fnSuccess = config.fnSuccess;
		this.fnFailed = config.fnFailed;
		
		this.container.click(function(){
			if(loginCheck()){
				 this._href(config.fnSuccess,config.fnFailed);
			}else{
			
			};
			
		});
    };

    publish.prototype = {
        _href: function() {
        	var config = {};
        	var _this = this;
        	config.fnSuccess = function(data){
				_this.fnSuccess(data)
        	}
        	config.fnFailed = function(data){
				_this.fnFailed(data)
        	}
        	bluemp.api.Silenced(config)
            
        }
    }
    return publish
}()


*/
//模块化
bluemp.block = {};

bluemp.block.banner = function(){
	var Banner = function(config){
		var DEFAULT_CONFIG = {
			container:'.bluemp_block_banner',
			isDefault:true,
			effect:"left", 
			speed:2500,
			autoPlay:true,
			dotShow:false,
			fnSuccess:function(data){},
			fnFailed:function(data){},
			fnFinish:function(data){}
		};
		this.data = {};
        this.config = $.extend({}, DEFAULT_CONFIG, config);
        this.container = $(this.config.container);
		this.fnSuccess = this.config.fnSuccess;
		this.fnFailed = this.config.fnFailed;
		this.fnFinish = this.config.fnFinish;
		this.init(this.container);
	}
	
	Banner.prototype = {
		init:function(container){
			var _this = this;
			jsonAjax('/Interface/getCommonInfo', {}, function(d) {
				_this.data = d.data;
				if(_this.config.isDefault){
					var html = _this.getHtml(_this.data);
					$(container).append(html);
					if(_this.data.carouselpic.length>1){
						_this.initSlide();
					}
					_this.fnFinish(_this.data);
				}else{
					_this.fnSuccess(_this.data);
				}
	        }, 'get');
		},
		getHtml:function(data){
			this.setData(data);
			return this.config.html;
		},
		setData:function(data){
			var html = '<div class="bluemp_block_banner_wapper" id="bluemp_block_banner">'
			html += '<div class="hd"><ul>';
			for(i=0;data.carouselpic!=null&&data.carouselpic.length>0&&i<data.carouselpic.length;i++){
				html += '<li></li>';
			}
			html += '</ul></div>';
			html += '<div class="bd"><ul>';
			for(i=0;data.carouselpic!=null&&data.carouselpic.length>0&&i<data.carouselpic.length;i++){
				var url = data.carouselpic[i].url||'javascript:void(0);';
				var pic = data.carouselpic[i].pic||'/Public/Images/shouye-bg.jpg';
				html += '<li class="bluemp_block_banner_img"><a href="'+url+'"><img  src = "'+pic+'" /><span  class="bluemp_block_banner_title" >'+data.carouselpic[i].title+'</span></a></li>';
			}
			html +='</ul></div>';
			html += '</div>'
			this.config.html = html;
		},
		initSlide:function(){
			this.config.dotShow == false?void 0:$('.bluemp_block_banner_wapper .hd').show();
			var _this = this;
	        TouchSlide({ 
					slideCell:"#bluemp_block_banner",
					titCell:".hd ul", //开启自动分页 autoPage:true ，此时设置 titCell 为导航元素包裹层
					mainCell:".bd ul", 
					effect:_this.config.effect,
					interTime:_this.config.speed,
					autoPlay:_this.config.autoPlay,//自动播放
					autoPage:true, //自动分页
				});
		}
	}
	return Banner;
}()

bluemp.block.logo = function(){
	var Logo = function(config){
		var DEFAULT_CONFIG = {
			container:'.bluemp_block_logo',
			isDefault:true,
			fnSuccess:function(data){},
			fnFailed:function(data){},
			fnFinish:function(data){}
		};
		
        this.config = $.extend({}, DEFAULT_CONFIG, config);
        this.container = $(this.config.container);
		this.fnSuccess = this.config.fnSuccess;
		this.fnFailed = this.config.fnFailed;
		this.fnFinish = this.config.fnFinish;
		this.init(this.container);
	}
	
	Logo.prototype = {
		init:function(container){
			var _this = this;
			jsonAjax('/Interface/getCommonInfo', {}, function(d) {
				_this.data = d.data;
				if(_this.config.isDefault){
					var html = _this.getHtml(_this.data);
					$(container).append(html);
					_this.fnFinish(_this.data);
				}else{
					_this.fnSuccess(_this.data);
				}
	        }, 'get');
		},
		getHtml:function(data){
			this.setData(data);
			return this.config.html;
		},
		setData:function(data){
			var logo = data.logo;
			this.config.html = '<div class="bluemp_block_logo_img"><img src="'+logo+'"></div>'
		}
	}
	return Logo;
}()

bluemp.block.title = function(){
	var Title = function(config){
		var DEFAULT_CONFIG = {
			container:'.bluemp_block_title',
			isDefault:true,
			fnSuccess:function(data){},
			fnFailed:function(data){},
			fnFinish:function(data){}
		};
		
        this.config = $.extend({}, DEFAULT_CONFIG, config);
        this.container = $(this.config.container);
		this.fnSuccess = this.config.fnSuccess;
		this.fnFailed = this.config.fnFailed;
		this.fnFinish = this.config.fnFinish;
		this.init(this.container);
	}
	
	Title.prototype = {
		init:function(container){
			var _this = this;
			jsonAjax('/Interface/getCommonInfo', {}, function(d) {
				_this.data = d.data;
				if(_this.config.isDefault){
					var html = _this.getHtml(_this.data);
					$(container).append(html);
					_this.fnFinish(_this.data);
				}else{
					_this.fnSuccess(_this.data);
				}
	        }, 'get');
		},
		getHtml:function(data){
			this.setData(data);
			return this.config.html;
		},
		setData:function(data){
			var webname = data.webname;
			this.config.html = '<div class="bluemp_block_title_content">'+webname+'</div>';
		}
	}
	return Title;
}()


bluemp.block.background = function(){
	var Background = function(config){
		var DEFAULT_CONFIG = {
			container:'.bluemp_block_background',
			isDefault:true,
			fnSuccess:function(data){},
			fnFailed:function(data){},
			fnFinish:function(data){}
		};
		
        this.config = $.extend({}, DEFAULT_CONFIG, config);
        this.container = $(this.config.container);
		this.fnSuccess = this.config.fnSuccess;
		this.fnFailed = this.config.fnFailed;
		this.fnFinish = this.config.fnFinish;
		this.init(this.container);
	}
	
	Background.prototype = {
		init:function(container){
			var _this = this;
			jsonAjax('/Interface/getCommonInfo', {}, function(d) {
				_this.data = d.data;
				if(_this.config.isDefault){
					var html = _this.getBg(_this.data);
					_this.fnFinish(_this.data);
				}else{
					_this.fnSuccess(_this.data);
				}
	        }, 'get');
		},
		getBg:function(data){
			this.setBg(data);
			return this.config.html;
		},
		setBg:function(data){
			var bgpic = data.bgpic;
			this.container.css('background-image','url('+bgpic+')');
		}
	}
	return Background;
}()

bluemp.block.share = function(){
	var Share = function(config){
		var DEFAULT_CONFIG = {
			container:'.bluemp_block_share',
			html:$('<span class="bluemp_block_share_border"><span class="bluemp_block_share_icon"></span>分享</span>'),
			bottonId:'bluemp_block_share',
			fnSuccess:function(){},
			fnFailed:function(){}
		};
		
        this.config = $.extend({}, DEFAULT_CONFIG, config);
        this.container = $(this.config.container);
		this.fnSuccess = this.config.fnSuccess;
		this.fnFailed = this.config.fnFailed;
		this.fnFinish = this.config.fnFinish;
		this.init(this.container);
	}
	
	Share.prototype = {
		init:function(container){
			var html = this.getHtml()[0].outerHTML;
			$(container).append(html);
		},
		getHtml:function(){
			this.setData();
			this.bindEvent();
			return this.config.html;
		},
		setData:function(){
			this.config.html.attr('id',this.config.bottonId);
		},
		bindEvent:function(){
			$(document).on('click','#'+this.config.bottonId,function(){
	            $.layer({
	                type: 2,
	                area: ['272px', '315px'],
	                title: false,
	                shade: [0.5, '#8E8E8E'],
	                border: [0],
	                bgcolor: 'opacity:0; filter:alpha(opacity=100);',
	                offset: [($(window).height() - '350') / 2 + 'px', ''],
	                shadeClose: true,
	                //closeBtn: false,
	                iframe: {src: '/Home/Public/share?url=' + window.location.href + '&bdText=' + document.title}
	            });
			})
		}
	}
	return Share;
}()

bluemp.block.breadcrumb = function(){
	var Breadcrumb = function(config){
		var DEFAULT_CONFIG = {
			container:'.bluemp_block_breadcrumb',
			isDefault:true,
			type:1,
			fnSuccess:function(data){},
			fnFailed:function(data){},
			fnFinish:function(data){}
		};
		
        this.config = $.extend({}, DEFAULT_CONFIG, config);
        this.container = $(this.config.container);
		this.fnSuccess = this.config.fnSuccess;
		this.fnFailed = this.config.fnFailed;
		this.fnFinish = this.config.fnFinish;
		this.cid = bluemp_cid||0;
		this.aid = bluemp_aid||0;
		this.pid = bluemp_pid||0;
		this.tid = bluemp_tid||0;
		this.init(this.container);
	}
	
	Breadcrumb.prototype = {
		init:function(container){
			var _this = this;
			jsonAjax('/Interface/getCrumbs', {cid:_this.cid,aid:_this.aid,pid:_this.pid,tid:_this.tid,type:_this.config.type}, function(d) {
				_this.data = d.data;
				if(_this.config.isDefault){
					var html = _this.getHtml(_this.data);
					$(container).append(html);
					_this.fnFinish(_this.data);
				}else{
					_this.fnSuccess(_this.data);
				}
	        }, 'get');
		},
		getHtml:function(data){
			this.setHtml(data);
			return this.config.html;
		},
		setHtml:function(data){
			this.config.html = '<span><a href="'+data.first_href+'">'+data.first_name+'</a> &gt; <a href="/Home/Portal/'+data.second_href+'" id="cname">'+data.second_name+'</a></span>';
		}
	}
	return Breadcrumb;
}()

bluemp.block.channelList = function(){
	var ChannelList = function(config){
		var DEFAULT_CONFIG = {
			container:'.bluemp_block_channel_list',
			isDefault:true,
			fnSuccess:function(data){},
			fnFailed:function(data){},
			fnFinish:function(data){}
		};
		
        this.config = $.extend({}, DEFAULT_CONFIG, config);
        this.container = $(this.config.container);
		this.fnSuccess = this.config.fnSuccess;
		this.fnFailed = this.config.fnFailed;
		this.fnFinish = this.config.fnFinish;
		this.init(this.container);
	}
	
	ChannelList.prototype = {
		init:function(container){
			var _this = this;
			jsonAjax('/Interface/getChannels', {}, function(d) {
				_this.data = d.data;
				if(_this.config.isDefault){
					var html = _this.getHtml(_this.data);
					$(container).append(html);
					_this.fnFinish(_this.data);
				}else{
					_this.fnSuccess(_this.data);
				}
	        }, 'get');
		},
		getHtml:function(data){
			this.setData(data);
			return this.config.html;
		},
		setData:function(data){
			var html = '<ul>';
			for(i=0;data!=null&&data.length!=0&&i<data.length;i++){
				if(i%4==1||i%4==2){
					html += '<li class="bluemp_block_channel_lightbg"><a href="/Portal/articlelist/cid/'+data[i].id+'" >'+data[i].name+'</a></li>';
				}else{
					html += '<li class="bluemp_block_channel_deepbg"><a href="/Portal/articlelist/cid/'+data[i].id+'" >'+data[i].name+'</a></li>';
				}
			}
			
			html += '</ul>';
			this.config.html = $(html);
		}
	}
	return ChannelList;
}()


bluemp.block.bottomNav = function(){
	var BottomNav = function(config){
		var DEFAULT_CONFIG = {
			container:'.bluemp_block_bottom_nav',
			isDefault:true,
			fnSuccess:function(data){},
			fnFailed:function(data){},
			fnFinish:function(data){}
		};
		
        this.config = $.extend({}, DEFAULT_CONFIG, config);
        this.container = $(this.config.container);
		this.fnSuccess = this.config.fnSuccess;
		this.fnFailed = this.config.fnFailed;
		this.fnFinish = this.config.fnFinish;
		this.init(this.container);
	}
	
	BottomNav.prototype = {
		init:function(container){
			var _this = this;
			jsonAjax('/Interface/getNav', {type:2}, function(d) {
				_this.data = d.data;
				if(_this.config.isDefault){
					var html = _this.getHtml(_this.data);
					$(container).append(html);
					_this.initScroll();
					_this.resetWidth();
					_this.fnFinish(_this.data);
				}else{
					_this.fnSuccess(_this.data);
				}
	        }, 'get');
		},
		getHtml:function(data){
			this.setData(data);
			return this.config.html;
		},
		setData:function(data){
			if(data!=null&&data.length!=0){
				this.navLength = data.length;
			}else{
				this.navLength = 0;
			}
		
			var nbsp = '';
			var html = '<div class="bluemp_block_bottom_navWapper" id="bluemp_block_bottom_navWapper">';
			html += '<ul class = "bluemp_block_bottom_navMain" style="width:1300px">';
			for(i=0;data!=null&&data.length!=0&&i<data.length;i++){
				i == data.length-1?nbsp = '&nbsp;&nbsp;':nbsp = '&nbsp;&nbsp;|&nbsp;&nbsp;';
				html += '<li>'
				if(data[i].pic!=null){
					html += '<img class="bluemp_block_bottom_navMain_icon" src="'+data[i].pic+'">';
				}else{
					html += '<img class="bluemp_block_bottom_navMain_icon" src="">';
				}
				html += '<a href="'+data[i].url+'">'+data[i].name+'</a>'+nbsp+'</li>';
			}
			html += '</ul>';
			html += '</div>';
			
			this.config.html = $(html);
		},
		initScroll:function(){
			this.myscroll=new iScroll("bluemp_block_bottom_navWapper",{
				vScroll :false,
				hScrollbar :false,
				vScrollbar :false,
				onScrollMove: function(){
					
				}
			});
		},
		resetWidth:function(){
			var widthH=0;
			for(i=0;i<this.navLength;i++){
				widthH = widthH+parseInt($($('.bluemp_block_bottom_navMain li')[i]).css('width'))+1;
			}
			$('.bluemp_block_bottom_navMain').css({'width':widthH+'px'});
			this.myscroll.refresh();
		}
	}
	return BottomNav;
}()


bluemp.block.mainNav = function(){
	var MainNav = function(config){
		var DEFAULT_CONFIG = {
			container:'.bluemp_block_main_nav',
			isDefault:true,
			fnSuccess:function(data){},
			fnFailed:function(data){},
			fnFinish:function(data){}
		};
		
        this.config = $.extend({}, DEFAULT_CONFIG, config);
        this.container = $(this.config.container);
		this.fnSuccess = this.config.fnSuccess;
		this.fnFailed = this.config.fnFailed;
		this.fnFinish = this.config.fnFinish;
		this.init(this.container);
	}
	
	MainNav.prototype = {
		init:function(container){
			var _this = this;
			jsonAjax('/Interface/getNav', {type:1}, function(d) {
				_this.data = d.data;
				if(_this.config.isDefault){
					var html = _this.getHtml(_this.data);
					$(container).append(html);
					_this.fnFinish(_this.data);
				}else{
					_this.fnSuccess(_this.data);
				}
	        }, 'get');
		},
		getHtml:function(data){
			this.setData(data);
			return this.config.html;
		},
		setData:function(data){
			this.navLength = data.length;
			var nbsp = '';
			var html = '<div class="bluemp_block_main_navWapper" id="bluemp_block_main_navWapper">';
			html += '<ul class = "bluemp_block_main_navMain">';
			for(i=0;data!=null&&i<data.length&&data.length!=0;i++){
				html += '<li><img class="bluemp_block_main_navMain_icon" src="'+data[i].pic+'"><a href="'+data[i].url+'">'+data[i].name+'</a></li>';
			}
			html += '</ul>';
			html += '</div>';
			
			this.config.html = $(html);
		}
	}
	return MainNav;
}()

bluemp.block.extendInfo = function(){
	var ExtendInfo = function(config){
		var DEFAULT_CONFIG = {
			container:'.bluemp_block_copyright',
			isDefault:true,
			infoKey:'copyrightinfo',
			fnSuccess:function(data){},
			fnFailed:function(data){},
			fnFinish:function(data){}
		};
		
        this.config = $.extend({}, DEFAULT_CONFIG, config);
        this.container = $(this.config.container);
		this.fnSuccess = this.config.fnSuccess;
		this.fnFailed = this.config.fnFailed;
		this.fnFinish = this.config.fnFinish;
		this.init(this.container);
	}
	
	ExtendInfo.prototype = {
		init:function(container){
			var _this = this;
			jsonAjax('/Interface/getCommonInfo', {}, function(d) {
				_this.data = d.data;
				if(_this.config.isDefault){
					var html = _this.getHtml(_this.data);
					$(container).append(html);
					_this.fnFinish(_this.data);
				}else{
					_this.fnSuccess(_this.data);
				}
	        }, 'get');
		},
		getHtml:function(data){
			this.setData(data);
			return this.config.html;
		},
		setData:function(data){
			var _this = this;
			var html = '';
			switch (_this.config.infoKey){
				case 'aliasurl':
					var aliasurl = data['aliasurl'];
					if(data['aliasurl']==null){
						aliasurl = '';
					}
					html += '<span>'+aliasurl+'</span>';
					break;
				case 'archivalinfo':
					var archivalinfo = data['archivalinfo'];
					if(data['archivalinfo']==null){
						archivalinfo = '';
					}
					html += '<span>'+archivalinfo+'</span>';
					break;
				case 'statistics':
					var copyrightinfo = data['statistics'];
					if(data['statistics']==null){
						statistics = '';
					}
					html += '<span>'+statistics+'</span>';
					break;
				case 'phone':
					html += '<a href="tel:'+data['phone']+'"></a>';
					break;
				default:
					var copyrightinfo = data['copyrightinfo'];
					if(data['copyrightinfo']==null){
						copyrightinfo = '';
					}
					html += '<span>'+copyrightinfo+'</span>';
					break;
			}
			
			this.config.html = html;
		}
	}
	return ExtendInfo;
}()

bluemp.block.articleList = function(){
	var ArticleList = function(config){
		var DEFAULT_CONFIG = {
			container:'.bluemp_block_article_list',
			isDefault:true,
			fnSuccess:function(data){},
			fnFailed:function(data){},
			fnFinish:function(data){}
		};
		
        this.config = $.extend({}, DEFAULT_CONFIG, config);
        this.container = $(this.config.container);
		this.fnSuccess = this.config.fnSuccess;
		this.fnFailed = this.config.fnFailed;
		this.fnFinish = this.config.fnFinish;
		this.cid = bluemp_cid;
		this.page = 0;
		this.isrun = false;
		this.request = false;
		this.hasNext = true;
		this.init(this.container);
	}
	
	ArticleList.prototype = {
		init:function(container){
			var _this = this;
			jsonAjax('/Interface/getArticleList', {cid:_this.cid,minid:0,page:0}, function(d) {
				_this.data = d.data;
				if(_this.config.isDefault){
					var html = _this.getHtml(_this.data);
					$(container).append(html);
					_this.bindScroll();
					_this.fnFinish(_this.data);
				}else{
					_this.fnSuccess(_this.data);
				}
	        }, 'get');
		},
		getHtml:function(data){
			this.setData(data);
			return this.config.html;
		},
		setData:function(data){
			var html = '';
			for(i=0;data!=null&&i<data.length&&data.length!=0;i++){
				var date = new Date(parseInt(data[i].createtime) * 1000);
				html += '<div class="bluemp_block_article_list_wapper" data-aid="'+data[i].id+'">';
				html += '<span class="bluemp_block_article_list_title">'+data[i].title+'</span>';
				html += '<div class="bluemp_block_article_list_info">';
				html += '<p class="bluemp_block_article_list_time">'+[date.getFullYear(), date.getMonth()+1, date.getDate()].join('-') +'    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;来源：'+data[i].author+'</p>';
				if(data[i].pic!=''){
					html += '<p class="bluemp_block_article_list_pic"><a href="'+data[i].href+'"><img src="'+data[i].pic+'"></a></p>'
				}
				html += '<p class="bluemp_block_article_list_summary"><span>摘要：</span>'+data[i].summary+'</p>';
				html += '<div class="bluemp_block_article_list_entry">';
				html += '<a href="'+data[i].href+'">';
				html += '<span>点击阅读 </span>';
				html += '<img src="/Public/Home/Images/wz_img03.png">';
				html += '</a>';
				html += '</div>';
				html += '</div>';
				html += '</div>';
			}
			this.config.html = html;
		},
		getData:function(params){
			
		},
		bindScroll:function(){
			var _this = this;
			$(window).scroll(function() {
				if($(document).height() - $(window).height() - $(document).scrollTop() < 100) {
					if (_this.isrun==true||_this.request == true||_this.hasNext==false){
						return;
					} else{
						_this.randerNextPage();
					}
				}
			})
		},
		randerNextPage:function(){
			var _this = this
			this.getNextPage({},function(data){
				$(_this.container).append(data);
			});
		},
		getNextPage:function(data,fn){
			var params = {};
			this.request = true;
			this.page++;
			if(this.config.isDefault){
				params.page = this.page;
				params.cid = this.cid;
				params.minid = $('.bluemp_block_article_list_wapper').last().attr('data-aid');
			}else{
				params = data;
			}
			var html = '';
			var _this = this;
			jsonAjax('/Interface/getArticleList', params, function(d) {
				_this.data = d.data;
				_this.request = false;
				if(_this.data==null){
					_this.hasNext = false;
				}
				if(_this.config.isDefault&&_this.data!=null){
					html = _this.getHtml(_this.data);
					fn(html);
				}else{
					fn(_this.data);
				}
	        }, 'get');
		}
		
	}
	return ArticleList;
}()


bluemp.block.articleDetail = function(){
	var ArticleDetail = function(config){
		var DEFAULT_CONFIG = {
			container:'.bluemp_block_article_detail',
			isDefault:true,
			fnSuccess:function(data){},
			fnFailed:function(data){},
			fnFinish:function(data){}
		};
		
        this.config = $.extend({}, DEFAULT_CONFIG, config);
        this.container = $(this.config.container);
		this.fnSuccess = this.config.fnSuccess;
		this.fnFailed = this.config.fnFailed;
		this.fnFinish = this.config.fnFinish;
		this.aid = bluemp_aid;
		this.init(this.container);
	}
	
	ArticleDetail.prototype = {
		init:function(container){
			var _this = this;
			jsonAjax('/Interface/getArticleDetail', {aid:_this.aid}, function(d) {
				_this.data = d.data;
				if(_this.config.isDefault){
					var html = _this.getHtml(_this.data);
					$(container).append(html);
					_this.fnFinish(_this.data);
				}else{
					_this.fnSuccess(_this.data);
				}
	        }, 'get');
		},
		getHtml:function(data){
			this.setData(data);
			return this.config.html;
		},
		setData:function(data){
			var html = '<div class="bluemp_block_article_detail_wapper">';
			html += '<span class="bluemp_block_article_detail_title">'+data.title+'</span>';
			html += '<p class="bluemp_block_article_detail_info">'+data.posttime;
			if(data.author!=null&&data.author!=''){
				html +=  '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;来源：'+data.author;
			}
			html += '</p>';
			if(data.pic!=null&&data.pic!=''){
				html += '<p class="bluemp_block_article_detail_cover"><img src="'+data.pic+'" /></p>';
			}
			if(data.summary!=null&&data.summary!=''){
				html += '<p class="bluemp_block_article_detail_summary"><span>摘要：</span>'+data.summary+'</p>';
			}
			html += '<div class="bluemp_block_article_detail_content" >'+data.content+'</div>';			
			html += '</div>';
			html += '</div>';
			this.config.html = $(html);
		},
		getData:function(params){
			
		}
		
	}
	return ArticleDetail;
}()



bluemp.block.options = function(){
	var Options = function(config){
		var DEFAULT_CONFIG = {
			container:'.bluemp_block_article_options',
			type:['readnum','praise','comment'],
			isDefault:true,
			fnSuccess:function(data){},
			fnFailed:function(data){},
			fnFinish:function(data){}
		};
		
        this.config = $.extend({}, DEFAULT_CONFIG, config);
        this.container = $(this.config.container);
		this.fnSuccess = this.config.fnSuccess;
		this.fnFailed = this.config.fnFailed;
		this.fnFinish = this.config.fnFinish;
		this.aid = bluemp_aid;
		this.init(this.container);
	}
	
	Options.prototype = {
		init:function(container){
			var _this = this;
			jsonAjax('/Interface/getArticleDetail', {aid:_this.aid}, function(d) {
				_this.data = d.data;
				var html = _this.getHtml();
				var block = _this.buildBlock(_this.config.type,_this.data);
				$(container).append(html).append(block);
				for(i=0;i<_this.config.type.length;i++){
					_this.bindEvent(_this.config.type[i]);
				}
				_this.fnFinish(_this.data);
	        }, 'get');
		},
		getHtml:function(){
			this.setData();
			return this.config.html;
		},
		buildBlock:function(type,data){
			var block = '';
			
			for(i=0;i<type.length;i++){
				block += this.getBlock(type[i],data);
			}
			return block;
		},
		setData:function(){
			var html = '<div class="bluemp_block_article_optionsWapper"></div>';
			this.config.html = html;
		},
		getData:function(params){
			
		},
		getBlock:function(type,data){
			var html = '';
			switch (type){
				case 'readnum':
					html += '<div class="bluemp_block_article_options_readnum">阅读数&nbsp;'+data.pv+'</div>';
					break;
				case 'praise':
					html += '<div class="bluemp_block_article_options_praise">';
					if(data.isPraise==0){
						html += '<span class="bluemp_block_article_options_praiseIconOff" data-type="0"></span>';
					}else{
						html += '<span class="bluemp_block_article_options_praiseIconOn" data-type="1"></span>';
					}
					html += '<span class="bluemp_block_article_options_praiseCount">'+data.praisecount+'</span>';
					html += '</div>';
					break;
				case 'comment':
					html += '<div class="bluemp_block_article_options_comment">';
					if(data.supportcomment==1){
						html += '<span class="bluemp_block_article_options_comment_on"><a href="javascript:void(0);">发表评论</a></span>';
					}else{
						html += '<span class="bluemp_block_article_options_comment_off">文章暂不支持评论</span>';
					}
					html += '</div>';
					break;
				default:
					break;
			}
			return html;
		},
		bindEvent:function(type){
			var _this = this;
			switch (type){
				case 'readnum':
					break;
				case 'praise':
					$('.bluemp_block_article_options_praise').click(function(){
						var params = {};
						params.id = _this.aid;
				        if (bluemp.loginCheck()) {
				        	var config = {};
				        	config.params = params;
				        	config.fnSuccess = function(data){
								$('.bluemp_block_article_options_praiseCount').text(($('.bluemp_block_article_options_praiseCount').text()-0+1));
								$('.bluemp_block_article_options_praiseIconOff').addClass('bluemp_block_article_options_praiseIconOn').removeClass('bluemp_block_article_options_praiseIconOff')
								popup.remind(data.info);
							};
				        	config.fnFailed = function(data){
								popup.remind(data.info);
							};
				            bluemp.api.plugExellent(config)
				        } else {
				
				        }
					})
					break;
				case 'comment':
					var o = {};
					o.aid = _this.aid;
					var replyConfig = {};
					replyConfig.container = '.bluemp_block_article_options_comment';
					replyConfig.params = o;
					replyConfig.fnSuccess = function(data){
						if(_this.config.isDefault){
							layer.closeAll();
							popup.remind(data.info);
							$(document).unbind('touchmove');
							var d = data.data;
							var html = '';
							var date = new Date(parseInt(d.createtime) * 1000);
							html += '<div class = "bluemp_block_article_reply_blockWapper" data-rid = "'+d.id+'">';
							html += '<div class = "bluemp_block_article_reply_block">';
							html += '<div class="bluemp_block_article_reply_blockContent">';
							html += '<div class="bluemp_block_article_reply_block_userPhoto">';
							html += '<img src="'+d.head+'"></a>';
							html += '</div>';
							html += '<ul class="bluemp_block_article_reply_block_userInfo">';
							var pic = '';
							if(d.pic!=null){
								pic = '<img src="'+d.pic+'" class="bluemp_block_article_reply_block_userLevel">';
							}
							if(d.is_anonymous==1){
								html += '<li class="bluemp_block_article_reply_block_userNickname"><a href="javascript:;">'+d.name+'</a>'+pic+'</li>';
							}else{
								html += '<li class="bluemp_block_article_reply_block_userNickname"><a href="/Portal/ucenter/userid/'+d.real_id+'.html">'+d.name+'</a>'+pic+'</li>';
							}
							html += '<li class="bluemp_block_article_reply_block_replyTime">'+[date.getFullYear(), date.getMonth()+1, date.getDate()].join('-') +'</li>';
							html += '</ul>';
							html += '<div class="bluemp_block_article_reply_replyContent">'+d.content+'</div>';
							html += '<div class="bluemp_block_article_reply_replyOption">';
							html += '<span class="bluemp_block_article_reply_praise" data="'+d.id+'">';
							if(d.like==0){
								html += '<span class="bluemp_block_article_reply_praiseIconOff"></span>';
							}else{
								html += '<span class="bluemp_block_article_reply_praiseIconOn"></span>';
							}
							html += '<span  class="bluemp_block_article_reply_praiseCount">'+d.likecount+'</span>';
							html += '</span>';
							if(d.del==1){
								html += '<span class="bluemp_block_article_reply_delete" data="'+d.id+'">删除</span>';
							}
							html += '</div>';
							html += '</div>';
							html += '</div>';
							html += '</div>';
							$('.bluemp_block_article_reply_listBottom').prepend(html);
							var count = parseInt($('.bluemp_block_article_reply_count').html())+1;
							$('.bluemp_block_article_reply_count').html(count);
							$('.bluemp_block_article_reply_praise').unbind('click').click(function(){
								var _this = $(this);
								var params = {};
								if(!bluemp.loginCheck()){
									return;
								} else {
									params.id = $(this).attr('data');
									params.type = 1;
									var config = {};
									config.params = params;
									config.fnSuccess = function(data){
										_this.find('.bluemp_block_article_reply_praiseIconOff').addClass('bluemp_block_article_reply_praiseIconOn').removeClass('bluemp_block_article_reply_praiseIconOff')
										_this.find('.bluemp_block_article_reply_praiseCount').html(parseInt(_this.find('.bluemp_block_article_reply_praiseCount').html())+1);
										popup.remind(data.info);
									}
									config.fnFailed = function(data){
										popup.remind(data.info);
									}
									bluemp.api.Exellent(config);
								}
							})
				
							$('.bluemp_block_article_reply_delete').unbind('click').click(function(){
								var _this = $(this);
								var params = {};
								var id = $(this).attr('data');
								params.id = id;
								var html= '<div class="zhidingtanceng">';
									html+='<p>您确定要删除此文章评论吗？</p>';
									html+='<div class="send-2btn" style="width:100%;text-align:center;margin-right:5%;margin-top:30px;">';
									html+='<input type="button" class="input2" style="float:none;" value="确定" id="successdelete">';
									html+=' <input type="button" class="input1" style="margin-left:0;" value="取消" id="closelay">';
									html+='</div>';
									html+='</div>';
								var o = {};
								o.html = html;
								o.fnSuccess = function(){
									$('#closelay').click(function(){
										layer.closeAll();
									})
									$('#successdelete').click(function(){
										var config = {};
										config.params = params;
										config.fnSuccess = function(data){
											popup.remind(data.info);
											_this.closest('.bluemp_block_article_reply_blockWapper').remove();
											layer.closeAll();
										}
										config.fnFailed = function(data){
											popup.remind(data.info);
											window.location.reload();
										}
										bluemp.api.DeleteReply(config)
									});
								}
								new bluemp.tool.Dialog(o)
							})
						}else{
							_this.fnSuccess(data);
						}
						
					}
					replyConfig.fnFailed = function(data){
						popup.remind(data.info)
					}
					new bluemp.tool.blockReply(replyConfig)
					break;
				default:
					break;
			}
		}
		
	}
	return Options;
}()


bluemp.block.replyList = function(){
	var ReplyList = function(config){
		var DEFAULT_CONFIG = {
			container:'.bluemp_block_article_reply_list',
			isDefault:true,
			fnSuccess:function(data){},
			fnFailed:function(data){},
			fnFinish:function(data){},
			fnDeleteReply:function(data){}
		};
		
        this.config = $.extend({}, DEFAULT_CONFIG, config);
        this.container = $(this.config.container);
		this.aid = bluemp_aid;
		this.page = 0;
		this.isrun = false;
		this.request = false;
		this.hasNext = true;
		this.fnSuccess = this.config.fnSuccess;
		this.fnFailed = this.config.fnFailed;
		this.fnFinish = this.config.fnFinish;
		this.fnDeleteReply = this.config.fnDeleteReply;
		this.init(this.container);
	}
	
	ReplyList.prototype = {
		init:function(container){
			var _this = this;
			jsonAjax('/Interface/getCommentList', {aid:_this.aid,page:0}, function(d) {
				_this.data = d.data;
				if(_this.config.isDefault){
					var html = _this.getWapperHtml(_this.data);
					$(container).append(html);
					_this.bindEvent();
					_this.bindScroll();
					_this.fnFinish(_this.data);
				}else{
					_this.fnSuccess(_this.data);
				}
	        }, 'get');
		},
		getWapperHtml:function(data){
			this.setData(data);
			return this.config.html;
		},
		setData:function(data){
			var html = '<div class="bluemp_block_article_reply_listWapper">';
			if(data==null){
				html += '<div class="bluemp_block_article_reply_listTop">评论 （<span class="bluemp_block_article_reply_count">0</span>）</div>';
			}else{
				html += '<div class="bluemp_block_article_reply_listTop">评论 （<span class="bluemp_block_article_reply_count">'+data.length+'</span>）</div>';
			}
			html += '<div class = "bluemp_block_article_reply_listBottom">';
			html += this.getListHtml(data);
			html += '</div>';
			html += '</div>';
			this.config.html = html;
		},
		getListHtml:function(data){
			var html = '';
			for(i=0;data!=null&&i<data.length&&data.length!=0;i++){
				var date = new Date(parseInt(data[i].createtime) * 1000);
				html += '<div class = "bluemp_block_article_reply_blockWapper" data-rid = "'+data[i].id+'">';
				html += '<div class = "bluemp_block_article_reply_block">';
				html += '<div class="bluemp_block_article_reply_blockContent">';
				html += '<div class="bluemp_block_article_reply_block_userPhoto">';
				html += '<img src="'+data[i].head+'"></a>';
				html += '</div>';
				html += '<ul class="bluemp_block_article_reply_block_userInfo">';
				var pic = '';
				if(data[i].pic!=null){
					pic = '<img src="'+data[i].pic+'" class="bluemp_block_article_reply_block_userLevel">';
				}
				if(data[i].is_anonymous=='1'){
					html += '<li class="bluemp_block_article_reply_block_userNickname"><a href="javascript:;">'+data[i].name+'</a>'+pic+'</li>';
				}else{
					html += '<li class="bluemp_block_article_reply_block_userNickname"><a href="/Portal/ucenter/userid/'+data[i].real_id+'.html">'+data[i].name+'</a>'+pic+'</li>';
				}
				html += '<li class="bluemp_block_article_reply_block_replyTime">'+[date.getFullYear(), date.getMonth()+1, date.getDate()].join('-') +'</li>';
				html += '</ul>';
				html += '<div class="bluemp_block_article_reply_replyContent">'+data[i].content+'</div>';
				html += '<div class="bluemp_block_article_reply_replyOption">';
				html += '<span class="bluemp_block_article_reply_praise" data="'+data[i].id+'">';
				if(data[i].like==0){
					html += '<span class="bluemp_block_article_reply_praiseIconOff"></span>';
				}else{
					html += '<span class="bluemp_block_article_reply_praiseIconOn"></span>';
				}
				html += '<span  class="bluemp_block_article_reply_praiseCount">'+data[i].likecount+'</span>';
				html += '</span>';
				if(data[i].del==1){
					html += '<span class="bluemp_block_article_reply_delete" data="'+data[i].id+'">删除</span>';
				}
				html += '</div>';
				html += '</div>';
				html += '</div>';
				html += '</div>';
			}
			return html;
		},
		bindEvent:function(){
			var that = this;
			$('.bluemp_block_article_reply_praise').unbind('click').click(function(){
				var _this = $(this);
				var params = {};
				if(!bluemp.loginCheck()){
					return;
				} else {
					params.id = $(this).attr('data');
					params.type = 1;
					var config = {};
					config.params = params;
					config.fnSuccess = function(data){
						_this.find('.bluemp_block_article_reply_praiseIconOff').addClass('bluemp_block_article_reply_praiseIconOn').removeClass('bluemp_block_article_reply_praiseIconOff')
						_this.find('.bluemp_block_article_reply_praiseCount').html(parseInt(_this.find('.bluemp_block_article_reply_praiseCount').html())+1);
						popup.remind(data.info);
					}
					config.fnFailed = function(data){
						popup.remind(data.info);
					}
					bluemp.api.Exellent(config);
				}
			})

			$('.bluemp_block_article_reply_delete').unbind('click').click(function(){
				var _this = $(this);
				var params = {};
				var id = $(this).attr('data');
				params.id = id;
				var html= '<div class="zhidingtanceng">';
					html+='<p>您确定要删除此文章评论吗？</p>';
					html+='<div class="send-2btn" style="width:100%;text-align:center;margin-right:5%;margin-top:30px;">';
					html+='<input type="button" class="input2" style="float:none;" value="确定" id="successdelete">';
					html+=' <input type="button" class="input1" style="margin-left:0;" value="取消" id="closelay">';
					html+='</div>';
					html+='</div>';
				var o = {};
				o.html = html;
				o.fnSuccess = function(){
					$('#closelay').click(function(){
						layer.closeAll();
					})
					$('#successdelete').click(function(){
						var config = {};
						config.params = params;
						config.fnSuccess = function(data){
							if(that.config.isDefault){
								popup.remind(data.info);
								var i = parseInt($('.bluemp_block_article_reply_count').text())-1;
								$('.bluemp_block_article_reply_count').text(i);
								_this.closest('.bluemp_block_article_reply_blockWapper').remove();
								layer.closeAll();
							}else{
								popup.remind(data.info);
								layer.closeAll();
								that.fnDeleteReply(id);
							}
						}
						config.fnFailed = function(data){
							popup.remind(data.info);
							window.location.reload();
						}
						bluemp.api.DeleteReply(config)
					});
				}
				o.fnFailed = function(data){
					
				}
				new bluemp.tool.Dialog(o)
			})
		},
		bindScroll:function(){
			var _this = this;
			$(window).scroll(function() {
				if($(document).height() - $(window).height() - $(document).scrollTop() < 100) {
					if (_this.isrun==true||_this.request == true||_this.hasNext==false){
						return;
					} else{
						_this.randerNextPage();
					}
				}
			})
		},
		randerNextPage:function(){
			var _this = this
			this.getNextPage({},function(data){
				$('.bluemp_block_article_reply_listBottom').append(data);
			});
		},
		getNextPage:function(data,fn){
			var params = {};
			this.request = true;
			this.page++;
			if(this.config.isDefault){
				params.page = this.page;
				params.aid = this.aid;
				params.minid = $('.bluemp_block_article_reply_blockWapper').last().attr('data-rid');
			}else{
				params = data;
			}
			var html = '';
			var _this = this;
			jsonAjax('/Interface/getCommentList', params, function(d) {
				_this.data = d.data;
				_this.request = false;
				if(_this.data==null){
					_this.hasNext = false;
				}
				if(_this.config.isDefault&&_this.data!=null){
					html = _this.getListHtml(_this.data);
					fn(html);
				}else{
					fn(_this.data);
				}
	        }, 'get');
		}
		
	}
	return ReplyList;
}()




bluemp.block.userLogin = function(){
	var UserLogin = function(config){
		var DEFAULT_CONFIG = {
			container:'.bluemp_block_userlogin',
			isDefault:true,
			fnSuccess:function(data){},
			fnFailed:function(data){},
			fnFinish:function(data){}
		};
		
        this.config = $.extend({}, DEFAULT_CONFIG, config);
        this.container = $(this.config.container);
		this.fnSuccess = this.config.fnSuccess;
		this.fnFailed = this.config.fnFailed;
		this.fnFinish = this.config.fnFinish;
		this.init(this.container);
	}
	
	UserLogin.prototype = {
		init:function(container){
			var _this = this;
			jsonAjax('/Interface/getUserinfo', {}, function(d) {
				_this.data = d.data;
				if(_this.config.isDefault){
					var html = _this.getHtml(_this.data);
					$(container).append(html);
					_this.fnFinish(_this.data);
				}else{
					_this.fnSuccess(_this.data);
				}
	        }, 'get');
		},
		getHtml:function(data){
			this.setData(data);
			return this.config.html;
		},
		setData:function(data){
			var html = '';
			var s = '';
			if(data.is_login==0){
				html += '<div class="bluemp_block_userlogin_login" ><a href="javascript:void(0);" onclick="bluemp.login()" ><div class="bluemp_block_userlogin_login_icon" ></div>用户登录</a></div>';
			}else{
				data.nick.length > 4?s = '...':void 0;
				html += '<div class="bluemp_block_userlogin_logout" ><a href="/Portal/ucenter/userid/'+data.id+'.html"><div  class="bluemp_block_userlogin_login_icon" ></div>'+data.nick.substr(0,4)+s+'</a>&nbsp;&nbsp;<a href="javascript:void(0);" onclick="bluemp.logout()" id="loginout">退出</a></div>';
			}
			this.config.html = html;
		},
		getData:function(params){
			
		}
		
	}
	return UserLogin;
}()

//community
bluemp.block.communityInfo = function(){
	var CommunityInfo = function(config){
		var DEFAULT_CONFIG = {
			container:'.bluemp_block_community_info',
			isDefault:true,
			fnSuccess:function(data){},
			fnFailed:function(data){},
			fnFinish:function(data){}
		};
		
        this.config = $.extend({}, DEFAULT_CONFIG, config);
        this.container = $(this.config.container);
		this.fnSuccess = this.config.fnSuccess;
		this.fnFailed = this.config.fnFailed;
		this.fnFinish = this.config.fnFinish;
		this.init(this.container);
	}
	
	CommunityInfo.prototype = {
		init:function(container){
			var _this = this;
			jsonAjax('/Interface/getForumExtend', {}, function(d) {
				_this.data = d.data;
				if(_this.config.isDefault){
					var html = _this.getHtml(_this.data);
					$(container).append(html);
					_this.fnFinish(_this.data);
				}else{
					_this.fnSuccess(_this.data);
				}
	        }, 'get');
		},
		getHtml:function(data){
			this.setData(data);
			return this.config.html;
		},
		setData:function(data){
			this.config.html = '<div class="bluemp_block_community_info_content"></div>';
		}
	}
	return CommunityInfo;
}()


bluemp.block.blockList = function(){
	var BlockList = function(config){
		var DEFAULT_CONFIG = {
			container:'.bluemp_block_block_list',
			isDefault:true,
			fnSuccess:function(data){},
			fnFailed:function(data){},
			fnFinish:function(data){}
		};
		
        this.config = $.extend({}, DEFAULT_CONFIG, config);
        this.container = $(this.config.container);
		this.fnSuccess = this.config.fnSuccess;
		this.fnFailed = this.config.fnFailed;
		this.fnFinish = this.config.fnFinish;
		this.init(this.container);
	}
	
	BlockList.prototype = {
		init:function(container){
			var _this = this;
			jsonAjax('/Interface/getCommunity', {}, function(d) {
				_this.data = d.data;
				if(_this.config.isDefault){
					var html = _this.getHtml(_this.data);
					$(container).append(html);
					_this.fnFinish(_this.data);
				}else{
					_this.fnSuccess(_this.data);
				}
	        }, 'get');
		},
		getHtml:function(data){
			this.setData(data);
			return this.config.html;
		},
		setData:function(data){
			var html = '<ul>';
			for(i=0;data!=null&&data.length!=0&&i<data.length;i++){
				html += '<li class="bluemp_block_block_list_wapper"><a href="/Home/Forum/plate/id/'+data[i].id+'.html">'+data[i].name+'<span class="bluemp_block_block_list_replynum">'+data[i].count+'<img src="/Public/Home/Images/right-icon.jpg" class="bluemp_block_block_list_enterIcon"></span></a></li>';
			}
			
			html += '</ul>';
			this.config.html = $(html);
		}
	}
	return BlockList;
}()



bluemp.block.topicRank = function(){
	var TopicRank = function(config){
		var DEFAULT_CONFIG = {
			container:'.bluemp_block_topic_rank',
			isDefault:true,
			limit:10,
			fnSuccess:function(data){},
			fnFailed:function(data){},
			fnFinish:function(data){}
		};
		
        this.config = $.extend({}, DEFAULT_CONFIG, config);
        this.container = $(this.config.container);
		this.fnSuccess = this.config.fnSuccess;
		this.fnFailed = this.config.fnFailed;
		this.fnFinish = this.config.fnFinish;
		this.init(this.container);
	}
	
	TopicRank.prototype = {
		init:function(container){
			var _this = this;
			jsonAjax('/Interface/getTopTopic', {limit:_this.config.limit}, function(d) {
				_this.data = d.data;
				if(_this.config.isDefault){
					var html = _this.getHtml(_this.data);
					$(container).append(html);
					_this.fnFinish(_this.data);
				}else{
					_this.fnSuccess(_this.data);
				}
	        }, 'get');
		},
		getHtml:function(data){
			this.setData(data);
			return this.config.html;
		},
		setData:function(data){
			var html = '<ul>';
			for(i=1;data!=null&&data.length!=0&&i<=this.config.limit&&i<=data.length;i++){
				var index = i;
				var clazz = 'top3';
				i<10?index='0'+i.toString():index=10;
				i<4?void 0:clazz = '';
				html += '<li class="bluemp_block_topic_rank_wapper"><a href="/Home/Forum/detail/id/'+data[i-1].id+'.html"><span class="bluemp_block_topic_rank_index '+clazz+'">'+index+'</span>'+data[i-1].title+'</a></li>';
			}
			
			html += '</ul>';
			this.config.html = $(html);
		}
	}
	return TopicRank;
}()


bluemp.block.blockInfo = function(){
	var BlockInfo = function(config){
		var DEFAULT_CONFIG = {
			container:'.bluemp_block_block_info',
			isDefault:true,
			fnSuccess:function(data){},
			fnFailed:function(data){},
			fnFinish:function(data){}
		};
		
        this.config = $.extend({}, DEFAULT_CONFIG, config);
        this.container = $(this.config.container);
		this.fnSuccess = this.config.fnSuccess;
		this.fnFailed = this.config.fnFailed;
		this.fnFinish = this.config.fnFinish;
		this.pid = bluemp_pid;
		this.init(this.container);
	}
	
	BlockInfo.prototype = {
		init:function(container){
			var _this = this;
			jsonAjax('/Interface/getCurrentForum', {pid:this.pid}, function(d) {
				_this.data = d.data;
				if(_this.config.isDefault){
					var html = _this.getHtml(_this.data);
					$(container).append(html);
					_this.fnFinish(_this.data);
				}else{
					_this.fnSuccess(_this.data);
				}
	        }, 'get');
		},
		getHtml:function(data){
			this.setData(data);
			return this.config.html;
		},
		setData:function(data){
			this.config.html = '<div class="bluemp_block_block_info_content"><span class="bluemp_block_block_name">'+data.name+'</span><span class="bluemp_block_block_topicNum">'+data.topictotal+'</span></div>';
		}
	}
	return BlockInfo;
}()



bluemp.block.topicList = function(){
	var TopicList = function(config){
		var DEFAULT_CONFIG = {
			container:'.bluemp_block_topic_list',
			isDefault:true,
			replyLimit:0,
			type:['reply','praise'],
			fnSuccess:function(data){},
			fnFailed:function(data){},
			fnFinish:function(data){}
		};
		
        this.config = $.extend({}, DEFAULT_CONFIG, config);
        this.container = $(this.config.container);
		this.fnSuccess = this.config.fnSuccess;
		this.fnFailed = this.config.fnFailed;
		this.fnFinish = this.config.fnFinish;
		this.pid = bluemp_pid||0;
		this.page = 0;
		this.isrun = false;
		this.request = false;
		this.hasNext = true;
		this.init(this.container);
	}
	
	TopicList.prototype = {
		init:function(container){
			var _this = this;
			jsonAjax('/Interface/getTopicList', {pid:_this.pid,page:_this.page}, function(d) {
				_this.data = d.data;
				if(_this.config.isDefault){
					var html = '<ul>'
					html += _this.getHtml(_this.data);
					html += '</ul>'
					$(container).append(html);
					for(i=0;i<_this.config.type.length;i++){
						_this.bindEvent(_this.config.type[i]);
					}
					_this.bindScroll();
					_this.fnFinish(_this.data);
				}else{
					_this.fnSuccess(_this.data);
				}
	        }, 'get');
		},
		getHtml:function(data){
			this.setData(data);
			return this.config.html;
		},
		setData:function(data){
			var html = '';
			var _this = this;
			for(i=0;data!=null&&data.length!=0&&i<data.length;i++){
				var date = new Date(parseInt(data[i].createtime) * 1000);
				var tip = _this.addTips(data[i])
				var d = data[i];
				var options = _this.buildOptions(d,_this.config.type);
				var pic = '';
				if(d.pic!=null){
					pic = '<img src="'+d.pic+'" class="bluemp_block_topic_reply_block_userLevel">';
				}
				html += '<li class="bluemp_block_topic_list_wapper" id="inside_'+data[i].id+'" data-tid="'+data[i].id+'">';
				html += '<div class="bluemp_block_topic_info">';
				html += '<div class="bluemp_block_topic_info_user"><a href="/Portal/ucenter/userid/'+data[i].userid+'.html"><img src="'+data[i].head+'"></a></div>';
				html += '<ul>';
				html += '<li class="bluemp_block_topic_info_username"><a href="/Portal/ucenter/userid/'+data[i].userid+'.html">'+data[i].nick+'</a>'+pic+'</li>';
				html += '<li class="bluemp_block_topic_info_ptime">'+[date.getFullYear(), date.getMonth()+1, date.getDate()].join('-') +'</li>';
				html += '</ul>';
				html += '</div>';
				html += '<div class="bluemp_block_topic_content">';
				html += '<a href="/Home/Forum/detail/id/'+data[i].id+'.html">'+tip+'&nbsp;'+data[i].title+'</a>';
				html += '</div>';
				html += options;
				
				html += '<div class="bluemp_block_topic_listReply" id="reply_'+data[i].id+'">';
				html += '<ul>';
				var reply = data[i].reply;
				html += _this.buildReply(reply);
				html += '</ul>';
				if(data[i].reply!=null&&data[i].reply.length!=0){
					html += '<div class="bluemp_block_topic_listReplyE"><a href="/Home/Forum/detail/id/'+data[i].id+'.html">查看全部<em id="replynum_'+data[i].id+'">'+data[i].replycount+'</em>条回复</a></div>';
				}
				html += '</div>';
				html += '</li>';
			}
			html += '';
			this.config.html = html;
		},
		addTips:function(data){
			var tip = '';
			if(data.top==2){
				tip += '<span class="bluemp_block_topic_tip1">全局</span>';
			}else if(data.top==1){
				tip += '<span class="bluemp_block_topic_tip2">置顶</span>';
			}
			if(data.piccount!=0){
				tip += '<span class="bluemp_block_topic_tip3">有图有真相</span>';
			}
			return tip;
		},
		buildOptions:function(data,type){
			var block = '<div class="bluemp_block_topic_options">';
			var _this = this;
			for(k=0;k<type.length;k++){
				block += _this.addOptions(data,type[k]);
			}
			
			block += '</div>';
			return block;
		},
		addOptions:function(data,type){
			var clazz = '';
			if(data.likestatus==true){
				clazz = 'bluemp_block_topic_action_praiseiconOn';
			}else{
				clazz = 'bluemp_block_topic_action_praiseiconOff';
			}
			var options = '';
			switch (type){
				case 'top':
					if(data.moderator&&data.top=='0'){
						options += '<div class="bluemp_block_topic_action_top" data-tid="'+data.id+'">置顶</div>';
					}else if(data.moderator&&data.top=='1'){
						options += '<div class="bluemp_block_topic_action_untop" data-tid="'+data.id+'">取消置顶</div>';
					}
					break;
				case 'praise':
					options += '<div class="bluemp_block_topic_action_praise" data-tid="'+data.id+'">';
					options += '<div class="'+clazz+'"></div>';
					options += '<span class="bluemp_block_topic_action_praisenum">'+data.likecount+'</span>';
					options += '</div>';
					break;
				case 'reply':
					options += '<div class="bluemp_block_topic_action_reply"  data-tid="'+data.id+'"  data-an="'+data.is_anonymous+'">';
					options += '<div class="bluemp_block_topic_action_replyicon"></div>';
					options += '<span class="">回复</span>';
					options += '</div>'
					break;
				default:
					break;
			}
			return options;
		},
		bindEvent:function(type){
			var that = this;
			switch (type){
				case 'top':
					$('.bluemp_block_topic_action_top').unbind('click').click(function(){
						var params = {};
						var id =  $(this).attr('data-tid');
						params.htid = id;
						if(!bluemp.loginCheck()){
							return;
						} else {
							var z = {};
						    z.params = params;
						    z.fnSuccess = function(data){
						    	popup.remind(data.msg);
								window.location.reload();
								layer.closeAll();
						    }
						    z.fnFailed = function(data){
						    	popup.remind(data.msg);
								layer.closeAll();
						    }
							var html= '<div class="zhidingtanceng">';
							    html+='<p>将该话题在本版块置顶？</p>';
								html+='<div class="send-2btn" style="width:100%;text-align:center;margin-right:5%;margin-top:30px;">';
							    html+='<input type="button" class="input2" style="float:none;" value="确定" id="successtop">';
								html+=' <input type="button" class="input1" style="margin-left:0;" value="取消" id="closelay">';
								html+='</div>';
							    html+='</div>';
						    var l = {};
						    l.html = html;
						    l.fnSuccess = function(){
						    	$('#closelay').click(function() {
									layer.closeAll();
						        })
						        $('#successtop').click(function() {
						            bluemp.api.topicTop(z)
						        });
						    }
						    new bluemp.tool.Dialog(l)
						}
					});
					$('.bluemp_block_topic_action_untop').unbind('click').click(function(){
						var params = {};
						var id =  $(this).attr('data-tid');
						params.htid = id;
						if(!bluemp.loginCheck()){
							return;
						} else {
							var z = {};
						    z.params = params;
						    z.fnSuccess = function(data){
						    	popup.remind(data.msg);
								window.location.reload();
								layer.closeAll();
						    }
						    z.fnFailed = function(data){
						    	popup.remind(data.msg);
								layer.closeAll();
						    }
							var html= '<div class="zhidingtanceng">';
							    html+='<p>将该话题在本版块取消置顶？</p>';
								html+='<div class="send-2btn" style="width:100%;text-align:center;margin-right:5%;margin-top:30px;">';
							    html+='<input type="button" class="input2" style="float:none;" value="确定" id="successtop">';
								html+=' <input type="button" class="input1" style="margin-left:0;" value="取消" id="closelay">';
								html+='</div>';
							    html+='</div>';
						    var l = {};
						    l.html = html;
						    l.fnSuccess = function(){
						    	$('#closelay').click(function() {
									layer.closeAll();
						        })
						        $('#successtop').click(function() {
						            bluemp.api.topicCancelTop(z)
						        });
						    }
						    new bluemp.tool.Dialog(l)
						}
					});
					break;
				case 'praise':
					$('.bluemp_block_topic_action_praise').unbind('click').click(function(){
						var _this = $(this);
						var params = {};
						if(!bluemp.loginCheck()){
							return;
						} else {
							params.htid = $(this).attr('data-tid');
							params.type = 2;
							var config = {};
							config.params = params;
							config.fnSuccess = function(data){
								_this.find('.bluemp_block_topic_action_praiseiconOff').addClass('bluemp_block_topic_action_praiseiconOn').removeClass('bluemp_block_topic_action_praiseiconOff')
								_this.find('.bluemp_block_topic_action_praisenum').html(parseInt(_this.find('.bluemp_block_topic_action_praisenum').html())+1);
								popup.remind(data.msg);
							}
							config.fnFailed = function(data){
								popup.remind(data.msg);
							}
							bluemp.api.Exellent(config);
						}
					});
					break;
				case 'reply':
					$('.bluemp_block_topic_action_reply').unbind('click').click(function(){
						var _this = $(this);
						var params = {};
				        var id = $(this).attr('data-tid');
				        var is_anonymous = $(this).attr('data-an');
						if(!bluemp.loginCheck()){
							return;
						} else {
							var q = {};
							q.fnSuccess = function(dataR){
								var html = '';
								html += '<div class="huifutanchu">';
								html += '<div class="huifu-textarea">';
								html += '<textarea style="width:100%;maxlength:140;" id="content"  class="emotion chackTextarea"></textarea>';
								html += '</div><div class="huifu_sz"><span style="float:right" id="textcount" class="num">140</span></div>';
								html += '<ul class = "reply-ul"><li class="reply-ul_left"><span class="span2"><a href="javascript:void(0);" id="face"><img src="/Public/Home/Images/biaoqing-icon.jpg"></a></span></li>';
								if (is_anonymous == '1') {
									html += '<li class="reply-ul_left"><h2><span><input type="checkbox" id="anonymous">匿名回复</span></h2></li>';
								}
								html += '';
								html += '<li class="reply-ul_right"><div class="send-2btn_a" style="width:100%;"><div class="huifu_sz">';
								html += '<input type="button" class="input1" value="取消" id="closelay">';
								html += '<input type="button" class="input2" value="发送" id="postreply">';
								html += '</li>';
								html += '</div>';
								html += '</ul></div>';
								var index = $.layer({
									type: 1,
									title: false,
									area: ['100%', '210px'],
									shade: [0.5, '#000'],
									border: [0],
									offset: ["0px", "0%"],
									closeBtn: true,
									page: {
										html: html
									},
									success: function() {
										$('#face').SinaEmotion($('.emotion'));
										$(document).bind('touchmove', function(event) {
											event.preventDefault();
										})
										var txtobj = {
											divName: "huifutanchu", //外层容器的class
											textareaName: "chackTextarea", //textarea的class
											numName: "num", //数字的class
											num: 140 //数字的最大数目
										}
										$("." + txtobj.textareaName).on("focus", function() {
											$b = $(this).parents("." + txtobj.divName).find("." + txtobj.numName); //获取当前的数字
											$par = $b.parent();
											$onthis = $(this); //获取当前的textarea
											$num = txtobj.num;
											var setNum = setInterval(function() {
												var strlen = 0; //初始定义长度为0
												var txtval = $.trim($onthis.val());
												for (var i = 0; i < txtval.length; i++) {
													if (isChinese(txtval.charAt(i)) == true) {
														strlen = strlen + 2; //中文为2个字符
													} else {
														strlen = strlen + 1; //英文一个字符
													}
												}
												strlen = Math.ceil(strlen / 2); //中英文相加除2取整数
												if ($num - strlen < 0) {
													$par.html('<span style="float:right;" id="textcount" class="num">超出<b  style="color:red;font-weight:lighter;" class=' + txtobj.numName + '>' + Math.abs($num - strlen) + '</b> 字</span>'); //超出的样式
													$('#postreply').attr("disabled", true).removeClass("input2").addClass("input1");
												}
												else {
													$par.html('<span style="float:right" id="textcount" class="num">' + ($num - strlen) + '</span>'); //正常时候
													$('#postreply').attr("disabled", false).removeClass("input1").addClass("input2");
												}
												$b.html($num - strlen);
											}, 500);
											function isChinese(str) {  //判断是不是中文
												var reCh = /[u00-uff]/;
												return !reCh.test(str);
											}
										});
										$('#closelay').click(function() {
											$(document).unbind('touchmove');
											layer.close(index);
										})
										$('#postreply').unbind('click').click(function() {//提交内容
											var replyflag = true;
											var content = $.trim($('#content').val());
											if (content == '') {
												alert('回复内容不能为空');
												return false;
											}
											var params = {};
											params.content = content;
											params.htid = id;
											if (is_anonymous == 1) {
												var isChecked = $('#anonymous').is(":checked");
												if (isChecked) {
													params.anonymity = 0;
												} else {
													params.anonymity = 1;
												}
											} else {
												params.anonymity = 1;
											}
											$('#postreply').attr("disabled",true).removeClass("input2").addClass("input1");
											var replyConfig = {};
											replyConfig.params = params;
											replyConfig.fnSuccess = function(data) {
												replyflag = true;
												popup.remind(data.msg);
												layer.closeAll();
												var num = parseInt($('#replynum_'+id).text())||0;
												var html = '';
												html += '<li><span>'+data.data.nick+'</span>&nbsp;'+data.data.content+'</li>';
												$('#reply_'+id).find('ul').prepend(html);
												if(num == 0){
													$('#reply_'+id).append('<div class="bluemp_block_topic_listReplyE"><a href="/Home/Forum/detail/id/'+id+'.html">查看全部<em id="replynum_'+id+'">'+(num+1)+'</em>条回复</a></div>')
												}else{
													$('#replynum_'+id).html(num-0+1);
												}
												
											}
											replyConfig.fnFailed = function(data) {
												replyflag = true;
												popup.remind(data.msg);
												if (data.status == '-2') {
												} else if (data.status == '-1') {
													layer.closeAll();
													login();
												}
											}
											if(replyflag){
												replyflag = false;
												bluemp.api.ReplyTopicBlock(replyConfig);
											}
										});
									}
								});
							}
							q.fnFailed = function(dataR){
								popup.remind(dataR.info);
								return false;
							}
							bluemp.api.Silenced(q);
						
						}
					})
					break;
				default:
					break;
			}
		},
		buildReply:function(data){
			var _this = this;
			var replyList = '';
			for(j=0;data!=null&&data.length!=0&&j<data.length&&j<_this.config.replyLimit;j++){
				replyList += '<li><span>'+data[j].nick+'</span>&nbsp;'+data[j].content+'</li>'
			}
			return replyList;
		},
		bindScroll:function(){
			var _this = this;
			$(window).scroll(function() {
				if($(document).height() - $(window).height() - $(document).scrollTop() < 100) {
					if (_this.isrun==true||_this.request == true||_this.hasNext==false){
						return;
					} else{
						_this.randerNextPage();
					}
				}
			})
		},
		randerNextPage:function(){
			var _this = this;
			this.getNextPage({},function(data){
				$('.bluemp_block_topic_list>ul').append(data);
				for(i=0;i<_this.config.type.length;i++){
					_this.bindEvent(_this.config.type[i]);
				}
			});
		},
		getNextPage:function(data,fn){
			var params = {};
			this.request = true;
			this.page++;
			if(this.config.isDefault){
				params.page = this.page;
				params.pid = this.pid;
				params.minid = $('.bluemp_block_topic_list_wapper').last().attr('data-tid');
			}else{
				params = data;
			}
			var html = '';
			var _this = this;
			jsonAjax('/Interface/getTopicList', params, function(d) {
				_this.data = d.data;
				_this.request = false;
				if(_this.data==null){
					_this.hasNext = false;
				}
				if(_this.config.isDefault&&_this.data!=null){
					html = _this.getHtml(_this.data);
					fn(html);
				}else{
					fn(_this.data);
				}
	        }, 'get');
		}
	}
	return TopicList;
}()


bluemp.block.topicDetail = function(){
	var TopicDetail = function(config){
		var DEFAULT_CONFIG = {
			container:'.bluemp_block_topic_detail',
			isDefault:true,
			options:['delete','top','reply','praise'],
			fnSuccess:function(data){},
			fnFailed:function(data){},
			fnFinish:function(data){}
		};
		
        this.config = $.extend({}, DEFAULT_CONFIG, config);
        this.container = $(this.config.container);
		this.fnSuccess = this.config.fnSuccess;
		this.fnFailed = this.config.fnFailed;
		this.fnFinish = this.config.fnFinish;
		this.tid = bluemp_tid;
		this.init(this.container);
	}
	
	TopicDetail.prototype = {
		init:function(container){
			var _this = this;
			jsonAjax('/Interface/getTopicDetail', {tid:_this.tid}, function(d) {
				_this.data = d.data;
				if(_this.config.isDefault){
					var html = _this.getHtml(_this.data);
					$(container).append(html);
					_this.bindEvent();
					_this.fnFinish(_this.data);
				}else{
					_this.fnSuccess(_this.data);
				}
	        }, 'get');
		},
		getHtml:function(data){
			this.setData(data);
			return this.config.html;
		},
		setData:function(data){
			var date = new Date(parseInt(data.createtime) * 1000);
			var options = this.addOptions(data);
			var pic = '';
			if(data.pic!=null){
				pic = '<img src="'+data.pic+'" class="bluemp_block_topic_reply_block_userLevel">';
			}
			var html = '<div class="bluemp_block_topic_detail_wapper">';
			html += '<div class="bluemp_block_topic_detail_info">';
			html += '<div class="bluemp_block_topic_detail_userinfo"><a href="/Portal/ucenter/userid/'+data.userid+'.html"><img src="'+data.head+'"></a></div>';
			html += '<ul>';
			html += '<li class="bluemp_block_topic_detail_username"><a href="/Portal/ucenter/userid/'+data.userid+'.html">'+data.nick+'</a>'+pic+'</li>';
			html += '<li class="bluemp_block_topic_detail_ptime">'+[date.getFullYear(), date.getMonth()+1, date.getDate()].join('-') +'</li>';
			html += '</ul>';
			html += '</div>';
			html += '<div class="bluemp_block_topic_detail_content">'+data.title+'</div>';
			html += '<div class="bluemp_block_topic_detail_pic">';
			html += '<div class="bluemp_block_topic_detail_picWapper">';
			html += '<ul>';
			for(i=0;data.img!=null&&data.img.length!=0&&i<data.img.length;i++){
				html += '<li><img src="'+data.img[i]+'" href="'+data.img[i]+'" ></li>';
			}
			html += '</ul>';
			html += '</div>';
			html += '</div>';
			if(this.config.options.length>0){
				html += options;
			}
			html += '</div>';
			this.config.html = html;
		},
		getData:function(params){
			
		},
		addOptions:function(data){
			var options = '<div class="bluemp_block_topic_detail_options">';
			for(i=0;i<this.config.options.length;i++){
				options += this.getBlock(this.config.options[i],data);
			}
			options += '</div>';
			return options;
		},
		getBlock:function(type,data){
			var html = '';
			switch (type){
				case 'delete':
					if(data.moderator==true||data.is_own==true){
						html += '<div class="bluemp_block_topicd_action_del">删除话题</div>';
					}else{

					}					
					break;
				case 'top':
					if(data.moderator==true&&data.top==0){
						html += '<div class="bluemp_block_topicd_action_top" data-tid="'+data.id+'">置顶</div>';
					}else if(data.moderator==true&&data.top!=0){
						html += '<div class="bluemp_block_topicd_action_untop" data-tid="'+data.id+'">取消置顶</div>';
					}
					break;
				case 'praise':
					var type = '';
					if(data.likestatus==true){
						type = 'bluemp_block_topicd_action_praiseiconOn';
					}else{
						type = 'bluemp_block_topicd_action_praiseiconOff';
					}
					html += '<div class="bluemp_block_topicd_action_praise" data-tid="'+data.id+'">';
					html += '<div class="'+type+'"></div>';
					html += '<span class="bluemp_block_topicd_action_praisenum">'+data.likecount+'</span>';
					html += '</div>';
					break;
				case 'reply':
					html += '<div class="bluemp_block_topicd_action_reply" data-tid="'+data.id+'" data-an="'+data.is_anonymous+'">';
					html += '<div class="bluemp_block_topicd_action_replyicon"></div>';
					html += '<span class="">回复</span>';
					html += '</div>'
					break;
				default:
					break;
			}
			return html;
		},
		bindEvent:function(){
			var that = this;
			$('.bluemp_block_topicd_action_top').unbind('click').click(function(){
				var params = {};
				var id =  $(this).attr('data-tid');
				params.htid = id;
				if(!bluemp.loginCheck()){
					return;
				} else {
					var z = {};
				    z.params = params;
				    z.fnSuccess = function(data){
				    	popup.remind(data.msg);
						window.location.reload();
						layer.closeAll();
				    }
				    z.fnFailed = function(data){
				    	popup.remind(data.msg);
						layer.closeAll();
				    }
					var html= '<div class="zhidingtanceng">';
					    html+='<p>将该话题在本版块置顶？</p>';
						html+='<div class="send-2btn" style="width:100%;text-align:center;margin-right:5%;margin-top:30px;">';
					    html+='<input type="button" class="input2" style="float:none;" value="确定" id="successtop">';
						html+=' <input type="button" class="input1" style="margin-left:0;" value="取消" id="closelay">';
						html+='</div>';
					    html+='</div>';
				    var l = {};
				    l.html = html;
				    l.fnSuccess = function(){
				    	$('#closelay').click(function() {
							layer.closeAll();
				        })
				        $('#successtop').click(function() {
				            bluemp.api.topicTop(z)
				        });
				    }
				    new bluemp.tool.Dialog(l)
				}
			});
			$('.bluemp_block_topicd_action_untop').unbind('click').click(function(){
				var params = {};
				var id =  $(this).attr('data-tid');
				params.htid = id;
				if(!bluemp.loginCheck()){
					return;
				} else {
					var z = {};
				    z.params = params;
				    z.fnSuccess = function(data){
				    	popup.remind(data.msg);
						window.location.reload();
						layer.closeAll();
				    }
				    z.fnFailed = function(data){
				    	popup.remind(data.msg);
						layer.closeAll();
				    }
					var html= '<div class="zhidingtanceng">';
					    html+='<p>将该话题在本版块取消置顶？</p>';
						html+='<div class="send-2btn" style="width:100%;text-align:center;margin-right:5%;margin-top:30px;">';
					    html+='<input type="button" class="input2" style="float:none;" value="确定" id="successtop">';
						html+=' <input type="button" class="input1" style="margin-left:0;" value="取消" id="closelay">';
						html+='</div>';
					    html+='</div>';
				    var l = {};
				    l.html = html;
				    l.fnSuccess = function(){
				    	$('#closelay').click(function() {
							layer.closeAll();
				        })
				        $('#successtop').click(function() {
				            bluemp.api.topicCancelTop(z)
				        });
				    }
				    new bluemp.tool.Dialog(l)
				}
			});
			$('.bluemp_block_topicd_action_del').unbind('click').click(function(){
				var _this = $(this);
				var params = {};
				if(!bluemp.loginCheck()){
					return;
				} else {
					var params = {};
					var id = that.tid;
					params.id = id;
				    var z = {};
				    z.params = params;
				    z.fnSuccess = function(data) {
				        popup.remind(data.msg);
						_this.closest('.bluemp_block_topic_detail_wapper').remove();
						$('.bluemp_block_topic_reply_list>ul').remove();
						layer.closeAll();
				    }
				    z.fnFailed = function(){
				        popup.remind(data.msg);
				    }
				    var html= '<div class="zhidingtanceng">';
					    html+='<p>您确定要删除此话题吗？</p>';
						html+='<div class="send-2btn" style="width:100%;text-align:center;margin-right:5%;margin-top:30px;">';
					    html+='<input type="button" class="input2" style="float:none;" value="确定" id="successdelete">';
						html+=' <input type="button" class="input1" style="margin-left:0;" value="取消" id="closelay">';
						html+='</div>';
					    html+='</div>';
				    var l = {};
				    l.html = html;
				    l.fnSuccess = function(){
				    	$('#closelay').click(function() {
				            layer.close(index);
				        })
				        $('#successdelete').click(function() {
				            bluemp.api.deleteTopic(z)
				        });
				    }
				    new bluemp.tool.Dialog(l);
				}
			});
			$('.bluemp_block_topicd_action_praise').unbind('click').click(function(){
				var _this = $(this);
				var params = {};
				if(!bluemp.loginCheck()){
					return;
				} else {
					params.htid = that.tid;
					params.type = 2;
					var config = {};
					config.params = params;
					config.fnSuccess = function(data){
						_this.find('.bluemp_block_topicd_action_praiseiconOff').addClass('bluemp_block_topicd_action_praiseiconOn').removeClass('bluemp_block_topicd_action_praiseiconOff')
						_this.find('.bluemp_block_topicd_action_praisenum').html(parseInt(_this.find('.bluemp_block_topicd_action_praisenum').html())+1);
						popup.remind(data.msg);
					}
					config.fnFailed = function(data){
						popup.remind(data.msg);
					}
					bluemp.api.Exellent(config);
				}
			});
			$('.bluemp_block_topicd_action_reply').unbind('click').click(function(){
				var _this = $(this);
				var params = {};
		        var tid = that.tid;
		        var is_anonymous = $(this).attr('data-an');
		        params.tid = tid;
		        params.is_anonymous = is_anonymous;
				if(!bluemp.loginCheck()){
					return;
				} else {
					var q = {};
					q.fnSuccess = function(dataR){
						var replyConfig = {};
						replyConfig.params = params;
						replyConfig.fnSuccess = function(data) {
							var i = $('.bluemp_block_topic_reply_listWapper').length-$('.replyAgain').length;;
							var pic = '';
							if(data.data.pic!=null){
								pic = '<img src="'+data.data.pic+'" class="bluemp_block_topic_reply_block_userLevel">';
							}
							var	html = '<li class="bluemp_block_topic_reply_listWapper" data-rid="'+data.data.id+'">'
							html += '<div>'
							if(data.data.is_anonymous==1){
								html += '<div class="bluemp_block_topic_reply_userImg"><a href="javascript:;"><img src="'+data.data.head+'"></a></div>';
								html += '<ul class="bluemp_block_topic_reply_userInfo">';
								html += '<li class="bluemp_block_topic_reply_userInfo1"><a href="javascript:;">'+data.data.nick+'</a>'+pic+'<span>'+(i+1)+'楼</span></li>';
							}else{
								html += '<div class="bluemp_block_topic_reply_userImg"><a href="/Portal/ucenter/userid/'+data.data.userid+'.html"><img src="'+data.data.head+'"></a></div>';
								html += '<ul class="bluemp_block_topic_reply_userInfo">';
								html += '<li class="bluemp_block_topic_reply_userInfo1"><a href="/Portal/ucenter/userid/'+data.data.userid+'.html">'+data.data.nick+'</a>'+pic+'<span>'+(i+1)+'楼</span></li>';
							}
							html += '<li class="bluemp_block_topic_reply_userInfo2">'+data.data.time+'</li>';
							html += '</ul>';
							html += '<div class="bluemp_block_topic_reply_content">'+data.data.content+'</div>';
							html += '</div>';
							html += '<div class="bluemp_block_topic_reply_options">';
							html += '<a href="javascript:void(0);" class="bluemp_block_topic_reply_actiond" data-rid="'+data.data.id+'"><span>删除</span></a>';
							html += '</div>';
							html += '</div>';
							html += '</li>';
							$('.bluemp_block_topic_reply_list>ul').append(html);
							
							$('.bluemp_block_topic_reply_actiond').unbind('click').click(function(){
								var _this = $(this);
								var params = {};
								var id = $(this).attr('data-rid');
								params.id = id;
								var html= '<div class="zhidingtanceng">';
									html+='<p>您确定要删除此话题的回复内容吗？</p>';
									html+='<div class="send-2btn" style="width:100%;text-align:center;margin-right:5%;margin-top:30px;">';
									html+='<input type="button" class="input2" style="float:none;" value="确定" id="successdelete">';
									html+=' <input type="button" class="input1" style="margin-left:0;" value="取消" id="closelay">';
									html+='</div>';
									html+='</div>';
								var o = {};
								o.html = html;
								o.fnSuccess = function(){
									$('#closelay').click(function(){
										layer.closeAll();
									})
									$('#successdelete').click(function(){
										var config = {};
										config.params = params;
										config.fnSuccess = function(data){
											if(that.config.isDefault){
												popup.remind(data.msg);
												_this.closest('.bluemp_block_topic_reply_listWapper').remove();
												layer.closeAll();
											}else{
												popup.remind(data.msg);
												layer.closeAll();
												that.fnDeleteReply(id);
											}
										}
										config.fnFailed = function(data){
											popup.remind(data.msg);
											window.location.reload();
										}
										bluemp.api.DeleteReplyTopic(config)
									});
								}
								o.fnFailed = function(data){
									
								}
								new bluemp.tool.Dialog(o)
							})
						}
						replyConfig.fnFailed = function(data) {
							
						}
						new bluemp.tool.topicReplyBox(replyConfig);
					}
					q.fnFailed = function(dataR){
						popup.remind(dataR.info);
						return false;
					}
					bluemp.api.Silenced(q);
				
				}
			})
		}
	}
	return TopicDetail;
}()


bluemp.block.topicReplyList = function(){
	var TopicReplyList = function(config){
		var DEFAULT_CONFIG = {
			container:'.bluemp_block_topic_reply_list',
			isDefault:true,
			fnSuccess:function(data){},
			fnFailed:function(data){},
			fnFinish:function(data){},
			fnDeleteReply:function(data){}
		};
		
        this.config = $.extend({}, DEFAULT_CONFIG, config);
        this.container = $(this.config.container);
		this.tid = bluemp_tid;
		this.page = 0;
		this.isrun = false;
		this.request = false;
		this.hasNext = true;
		this.fnSuccess = this.config.fnSuccess;
		this.fnFailed = this.config.fnFailed;
		this.fnFinish = this.config.fnFinish;
		this.fnDeleteReply = this.config.fnDeleteReply;
		this.init(this.container);
	}
	
	TopicReplyList.prototype = {
		init:function(container){
			var _this = this;
			jsonAjax('/Interface/getReplyList', {tid:_this.tid,page:0}, function(d) {
				_this.data = d.data;
				if(_this.config.isDefault){
					var html = '<ul>';
					html += _this.getWapperHtml(_this.data);
					html += '</ul>';
					$(container).append(html);
					_this.bindEvent();
					_this.bindScroll();
					_this.fnFinish(_this.data);
				}else{
					_this.fnSuccess(_this.data);
				}
	        }, 'get');
		},
		getWapperHtml:function(data){
			this.setData(data);
			return this.config.html;
		},
		setData:function(data){
			var html = this.getListHtml(data);
			this.config.html = html;
		},
		getListHtml:function(data){
			var html = '';
			var _this = this;
			var j = $('.bluemp_block_topic_reply_listWapper').length-$('.replyAgain').length;
			for(i=0;data!=null&&i<data.length&&data.length!=0;i++){
				var ra = '';
				var d = data[i];
				if(d.r!=null){
					ra = _this.getReplyAgain(d.r,d.id);
				}
				var pic = '';
				if(d.pic!=null){
					pic = '<img src="'+d.pic+'" class="bluemp_block_topic_reply_block_userLevel">';
				}
				html += '<li class="bluemp_block_topic_reply_listWapper" data-rid="'+data[i].id+'">'
				html += '<div>'
				if(data[i].is_anonymous=='1'){
					html += '<div class="bluemp_block_topic_reply_userImg"><a href="javascript:;"><img src="'+data[i].head+'"></a></div>';
					html += '<ul class="bluemp_block_topic_reply_userInfo">';
					html += '<li class="bluemp_block_topic_reply_userInfo1"><a href="javascript:;">'+data[i].nick+'</a>'+pic+'<span>'+(j+1)+'楼</span></li>';
				}else{
					html += '<div class="bluemp_block_topic_reply_userImg"><a href="/Portal/ucenter/userid/'+data[i].userid+'.html"><img src="'+data[i].head+'"></a></div>';
					html += '<ul class="bluemp_block_topic_reply_userInfo">';
					html += '<li class="bluemp_block_topic_reply_userInfo1"><a href="/Portal/ucenter/userid/'+data[i].userid+'.html">'+data[i].nick+'</a>'+pic+'<span>'+(j+1)+'楼</span></li>';
				}
				
				html += '<li class="bluemp_block_topic_reply_userInfo2">'+data[i].turntime+'</li>';
				html += '</ul>';
				html += '<div class="bluemp_block_topic_reply_content">'+data[i].content+'</div>';
				html += '</div>'
				html += '<div class="bluemp_block_topic_reply_options">'
				if(data[i].allowdelete==true){
					html += '<a href="javascript:void(0);" class="bluemp_block_topic_reply_actiond"  data-rid="'+data[i].id+'"><span>删除</span></a>'
				}else{
					html += '<a href="javascript:void(0);" class="bluemp_block_topic_reply_actionRA" data-rid="'+data[i].id+'" data-an="'+data[i].anonymous+'"><span>回复</span></a>'
				}
				
				html += '</div>'
				html += '<div class="bluemp_block_topic_reply_againBox"><ul>'
				html += ra;
				html += '</ul></div>'
				html += '</div>'
				html += '</li>'
				j++;
			}
             
			html += ''
			return html;
		},
		getReplyAgain:function(data,id){
			var html = '';
			for(j=0;data!=null&&j<data.length&&data.length!=0;j++){
				html += '<li class="bluemp_block_topic_reply_listWapper replyAgain" data-rid="'+id+'">'
				html += '<div>'
				if(data[j].is_anonymous=='1'){
					html += '<div class="bluemp_block_topic_reply_userImg"><a href="javascript:;"><img src="'+data[j].head+'"></a></div>';
					html += '<ul class="bluemp_block_topic_reply_userInfo">';
					html += '<li class="bluemp_block_topic_reply_userInfo1"><a href="javascript:;">'+data[j].nick+'</a></li>';
				}else{
					html += '<div class="bluemp_block_topic_reply_userImg"><a href="/Portal/ucenter/userid/'+data[j].userid+'.html"><img src="'+data[j].head+'"></a></div>';
					html += '<ul class="bluemp_block_topic_reply_userInfo">';
					html += '<li class="bluemp_block_topic_reply_userInfo1"><a href="/Portal/ucenter/userid/'+data[j].userid+'.html">'+data[j].nick+'</a></li>';
				}
				html += '<li class="bluemp_block_topic_reply_userInfo2">'+data[j].turntime+'</li>';
				html += '</ul>';
				html += '<div class="bluemp_block_topic_reply_content">'+data[j].content+'</div>';
				html += '</div>';
				html += '<div class="bluemp_block_topic_reply_options">';
				if(data[j].allowdelete==true){
					html += '<a href="javascript:void(0);" class="bluemp_block_topic_reply_actiond"  data-rid="'+data[j].id+'"><span>删除</span></a>'
				}else{
					html += '';
				}
				html += '</div>';
				html += '</li>';
			}
			return html;
		},
		bindEvent:function(){
			var that = this;
			$('.bluemp_block_topic_reply_actiond').unbind('click').click(function(){
				var _this = $(this);
				var params = {};
				var id = $(this).attr('data-rid');
				params.id = id;
				var html= '<div class="zhidingtanceng">';
					html+='<p>您确定要删除此话题的回复内容吗？</p>';
					html+='<div class="send-2btn" style="width:100%;text-align:center;margin-right:5%;margin-top:30px;">';
					html+='<input type="button" class="input2" style="float:none;" value="确定" id="successdelete">';
					html+=' <input type="button" class="input1" style="margin-left:0;" value="取消" id="closelay">';
					html+='</div>';
					html+='</div>';
				var o = {};
				o.html = html;
				o.fnSuccess = function(){
					$('#closelay').click(function(){
						layer.closeAll();
					})
					$('#successdelete').click(function(){
						var config = {};
						config.params = params;
						config.fnSuccess = function(data){
							if(that.config.isDefault){
								popup.remind(data.msg);
								_this.closest('.bluemp_block_topic_reply_listWapper').remove();
								layer.closeAll();
							}else{
								popup.remind(data.msg);
								layer.closeAll();
								that.fnDeleteReply(id);
							}
						}
						config.fnFailed = function(data){
							popup.remind(data.msg);
							window.location.reload();
						}
						bluemp.api.DeleteReplyTopic(config)
					});
				}
				o.fnFailed = function(data){
					
				}
				new bluemp.tool.Dialog(o)
			})
			$('.bluemp_block_topic_reply_actionRA').unbind('click').click(function(){
				var _this = $(this);
				var params = {};
		        var tid = that.tid;
		        var rid = $(this).attr('data-rid');
		        var is_anonymous = $(this).attr('data-an');
		        params.tid = tid;
		        params.is_anonymous = is_anonymous;
		        params.rid = rid;
				if(!bluemp.loginCheck()){
					return;
				} else {
					var q = {};
					q.fnSuccess = function(dataR){
						var replyConfig = {};
						replyConfig.params = params;
						replyConfig.fnSuccess = function(data) {
							var pic = '';
							if(data.data.pic!=null){
								pic = '<img src="'+data.data.pic+'" class="bluemp_block_topic_reply_block_userLevel">';
							}
							var	html = '<li class="bluemp_block_topic_reply_listWapper replyAgain"  data-rid="'+rid+'">';
							html += '<div>'
							if(data.data.is_anonymous==1){
								html += '<div class="bluemp_block_topic_reply_userImg"><a href="javascript:;"><img src="'+data.data.head+'"></a></div>';
								html += '<ul class="bluemp_block_topic_reply_userInfo">';
								html += '<li class="bluemp_block_topic_reply_userInfo1"><a href="javascript:;">'+data.data.nick+'</a>'+pic+'</li>';
							}else{
								html += '<div class="bluemp_block_topic_reply_userImg"><a href="/Portal/ucenter/userid/'+data.data.userid+'.html"><img src="'+data.data.head+'"></a></div>';
								html += '<ul class="bluemp_block_topic_reply_userInfo">';
								html += '<li class="bluemp_block_topic_reply_userInfo1"><a href="/Portal/ucenter/userid/'+data.data.userid+'.html">'+data.data.nick+'</a>'+pic+'</li>';
							}
							html += '<li class="bluemp_block_topic_reply_userInfo2">'+data.data.time+'</li>';
							html += '</ul>';
							html += '<div class="bluemp_block_topic_reply_content">'+data.data.content+'</div>';
							html += '</div>'
							html += '<div class="bluemp_block_topic_reply_options">'
							html += '<a href="javascript:void(0);" class="bluemp_block_topic_reply_actiond" data-rid="'+data.data.id+'"><span>删除</span></a>'
							html += '</div>'
							html += '</div>'
							html += '</li>'
							_this.closest('.bluemp_block_topic_reply_listWapper').find('.bluemp_block_topic_reply_againBox>ul').append(html);
							that.bindEvent();
						}
						replyConfig.fnFailed = function(data) {
							
						}
						new bluemp.tool.topicReplyBox(replyConfig);
					}
					q.fnFailed = function(dataR){
						popup.remind(dataR.info);
						return false;
					}
					bluemp.api.Silenced(q);
				
				}
			})
		},
		bindScroll:function(){
			var _this = this;
			$(window).scroll(function() {
				if($(document).height() - $(window).height() - $(document).scrollTop() < 100) {
					if (_this.isrun==true||_this.request == true||_this.hasNext==false){
						return;
					} else{
						_this.randerNextPage();
						_this.bindEvent();
					}
				}
			})
		},
		randerNextPage:function(){
			var _this = this
			this.getNextPage({},function(data){
				$('.bluemp_block_topic_reply_list>ul').append(data);
			});
		},
		getNextPage:function(data,fn){
			var params = {};
			this.request = true;
			this.page++;
			if(this.config.isDefault){
				params.page = this.page;
				params.tid = this.tid;
				params.maxid = $('.bluemp_block_topic_reply_listWapper').last().attr('data-rid');
			}else{
				params = data;
			}
			var html = '';
			var _this = this;
			jsonAjax('/Interface/getReplyList', params, function(d) {
				_this.data = d.data;
				_this.request = false;
				if(_this.data==null){
					_this.hasNext = false;
				}
				if(_this.config.isDefault&&_this.data!=null){
					html = _this.getListHtml(_this.data);
					fn(html);
				}else{
					fn(_this.data);
				}
	        }, 'get');
		}
		
	}
	return TopicReplyList;
}()

bluemp.block.topicPublish = function(){
	var TopicPublish = function(config){
		var DEFAULT_CONFIG = {
			container:'.bluemp_block_topicPublish',
			isDefault:true,
			fnSuccess:function(data){},
			fnFailed:function(data){},
			fnFinish:function(data){}
		};
		this.flag = true;
        this.config = $.extend({}, DEFAULT_CONFIG, config);
        this.container = $(this.config.container);
		this.fnSuccess = this.config.fnSuccess;
		this.fnFailed = this.config.fnFailed;
		this.fnFinish = this.config.fnFinish;
		this.init(this.config.container);
		var _this = this;
		this.container.click(function(){
			if(bluemp.loginCheck()&&_this.flag){
				_this.flag = false;
				window.location.href='/Home/Forum/publish/cid/'+bluemp_pid;				
			}else{
				_this.flag = true;
			};
			
		});
	}
	
	TopicPublish.prototype = {
		init:function(container){
			var html = this.getHtml();
			$(container).append(html);
			this.fnFinish(this.data);
		},
		getHtml:function(){
			this.setData();
			return this.config.html;
		},
		setData:function(){
			this.config.html = '<span><a href="javascript:void(0);">发布话题</a></span>';
		}
	}
	return TopicPublish;
}()