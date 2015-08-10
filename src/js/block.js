<script>
	//模块化


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
</script>
