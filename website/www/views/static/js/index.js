// var galleryTop = new Swiper('.gallery-top', {
//     nextButton: '.swiper-button-next',
//     prevButton: '.swiper-button-prev',
//     spaceBetween: 10,
// });
// var galleryThumbs = new Swiper('.gallery-thumbs', {
//     spaceBetween: 10,
//     centeredSlides: true,
//     slidesPerView: 'auto',
//     touchRatio: 0.2,
//     slideToClickedSlide: true
// });
// // galleryTop.params.control = galleryThumbs;
// galleryThumbs.params.control = galleryTop;

jQuery(function(){
	var wH = jQuery(window).height();
	$('.mid').css('margin-top',wH+'px');
	var addH = 0,
	    addh = 0,
	    bgh;
	var imgdefereds=[];

	$('.product1 img').each(function(){

	 var dfd=$.Deferred();

	 $(this).bind('load',function(){

	  dfd.resolve();

	 }).bind('error',function(){

	 //图片加载错误，加入错误处理

	 // dfd.resolve();

	 })

	 if(this.complete) setTimeout(function(){

	  dfd.resolve();

	 },1000);

	 imgdefereds.push(dfd);

	})

	$.when.apply(null,imgdefereds).done(function(){
		var proArr = $('.product1');
		for (var i = 0; i < proArr.length; i++) {
		    var imgArr = $($('.product1')[i]).find('.item .img img');
		    for (var j = 0; j < imgArr.length; j++) {
		        if (j%2==0) {
		            var a1 = imgArr[j].height;
		            var a2 = imgArr[j+1]&&imgArr[j+1].height;
		            addh = a1>a2?a1:a2;
		            addh?addh -= 290:addh = 0;
		            addh > 0?addh: addh = 0;
		            addH += addh;
		            // console.log(addH);
		        }
		        if(j==3) {
		            var n = i+1;
		            bgh = $('.products .product1:nth-child('+n+')').height()+addH;
		            $('.products .product1:nth-child('+n+')').css('height', bgh);
		            // console.log(bgh);
		        }
		    }
		    addH = 0;
		}


	});


});
jQuery(window).resize(function(){
	var wH = jQuery(window).height();
	$('.mid').css('margin-top',wH+'px');
});


$(function() {
    var page = {

        // 页面初始化方法
        init: function() {
            var self = this,
                json = {
                    api: config.apiServer + 'home/get',
                    type: 'get',
                    data: {
                        actionxm: 'getBanner'
                    }
                };
            var callback = function(res) {
                var slides = [],
                    img = {};
                if(res.status == 0) {
                    for(var i = 0;i<res['list'].length;i++){
                        img = {image: res['list'][i]['pic'],thumb: res['list'][i]['pic'],url: res['list'][i]['url_en']};
                        slides.push(img);
                    }
                	$.supersized({
						fit_always				:	0,			// Image will never exceed browser width or height (Ignores min. dimensions)
						fit_landscape			:   1,			// Landscape images will not exceed browser width
						fit_portrait         	:   1,			// Portrait images will not exceed browser height
						horizontal_center : 1,
						vertical_center: 0,
                		slide_interval			:	6000,
                		transition				:	1,
                		transition_speed		:	700,
                		thumbnail_navigation	:	'',
                		slideshow				:	'on',
                		slide_links				:	'blank',
                		slides					:	slides
                	});

                	$("#supersized li a").removeAttr("target");

                } else {
                    alert(res.msg);
                }
            };

            json.callback = callback;
            Utils.requestData(json);
        },


    };

    page.init();


});
