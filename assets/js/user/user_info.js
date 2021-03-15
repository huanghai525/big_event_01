$(function () {
    // 1.校验规则定义
    let form = layui.form;
    form.verify({
        nickname: function (value) {
            if (value.length < 1 || value.length > 6) {
                return "昵称长度为1~6位之间"
            }
        }
    })
    // 2.展示用户信息（后面这个功能还有用 ，封装）
    // 导出layer 
    let layer = layui.layer;
    inifUserInfo();
    // 封装函数
    function inifUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',

            success: function (res) {
                // console.log(res);
                // 判断后台返回数据status是否成功 不成功提示
                if (res.status !== 0) return layer.msg(res.message, { iocn: 5 })
                // 成功：渲染页面
                form.val("formUserInfo", res.data);
            }
        })
    };

    // 3.重置
    // 给表单绑定 reset 重置事件
    // $('form').on('reset', function (e) {
    // 还可以给 button 按钮 绑定点击事件
    $('#btnReset').click(function (e) {
        // 阻止默认事件
        e.preventDefault();
        // 重新渲染
        inifUserInfo();
    })

    // 4、修改用户信息
    $('.layui-form').on('submit', function (e) {
        // 阻止浏览器默认提交
        e.preventDefault();
        // 发送
        $.ajax({
            url: '/my/userinfo',
            method: 'POST',
            data: $(this).serialize(),
            success: function (res) {
                // console.log(res);

                if (res.status != 0) return layer.msg(res.message, { iocn: 5 })

                layer.msg('用户信息修改成功', { iocn: 5 });
                console.log(window);
                console.log(window.parent);

                // 调用父页面中的更新用户信息和头像方法
                window.parent.getUserInof();
            }
        })
    })

})