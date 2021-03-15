// 入口函数
$(function () {

    //获取用户信息
    getUserInof()


    // 2.退出
    let layer = layui.layer;
    $('#btnLogOut').on('click', function () {
        //框架提供的询问框
        layer.confirm('确认退出登录？', { icon: 3, title: '提示' }, function (index) {
            //1.清空本地存储的token
            localStorage.removeItem('token')
            //2.页面跳转 
            location.href = '/login.html'
            // 关闭询问框
            layer.close(index);
        });
    })



})

// 获取用户信息 （因为后面还要用到用户信息，所有封装到入口函数外面)
function getUserInof() {
    $.ajax({
        url: '/my/userinfo',
        // headers: {
        //     //   获取之前存储在本地的登录信息
        //     Authorization: localStorage.getItem('token') || ''
        // },

        // 3.登录拦截
        // complete: function (res) {
        //     console.log(res.responseJSON);
        //     // let obj = res.responseJSON;
        //     // if (obj.status == 1 && obj.message == "身份认证失败！") {
        //     //     localStorage.removeItem('token');
        //     //     location.href = '/login.html'
        //     // }
        // },
        success: function (res) {
            // console.log(res);
            if (res.status != 0) return layui.layer.msg(res.message, { icon: 5 })
            // 头像渲染
            renderAvatar(res.data)
        }
    })
}

function renderAvatar(user) {
    // 渲染名称有（nicknam优先，否则就用username）
    let name = user.nickname || user.username;
    $('#welcome').html('欢迎 &nbsp' + name);
    // 渲染头像
    if (user.user_pic !== null) {
        $('.layui-nav-img').show().attr('src', user.user_pic);
        $('.text-avatar').hide()
    } else {
        $('.layui-nav-img').hide();
        $('.text-avatar').show().html(name[0].toUpperCase())
    }
}