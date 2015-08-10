/**
 * ajax请求提交
 * @param url
 * @param param
 * @param callback
 * @param type
 */
function jsonAjax(url, param, callback, type) {
    url = '/Home' + url;
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
    url = '/Home' + url;
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