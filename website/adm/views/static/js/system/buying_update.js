$(function() {
    var page = {
        init: function() {

            // 渲染编辑菜单的选项
            // this.renderMenuTree();
            this.renderPicPrev();
        },
        // 渲染预览图片
        renderPicPrev: function() {
            if(!!$('.js_update_banner').val()) {
              var picJson = $('.js_update_banner').val().split(','),
                  picHtml = '';
              for(var i=0; i<picJson.length; i++) {
                  picHtml += '<div><div class="prev-frame"><em class="js_delete_banner" data-url="' + picJson[i] + '">x</em><img src="' + picJson[i] + '" class="prev-banner"></div></div>';
              }
              $('.js_bannerPrevArea').html(picHtml);
            }
            if(!!$('.js_update_web_pic1').val()) {
              var picJson = $('.js_update_web_pic1').val().split(','),
                  picHtml = '';
              for(var i=0; i<picJson.length; i++) {
                  picHtml += '<div><div class="prev-frame"><em class="js_delete_web_pic1" data-url="' + picJson[i] + '">x</em><img src="' + picJson[i] + '" class="prev-webpic1"></div></div>';
              }
              $('.js_web_pic1PrevArea').html(picHtml);
            }
            if(!!$('.js_update_web_pic2').val()) {
              var picJson = $('.js_update_web_pic2').val().split(','),
                  picHtml = '';
              for(var i=0; i<picJson.length; i++) {
                  picHtml += '<div><div class="prev-frame"><em class="js_delete_web_pic2" data-url="' + picJson[i] + '">x</em><img src="' + picJson[i] + '" class="prev-webpic2"></div></div>';
              }
              $('.js_web_pic2PrevArea').html(picHtml);
            }
            if(!!$('.js_update_web_pic3').val()) {
              var picJson = $('.js_update_web_pic3').val().split(','),
                  picHtml = '';
              for(var i=0; i<picJson.length; i++) {
                  picHtml += '<div><div class="prev-frame"><em class="js_delete_web_pic3" data-url="' + picJson[i] + '">x</em><img src="' + picJson[i] + '" class="prev-webpic3"></div></div>';
              }
              $('.js_web_pic3PrevArea').html(picHtml);
            }
        }

    }

    page.init();
    $('body').delegate('.js_delete_banner', 'click', function(e) {
        $(e.currentTarget).parent().parent().remove();
    });
    $('body').delegate('.js_delete_web_pic1', 'click', function(e) {
        $(e.currentTarget).parent().parent().remove();
    });
    $('body').delegate('.js_delete_web_pic2', 'click', function(e) {
        $(e.currentTarget).parent().parent().remove();
    });
    $('body').delegate('.js_delete_web_pic3', 'click', function(e) {
        $(e.currentTarget).parent().parent().remove();
    });

    $('body').delegate('.js_submit', 'click', function() {
        var name_en = $('#name_en').val(),
            name_tc = $('#name_tc').val(),
            banner = '',
            des_en = $('#des_en').val(),
            des_tc = $('#des_tc').val(),
            // 获取图片json
            banner = $('.prev-banner').attr('src'),
            web_pic1 = $('.prev-webpic1').attr('src'),
            web_t1_tc = $('#web_t1_tc').val(),
            web_t1_en = $('#web_t1_en').val(),
            web_href1 = $('#web_href1').val(),
            web_pic2 = $('.prev-webpic2').attr('src'),
            web_t2_tc = $('#web_t2_tc').val(),
            web_t2_en = $('#web_t2_en').val(),
            web_href2 = $('#web_href2').val(),
            web_pic3 = $('.prev-webpic3').attr('src'),
            web_t3_tc = $('#web_t3_tc').val(),
            web_t3_en = $('#web_t3_en').val(),
            web_href3 = $('#web_href3').val();
        if(!banner){banner='';}
        if(!web_pic1){web_pic1='';}
        if(!web_pic2){web_pic2='';}
        if(!web_pic3){web_pic3='';}
        var nid = 1;
        var json = {
            api: config.apiServer + 'buying/post',
            type: 'post',
            data: {
                actionxm: 'update',
                nid: nid,
                params: {
                    banner: banner,
                    des_tc: des_tc,
                    des_en: des_en,
                    web_pic1: web_pic1,
                    web_t1_tc: web_t1_tc,
                    web_t1_en: web_t1_en,
                    web_href1: web_href1,
                    web_pic2: web_pic2,
                    web_t2_tc: web_t2_tc,
                    web_t2_en: web_t2_en,
                    web_href2: web_href2,
                    web_pic3: web_pic3,
                    web_t3_tc: web_t3_tc,
                    web_t3_en: web_t3_en,
                    web_href3: web_href3
                }
            }
        };
        var json2 = {
            api: config.apiServer + 'staticpage/post',
            type: 'post',
            data: {
                actionxm: 'update',
                nid: 2,
                params: {
                    name_tc: name_tc,
                    name_en: name_en
                }
            }
        };
        var status = 1;
        var callback = function(res) {
            if(res.status == 0) {
                var status = 1;
            } else {
                var status = 0;
                alert(res.msg);
            }
        };
        json.callback = callback;
        json2.callback = callback;
        Utils.requestData(json);
        Utils.requestData(json2);
        if(status==1){
            alert('保存成功');
        }
        if(status==0){
            alert('保存失敗');
        }
        window.location.href = "/adm/staticpage";
    });

    $('#banner').uploadifive({
        fileTypeDesc: '上传文件',
        fileTypeExts: '*.jpg;*.jpeg;*.gif;*.png',
        multi: false,
        buttonText: '上传图片',
        height: '25',
        width: '100',
        method: 'post',
        fileObjName: 'uploadfile',
        uploadScript: config.apiServer + 'staticpage/post',
        formData: {
            'actionxm': 'upload_photo'
        },
        onUploadComplete: function(file, data, response) {
            result = $.parseJSON(data);
            if(result['status']==0) {
                var html = '<div><div class="prev-frame"><em class="js_delete_banner" data-url="' + result['name'] + '">x</em><img src="' + result['name'] + '" class="prev-banner"></div></div>';
                $('.js_bannerPrevArea').html(html);
            } else {
                alert(result['msg']);
            }
        }
    });
    $('#web_pic1').uploadifive({
        fileTypeDesc: '上传文件',
        fileTypeExts: '*.jpg;*.jpeg;*.gif;*.png',
        multi: false,
        buttonText: '上传图片',
        height: '25',
        width: '100',
        method: 'post',
        fileObjName: 'uploadfile',
        uploadScript: config.apiServer + 'staticpage/post',
        formData: {
            'actionxm': 'upload_photo'
        },
        onUploadComplete: function(file, data, response) {
            result = $.parseJSON(data);
            if(result['status']==0) {
                var html = '<div><div class="prev-frame"><em class="js_delete_web_pic1" data-url="' + result['name'] + '">x</em><img src="' + result['name'] + '" class="prev-webpic1"></div></div>';
                $('.js_web_pic1PrevArea').html(html);
            } else {
                alert(result['msg']);
            }
        }
    });
    $('#web_pic2').uploadifive({
        fileTypeDesc: '上传文件',
        fileTypeExts: '*.jpg;*.jpeg;*.gif;*.png',
        multi: false,
        buttonText: '上传图片',
        height: '25',
        width: '100',
        method: 'post',
        fileObjName: 'uploadfile',
        uploadScript: config.apiServer + 'staticpage/post',
        formData: {
            'actionxm': 'upload_photo'
        },
        onUploadComplete: function(file, data, response) {
            result = $.parseJSON(data);
            if(result['status']==0) {
                var html = '<div><div class="prev-frame"><em class="js_delete_web_pic2" data-url="' + result['name'] + '">x</em><img src="' + result['name'] + '" class="prev-webpic2"></div></div>';
                $('.js_web_pic2PrevArea').html(html);
            } else {
                alert(result['msg']);
            }
        }
    });
    $('#web_pic3').uploadifive({
        fileTypeDesc: '上传文件',
        fileTypeExts: '*.jpg;*.jpeg;*.gif;*.png',
        multi: false,
        buttonText: '上传图片',
        height: '25',
        width: '100',
        method: 'post',
        fileObjName: 'uploadfile',
        uploadScript: config.apiServer + 'staticpage/post',
        formData: {
            'actionxm': 'upload_photo'
        },
        onUploadComplete: function(file, data, response) {
            result = $.parseJSON(data);
            if(result['status']==0) {
                var html = '<div><div class="prev-frame"><em class="js_delete_web_pic3" data-url="' + result['name'] + '">x</em><img src="' + result['name'] + '" class="prev-webpic3"></div></div>';
                $('.js_web_pic3PrevArea').html(html);
            } else {
                alert(result['msg']);
            }
        }
    });
});
