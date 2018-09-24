$(function() {
    var page = {

        // 页面初始化方法
        init: function() {
            var self = this,
                json = {
                    api: config.apiServer + 'cata_request/get',
                    type: 'get',
                    data: {
                        actionxm: 'search'
                    }
                };
            var callback = function(res) {
                if(res.status == 0) {
                    var idx = 1,
                        list = res['data'],
                        listTpl = '<tr><th>編號</th><th>name_tc</th><th>name_en</th><th>狀態</th><th>排序</th><th>操作</th></tr>';
                    for(var i in list) {
                        listTpl += '<tr>';
                        listTpl += '<td>' + (idx++) + '</td>';
                        listTpl += '<td>' + list[i]['name_tc'] + '</td>';
                        listTpl += '<td>' + list[i]['name_en'] + '</td>';
                        listTpl += '<td>' + list[i]['status'] + '</td>';
                        listTpl += '<td>' + list[i]['sort'] + '</td>';
                        listTpl += '<td><button type="button" class="btn btn-sm btn-primary js_edit" data-toggle="modal" data-target="#editModal" data-id="' + list[i]['id'] + '">编辑</button>&nbsp;&nbsp;<button type="button" class="btn btn-sm btn-danger js_delete" data-id="' + list[i]['id'] + '">删除</button></td>';
                        listTpl += '</tr>';
                    }
                    $('.js_table').html(listTpl);
                } else {
                    alert(res.msg);
                }
            };
            json.callback = callback;
            Utils.requestData(json);
        },

        deleteConfirmTip: function(id) {
            $('#confirmModal').find('.js_sure_delete').attr('data-id', id);
            $('#confirmModal').modal('show');
        },

        deletItem: function(id) {
            var json = {
                api: config.apiServer + 'cata_request/post',
                type: 'post',
                data: {
                    actionxm: 'delete',
                    id: id
                }
            };
            var callback = function(res) {
                $('#confirmModal').modal('hide');
                alert(res.msg);
                window.location.reload();
            };
            json.callback = callback;
            Utils.requestData(json);
        },


        getDetail: function(id) {
            var json = {
                api: config.apiServer + 'cata_request/get',
                type: 'get',
                data: {
                    actionxm: 'detail',
                    id: !id ? 1 : id
                }
            };
            var callback = function(res) {
                if(res.status==0) {
                    $('.js_update_id').val(res['data'].id);
                    $('.js_update_name_en').val(res['data'].name_en);
                    $('.js_update_name_tc').val(res['data'].name_tc);
                    $('.js_update_status').val(res['data'].status);
                    $('.js_update_sort').val(res['data'].sort);
                } else {
                    alert('系统异常！');
                }
            };
            json.callback = callback;
            Utils.requestData(json);
        }

    };


    $('body').delegate('.js_delete', 'click', function(e) {
        var id = $(e.currentTarget).data('id');
        page.deleteConfirmTip(id);
    });

    $('body').delegate('.js_sure_delete', 'click', function(e) {
        var id = $(e.currentTarget).data('id');
        page.deletItem(id);
    });

    $('body').delegate('.js_add_saveBtn', 'click', function() {
        var name_en = $('.js_add_name_en').val(),
            name_tc = $('.js_add_name_tc').val(),
            status = $('.js_add_status').val();
            sort = $('.js_add_sort').val();
        var json = {
            api: config.apiServer + 'cata_request/post',
            type: 'post',
            data: {
                actionxm: 'add',
                params: {
                    name_en: name_en,
                    name_tc: name_tc,
                    status: status,
                    sort: sort
                }
            }
        };
        var callback = function(res) {
            alert(res.msg);
            if(res.status==0) {
                $('#addModal').modal('hide');
                window.location.reload();
            }
        };
        json.callback = callback;
        Utils.requestData(json);
    });

    $('body').delegate('.js_saveBtn', 'click', function() {
        var id = $('.js_update_id').val(),
            name_en = $('.js_update_name_en').val(),
            name_tc = $('.js_update_name_tc').val(),
            status = $('.js_update_status').val(),
            sort = $('.js_update_sort').val();
        var json = {
            api: config.apiServer + 'cata_request/post',
            type: 'post',
            data: {
                actionxm: 'update',
                id: id,
                params: {
                    name_en: name_en,
                    name_tc: name_tc,
                    status: status,
                    sort: sort
                }
            }
        };
        var callback = function(res) {
            alert(res.msg);
            if(res.status==0) {
                $('#editModal').modal('hide');
                window.location.reload();
            }
        };
        json.callback = callback;
        Utils.requestData(json);
    });

    $('body').delegate('.js_edit', 'click', function(e) {
        var id = $(e.currentTarget).data('id');
        page.getDetail(id);
    });

    page.init();
});
