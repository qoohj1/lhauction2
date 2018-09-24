$(function() {
    var page = {
        init: function(p) {
            var json = {
                api: config.apiServer + 'indexpc/get',
                type: 'get',
                data: {
                    actionxm: 'getPc'
                    // classify: 0
                }
            };
            var callback = function(res) {
                // 处理表格数据
                var idx=1,
                    list = res,
                    listTpl = '<tr><th>編號</th><th>封面圖</th><th>排序</th><th>狀態</th><th>編輯</th></tr>';
                for(var i in list) {
                    if(list[i]['status']==1){list[i]['status']="show";}else{list[i]['status']="hide"}
                    listTpl += '<tr>';
                    listTpl += '<td>' + (idx++) + '</td>';
                    listTpl += '<td><div style="display:inline-block;text-align:center;margin-right:60px"><img src="' + list[i]['pic1'] + '" style="width: 120px; height: 60px;"><p>(1)</p></div>';
                    listTpl += '<div style="display:inline-block;text-align:center;margin-right:60px"><img src="' + list[i]['pic2'] + '" style="width: 120px; height: 60px;"><p>(2)</p></div>';
                    listTpl += '<div style="display:inline-block;text-align:center;margin-right:60px"><img src="' + list[i]['pic3'] + '" style="width: 120px; height: 60px;"><p>(3)</p></div>';
                    listTpl += '<div style="display:inline-block;text-align:center;margin-right:60px"><img src="' + list[i]['pic4'] + '" style="width: 120px; height: 60px;"><p>(4)</p></div></td>';
                    listTpl += '<td>' + list[i]['sort'] + '</td>';
                    listTpl += '<td>' + list[i]['status'] + '</td>';
                    listTpl += '<td><button type="button" class="btn btn-sm btn-primary js_edit" data-toggle="modal" data-target="#editModal" data-id="' + list[i]['id'] + '">编辑</button></td>';
                    listTpl += '</tr>'
                }
                $('.js_table').html(listTpl);
            };
            json.callback = callback;
            Utils.requestData(json);
        },
        getDetail: function(id) {
            var that = this;
            var json = {
                api: config.apiServer + 'indexpc/get',
                type: 'get',
                data: {
                    actionxm: 'getDetail',
                    id: !id ? 1 : id
                }
            };
            var callback = function(res) {
                $('.js_id').text(res.id);
                console.log(res.sort);
                $('.js_add_sort').val(res.sort);
                $('.js_add_status').val(res.status);
                $('.js_menuTree').val(res.clazz_id);
                that.getPc(res.clazz_id, res.lot1, res.lot2, res.lot3, res.lot4, res.pic1, res.pic2, res.pic3, res.pic4);

                // $('.js_photo_prev').attr('src', res.pic);
            };
            json.callback = callback;
            Utils.requestData(json);
        },
        getPc: function(cid, lot1, lot2, lot3, lot4, pic1, pic2, pic3, pic4){
            var that = this;
            var json = {
                api: config.apiServer + 'pic_content/get',
                type: 'get',
                data: {
                    actionxm: 'getPc',
                    cid: !cid ? 1 : cid
                }
            };
            var callback = function(res) {
                // console.log(res);
                var html = '<option value="0">/</option>';
                for(r in res){
                    html += '<option value='+res[r]['num']+'>LOT:'+res[r]['num']+'-'+res[r]['title_tc']+'</option>'
                }
                // console.log(html);
                $('.js_add_pc1').html(html);
                $('.js_add_pc1').val(lot1);
                that.getPcImg($('.js_add_pc1').val(), '#pc_img1', 1, pic1);
                $('.js_add_pc2').html(html);
                $('.js_add_pc2').val(lot2);
                that.getPcImg($('.js_add_pc2').val(), '#pc_img2', 2, pic2);
                $('input[name="cover2"]').attr('checked', pic2);
                $('.js_add_pc3').html(html);
                $('.js_add_pc3').val(lot3);
                that.getPcImg($('.js_add_pc3').val(), '#pc_img3', 3, pic3);
                $('input[name="cover3"]').attr('checked', pic3);
                $('.js_add_pc4').html(html);
                $('.js_add_pc4').val(lot4);
                that.getPcImg($('.js_add_pc4').val(), '#pc_img4', 4, pic4);
            };
            json.callback = callback;
            Utils.requestData(json);
        },
        getPcImg: function(lot, el, no, pic){
            // console.log($('.js_menuTree').val());
            var json = {
                api: config.apiServer + 'pic_content/get',
                type: 'get',
                data: {
                    actionxm: 'getPcImg',
                    lot: lot,
                    clazz_id: $('.js_menuTree').val()
                }
            };
            var callback = function(res) {
                console.log(res);
                res.pic = res.pic.split(',');
                var html = '';
                if(pic){
                    for(r in res.pic){
                        if(res.pic[r]==pic){
                            html += '<input id="cover'+el.slice(-1)+'" checked style="margin-right:5px" type="radio" name="cover'+el.slice(-1)+'" value='+res.pic[r]+'><img style="width:100px;height:100px;margin:0 7px 20px 0;" src='+res.pic[r]+'>'
                        }else{
                            html += '<input id="cover'+el.slice(-1)+'" style="margin-right:5px" type="radio" name="cover'+el.slice(-1)+'" value='+res.pic[r]+'><img style="width:100px;height:100px;margin:0 7px 20px 0;" src='+res.pic[r]+'>'
                        }
                    }
                }else{
                    for(r in res.pic){
                        if(r==0){
                            html += '<input id="cover'+el.slice(-1)+'" checked style="margin-right:5px" type="radio" name="cover'+el.slice(-1)+'" value='+res.pic[r]+'><img style="width:100px;height:100px;margin:0 7px 20px 0;" src='+res.pic[r]+'>'
                        }else{
                            html += '<input id="cover'+el.slice(-1)+'" style="margin-right:5px" type="radio" name="cover'+el.slice(-1)+'" value='+res.pic[r]+'><img style="width:100px;height:100px;margin:0 7px 20px 0;" src='+res.pic[r]+'>'
                        }
                    }
                }

                $(el).html(html);
            };
            json.callback = callback;
            Utils.requestData(json);
        }
    };
    page.init();
    $('body').delegate('.js_add_pc1', 'change', function(e) {
        // console.log();
        page.getPcImg($('.js_add_pc1').val(), '#pc_img1');
    });
    $('body').delegate('.js_add_pc2', 'change', function(e) {
        // console.log();
        page.getPcImg($('.js_add_pc2').val(), '#pc_img2');
    });
    $('body').delegate('.js_add_pc3', 'change', function(e) {
        // console.log();
        page.getPcImg($('.js_add_pc3').val(), '#pc_img3');
    });
    $('body').delegate('.js_add_pc4', 'change', function(e) {
        // console.log();
        page.getPcImg($('.js_add_pc4').val(), '#pc_img4');
    });
    $('body').delegate('.js_menuTree', 'change', function(e) {
        // console.log();
        $('#pc_img1').html('');
        $('#pc_img2').html('');
        $('#pc_img3').html('');
        $('#pc_img4').html('');
        page.getPc($('.js_menuTree').val());
    });

    $('body').delegate('.js_edit', 'click', function(e) {
        var id = $(e.currentTarget).data('id');
        page.getDetail(id);
    });
    $('body').delegate('.js_saveBtn', 'click', function() {
        var id = $('.js_id').text();
        var json = {
                api: config.apiServer + 'indexpc/post',
                type: 'post',
                data: {
                    actionxm: 'updatePc',
                    id: id,
                    params: {
                        clazz_id: $('.js_menuTree').val(),
                        lot1: $('.js_add_pc1').val(),
                        pic1: $('input[name="cover1"]:checked').val(),
                        lot2: $('.js_add_pc2').val(),
                        pic2: $('input[name="cover2"]:checked').val(),
                        lot3: $('.js_add_pc3').val(),
                        pic3: $('input[name="cover3"]:checked').val(),
                        lot4: $('.js_add_pc4').val(),
                        pic4: $('input[name="cover4"]:checked').val(),
                        sort: $('#sort').val(),
                        status: $('#status').val()
                    }
                }
            };
        var callback = function(res) {
            if(res.status==0) {
                alert(res.msg);
                window.location.reload();
            } else {
                alert(res.msg);
            }
        };
        json.callback = callback;
        Utils.requestData(json);
    });
});
