$(function () {

    // 定义模板引擎函数
    template.defaults.imports.dateFormat = function (dtStr) {
        let dt = new Date(dtStr);
        let y = dt.getFullYear();
        let m = padZero(dt.getMonth() + 1);
        let d = padZero(dt.getDate());

        let hh = padZero(dt.getHours());
        let mm = padZero(dt.getMinutes());
        let ss = padZero(dt.getSeconds());

        // 拼接
        return `${y}-${m}-${d}  ${hh}:${mm}:${ss}`
    }

    function padZero(n) {
        return n > 9 ? n : '0' + n
    }




    // 定义查询参数
    let p = {
        pagenum: 1,    //是	int	    页码值
        pagesize: 2,	//是	int	    每页显示多少条数据
        cate_id: '',    //否	string	文章分类的 Id
        state: '',    //否	string	文章的状态，可选值有：已发布、草稿
    }

    // 初始化文章列表
    initTable()

    // 封装函数
    function initTable() {
        $.ajax({
            url: '/my/article/list',
            type: 'GET',
            data: p,
            success: function (res) {
                // console.log(res);

                if (res.status != 0) return layer.msg(res.message)

                // 渲染页面
                let htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)

                // 分页
                renderPage(res.total);
            }
        })
    }



    // 3初始化分类

    let form = layui.form
    inifCate()

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


    // 4.筛选功能
    $('#form-search').on('submit', function (e) {
        e.preventDefault()
        let cate_id = $("[name=cate_id]").val();
        let state = $("[name=state]").val();
        p.cate_id = cate_id;
        p.state = state;
        initTable();
    })


    // 5.分页切换函数
    let laypage = layui.laypage;
    function renderPage(total) {

        //执行一个laypage实例
        laypage.render({
            elem: 'pageBox',    //注意，这里的 test1 是 ID，不用加 # 号
            count: total,       //数据总数，从服务端得到
            limit: p.pagesize,  //每页显示的条数
            curr: p.pagenum,    //起始页。
            theme: '#f00',

            // 自定义属性
            layout: ['refresh', 'count', 'limit', 'prev', 'page', 'next', 'skip'],

            // limit 需要自己设置条数 （默认是 10 20 30 50 100）
            limits: [2, 3, 5, 10],
            jump: function (obj, first) {
                //obj包含了当前分页的所有参数，比如：
                // console.log(obj.curr);   //得到当前页，以便向服务端请求对应页的数据。
                // console.log(obj.limit); //得到每页显示的条数

                //首次不执行
                if (!first) {
                    //do something
                    p.pagenum = obj.curr;
                    p.pagesize = obj.limit
                    // 重新渲染页面 
                    initTable();
                }
            }

        });

    }

    // 6.删除
    $('tbody').on('click', '.btn-delete', function () {
        let Id = $(this).attr('data-id');
        // alert(Id)
        //eg1
        layer.confirm('is not?', { icon: 3, title: '提示' }, function (index) {
            //do something
            $.ajax({
                url: '/my/article/delete/' + Id,
                success: function (res) {
                    //    console.log(res);
                    if (res.status != 0) return layer.msg(res.message);
                    // 成功提示
                    layer.msg(res.message);
                    // 页面
                    
                    // 更新页面
                    initTable();
                }
            })
            layer.close(index);
        });

    })
})