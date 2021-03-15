$(function () {

    // 1.定义密码校验规则
    let form = layui.form
    form.verify({
        // 密码规则
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        // 新密码跟旧密码不能一样
        samePwd: function (value) {
            // 判断
            if ($('[name="oldPwd"]').val() === value) return '新密码不能跟原密码相同'
        },
        // 确认密码跟新密码一致
        rePwd: function (value) {
            if ($('[name="newPwd"]').val() != value) return '确认密码跟新密码不相同'
        },
    })

    // 2.修改密码(表单提交)
    $('form').on('submit', function (e) {
        // 阻止浏览器默认事件
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {
                console.log(res);
                // 不成功提示
                if (res.status != 0) return layui.layer.msg(res.message);
                // 成功提示信息、
                layui.layer.msg('修改密码成功');
                // 成功后清除表单值
                $('form')[0].reset();
            }
        })
    })


})