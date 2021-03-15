let baseURL = 'http://api-breakingnews-web.itheima.net';


$.ajaxPrefilter(function (params) {
    // console.log(params);
    // console.log(params.url);
    // 1.优化发送请求url 前补充完整路径
    // if (params.url === 'http://127.0.0.1:5500/index.html') return;
    params.url = baseURL + params.url

    // 2.给ajax接口中带有 /my/ 的接口补充一个身份验证Authorization
    if (params.url.indexOf("/my/") != -1) {
        //   获取之前存储在本地的登录信息
        params.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
        // 3.登录拦截
        params.complete = function (res) {
            // console.log(res.responseJSON);
            // message: "身份认证失败！"
            // status: 1
            let obj = res.responseJSON;
            if (obj.status == 1 && obj.message == "身份认证失败！") {
                localStorage.removeItem('token');
                location.href = '/login.html'
            }
        }
    }

})