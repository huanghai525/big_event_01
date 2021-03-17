
$(function () {

    // 1.文章类别渲染

    let form = layui.form
    let layer = layui.layer
    inifCate();
    function inifCate() {
        // 发送ajax
        $.ajax({
            url: '/my/article/cates',
            type: 'GET',
            success: function (res) {
                //    console.log(res);
                // 校验
                if (res.status != 0) return layer.msg(res.message)
                // 赋值
                let htmlStr = template('tpl-cate', res);
                $('[name="cate_id"]').html(htmlStr);
                form.render();
            }
        })
    }


    // 2.初始化富文本编辑器
    initEditor()



    // 3.图片裁剪
    // 3.1. 初始化图片裁剪器
    var $image = $('#image')
    // 3.2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }
    // 3.3. 初始化裁剪区域
    $image.cropper(options)

    // 4.点击按钮 选择图片
    $('#btnChooseImage').on('click', function () {
        $("#coverFile").click()
    })

    // 5.设置图片
    $("#coverFile").change(function (e) {
        // 1.拿到用户选择的文件
        var file = e.target.files[0]
        // 非空校验
        if (file == undefined) return layer.msg('封面图片未设置')
        // 2.根据选择的文件，创建一个对应的 URL 地址：
        var newImgURL = URL.createObjectURL(file)
        // 3.先`销毁`旧的裁剪区域，再`重新设置图片路径`，之后再`创建新的裁剪区域`：
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域
    })


    // 6.设置状态

    // let state = '';
    let state = '已发布';
    // $("#btnSave1").on('click', function () {
    //     state = '已发布';
    // })
    $("#btnSave2").on('click', function () {
        state = '草稿';
    })


    // 7.发布文章
    $("#form-pub").on('submit', function (e) {
        // 阻止默认提交
        e.preventDefault();
        // 创建  FormData   对象 ， 收集数据
        let fd = new FormData(this);
        // console.log(...fd);
        fd.append('state', state)
        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function (blob) {       // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                fd.append('cover_img', blob)
                // console.log(...fd);
                publishArticle(fd);
            });

    })

    // 发送ajaax
    function publishArticle(fd) {
        $.ajax({
            url: '/my/article/add',
            type: 'POST',
            data: fd,
            contentType: false,
            processData: false,
            success: function (res) {
                //    console.log(res);
                // 失败提示
                if (res.status != 0) return layer.msg(res.message);
                // 成功提示
                layer.msg(res.message);
                // 页面跳转
                // location.href = '/article/art_list.html'//会有一个bug 页面跳转 列表不跳
                setTimeout(function () {

                    window.parent.document.querySelector('#art_list').click()
                }, 500)
            }
        })
    }

})