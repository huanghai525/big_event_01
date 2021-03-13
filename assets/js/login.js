// 需求1：登录页面的切换
// 点击去注册按钮 切换表单
$('#link-reg').on('click', function () {
    $('.login-box').hide()
    $('.reg-box').show()
})


$('#link-login').on('click', function () {
    $('.reg-box').hide()
    $('.login-box').show()
})



// 自定义验证规则 
// console.log(layui);

let form = layui.form;
form.verify({
    // 密码规则
    pwd: [
        /^[\S]{6,12}$/,
        '密码必须6到12位，且不能出现空格'
    ],

    repwd: function (value) {
        // 获取两个密码框的值
        console.log(value);
        console.log($('.reg-box input[name="password"]').val());
        // 判断密码框是否一样
        if (value !== $('.reg-box input[name="password"]').val()) {
            return '密码不一致，请重新输入'
        }

    }
})


// 需求3 注册
let layer = layui.layer;
$('#form_reg').on('submit', function (e) {
    // 阻止表单默认提交
    e.preventDefault();
    // 发送 ajax
    $.ajax({
        url: '/api/reguser',
        type: 'POST',
        data: {
            username: $('.reg-box input[name="username"]').val(),
            password: $('.reg-box input[name="password"]').val()
        },
        success: function (res) {
            // console.log(res);
            // 看后台给的数据 status等于0表示成功 
            if (res.status != 0) return layer.msg(res.message, { icon: 5 });
            // 成功后提示
            layer.msg(res.message, { icon: 6 });
            // 成功后跳转到登录页面（触动一下点击事件）
            $('#link-login').click()
            // 清空注册表单
            $('#form_reg')[0].reset()
        }
    })
})

// 需求4：登录
$('#form_login').on('submit', function (e) {
    // 阻止表单默认提交
    e.preventDefault();
    console.log($(this).serialize());

    // 发送 ajax
    $.ajax({
        url: '/api/login',
        type: 'POST',
        data: $(this).serialize(),
        success: function (res) {
            console.log(res);
            // 看后台给的数据 status等于0表示成功 
            if (res.status != 0) return layer.msg(res.message, { icon: 5 });
            // 成功后提示
            layer.msg(res.message, { icon: 6 });
            // 保存token 一会需要用到
            localStorage.setItem('token', res.token)
            // 跳转页面
            location.href = '/index.html'
        }
    })
})