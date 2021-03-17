$(function () {
    // 1.文章类别列表展示
    initArtCateList();

    function initArtCateList() {
        $.ajax({
            url: '/my/article/cates',
            type: 'GET',

            success: function (res) {
                // console.log(res);
                let str = template('tpl-art-cate', res)
                $('tbody').html(str)
            }
        })
    }

    // 2.添加
    let layer = layui.layer;
    let indexAdd = null;
    $('#btnAdd').on('click', function () {

        indexAdd = layer.open({
            type: 1,
            title: '添加文章类别',
            area: ['500px', '250px'],
            content: $('#dialog-add').html(),

        });
    })

    // 3.提交文章分类添加（事件委托）
    $('body').on('submit', '#form-add', function (e) {
        // 阻止表单默认提交
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {

                // console.log(res);
                // 判断
                if (res.status != 0) return layer.msg(res.message)
                // 重新渲染页面
                initArtCateList();
                // 关闭对话框
                layer.close(indexAdd);
                // 成功提示
                layer.msg('添加成功')
            }
        })
    });

    // 4.修改
    let indexEdit = null;
    let form = layui.form;
    $('tbody').on('click', '.btn-edit', function () {
        indexEdit = layer.open({
            type: 1,
            title: '添加文章类别',
            area: ['500px', '250px'],
            content: $('#dialog-edit').html(),
        });
        // 4.2发送ajax
        let Id = $(this).attr('data-id')
        // alert(Id)
        $.ajax({
            url: '/my/article/cates/' + Id,
            success: function (res) {
                // console.log(res);
                if (res.status != 0) {
                    layer.msg(res.message)
                }
                // 渲染
                form.val('form-edit', res.data)
            }
        })
    });

    // 5。文章分类修改（事件委托）
    $('body').on('submit', '#form-edit', function (e) {
        // 阻止表单默认提交
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function (res) {

                // console.log(res);
                // 判断
                if (res.status != 0) return layer.msg(res.message)
                // 重新渲染页面
                initArtCateList();
                // 关闭对话框
                layer.close(indexEdit);
                // 成功提示
                layer.msg('添加成功', { icon: 6 })
            }
        })
    });

    // 6.删除
    $('tbody').on('click', '.btn-delete', function () {
        let Id = $(this).attr('data-id')
        //弹出询问框
        layer.confirm('是否确认删除?', { icon: 3, title: '提示' }, function (index) {
            // 发送ajax
            $.ajax({
                url: '/my/article/deletecate/' + Id,
                success: function (res) {
                    if (res.status != 0) {
                        layer.msg(res.message)
                    }
                    // 成功提示
                    layer.msg(res.message)
                    // 重新渲染页面
                    initArtCateList();
                }
            })

            layer.close(index);
        });

        // alert(Id)

    });






})