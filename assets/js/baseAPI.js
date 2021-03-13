let baseURL = 'http://api-breakingnews-web.itheima.net';


$.ajaxPrefilter(function (params) {
    console.log(params);
    console.log(params.url);
    params.url = baseURL     + params.url
})