<script>

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
</script>